# 每周总结可以写在这里

## JS执行粒度
- JS Context => Realm
- 宏任务 (setTimeout)
- 微任务 (Promise)
- 函数调用
- 语句/声明
- 表达式
- 直接量/变量/this......



## Execution Context
- i:0 变量i
	- code evaluation state
	- Function
	- Script or Module
	- Generator
	- Realm
		- 在JS中，函数表达式和对象直接量均会创建对象。
		- 使用 . 做隐式转换也会创建对象。
		- 这些对象也是有原型的，如果我们没有Realm，就不知道它们的原型是什么。 
	- LexicalEnvironment 词法环境
		- this             		this.a = 1;
			 new.target	   new.target;
			 super			super();
			 变量		     x += 2;
	- VariableEnvironment  变量环境  历史遗留包袱，仅仅用于处理var声明
		- {
				let y = 2;
				eval('var x = 1;')
			} 
		    with({a:1}){
		  	eval('var x;')
		    }
		    console.log(x);
		   
## 浏览器工作原理
  ### 总结与http协议

- 浏览器
``` JavaScript
  HTTP		parse	csscomputing	   layout				render
url =》HTML   =》 DOM =》 DOM with CSS   =》 DOM with position =》 Bitmap

输入url 敲了回车以后 浏览器首先请求了HTTP 回来了 HTML代码，  然后进行parse(解析) 成 DOM树，然后css规则应用上去(csscomputing) 让DOM树带有CSS，然后排版(layout)，DOM树所有元素确定位置 DOM树就带有了位置，在进行渲染，就可以得到内存中的图片(Bitmap)，然后将图片显示到浏览器上
```

## ISO-OSI七层网络模型
应用
表示               	        HTTP             require('http')
会话
_____________________________
传输      	  ——》  TCP         	    require('net')
网络     		——》  Internet         
数据链路         ——》  4G/5G/WIFI         
物理层    	       ——》  4G/5G/WIFI       

## TCP与IP的一些基础知识
- 流       						- 包      
	 端口					       - IP地址
	 require('net')				 - libnet/libpcap

### HTTP
- Request
- Response

TCP 服务端 浏览器端都有权发送信息也有权不回复
HTTP 服务端不能主动发送信息