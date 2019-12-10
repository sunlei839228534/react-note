import React from 'react';
import axios from 'axios'

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
  }
  getDataFromDb () {
    axios.get('/getData').then(res=>{
      if(res.data.error_code === 201) {
        this.setState({
          data: res.data.msg.data
        })
      }
    })
  }
  pushDataToDb (message) {
    let currentIds = this.state.data.map(data => data.id)
    let idTobeAdded = 0
    while (currentIds.includes(idTobeAdded)) {
      ++idTobeAdded
    }
    axios.post('/pushData', {
      id: idTobeAdded,
      message
    }).then(res => {
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
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
  render() {
    return (
      <>
        <div>欢迎来到笔记本业务!</div>
        <button onClick={this.pushDataToDb}>添加</button>
      </>
    )
  }
}

export default App;
