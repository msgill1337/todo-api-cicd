const express = require('express');
const app = express();

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m'
};

app.use(express.json());

// Middleware for colorful logging
app.use((req, res, next) => {
  const method = req.method;
  const methodColor = {
    'GET': colors.green,
    'POST': colors.blue,
    'PUT': colors.yellow,
    'DELETE': colors.red
  }[method] || colors.reset;
  
  console.log(`${methodColor}${method}${colors.reset} ${colors.cyan}${req.path}${colors.reset}`);
  next();
});

let todos = [
  { id: 1, title: 'Learn Docker', completed: false, emoji: '🐳' },
  { id: 2, title: 'Learn Kubernetes', completed: false, emoji: '☸️' },
  { id: 3, title: 'Build CI/CD Pipeline', completed: false, emoji: '🚀' },
  { id: 4, title: 'Build Portfolio', completed: false, emoji: '💼' },
  { id: 5, title: 'Finalize project', completed: false, emoji: '✨' }
];

// Serve a cool HTML frontend
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🚀 Todo API</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease-out;
    }
    
    .todo-item {
      transition: all 0.3s ease;
    }
    
    .todo-item:hover {
      transform: translateX(10px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    
    .btn-pulse {
      animation: pulse 2s infinite;
    }
    
    .gradient-bg {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .glass {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  </style>
</head>
<body class="gradient-bg min-h-screen py-8 px-4">
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8 fade-in">
      <h1 class="text-6xl font-bold text-white mb-4">
        🚀 Todo API
      </h1>
      <p class="text-xl text-purple-200">
        Build: ${process.env.BUILD_NUMBER || 'local'} | Environment: ${process.env.NODE_ENV || 'dev'}
      </p>
    </div>

    <!-- Status Card -->
    <div class="glass rounded-2xl p-6 mb-6 fade-in text-white">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-xl font-semibold">System Status: Healthy ✅</span>
        </div>
        <div class="text-sm opacity-75">
          Last checked: <span id="timestamp">--</span>
        </div>
      </div>
    </div>

    <!-- Add Todo -->
    <div class="glass rounded-2xl p-6 mb-6 fade-in">
      <h2 class="text-2xl font-bold text-white mb-4">➕ Add New Todo</h2>
      <div class="flex gap-3">
        <input 
          id="newTodo" 
          type="text" 
          placeholder="Enter todo title..."
          class="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button 
          onclick="addTodo()"
          class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all btn-pulse"
        >
          Add ✨
        </button>
      </div>
    </div>

    <!-- Todos List -->
    <div class="glass rounded-2xl p-6 fade-in">
      <h2 class="text-2xl font-bold text-white mb-4">📋 Your Todos</h2>
      <div id="todosList" class="space-y-3">
        <!-- Todos will be loaded here -->
      </div>
    </div>

    <!-- API Docs -->
    <div class="glass rounded-2xl p-6 mt-6 fade-in">
      <h2 class="text-2xl font-bold text-white mb-4">📚 API Endpoints</h2>
      <div class="space-y-2 text-white/80 font-mono text-sm">
        <div><span class="text-green-400">GET</span> /api/todos - Get all todos</div>
        <div><span class="text-blue-400">POST</span> /api/todos - Create todo</div>
        <div><span class="text-yellow-400">PUT</span> /api/todos/:id - Update todo</div>
        <div><span class="text-red-400">DELETE</span> /api/todos/:id - Delete todo</div>
        <div><span class="text-purple-400">GET</span> /health - Health check</div>
      </div>
    </div>
  </div>

  <script>
    async function loadTodos() {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      
      const todosList = document.getElementById('todosList');
      todosList.innerHTML = todos.map(todo => \`
        <div class="todo-item bg-white/10 rounded-lg p-4 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <input 
              type="checkbox" 
              \${todo.completed ? 'checked' : ''}
              onclick="toggleTodo(\${todo.id}, \${!todo.completed})"
              class="w-5 h-5 rounded"
            />
            <span class="text-white text-lg \${todo.completed ? 'line-through opacity-50' : ''}">
              \${todo.emoji || '📌'} \${todo.title}
            </span>
          </div>
          <button 
            onclick="deleteTodo(\${todo.id})"
            class="px-4 py-2 bg-red-500/50 hover:bg-red-500 text-white rounded-lg transition-all"
          >
            🗑️ Delete
          </button>
        </div>
      \`).join('');
    }

    async function addTodo() {
      const input = document.getElementById('newTodo');
      const title = input.value.trim();
      
      if (!title) return;
      
      await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      
      input.value = '';
      loadTodos();
    }

    async function toggleTodo(id, completed) {
      await fetch(\`/api/todos/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      });
      
      loadTodos();
    }

    async function deleteTodo(id) {
      await fetch(\`/api/todos/\${id}\`, {
        method: 'DELETE'
      });
      
      loadTodos();
    }

    async function updateStatus() {
      const response = await fetch('/health');
      const data = await response.json();
      document.getElementById('timestamp').textContent = new Date(data.timestamp).toLocaleTimeString();
    }

    // Load on startup
    loadTodos();
    updateStatus();
    setInterval(updateStatus, 5000);

    // Enter key to add todo
    document.getElementById('newTodo').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTodo();
    });
  </script>
</body>
</html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.BUILD_NUMBER || '1.0.0',
    uptime: process.uptime(),
    emoji: '💚'
  });
});

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found', emoji: '❌' });
  res.json(todo);
});

app.post('/api/todos', (req, res) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false,
    emoji: req.body.emoji || '📌'
  };
  todos.push(todo);
  console.log(`${colors.green}✅ Created:${colors.reset} ${todo.title}`);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found', emoji: '❌' });
  
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  todo.title = req.body.title || todo.title;
  
  console.log(`${colors.yellow}✏️  Updated:${colors.reset} ${todo.title}`);
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Todo not found', emoji: '❌' });
  
  const deleted = todos.splice(index, 1)[0];
  console.log(`${colors.red}🗑️  Deleted:${colors.reset} ${deleted.title}`);
  res.json({ message: 'Todo deleted', emoji: '✅' });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log('\n');
    console.log(colors.cyan + '╔══════════════════════════════════════╗' + colors.reset);
    console.log(colors.cyan + '║' + colors.bright + '     🚀 TODO API SERVER STARTED     ' + colors.reset + colors.cyan + '║' + colors.reset);
    console.log(colors.cyan + '╚══════════════════════════════════════╝' + colors.reset);
    console.log('');
    console.log(`${colors.green}✅ Port:${colors.reset}        ${colors.bright}${port}${colors.reset}`);
    console.log(`${colors.blue}🌍 Environment:${colors.reset} ${colors.bright}${process.env.NODE_ENV || 'development'}${colors.reset}`);
    console.log(`${colors.magenta}📦 Build:${colors.reset}       ${colors.bright}${process.env.BUILD_NUMBER || 'local'}${colors.reset}`);
    console.log(`${colors.yellow}🔗 URL:${colors.reset}         ${colors.bright}http://localhost:${port}${colors.reset}`);
    console.log('');
    console.log(colors.cyan + '════════════════════════════════════════' + colors.reset);
    console.log('');
  });
}

module.exports = app;