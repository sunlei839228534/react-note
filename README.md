   # react+koa2搭建的全栈项目:shipit:

   ## 启动 
   ```
     git clone https://github.com/sunlei839228534/react-note.git
     npm install
     npm start
   ```



   1.axios.delete 后端无法接收数据
   axios的delete方法不同于get,post方法,阅读过axios源码后我发现,axios的delete方法参数是(url,config).所以我屡次使用delete方法都无法将参数传递给后端,正确的格式应该是 axios.delete(url,data: {data}).这样后端就可以接受到传递的数据
   2.对项目做边界处理的时候发现的问题:在input中,e.target.value的值始终是字符串,所以在逻辑判断的时候使用了"=="将其自动转化,但是这样不符合规范,理论上"=="是不应该被使用的,所以将传入的id提前使用parseInt转化为整数.
