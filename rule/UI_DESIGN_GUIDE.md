# 🎨 万家系统 UI 设计规范

## 📋 文档概述

本规范定义了万家系统的用户界面设计标准，确保系统具有一致性、可用性和专业性。

---

## 🏗️ 系统框架分析

### 技术栈组成

```
万家系统 (WANJIA v6.3.0)
├── 前端框架: Vue 3 + TypeScript
├── UI组件库: Element Plus
├── 构建工具: Vite
├── 样式方案: Tailwind CSS + SCSS
├── 状态管理: Pinia
├── 路由管理: Vue Router
├── HTTP客户端: Axios
├── 图标系统: Iconify + 自定义图标
└── 开发语言: 中文界面 + 英文代码
```

## 🎯 设计原则

### 1. 一致性原则

- **视觉一致性**: 颜色、字体、间距统一
- **交互一致性**: 操作逻辑、反馈机制统一
- **组件一致性**: 相同功能使用相同组件

### 2. 可用性原则

- **简洁明了**: 界面清晰，减少认知负担
- **操作便捷**: 常用功能易于访问
- **反馈及时**: 用户操作有明确反馈

### 3. 专业性原则

- **业务导向**: 符合房地产行业特点
- **数据优先**: 重视数据展示和查询效率
- **流程规范**: 遵循业务流程逻辑

---

## 🎨 视觉规范

### 颜色系统

#### 主色调

```css
/* 品牌主色 */
--primary-color: #409eff; /* 蓝色 - 主要操作 */
--primary-hover: #66b1ff; /* 悬停状态 */
--primary-active: #3a8ee6; /* 激活状态 */

/* 功能色 */
--success-color: #67c23a; /* 绿色 - 成功状态 */
--warning-color: #e6a23c; /* 橙色 - 警告状态 */
--danger-color: #f56c6c; /* 红色 - 错误状态 */
--info-color: #909399; /* 灰色 - 信息状态 */
```

#### 中性色

```css
--text-primary: #303133; /* 主要文字 */
--text-regular: #606266; /* 常规文字 */
--text-secondary: #909399; /* 次要文字 */
--text-placeholder: #c0c4cc; /* 占位文字 */

--border-base: #dcdfe6; /* 边框基础色 */
--border-light: #e4e7ed; /* 边框浅色 */
--border-lighter: #ebeef5; /* 边框更浅色 */
--border-extra-light: #f2f6fc; /* 边框极浅色 */

--background-base: #f5f7fa; /* 背景基础色 */
--background-white: #ffffff; /* 白色背景 */
```

### 字体系统

#### 字体族

```css
font-family:
  "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
```

#### 字号规范

```css
--font-size-extra-large: 20px; /* 标题大号 */
--font-size-large: 18px; /* 标题中号 */
--font-size-medium: 16px; /* 标题小号 */
--font-size-base: 14px; /* 正文标准 */
--font-size-small: 13px; /* 正文小号 */
--font-size-mini: 12px; /* 辅助文字 */
```

#### 字重规范

```css
--font-weight-primary: 500; /* 主要字重 */
--font-weight-medium: 500; /* 中等字重 */
--font-weight-bold: 600; /* 粗体字重 */
```

### 间距系统

```css
--spacing-xs: 4px; /* 超小间距 */
--spacing-sm: 8px; /* 小间距 */
--spacing-md: 16px; /* 中间距 */
--spacing-lg: 24px; /* 大间距 */
--spacing-xl: 32px; /* 超大间距 */
```

---

## 🧩 组件规范

### 按钮规范

#### 主要按钮

```vue
<el-button type="primary">主要操作</el-button>
```

- **用途**: 主要操作，如"查询"、"新建合同"、"导出Excel"
- **颜色**: 蓝色背景 (#409eff)
- **文字**: 白色
- **悬停**: 浅蓝色 (#66b1ff)

#### 次要按钮

```vue
<el-button>次要操作</el-button>
```

- **用途**: 次要操作，如"重置"、"取消"
- **颜色**: 白色背景，灰色边框
- **文字**: 深灰色

#### 链接按钮

```vue
<el-button type="primary" link>链接按钮</el-button>
```

- **用途**: 文字链接样式，如"更多查询"、"编辑"
- **颜色**: 蓝色文字，无背景
- **悬停**: 浅蓝色文字

#### 类型筛选按钮（所有类型）

```vue
<el-radio-group v-model="selectedType" size="default">
  <el-radio-button label="">全部</el-radio-button>
  <el-radio-button label="sale">买卖</el-radio-button>
  <el-radio-button label="rent">租赁</el-radio-button>
  <el-radio-button label="agency">代理</el-radio-button>
  <el-radio-button label="valuation">评估</el-radio-button>
</el-radio-group>
```

- **用途**: 类型筛选、分类切换，如"全部"、"买卖"、"租赁"等
- **样式**: 使用 `el-radio-button` 实现按钮组效果
- **默认状态**:
  - 背景: 白色 (#fff)
  - 边框: #dcdfe6
  - 文字: #606266
- **选中状态**:
  - 背景: #409eff (主色)
  - 边框: #409eff
  - 文字: 白色 (#fff)
- **悬停状态**:
  - 文字: #409eff (主色)
- **尺寸**: 默认尺寸，内边距 8px 20px
- **圆角**: 4px，首尾按钮分别圆角

### 表格规范

#### 表格结构

```vue
<el-table :data="tableData" style="width: 100%" stripe @row-click="handleView">
  <!-- 合同编号、类型、状态、金额等 -->
  <el-table-column
    prop="contractNo"
    label="合同编号"
    width="140"
    show-overflow-tooltip
  />
  
  <!-- 操作列 -->
  <el-table-column label="操作" width="120" fixed="right">
    <template #default="{ row }">
      <el-button type="primary" link @click.stop="handleEdit(row)">
        编辑
      </el-button>
    </template>
  </el-table-column>
</el-table>
```

#### 表格样式规范

- **头部背景**: #f5f7fa (浅灰色)
- **头部文字**: #606266 (深灰色)
- **斑马纹**: #fafafa (淡灰色)
- **悬停效果**: #f5f7fa (浅灰色)
- **边框**: 简洁无边框设计
- **对齐**: 文字左对齐，数字右对齐

### 表单规范

#### 搜索表单

```vue
<div class="search-bar">
  <div class="search-main">
    <!-- 搜索项 -->
    <div class="search-item">
      <label>合同编号</label>
      <el-input v-model="searchForm.contractNo" placeholder="请输入" clearable />
    </div>

    <!-- 操作按钮 -->
    <div class="search-actions">
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" link @click="showAdvancedSearch = !showAdvancedSearch">
        更多查询
      </el-button>
    </div>
  </div>
</div>
```

#### 表单样式规范

- **标签对齐**: 右对齐，宽度一致
- **输入框**: 统一宽度 (160px)
- **间距**: 元素间距8px
- **布局**: 弹性布局，自动换行
- **操作区**: 右侧对齐

### 卡片规范

#### 页面卡片

```css
.card-container {
  padding: 20px 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 5%);
}
```

- **内边距**: 20px上下，24px左右
- **背景**: 白色
- **圆角**: 8px
- **阴影**: 轻微阴影，透明度5%

---

## 📱 响应式设计

### 断点设置

```css
/* 超小屏幕 (手机) */
@media (max-width: 768px) {
  /* 移动端适配 */
}

/* 小屏幕 (平板) */
@media (min-width: 769px) and (max-width: 1024px) {
  /* 平板适配 */
}

/* 中等屏幕 (桌面) */
@media (min-width: 1025px) and (max-width: 1440px) {
  /* 桌面适配 */
}

/* 大屏幕 (宽屏) */
@media (min-width: 1441px) {
  /* 宽屏适配 */
}
```

### 移动端适配

- **表格**: 横向滚动，固定重要列
- **表单**: 垂直布局，全宽输入
- **按钮**: 增大点击区域
- **字体**: 适当增大字号

---

## 🎨 业务组件规范

### 合同列表页面规范

#### 页面结构

```
合同列表页面
├── 页面标题 ("WJ合同列表")
├── 搜索区域 (折叠式高级搜索)
├── 操作按钮 ("新建合同", "导出Excel")
├── 数据表格 (合同信息展示)
└── 分页/加载更多 (根据需求)
```

#### 列顺序规范

1. **合同编号** - 唯一标识
2. **类型** - 合同类型
3. **状态** - 合同状态
4. **合同金额** - 交易金额
5. **房源编号** - 房源信息
6. **客源编号** - 客源信息
7. **物业地址** - 房产地址
8. **业主** - 业主姓名
9. **客户** - 客户姓名
10. **时间信息** - 签约、录入等时间

#### 数据展示规范

- **金额**: 右对齐，千分位分隔符
- **编号**: 可点击查看详情
- **地址**: 超出部分省略号，tooltip显示完整
- **时间**: 统一格式 (YYYY-MM-DD HH:mm)
- **状态**: 彩色标签显示

### 表单页面规范

#### 表单布局

```
表单页面
├── 页面标题
├── 表单内容区
│   ├── 基本信息分组
│   ├── 详细信息分组
│   └── 其他信息分组
└── 操作按钮区
    ├── 保存按钮 (主要)
    ├── 取消按钮 (次要)
    └── 重置按钮 (可选)
```

#### 输入规范

- **必填项**: 红色星号 (\*) 标识
- **输入验证**: 实时验证，错误提示
- **占位文字**: 提供输入示例
- **帮助文字**: 复杂字段提供说明

---

## 🔄 交互规范

### 页面转场

- **加载状态**: 骨架屏或loading动画
- **转场动画**: 淡入淡出，0.3s
- **错误处理**: 友好错误页面

### 操作反馈

- **成功**: 绿色提示，自动消失
- **警告**: 橙色提示，需要确认
- **错误**: 红色提示，详细说明
- **信息**: 蓝色提示，中性信息

### 加载状态

```vue
<!-- 表格加载 -->
<el-table v-loading="loading" :data="tableData">
  <!-- 表格内容 -->
</el-table>

<!-- 按钮加载 -->
<el-button :loading="loading" type="primary">
  查询
</el-button>
```

---

## 📊 数据可视化规范

### 图表技术栈

- **图表库**: ECharts 6.x
- **集成方式**: @pureadmin/table 或直接使用 echarts

### 图表颜色

```css
/* 图表配色方案 - 遵循 Element Plus 规范 */
--chart-color-1: #409eff; /* 蓝色 - 主色 */
--chart-color-2: #67c23a; /* 绿色 - 成功 */
--chart-color-3: #e6a23c; /* 橙色 - 警告 */
--chart-color-4: #f56c6c; /* 红色 - 危险 */
--chart-color-5: #909399; /* 灰色 - 信息 */
--chart-color-6: #c7d2ff; /* 浅蓝 */
--chart-color-7: #a6d89e; /* 浅绿 */
--chart-color-8: #fcd34d; /* 金黄 */
--chart-color-9: #f78ca0; /* 粉红 */
--chart-color-10: #b4b4b4; /* 中灰 */
```

### 图表类型选择

- **趋势数据**: 折线图
- **对比数据**: 柱状图
- **占比数据**: 饼图 / 环形图
- **分布数据**: 散点图
- **排名数据**: 横向柱状图

### 📈 柱状图规范

#### 基本柱状图

```vue
<template>
  <div ref="barChartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const barChartRef = ref<HTMLElement>();

onMounted(() => {
  const chart = echarts.init(barChartRef.value);
  chart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: { lineStyle: { color: '#e4e7ed' } },
      axisLabel: { color: '#606266', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: '#606266', fontSize: 12 },
      splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [820, 932, 901, 934, 1290, 1330],
        itemStyle: {
          color: '#409eff',
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '30%',
        barGap: '10%'
      }
    ]
  });
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>
```

#### 柱状图样式规范

| 元素 | 规范值 |
|------|--------|
| 柱子颜色 | #409eff (主色) |
| 柱子圆角 | 4px (上圆角) |
| 柱子宽度 | 30% (根据数据量调整) |
| 柱子间距 | 10% |
| 悬浮提示 | axis 触发，显示阴影 |
| 网格线 | #f0f0f0，虚线 |
| 坐标轴线 | #e4e7ed |
| 坐标轴文字 | #606266，12px |
| 悬浮高亮 | 透明度 80% |

#### 堆叠柱状图

```ts
series: [
  {
    name: '第一季度',
    type: 'bar',
    stack: 'total',
    data: [320, 302, 301],
    itemStyle: { color: '#409eff' }
  },
  {
    name: '第二季度',
    type: 'bar',
    stack: 'total',
    data: [120, 132, 101],
    itemStyle: { color: '#67c23a' }
  }
]
```

### 📉 折线图规范

#### 基本折线图

```ts
option = {
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLine: { lineStyle: { color: '#e4e7ed' } },
    axisLabel: { color: '#606266' }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#606266' },
    splitLine: { lineStyle: { color: '#f0f0f0' } }
  },
  series: [
    {
      name: '访问量',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        color: '#409eff',
        width: 2
      },
      itemStyle: {
        color: '#409eff'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
            { offset: 1, color: 'rgba(64, 158, 255, 0.05)' }
          ]
        }
      }
    }
  ]
};
```

#### 折线图样式规范

| 元素 | 规范值 |
|------|--------|
| 线条颜色 | #409eff |
| 线条宽度 | 2px |
| 线条平滑 | smooth: true |
| 数据点 | 圆形，8px |
| 数据点颜色 | #409eff |
| 区域填充 | 渐变从 30% 到 5% 透明度 |
| 悬浮显示 | 数据点放大 |

#### 多折线图

```ts
series: [
  {
    name: '新房',
    type: 'line',
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    itemStyle: { color: '#409eff' }
  },
  {
    name: '二手房',
    type: 'line',
    data: [620, 732, 701, 734, 890, 930, 820],
    itemStyle: { color: '#67c23a' }
  }
]
```

### 🥧 饼图规范

#### 基本饼图

```ts
option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'horizontal',
    bottom: '0%',
    textStyle: { color: '#606266', fontSize: 12 }
  },
  color: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399'],
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: 'bold',
          color: '#303133'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' }
      ]
    }
  ]
};
```

#### 饼图样式规范

| 元素 | 规范值 |
|------|--------|
| 饼图类型 | 环形图 (radius: ['40%', '70%']) |
| 颜色序列 | #409eff, #67c23a, #e6a23c, #f56c6c, #909399 |
| 扇区间隙 | 2px 白色边框 |
| 扇区圆角 | 8px |
| 悬浮效果 | 放大 + 阴影 + 中心显示标签 |
| 图例位置 | 底部水平排列 |
| 标签颜色 | #303133，18px 加粗 |

#### 玫瑰图 (南丁格尔图)

```ts
series: [
  {
    name: '面积模式',
    type: 'pie',
    roseType: 'radius',
    radius: [20, '70%'],
    itemStyle: {
      borderRadius: 8
    },
    color: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']
  }
]
```

### 📊 通用图表配置

#### 容器样式

```scss
.chart-wrapper {
  width: 100%;
  height: 400px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
```

#### 响应式配置

```ts
// 监听窗口大小变化
window.addEventListener('resize', () => {
  chart.resize();
});
```

#### 主题配置

```ts
// 统一图表主题
echarts.setOption({
  textStyle: {
    fontFamily: 'Microsoft YaHei, sans-serif'
  }
});
```

### 图表使用场景

| 场景 | 推荐图表 | 说明 |
|------|----------|------|
| 月度销售趋势 | 折线图 | 展示数据随时间变化 |
| 各区域业绩对比 | 柱状图 | 横向/纵向对比 |
| 房源类型占比 | 饼图/环形图 | 展示部分与整体关系 |
| 区域房价分布 | 散点图 | 展示数据分布 |
| 经纪人业绩排名 | 横向柱状图 | 排名对比 |
| 年度成交走势 | 面积折线图 | 强调累计数据 |

---

## 🔧 开发规范

### 文件命名

- **Vue组件**: PascalCase (ContractList.vue)
- **工具函数**: camelCase (getContractList.ts)
- **常量定义**: UPPER_SNAKE_CASE (API_BASE_URL)
- **样式文件**: kebab-case (contract-list.scss)

### 代码风格

```typescript
// 接口定义
interface ContractResult {
  contractID: string;
  contractNo: string;
  contractType: number;
}

// 函数定义
const getContractList = async (params: ContractQuery): Promise<ApiResult> => {
  // 函数实现
};

// 组件定义
const searchForm = reactive({
  contractNo: "",
  propertyAddress: "",
  startSignTime: ""
});
```

### 注释规范

```vue
<template>
  <!-- 合同列表页面 -->
  <div class="contract-page">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <!-- 合同编号搜索 -->
      <el-input v-model="searchForm.contractNo" />
    </div>
  </div>
</template>
```

---

## 📱 移动端适配规范

### 响应式断点

```css
/* 移动端优先 */
.mobile-only {
  display: none;
}
.desktop-only {
  display: block;
}

@media (max-width: 768px) {
  .mobile-only {
    display: block;
  }
  .desktop-only {
    display: none;
  }

  /* 移动端样式调整 */
  .search-main {
    flex-direction: column;
    align-items: stretch;
  }

  .search-item {
    width: 100%;
  }
}
```

### 触摸优化

- **按钮大小**: 最小44px × 44px
- **点击区域**: 适当增大可点击区域
- **手势支持**: 滑动、捏合等手势操作
- **键盘类型**: 根据输入类型选择合适的键盘

---

## 🚀 性能优化规范

### 加载优化

- **代码分割**: 按路由和组件分割
- **懒加载**: 图片和组件懒加载
- **缓存策略**: 合理的缓存配置
- **压缩优化**: 资源压缩和优化

### 渲染优化

- **虚拟滚动**: 大数据列表使用虚拟滚动
- **防抖节流**: 频繁操作使用防抖节流
- **计算缓存**: 复杂计算使用缓存
- **组件复用**: 避免不必要的组件重建

---

## 🔍 测试规范

### 视觉测试

- **像素完美**: 与设计稿保持一致
- **跨浏览器**: Chrome, Firefox, Safari, Edge
- **跨设备**: 桌面、平板、手机
- **无障碍**: 支持屏幕阅读器

### 功能测试

- **交互测试**: 所有交互功能正常
- **数据测试**: 数据展示和提交正确
- **错误处理**: 异常情况处理完善
- **性能测试**: 加载速度和响应时间

---

## 📚 相关文件

### 必须文件

- `UI_DESIGN_GUIDE.md` - 本设计规范文档
- `src/style/element-plus.scss` - Element Plus 主题定制
- `src/style/tailwind.css` - Tailwind CSS 配置
- `src/style/index.scss` - 全局样式文件

### 推荐文件

- `src/style/variables.scss` - 样式变量定义
- `src/style/mixins.scss` - 样式混合器
- `src/style/animations.scss` - 动画定义
- `src/components/README.md` - 组件使用说明

---

## 🎯 实施建议

### 开发阶段

1. **组件库**: 基于Element Plus进行二次封装
2. **样式系统**: 使用Tailwind CSS + 自定义样式
3. **图标系统**: Iconify + 业务图标库
4. **主题定制**: 通过CSS变量实现主题切换

### 维护阶段

1. **定期更新**: 根据业务需求更新规范
2. **团队培训**: 定期培训设计规范
3. **代码审查**: 严格按照规范进行代码审查
4. **用户反馈**: 收集用户反馈，持续优化

---

## 📞 联系方式

如有设计规范相关问题，请联系：

- **技术负责人**: [负责人姓名]
- **设计负责人**: [设计师姓名]
- **更新日期**: 2024年

---

_本规范将根据项目发展和用户反馈持续更新完善。_
