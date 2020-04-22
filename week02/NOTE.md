# 每周总结可以写在这里

```
语言按语法分类
计算机语言用形式语言来定义
形式语言(乔姆斯基谱系)
    0型 无限制文法
    1型 上下文相关文法
    2型 上下文无关文法
    3型 正则文法
```
```
理解形式语言需要 产生式(BNF)
    1、用尖括号括起来的名称来表示语法结构名
    2、语法结构分为基础结构和需要用其他语法结构定义的复合结构
        基础结构称终结符
        复合结构称非终结符
    3、引号和中间的字符表示终结符
    4、可以有括号
    5、* 表示重复多次
    6、| 表示或
    7、+ 表示至少一次
```
```
<Program>::= "a"+ | "b"+
{/* BNF可递归 */}
<Program>::= <Program> "a"+ | <Program> "b"+
<Program>::=  ("a"+ | "b"+)+  
```

## 字符串编码 转换 为Unicode编码
```javascript
"厉害".codePointAt(0).toString(16) // 5389
"厉害".codePointAt(1).toString(16) // 5bb3
var \u5389\u5bb3 = 11;
```

```
WhiteSpace ::
<TAB>   '\t' //制表符 制表方便 以上列子
<VT>    '\v' //纵向制表符
<FF>    
<SP>
<NBSP>  '&nbsp;' '\u00A0' 虽然是空格 但是换行时不会拆开 仍当作整体
<ZWNBSP>
<USP>
```

## Number Grammar语法
```javascript
1、DecimalLiteral 十进制
    1. 0
    2. 0.
    3. .2
    4. 1e3
2、BinaryIntegerLiteral 二进制
    1. 0b111
3、OctalIntegerLiteral 八进制
    1. 0o10
4、HexIntegerLiteral 十六进制
    1. 0xFF
```

## String
```javascript
1、Character 字符
    'a'
2、Code Point  码点
    97
3、Encoding
    01100001
```

```javascript
0.1+0.2===0.3 // false
//浮点运算特点 主要因为精度问题，转换为二进制进行计算 并且0.1，0.2为无限循环， 导致有一丢丢的小误差
// 正确比较方法：
Math.abs(0.1+0.2-0.3) <= Number.EPSILON
        比较得出的绝对值是否比最小精度小  
```

```
到目前两周了 课程虽然听的迷迷糊糊 可能对于我这样勉勉强强一年经验的菜鸟，这样的基础底层有点够呛，但是也会蜗牛式的慢慢看视频来学习，我觉得整个课程下来学到10%就算成功了，现在最起码也能看懂一点ecma的文档了，这周也了解了点bnf 语法分类，编码一块虽然晕乎乎，但最起码也了解了string、空格符等等，慢慢来吧 能学多少是多少。
```