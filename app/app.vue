<script setup lang="ts">
useHead({
  title: 'Anne Todo',
  meta: [
    { name: 'description', content: 'Nuxt 4로 만든 간단한 투두 앱' },
  ],
})

const {
  todos,
  filter,
  filteredTodos,
  activeCount,
  hasCompleted,
  addTodo,
  toggleTodo,
  removeTodo,
  clearCompleted,
} = useTodos()

const showCalendar = ref(false)
const selectedDate = ref<string | null>(null)

const displayedTodos = computed(() => {
  if (selectedDate.value) {
    return todos.value.filter(t => t.dueDate === selectedDate.value)
  }
  return filteredTodos.value
})

function handleAdd(text: string, dueDate?: string) {
  addTodo(text, dueDate)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100">
    <main class="mx-auto max-w-lg px-4 py-12 sm:py-16">
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold tracking-tight text-slate-800">
          Anne Todo ^^*
        </h1>
        <p class="mt-2 text-slate-500">
          Nuxt 4 · TypeScript · Tailwind
        </p>
      </header>

      <div class="space-y-6 rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
        <TodoInput @add="handleAdd" />

        <!-- 뷰 전환 탭 -->
        <div class="flex rounded-xl border border-slate-200 p-1 gap-1">
          <button
            type="button"
            class="flex-1 rounded-lg py-1.5 text-sm font-medium transition"
            :class="!showCalendar ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'"
            @click="showCalendar = false; selectedDate = null"
          >
            목록
          </button>
          <button
            type="button"
            class="flex-1 rounded-lg py-1.5 text-sm font-medium transition"
            :class="showCalendar ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'"
            @click="showCalendar = true"
          >
            달력
          </button>
        </div>

        <!-- 달력 뷰 -->
        <TodoCalendar
          v-if="showCalendar"
          :todos="todos"
          @select-date="selectedDate = $event"
        />

        <TodoList
          :todos="displayedTodos"
          :filter="filter"
          :active-count="activeCount"
          :has-completed="hasCompleted"
          :show-filter="!selectedDate"
          @update:filter="filter = $event"
          @toggle="toggleTodo"
          @remove="removeTodo"
          @clear-completed="clearCompleted"
        />
      </div>
    </main>
  </div>
</template>
