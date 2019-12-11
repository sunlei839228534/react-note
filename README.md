问题1: axios.delete 后端无法接收数据
   axios的delete方法不同于get post方法,阅读过axios源码后我发现,axios的delete方法参数是(url,config).所以我屡次使用delete方法都无法将参数传递给后端,正确的格式应该是 axios.delete(url,data: {data}).这样后端就可以接受到传递的数据