const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = {
  // Get all todos with optional filters
  getTodos: async (filters = {}) => {
    const query = new URLSearchParams();
    if (filters.completed !== null && filters.completed !== undefined) 
      query.append('completed', filters.completed);
    if (filters.priority) 
      query.append('priority', filters.priority);
    if (filters.search) 
      query.append('search', filters.search);
    if (filters.sort) 
      query.append('sort', filters.sort);
    if (filters.order) 
      query.append('order', filters.order);

    const res = await fetch(`${API_BASE_URL}/todos/?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch todos');
    return res.json();
  },

  // Get a single todo by ID
  getTodo: async (id) => {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`);
    if (!res.ok) throw new Error('Failed to fetch todo');
    return res.json();
  },

  // Create a new todo
  createTodo: async (todoData) => {
    const res = await fetch(`${API_BASE_URL}/todos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoData),
    });
    if (!res.ok) throw new Error('Failed to create todo');
    return res.json();
  },

  // Update a todo
  updateTodo: async (id, todoData) => {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoData),
    });
    if (!res.ok) throw new Error('Failed to update todo');
    return res.json();
  },

  // Delete a todo
  deleteTodo: async (id) => {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete todo');
    return res.json();
  },

  // Toggle todo completion status
  toggleTodoComplete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/todos/${id}/complete`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Failed to toggle completion status');
    return res.json();
  },
};