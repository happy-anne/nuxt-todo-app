<script setup lang="ts">
import type { Todo } from '~/composables/useTodos'

const props = defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  selectDate: [date: string | null]
}>()

const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth()) // 0-indexed
const selectedDate = ref<string | null>(null)

const monthLabel = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1)
    .toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })
})

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month, 1).getDay() // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days: Array<{ date: string; day: number; inMonth: boolean }> = []

  // 이전 달 빈 칸
  for (let i = 0; i < firstDay; i++) {
    days.push({ date: '', day: 0, inMonth: false })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const mm = String(month + 1).padStart(2, '0')
    const dd = String(d).padStart(2, '0')
    days.push({ date: `${year}-${mm}-${dd}`, day: d, inMonth: true })
  }

  return days
})

const todosByDate = computed(() => {
  const map: Record<string, Todo[]> = {}
  for (const todo of props.todos) {
    if (todo.dueDate) {
      if (!map[todo.dueDate]) map[todo.dueDate] = []
      map[todo.dueDate].push(todo)
    }
  }
  return map
})

const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

function selectDay(date: string) {
  if (!date) return
  if (selectedDate.value === date) {
    selectedDate.value = null
    emit('selectDate', null)
  } else {
    selectedDate.value = date
    emit('selectDate', date)
  }
}
</script>

<template>
  <div class="select-none">
    <!-- 헤더 -->
    <div class="mb-3 flex items-center justify-between">
      <button
        type="button"
        class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100"
        @click="prevMonth"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span class="text-sm font-semibold text-slate-700">{{ monthLabel }}</span>
      <button
        type="button"
        class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100"
        @click="nextMonth"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- 요일 헤더 -->
    <div class="mb-1 grid grid-cols-7 text-center">
      <span
        v-for="day in ['일', '월', '화', '수', '목', '금', '토']"
        :key="day"
        class="py-1 text-xs font-medium"
        :class="day === '일' ? 'text-red-400' : day === '토' ? 'text-indigo-400' : 'text-slate-400'"
      >
        {{ day }}
      </span>
    </div>

    <!-- 날짜 그리드 -->
    <div class="grid grid-cols-7 gap-0.5">
      <div
        v-for="(cell, i) in calendarDays"
        :key="i"
        class="relative flex flex-col items-center"
      >
        <button
          v-if="cell.inMonth"
          type="button"
          class="relative flex h-8 w-8 flex-col items-center justify-center rounded-full text-sm transition"
          :class="[
            selectedDate === cell.date
              ? 'bg-indigo-600 text-white font-semibold'
              : cell.date === todayStr
                ? 'bg-indigo-100 text-indigo-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-100',
          ]"
          @click="selectDay(cell.date)"
        >
          {{ cell.day }}
          <!-- 투두 닷 -->
          <span
            v-if="todosByDate[cell.date]?.length"
            class="absolute bottom-0.5 flex gap-0.5"
          >
            <span
              v-for="(todo, ti) in todosByDate[cell.date].slice(0, 3)"
              :key="ti"
              class="h-1 w-1 rounded-full"
              :class="todo.completed ? 'bg-slate-300' : selectedDate === cell.date ? 'bg-white/80' : 'bg-indigo-400'"
            />
          </span>
        </button>
        <div v-else class="h-8 w-8" />
      </div>
    </div>

    <!-- 선택된 날짜 안내 -->
    <p v-if="selectedDate" class="mt-3 text-center text-xs text-slate-500">
      <span class="font-medium text-indigo-600">{{ selectedDate }}</span> 마감 항목 보기 중
      <button class="ml-1 text-slate-400 hover:text-red-400 transition" @click="selectDay(selectedDate!)">
        ✕ 해제
      </button>
    </p>
  </div>
</template>
