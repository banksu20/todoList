<template>
  <div>
    <div class="mb-3 mt-2 d-flex align-items-center justify-content-between">
      <label for="categoryFilter" class="form-label fw-semibold mb-0">Filter by category:</label>
      <select
        id="categoryFilter"
        v-model="filterCategory"
        class="form-select w-auto"
        aria-label="Filter todos by category"
      >
        <option value="">All</option>
        <option>Work</option>
        <option>Study</option>
        <option>Personal</option>
      </select>
    </div>

    <draggable
      v-model="filteredTodoList"
      item-key="id"
      @change="onReorder"
      handle=".drag-handle"
      animation="200"
      class="list-group"
    >
      <template #item="{ element }">
        <li
          class="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded"
          :class="{'bg-light-subtle': !element.completed, 'bg-success bg-opacity-10': element.completed}"
          style="cursor: grab;"
          @mouseover="hover = element.id"
          @mouseleave="hover = null"
        >
          <div class="d-flex align-items-center">
            <span
              class="drag-handle me-3 fs-4 text-secondary"
              title="Drag to reorder"
              style="cursor: grab;"
            >
              ☰
            </span>
            <label
              :for="'todo-checkbox-' + element.id"
              class="mb-0 fw-semibold"
              :class="{ 'text-decoration-line-through': element.completed, 'text-muted': element.completed }"
              style="user-select:none;"
            >
              {{ element.value }}
            </label>
            <span
              class="badge ms-3"
              :class="{
                'bg-primary': element.category === 'Work',
                'bg-info': element.category === 'Study',
                'bg-warning text-dark': element.category === 'Personal',
              }"
            >
              {{ element.category }}
            </span>
          </div>

          <div class="btn-group btn-group-sm" role="group" aria-label="Actions">
            <button
              class="btn btn-outline-secondary"
              @click="selectedTodo(element)"
              title="Edit"
            >
              <i class="bi bi-pencil"></i>
            </button>
            <button
              class="btn btn-outline-danger"
              @click="removeTodo(element.id)"
              title="Delete"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </li>
      </template>
    </draggable>
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
      filterCategory: "",
      hover: null,
    };
  },
  computed: {
    ...mapGetters(["todoList"]),
    filteredTodoList: {
      get() {
        if (!this.filterCategory) return this.todoList;
        return this.todoList.filter(
          (todo) => todo.category === this.filterCategory
        );
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
        text: "Do you really want to delete this task?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteTodo(id).then(() => {
            this.selectedTodo(null);
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          });
        }
      });
    },

    completeTodo(todo) {
      todo.completed = !todo.completed;
      this.updateTodo(todo);
    },

    onReorder() {
      // filteredTodoList setter handles reordering
    },
  },
};
</script>