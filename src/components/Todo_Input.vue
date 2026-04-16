<template>
  <form class="input-container" @submit.prevent="saveTodo">
    <div class="d-flex gap-2 w-100 align-items-center">
      <input
        type="text"
        class="form-control custom-input flex-grow-1"
        v-model="selectedTodoValue"
        required
        placeholder="Add new task..."
        autofocus
      />
      <select
        v-model="selectedTodoCategory"
        class="form-select custom-select"
        style="width: 140px;"
        required
        aria-label="Select category"
      >
        <option disabled value="">Category</option>
        <option>Health</option>
        <option>Work</option>
        <option>Mental Health</option>
        <option>Others</option>
      </select>
      <input
        type="time"
        class="form-control custom-input"
        v-model="selectedTodoTime"
        style="width: 110px;"
        required
        aria-label="Select time"
      />
      <button
        type="submit"
        class="btn custom-btn"
        :class="selectedTodoId !== 0 ? 'custom-btn-warning' : ''"
      >
        {{ selectedTodoId !== 0 ? "Edit" : "Add" }}
      </button>
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
      selectedTodoTime: "",
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
      this.selectedTodoTime = newValue ? newValue.time : "";
    },
  },

  methods: {
    ...mapActions(["newTodo", "updateTodo", "selectedTodoAction"]),

    saveTodo() {
      if (this.selectedTodoId === 0) {
        this.newTodo({
          value: this.selectedTodoValue,
          completed: false,
          category: this.selectedTodoCategory,
          time: this.selectedTodoTime,
          createdAt: new Date().toISOString(),
        }).then(() => {
          this.selectedTodoValue = null;
          this.selectedTodoCategory = "";
          this.selectedTodoTime = "";
        });
      } else {
        this.updateTodo({
          id: this.selectedTodoId,
          value: this.selectedTodoValue,
          completed: this.selectedTodoCompleted,
          category: this.selectedTodoCategory,
          time: this.selectedTodoTime,
        }).then(() => {
          this.selectedTodoAction(null);
          this.selectedTodoId = 0;
          this.selectedTodoValue = null;
          this.selectedTodoCompleted = false;
          this.selectedTodoCategory = "";
          this.selectedTodoTime = "";
        });
      }
    },
  },
};
</script>
