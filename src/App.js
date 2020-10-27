import React, {useState, useRef, useEffect} from 'react';
import TodoList from './Todolist';
import { v4 as uuidv4 } from  'uuid';

const LS_KEY = 'todoapp.todos';

function App() {
 const [todos, setTodos] =  useState([]);
 const todoNref = useRef();

 useEffect(()=> {
   const storedItems = JSON.parse(localStorage.getItem(LS_KEY));
   if (storedItems) setTodos(storedItems);
 }, []);

 useEffect(()=>{
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
 }, [todos] );

 function toggleTodo(id){
   const newtodos = [...todos]; 
   const todo = newtodos.find(todo => todo.id === id);
   todo.complete = !todo.complete; 
   setTodos(newtodos); 
 }

  function handleAddition(e){
   const name = todoNref.current.value;
   if (name === '') return
   setTodos(prevTodos => {
      return [...prevTodos, {id:uuidv4(), name : name, complete: false}]
   })

   todoNref.current.value = null;
  }

  function handleCleanup(){
    const newtodos = todos.filter(todo=> !todo.complete);
    setTodos(newtodos);
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo ={toggleTodo}/>
    <input ref={todoNref} type="ẗext"/>
    <div>
    <button onClick={handleAddition}> Insert </button>
    <button onClick={handleCleanup}> Remove Complete</button>
    <div>{todos.filter(todo=> !todo.complete).length} left to  do</div>
    </div>
    </>
  )
}

export default App;
