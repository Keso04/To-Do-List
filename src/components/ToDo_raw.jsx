import { useCallback, useState } from "react";

const ToDo_raw = () => {

  // state = {
  //   inputValue: '',
  //   toDo: [{id: 1, value: "Go shopping"}, {id: 2, value: "Do my homework"}],
  //   done: [{id: 0, value: "get ready for dinner"}]
  // }

  const [inputValue, setInputValue] = useState('');
  const [toDo, setToDo] = useState([{id: 1, value: "Go shopping"}, {id: 2, value: "Do my homework"}]);
  const [done, setDone] = useState([{id: 0, value: "get ready for dinner"}]);

  const onChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  }

  const addTask = useCallback((event) => {
    event.preventDefault();

    const task = {
      id: toDo.length + 1,
      value: inputValue
    }

    setToDo((prevState) => [...prevState, task]);
    setInputValue('');

    // console.log(task);
  })

  const removeTask = useCallback((id) => {
    // const tasks = toDo.filter((task) => task.id !== id);
    setToDo((prevState) => prevState.filter((task) => task.id !== id));

    // console.log("remove");
  })

  const removeTaskFromDone = useCallback((id) => {
    // const tasks = done.filter((task) => task.id !== id);
    setDone((prevState) => prevState.filter((task) => task.id !== id));

    // console.log("remove");
  })

  const addToDoneTask = useCallback((id, value) => {
    // const tasks = toDo.filter((task) => task.id !== id);
    const doneTasks = {
      id: id,
      value: value
    }

    setToDo((prevState) => prevState.filter((task) => task.id !== id));
    setDone((prevState) => [...prevState, doneTasks])

    // console.log(doneTasks);
    // console.log("done");
  })

  const addToToDo = useCallback((id, value) => {
    // const tasks = done.filter((task) => task.id !== id);
    const moveToList = {
      id: id,
      value: value
    }

    setDone((prevState) => prevState.filter((task) => task.id !== id));
    setToDo((prevState) => [...prevState, moveToList]);
  })

  // shouldComponentUpdate(nextProps, nextState){
  //   return !(JSON.stringify(this.state.toDo) === JSON.stringify(nextState.toDo) &&
  //            JSON.stringify(this.state.done) === JSON.stringify(nextState.done))
  // }

  return (
  <>
    <form className='to-do'>
      <h1 className='to-do-header'><span>TO-DO-LIST</span></h1>
      <input type="text" onChange={onChange} className='myInput' value={inputValue} />
      <button  onClick={addTask} type='submit' className='mybtn'>Add</button>
      </form>

      {toDo.map((topic) => {
        return(
        <div key = {topic.id} className='topics_raw'>
          <p>ID: {topic.id}</p>
          <p>Task: {topic.value}</p>
          <button onClick={() => removeTask(topic.id)} type='submit' className='removebtn'>Remove Task</button>
          <button onClick={() => addToDoneTask(topic.id, topic.value)} type='submit' className='removebtn'>DONE</button>
        </div>
        )
      })}

    <form className='done'>
      <h1 className='done-header'>DONE</h1>
      {done.map((topic) => {
        return(
        <div key = {topic.id} className='topics_raw2'>
          <p>ID: {topic.id}</p>
          <p>Task: {topic.value}</p>
          <button onClick={() => removeTaskFromDone(topic.id)} type='submit' className='removebtn'>Remove Task</button>
          <button onClick={() => addToToDo(topic.id, topic.value)} type='submit' className='removebtn'>Return to to-do list</button>
        </div>
        )
      })}
      </form>
  </>
  )
}

export default ToDo_raw;