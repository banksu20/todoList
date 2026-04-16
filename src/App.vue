<script setup>
import { ref, onMounted } from 'vue';
import Todo_Input from './components/Todo_Input.vue';
import Todo_List from './components/Todo_List.vue';
import Calendar_View from './components/Calendar_View.vue';

const currentDate = ref('');
const currentDay = ref('');

onMounted(() => {
  const optionsDate = { year: 'numeric', month: 'short', day: 'numeric' };
  const today = new Date();
  // Using fixed logic to say "26 Dec" style if we want, or real date.
  const dayStr = today.getDate();
  const monthStr = today.toLocaleDateString('en-US', { month: 'short' });
  currentDate.value = `${dayStr} ${monthStr}`;
});
</script>

<template>
  <div class="app-dashboard container py-4 h-100">
    <div class="input-section mb-4">
      <Todo_Input />
    </div>

    <div class="row h-100 gx-5">
      <!-- Left Screen: Tasks -->
      <div class="col-lg-6 col-md-12 mb-5 h-100 d-flex flex-column tasks-column">
         <div class="tasks-header mb-4 text-start">
            <h2 class="fw-bold mb-1 d-inline-block me-2">Tasks</h2>
            <span class="text-muted fw-normal fs-4">{{ currentDate }}</span>
         </div>
         <div class="flex-grow-1 overflow-auto pe-2">
            <Todo_List />
         </div>
      </div>

      <!-- Right Screen: Calendar -->
      <div class="col-lg-6 col-md-12 h-100 calendar-column">
         <Calendar_View />
      </div>
    </div>
  </div>
</template>
