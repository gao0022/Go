<template>
  <div class="notice-list-container" :style="{ backgroundColor: pageBackgroundColor, color: textColor }">
    <div class="notice-list-header">
      <h1 :style="{ color: textColor }">通知列表</h1>
    </div>
    
    <div class="notice-list-content">
      <div v-if="loading" class="loading-container">
        <el-loading class="is-fullscreen" text="加载中..." />
      </div>
      <div v-else-if="error" class="error-container">
        <el-alert
          title="加载失败"
          type="error"
          :closable="false"
          show-icon
        />
        <el-button type="primary" @click="fetchNoticeList">重新加载</el-button>
      </div>
      <div v-else class="notice-table-container">
        <!-- 调试信息 -->
        <div class="debug-info">
          <p>数据总量: {{ total }}</p>
          <p>当前页数据量: {{ currentPageData.length }}</p>
        </div>
        
        <!-- 使用简单的表格渲染 -->
        <table class="simple-table">
          <thead>
            <tr>
              <th>通知标题</th>
              <th>发送人</th>
              <th>发送时间</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in currentPageData" :key="item.s_id || index">
              <td>
                <span :style="{ color: (item.Titlecolor=='#000000' || item.Titlecolor=='#ffffff')? textColor:item.Titlecolor, fontWeight: item.IsBold === '1' ? 'bold' : 'normal' }">
                  {{ item.S1 || '' }}
                </span>
              </td>
              <td>{{ item.SendName || '' }}</td>
              <td>{{ item.s_name || '' }}</td>
              <td>
                <img :src="`/Images/${item.S3 || ''}`" alt="状态" class="status-icon" />
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

// 引入设计规范样式
import "../../../rule/variables.scss";

// 获取背景颜色设置
const backgroundColor = ref(localStorage.getItem('backgroundColor') || '#000000');

// 计算文本颜色
const textColor = computed(() => {
  // 如果设置了灰白色或柔和的蓝色背景，使用黑色字体
  if (backgroundColor.value === '#f5f5f5' || backgroundColor.value === '#e3f2fd') {
    return '#000000';
  }
  // 其他情况使用白色字体
  return '#ffffff';
});

// 计算背景颜色
const pageBackgroundColor = computed(() => {
  return backgroundColor.value || '#000000';
});

// 状态管理
const loading = ref(false);
const error = ref(false);
const noticeList = ref<any[]>([
  {
    "S3": "ReadYes.png",
    "SendName": "周航",
    "IsTop": "0",
    "s_id": "A82313BF-BC6B-4B10-8258-75176C6FC8C5",
    "IsBold": "1",
    "s_tcolor": "#f71313",
    "s_name": "2026-02-28 17:11:46.453",
    "IsRed": "",
    "S1": "2026年2月28日藏房藏客公告",
    "Titlecolor": "#f71313"
  },
  {
    "S3": "ReadYes.png",
    "SendName": "周航",
    "IsTop": "0",
    "s_id": "A660A8E1-5907-48BD-9517-A85CE2B81290",
    "IsBold": "1",
    "s_tcolor": "#000000",
    "s_name": "2026-01-31 17:00:14.397",
    "IsRed": "",
    "S1": "2026年1月31日藏房藏客公告",
    "Titlecolor": "#000000"
  },
  {
    "S3": "ReadYes.png",
    "SendName": "任晓冶",
    "IsTop": "0",
    "s_id": "F715381B-D7C8-4728-96E7-7E5E34F629DF",
    "IsBold": "1",
    "s_tcolor": "#ff0000",
    "s_name": "2026-01-22 12:37:41.627",
    "IsRed": "",
    "S1": "关于公司2026年春节放假安排的通知",
    "Titlecolor": "#ff0000"
  }
]);
const currentPage = ref(1);
const pageSize = ref(20);

// 计算属性
const total = computed(() => noticeList.value ? noticeList.value.length : 0);
const currentPageData = computed(() => {
  if (!noticeList.value || !Array.isArray(noticeList.value)) {
    return [];
  }
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return noticeList.value.slice(start, end).filter(item => item !== undefined && item !== null);
});

// API调用
const fetchNoticeList = async () => {
  loading.value = true;
  error.value = false;
  
  try {
    // 使用正确编码的URL
    const response = await fetch('https://app4.55555566.com/jws/JsonServlet?fileName=%E9%80%9A%E7%9F%A5%E5%88%97%E8%A1%A8&param=');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    if (data && Array.isArray(data.rs0)) {
      noticeList.value = data.rs0;
      console.log('Notice list loaded:', noticeList.value);
    } else {
      console.error('Invalid data structure:', data);
      noticeList.value = [];
    }
  } catch (err) {
    console.error('Failed to fetch notice list:', err);
    error.value = true;
    // 模拟数据，用于测试
    noticeList.value = [
      {
        "S3": "ReadYes.png",
        "SendName": "周航",
        "IsTop": "0",
        "s_id": "A82313BF-BC6B-4B10-8258-75176C6FC8C5",
        "IsBold": "1",
        "s_tcolor": "#f71313",
        "s_name": "2026-02-28 17:11:46.453",
        "IsRed": "",
        "S1": "2026年2月28日藏房藏客公告",
        "Titlecolor": "#f71313"
      },
      {
        "S3": "ReadYes.png",
        "SendName": "周航",
        "IsTop": "0",
        "s_id": "A660A8E1-5907-48BD-9517-A85CE2B81290",
        "IsBold": "1",
        "s_tcolor": "#000000",
        "s_name": "2026-01-31 17:00:14.397",
        "IsRed": "",
        "S1": "2026年1月31日藏房藏客公告",
        "Titlecolor": "#000000"
      }
    ];
  } finally {
    loading.value = false;
  }
};

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const handleCurrentChange = (current: number) => {
  currentPage.value = current;
};

// 生命周期
onMounted(() => {
  fetchNoticeList();
});
</script>

<style scoped>
.notice-list-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: var(--wj-font-family);
}

.notice-list-header {
  background-color: rgba(255, 255, 255, 0.1);
  padding: var(--wj-spacing-md);
  border-bottom: 1px solid #00415f;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.notice-list-header h1 {
  font-size: var(--wj-font-size-large);
  font-weight: var(--wj-font-weight-bold);
  margin: 0;
}

.notice-list-content {
  flex: 1;
  padding: var(--wj-spacing-md);
  overflow: auto;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  gap: var(--wj-spacing-md);
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  gap: var(--wj-spacing-md);
}

.notice-table-container {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--wj-border-radius-large);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: var(--wj-spacing-md);
  overflow: hidden;
  border: 1px solid #00415f;
  backdrop-filter: blur(10px);
}

.status-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.debug-info {
  margin-bottom: var(--wj-spacing-md);
  padding: var(--wj-spacing-sm);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: var(--wj-border-radius-base);
  font-size: var(--wj-font-size-small);
}

.simple-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--wj-spacing-md);
}

.simple-table th,
.simple-table td {
  padding: var(--wj-spacing-sm);
  text-align: left;
  border-bottom: 1px solid #00415f;
}

.simple-table th {
  background-color: rgba(0, 65, 95, 0.2);
  font-weight: var(--wj-font-weight-bold);
}

.simple-table tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.pagination-container {
  margin-top: var(--wj-spacing-lg);
  display: flex;
  justify-content: flex-end;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .notice-list-content {
    padding: var(--wj-spacing-sm);
  }
  
  .notice-table-container {
    padding: var(--wj-spacing-sm);
  }
  
  .notice-list-header {
    padding: var(--wj-spacing-sm);
  }
  
  .notice-list-header h1 {
    font-size: var(--wj-font-size-medium);
  }
}
</style>