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
  
  selectRandomTask: (taskId) => set((state) => {
    const selectedTask = state.tasks.find(task => task.id === taskId);
    return { selectedTask };
  }),
  
  completeTask: (taskId) => set((state) => ({
    tasks: state.tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    )
  })),
}))
