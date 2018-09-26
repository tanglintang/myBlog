# tang-blog

## 启动
./tang-blog     yarn start
./server        node index

redis-server

## styled-components
> css in js
> 将一个react组件包装成一个具有样式的react组件
- 格式：
```js
const StyledCompoent = styled('div')``
// 简写 等同于
const StyledCompoent = styled.div``
```
- props
```js
const Button = styled.button`
  background: ${props => props.primary ? 'palevioletred' : 'white'};
`
render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```
- extends
```js
const TomatoButton = Button.extend`
  color: tomato;
  border-color: tomato;
`
```

## 高阶箭头函数
> 常见的连续箭头函数
```js
function add(a) {
    return function(b) {
        return a + b
    }
}

var add3 = add(3)
add3(4) === 3 + 4 //true
// add(3)(4)
```
> es6 写法为
```js
let add = a => b => a + b 
```
**实质**就是柯里化函数

```js
export const requestVerifySignInInfo = (account, password) => dispatch => { ... }
```

## remark && remark-react
将 markdown 格式转为 HTML
后端 把 markdown 转为 HTML 字符串 保存到数据库，
同时保存 toc 目录索引


## componentWillUnmount
```js
  componentWillUnmount () {
    // componentWillUnmount 生命周期 不可调用 state 或者 修改 state
    // 可重写 setState 方法防止修改
    this.setState = (state, callback)=>{
      return
    }
  }
```
