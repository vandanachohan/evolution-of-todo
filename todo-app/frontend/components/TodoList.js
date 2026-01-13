import TodoItem from './TodoItem';

export default function TodoList({ todos, loading, error, onUpdate, onDelete, onToggleComplete }) {
  if (loading) return <div className="loading">Loading todos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  if (todos.length === 0) {
    return <p>No todos found</p>;
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
}