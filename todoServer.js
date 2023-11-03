const express = require("express");
const app = express();

let todoList = [];
let countId = 0;
const PORT = 3000;

//to parse json requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//get all tasks
app.get("/todos", (req, res) => {
  res.send(todoList);
});

//get single task
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  //get single task from array
  const requested_task = todoList.find((item) => item.id === id);
  res.status(200).send(requested_task);
});
//Create single task
app.post("/todos", (req, res) => {
  console.log(req.body);

  countId++;
  const todo_new_data = req.body;
  todo_new_data["id"] = countId;

  todoList.push(todo_new_data);
  res.status(201).send(`Created with the ID ${countId}`);
});
//Update single task
app.put("/todos/:id", (req, res) => {
  const modified_id = parseInt(req.params.id);

  const new_task = req.body.description;

  const update_task = todoList.find((item) => item.id === modified_id);

  if (update_task) {
    update_task.description = new_task;
    console.log(todoList);
    res.status(200).send("OK");
  } else {
    res.status(404).send("Not found");
  }
});
//delete single task
app.delete("/todos/:id", (req, res) => {
  const delete_id = parseInt(req.params.id);
  const delete_list = todoList.find((item) => item.id === delete_id);
  if (delete_list) {
    todoList = todoList.filter((item) => item.id !== delete_id);
    res.status(200).send("OK");
  } else {
    res.status(404).send("Not found");
  }
});
app.listen(PORT, console.log(`Server is listening on ${PORT}`));
