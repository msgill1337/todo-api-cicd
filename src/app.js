const express = require('express');
const app = express();

app.use(express.json());

let todos = [
  { id: 1, title: 'Learn Docker', completed: false },
  { id: 2, title: 'Learn Kubernetes', completed: false },
  { id: 3, title: 'Build CI/CD Pipeline', completed: false }
  { id: 4, title: 'Build Portfolio', completed: false }
];

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.BUILD_NUMBER || '1.0.0'
  });
});

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

app.post('/api/todos', (req, res) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false
  };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  todo.title = req.body.title || todo.title;
  
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });
  
  todos.splice(index, 1);
  res.json({ message: 'Todo deleted' });
});

// Only start if run directly
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Todo API listening on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Build: ${process.env.BUILD_NUMBER || 'local'}`);
  });
}

module.exports = app;