<template>
  <div class="app-container">
    <!-- 标签页栏 -->
    <div class="tabs-bar">
      <div 
        v-for="(tab, index) in tabs" 
        :key="tab.id"
        class="tab-item"
        :class="{ 'active': activeTabId === tab.id }"
      >
        <div class="tab-title" @click="switchTab(tab.id)">{{ tab.title }}</div>
        <button 
          v-if="!tab.isHome" 
          class="tab-close" 
          @click.stop="closeTab(tab.id)"
        >×</button>
      </div>
    </div>
    
    <!-- 标签内容区域 -->
    <div class="tab-content">
      <!-- 首页标签内容 -->
      <div v-if="activeTabId === homeTabId" class="desktop" :style="desktopStyle" @dragover.prevent @drop="onDesktopDrop">
        <!-- 第一行：A区、AA区、B区 -->
        <div class="desktop-row first-row">
          <!-- A区：图片轮播 -->
          <div class="desktop-section section-a">
            <div class="carousel-container">
              <div class="carousel" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                <div 
                v-for="(image, index) in carouselImages" 
                :key="index" 
                class="carousel-slide"
              >
                <img :src="image" :alt="`轮播图${index + 1}`" />
                <div class="carousel-title">系统功能展示 {{ index + 1 }}</div>
              </div>
              </div>
              <div class="carousel-indicators">
                <span 
                  v-for="(image, index) in carouselImages" 
                  :key="index"
                  class="indicator"
                  :class="{ active: currentSlide === index }"
                  @click="currentSlide = index"
                ></span>
              </div>
            </div>
          </div>
          
          <!-- AA区：通知列表 -->
          <div class="desktop-section section-aa">
            <div class="section-header">
              <h3 :style="{ color: textColor }">通知列表</h3>
            </div>
            <div class="notice-list" v-if="!noticeLoading" @wheel="handleNoticeScroll" 
                 @touchstart="handleTouchStart($event, noticeListRef)" 
                 @touchmove="handleTouchMove($event, noticeListRef)" 
                 @touchend="handleTouchEnd" ref="noticeListRef">
              <div 
                v-for="(notice, index) in noticeList" 
                :key="index"
                class="notice-item"
              >
                <div class="notice-title">{{ notice.S1 }}</div>
                <div class="notice-time">{{ notice.s_name }}</div>
              </div>
            </div>
            <div v-else class="loading">加载中...</div>
          </div>
          
          <!-- B区：二维码 -->
          <div class="desktop-section section-b">
            <div class="qr-code-container">
              <div class="qr-code" ref="qrCodeRef"></div>
              <div class="qr-code-text" :style="{ color: textColor }">扫码登录</div>
            </div>
          </div>
        </div>
        
        
        
        <!-- 第三行：G区 -->
        <div class="desktop-row third-row">
          <div class="desktop-section section-g" :class="{ maximized: isGSectionMaximized }">
            <div class="section-header">
              <h3 :style="{ color: textColor }">应用图标</h3>
              <button class="more-button" @click="toggleGSectionMaximize" :style="{ color: textColor }">●●●</button>
            </div>
            <div class="icon-grid" ref="iconGrid" @touchstart="handleTouchStart($event, iconGrid)" @touchmove="handleTouchMove($event, iconGrid)" @touchend="handleTouchEnd">
              <div
                v-for="(item, index) in menuItems"
                :key="item.name"
                class="icon-item"
                :class="{ 
                  'dragging': draggingItem === index,
                  'new-item': newItems.has(item.name),
                  'folder': item.type === 'folder'
                }"
                draggable="true"
                @click="item.type === 'folder' ? openFolder(item) : openSpreadJSTab(item)"
                @dragstart="onDragStart(index, $event)"
                @dragover.prevent="onDragOver(index, $event)"
                @drop="onDrop(index, $event)"
                @dragleave="onDragLeave($event)"
                @mouseenter="hoveredItem = index"
                @mouseleave="hoveredItem = null"
              >
                <div class="drop-indicator" :class="{ 'active': dropTargetIndex === index && dropPosition === 'before' }"></div>
                <div class="icon-image" :class="{ 'folder-image': item.type === 'folder' }">
                  <img v-if="!item.type" :src="getImageByItem(item)" :alt="item.name" />
                  <div v-else class="folder-icon">
                    <div class="folder-top"></div>
                    <div class="folder-body">
                      <div class="folder-items-count">{{ item.items ? item.items.length : 0 }}</div>
                    </div>
                  </div>
                </div>
                <div class="icon-label" :style="{ color: iconLabelColor, textShadow: iconLabelShadow }">{{ item.name }}</div>
                <div class="drop-indicator after" :class="{ 'active': dropTargetIndex === index && dropPosition === 'after' }"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 第四行：H区 -->
        <div class="desktop-row fourth-row">
          <div class="desktop-section section-h">
            <div class="dock" ref="dock" @dragover.prevent @drop="onDockDrop">
              <div
                v-for="(item, index) in favoriteItems"
                :key="item.name"
                class="dock-icon"
                :class="{ 'dragging': draggingFavorite === index }"
                draggable="true"
                @click="item.type === 'folder' ? openFolder(item) : openSpreadJSTab(item)"
                @contextmenu.prevent="removeFromFavorites(index)"
                @dragstart="onDragStartFavorite(index, $event)"
                @mouseenter="hoveredFavorite = index"
                @mouseleave="hoveredFavorite = null"
              >
                <div class="icon-image">
                  <img :src="getImageByItem(item)" :alt="item.name" />
                </div>
                <div class="icon-label" :style="{ color: iconLabelColor, textShadow: iconLabelShadow }">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 设置按钮 -->
        <div class="settings-button" @click="toggleSettings">
          设置
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading">加载中...</div>
        
        <!-- 文件夹窗口 -->
        <div v-if="showFolder" class="folder-window-overlay" @click="closeFolder">
          <div class="folder-window" @click.stop :style="{ backgroundColor: folderWindowBackground }">
            <div class="folder-header" :style="{ backgroundColor: folderWindowBackground.replace('0.95', '0.9'), borderBottomColor: folderWindowTextColor + '20' }">
              <div class="folder-name-container">
                <input 
                  v-if="editingFolderName" 
                  v-model="folderNameInput" 
                  class="folder-name-input"
                  :style="{ color: folderWindowTextColor, backgroundColor: folderWindowBackground.replace('0.95', '0.8'), borderColor: '#007aff' }"
                  @blur="finishEditFolderName"
                  @keyup.enter="finishEditFolderName"
                  @keyup.escape="editingFolderName = false"
                  ref="folderNameInputRef"
                />
                <div v-else class="folder-name" :style="{ color: folderWindowTextColor }" @click="startEditFolderName">{{ currentFolder?.name }}</div>
              </div>
              <button class="close-button" :style="{ color: folderWindowTextColor }" @click="closeFolder">×</button>
            </div>
            <div class="folder-content" :style="{ backgroundColor: folderWindowBackground.replace('0.95', '0.85') }">
              <div class="folder-grid">
                <div 
                  v-for="(item, index) in currentFolder?.items" 
                  :key="item.name"
                  class="folder-item"
                  @click="openSpreadJSTab(item)"
                >
                  <div class="folder-item-image">
                    <img :src="getImageByItem(item)" :alt="item.name" />
                  </div>
                  <div class="folder-item-label" :style="{ color: iconLabelColor, textShadow: iconLabelShadow }">{{ truncateText(item.name) }}</div>
                  <button class="remove-from-folder" @click.stop="removeFromFolder(index)">×</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 敏感信息标签内容 -->
      <div v-else>
        <keep-alive>
          <component 
            :is="currentTabComponent" 
            :fn="currentTabData?.fn" 
            :key="activeTabId"
          />
        </keep-alive>
      </div>
    </div>

    <!-- 设置窗口 -->
    <div v-if="showSettings" class="settings-window">
      <div class="settings-header">
        <h3>设置</h3>
        <button class="close-button" @click="showSettings = false">×</button>
      </div>
      <div class="settings-content">
        <h4>背景图片</h4>
        <div class="background-options">
          <div
            class="background-option"
            :class="{ 'selected': backgroundImage === '' && !backgroundColor }"
            @click="selectBackground('')"
          >
            <div class="no-background">无背景</div>
            <span>默认</span>
          </div>
          <div
            v-for="(bg, index) in backgroundImages"
            :key="index"
            class="background-option"
            :class="{ 'selected': backgroundImage === bg.url }"
            @click="selectBackground(bg.url)"
          >
            <img :src="bg.url" :alt="bg.name" />
            <span>{{ bg.name }}</span>
          </div>
        </div>
        
        <h4 style="margin-top: 20px;">背景颜色</h4>
        <div class="background-options">
          <div
            v-for="(color, index) in backgroundColors"
            :key="index"
            class="background-option"
            :class="{ 'selected': backgroundColor === color.value }"
            @click="selectBackgroundColor(color.value)"
          >
            <div class="color-option" :style="{ backgroundColor: color.value }"></div>
            <span>{{ color.name }}</span>
          </div>
        </div>
        
        <div class="drag-tips" style="margin-top: 20px; padding: 10px; background-color: rgba(0, 122, 255, 0.1); border-radius: 8px; font-size: 12px; line-height: 1.4;">
          <p>提示：</p>
          <p>• 拖动图标可以改变图标顺序</p>
          <p>• 按住Shift拖动图标到另一个图标上，可以创建文件夹</p>
          <p>• 拖动图标到底部，可以设置为常用图标</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import QRCode from 'qrcode'
import SpreadJS from './views/able/spreadjs.vue'
import NoticeList from './views/noticeList/noticeList.vue'

export default {
  name: 'App',
  setup() {
    // 标签页相关
    const homeTabId = ref('home-1')
    const activeTabId = ref(homeTabId.value)
    const tabs = ref([
      {
        id: homeTabId.value,
        title: '首页',
        isHome: true,
        component: null
      }
    ])
    
    // 菜单数据
    const menuItems = ref([])
    // 常用图标数据
    const favoriteItems = ref([])
    // 加载状态
    const loading = ref(true)
    // 拖拽状态
    const draggingItem = ref(null)
    const draggingFavorite = ref(null)
    // 悬停状态
    const hoveredItem = ref(null)
    const hoveredFavorite = ref(null)
    // DOM引用
    const iconGrid = ref(null)
    const dock = ref(null)
    const qrCodeRef = ref(null)
    const noticeListRef = ref(null)
    // 设置窗口显示状态
    const showSettings = ref(false)
    // 背景图片
    const backgroundImage = ref('')
    // 背景颜色
    const backgroundColor = ref('')
    // 背景图片列表
    const backgroundImages = ref([
      { name: '背景1', url: '/Bg/BG001.jpg' },
      { name: '背景2', url: '/Bg/BG002.jpg' }
    ])
    // 背景颜色列表
    const backgroundColors = ref([
      { name: '黑色', value: '#000000' },
      { name: '灰白色', value: '#f5f5f5' },
      { name: '柔和的蓝色', value: '#e3f2fd' }
    ])
    // 新增加的图标集合（用于闪烁效果）
    const newItems = ref(new Set())
    // 拖放目标位置和方向
    const dropTargetIndex = ref(null)
    const dropPosition = ref(null)
    // 文件夹窗口
    const showFolder = ref(false)
    const currentFolder = ref(null)
    const editingFolderName = ref(false)
    const folderNameInput = ref('')
    
    // 轮播图相关
    const carouselImages = ref([])
    const currentSlide = ref(0)
    let carouselInterval = null
    
    // 通知列表相关
    const noticeList = ref([])
    const noticeLoading = ref(false)
    
    // G区最大化状态
    const isGSectionMaximized = ref(false)
    
    // 计算当前标签页组件
    const currentTabComponent = computed(() => {
      const currentTab = tabs.value.find(tab => tab.id === activeTabId.value)
      return currentTab?.component || null
    })
    
    // 计算当前标签页数据
    const currentTabData = computed(() => {
      const currentTab = tabs.value.find(tab => tab.id === activeTabId.value)
      return currentTab?.data || null
    })
    
    // 打开SpreadJS标签页
    const openSpreadJSTab = async (item) => {
      // 检查是否有sUrl字段
      if (item.sUrl && item.sUrl.trim() !== '') {
        // 检查是否已经存在相同名称的标签页
        const existingTab = tabs.value.find(tab => tab.title === item.name && !tab.isHome)
        if (existingTab) {
          // 如果存在，切换到该标签页
          activeTabId.value = existingTab.id
        } else {
          // 如果不存在，创建新标签页
          const newTabId = `tab-${Date.now()}`
          
          // 根据菜单项名称决定使用哪个组件
          let component = SpreadJS
          
          // 特殊处理'58直采信息'菜单项
          if (item.name === '58直采信息') {
            component = NoticeList
          } else {
            try {
              // 尝试动态导入组件
              let importPath = item.sUrl
              // 确保使用正确的相对路径
              if (!importPath.startsWith('./')) {
                if (importPath.startsWith('views/')) {
                  importPath = `./${importPath}`
                } else {
                  importPath = `./views/${importPath}`
                }
              }

              const module = await import(importPath)
              component = module.default || SpreadJS
            } catch (error) {
              console.error('动态导入组件失败:', error)
              // 如果导入失败，使用默认的SpreadJS组件
            }
          }
          
          tabs.value.push({
            id: newTabId,
            title: item.name,
            isHome: false,
            component: component,
            data: {
              fn: item.name
            }
          })
          activeTabId.value = newTabId
        }
        return
      }
      else
      {
        // 否则弹出alert显示图标文字
        alert(item.name)
      }
    }
    
    // 切换标签页
    const switchTab = (tabId) => {
      activeTabId.value = tabId
    }
    
    // 关闭标签页
    const closeTab = (tabId) => {
      // 不能关闭首页标签
      if (tabId === homeTabId.value) return
      
      const tabIndex = tabs.value.findIndex(tab => tab.id === tabId)
      if (tabIndex !== -1) {
        // 如果关闭的是当前活动标签，切换到上一个标签
        if (tabId === activeTabId.value) {
          const newActiveIndex = tabIndex > 0 ? tabIndex - 1 : 0
          activeTabId.value = tabs.value[newActiveIndex].id
        }
        
        // 移除标签页
        tabs.value.splice(tabIndex, 1)
      }
    }

    // 根据索引获取图片
    const getImageByIndex = (index) => {
      const imageIndex = (index % 52) + 1
      // return `/Images/001.png`
      return `/spreadjs/css/images/001.png`
    }
    
    // 根据item获取图片
    const getImageByItem = (item) => {
      if (item.sImg && item.sImg.trim() !== '') {
        return item.sImg
      }
      // 首先在menuItems中查找item
      let index = menuItems.value.indexOf(item)
      // 如果在menuItems中找不到，在favoriteItems中查找
      if (index === -1) {
        index = favoriteItems.value.indexOf(item)
      }
      // 如果都找不到，检查是否在某个文件夹中
      if (index === -1) {
        for (const folder of menuItems.value) {
          if (folder.type === 'folder' && folder.items) {
            const folderIndex = folder.items.indexOf(item)
            if (folderIndex !== -1) {
              index = folderIndex
              break
            }
          }
        }
      }
      // 如果都找不到，使用默认索引0
      const imageIndex = ((index !== -1 ? index : 0) % 52) + 1
      return `/spreadjs/css/images/001.png`
      
    }

    // 从API获取数据
    const fetchData = async () => {
      try {
        // 添加时间戳防止缓存
        const apiUrl = `https://app2.55555566.com/jws/JsonServlet?fileName=2026Xlsx菜单&param=24D8DB86-1D0F-4254-A41B-90D380175F4D&t=${Date.now()}`;
        const response = await fetch(apiUrl, {
          cache: 'no-store'
        })
        const data = await response.json()
        if (data && data.rs0) {
          // 获取之前的图标名称集合
          const oldNames = new Set(menuItems.value.map(item => item.name))
          
          // 获取新的图标数据，保留sUrl和sImg字段
          const newData = data.rs0.map(item => ({ 
            name: item.name,
            sUrl: item.sUrl || '',
            sImg: item.sImg || ''
          }))
          
          // 找出新增加的图标
          const newNames = new Set()
          newData.forEach(item => {
            if (!oldNames.has(item.name)) {
              newNames.add(item.name)
            }
          })
          
          // 加载保存的图标顺序并合并新数据
          menuItems.value = mergeWithSavedOrder(newData)
          
          // 设置新增加的图标闪烁
          if (newNames.size > 0) {
            newItems.value = newNames
            // 3秒后移除闪烁效果
            setTimeout(() => {
              newItems.value = new Set()
            }, 3000)
          }
          
          // 同步常用菜单数据：移除不在API返回结果中的常用项，并更新sImg和sUrl字段
          const apiNames = new Set(data.rs0.map(item => item.name))
          favoriteItems.value = favoriteItems.value.filter(fav => apiNames.has(fav.name))
          // 更新每个常用项的sImg和sUrl字段
          favoriteItems.value.forEach(item => {
            const matchingItem = newData.find(newItem => newItem.name === item.name)
            if (matchingItem) {
              item.sImg = matchingItem.sImg || ''
              item.sUrl = matchingItem.sUrl || ''
            }
          })
          saveFavorites()
        }
      } catch (error) {
        console.error('获取数据失败，使用备用数据:', error)
        // 使用备用数据
        const backupData = {
          rs0: [
            { name: '404无服务' }
          ]
        }
        
        if (backupData && backupData.rs0) {
          menuItems.value = backupData.rs0.map(item => ({ name: item.name }))
        }
      } finally {
        loading.value = false
      }
    }
    
    // 获取通知列表数据
    const fetchNoticeList = async () => {
      noticeLoading.value = true
      try {
        const apiUrl = `https://app4.55555566.com/jws/JsonServlet?fileName=通知列表&param=`
        const response = await fetch(apiUrl)
        const data = await response.json()
        if (data && data.rs0) {
          noticeList.value = data.rs0
        }
      } catch (error) {
        console.error('获取通知列表失败:', error)
        noticeList.value = []
      } finally {
        noticeLoading.value = false
      }
    }
    
    // 加载轮播图片
    const loadCarouselImages = () => {
      // 从ImageEx目录加载图片
      const images = [
        '/ImageEx/Snipaste_2021-12-09_10-52-10.png',
        '/ImageEx/Snipaste_2021-12-09_10-52-17.png',
        '/ImageEx/Snipaste_2021-12-09_10-52-21.png',
        '/ImageEx/Snipaste_2021-12-09_10-52-35.png'
      ]
      carouselImages.value = images
    }
    
    // 启动轮播
    const startCarousel = () => {
      carouselInterval = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % carouselImages.value.length
      }, 3000)
    }
    
    // 停止轮播
    const stopCarousel = () => {
      if (carouselInterval) {
        clearInterval(carouselInterval)
        carouselInterval = null
      }
    }
    
    // 生成GUID
    const generateGUID = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
    
    // 触摸事件相关变量
    const touchStartY = ref(0);
    const touchStartX = ref(0);
    const isScrolling = ref(false);
    
    // 通知列表滚动处理
    const handleNoticeScroll = (e) => {
      console.log('111111');
      if (noticeListRef.value) {
        // 自定义滚动速度，向上滚动为正值，向下为负值
        const scrollAmount = e.deltaY > 0 ? 50 : -50;
        noticeListRef.value.scrollTop += scrollAmount;
      }
    }
    
    // 触摸开始事件
    const handleTouchStart = (e, containerRef) => {
      touchStartY.value = e.touches[0].clientY;
      touchStartX.value = e.touches[0].clientX;
      isScrolling.value = null;
    }
    
    // 触摸移动事件
    const handleTouchMove = (e, containerRef) => {
      if (!containerRef.value) return;
      
      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;
      const deltaY = touchStartY.value - touchY;
      const deltaX = touchStartX.value - touchX;
      
      // 确定是垂直滚动还是水平滚动
      if (isScrolling.value === null) {
        isScrolling.value = Math.abs(deltaY) > Math.abs(deltaX);
      }
      
      // 只处理垂直滚动
      if (isScrolling.value) {
        e.preventDefault();
        containerRef.value.scrollTop += deltaY;
        touchStartY.value = touchY;
      }
    }
    
    // 触摸结束事件
    const handleTouchEnd = () => {
      isScrolling.value = false;
    }

    // 生成二维码
    const generateQRCode = () => {
      if (qrCodeRef.value) {
        // 使用GUID生成二维码数据
        const guid = generateGUID()
        const qrData = `https://app.example.com/login?token=${guid}`
        
        // 创建canvas元素
        const canvas = document.createElement('canvas')
        canvas.width = 200
        canvas.height = 200
        
        // 使用QRCode库生成二维码
        QRCode.toCanvas(canvas, qrData, { width: 200 }, (error) => {
          if (error) {
            console.error('生成二维码失败:', error)
            return
          }
          
          // 清空容器并添加canvas
          qrCodeRef.value.innerHTML = ''
          qrCodeRef.value.appendChild(canvas)
        })
      }
    }
    
    // 显示图标名称
    const showIconName = (item) => {
      if (item.type === 'folder') {
        // 打开文件夹
        currentFolder.value = item
        showFolder.value = true
        folderNameInput.value = item.name
      } else {
        alert(item.name)
      }
    }
    
    // 打开文件夹
    const openFolder = (folder) => {
      currentFolder.value = folder
      folderNameInput.value = folder.name
      showFolder.value = true
    }
    
    // 关闭文件夹
    const closeFolder = () => {
      showFolder.value = false
      currentFolder.value = null
      editingFolderName.value = false
    }
    
    // 开始编辑文件夹名称
    const startEditFolderName = () => {
      editingFolderName.value = true
    }
    
    // 完成编辑文件夹名称
    const finishEditFolderName = () => {
      if (currentFolder.value) {
        currentFolder.value.name = folderNameInput.value
        saveIconOrder()
      }
      editingFolderName.value = false
    }
    
    // 从文件夹中移除图标
    const removeFromFolder = (index) => {
      if (currentFolder.value && currentFolder.value.items) {
        // 从文件夹中移除
        const removedItem = currentFolder.value.items.splice(index, 1)[0]
        // 添加到桌面
        menuItems.value.push(removedItem)
        // 保存图标顺序
        saveIconOrder()
        
        // 检查文件夹是否为空
        if (currentFolder.value.items.length === 0) {
          // 查找并删除空文件夹
          const folderIndex = menuItems.value.findIndex(item => item.name === currentFolder.value.name && item.type === 'folder')
          if (folderIndex !== -1) {
            menuItems.value.splice(folderIndex, 1)
            saveIconOrder()
            closeFolder()
          }
        }
      }
    }
    
    // 切换设置窗口
    const toggleSettings = () => {
      showSettings.value = !showSettings.value
    }
    
    // 选择背景图片
    const selectBackground = (url) => {
      backgroundImage.value = url
      backgroundColor.value = '' // 选择背景图片时清除背景颜色
      localStorage.setItem('backgroundImage', url)
      localStorage.setItem('backgroundColor', '')
    }
    
    // 选择背景颜色
    const selectBackgroundColor = (color) => {
      backgroundColor.value = color
      backgroundImage.value = '' // 选择背景颜色时清除背景图片
      localStorage.setItem('backgroundColor', color)
      localStorage.setItem('backgroundImage', '')
    }
    
    // 从本地存储加载背景设置
    const loadBackground = () => {
      const savedBackground = localStorage.getItem('backgroundImage')
      const savedColor = localStorage.getItem('backgroundColor')
      if (savedBackground) {
        backgroundImage.value = savedBackground
      }
      if (savedColor) {
        backgroundColor.value = savedColor
      }
    }
    
    // 从常用中删除图标
    const removeFromFavorites = (index) => {
      favoriteItems.value.splice(index, 1)
      saveFavorites()
    }
    
    // 拖放相关变量
    let draggedIndex = null
    let draggedFavoriteIndex = null
    let isShiftPressed = false
    
    // 开始拖动主图标
    const onDragStart = (index, event) => {
      draggedIndex = index
      isShiftPressed = event.shiftKey
      event.dataTransfer.effectAllowed = 'move'
    }
    
    // 开始拖动常用图标
    const onDragStartFavorite = (index, event) => {
      draggedFavoriteIndex = index
      event.dataTransfer.effectAllowed = 'move'
    }
    
    // 拖动经过图标时
    const onDragOver = (index, event) => {
      event.preventDefault()
      if (draggedIndex === null || draggedIndex === index) return
      
      // 获取目标元素的位置信息
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      
      // 根据鼠标位置相对于图标中心的位置来判断
      const isBefore = x < rect.width / 2
      
      dropTargetIndex.value = index
      dropPosition.value = isBefore ? 'before' : 'after'
    }
    
    // 拖动离开图标时
    const onDragLeave = (event) => {
      // 延迟清除，避免闪烁
      setTimeout(() => {
        if (!event.relatedTarget || !event.relatedTarget.closest('.icon-item')) {
          dropTargetIndex.value = null
          dropPosition.value = null
        }
      }, 50)
    }
    
    // 放置到常用区域
    const onDockDrop = (event) => {
      event.preventDefault()
      
      // 清除拖放指示器
      dropTargetIndex.value = null
      dropPosition.value = null
      
      if (draggedIndex !== null) {
        // 获取被拖动的图标
        const draggedItem = menuItems.value[draggedIndex]
        
        // 检查是否已经在常用列表中
        const isAlreadyFavorite = favoriteItems.value.some(item => item.name === draggedItem.name)
        if (!isAlreadyFavorite) {
          // 添加到常用列表
          favoriteItems.value.push(draggedItem)
          saveFavorites()
        }
        
        draggedIndex = null
        isShiftPressed = false
      }
    }
    
    // 放置主图标
    const onDrop = (targetIndex, event) => {
      event.preventDefault()
      event.stopPropagation()
      
      // 保存当前的放置位置（在清除之前）
      const currentDropPosition = dropPosition.value
      
      // 清除拖放指示器
      dropTargetIndex.value = null
      dropPosition.value = null
      
      if (draggedIndex === null) {
        draggedIndex = null
        isShiftPressed = false
        return
      }
      
      // 获取被拖动的图标和目标图标
      const draggedItem = menuItems.value[draggedIndex]
      const targetItem = menuItems.value[targetIndex]
      
      // 检查是否按住了shift键（创建文件夹）
      if (isShiftPressed) {
        // 检查是否是拖动到文件夹上
        if (targetItem.type === 'folder') {
          // 加入到文件夹中
          if (!targetItem.items) {
            targetItem.items = []
          }
          targetItem.items.push(draggedItem)
          // 从原位置移除
          menuItems.value.splice(draggedIndex, 1)
          // 保存图标顺序
          saveIconOrder()
          draggedIndex = null
          isShiftPressed = false
          return
        }
        
        // 检查是否是两个普通图标合并（不能是同一个图标）
        if (!draggedItem.type && !targetItem.type && draggedIndex !== targetIndex) {
          // 创建新文件夹
          const newFolder = {
            name: '新文件夹',
            type: 'folder',
            items: [targetItem, draggedItem]
          }
          
          // 确定删除顺序（先删除后面的元素）
          const firstIndex = Math.min(draggedIndex, targetIndex)
          const secondIndex = Math.max(draggedIndex, targetIndex)
          
          // 从原位置移除
          menuItems.value.splice(secondIndex, 1)
          menuItems.value.splice(firstIndex, 1)
          
          // 插入新文件夹
          menuItems.value.splice(firstIndex, 0, newFolder)
          
          // 保存图标顺序
          saveIconOrder()
          draggedIndex = null
          isShiftPressed = false
          return
        }
      }
      
      // 执行排序逻辑（拖动改变顺序）
      if (currentDropPosition === 'before' || currentDropPosition === 'after' && draggedIndex !== targetIndex) {
        // 确定插入位置
        let insertIndex = targetIndex
        if (currentDropPosition === 'after') {
          insertIndex = targetIndex + 1
        }
        
        // 如果拖动的是后面的图标到前面的位置，需要调整插入索引
        if (draggedIndex < targetIndex) {
          insertIndex = insertIndex - 1
        }
        
        // 从原位置移除
        menuItems.value.splice(draggedIndex, 1)
        
        // 插入到新位置
        menuItems.value.splice(insertIndex, 0, draggedItem)
        
        // 保存图标顺序
        saveIconOrder()
        
        draggedIndex = null
        isShiftPressed = false
        return
      }
      
      draggedIndex = null
      isShiftPressed = false
    }
    
    // 桌面放置事件（用于删除常用图标）
    const onDesktopDrop = (event) => {
      event.preventDefault()
      
      // 清除拖放指示器
      dropTargetIndex.value = null
      dropPosition.value = null
      
      if (draggedFavoriteIndex !== null) {
        // 从常用中删除图标
        favoriteItems.value.splice(draggedFavoriteIndex, 1)
        saveFavorites()
        draggedFavoriteIndex = null
      }
      
      draggedIndex = null
    }

    // 从本地存储加载常用图标
    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem('favoriteItems')
      if (savedFavorites) {
        favoriteItems.value = JSON.parse(savedFavorites)
        // 确保每个item都有sImg和sUrl字段
        favoriteItems.value.forEach(item => {
          const matchingItem = menuItems.value.find(menuItem => menuItem.name === item.name)
          if (matchingItem) {
            item.sImg = matchingItem.sImg || ''
            item.sUrl = matchingItem.sUrl || ''
          }
        })
      }
    }

    // 保存常用图标到本地存储
    const saveFavorites = () => {
      localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems.value))
    }

    // 保存图标和文件夹结构到本地存储
    const saveIconOrder = () => {
      localStorage.setItem('menuItems', JSON.stringify(menuItems.value))
    }

    // 合并新数据与保存的结构
    const mergeWithSavedOrder = (newData) => {
      const savedItems = localStorage.getItem('menuItems')
      if (!savedItems) {
        return newData
      }
      
      try {
        const savedMenuItems = JSON.parse(savedItems)
        const orderedItems = []
        const remainingItems = [...newData]
        
        // 收集所有文件夹中包含的图标名称
        const folderItemNames = new Set()
        savedMenuItems.forEach(item => {
          if (item.type === 'folder' && item.items) {
            item.items.forEach(folderItem => {
              folderItemNames.add(folderItem.name)
            })
          }
        })
        
        // 先添加保存的文件夹
        savedMenuItems.forEach(savedItem => {
          if (savedItem.type === 'folder') {
            // 更新文件夹中每个item的sImg和sUrl字段
            if (savedItem.items) {
              savedItem.items.forEach(folderItem => {
                const matchingItem = newData.find(item => item.name === folderItem.name)
                if (matchingItem) {
                  folderItem.sImg = matchingItem.sImg || ''
                  folderItem.sUrl = matchingItem.sUrl || ''
                }
              })
            }
            // 保留文件夹结构
            orderedItems.push(savedItem)
          }
        })
        
        // 添加不在文件夹中的图标
        savedMenuItems.forEach(savedItem => {
          if (!savedItem.type && !folderItemNames.has(savedItem.name)) {
            // 查找对应名称的新图标
            const index = remainingItems.findIndex(item => item.name === savedItem.name)
            if (index !== -1) {
              orderedItems.push(remainingItems[index])
              remainingItems.splice(index, 1)
            }
          }
        })
        
        // 添加新出现的图标（API返回的新项目）到末尾，确保它们不在任何文件夹中
        const newRemainingItems = remainingItems.filter(item => !folderItemNames.has(item.name))
        orderedItems.push(...newRemainingItems)
        
        return orderedItems
      } catch (error) {
        console.error('加载图标顺序失败:', error)
        return newData
      }
    }

    // 切换G区最大化状态
    const toggleGSectionMaximize = () => {
      isGSectionMaximized.value = !isGSectionMaximized.value
    }

    // 计算桌面样式
    const desktopStyle = computed(() => {
      if (backgroundImage.value) {
        return {
          backgroundImage: `url(${backgroundImage.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'transparent'
        }
      }
      if (backgroundColor.value) {
        return {
          backgroundColor: backgroundColor.value
        }
      }
      return {
        backgroundColor: '#000000'
      }
    })
    
    // 计算文本颜色
    const textColor = computed(() => {
      // 如果设置了灰白色或柔和的蓝色背景，使用黑色字体
      if (backgroundColor.value === '#f5f5f5' || backgroundColor.value === '#e3f2fd') {
        return '#000000'
      }
      // 其他情况使用白色字体
      return '#ffffff'
    })
    
    // 计算图标标签颜色
    const iconLabelColor = computed(() => textColor.value)
    
    // 计算图标标签阴影
    const iconLabelShadow = computed(() => {
      // 如果设置了灰白色或柔和的蓝色背景，使用浅色阴影
      if (backgroundColor.value === '#f5f5f5' || backgroundColor.value === '#e3f2fd') {
        return '1px 1px 2px rgba(0, 0, 0, 0.2)'
      }
      // 其他情况使用深色阴影
      return '1px 1px 2px rgba(0, 0, 0, 0.5)'
    })
    
    // 计算阴影颜色
    const shadowColor = computed(() => {
      // 如果背景色是黑色，使用浅色调阴影
      if (backgroundColor.value === '#000000') {
        return 'rgba(255, 255, 255, 0.3)'
      }
      // 其他情况使用深色调阴影
      return 'rgba(0, 65, 95, 0.3)'
    })
    
    // 计算文件夹窗口背景色
    const folderWindowBackground = computed(() => {
      if (backgroundColor.value) {
        // 根据背景颜色计算文件夹窗口的背景色
        if (backgroundColor.value === '#f5f5f5' || backgroundColor.value === '#e3f2fd') {
          return 'rgba(255, 255, 255, 0.95)'
        }
        return 'rgba(0, 0, 0, 0.9)'
      }
      // 默认黑色背景
      return 'rgba(0, 0, 0, 0.9)'
    })
    
    // 计算文件夹窗口文本颜色
    const folderWindowTextColor = computed(() => {
      if (backgroundColor.value === '#f5f5f5' || backgroundColor.value === '#e3f2fd') {
        return '#333333'
      }
      return '#ffffff'
    })
    
    // 截断文字，最多显示6个字符
    const truncateText = (text) => {
      if (text && text.length > 6) {
        return text.substring(0, 6)
      }
      return text
    }

    // 初始化
    onMounted(() => {
      fetchData()
      loadFavorites()
      loadBackground()
      loadCarouselImages()
      startCarousel()
      fetchNoticeList()
      generateQRCode()
    })

    // 清理
    onUnmounted(() => {
      stopCarousel()
    })

    return {
      // 标签页相关
      tabs,
      activeTabId,
      homeTabId,
      currentTabComponent,
      currentTabData,
      openSpreadJSTab,
      openFolder,
      switchTab,
      closeTab,
      
      // 原有变量和方法
      menuItems,
      favoriteItems,
      loading,
      draggingItem,
      draggingFavorite,
      hoveredItem,
      hoveredFavorite,
      iconGrid,
      dock,
      qrCodeRef,
      showSettings,
      backgroundImage,
      backgroundColor,
      backgroundImages,
      backgroundColors,
      newItems,
      dropTargetIndex,
      dropPosition,
      showFolder,
      currentFolder,
      editingFolderName,
      folderNameInput,
        desktopStyle,
        iconLabelColor,
        iconLabelShadow,
        noticeListRef,
      folderWindowBackground,
        folderWindowTextColor,
        truncateText,
        getImageByIndex,
        getImageByItem,
        showIconName,
        closeFolder,
        startEditFolderName,
        finishEditFolderName,
        removeFromFolder,
        toggleSettings,
        selectBackground,
        selectBackgroundColor,
        removeFromFavorites,
        onDragStart,
        onDragStartFavorite,
        onDragOver,
        onDragLeave,
        onDrop,
        onDockDrop,
        onDesktopDrop,
        
        // 新增变量和方法
        carouselImages,
        currentSlide,
        noticeList,
        noticeLoading,
        isGSectionMaximized,
        toggleGSectionMaximize,
        textColor,
        shadowColor,
        handleNoticeScroll,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    }
  }
}
</script>

<style scoped>
.desktop {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  color: var(--text-color);
}

:root {
  --text-color: #ffffff;
}

/* 行布局 */
.desktop-row {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}

.first-row, .second-row {
  height: 30vh;
}

.third-row {
  height: 60vh;
}

.third-row.expanded {
  height: 60vh;
}

.fourth-row {
  height: 10vh;
  min-height: 120px;
}

/* 区域布局 */
.desktop-section {
  margin: 0 5px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid #00415f;
  overflow: visible;
  box-shadow: 
    0 4px 8px v-bind(shadowColor),
    0 1px 3px v-bind(shadowColor),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.desktop-section:hover {
  box-shadow: 
    0 8px 16px v-bind(shadowColor),
    0 2px 6px v-bind(shadowColor),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.section-a {
  width: 35%; /* 1/2 */
}

.section-aa, .section-b {
  width: 45%; /* 1/4 */
}

.section-b, .section-chart {
  width: 20%; /* 1/4 */
}

.section-g {
  width: 100%;
  position: relative;
  transition: all 0.3s ease;
}

.section-g.maximized {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 1000;
  margin: 0;
  border-radius: 0;
  background-color: rgba(120, 120, 120, 1) !important;
  backdrop-filter: blur(10px);
}

.section-h {
  width: 100%;
  min-height: 120px;
}

/* 轮播图相关样式 */
.carousel-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.carousel {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  flex: 0 0 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-title {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
  margin: 0 20px;
  border-radius: 8px;
}

.carousel-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: white;
}

/* 区域标题 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #00415f;
  background-color: rgba(0, 65, 95, 0.2);
}

.section-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: v-bind(textColor);
}

.more-button {
  background: none;
  border: none;
  color: v-bind(textColor);
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.more-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 通知列表 */
.notice-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  /* border-bottom: 1px solid #00415ff; */
  /* 隐藏滚动条但保留滚动功能 */
  /*scrollbar-width: none;  /*Firefox */
  /*-ms-overflow-style: none; /* IE/Edge */
}

.notice-list::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Opera */
}

.notice-item {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.05);
  border-left: 3px solid #007aff;
  border-bottom: 2px solid #00415f;
  transition: background-color 0.2s ease;
}

.notice-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.notice-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: v-bind(textColor);
  
}

.notice-time {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  color: v-bind(textColor);
  opacity: 0.7;
}

/* 二维码样式 */
.qr-code-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.qr-code {
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 2px solid #00415f;
}

.qr-code-text {
  color: v-bind(textColor);
  font-size: 14px;
  font-weight: 500;
}

/* 主图标区域 */
.icon-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 20px;
  padding: 40px;
  overflow-y: auto;
  align-content: start;
  /* 隐藏滚动条但保留滚动功能 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.icon-grid::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Opera */
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 8px;
  position: relative;
}

.icon-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.icon-item.dragging {
  opacity: 0.5;
}

/* 新增加图标的闪烁效果 */
@keyframes flash {
  0%, 100% { 
    background-color: rgba(255, 255, 255, 0);
    box-shadow: 0 0 0 rgba(0, 122, 255, 0);
  }
  50% { 
    background-color: rgba(0, 122, 255, 0.3);
    box-shadow: 0 0 20px rgba(0, 122, 255, 0.5);
  }
}

.icon-item.new-item {
  animation: flash 1s ease-in-out 3;
  border-radius: 8px;
}

.icon-image {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.icon-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.icon-label {
  color: white;
  font-size: 12px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 拖放指示器 */
.drop-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background-color: #007aff;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.drop-indicator.after {
  left: auto;
  right: 0;
}

.drop-indicator.active {
  opacity: 1;
}

/* 常用图标栏 */
.dock {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.dock-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 8px;
}

.dock-icon:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.dock-icon.dragging {
  opacity: 0.5;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: white;
}

/* 设置按钮样式 */
.settings-button {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #007aff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0, 122, 255, 0.4);
  transition: all 0.3s ease;
  z-index: 100;
}

.settings-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 122, 255, 0.6);
}

/* 设置窗口样式 */
.settings-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 200;
  backdrop-filter: blur(10px);
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.settings-header h3 {
  color: #333;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.settings-content {
  padding: 20px;
}

.settings-content h4 {
  color: #333;
  margin: 0 0 15px 0;
  font-size: 14px;
  font-weight: 600;
}

.background-options {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.background-option {
  width: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
}

.background-option:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.background-option.selected {
  border-color: #007aff;
  box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.3);
}

.background-option img {
  width: 100%;
  height: 60px;
  object-fit: cover;
  display: block;
}

.background-option span {
  display: block;
  text-align: center;
  padding: 5px;
  font-size: 12px;
  color: #333;
  background-color: rgba(255, 255, 255, 0.8);
}

.no-background {
  width: 100%;
  height: 60px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
  border: 1px dashed #ccc;
}

.color-option {
  width: 100%;
  height: 60px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 15px;
  }
}

/* 手机竖屏模式 */
@media (max-width: 768px) and (orientation: portrait) {
  .desktop {
    overflow-y: auto;
  }
  
  .desktop-row {
    flex-direction: column;
    height: auto !important;
  }
  
  .desktop-section {
    width: 90% !important;
    margin: 5px auto !important;
    height: 200px;
  }
  
  .first-row, .second-row, .third-row {
    height: auto;
  }
  
  .section-g {
    min-height: 300px;
  }
}

@media (max-width: 768px) {
  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 10px;
  }
  
  .icon-image {
    width: 50px;
    height: 50px;
  }
  
  .icon-label {
    font-size: 10px;
    max-width: 60px;
  }
  
  /* 设置窗口响应式 */
  .settings-window {
    width: 90%;
    max-width: 350px;
  }
  
  .background-option {
    width: 80px;
  }
  
  .background-option img {
    height: 50px;
  }
  
  /* 文件夹窗口响应式 */
  .folder-window {
    width: 90%;
    max-width: 320px;
  }
  
  .folder-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
}

/* 文件夹样式 */
.icon-item.folder {
  position: relative;
}

.folder-image {
  position: relative;
}

.folder-icon {
  width: 60px;
  height: 60px;
  position: relative;
}

.folder-top {
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 12px;
  background-color: #ffcc00;
  border-radius: 8px 8px 0 0;
  z-index: 2;
}

.folder-body {
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffcc00;
  border-radius: 0 8px 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.folder-items-count {
  font-size: 16px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
}



/* 文件夹窗口样式 */
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tabs-bar {
  height: 40px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 100;
}

.tab-item {
  height: 32px;
  display: flex;
  align-items: center;
  margin-right: 8px;
  border-radius: 6px 6px 0 0;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}

.tab-item.active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.tab-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.tab-title {
  font-size: 14px;
  margin-right: 8px;
}

.tab-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 16px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.tab-close:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.tab-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.folder-window-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  backdrop-filter: blur(5px);
}

.folder-window {
  width: 360px;
  max-height: 540px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
  border: 1px solid #333333;
}

.folder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.folder-name {
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.folder-name:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.folder-name-input {
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #007aff;
  border-radius: 4px;
  padding: 4px 8px;
  width: 100%;
  outline: none;
}

.folder-content {
  padding: 20px;
  max-height: 420px;
  overflow-y: auto;
}

.folder-item-label {
  font-size: 10px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.folder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.folder-name-container {
  flex: 1;
}

.folder-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.folder-name:hover {
  background-color: #e0e0e0;
}

.folder-name-input {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  border: 2px solid #007aff;
  border-radius: 4px;
  padding: 4px 8px;
  width: 100%;
  outline: none;
}

.folder-content {
  padding: 20px;
  max-height: 420px;
  overflow-y: auto;
}

.folder-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
  justify-items: center;
}

.folder-item {
  width: 70px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.folder-item:hover {
  transform: scale(1.05);
}

.folder-item-image {
  width: 50px;
  height: 50px;
  margin-bottom: 4px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
}

.folder-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.folder-item-label {
  font-size: 10px;
  color: #333;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.remove-from-folder {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff3b30;
  color: white;
  border: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.folder-item:hover .remove-from-folder {
  opacity: 1;
}

.remove-from-folder:hover {
  background-color: #ff453a;
  transform: scale(1.1);
}
</style>
