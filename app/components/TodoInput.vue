<script setup lang="ts">
const emit = defineEmits<{
  add: [text: string]
}>()

const text = ref('')

function submit() {
  if (!text.value.trim()) return
  emit('add', text.value)
  text.value = ''
}
</script>

<template>
  <form class="flex gap-2" @submit.prevent="submit">
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
  </form>
</template>
