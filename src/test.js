const http = require('http');

// Simple test suite (no external dependencies)
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

async function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            body: JSON.parse(data)
          });
        } catch {
          resolve({
            statusCode: res.statusCode,
            body: data
          });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting tests...\n');

  // Start the app
  const { server } = require('./app.js');
  
  // Wait for server to be ready
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // Test 1: Health check
    const health = await makeRequest('/health');
    assert(health.statusCode === 200, 'Health check returns 200');
    assert(health.body.status === 'healthy', 'Health check status is healthy');

    // Test 2: Get all todos
    const todos = await makeRequest('/api/todos');
    assert(todos.statusCode === 200, 'GET /api/todos returns 200');
    assert(Array.isArray(todos.body), 'Todos response is an array');
    assert(todos.body.length >= 3, 'Initial todos are present');

    // Test 3: Create todo
    const newTodo = await makeRequest('/api/todos', 'POST', { title: 'Test Todo' });
    assert(newTodo.statusCode === 201, 'POST /api/todos returns 201');
    assert(newTodo.body.title === 'Test Todo', 'New todo has correct title');
    assert(newTodo.body.completed === false, 'New todo is not completed');

    // Test 4: Update todo
    const updated = await makeRequest(`/api/todos/${newTodo.body.id}`, 'PUT', { completed: true });
    assert(updated.statusCode === 200, 'PUT /api/todos/:id returns 200');
    assert(updated.body.completed === true, 'Todo is marked as completed');

    // Test 5: Delete todo
    const deleted = await makeRequest(`/api/todos/${newTodo.body.id}`, 'DELETE');
    assert(deleted.statusCode === 200, 'DELETE /api/todos/:id returns 200');

    console.log('\n✅ All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    server.close();
  }
}

runTests();