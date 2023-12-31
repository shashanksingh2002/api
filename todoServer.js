/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
 */
const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.use(bodyParser.json());

let toDoLists = [];
let idNumber = 1;

/*
1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
*/
app.get('/todos',(req,res)=>{
   res.status(200).send(toDoLists);
});


/*
2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
*/

app.get('/todos/:id',(req,res)=>{
   const targetId = req.params.id;
   console.log(typeof targetId)
    toDoLists.forEach((data)=>{
      if(data.id == targetId){
        const idJSON = {
          "title":data.title,
          "desc":data.desc
        }
        res.status(200).send(idJSON);
      }
    })
    res.sendStatus(404);
});


/*
3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
*/

app.post('/todos',(req,res)=>{
    const todoItem = {
      "id":idNumber,
      "title": req.body.title,
      "desc":req.body.description
    }
    idNumber = idNumber + 1;
    toDoLists.push(todoItem);
    res.status(201).send(`{id:${idNumber-1}}`);
});


/*
4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
*/

app.put('/todos/:id',(req,res)=>{
  const targetId = req.params.id;
  toDoLists.forEach((data)=>{
    if(data.id == targetId){
        data.title = req.body.title;
        res.sendStatus(200);
    }
  });
  res.sendStatus(404);
});


/*
5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123
*/

app.delete('/todos/:id',(req,res)=>{
    const targetId = req.params.id;
    const index = toDoLists.findIndex(obj => obj.id == targetId);
    if(index !== -1) {
      toDoLists.splice(index, 1);
      res.sendStatus(200);
    }
    res.sendStatus(404);
});

app.listen(port,()=>{
  console.log("Server is listening at port:",port);
});



module.exports = app;
