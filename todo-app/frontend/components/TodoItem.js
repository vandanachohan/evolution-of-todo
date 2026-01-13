import { useState } from 'react';
import EditTodoForm from './EditTodoForm';

export default function TodoItem({ todo, onUpdate, onDelete, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="todo-item">
        <EditTodoForm
          todo={todo}
          onSave={(updatedTodo) => {
            onUpdate(todo.id, updatedTodo);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />

      <div className="todo-content">
        <h3 className={todo.completed ? 'completed-title' : ''}>{todo.title}</h3>
        <span className={`priority priority-${todo.priority}`}>{todo.priority}</span>
        {todo.tags && todo.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
        <div className="todo-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}