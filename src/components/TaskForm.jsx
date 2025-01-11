import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTaskStore } from '../store/taskStore'
import toast from 'react-hot-toast'

function TaskForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Work',
    priority: 'medium'
  })
  
  const { addTask, categories } = useTaskStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      toast.error('Please enter a task title')
      return
    }
    
    addTask({
      ...formData,
      completed: false,
      createdAt: new Date().toISOString()
    })
    
    setFormData({
      title: '',
      description: '',
      category: 'Work',
      priority: 'medium'
    })
    
    toast.success('Task added successfully!')
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="task-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          className="input"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        
        <textarea
          placeholder="Description"
          className="input"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        
        <select
          className="input"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <select
          className="input"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        
        <button type="submit" className="btn btn-primary w-full">
          Add Task
        </button>
      </div>
    </motion.form>
  )
}

export default TaskForm
