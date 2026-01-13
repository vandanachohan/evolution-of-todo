import { useState, useRef, useEffect } from 'react';

export default function AddTodoForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    tags: '',
  });
  const [errors, setErrors] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

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

    onAdd({
      ...formData,
      tags: tagsArray
    });
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          ref={inputRef}
          id="title"
          type="text"
          className={`form-input ${errors.title ? 'error' : ''}`}
          placeholder="New Todo Title"
          value={formData.title}
          onChange={handleChange}
          name="title"
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
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
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          id="tags"
          type="text"
          className="form-input"
          placeholder="Comma separated tags"
          value={formData.tags}
          onChange={handleChange}
          name="tags"
        />
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Add Todo
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}