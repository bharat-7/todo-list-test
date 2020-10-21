

const taskValidator     = require('./validators/taskValidator');
const taskController    = require('./controllers/taskController');


app.post("/task/create",    taskValidator.create,   taskController.create);
app.get("/task/fetch",      taskValidator.fetch,    taskController.fetch);
app.put("/task/update",     taskValidator.update,   taskController.update);
app.delete("/task/remove",  taskValidator.remove,   taskController.remove);
