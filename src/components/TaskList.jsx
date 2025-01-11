import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTaskStore } from '../store/taskStore'
import { format } from 'date-fns'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline'

function TaskList() {
  const { tasks, removeTask, completeTask } = useTaskStore()

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    }
    return colors[priority] || colors.medium
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Tasks</h2>
      
      <AnimatePresence>
        {tasks.map(task => (
          <motion.div
            key={task.id}
            className={`task-card ${task.completed ? 'opacity-50' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                
                <div className="mt-2 flex gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    {task.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  Added {format(new Date(task.createdAt), 'PPp')}
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => completeTask(task.id)}
                  className="p-1 hover:text-green-600 transition-colors"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => removeTask(task.id)}
                  className="p-1 hover:text-red-600 transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {tasks.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No tasks yet. Add some tasks to get started!
        </p>
      )}
    </div>
  )
}

export default TaskList
