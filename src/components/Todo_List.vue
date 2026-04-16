<template>
  <div class="tasks-dashboard">
    <!-- Summary Cards -->
    <div class="row g-3 mb-4">
      <div class="col-6">
        <div class="stat-card stat-health">
          <i class="bi bi-heart-fill fs-4 icon-health"></i>
          <div class="stat-text"><span class="fw-bold text-dark">{{ categoryCounts['Health'] || 0 }}</span> Health</div>
        </div>
      </div>
      <div class="col-6">
        <div class="stat-card stat-work">
          <i class="bi bi-person-workspace fs-4 icon-work"></i>
          <div class="stat-text"><span class="fw-bold text-dark">{{ categoryCounts['Work'] || 0 }}</span> Work</div>
        </div>
      </div>
      <div class="col-6">
        <div class="stat-card stat-mental">
          <i class="bi bi-bandaid-fill fs-4 icon-mental"></i>
          <div class="stat-text"><span class="fw-bold text-dark">{{ categoryCounts['Mental Health'] || 0 }}</span> Mental Health</div>
        </div>
      </div>
      <div class="col-6">
        <div class="stat-card stat-others">
          <i class="bi bi-folder-fill fs-4 icon-others"></i>
          <div class="stat-text"><span class="fw-bold text-dark">{{ categoryCounts['Others'] || 0 }}</span> Others</div>
        </div>
      </div>
    </div>

    <!-- Todo List -->
    <draggable
      v-model="filteredTodoList"
      item-key="id"
      @change="onReorder"
      handle=".drag-handle"
      animation="200"
      class="list-unstyled mb-0"
    >
      <template #item="{ element }">
        <li
          class="todo-item d-flex justify-content-between align-items-start"
          :class="{'completed': element.completed}"
        >
          <div class="d-flex w-100 align-items-start pe-3">
            <input 
              class="form-check-input mt-1 me-3 flex-shrink-0 custom-checkbox" 
              type="checkbox" 
              :id="'todo-checkbox-' + element.id"
              :checked="element.completed"
              @change="completeTodo(element)"
            />

            <div class="d-flex flex-column w-100">
              <label
                :for="'todo-checkbox-' + element.id"
                class="todo-text mb-1"
                :class="{ 'completed-text': element.completed }"
              >
                {{ element.value }}
              </label>
              
              <div class="d-flex align-items-center mt-1">
                <span
                  class="badge-custom text-uppercase"
                  :class="{
                    'badge-health': element.category === 'Health',
                    'badge-work': element.category === 'Work',
                    'badge-mental': element.category === 'Mental Health',
                    'badge-others': element.category === 'Others' || !element.category,
                  }"
                >
                  {{ element.category || 'Others' }}
                </span>
              </div>
            </div>
          </div>

          <div class="d-flex flex-column align-items-end flex-shrink-0 gap-1">
             <span class="drag-handle fs-5" title="Drag to reorder" style="cursor: grab;">
                <i class="bi bi-grip-vertical text-muted"></i>
             </span>
             <div class="d-flex gap-1 mt-1">
                <button class="action-btn edit" @click="selectedTodo(element)" title="Edit">
                  <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="action-btn delete" @click="removeTodo(element.id)" title="Delete">
                  <i class="bi bi-trash-fill"></i>
                </button>
             </div>
          </div>
        </li>
      </template>
    </draggable>
    
    <div v-if="filteredTodoList.length === 0" class="text-center mt-4 text-muted" style="font-size: 0.9rem;">
       No tasks found.
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
import draggable from "vuedraggable";

export default {
  components: { draggable },
  data() {
    return {
      hover: null,
    };
  },
  computed: {
    ...mapGetters(["todoList", "categoryCounts"]),
    filteredTodoList: {
      get() {
        return this.todoList; // For dashboard, show all
      },
      set(newList) {
        this.reorderTodo(newList);
      },
    },
  },
  methods: {
    ...mapActions([
      "selectedTodo",
      "deleteTodo",
      "updateTodo",
      "reorderTodo",
    ]),

    removeTodo(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "Delete this task?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteTodo(id);
        }
      });
    },

    completeTodo(todo) {
      todo.completed = !todo.completed;
      this.updateTodo(todo);
    },

    onReorder() {
      // setter handles reordering
    },
  },
};
</script>