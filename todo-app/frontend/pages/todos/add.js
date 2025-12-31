import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function AddTodo() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    tags: '',
    completed: false
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (formData.title.length > 255) newErrors.title = 'Title must be less than 256 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)

    try {
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : []

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          priority: formData.priority,
          tags: tagsArray,
          completed: formData.completed
        })
      })

      if (!res.ok) throw new Error('Failed to add todo')
      router.push('/')
    } catch (err) {
      alert(err.message)
      console.error('Error adding todo:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container">
      <h1>Add New Todo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter todo title"
          />
          {errors.title && <p style={{color:'red'}}>{errors.title}</p>}
        </div>
        <div>
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Tags (comma-separated)</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="work, personal, urgent" />
        </div>
        <div>
          <label>
            <input type="checkbox" name="completed" checked={formData.completed} onChange={handleChange} />
            Mark as completed
          </label>
        </div>
        <div style={{marginTop:'10px'}}>
          <Link href="/" style={{marginRight:'10px'}}>Cancel</Link>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
      </form>
    </div>
  )
}
