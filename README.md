   # react+koa2搭建的前后端项目:shipit:

   ## 启动 
   ```
     git clone https://github.com/sunlei839228534/react-note.git
     cd react-note
     npm install
     npm start
   ```  
  
   ## 项目介绍  
    该项目主要是使用React(前端)+Koa(后端)框架作为技术栈,mongdb作为数据库.实现了新建,删除,更新笔记等功能.  
    前端代码 => src目录下  
    后端代码 => server目录下  

    该项目前端使用的是AntDesign UI库,配置了config-overrides.js做按需加载  
    后端对Koa进行了二次封装,核心代码  
    ```javascript  
      const catchError = async (ctx,next) => {  
      try {  
        await next()  
      } catch (error) {  
        // 一些error操作  
      }  
    ```  
    Koa中比较核心的概念就是中间件,对于中间件的介绍可以浏览Koa的[官网](https://www.koajs.com.cn/)进行学习
    Koa本身不在内核方法中绑定中间件,所以对开发者来说,舞台很大.在这个例子中,使用了try()catch()去捕获服务端代码中的错误,这样做的好处是
    1.你的接口返回的数据格式统一
    2.不用在每一个路由里去编写一大堆重复的代码,代码很清爽
    3.无论是操作成功还是失败,你只需要编写返回状态的类,然后在相应的地方把类实例化,并传入参数就可以

    在server/model文件夹下 创建了schema,同时index.js导出了相应的model操作.这里是因为只有一个数据模型,如果有多个数据模型也是一样的,只不过需要多一层业务层,对每个model文件夹来说,他们需要做的就是导出相应的方法,然后在由业务层去引用他们,最终由服务端引用业务层的方法.

   ### 开发中遇到的一些问题
   axios.delete 后端无法接收数据  
   1.axios的delete方法不同于get,post方法,阅读过axios源码后我发现,axios的delete方法参数是(url,config).所以我屡次使用delete方法都无法将参数传递给后端,正确的格式应该是 axios.delete(url,data: {data}).这样后端就可以接受到传递的数据  
   2.对项目做边界处理的时候发现的问题:在input中,e.target.value的值始终是字符串,所以在逻辑判断的时候使用了"=="将其自动转化,但是这样不符合规范,理论上"=="是不应该被使用的,所以将传入的id提前使用parseInt转化为整数.
