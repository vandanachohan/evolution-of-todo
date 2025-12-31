import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function EditTodo({ todos, updateTodo, deleteTodo }) {
  const router = useRouter()
  const { id } = router.query
  const [todo, setTodo] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    tags: '',
    completed: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Find the todo by ID when todos are loaded
  useEffect(() => {
    if (todos && id) {
      const foundTodo = todos.find(t => t.id === parseInt(id))
      if (foundTodo) {
        setTodo(foundTodo)
        // Set form data with the todo's current values
        setFormData({
          title: foundTodo.title || '',
          priority: foundTodo.priority || 'medium',
          tags: foundTodo.tags ? foundTodo.tags.join(', ') : '',
          completed: foundTodo.completed || false
        })
        setLoading(false)
      }
    }
  }, [todos, id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (formData.title.length > 255) {
      newErrors.title = 'Title must be less than 256 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setSubmitting(true)
    
    try {
      // Parse tags from comma-separated string to array
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : []
      
      await updateTodo(parseInt(id), {
        title: formData.title,
        priority: formData.priority,
        tags: tagsArray,
        completed: formData.completed
      })
      
      router.push('/')
    } catch (error) {
      console.error('Error updating todo:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo(parseInt(id))
        router.push('/')
      } catch (error) {
        console.error('Error deleting todo:', error)
      }
    }
  }

  if (loading) return <div className="loading">Loading todo...</div>
  if (!todo) return <div className="error">Todo not found</div>

  return (
    <div className="container">
      <div className="form-container">
        <h1>Edit Todo</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter todo title"
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-input"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-input"
              placeholder="work, personal, urgent"
            />
          </div>
          
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
              />
              Mark as completed
            </label>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
            <Link href="/" className="btn btn-secondary">Cancel</Link>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update Todo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}