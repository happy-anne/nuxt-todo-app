<script setup lang="ts">
import type { Todo } from '~/composables/useTodos'

defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  toggle: [id: string]
  remove: [id: string]
}>()
</script>

<template>
  <li
    class="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-indigo-200 hover:shadow"
  >
    <button
      type="button"
      class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition"
      :class="todo.completed
        ? 'border-indigo-500 bg-indigo-500 text-white'
        : 'border-slate-300 hover:border-indigo-400'"
      :aria-label="todo.completed ? '완료 취소' : '완료'"
      @click="emit('toggle', todo.id)"
    >
      <svg
        v-if="todo.completed"
        class="h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="3"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </button>

    <span class="flex-1 min-w-0">
      <span
        class="block text-slate-700 transition"
        :class="{ 'text-slate-400 line-through': todo.completed }"
      >
        {{ todo.text }}
      </span>
      <span
        v-if="todo.dueDate"
        class="text-xs transition"
        :class="todo.completed ? 'text-slate-300' : 'text-indigo-400'"
      >
        {{ todo.dueDate }}
      </span>
    </span>

    <button
      type="button"
      class="rounded-lg px-2 py-1 text-sm text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
      aria-label="삭제"
      @click="emit('remove', todo.id)"
    >
      삭제
    </button>
  </li>
</template>
