import create from 'zustand'

export const useTaskStore = create((set) => ({
  tasks: [],
  selectedTask: null,
  categories: ['Work', 'Personal', 'Health', 'Learning'],
  
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, { ...task, id: Date.now() }] 
  })),
  
  removeTask: (taskId) => set((state) => ({ 
    tasks: state.tasks.filter(task => task.id !== taskId) 
  })),
  
  selectRandomTask: () => set((state) => {
    const availableTasks = state.tasks.filter(task => !task.completed)
    if (availableTasks.length === 0) return state
    
    const randomIndex = Math.floor(Math.random() * availableTasks.length)
    return { selectedTask: availableTasks[randomIndex] }
  }),
  
  completeTask: (taskId) => set((state) => ({
    tasks: state.tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    )
  })),
}))
