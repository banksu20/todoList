<template>
  <form class="mb-5 mt-4" @submit.prevent="saveTodo">
    <div class="row g-2 align-items-center">
      <div class="col-md-6">
        <input
          type="text"
          class="form-control form-control-lg"
          v-model="selectedTodoValue"
          required
          placeholder="Add new task..."
          autofocus
        />
      </div>
      <div class="col-md-3">
        <select
          v-model="selectedTodoCategory"
          class="form-select form-select-lg"
          required
          aria-label="Select category"
        >
          <option disabled value="">Select category</option>
          <option>Work</option>
          <option>Study</option>
          <option>Personal</option>
        </select>
      </div>
      <div class="col-md-3 d-grid">
        <button
          type="submit"
          class="btn btn-primary btn-lg"
          :class="selectedTodoId !== 0 ? 'btn-warning' : 'btn-primary'"
        >
          {{ selectedTodoId !== 0 ? "Edit Task" : "Add Task" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedTodoId: 0,
      selectedTodoValue: null,
      selectedTodoCompleted: false,
      selectedTodoCategory: "",
    };
  },

  computed: {
    ...mapGetters(["selectedTodo"]),
  },

  watch: {
    selectedTodo(newValue) {
      this.selectedTodoId = newValue ? newValue.id : 0;
      this.selectedTodoValue = newValue ? newValue.value : null;
      this.selectedTodoCompleted = newValue ? newValue.completed : false;
      this.selectedTodoCategory = newValue ? newValue.category : "";
    },
  },

  methods: {
    ...mapActions(["newTodo", "updateTodo", "selectedTodo"]),

    saveTodo() {
      if (this.selectedTodoId === 0) {
        this.newTodo({
          value: this.selectedTodoValue,
          completed: false,
          category: this.selectedTodoCategory,
        }).then(() => {
          this.selectedTodoValue = null;
          this.selectedTodoCategory = "";
        });
      } else {
        this.updateTodo({
          id: this.selectedTodoId,
          value: this.selectedTodoValue,
          completed: this.selectedTodoCompleted,
          category: this.selectedTodoCategory,
        }).then(() => {
          this.selectedTodo(null);
          this.selectedTodoId = 0;
          this.selectedTodoValue = null;
          this.selectedTodoCompleted = false;
          this.selectedTodoCategory = "";
        });
      }
    },
  },
};
</script>
