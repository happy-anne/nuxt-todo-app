export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export type TodoFilter = 'all' | 'active' | 'completed'

const STORAGE_KEY = 'nuxt-todo-items'

export function useTodos() {
  const todos = useState<Todo[]>('todos', () => [])
  const filter = useState<TodoFilter>('todo-filter', () => 'all')
  const loaded = useState('todos-loaded', () => false)

  function persist() {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
    }
  }

  function load() {
    if (!import.meta.client || loaded.value) return

    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        todos.value = JSON.parse(stored) as Todo[]
      } catch {
        todos.value = []
      }
    }
    loaded.value = true
  }

  function addTodo(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return false

    todos.value.unshift({
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    })
    persist()
    return true
  }

  function toggleTodo(id: string) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
      persist()
    }
  }

  function removeTodo(id: string) {
    todos.value = todos.value.filter(t => t.id !== id)
    persist()
  }

  function clearCompleted() {
    todos.value = todos.value.filter(t => !t.completed)
    persist()
  }

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(t => !t.completed)
      case 'completed':
        return todos.value.filter(t => t.completed)
      default:
        return todos.value
    }
  })

  const activeCount = computed(() => todos.value.filter(t => !t.completed).length)
  const completedCount = computed(() => todos.value.filter(t => t.completed).length)
  const hasCompleted = computed(() => completedCount.value > 0)

  onMounted(load)

  watch(todos, persist, { deep: true })

  return {
    todos,
    filter,
    filteredTodos,
    activeCount,
    completedCount,
    hasCompleted,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
  }
}
