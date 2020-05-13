const net = require("net");
class Request {
    //method, url = host + port + path
    //body:  k/v
    //headers
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if (this.headers["Content-Type"] === "application/json") {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }
        this.headers["Content-Length"] = this.bodyText.length;
    }
    // open(method, url){

    // }
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers).map(key => `${key}:${this.headers[key]}`).join('\r\n')}\r\n\r\n${this.bodyText}`
    }
    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser;
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString())
                })
            }
            connection.on('data', (data) => {
                parser.receive(data.toString());
                // resolve(data.toString());
                console.log(parser.statusLine)
                connection.end();
            });
            connection.on('error', (err) => {
                reject(err);
                connection.end();
            });
        })

    }
}

class Response {

}

class ResponseParser{ //负责产生 Response类   状态机
    constructor(){
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;

        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
    }
    receive(string){
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
            
        }
    }
    receiveChar(char){
        if(this.current === this.WAITING_STATUS_LINE){
            if(char === '\r'){
                this.current = this.WAITING_STATUS_LINE_END;
            }else if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }else{
                this.statusLine += char;
            }    
        }
        if(this.current === this.WAITING_STATUS_LINE){
            if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }  
        }
        if(this.current === this.WAITING_HEADER_NAME){
            if(char === ':'){
                this.current = this.WAITING_HEADER_SPACE;
            }else{
                this.headerName += char;
            }    
        }
        if(this.current === this.WAITING_HEADER_SPACE){
            if(char === ' '){
                this.current = this.WAITING_HEADER_VALUE;
            }  
        }
        if(this.current === this.WAITING_HEADER_VALUE){
            if(char === '\r'){
                this.current = this.WAITING_HEADER_SPACE;
            }else{
                this.headerValue += char;
            }    
        }
    }
}

class TrunkedBodyParser{ 
    constructor(){

    }
    receive(string){

    }
}

// net.connect({
//     address:"localhost",
//     port: 8088,
//     onread: {
//         // 为套接字的每次读取复用 4KiB 的 Buffer。
//         buffer: Buffer.alloc(4 * 1024),
//         callback: function (nread, buf) {
//             // 收到的数据在 `buf` 中可用，从 0 到 'nread`。
//             console.log(buf.toString('utf8', 0, nread));
//         }
//     }
// });
void async function () {
    let requset = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8088",
        path: "/",
        headers: {
            ["X-Foo"]: "customed"
        },
        body: {
            name: "nibaojie"
        }
    })
    let response = await requset.send()
    console.log(response)
}()

/*
const client = net.createConnection({
    host: "127.0.0.1",
    port: 8088
}, () => {
    // 'connect' 监听器
    console.log('已连接到服务器');
    let requset = new Request({
        method:"POST",
        host:"127.0.0.1",
        port:"8088",
        path:"/",
        headers:{
            ["X-Foo"]: "customed"
        },
        body:{
            name:"nibaojie"
        }
    })
    console.log(requset.toString())
    client.write(requset.toString());
    // client.write("POST / HTTP/1.1\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: 13\r\n\r\nname=nibaojie")
});
client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', () => {
    console.log('已从服务器断开');
});
client.on('error', (err) => {
    console.log(err);
    client.end();
});
*/