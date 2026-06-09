<script setup lang="ts">
useHead({
  title: 'Anne Todo',
  meta: [
    { name: 'description', content: 'Nuxt 4로 만든 간단한 투두 앱' },
  ],
})

const {
  filter,
  filteredTodos,
  activeCount,
  hasCompleted,
  addTodo,
  toggleTodo,
  removeTodo,
  clearCompleted,
} = useTodos()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100">
    <main class="mx-auto max-w-lg px-4 py-12 sm:py-16">
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold tracking-tight text-slate-800">
          Anne Todo
        </h1>
        <p class="mt-2 text-slate-500">
          Nuxt 4 · TypeScript · Tailwind
        </p>
      </header>

      <div class="space-y-6 rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
        <TodoInput @add="addTodo" />

        <TodoList
          :todos="filteredTodos"
          :filter="filter"
          :active-count="activeCount"
          :has-completed="hasCompleted"
          @update:filter="filter = $event"
          @toggle="toggleTodo"
          @remove="removeTodo"
          @clear-completed="clearCompleted"
        />
      </div>
    </main>
  </div>
</template>
