import React, { Component } from 'react'

class ToDo_raw extends Component{

  state = {
    inputValue: '',
    toDo: [{id: 1, value: "Go shopping"}, {id: 2, value: "Do my homework"}],
    done: [{id: 0, value: "get ready for dinner"}]
  }

  onChange = (event) => {
    const value = event.target.value;
    this.setState({
      inputValue: value
    })
  }

  addTask = (event) => {
    event.preventDefault();

    const task = {
      id: this.state.toDo.length + 1,
      value: this.state.inputValue
    }

    this.setState({
      toDo: [...this.state.toDo, task],
      inputValue: ''
    })

    // console.log(task);
  }

  removeTask = (id) => {
    const tasks = this.state.toDo.filter((task) => task.id !== id);
    this.setState({
      toDo: tasks
    })

    // console.log("remove");
  }

  removeTaskFromDone = (id) => {
    const tasks = this.state.done.filter((task) => task.id !== id);
    this.setState({
      done: tasks
    })

    // console.log("remove");
  }

  addToDoneTask = (id, value) => {
    const tasks = this.state.toDo.filter((task) => task.id !== id);
    const doneTasks = {
      id: id,
      value: value
    }

    this.setState({
      toDo: tasks,
      done: [...this.state.done, doneTasks]
    })

    // console.log(doneTasks);
    // console.log("done");
  }

  addToToDo = (id, value) => {
    const tasks = this.state.done.filter((task) => task.id !== id);
    const moveToList = {
      id: id,
      value: value
    }

    this.setState({
      done: tasks,
      toDo: [...this.state.toDo, moveToList]
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    return !(JSON.stringify(this.state.toDo) === JSON.stringify(nextState.toDo) &&
             JSON.stringify(this.state.done) === JSON.stringify(nextState.done))
  }

  render(){
  return (
  <>
    <form className='to-do'>
      <h1 className='to-do-header'><span>TO-DO-LIST</span></h1>
      <input type="text" onChange={this.onChange} className='myInput' value={this.state.inputValue} />
      <button  onClick={this.addTask} type='submit' className='mybtn'>Add</button>
      </form>

      {this.state.toDo.map((topic) => {
        return(
        <div key = {topic.id} className='topics_raw'>
          <p>ID: {topic.id}</p>
          <p>Task: {topic.value}</p>
          <button onClick={() => this.removeTask(topic.id)} type='submit' className='removebtn'>Remove Task</button>
          <button onClick={() => this.addToDoneTask(topic.id, topic.value)} type='submit' className='removebtn'>DONE</button>
        </div>
        )
      })}

    <form className='done'>
      <h1 className='done-header'>DONE</h1>
      {this.state.done.map((topic) => {
        return(
        <div key = {topic.id} className='topics_raw2'>
          <p>ID: {topic.id}</p>
          <p>Task: {topic.value}</p>
          <button onClick={() => this.removeTaskFromDone(topic.id)} type='submit' className='removebtn'>Remove Task</button>
          <button onClick={() => this.addToToDo(topic.id, topic.value)} type='submit' className='removebtn'>Return to to-do list</button>
        </div>
        )
      })}
      </form>
  </>
  )
  }
}

export default ToDo_raw;