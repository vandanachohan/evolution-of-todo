import { useState } from 'react'

export default function TodoFilter({ onFilterChange, filters }) {
  const [searchInput, setSearchInput] = useState(filters.search || '')
  const [tempFilters, setTempFilters] = useState({
    completed: filters.completed,
    priority: filters.priority,
    sort: filters.sort,
    order: filters.order
  })

  // Apply filters after a delay to avoid too many API calls
  const applyFilters = () => {
    const newFilters = {
      ...tempFilters,
      search: searchInput
    }
    onFilterChange(newFilters)
  }

  // Debounce search input
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
    // Apply search after 500ms delay
    setTimeout(() => {
      if (e.target.value === searchInput) {
        applyFilters()
      }
    }, 500)
  }

  const handleSelectChange = (filterName, value) => {
    const newTempFilters = { ...tempFilters, [filterName]: value }
    setTempFilters(newTempFilters)
    
    // Apply all filters immediately when selection changes
    const newFilters = {
      ...newTempFilters,
      search: searchInput
    }
    onFilterChange(newFilters)
  }

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search todos..."
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="status-filter">Status:</label>
        <select
          id="status-filter"
          value={tempFilters.completed || ''}
          onChange={(e) => handleSelectChange('completed', e.target.value || null)}
          className="filter-select"
        >
          <option value="">All</option>
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority-filter">Priority:</label>
        <select
          id="priority-filter"
          value={tempFilters.priority || ''}
          onChange={(e) => handleSelectChange('priority', e.target.value || null)}
          className="filter-select"
        >
          <option value="">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter">Sort by:</label>
        <select
          id="sort-filter"
          value={tempFilters.sort}
          onChange={(e) => handleSelectChange('sort', e.target.value)}
          className="filter-select"
        >
          <option value="id">ID</option>
          <option value="title">Title</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="order-filter">Order:</label>
        <select
          id="order-filter"
          value={tempFilters.order}
          onChange={(e) => handleSelectChange('order', e.target.value)}
          className="filter-select"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  )
}