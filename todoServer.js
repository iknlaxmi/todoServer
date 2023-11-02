const express = require("express");
const app = express();

let todoList = [
  { id: "1", task: "Running" },
  { id: "2", task: "Baking" },
  { id: "3", task: "Reading" },
];
let countId = 3;
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
  res.send(requested_task);
});
//Create single task
app.post("/todos", (req, res) => {
  console.log(req.body);
  todoList.push(req.body);
  res.send("Ok");
});
//Update single task
app.put("/todos/:id", (req, res) => {
  const modified_id = req.params.id;

  const new_task = req.body.task;

  const update_task = todoList.find((item) => item.id === modified_id);

  if (update_task) {
    update_task.task = new_task;
    console.log(todoList);
  }
  res.send("ok");
});
//delete single task
app.delete("/todos/:id", (req, res) => {
  const delete_id = req.params.id;
  todoList = todoList.filter((item) => item.id !== delete_id);
  res.send("Ok");
});
app.listen(PORT, console.log(`Server is listening on ${PORT}`));
