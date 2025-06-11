<script setup>
import Todo_Input from './components/Todo_Input.vue';
import Todo_List from './components/Todo_List.vue';


</script>

<template>
  <div class="position-absolute top-50 start-50 translate-middle w-50">
    <div class="card rounded-4">
      <div class="card-header py-4">
        <h2 class="card-title mb-0 text-center">
          Todo List
        </h2>
      </div>
      <div class="card-body">
        <Todo_Input />
        <Todo_List/>

      </div>
    </div>
  </div>
</template>

