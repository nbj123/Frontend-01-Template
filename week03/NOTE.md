# 第三周总结
## 验证正负数
```
	// 验证 0 是正负数 
    function check(zero) {
        if (1 / zero === Infinity) {
            return 1
        }
        if (1 / zero === -Infinity) {
            return -1
        }
    }
    // 验证Number 正负数
    function sign(number) {
        return number / Math.abs(number)
    }
```
## member运算 访问对象属性的方式
```
a.b
a[b]
foo`string`
super.b
super['b']
new.target
new foo()
```
## New / Call
```
  // New
  new Foo()
  // new a()() => ( new a() )()
  // new new a() => new ( new a() )
  
  // Call
  foo()
  super()
  foo()['b']
  foo().b
  foo()`abc`
  // new a()['b'] => ( new a() )['b']
  // new a['b'] => new ( a['b'] )
  
  //总结：由此可看出，带括号的优先级高
```

## Expressions
```
1、Left Handside & right Handside (等号左边 & 等号右边)
	a.b = c
	a+b = c
2、Updated
	a++
	a--
	++a
	--a
	++/--前面不能换行
	Example： a
			  ++
			  b   =》   (a)(++b)(++c)
			  ++
			  c
			b 和 c 执行了操作 a不变
3、Unary 单目运算符
	delete a.b
	void foo()
	typeof a
	+ a
	- a
	~ a
	! a
	await a
4、Exponental 乘号  唯一一个从右到左边计算
	Example: 3 ** 2 ** 3 => 3 ** ( 2 ** 3 )
   
   //优先级从高往低 排下去
   Multiplication 乘除
   * / %
   Additive
   + -
   Shift 左右移位
   << >> >>>
   Relationship 比较
   < > <= >= instanceof in 
     Equality 等号 也属于比较 不过优先级比上面低
     == != === !==
   Bitwise 位运算
   & ^ |
   Logical 逻辑运算
   && ||
   Conditional
   ? :
```

### 结尾：
	这周才看了周四的课，周六的课慢慢找时间步，周四主要写的string与Number的互相转换，Number转string能大概理解，string转number就开始蒙蔽了，啥转换成编码值又减去0的编码值又之前乘以几进制，百度也百度不到，有点懵，底层太得劲了！！！