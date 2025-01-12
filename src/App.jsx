import React from 'react'
import { motion } from 'framer-motion'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import RouletteWheel from './components/RouletteWheel'
import Header from './components/Header'
import QuickAddTask from './components/QuickAddTask'
import { useTaskStore } from './store/taskStore'

function App() {
  const { selectedTask } = useTaskStore()

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <TaskForm />
          <TaskList />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 flex flex-col items-center"
        >
          <RouletteWheel />
          {selectedTask && (
            <div className="task-card w-full mt-8">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Selected Task
              </h3>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {selectedTask.title}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {selectedTask.description}
              </p>
              <div className="flex gap-2 mt-3">
                <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {selectedTask.category}
                </span>
                <span className="px-2 py-1 text-sm rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {selectedTask.priority} priority
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      <QuickAddTask />
    </div>
  )
}

export default App
