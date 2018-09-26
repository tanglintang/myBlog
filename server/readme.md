# koa2 后端接口

## api
/admin/api/signIn 登录验证
/admin/api/signIn/token token验证

## koa-body
> 使用 POST 发送的数据需要使用 bodyParser 先行解析
```js
// koa-bodyparser
app.use(bodyParser({
    formLimit: '1mb'
}))
```
**koa-body**代替 `koa-bodyparser` 和 `koa-multer`(文件上传)
```js
app.use(koaBody({
  multipart:true, // 支持文件上传
  encoding:'gzip',
  formidable:{
    uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
}))
```

## token 验证
> jwt（生成） + redis（token存储）

- jwt
三个部分：
1. header 头部：
2. playload 载荷：存放有效信息的地方、base64 加密
```js
{
  自定义：
}
```
3. 签证信息：
header + playload + secret（签发 jwt ，保存在服务端<私钥>，不可泄露）
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMTM2NTcwNTMyNTciLCJpYXQiOjE1MzY3MTg0MDIsImV4cCI6MTUzNjcyMjAwMn0.eKiEzVrh4VzSUbUJBGAVfQPuMdUCtWKyRdx2uY6ct4M`
**生成 jwt**
```js
jwt.sign({ account }, secret, { expiresIn: '1h' })
```
**decode**
```js
const playload = jwt.decode(token)
```

验证过程：
1. 生成 jwt 保存在 redis，发送给客户端，本地 localStorage 保存，
2. 保存在请求头，发送给服务端
```js
fetch('api/user/1', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
```
3. decode token，获取 redis 相应的 token
4. 响应 客户端

## 静态资源服务器
`koa-static-cache`
```js
// 启用静态服务器以及缓存
app.use(staticCache(path.join(__dirname, './static'), {
  dynamic: true
},{
  maxAge: 365*24*60*60
}))
```

## varchar(255) text(500)
