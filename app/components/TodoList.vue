<script setup lang="ts">
import type { Todo, TodoFilter } from '~/composables/useTodos'

defineProps<{
  todos: Todo[]
  filter: TodoFilter
  activeCount: number
  hasCompleted: boolean
}>()

const emit = defineEmits<{
  'update:filter': [filter: TodoFilter]
  toggle: [id: string]
  remove: [id: string]
  clearCompleted: []
}>()

const filters: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료' },
]
</script>

<template>
  <div class="space-y-4">
    <ul v-if="todos.length" class="space-y-2">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="emit('toggle', $event)"
        @remove="emit('remove', $event)"
      />
    </ul>

    <p v-else class="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center text-slate-400">
      <template v-if="filter === 'all'">할 일이 없습니다. 새 항목을 추가해 보세요.</template>
      <template v-else-if="filter === 'active'">진행 중인 할 일이 없습니다.</template>
      <template v-else>완료된 할 일이 없습니다.</template>
    </p>

    <footer
      v-if="todos.length || activeCount > 0 || hasCompleted"
      class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500"
    >
      <span>{{ activeCount }}개 남음</span>

      <div class="flex gap-1 rounded-lg bg-slate-100 p-1">
        <button
          v-for="item in filters"
          :key="item.value"
          type="button"
          class="rounded-md px-3 py-1.5 transition"
          :class="filter === item.value
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'"
          @click="emit('update:filter', item.value)"
        >
          {{ item.label }}
        </button>
      </div>

      <button
        v-if="hasCompleted"
        type="button"
        class="text-slate-400 transition hover:text-red-500"
        @click="emit('clearCompleted')"
      >
        완료 항목 삭제
      </button>
      <span v-else class="invisible">placeholder</span>
    </footer>
  </div>
</template>
