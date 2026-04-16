<template>
  <div class="calendar-view h-100 d-flex flex-column">
    <div class="calendar-header mb-4 text-start">
       <h2 class="mb-1">Calendar <span class="text-muted fw-normal">26 Dec</span></h2>
    </div>

    <!-- Date Strip -->
    <div class="date-strip d-flex gap-2 mb-4 overflow-auto pb-2">
      <div v-for="date in dates" :key="date.day" class="date-item text-center flex-shrink-0" :class="{ 'active': date.isActive }">
        <div class="date-day text-uppercase text-muted" style="font-size: 0.7rem;">{{ date.weekday }}</div>
        <div class="date-num fw-bold pb-1 pt-1 fs-5">{{ date.day }}</div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="timeline flex-grow-1 overflow-auto pe-2">
      <div v-for="hour in hours" :key="hour" class="timeline-row d-flex align-items-start mb-4">
        <!-- Time label -->
        <div class="time-label text-muted text-end me-3 flex-shrink-0" style="width: 45px; font-size: 0.8rem; margin-top: 5px;">
           {{ hour }}:00
        </div>
        
        <!-- Task Slot -->
        <div class="time-slot flex-grow-1">
          <div v-for="task in getTasksForHour(hour)" :key="task.id" class="timeline-task p-3 rounded" :class="getTaskBadgeClass(task.category)">
             <div class="d-flex align-items-center">
               <div class="timeline-dot me-2 rounded-circle" :class="getTaskDotClass(task.category)"></div>
               <span class="fw-bold text-dark text-truncate">{{ task.value }}</span>
             </div>
          </div>
          <!-- Empty visual indicator -->
          <div v-if="getTasksForHour(hour).length === 0" class="time-slot-empty border-bottom" style="height: 30px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      hours: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      dates: [
        { weekday: 'Wed', day: '25', isActive: false },
        { weekday: 'Thu', day: '26', isActive: true },
        { weekday: 'Fri', day: '27', isActive: false },
        { weekday: 'Sat', day: '28', isActive: false },
        { weekday: 'Sun', day: '29', isActive: false },
      ]
    };
  },
  computed: {
    ...mapGetters(['todoList'])
  },
  methods: {
    getTasksForHour(hour) {
      return this.todoList.filter(task => {
        if (!task.time) return false;
        const taskHour = parseInt(task.time.split(':')[0], 10);
        return taskHour === hour;
      });
    },
    getTaskBadgeClass(category) {
      if (category === 'Health') return 'bg-pastel-blue';
      if (category === 'Work') return 'bg-pastel-green';
      if (category === 'Mental Health') return 'bg-pastel-pink';
      return 'bg-pastel-gray';
    },
    getTaskDotClass(category) {
      if (category === 'Health') return 'dot-blue';
      if (category === 'Work') return 'dot-green';
      if (category === 'Mental Health') return 'dot-pink';
      return 'dot-gray';
    }
  }
}
</script>

<style scoped>
.date-item {
  width: 60px;
  height: 70px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;
}
.date-item.active {
  border: 2px solid #333;
  color: #000;
}
.timeline-dot {
  width: 10px;
  height: 10px;
}
.dot-blue { background-color: #a4bdf6; }
.dot-green { background-color: #a4e0bd; }
.dot-pink { background-color: #c975a6; }
.dot-gray { background-color: #8c8c8c; }

.bg-pastel-blue { background-color: rgba(164, 189, 246, 0.15); }
.bg-pastel-green { background-color: rgba(164, 224, 189, 0.2); }
.bg-pastel-pink { background-color: rgba(239, 218, 242, 0.5); }
.bg-pastel-gray { background-color: rgba(214, 214, 214, 0.3); }

/* Timeline empty row specific */
.time-slot-empty {
  border-bottom: 2px solid #f2f2f2;
}

/* Hide scrollbar for dates */
.date-strip::-webkit-scrollbar {
  display: none;
}
.date-strip {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
