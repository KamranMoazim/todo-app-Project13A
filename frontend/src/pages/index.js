import React, { useState } from "react"
import { useQuery, gql, useMutation } from "@apollo/client"
import shortid from "shortid"

const GET_TODOS = gql`
  query {
    getTodos {
      id
      title
      done
    }
  }
`
const CREATE_TODO = gql`
  mutation createTodo($todo: TodoInput!) {
    addTodo(todo: $todo) {
      id
      title
      done
    }
  }
`
const DELETE_TODO = gql`
  mutation deleteTodo($todoId: String!) {
    deleteTodo(todoId: $todoId) 
  }
`

const UPDATE_TODO = gql`
  mutation updateTodo($todo: TodoInput!) {
    updateTodo(todo: $todo) {
      id
      title
      done
    }
  }
`
let ID = shortid.generate()

const Index = () => {

  const [title, setTitle] = useState("")
  const [completed, setCompleted] = useState(false)
  const [id, setId] = useState(ID)
  const [hasUpdatedClicked, setHasUpdatedClicked] = useState(false)
  // const [hasAddClicked, setHasAddClicked] = useState(false)
  const { data, loading } = useQuery(GET_TODOS)
  const [createNote] = useMutation(CREATE_TODO)
  const [deleteNote] = useMutation(DELETE_TODO)
  const [updateNote] = useMutation(UPDATE_TODO)

  const AddTodo = async () => {
    const todo = {
      // id: shortid.generate(),
      id,
      title,
      done: completed,
    }
    // await createNote({ variables: { todo } })
    if (!hasUpdatedClicked) {
      await updateNote({ variables: { todo } })
      console.log("Updating Todo:", todo)
      setTitle("")
      ID = shortid.generate()
      setId(ID)
      setCompleted(false)
    } else {
      await createNote({ variables: { todo } })
      console.log("Creating Todo:", todo)
      setTitle("")
      ID = shortid.generate()
      setId(ID)
      setCompleted(false)
    }
  }
  
  const DeleteTodo = async (todoId) => {
    console.log("Deleting Todo")
    console.log(todoId)
    await deleteNote({ variables: { todoId } })
  }

  const AddForUpdate = (Id,Title,Done) => {
    setHasUpdatedClicked(!hasUpdatedClicked)
    if (!hasUpdatedClicked) {      
      setTitle(Title)
      setCompleted(Done)
      setId(Id)
      console.log("object");
    } else {
      setTitle("")
      setCompleted(false)
      setId(ID)
    }
  }
  
  return (
    <div>
      {loading && <h1>Loading ...</h1>}

      <label> Todo: <input value={title} onChange={({ target }) => setTitle(target.value)} /> </label>
      <form>
        <label>Status: </label>
        <select onChange={({ target })=> setCompleted(target.value) } value={completed}>
          <option value={true}>Completed</option>
          <option value={false}>Not Completed</option>
        </select>
      </form>
      <button onClick={() => AddTodo()}>{hasUpdatedClicked?"Update Todo":"Create Todo"}</button>


      {!loading &&
        data &&
        data.getTodos.map(item => (
          <div style={{ marginLeft: "1rem", marginTop: "2rem" }} key={item.id}>
            {item.title} {item.done ? "COMPLETED" : "NOT COMPLETED"}
            <button onClick={()=>{DeleteTodo(item.id)}}>Delete Todo</button>
            <button onClick={()=>{AddForUpdate(item.id,item.title,item.done)}}>{hasUpdatedClicked && item.id===id?"Click to Remove from Update State":"Update Todo"}</button>
          </div>
        ))}
    </div>
  )
}

export default Index




// BackendStack.GraphQLAPIKey = da2-fig4hbjrhzacngtxumo2rjct34
// BackendStack.GraphQLAPIURL = https://fiwcikb3ungozh45s2ztfol44e.appsync-api.us-east-1.amazonaws.com/graphql
// BackendStack.StackRegion = us-east-1