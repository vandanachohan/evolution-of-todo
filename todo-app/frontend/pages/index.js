import { useState, useEffect, useRef } from 'react';
import TodoFilter from '../components/TodoFilter';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    completed: null,
    priority: null,
    search: '',
    sort: 'id',
    order: 'asc',
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    priority: 'medium',
    tags: '',
  });

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodo, setEditingTodo] = useState({
    title: '',
    priority: 'medium',
    tags: '',
  });

  const inputRef = useRef(null);

  // ---------------------------
  // FETCH TODOS
  // ---------------------------
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filters.completed !== null) query.append('completed', filters.completed ? 'true' : 'false');
      if (filters.priority) query.append('priority', filters.priority);
      if (filters.search) query.append('search', filters.search);
      if (filters.sort) query.append('sort', filters.sort);
      if (filters.order) query.append('order', filters.order);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch todos');

      const data = await res.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  useEffect(() => {
    if (showAddForm && inputRef.current) inputRef.current.focus();
  }, [showAddForm]);

  // ---------------------------
  // CRUD
  // ---------------------------
  const addTodo = async () => {
    if (!newTodo.title.trim()) return alert('Title required');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });

    if (!res.ok) return alert('Failed to add todo');

    setNewTodo({ title: '', priority: 'medium', tags: '' });
    setShowAddForm(false);
    fetchTodos();
  };

  const updateTodo = async (id, data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) return alert('Update failed');

    setEditingTodoId(null);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, { method: 'DELETE' });
    if (!res.ok) return alert('Delete failed');

    fetchTodos();
  };

  const toggleComplete = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}/complete`, { method: 'PATCH' });
    if (!res.ok) return alert('Failed');

    fetchTodos();
  };

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div className="container">
      <header className="header">
        <h1>Todo List</h1>
        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
          Add Todo
        </button>
      </header>

      {/* ADD TODO FORM */}
      {showAddForm && (
        <div className="form-container">
          <div className="form-group">
            <label>Title</label>
            <input
              ref={inputRef}
              type="text"
              className="form-input todo-input"
              placeholder="New Todo Title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              className="form-input todo-priority"
              value={newTodo.priority}
              onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              className="form-input"
              placeholder="Comma separated tags"
              value={newTodo.tags}
              onChange={(e) => setNewTodo({ ...newTodo, tags: e.target.value })}
            />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary todo-add-button" onClick={addTodo}>
              Add
            </button>
            <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* FILTER */}
      <TodoFilter filters={filters} onFilterChange={(f) => setFilters((prev) => ({ ...prev, ...f }))} />

      {/* LOADING & ERROR */}
      {loading && <div className="loading">Loading todos...</div>}
      {error && <div className="error">Error: {error}</div>}

      {/* TODO LIST */}
      <div className="todo-list">
        {todos.length === 0 && !loading ? (
          <p>No todos found</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />

              <div className="todo-content">
                {editingTodoId === todo.id ? (
                  <>
                    <input
                      type="text"
                      className="form-input"
                      value={editingTodo.title}
                      onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                    />
                    <select
                      className="form-input"
                      value={editingTodo.priority}
                      onChange={(e) => setEditingTodo({ ...editingTodo, priority: e.target.value })}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <input
                      type="text"
                      className="form-input"
                      value={editingTodo.tags}
                      onChange={(e) => setEditingTodo({ ...editingTodo, tags: e.target.value })}
                    />
                    <div className="todo-actions">
                      <button className="btn btn-primary" onClick={() => updateTodo(todo.id, editingTodo)}>
                        Save
                      </button>
                      <button className="btn btn-secondary" onClick={() => setEditingTodoId(null)}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className={todo.completed ? 'completed-title' : ''}>{todo.title}</h3>
                    <span className={`priority priority-${todo.priority}`}>{todo.priority}</span>
                    {todo.tags &&
                      todo.tags.split(',').map((t) => (
                        <span key={t.trim()} className="tag">
                          {t.trim()}
                        </span>
                      ))}
                    <div className="todo-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditingTodoId(todo.id);
                          setEditingTodo({ title: todo.title, priority: todo.priority, tags: todo.tags });
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
