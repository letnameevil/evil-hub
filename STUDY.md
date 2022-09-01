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
