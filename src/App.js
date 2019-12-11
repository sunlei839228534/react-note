import React from 'react';
import axios from 'axios'
import Qs from 'qs'
import { Button } from 'antd'

class App extends React.Component {
  constructor(...arg) {
    super(...arg)
    this.state = {
      data: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null
    }
    this.getDataFromDb = this.getDataFromDb.bind(this)
    this.pushDataToDb = this.pushDataToDb.bind(this)
    this.deleteFromDb = this.deleteFromDb.bind(this)
  }
  componentDidMount() {
    if(!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval})
    }
  }
  componentWillUnmount() {
    if(this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null});
    }
  }
  //从数据库获取所有数据
  getDataFromDb () { 
    axios.get('/getData').then(res=>{
      if(res) {
        this.setState({
          data: res.data.msg.data
        })
      }
    })
  }
  //推送数据到数据库
  pushDataToDb (message) {
    let currentIds = this.state.data.map(data => data.id)
    let idTobeAdded = 0
    while (currentIds.includes(idTobeAdded)) {
      ++idTobeAdded
    }
    const fromData = Qs.stringify({
      id: idTobeAdded,
      message
    })
    axios.post('/pushData',fromData).then(res=>{

    })
  }
  //根据id删除数据
  deleteFromDb(idTodelete) {
    let objIdToDelete = null;
    this.state.data.forEach(item => {
      if(item.id === idTodelete) {
        objIdToDelete = item.id
      }
    })

    axios.delete('/deleteData',{
      data: {
        id: objIdToDelete
      }
    })
  }
  render() {
    return (
      <>
        <div>欢迎来到记事本app!</div>
        {this.state.data.map((item) => {
          return (
            <div key={item.id}>
              {item.message}
            </div>
          )
        })}
        <Button type='primary' onClick={()=>{
          this.deleteFromDb(4)
        }}>删除</Button>
      </>
    )
  }
}

export default App;
