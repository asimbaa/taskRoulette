import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTaskStore } from '../store/taskStore';
import toast from 'react-hot-toast';

function QuickAddTask() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Work',
    priority: 'medium'
  });
  
  const { addTask, categories } = useTaskStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    addTask({
      ...formData,
      completed: false,
      createdAt: new Date().toISOString()
    });

    toast.success('Task added successfully!');
    setFormData({
      title: '',
      description: '',
      category: 'Work',
      priority: 'medium'
    });
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.target.matches('textarea')) {
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed right-6 bottom-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 
                   rounded-full shadow-lg flex items-center justify-center text-white z-50
                   hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon className="w-6 h-6" />
      </motion.button>

      {/* Quick Add Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl p-4 z-50
                         shadow-xl max-w-lg mx-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Quick Add Task</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter task title..."
                  className="input"
                  autoFocus
                />

                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description (optional)"
                  className="input min-h-[80px] resize-none"
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="input"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white
                             hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default QuickAddTask;
