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
    <div className="min-h-screen p-4 md:p-8">
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
          className="space-y-6"
        >
          <RouletteWheel />
          {selectedTask && (
            <div className="task-card">
              <h3 className="text-xl font-bold mb-2">Selected Task</h3>
              <p>{selectedTask.title}</p>
              <p className="text-gray-600 dark:text-gray-400">{selectedTask.description}</p>
            </div>
          )}
        </motion.div>
      </main>

      <QuickAddTask />
    </div>
  )
}

export default App
