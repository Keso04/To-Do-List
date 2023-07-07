import { useCallback, useState } from "react";

const ToDo_raw = () => {

  // state = {
  //   inputValue: '',
  //   toDo: [{id: 1, value: "Go shopping"}, {id: 2, value: "Do my homework"}],
  //   done: [{id: 0, value: "get ready for dinner"}]
  // }

  const [inputValue, setInputValue] = useState('');
  const [toDo, setToDo] = useState([{id: 1, value: "Go shopping"}, {id: 2, value: "Do my homework"}]);
  const [inProgress, setInProgress] = useState([{id: 10, value: "Wash the dishes"}]);
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

  const removeTaskFromInProgress = useCallback((id) => {
    // const tasks = done.filter((task) => task.id !== id);
    setInProgress((prevState) => prevState.filter((task) => task.id !== id));
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

  const addToInProgressFromToDo = useCallback((id, value) => {
    // const tasks = toDo.filter((task) => task.id !== id);
    const inProgress = {
      id: id,
      value: value
    }

    setToDo((prevState) => prevState.filter((task) => task.id !== id));
    setInProgress((prevState) => [...prevState, inProgress]);
  })

  const addToToDoFromInProgress = useCallback((id, value) => {
    // const tasks = toDo.filter((task) => task.id !== id);
    const inProgress = {
      id: id,
      value: value
    }

    setInProgress((prevState) => prevState.filter((task) => task.id !== id));
    setToDo((prevState) => [...prevState, inProgress]);
  })

  const addToDoneFromInProgress = useCallback((id, value) => {
    // const tasks = toDo.filter((task) => task.id !== id);
    const inProgress = {
      id: id,
      value: value
    }

    setInProgress((prevState) => prevState.filter((task) => task.id !== id));
    setDone((prevState) => [...prevState, inProgress]);
  })

  const addToInProgressFromDone = useCallback((id, value) => {
    // const tasks = toDo.filter((task) => task.id !== id);
    const inProgress = {
      id: id,
      value: value
    }

    setDone((prevState) => prevState.filter((task) => task.id !== id));
    setInProgress((prevState) => [...prevState, inProgress])
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
  <div className="main">
    <form className='to-do'>
      <h1 className='header1'><span>TO-DO-LIST</span></h1>
      <input placeholder="Write your tasks..." type="text" onChange={onChange} className='myInput' value={inputValue} />
      <button  onClick={addTask} type='submit' className='btn'>Add</button>

      {toDo.map((topic) => {
        return(
        <div key = {topic.id} className='topics_raw'>
          <p>{topic.value}</p>
          <button onClick={() => removeTask(topic.id)} type='submit' className='btn'>Remove Task</button>
          <button onClick={() => addToDoneTask(topic.id, topic.value)} type='submit' className='btn'>Done</button>
          <button onClick={() => addToInProgressFromToDo(topic.id, topic.value)} type='submit' className='btn'>In Progress</button>
        </div>
        )
      })}
      </form>

      <form className='inProgress'>
      <h1 className='header2'>IN PROGRESS</h1>
      {inProgress.map((topic) => {
        return(
        <div key = {topic.id} className='topics_raw'>
          <p>{topic.value}</p>
          <button onClick={() => removeTaskFromInProgress(topic.id)} type='submit' className='btn'>Remove Task</button>
          <button onClick={() => addToToDoFromInProgress(topic.id, topic.value)} type='submit' className='btn'>To Do</button>
          <button onClick={() => addToDoneFromInProgress(topic.id, topic.value)} type='submit' className='btn'>Done</button>
        </div>
        )
      })}
      </form>

    <form className='done'>
      <h1 className='header3'>DONE</h1>
      {done.map((topic) => {
        return(
        <div key = {topic.id} className='topics_raw'>
          <p>{topic.value}</p>
          <button onClick={() => removeTaskFromDone(topic.id)} type='submit' className='btn'>Remove Task</button>
          <button onClick={() => addToToDo(topic.id, topic.value)} type='submit' className='btn'>To Do</button>
          <button onClick={() => addToInProgressFromDone(topic.id, topic.value)} type='submit' className='btn'>In Progress</button>
        </div>
        )
      })}
      </form>
    </div>
  </>
  )
}

export default ToDo_raw;