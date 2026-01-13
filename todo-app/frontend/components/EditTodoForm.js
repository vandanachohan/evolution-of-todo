import { useState } from 'react';

export default function EditTodoForm({ todo, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: todo.title || '',
    priority: todo.priority || 'medium',
    tags: todo.tags ? todo.tags.join(', ') : '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.title.length > 255) newErrors.title = 'Title must be less than 256 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Convert tags to array
    const tagsArray = formData.tags
      ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      : [];

    onSave({
      ...formData,
      tags: tagsArray
    });
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="edit-title">Title *</label>
        <input
          id="edit-title"
          type="text"
          className={`form-input ${errors.title ? 'error' : ''}`}
          value={formData.title}
          onChange={handleChange}
          name="title"
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="edit-priority">Priority</label>
        <select
          id="edit-priority"
          className="form-input"
          value={formData.priority}
          onChange={handleChange}
          name="priority"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="edit-tags">Tags (comma-separated)</label>
        <input
          id="edit-tags"
          type="text"
          className="form-input"
          value={formData.tags}
          onChange={handleChange}
          name="tags"
          placeholder="Comma separated tags"
        />
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}