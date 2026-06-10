<script setup lang="ts">
const emit = defineEmits<{
  add: [text: string, dueDate?: string]
}>()

const text = ref('')
const dueDate = ref('')

function submit() {
  if (!text.value.trim()) return
  emit('add', text.value, dueDate.value || undefined)
  text.value = ''
  dueDate.value = ''
}
</script>

<template>
  <form class="space-y-2" @submit.prevent="submit">
    <div class="flex gap-2">
      <input
        v-model="text"
        type="text"
        placeholder="할 일을 입력하세요..."
        class="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        autocomplete="off"
      >
      <button
        type="submit"
        class="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="!text.trim()"
      >
        추가
      </button>
    </div>
    <div class="flex items-center gap-2">
      <label class="text-sm text-slate-500 shrink-0">마감일</label>
      <input
        v-model="dueDate"
        type="date"
        class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >
      <button
        v-if="dueDate"
        type="button"
        class="text-xs text-slate-400 hover:text-red-400 transition"
        @click="dueDate = ''"
      >
        지우기
      </button>
    </div>
  </form>
</template>
