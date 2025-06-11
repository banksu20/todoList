import { createStore } from "vuex";

const state = {
    lastId: 0,
    todoList: [],
    selectedTodo: null 
};

const getters = {
    todoList: (state) => state.todoList,
    selectedTodo: (state) => state.selectedTodo
};


const mutations = {
    NEW_TODO(state, data) {
        state.lastId++;
        data.id = state.lastId;
        state.todoList.unshift(data);
    },
    UPDATE_TODO(state, data) {
        let index = state.todoList.findIndex((item) => item.id === data.id);
        if(index !== -1) state.todoList[index] = data;
    },
    SELECT_TODO(state, data) {
        state.selectedTodo = data;
    },
    DELETE_TODO(state, id) {
        state.todoList = state.todoList.filter((item) => item.id !== id);
    },
    REORDER_TODO(state, newList) {
        state.todoList = newList
    }
};

const actions = {
    newTodo({ commit }, todo){
        commit('NEW_TODO', todo)
    },
    updateTodo({ commit }, todo) {
        commit('UPDATE_TODO', todo)
    },
    selectedTodo({ commit }, todo) {
        commit('SELECT_TODO', todo)
    },
    deleteTodo({ commit }, id) {
        commit('DELETE_TODO', id)
    },
    reorderTodo({ commit },newList) {
        commit('REORDER_TODO', newList)
    }
};

const store = createStore({
    state,
    getters,
    mutations,
    actions
})

export default store;