const request = require('supertest');
const app = require('./app');

async function runTests() {
  console.log('🧪 Starting tests...\n');

  try {
    // Test 1: Health check
    console.log('Testing health endpoint...');
    const health = await request(app).get('/health');
    if (health.status !== 200) throw new Error('Health check failed');
    if (health.body.status !== 'healthy') throw new Error('Health status incorrect');
    console.log('✅ Health check passed');

    // Test 2: Get all todos
    console.log('Testing GET /api/todos...');
    const todos = await request(app).get('/api/todos');
    if (todos.status !== 200) throw new Error('GET todos failed');
    if (!Array.isArray(todos.body)) throw new Error('Todos not an array');
    console.log('✅ GET /api/todos passed');

    // Test 3: Create todo
    console.log('Testing POST /api/todos...');
    const newTodo = await request(app)
      .post('/api/todos')
      .send({ title: 'Test Todo' });
    if (newTodo.status !== 201) throw new Error('POST todo failed');
    if (newTodo.body.title !== 'Test Todo') throw new Error('Todo title incorrect');
    console.log('✅ POST /api/todos passed');

    // Test 4: Update todo
    console.log('Testing PUT /api/todos/:id...');
    const updated = await request(app)
      .put(`/api/todos/${newTodo.body.id}`)
      .send({ completed: true });
    if (updated.status !== 200) throw new Error('PUT todo failed');
    if (updated.body.completed !== true) throw new Error('Todo not marked completed');
    console.log('✅ PUT /api/todos/:id passed');

    // Test 5: Delete todo
    console.log('Testing DELETE /api/todos/:id...');
    const deleted = await request(app).delete(`/api/todos/${newTodo.body.id}`);
    if (deleted.status !== 200) throw new Error('DELETE todo failed');
    console.log('✅ DELETE /api/todos/:id passed');

    console.log('\n✅ All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTests();