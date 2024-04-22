
import './App.css'

function App() {
  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user)

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.insertedId){
          alert("Users added successfully")
          e.target.reset()
        }
      })
  }

  return (
    <>

      <h1>Simple CRUD</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' />
        <br />
        <input type="email" name='email' />
        <br />
        <input type="submit" value="add user" />
      </form>

    </>
  )
}

export default App
