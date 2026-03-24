<script setup lang="ts">
import { ref, onMounted, shallowRef, onUnmounted, onActivated, watch, defineOptions } from "vue";

// 定义组件名称，用于keep-alive缓存
defineOptions({
  name: 'SpreadJS'
});

import { useRoute } from "vue-router";

// 接收路由传递的参数
const props = defineProps<{
  fn?: string;
}>();
import "./css/gc.spread.sheets.excel2013white.11.0.0.css";
import "./css/sample.css";
import "./css/font-awesome/css/font-awesome.min.css";
import "./css/bootstrap.min.css";
import "./css/bootstrap-theme.min.css";

// 引入设计规范样式
import "../../../rule/variables.scss";

// 加载 SpreadJS 相关脚本
import { loadScript } from "../../utils/loadScript.js";

const spreadContainer = ref<HTMLElement | null>(null);
const fontColor = ref<string>("无");
const IsEdit = ref<boolean>(false);
const spread = shallowRef<any>(null);
const cellName = ref<string>("无");
const cellValue = ref<any>("无");
const isDataLoaded = ref<boolean>(false);

// 打开文件对话框相关
const openDialogVisible = ref(false);
const fileList = ref<string[]>([]);
const selectedFile = ref<string>("");
const saveMessage = ref<string>("");
const showMessage = ref(false);
const helpDrawerVisible = ref(false); // 控制帮助抽屉显示

// 右下角提示相关
const showToast = ref(false);
const toastMessage = ref<string>("");
const toastType = ref<string>("info");

// Spread日志API相关
const sFileName = ref<string>(""); // 当前打开的xlsx文件名
const SPREAD_LOG_API_BASE =
  "https://app4.55555566.com/jws/JsonServlet?fileName=Spread日志&param=";
const SAVE_SPREAD_LOG_API_BASE =
  "https://app4.55555566.com/jws/JsonServlet?fileName=保存spread日志&param=";
let pollingTimer: any = null; // 轮询定时器

// <li><b>打印</b>：调用浏览器打印功能打印当前电子表格</li>
// <li><b>单元格复制</b>：在 A1 单元格赋值 'ABC'</li>
// <li><b>设置行列数</b>：设置电子表格行数为1000，列数为26</li>
// <li><b>设置边框</b>：给第一行第一列设置边框</li>


const getCellName = (row: number, col: number): string => {
  // 列号转字母（A-Z, AA-AZ, BA-BZ 等）
  let columnName = "";
  let colIndex = col;
  while (colIndex >= 0) {
    columnName = String.fromCharCode(65 + (colIndex % 26)) + columnName;
    colIndex = Math.floor(colIndex / 26) - 1;
  }
  // 行号从1开始
  const rowNumber = row + 1;
  return columnName + rowNumber;
};

// 添加全局错误处理
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.error("全局错误:", msg, url, lineNo, columnNo, error);
  return true;
};

const initSpread = async () => {
  try {
    // 检查 spreadContainer 是否存在
    if (!spreadContainer.value) {
      console.error("spreadContainer.value 为 null，无法初始化 SpreadJS");
      return;
    }



    // 第一步：加载基础脚本（jQuery 和 Bootstrap）
    try {
      // 先加载 jQuery
      await loadScript("/spreadjs/scripts/jquery-1.11.1.min.js");
      // 然后加载其他脚本
      await Promise.all([
        loadScript("/spreadjs/scripts/jquery-ui-1.10.3.custom.min.js"),
        loadScript("/spreadjs/scripts/bootstrap.min.js")
      ]);
    } catch (error) {
      console.error("加载基础脚本失败:", error);
      // 基础脚本加载失败不影响核心功能，继续执行
    }

    // 第二步：加载 SpreadJS 核心库（必须先加载）
    try {
      await loadScript("/spreadjs/scripts/gc.spread.sheets.all.11.0.0.min.js");
    } catch (error) {
      console.error("加载核心库失败:", error);
      return;
    }

    // 等待 GC 对象可用
    try {
      await new Promise<void>((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 30; // 3秒超时

        const checkGC = () => {
          attempts++;
          if (window.GC && window.GC.Spread && window.GC.Spread.Sheets) {
            resolve();
          } else if (attempts >= maxAttempts) {
            reject(new Error("GC 对象初始化超时"));
          } else {
            setTimeout(checkGC, 100);
          }
        };
        checkGC();
      });
    } catch (error) {
      console.error("等待 GC 对象可用失败:", error);
      return;
    }

    // 检查 Events 对象是否存在
    if (!window.GC.Spread.Sheets.Events) {
      console.error("GC.Spread.Sheets.Events 不存在");
      return;
    }

    // 第三步：加载 SpreadJS 扩展库（依赖核心库）
    try {
      await Promise.all([
        loadScript("/spreadjs/scripts/gc.spread.sheets.charts.11.0.0.min.js"),
        loadScript("/spreadjs/scripts/gc.spread.sheets.print.11.0.0.min.js"),
        loadScript(
          "/spreadjs/scripts/gc.spread.sheets.resources.zh.11.0.0.min.js"
        )
      ]);
    } catch (error) {
      console.error("加载扩展库失败:", error);
      // 扩展库加载失败不影响核心功能，继续执行
    }

    // 第四步：加载 ExcelIO 和其他工具
    try {
      await Promise.all([
        loadScript("/spreadjs/scripts/gc.spread.excelio.11.0.0.min.js"),
        loadScript("/spreadjs/scripts/license.js"),
        loadScript("/spreadjs/scripts/FileSaver.min.js")
      ]);
    } catch (error) {
      console.error("加载 ExcelIO 和工具失败:", error);
      // ExcelIO 加载失败不影响核心功能，继续执行
    }

    // 初始化 SpreadJS
    try {
      spread.value = new window.GC.Spread.Sheets.Workbook(
        spreadContainer.value,
        {
          sheetCount: 1,
          sheetTabBarVisible: false,
          allowSheetReorder: false,
          allowSheetNavigation: false,
          allowSheetResize: false,
          contextMenu: true,
          tabStripVisible: false,
          allowUserDragDrop: false
        }
      );
    } catch (error) {
      console.error("初始化 SpreadJS Workbook 失败:", error);
      return;
    }

    spread.value.options.allowUserDragDrop = false;
    // 获取活动工作表
    let sheet;
    try {
      sheet = spread.value.getActiveSheet();
    } catch (error) {
      console.error("获取活动工作表失败:", error);
      return;
    }

    if (!sheet) {
      console.error("活动工作表为 null");
      return;
    }

    // 调用 setupCellEditBlocking
    try {
      setupCellEditBlocking(sheet);
    } catch (error) {
      console.error("调用 setupCellEditBlocking 失败:", error);
    }

    // 获取页面传入的参数

    // 加载 Excel 文件
    try {
      // 使用标签页标题作为文件名
      // console.log(props.fn);
      const fileName = `${props.fn}.xlsx`;
      console.log(fileName);
      sFileName.value = fileName;
      if (!isDataLoaded.value) {
        openSelectedFile();
      }
    } catch (error) {
      console.error("加载 Excel 文件失败:", error);
    }
  } catch (error) {
    console.error("初始化SpreadJS失败:", error);
  }
};

var ssOldValue = "";

const setupCellEditBlocking = (sheet: any) => {
  if (!sheet) {
    console.error("sheet 参数为 null");
    return;
  }

  if (
    !window.GC ||
    !window.GC.Spread ||
    !window.GC.Spread.Sheets ||
    !window.GC.Spread.Sheets.Events
  ) {
    console.error("GC.Spread.Sheets.Events 不可用");
    return;
  }

  // 检查单元格是否为只读（字体颜色为'Text 1 0'）
  const isCellReadOnly = (row: number, col: number): boolean => {
    const style = sheet.getStyle(row, col);
    const color = style && style.foreColor ? style.foreColor : "Text 1 0";
    return color === "Text 1 0";
  };

  /*
    ## SpreadJS 可绑定事件列表
    ### 1. 单元格编辑相关事件
    - EditStarting ：单元格编辑开始时触发
    - EditEnded ：单元格编辑结束时触发
    - ValueChanged ：单元格值改变时触发
    ### 2. 选择相关事件
    - SelectionChanged ：选择区域改变时触发
    ### 3. 拖拽相关事件
    - DragDrop ：拖拽操作发生时触发
    - DragFillBlock ：拖拽填充时触发
    ### 4. 剪贴板操作事件
    - ClipboardChanging ：复制操作时触发
    - ClipboardCutting ：剪切操作时触发
    - ClipboardPasting ：粘贴操作时触发
    ### 5. 工作表相关事件
    - ActiveSheetChanging ：活动工作表变更时触发
    - UserZooming ：用户缩放时触发
    - RangeChanged ：单元格区域变更时触发
    - FloatingObjectRemoved ：浮动对象被移除时触发
    - CommentRemoved ：注释被移除时触发
    ### 6. 单元格交互事件
    - CellDoubleClick ：双击单元格时触发
    ### 7. 其他事件
    - RowColumnResized ：行或列大小调整时触发
    - RowColumnMoved ：行或列移动时触发
    - SheetChanged ：工作表变更时触发
    - SheetAdded ：工作表添加时触发
    - SheetRemoved ：工作表移除时触发
  */
  try {
    // 监听单元格编辑开始事件
    sheet.bind(
      window.GC.Spread.Sheets.Events.EditStarting,
      function (e: any, info: any) {
        const row = info.row;
        const col = info.col;
        if (isCellReadOnly(row, col)) {
          info.cancel = true;
          return;
        }
        info.cancel = !IsEdit.value;
      }
    );

    // 监听单元格编辑结束事件
    sheet.bind(
      window.GC.Spread.Sheets.Events.EditEnded,
      function (e: any, info: any) {
        if (sFileName.value) {
          const row = info.row;
          const col = info.col;
          const value =
            info.editingText !== undefined
              ? info.editingText
              : sheet.getValue(row, col);

          saveSpreadLog(row, col, value);
        }
      }
    );

    // 监听选择变更事件，更新颜色显示
    sheet.bind(
      window.GC.Spread.Sheets.Events.SelectionChanged,
      function (e: any, info: any) {
        if (!info || !info.newSelections || info.newSelections.length === 0) {
          return;
        }

        const row = info.newSelections[0].row;
        const col = info.newSelections[0].col;
        const style = sheet.getStyle(row, col);

        const color = style && style.foreColor ? style.foreColor : "Text 1 0";
        fontColor.value = color;

        const name = getCellName(row, col);
        const value = sheet.getValue(row, col);
        cellName.value = name;
        cellValue.value = value || "无";
        ssOldValue = value || "";

        if (
          color === "rgb(0, 0, 0)" ||
          color === "Text 1 0" ||
          color === "Text1 0"
        ) {
          IsEdit.value = false;
        } else {
          IsEdit.value = true;
        }
      }
    );



    //侦听剪切事件
    sheet.bind(
      window.GC.Spread.Sheets.EventsClipboardCutting,
      function (sender: any, args: any) {
        console.log("剪切事件");
      }
    );
    //复制事件
    sheet.bind(
      window.GC.Spread.Sheets.ClipboardChanging,
      function (sender: any, args: any) {
        console.log("复制事件");
      }
    );

    //行或列移动时触发
    sheet.bind(
      window.GC.Spread.Sheets.RowColumnMoved,
      function (sender: any, args: any) {
        console.log("行或列移动时触发");
      }
    );

    // 监听粘贴事件
    sheet.bind(
      window.GC.Spread.Sheets.Events.ClipboardPasting,
      function (sender: any, args: any) {
        const row = args.cellRange.row;
        const col = args.cellRange.col;

        if (isCellReadOnly(row, col)) {
          args.cancel = true;
          showToastMessage("只读单元格不允许粘贴", "warning");
          return;
        }
        saveSpreadLog(row, col, args.pasteData.text);
      }
    );

    // 监听拖拽填充事件
    sheet.bind(
      window.GC.Spread.Sheets.Events.DragFillBlock,
      function (e: any, args: any) {
        args.cancel = true;
      }
    );

    // 监听拖拽移动事件
    sheet.bind(
      window.GC.Spread.Sheets.Events.DragDrop,
      function (e: any, args: any) {
        // 跟踪拖拽事件
        console.log("【拖拽事件】发生，已被禁止");
        console.log("【拖拽事件】详情:", {
          row: args.row,
          col: args.col,
          targetRow: args.targetRow,
          targetCol: args.targetCol
        });
        // 禁止所有单元格的拖拽移动
        args.cancel = true;
      }
    );

    // 监听单元格值改变事件
    sheet.bind(
      window.GC.Spread.Sheets.Events.ValueChanged,
      function (e: any, args: any) {
        const row = args.row;
        const col = args.col;

        if (isCellReadOnly(row, col)) {
          args.cancel = true;
          return;
        }
      }
    );

    // 监听活动工作表变更事件（添加新工作表时会触发）
    spread.value.bind(
      window.GC.Spread.Sheets.Events.ActiveSheetChanging,
      function (sender: any, args: any) {
        args.cancel = true;
        spread.value.removeSheet(1);
      }
    );

    // 监听单元格双击事件
    sheet.bind(
      window.GC.Spread.Sheets.Events.CellDoubleClick,
      function (e: any, info: any) {
        const row = info.row;
        const col = info.col;
        const value = sheet.getValue(row, col);
        showToastMessage(
          `这是双击事件:行: ${row + 1}, 列: ${String.fromCharCode(65 + col)}, 值: ${value || "无"}`
        );
      }
    );
  } catch (error) {
    console.error("setupCellEditBlocking 执行失败:", error);
  }
};



// 打开选中的文件
const openSelectedFile = async () => {
  if (!selectedFile.value) {
    selectedFile.value = sFileName.value;
    //return;
  }
  try {
    const response = await fetch(
      "/spreadjs/docs/" + selectedFile.value + "?t=" + Date.now()
    );
    if (!response.ok) {
      throw new Error("文件不存在或无法访问: " + response.status);
    }
    sFileName.value = selectedFile.value;

    const blob = await response.blob();

    if (
      window.GC &&
      window.GC.Spread &&
      window.GC.Spread.Excel &&
      window.GC.Spread.Excel.IO
    ) {
      const excelIO = new window.GC.Spread.Excel.IO();
      excelIO.open(
        blob,
        function (json: any) {
          if (spread.value) {
            spread.value.fromJSON(json);
            const sheet = spread.value.getActiveSheet();
            setupCellEditBlocking(sheet);
            if (sheet) {
              setDateFormats(sheet);
              sheet.setSelection(0, 0, 1, 1);
            }

            // 自动执行读取配置
            setTimeout(() => {
              readConfig();
              readData();
              isDataLoaded.value = true;
            }, 100);
          }
        },
        function (error: any) {
          console.error("加载Excel文件失败:", error);
        }
      );
    }
    //openDialogVisible.value = false;
  } catch (error) {
    console.error("打开文件失败:", error);
  }
};

// 另存为功能
const saveAsFile = () => {
  if (!spread.value) return;

  try {
    const json = spread.value.toJSON({ includeBindingSource: true });
    // 生成带日期时间的文件名（使用本地时间）
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;

    // 使用当前打开的文件名（如果有的话），否则使用默认文件名
    let baseName = "spreadjs_export";
    if (selectedFile.value) {
      baseName = selectedFile.value.replace(/\.xlsx?$/i, "");
    }
    const fileName = `${baseName}_${timestamp}.xlsx`;

    if (
      window.GC &&
      window.GC.Spread &&
      window.GC.Spread.Excel &&
      window.GC.Spread.Excel.IO
    ) {
      const excelIO = new window.GC.Spread.Excel.IO();
      excelIO.save(
        json,
        function (blob: Blob) {
          // 显示下载提示
          showToastMessage(`开始下载: ${fileName}`, "success");

          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        },
        function (error: any) {
          console.error("保存文件失败:", error);
        }
      );
    }
  } catch (error) {
    console.error("另存为失败:", error);
  }
};

// 读取Spread日志API
const readSpreadLog = async (param: string) => {
  try {
    const url = SPREAD_LOG_API_BASE + param;

    const response = await fetch(url);

    if (!response.ok) {
      console.error("【读取Spread日志】API调用失败:", response.status);
      return;
    }
    const data = await response.json();

    if (data.rs0 && Array.isArray(data.rs0)) {
      const sheet = spread.value?.getActiveSheet();
      if (!sheet) return;

      data.rs0.forEach((item: any) => {
        if (item.sCom === "填写" || item.com === "填写") {
          const row = parseInt(item.row);
          const col = parseInt(item.col);
          const value = item.value;
          sheet.setValue(row, col, value);
        }
      });
    }
  } catch (error) {
    console.error("【读取Spread日志】读取失败:", error);
  }
};

// 保存spread日志API
const saveSpreadLog = async (row: number, col: number, value: any) => {
  try {
    const param = `${sFileName.value}@${row}@${col}@${value}@填写@${ssOldValue}`;
    const url = SAVE_SPREAD_LOG_API_BASE + param;

    const response = await fetch(url);
    if (!response.ok) {
      console.error("【保存spread日志】API调用失败:", response.status);
      return;
    }
    const data = await response.json();
  } catch (error) {
    console.error("【保存spread日志】保存失败:", error);
  }
};

// 格式化时间为yyyy-MM-dd hh:mm:ss格式
const formatDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 开始轮询Spread日志
const startPollingSpreadLog = () => {
  if (pollingTimer) {
    clearInterval(pollingTimer);
  }
  pollingTimer = setInterval(() => {
    if (sFileName.value) {
      const now = new Date();
      const oneMinuteAgo = new Date(now.getTime());
      const timeParam = formatDateTime(oneMinuteAgo);

      readSpreadLog(sFileName.value + "@" + timeParam);
    }
  }, 5000); // 每1分钟轮询一次
};

// 停止轮询Spread日志
const stopPollingSpreadLog = () => {
  if (pollingTimer) {
    clearInterval(pollingTimer);
    pollingTimer = null;
  }
};

// 显示右下角提示
const showToastMessage = (message: string, type: string = "info") => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  // 3秒后自动关闭
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// 删除Spread日志API
const deleteSpreadLog = async () => {
  if (!sFileName.value) {
    return;
  }
  try {
    const url =
      "https://app4.55555566.com/jws/JsonServlet?fileName=删除Spread日志&param=" +
      sFileName.value;

    const response = await fetch(url);
    if (!response.ok) {
      console.error("【删除Spread日志】API调用失败:", response.status);
      return;
    }
    const data = await response.json();
    console.log("【删除Spread日志】返回数据:", data);
  } catch (error) {
    console.error("【删除Spread日志】删除失败:", error);
  }
  selectedFile.value = sFileName.value;
  openSelectedFile();
};

// 撤销操作功能
const undoLastAction = async () => {
  if (!sFileName.value) {
    showToastMessage("请先打开文件", "warning");
    return;
  }

  try {
    const sheet = spread.value?.getActiveSheet();
    if (!sheet) {
      showToastMessage("无法获取工作表", "warning");
      return;
    }

    // 获取当前选中的行和列
    const selections = sheet.getSelections();
    if (!selections || selections.length === 0) {
      showToastMessage("请先选择一个单元格", "warning");
      return;
    }

    const selection = selections[0];
    const row = selection.row;
    const col = selection.col;

    // 调用API接口
    const url = `https://app4.55555566.com/jws/JsonServlet?fileName=Spread恢复上一步&param=${sFileName.value}@${row}@${col}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error("【撤销操作】API调用失败:", response.status);
      showToastMessage("撤销失败", "error");
      return;
    }

    const data = await response.json();

    // 检查返回值
    if (data && data.rs0 && data.rs0[0].sValue !== "无上一步") {
      // 赋值给当前单元格
      sheet.setValue(row, col, data.rs0[0].sValue);
      showToastMessage("撤销成功", "success");
    } else {
      showToastMessage("无上一步操作", "info");
    }
  } catch (error) {
    console.error("【撤销操作】执行失败:", error);
    showToastMessage("撤销失败", "error");
  }
};

// 读取图片到单元格功能
const loadImageToCell = async () => {
  try {
    const sheet = spread.value?.getActiveSheet();
    if (!sheet) {
      showToastMessage("无法获取工作表", "warning");
      return;
    }

    // 设置B1单元格的宽高为200*200
    sheet.setColumnWidth(1, 200); // B列是索引1
    sheet.setRowHeight(0, 200); // 第1行是索引0

    // 图片URL
    const imageUrl = "https://app2.55555566.com/tomcat.png";

    // 创建图片元素
    const img = new Image();
    img.onload = function () {
      try {
        // 清除B1单元格的现有内容
        sheet.setValue(0, 1, "");

        // 计算B1单元格的实际位置
        const colWidth = sheet.getColumnWidth(1); // B列宽度
        const rowHeight = sheet.getRowHeight(0); // 第1行高度

        // 计算B1单元格的左上角坐标
        let x = 0;
        for (let i = 0; i < 1; i++) {
          // 计算B列之前的所有列宽
          x += sheet.getColumnWidth(i);
        }

        let y = 0;
        for (let i = 0; i < 0; i++) {
          // 计算第1行之前的所有行高
          y += sheet.getRowHeight(i);
        }

        // 添加图片到B1单元格，左上角与单元格一致
        const picture = sheet.pictures.add(
          "tomcat",
          imageUrl,
          x, // 左上角X坐标（B列起始位置）
          y, // 左上角Y坐标（第1行起始位置）
          200, // 宽度
          200 // 高度
        );

        // 设置图片随单元格移动和调整大小
        picture.dynamicMove(true);
        picture.dynamicSize(true);

        showToastMessage("图片加载成功", "success");
      } catch (error) {
        console.error("【读取图片】添加图片失败:", error);
        showToastMessage("图片加载失败", "error");
      }
    };

    img.onerror = function () {
      console.error("【读取图片】图片加载失败");
      showToastMessage("图片加载失败", "error");
    };

    // 开始加载图片
    img.src = imageUrl;
  } catch (error) {
    console.error("【读取图片】执行失败:", error);
    showToastMessage("图片加载失败", "error");
  }
};

var aaConfig = []; //: Record<string, string> = {};

// 读取配置功能
const readConfig = () => {
  if (!spread.value) return;

  const sheet = spread.value.getActiveSheet();
  if (!sheet) return;

  const maxRows = Math.min(sheet.getRowCount(), 100);
  const colCount = sheet.getColumnCount();
  aaConfig = []; // 清空数组
  // 遍历前100行
  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < colCount; col++) {
      const value = sheet.getValue(row, col);

      // 检查值是否为字符串且匹配 {{...}} 格式
      if (
        typeof value === "string" &&
        value.startsWith("{{") &&
        value.endsWith("}}")
      ) {
        // 获取单元格名称
        const cellName = getCellName(row, col);
        // 去掉前后的大括号
        const configValue = value.slice(2, -2);
        var oconfig = {};

        // 按逗号分割 configValue，兼容中文逗号
        const parts = configValue.split(/[,，]/);

        // 解析键值对
        parts.forEach(pair => {
          // 按冒号分割，兼容中文冒号
          const keyValue = pair.split(/[:：]/);
          if (keyValue.length >= 2) {
            let key = keyValue[0].trim();
            let val = keyValue.slice(1).join(":").trim();

            // 将 key 转换为小写
            key = key.toLowerCase();
            oconfig[key] = val;
          }
        });
        if (!oconfig["key"]) {
          oconfig["key"] = cellName;
        }
        aaConfig.push(oconfig);
        sheet.setValue(row, col, "");
      }
    }
  }
};

// 解读配置功能
const interpretConfig = () => {
  if (!spread.value) return;

  const sheet = spread.value.getActiveSheet();
  if (!sheet) return;

  // 轮询 aaConfig
  aaConfig.forEach(config => {
    if (config.prarm) {
      // 以 '@' 分割 prarm 值
      const cells = config.prarm.split("@");
      const values = [];

      // 读取每个单元格的值
      cells.forEach(cellAddress => {
        const { row, col } = parseCellAddress(cellAddress);
        if (row !== -1 && col !== -1) {
          let value = sheet.getValue(row, col);

          // 处理日期时间类型
          if (value instanceof Date) {
            value = formatDate(value);
          }

          values.push(value || "");
        } else {
          values.push("");
        }
      });

      // 组合成新的变量，以 '@' 分割
      const combinedValue = values.join("@");

      // 创建新的键值对 'value:...'
      config.value = combinedValue;
    }
  });

  // 跟踪输出解读后的配置
  // console.log("解读后的配置:", aaConfig);
};

// 解析单元格地址（如 A1, B2 等）
//const parseCellAddress = address => {
const parseCellAddress = (address: string): { row: number; col: number } => {
  const match = address.match(/([A-Za-z]+)(\d+)/);
  if (!match) return { row: -1, col: -1 };

  const [, colStr, rowStr] = match;
  const row = parseInt(rowStr) - 1; // 转换为 0-based 索引

  // 转换列字母为 0-based 索引
  let col = 0;
  for (let i = 0; i < colStr.length; i++) {
    col = col * 26 + (colStr.charAt(i).toUpperCase().charCodeAt(0) - 65 + 1);
  }
  col -= 1;

  return { row, col };
};

// 格式化日期时间为 yyyy-MM-dd hh:mm:ss 格式
const formatDate = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 运行配置功能
const runConfig = async () => {
  if (!spread.value) return;

  const sheet = spread.value.getActiveSheet();
  if (!sheet) return;

  let processedCount = 0;

  // 轮询 aaConfig
  for (const config of aaConfig) {
    if (config.type === "读取" && config.com) {
      try {
        // 构建 API URL
        const url = `https://app4.55555566.com/jws/JsonServlet?fileName=${encodeURIComponent(config.com)}&param=${encodeURIComponent(config.value)}`;

        // 调用 API
        const startTime = Date.now();
        const response = await fetch(url);
        const data = await response.json();
        const apiTime = Date.now() - startTime;

        // 处理结果集
        if (data && data.rs0) {
          // 开始计时（从API响应到数据显示完成）
          const processStartTime = Date.now();

          const rs0 = data.rs0;

          // 解析 colname
          const columns = config.colname ? config.colname.split("@") : [];

          // 构建数据数组
          const dataArray = [];

          if (columns.length > 0) {
            // 如果有指定列名，只读取指定列
            rs0.forEach((item: any) => {
              const row = [];
              columns.forEach(col => {
                row.push(item[col] || "");
              });
              dataArray.push(row);
            });
          } else {
            // 如果没有指定列名，读取所有列
            if (rs0.length > 0) {
              const keys = Object.keys(rs0[0]);
              dataArray.push(keys); // 添加表头
              rs0.forEach((item: any) => {
                const row = keys.map(key => item[key] || "");
                dataArray.push(row);
              });
            }
          }

          // console.log(dataArray);

          // 复制到电子表格
          if (dataArray.length > 0) {
            // 结束计时
            const processTime = Date.now() - processStartTime;

            if (config.into && config.into.trim() !== "") {
              // 如果有 config.into，按指定单元格赋值
              const cells = config.into.split("@");
              const firstRow = dataArray[0];

              cells.forEach((cellAddress, index) => {
                if (index < firstRow.length) {
                  const { row, col } = parseCellAddress(cellAddress);
                  if (row !== -1 && col !== -1) {
                    sheet.setValue(row, col, firstRow[index]);
                  }
                }
              });
            } else {
              // 根据 config.key 计算起始行和列
              const { row: startRow, col: startCol } = parseCellAddress(
                config.key
              );

              // 计算需要的最大行列数
              const requiredRows = startRow + dataArray.length;
              const requiredCols = startCol + dataArray[0].length;

              // 检查并调整电子表格的行列数
              const currentRowCount = sheet.getRowCount();
              const currentColCount = sheet.getColumnCount();

              if (requiredRows > currentRowCount) {
                sheet.setRowCount(requiredRows + 1);
              }
              if (requiredCols > currentColCount) {
                sheet.setColumnCount(requiredCols);
              }

              sheet.setArray(startRow, startCol, dataArray);
              var iLen = dataArray.length;
              const aStyle = [];

              // 加载列表数据时,同时加载第一行的格式
              for (var c = startCol; c < startCol + dataArray[0].length; c++) {
                aStyle[c] = sheet.getStyle(startRow, c);
              }

              for (var r = startRow; r < startRow + iLen; r++) {
                for (
                  var c = startCol;
                  c < startCol + dataArray[0].length;
                  c++
                ) {
                  sheet.setStyle(r, c, aStyle[c]);
                }
              }

              // 设置边框
              try {
                const lineStyle = window.GC.Spread.Sheets.LineStyle;
                const lineBorder = new window.GC.Spread.Sheets.LineBorder(
                  "black",
                  lineStyle.thin
                );
                // 根据结果集动态计算边框范围
                const rowCount = dataArray.length;
                const colCount = rowCount > 0 ? dataArray[0].length : 0;
                sheet
                  .getRange(startRow, startCol, rowCount, colCount)
                  .setBorder(lineBorder, {
                    left: true,
                    top: true,
                    right: true,
                    bottom: true,
                    innerHorizontal: true,
                    innerVertical: true
                  });
              } catch (error) {
                console.error("设置边框失败:", error);
              }
            }
          }

          processedCount++;
        }
      } catch (error) {
        console.error("调用API失败:", error);
      }
    }
  }
};

// 读取数据功能
const readData = async () => {
  // 先运行解读
  interpretConfig();
  runConfig();

  setTimeout(() => {
    readSpreadLog(sFileName.value);
    startPollingSpreadLog();
  }, 1000);

  // 显示成功提示
  showToastMessage("数据读取完成", "success");
};

// 设置日期格式功能
const setDateFormats = (sheet: any) => {
  if (!sheet) return;

  try {
    const rowCount = sheet.getRowCount();
    const colCount = sheet.getColumnCount();

    // 遍历所有单元格
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        const value = sheet.getValue(row, col);
        const style = sheet.getStyle(row, col) || {};

        // 检查是否是日期类型
        if (value instanceof Date) {
          const hours = value.getHours();
          const minutes = value.getMinutes();
          const seconds = value.getSeconds();

          let formatString = "";

          // 判断日期类型
          if (hours === 0 && minutes === 0 && seconds === 0) {
            // 纯日期
            formatString = "yyyy-MM-dd";
          } else if (
            value.getFullYear() === 1900 &&
            value.getMonth() === 0 &&
            value.getDate() === 1
          ) {
            // 纯时间
            formatString = "hh:mm:ss";
          } else {
            // 日期时间
            formatString = "yyyy-MM-dd hh:mm:ss";
          }

          // 设置格式
          if (formatString) {
            style.formatter = formatString;
            sheet.setStyle(row, col, style);
          }
        }
      }
    }
  } catch (error) {
    console.error("设置日期格式失败:", error);
  }
};

onMounted(() => {
  // 使用 setTimeout 确保 DOM 已经渲染完成
  setTimeout(() => {
    
    initSpread();
  }, 100);
});

onActivated(() => {
  // 组件被激活时，已经加载过数据的话就不再重新加载
  if (isDataLoaded.value && spread.value) {
    // 可以在这里添加一些激活时的逻辑，比如恢复轮询
    startPollingSpreadLog();
  }
});

// 监听 fn 参数变化
watch(() => props.fn, (newFn, oldFn) => {
  if (newFn !== oldFn) {
    // 当 fn 改变时，重置数据加载状态
    isDataLoaded.value = false;
    // 重新初始化
    initSpread();
  }
});

onUnmounted(() => {
  stopPollingSpreadLog();
  // 清理其他事件监听器
  if (spread.value) {
    const sheet = spread.value.getActiveSheet();
    if (sheet) {
      // 移除所有事件监听器
      sheet.unbindAll();
    }
    spread.value.unbindAll();
  }
});
</script>

<template>
  <div class="spreadjs-container">
    <div class="spreadjs-header">
      <h1>{{ props.fn }}</h1>
      <div class="spreadjs-actions">
        <!-- <el-button type="primary" @click="openBlankSheet">打开空白表格</el-button> -->
        <!-- <el-button type="primary" @click="openFile">打开</el-button> -->
        <el-button type="primary" @click="saveAsFile">另存为</el-button>
        <!-- <el-button type="info" @click="readData">读取数据</el-button> -->
        <el-button type="warning" @click="undoLastAction">撤销</el-button>
        <el-button type="primary" @click="loadImageToCell">读取图片</el-button>
        <el-button type="danger" @click="deleteSpreadLog">初始页面</el-button>
      </div>
    </div>
    
    <div class="spreadjs-main">
      <div id="spreadContainer" ref="spreadContainer" />
    </div>
    
    <div class="spreadjs-footer">
      <div>字体颜色: {{ fontColor }}</div>
      <div>单元格名称: {{ cellName }}</div>
      <div>单元格值: {{ cellValue }}</div>
    </div>
    
    <!-- 打开文件对话框 -->
    <!-- <el-dialog
      v-model="openDialogVisible"
      title="选择文件"
      width="600px"
      center
      modal
      :close-on-click-modal="false"
    >
      <div class="file-list">
        <div
          v-for="file in fileList"
          :key="file"
          :class="['file-item', { 'active': selectedFile === file }]"
          @click="selectedFile = file"
          @dblclick="openSelectedFile"
        >
          {{ file }}
        </div>
      </div>
      <template #footer>
        <el-button @click="openDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="openSelectedFile">打开</el-button>
      </template>
    </el-dialog> -->
    
  </div>
</template>

<style scoped>
.spreadjs-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--wj-background-page);
  font-family: var(--wj-font-family);
}

.spreadjs-header {
  background-color: var(--wj-background-white);
  padding: var(--wj-spacing-md);
  border-bottom: 1px solid var(--wj-border-base);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--wj-box-shadow-light);
}

.spreadjs-header h1 {
  font-size: var(--wj-font-size-large);
  font-weight: var(--wj-font-weight-bold);
  color: var(--wj-text-primary);
  margin: 0;
}

.spreadjs-actions {
  display: flex;
  gap: var(--wj-spacing-sm);
  flex-wrap: wrap;
  align-items: center;
}

.spreadjs-actions .el-button {
  border-radius: var(--wj-border-radius-base);
  font-weight: var(--wj-font-weight-medium);
  transition: var(--wj-transition-all);
  box-shadow: var(--wj-box-shadow-light);
  font-size: var(--wj-font-size-base);
  height: var(--wj-button-height-base);
  padding: 0 var(--wj-button-padding-horizontal);
}

.spreadjs-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--wj-box-shadow-base);
}

.spreadjs-actions .el-button:active {
  transform: translateY(0);
  box-shadow: var(--wj-box-shadow-light);
}

.spreadjs-main {
  flex: 1;
  overflow: auto;
  background-color: var(--wj-background-white);
  margin: var(--wj-spacing-md);
  border-radius: var(--wj-border-radius-large);
  box-shadow: var(--wj-box-shadow-light);
  overflow: hidden;
}

#spreadContainer {
  width: 100%;
  height: 100%;
  min-height: 500px;
}

.spreadjs-footer {
  background-color: var(--wj-background-white);
  padding: var(--wj-spacing-sm) var(--wj-spacing-md);
  border-top: 1px solid var(--wj-border-base);
  display: flex;
  gap: var(--wj-spacing-lg);
  font-size: var(--wj-font-size-base);
  color: var(--wj-text-regular);
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.05);
}

.spreadjs-footer > div {
  display: flex;
  align-items: center;
  gap: var(--wj-spacing-xs);
}

.file-list {
  max-height: 300px;
  overflow-y: auto;
}

.file-item {
  padding: var(--wj-spacing-sm);
  cursor: pointer;
  border-radius: var(--wj-border-radius-small);
  transition: var(--wj-transition-all);
}

.file-item:hover {
  background-color: var(--wj-background-base);
}

.file-item.active {
  background-color: var(--wj-primary-light);
  border-left: 3px solid var(--wj-primary-color);
}

.help-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--wj-primary-color);
  color: white;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--wj-box-shadow-base);
  z-index: var(--wj-z-index-fixed);
  transition: var(--wj-transition-all);
}

.help-button:hover {
  background-color: var(--wj-primary-hover);
  transform: scale(1.1);
  box-shadow: var(--wj-box-shadow-dark);
}

.help-content {
  padding: var(--wj-spacing-lg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .spreadjs-main {
    margin: var(--wj-spacing-sm);
  }
  
  .spreadjs-header {
    padding: var(--wj-spacing-sm);
  }
  
  .spreadjs-header h1 {
    font-size: var(--wj-font-size-medium);
  }
  
  .spreadjs-actions {
    gap: var(--wj-spacing-xs);
  }
  
  .spreadjs-actions .el-button {
    font-size: var(--wj-font-size-small);
    padding: 0 12px;
  }
  
  .spreadjs-footer {
    flex-direction: column;
    gap: var(--wj-spacing-xs);
    align-items: flex-start;
  }
}
</style>
