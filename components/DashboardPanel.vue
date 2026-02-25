<!-- <script setup>
import { ref } from 'vue'
import { useDashboardStore } from '../.vitepress/store/dashboard'

const store = useDashboardStore()
const newTask = ref('')

const handleAddTask = () => {
  store.addTodo(newTask.value)
  newTask.value = ''
}
</script>

<template>
  <div class="dashboard-panel">
    
    <div class="section">
      <h3>📅 今日待办 (可交互)</h3>
      <div class="todo-input">
        <input v-model="newTask" @keyup.enter="handleAddTask" placeholder="输入新任务，按回车添加..." />
        <button @click="handleAddTask">添加</button>
      </div>
      <ul class="todo-list">
        <li v-for="todo in store.todos" :key="todo.id">
          <label>
            <input type="checkbox" v-model="todo.done" />
            <span :class="{ 'is-done': todo.done }">{{ todo.text }}</span>
          </label>
          <button class="delete-btn" @click="store.removeTodo(todo.id)">删除</button>
        </li>
      </ul>
    </div>

    <hr />

    <div class="section">
      <h3>📊 目标进度条 (拖拽修改)</h3>
      <div v-for="item in store.progressList" :key="item.id" class="progress-item">
        <div class="progress-header">
          <strong>{{ item.name }}</strong>
          <span>{{ item.value }}%</span>
        </div>
        <input type="range" v-model.number="item.value" min="0" max="100" class="range-slider" />
        <progress :value="item.value" max="100"></progress>
      </div>
    </div>

    <hr />

    <div class="section">
      <h3>📝 灵感与碎碎念 (实时保存)</h3>
      <textarea v-model="store.notes" rows="6" placeholder="记录现在的想法..."></textarea>
    </div>

  </div>
</template>

<style scoped>
.dashboard-panel {
  background: var(--vp-c-bg-soft);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}
.section { margin-bottom: 20px; }
h3 { margin-top: 0; margin-bottom: 16px; font-size: 1.2em; color: var(--vp-c-brand); }
hr { margin: 24px 0; border: none; border-top: 1px solid var(--vp-c-divider); }

/* To-Do 样式 */
.todo-input { display: flex; gap: 10px; margin-bottom: 15px; }
.todo-input input { flex: 1; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); }
.todo-input button { padding: 8px 16px; border-radius: 6px; background: var(--vp-c-brand); color: white; cursor: pointer; }
.todo-list { list-style: none; padding: 0; margin: 0; }
.todo-list li { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px dashed var(--vp-c-divider); }
.is-done { text-decoration: line-through; color: var(--vp-c-text-3); }
.delete-btn { font-size: 0.8em; color: var(--vp-c-danger-1); cursor: pointer; background: none; border: none; }

/* 进度条样式 */
.progress-item { margin-bottom: 15px; }
.progress-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
.range-slider { width: 100%; cursor: pointer; margin-bottom: 5px; }
progress { width: 100%; height: 12px; border-radius: 6px; overflow: hidden; }

/* 记事本样式 */
textarea { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); resize: vertical; font-family: inherit; }
</style> -->