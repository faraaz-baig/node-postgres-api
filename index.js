const express = require("express")
const req = require("express/lib/request")
const res = require("express/lib/response")
const app = express()
const pool = require("./db")
require("dotenv").config()
const port = process.env.PORT

app.use(express.json()) // -> req.body

//ROUTES//

// add todo
app.post("/todos", async (req, res) => {
  try {
    const { task } = req.body
    if (task) {
      const newTodo = await pool.query(
        "INSERT INTO todo (task) VALUES ($1) RETURNING *",
        [task]
      )
      res.json({ message: "Todo was successfully added" })
    } else {
      console.log(new Error("Mismatched key names in your request data"))
    }
  } catch (err) {
    console.log(err.message)
  }
})

// get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo")
    res.json(allTodos.rows)
  } catch (err) {
    console.log(err.message)
  }
})

// get one todo

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
    if (todo.rows.length == 0) {
      res.json({ message: "The ID doesn't Exsist" })
    } else {
      res.json(todo.rows)
    }
  } catch (err) {
    console.log(err.message)
  }
})

// edit todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { task } = req.body
    const updatedTodo = await pool.query(
      "UPDATE todo SET task = $1 WHERE todo_id = $2",
      [task, id]
    )
    res.json({ message: "Todo was updated" })
  } catch (err) {
    console.log(err.message)
  }
})

// delete todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deletedTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    )
    res.json({ message: "Todo was sucessfully deleted" })
  } catch (err) {
    console.log(err.message)
  }
})

app.listen(port, () => {
  console.log("App listening on http://localhost:5000")
})
