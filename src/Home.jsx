import React, {useEffect, useState} from 'react'
import firebase from "./firebase/index"

export default function Home() {
  const [todos, setTodos] = useState([])
  const db = firebase.db
  const initState = {title: '', description: ''}
  const [inputs, setInputs] = useState(initState)

  useEffect(() => {
    setTodos([])
    getTodos()
  }, [])


  const getTodos = () => {
    db.collection('todo').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setTodos(prev => ([...prev, doc.data()]))
        })
      })
      .catch(err => {
        console.log(err.message)
      })
  }
  //console.log(firebase)
  
  const sendTodo = async (e) => {
    e.preventDefault();
    await db.collection('todo').add(inputs)
      .then(async documentReference => {
        console.log("document reference ID", documentReference.id)
        await setTodos([])
        setInputs(initState)
        getTodos()
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const handleChange = e => {
    const {name, value} = e.target
    setInputs(prev => ({...prev, [name]: value}))
  }

  return (
    <div>
      <h1>Home Page</h1>
      <h3>Send Todo</h3>
        {
          todos.length === 0 ?
            null :
            todos.map((todo, i) => <h1 key = {i}>{todo.title}</h1>)
        }
      <form onSubmit = {sendTodo}>
        <input name = 'title'
          placeholder = 'title'
          value = {inputs.title}
          onChange = {handleChange} />
        <input name = "description"
          value = {inputs.description}
          placeholder = "description"
          onChange = {handleChange} />
      </form>
      <button onClick = {sendTodo}>click here to send</button>
    </div>
  )
}