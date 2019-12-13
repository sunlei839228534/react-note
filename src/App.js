import React from 'react';
import axios from 'axios'
import Qs from 'qs'
import { Button , Input , Card , List, Avatar } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'


import "./App.css"

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
      objectToUpdate: null,
      updateToApply: null
    }
    this.getDataFromDb = this.getDataFromDb.bind(this)
    this.pushDataToDb = this.pushDataToDb.bind(this)
    this.deleteFromDb = this.deleteFromDb.bind(this)
    this.updateDb = this.updateDb.bind(this)
  }
  componentDidMount() {
    this.getDataFromDb()
    // if(!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({ intervalIsSet: interval})
    // }
  }
  componentWillUnmount() {
    // if(this.state.intervalIsSet) {
    //   clearInterval(this.state.intervalIsSet);
    //   this.setState({ intervalIsSet: null});
    // }
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
      this.getDataFromDb()
    })
  }
  updateDb(idToUpdate, updateToApply) {
    let objIdToUpdate = null;
    this.state.data.forEach(item => {
      if(item.id == idToUpdate) {
        objIdToUpdate = item.id
      }
    })
    const data = Qs.stringify({
      id: objIdToUpdate,
      message: updateToApply
    })
    axios.post('/updateData', data).then(res => {
      this.getDataFromDb()
    })
  }
  //根据id删除数据
  deleteFromDb(idTodelete) {
    let objIdToDelete = null;
    this.state.data.forEach(item => {
      if(item.id == idTodelete) {
        objIdToDelete = item.id
      }
    })
    axios.delete('/deleteData',{
      data: {
        id: objIdToDelete
      }
    }).then(res=>{
      this.getDataFromDb()
    }).catch(err => {
      this.getDataFromDb()
    })
  }
  render() {
    const { data = [] } = this.state
    return (
      <>
        <div style={{margin: 20}}>
          <List
            itemLayout="horizontal"
            dataSource={ data }
            renderItem={ item => (
              <List.Item>
                <List.Item.Meta
                avatar={<Avatar icon="snippets" />}
                title={<span>{`创建时间: ${moment(item.createdAt).fromNow()}`}</span>}
                description={`${item.id}: ${item.message}`}
                />
              </List.Item>
            ) }
          />
          <Card
            title="新增笔记"
            style={{ padding: 10, margin: 10}}
          >
            <Input
              value={this.state.message}
              onChange={ e => {
                this.setState({ message: e.target.value})
              }}
              placeholder="请输入笔记内容"
              style={{width:200 }}
            ></Input>
            <Button
              type="primary"
              style={{ margin: 20 }}
              onClick={ () => {
                this.pushDataToDb(this.state.message)
                this.setState({ message: ''})
              } }
            >添加笔记</Button>
          </Card>
          <Card
            title="删除笔记"
            style={{ padding: 10, margin: 10}}
            >
            <Input
              value={this.state.idToDelete}
              onChange={e => this.setState({ idToDelete: e.target.value})}
              placeholder="填写需要删除的Id"
            ></Input>
            <Button
              type="primary"
              style={{ margin: 20 }}
              onClick={ () => {
                this.deleteFromDb(this.state.idToDelete)
                this.setState({ idToDelete: null})
              }}
            >
              删除
            </Button>
          </Card>
          <Card
            title="更新笔记"
            style={{ padding: 10, margin: 10}}
            >
            <Input
              value={this.state.idToUpdate}
              style={{marginBottom: 10 }}
              onChange={e => this.setState({ idToUpdate: e.target.value})}
              placeholder="需要更新的Id"
            ></Input>
            <Input
              value={this.state.updateToApply}
              onChange={e => this.setState({ updateToApply: e.target.value})}
              placeholder="请输入需要更新的内容"
            ></Input>
            <Button
              type="primary"
              style={{ margin: 20 }}
              onClick={ () => {
                this.updateDb(this.state.idToUpdate, this.state.updateToApply)
                this.setState({
                  updateToApply: null,
                  idToUpdate: null
                })
              }}
            >
              更新
            </Button>
          </Card>
        </div>
      </>
    )
  }
}

export default App;
