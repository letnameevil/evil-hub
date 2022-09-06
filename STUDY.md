### 项目目录结构的划分
- 按照功能模块进行划分
- 按照业务模块进行划分


### 项目的接口
- 面向用户的业务接口
- 面向企业或者内部的后台管理接口

### session 和 token
- Cookie会被附加在每个http请求中，这样的话就增加了一些流量（有些请求是不需要验证的）
- Cookie是明文传递的，所以存在安全性问题
- Cookie大小限制是4kb
- 浏览器以外的客户端需要手动设置Cookie

- token由三部分组成：
  - header: alg: 采用的加密算法， 默认是HMAC SHA256(HS256), 采用同一个密钥进行加密和解密
            typ: JWT,固定值，通常都写成JWT即可
            会通过base64Url算法进行编码
  - payload: 1. 携带的数据，比如我们可以将用户的id和name放到payload中
             2. 默认也会携带iat(issued at), 令牌的签发时间
             3. 我们也可以设置过期时间exp(expiration time)
             4. 会通过base64Url算法进行编码
  - signature: 设置一个secretKey ,通过将前两个结果合并后进行HS256的算法
               HS256(base64Url(header) + . + base64Url(payload),secretKey)
               secretKey不能暴露，如果暴露就可以模拟token的办法，也可以解密token
- 在加密时，采用非对称加密算法 RS256，密钥分公钥和私钥

### 文件管理系统
- 接收上传文件的中间件(具体使用见代码)
 `koa-multer`

### 各种文件类型的转换
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="file" />
    <button>点击下载</button>
    <script src="https://unpkg.com/axios@0.27.2/dist/axios.min.js"></script>
    <script>
      const ipt = document.querySelector('input'),
        btn = document.querySelector('button')

      btn.onclick = function () {
        let str = ''
        const reader = new FileReader()

        reader.addEventListener('load', (e) => {
          str = e.target.result
        })

        reader.onloadend = function () {
          console.log('duwanl')
          var arr = str.split(',')
          mine = arr[0].match(/:(.*?);/)[1]
          bstr = atob(arr[1])
          n = bstr.length
          u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }

          const ret = new Blob([u8arr], {
            type: mine,
          })

          console.log(ret)

          console.log(URL.createObjectURL(ret))

          const img = new Image()

          img.src = URL.createObjectURL(ret)

          document.body.appendChild(img)
        }

        reader.readAsDataURL(ipt.files[0])

        // console.log(ipt.files[0])
        // console.log(new Blob(['cheng'], { type: 'text/plain', name: 'cheng' }))

        // const file = ipt.files[0]

        // const formData = new FormData()

        // formData.append('avatar', file)
        // formData.append('userName','chenghsihuai')

        // axios({
        //   url: 'http://localhost:8888/upload/getFile',
        //   method: 'GET',
        //   // responseType: 'blob',
        // }).then((res) => {
        //   console.log('res', res.data.data.data)

        //   const arrayBuffer = new Int8Array(res.data.data.data)

        //   const blob = new Blob([arrayBuffer])
        //   console.log(blob)
        //   const fileRead = new FileReader()

        //   fileRead.onload = function (e) {
        //     console.log(e.target.result)
        //   }

        //   fileRead.readAsDataURL(blob)

        // fileRead.readAsDataURL

        // console.log(blob)

        // const a = document.createElement('a')

        // const blobUrl = URL.createObjectURL(blob)

        // console.log(blobUrl)
        // a.download = 'tes.mp4'

        // a.href = blobUrl

        // a.click()
        // })
      }
    </script>
  </body>
</html>
```


