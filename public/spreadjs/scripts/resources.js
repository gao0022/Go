var uiResource = {
    toolBar: {
        zoom: {
            title: "Zoom",
            zoomOption: {
                twentyFivePercentSize: "25%",
                fiftyPercentSize: "50%",
                seventyFivePercentSize: "75%",
                defaultSize: "100%",
                oneHundredTwentyFivePercentSize: "125%",
                oneHundredFiftyPercentSize: "150%",
                twoHundredPercentSize: "200%",
                threeHundredPercentSize: "300%",
                fourHundredPercentSize: "400%"
            }
        },
        clear: {
            title: "Clear",
            clearActions: {
                clearAll: "Clear All",
                clearFormat: "Clear Format"
            }
        },
        export: {
            title: "Export",
            exportActions: {
                exportJson: "Export JSON",
                exportExcel: "Export Excel"
            }
        },
        downloadTitle: "保存文件",
        download: "Right Click To Download Linked File As...",
        showInspector: "显示编辑栏",
        hideInspector: "隐藏编辑栏",
        importJson: "导出JSON",
        importFile: "导出文件",
        insertTable: "插入表",
        insertPicture: "插入图片",
        insertComment: "插入批注",
        insertSparkline: "插入小图表",
        insertChart: "插入图表",
        insertSlicer: "Insert Slicer"
    },
    tabs: {
        spread: "全局",
        sheet: "工作表",
        cell: "单元格",
        table: "表",
        data: "数据",
        comment: "批注",
        picture: "图片",
        sparklineEx: "小图表",
        chartEx: "图表",
        slicer: "Slicer"
    },
    spreadTab: {
        general: {
            title: "一般",
            allowDragDrop: "允许拖放",
            allowDragFill: "允许拖动和填充",
            allowZoom: "允许缩放",
            allowOverflow: "允许溢出",
            showDragFillSmartTag: "显示拖动填充智能标记",
            allowDragMerge: "允许拖放和合并",
            allowContextMenu: "允许上下文菜单"
        },
        calculation: {
            title: "计算",
            referenceStyle: {
                title: "单元格名称格式",
                r1c1: "R1C1",
                a1: "A1"
            }
        },
        scrollBar: {
            title: "滚动条",
            showVertical: "纵向滚动条",
            showHorizontal: "横向滚动条",
            maxAlign: "Scrollbar Max Align",
            showMax: "Scrollbar Show Max",
            scrollIgnoreHidden: "滚动忽略隐藏的行或列"
        },
        tabStip: {
            title: "选项卡",
            visible: "选项卡可见",
            newTabVisible: "新选项卡可见",
            editable: "选项卡可编辑",
            showTabNavigation: "显示选项卡导航"
        },
        color: {
            title: "颜色",
            spreadBackcolor: "Spread 背景色",
            grayAreaBackcolor: "Gray Area 背景色"
        },
        tip: {
            title: "提示",
            showDragDropTip: "显示拖放提示",
            showDragFillTip: "显示拖动填充提示",
            scrollTip: {
                title: "滚动提示",
                values: {
                    none: "None",
                    horizontal: "横向",
                    vertical: "纵向",
                    both: "横向+纵向"
                }
            },
            resizeTip: {
                title: "调整大小提示",
                values: {
                    none: "None",
                    column: "列",
                    row: "行",
                    both: "列+行"
                }
            }
        },
        sheets: {
            title: "工作表",
            sheetName: "工作表名称",
            sheetVisible: "工作表可见"
        },
        cutCopy: {
            title: "剪切 / 复制",
            cutCopyIndicator: {
                visible: "显示指示器",
                borderColor: "指示器边框颜色"
            },
            allowCopyPasteExcelStyle: "允许复制粘贴Excel样式",
            allowExtendPasteRange: "允许扩展粘贴范围",
            copyPasteHeaderOptions: {
                title: "标题选项",
                option: {
                    noHeaders: "无标题",
                    rowHeaders: "行标题",
                    columnHeaders: "列标题",
                    allHeaders: "全部标题"
                }
            }
        },
        spreadTheme: {
            title: "主题",
            theme: {
                title: "主题",
                option: {
                    spreadJS: "SpreadJS",
                    excel2013White: "Excel2013 White",
                    excel2013LightGray: "Excel2013 Light Gray",
                    excel2013DarkGray: "Excel2013 Dark Gray",
                    excel2016Colorful: "Excel2016 Colorful",
                    excel2016DarkGray: "Excel2016 Dark Gray"
                }
            }
        },
        resizeZeroIndicator: {
            title: "调整零的状态",
            option: {
                defaultValue: "默认",
                enhanced: "增强"
            }
        }
    },
    sheetTab: {
        general: {
            title: "一般",
            rowCount: "行",
            columnCount: "列",
            name: "名称",
            tabColor: "选项卡颜色"
        },
        freeze: {
            title: "冻结",
            frozenRowCount: "标题行数",
            frozenColumnCount: "标题列数",
            trailingFrozenRowCount: "页脚行数",
            trailingFrozenColumnCount: "页脚列数",
            frozenLineColor: "颜色",
            freezePane: "冻结",
            unfreeze: "解除冻结"
        },
        gridLine: {
            title: "表格线",
            showVertical: "显示竖线",
            showHorizontal: "显示横线",
            color: "Color"
        },
        header: {
            title: "标题",
            showRowHeader: "显示行标题",
            showColumnHeader: "显示列表题"
        },
        selection: {
            title: "选择区域",
            borderColor: "边框颜色",
            backColor: "背景色",
            hide: "隐藏选择区域",
            policy: {
                title: "选择方式",
                values: {
                    single: "单选",
                    range: "范围",
                    multiRange: "多范围"
                }
            },
            unit: {
                title: "单元",
                values: {
                    cell: "单元格",
                    row: "行",
                    column: "列"
                }
            }
        },
        protection: {
            title: "保护",
            protectSheet: "保护工作表",
            selectLockCells: "选择锁定的单元格",
            selectUnlockedCells: "撤销锁定的单元格",
            sort: "排序",
            useAutoFilter: "使用自动筛选",
            resizeRows: "调整行大小",
            resizeColumns: "调整列大小",
            editObjects: "编辑对象"
        }
    },
    cellTab: {
        style: {
            title: "样式",
            fontFamily: "字体",
            fontSize: "大小",
            foreColor: "前景色",
            backColor: "背景色",
            waterMark: "标签",
            cellPadding: "内边距",
            cellLabel: {
                title: "标签选项",
                visibility: "可见度",
                visibilityOption: {
                    auto: "自动",
                    visible: "可见",
                    hidden: "隐藏"
                },
                alignment: "对齐",
                alignmentOption: {
                    topLeft: "上+左",
                    topCenter: "上+居中",
                    topRight: "上+右",
                    bottomLeft: "下+左",
                    bottomCenter: "下+居中",
                    bottomRight: "下+右"
                },
                fontFamily: "字体",
                fontSize: "大小",
                foreColor: "颜色",
                labelMargin: "边缘"
            },
            borders: {
                title: "边框",
                values: {
                    bottom: "Bottom Border",
                    top: "Top Border",
                    left: "Left Border",
                    right: "Right Border",
                    none: "No Border",
                    all: "All Border",
                    outside: "Outside Border",
                    thick: "Thick Box Border",
                    doubleBottom: "Bottom Double Border",
                    thickBottom: "Thick Bottom Border",
                    topBottom: "Top and Bottom Border",
                    topThickBottom: "Top and Thick Bottom Border",
                    topDoubleBottom: "Top and Double Bottom Border"
                }
            }
        },
        border: {
            title: "边框",
            rangeBorderLine: "线条",
            rangeBorderColor: "颜色",
            noBorder: "None",
            outsideBorder: "Outside Border",
            insideBorder: "Inside Border",
            allBorder: "All Border",
            leftBorder: "Left Border",
            innerVertical: "Inner Vertical",
            rightBorder: "Right Border",
            topBorder: "Top Border",
            innerHorizontal: "Inner Horizontal",
            bottomBorder: "Bottom Border"
        },
        alignment: {
            title: "对齐",
            top: "上",
            middle: "垂直中间",
            bottom: "下",
            left: "左",
            center: "横向中间",
            right: "右",
            wrapText: "自动换行",
            decreaseIndent: "减少缩进",
            increaseIndent: "增加缩进"
        },
        format: {
            title: "格式化",
            commonFormat: {
                option: {
                    general: "一般",
                    number: "数字",
                    currency: "通用货币",
                    accounting: "会计",
                    shortDate: "短日期",
                    longDate: "长日期",
                    time: "时间",
                    percentage: "百分率",
                    fraction: "小数",
                    scientific: "科学计数法",
                    text: "文本"
                }
            },
            percentValue: "0%",
            commaValue: "#,##0.00; (#,##0.00); \"-\"??;@",
            custom: "风格",
            setButton: "设置"
        },
        merge: {
            title: "合并单元格",
            mergeCells: "合并",
            unmergeCells: "撤销合并"
        },
        cellType: {
            title: "单元格类型"
        },
        conditionalFormat: {
            title: "条件格式",
            useConditionalFormats: "使用条件格式"
        },
        protection: {
            title: "保护",
            lock: "锁定",
            sheetIsProtected: "保护工作表(在工作表选项卡中修改状态)",
            sheetIsUnprotected: "撤销保护工作表(在工作表选项卡中修改状态)"
        }
    },
    tableTab: {
        tableStyle: {
            title: "表格样式",
            light: {
                light1: "light1",
                light2: "light2",
                light3: "light3",
                light7: "light7"
            },
            medium: {
                medium1: "medium1",
                medium2: "medium2",
                medium3: "medium3",
                medium7: "medium7"
            },
            dark: {
                dark1: "dark1",
                dark2: "dark2",
                dark3: "dark3",
                dark7: "dark7"
            }
        },
        general: {
            title: "General",
            tableName: "Name"
        },
        options: {
            title: "Options",
            filterButton: "Filter Button",
            headerRow: "Header Row",
            totalRow: "Total Row",
            bandedRows: "Banded Rows",
            bandedColumns: "Banded Columns",
            firstColumn: "First Column",
            lastColumn: "Last Column"
        }
    },
    dataTab: {
        sort: {
            title: "排序 & 筛选",
            asc: "排序 A-Z",
            desc: "排序 Z-A",
            filter: "删选"
        },
        group: {
            title: "分组",
            group: "分组",
            ungroup: "取消分组",
            showDetail: "显示细节",
            hideDetail: "隐藏细节",
            showRowOutline: "显示行线条",
            showColumnOutline: "显示列线条"
        },
        dataValidation: {
            title: "数据验证",
            setButton: "设置",
            clearAllButton: "清除全部",
            circleInvalidData: "圈出无效数据",
            setting: {
                title: "Setting",
                values: {
                    validatorType: {
                        title: "Validator Type",
                        option: {
                            anyValue: "Any Value",
                            number: "Number",
                            list: "List",
                            formulaList: "FormulaList",
                            date: "Date",
                            textLength: "Text Length",
                            custom: "Custom"
                        }
                    },
                    ignoreBlank: "IgnoreBlank",
                    validatorComparisonOperator: {
                        title: "Operator",
                        option: {
                            between: "Between",
                            notBetween: "NotBetween",
                            equalTo: "EqualTo",
                            notEqualTo: "NotEqualTo",
                            greaterThan: "GreaterThan",
                            lessThan: "LessThan",
                            greaterThanOrEqualTo: "GreaterThanOrEqualTo",
                            lessThanOrEqualTo: "LessThanOrEqualTo"
                        }
                    },
                    number: {
                        minimum: "Minimum",
                        maximum: "Maximum",
                        value: "Value",
                        isInteger: "Is Integer"
                    },
                    source: "Source",
                    date: {
                        startDate: "Start Date",
                        endDate: "End Date",
                        value: "Value",
                        isTime: "Is Time"
                    },
                    formula: "Formula"
                }
            },
            inputMessage: {
                title: "Input Message",
                values: {
                    showInputMessage: "Show when cell is selected",
                    title: "Title",
                    message: "Message"
                }
            },
            errorAlert: {
                title: "Error Alert",
                values: {
                    showErrorAlert: "Show after invalid data is entered",
                    alertType: {
                        title: "Alert Type",
                        option: {
                            stop: "Stop",
                            warning: "Warning",
                            information: "Information"
                        }
                    },
                    title: "Title",
                    message: "Message"
                }
            }
        }
    },
    commentTab: {
        general: {
            title: "General",
            dynamicSize: "Dynamic Size",
            dynamicMove: "Dynamic Move",
            lockText: "Lock Text",
            showShadow: "Show Shadow"
        },
        font: {
            title: "Font",
            fontFamily: "Font",
            fontSize: "Size",
            fontStyle: {
                title: "Style",
                values: {
                    normal: "normal",
                    italic: "italic",
                    oblique: "oblique",
                    inherit: "inherit"
                }
            },
            fontWeight: {
                title: "Weight",
                values: {
                    normal: "normal",
                    bold: "bold",
                    bolder: "bolder",
                    lighter: "lighter"
                }
            },
            textDecoration: {
                title: "Decoration",
                values: {
                    none: "none",
                    underline: "underline",
                    overline: "overline",
                    linethrough: "linethrough"
                }
            }
        },
        border: {
            title: "Border",
            width: "Width",
            style: {
                title: "Style",
                values: {
                    none: "none",
                    hidden: "hidden",
                    dotted: "dotted",
                    dashed: "dashed",
                    solid: "solid",
                    double: "double",
                    groove: "groove",
                    ridge: "ridge",
                    inset: "inset",
                    outset: "outset"
                }
            },
            color: "Color"
        },
        appearance: {
            title: "Appearance",
            horizontalAlign: {
                title: "Horizontal",
                values: {
                    left: "left",
                    center: "center",
                    right: "right",
                    general: "general"
                }
            },
            displayMode: {
                title: "Display Mode",
                values: {
                    alwaysShown: "AlwaysShown",
                    hoverShown: "HoverShown"
                }
            },
            foreColor: "Forecolor",
            backColor: "Backcolor",
            padding: "Padding",
            zIndex: "Z-Index",
            opacity: "Opacity"
        }
    },
    pictureTab: {
        general: {
            title: "General",
            moveAndSize: "Move and size with cells",
            moveAndNoSize: "Move and don't size with cells",
            noMoveAndSize: "Don't move and size with cells",
            fixedPosition: "Fixed Position"
        },
        border: {
            title: "Border",
            width: "Width",
            radius: "Radius",
            style: {
                title: "Style",
                values: {
                    solid: "solid",
                    dotted: "dotted",
                    dashed: "dashed",
                    double: "double",
                    groove: "groove",
                    ridge: "ridge",
                    inset: "inset",
                    outset: "outset"
                }
            },
            color: "Color"
        },
        appearance: {
            title: "Appearance",
            stretch: {
                title: "Stretch",
                values: {
                    stretch: "Stretch",
                    center: "Center",
                    zoom: "Zoom",
                    none: "None"
                }
            },
            backColor: "Backcolor"
        }
    },
    sparklineExTab: {
        pieSparkline: {
            title: "PieSparkline Setting",
            values: {
                percentage: "Percentage",
                color: "Color ",
                setButton: "Set"
            }
        },
        areaSparkline: {
            title: "AreaSparkline Setting",
            values: {
                line1: "Line 1",
                line2: "Line 2",
                minimumValue: "Minimum Value",
                maximumValue: "Maximum Value",
                points: "Points",
                positiveColor: "Positive Color",
                negativeColor: "Negative Color",
                setButton: "Set"
            }
        },
        boxplotSparkline: {
            title: "BoxPlotSparkline Setting",
            values: {
                points: "Points",
                boxplotClass: "BoxPlotClass",
                scaleStart: "ScaleStart",
                scaleEnd: "ScaleEnd",
                acceptableStart: "AcceptableStart",
                acceptableEnd: "AcceptableEnd",
                colorScheme: "ColorScheme",
                style: "Style",
                showAverage: "Show Average",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        bulletSparkline: {
            title: "BulletSparkline Setting",
            values: {
                measure: "Measure",
                target: "Target",
                maxi: "Maxi",
                forecast: "Forecast",
                good: "Good",
                bad: "Bad",
                tickunit: "Tickunit",
                colorScheme: "ColorScheme",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        cascadeSparkline: {
            title: "CascadeSparkline Setting",
            values: {
                pointsRange: "PointsRange",
                pointIndex: "PointIndex",
                minimum: "Minimum",
                maximum: "Maximum",
                positiveColor: "ColorPositive",
                negativeColor: "ColorNegative",
                labelsRange: "LabelsRange",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        compatibleSparkline: {
            title: "CompatibleSparkline Setting",
            values: {
                data: {
                    title: "Data",
                    dataOrientation: "DataOrientation",
                    dateAxisData: "DateAxisData",
                    dateAxisOrientation: "DateAxisOrientation",
                    displayEmptyCellAs: "DisplayEmptyCellAs",
                    showDataInHiddenRowOrColumn: "Show data in hidden rows and columns"
                },
                show: {
                    title: "Show",
                    showFirst: "Show First",
                    showLast: "Show Last",
                    showHigh: "Show High",
                    showLow: "Show Low",
                    showNegative: "Show Negative",
                    showMarkers: "Show Markers"
                },
                group: {
                    title: "Group",
                    minAxisType: "MinAxisType",
                    maxAxisType: "MaxAxisType",
                    manualMin: "ManualMin",
                    manualMax: "ManualMax",
                    rightToLeft: "RightToLeft",
                    displayXAxis: "Display XAxis"
                },
                style: {
                    title: "Style",
                    negative: "Negative",
                    markers: "Markers",
                    axis: "Axis",
                    series: "Series",
                    highMarker: "High Marker",
                    lowMarker: "Low Marker",
                    firstMarker: "First Marker",
                    lastMarker: "Last Marker",
                    lineWeight: "Line Weight"
                },
                setButton: "Set"
            }
        },
        hbarSparkline: {
            title: "HbarSparkline Setting",
            values: {
                value: "Value",
                colorScheme: "ColorScheme",
                setButton: "Set"
            }
        },
        vbarSparkline: {
            title: "VarSparkline Setting",
            values: {
                value: "Value",
                colorScheme: "ColorScheme",
                setButton: "Set"
            }
        },
        paretoSparkline: {
            title: "ParetoSparkline Setting",
            values: {
                points: "Points",
                pointIndex: "PointIndex",
                colorRange: "ColorRange",
                highlightPosition: "HighlightPosition",
                target: "Target",
                target2: "Target2",
                label: "Label",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        // pieSparkline: {
        //     title: "PieSparkline Setting",
        //     values: {
        //         percentage: "Percentage",
        //         color: "Color",
        //         setButton: "Set"
        //     }
        // },
        scatterSparkline: {
            title: "ScatterSparkline Setting",
            values: {
                points1: "Points1",
                points2: "Points2",
                minX: "MinX",
                maxX: "MaxX",
                minY: "MinY",
                maxY: "MaxY",
                hLine: "HLine",
                vLine: "VLine",
                xMinZone: "XMinZone",
                xMaxZone: "XMaxZone",
                yMinZone: "YMinZone",
                yMaxZone: "YMaxZone",
                color1: "Color1",
                color2: "Color2",
                tags: "Tags",
                drawSymbol: "Draw Symbol",
                drawLines: "Draw Lines",
                dashLine: "Dash Line",
                setButton: "Set"
            }
        },
        spreadSparkline: {
            title: "SpreadSparkline Setting",
            values: {
                points: "Points",
                scaleStart: "ScaleStart",
                scaleEnd: "ScaleEnd",
                style: "Style",
                colorScheme: "ColorScheme",
                showAverage: "Show Average",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        stackedSparkline: {
            title: "StackedSparkline Setting",
            values: {
                points: "Points",
                colorRange: "ColorRange",
                labelRange: "LabelRange",
                maximum: "Maximum",
                targetRed: "TargetRed",
                targetGreen: "TargetGreen",
                targetBlue: "TargetBlue",
                targetYellow: "TargetYellow",
                color: "Color",
                highlightPosition: "HighlightPosition",
                textOrientation: "TextOrientation",
                textSize: "TextSize",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        variSparkline: {
            title: "VariSparkline Setting",
            values: {
                variance: "Variance",
                reference: "Reference",
                mini: "Mini",
                maxi: "Maxi",
                mark: "Mark",
                tickunit: "TickUnit",
                colorPositive: "ColorPositive",
                colorNegative: "ColorNegative",
                legend: "Legend",
                vertical: "Vertical",
                setButton: "Set"
            }
        },
        monthSparkline: {
            title: "MonthSparkline Setting"
        },
        yearSparkline: {
            title: "YearSparkline Setting"
        },
        monthYear: {
            data: "Data",
            month: "Month",
            year: "Year",
            emptyColor: "Empty Color",
            startColor: "Start Color",
            middleColor: "Middle Color",
            endColor: "End Color",
            colorRange: "Color Range",
            setButton: "set"
        },
        orientation: {
            vertical: "Vertical",
            horizontal: "Horizontal"
        },
        axisType: {
            individual: "Individual",
            custom: "Custom"
        },
        emptyCellDisplayType: {
            gaps: "Gaps",
            zero: "Zero",
            connect: "Connect"
        },
        boxplotClass: {
            fiveNS: "5NS",
            sevenNS: "7NS",
            tukey: "Tukey",
            bowley: "Bowley",
            sigma: "Sigma3"
        },
        boxplotStyle: {
            classical: "Classical",
            neo: "Neo"
        },
        paretoLabel: {
            none: "None",
            single: "Single",
            cumulated: "Cumulated"
        },
        spreadStyle: {
            stacked: "Stacked",
            spread: "Spread",
            jitter: "Jitter",
            poles: "Poles",
            stackedDots: "StackedDots",
            stripe: "Stripe"
        }
    },

    chartExTab: {
            fontSize: "Font Size",
            color: "Color",
            lineColor: "Line Color",
            fontFamily: "Font Family",
            chartType: "Chart Type",
            backColor: "Background color",
            values: {
                chartArea: {
                    title: "Chart Area",
                    backColor: "Background color",
                    color: "Color",
                    fontSize: "Font Size",
                    fontFamily: "Font"
                },
                chartTitle: {
                    title: "Chart Title",
                    text: "Text",
                    chartType: "Chart Type",
                    dataRange: "Data Range"
                },
                series: {
                    title: "Series",
                    seriesIndex:'Series',
                    axisGroup: "Axis Group",
                    lineWidth:"Line Width",
                    primary:"Primary",
                    secondary:"Secondary"
                },
                legend: {
                    title: "Legend",
                    position: {
                        title: "Position",
                        values: {
                            left: "Left",
                            right: "Right",
                            top: "Top",
                            bottom: "Bottom"
                        }
                    },
                    showLegend: "Show Legend"
                },
                dataLabels: {
                    title: "Data Labels",
                    showValue: "Show Value",
                    showSeriesName: "Show Series Name",
                    showCategoryName: "Show Category Name",
                    position: {
                        title: "Position",
                        values: {

                        }
                    },
                    color: "Color"
                },
                axes: {
                    title: "Axes",
                    axisType: {
                        title: "Axis Type",
                        values: {
                            primaryCategory: "PrimaryCategory",
                            primaryValue: "PrimaryValue",
                            secondaryCategory: "SecondaryCategory",
                            secondaryValue: "SecondaryValue"
                        }
                    },
                    aixsTitle: "Title",
                    titleColor: "Title Color",
                    titleFontSize: "Title Size",
                    titleFontFamily: "Title Font",
                    showMajorGridline: "Show Major Gridline",
                    showMinorGridline: "Show Minor Gridline",
                    showAxis: "Show Axis",
                    lineColor: "Line Color",
                    lineWidth: "Line Width",
                    TickPosition: {
                        majorTitle: "Major Tick Position",
                        minorTitle: "Minor Tick Position",
                        values: {
                            cross: "Cross",
                            inside: "Inside",
                            none: "None",
                            outside: "Outside"
                        }
                    },
                    majorUnit: "Major Unit",
                    minorUnit: "Minor Unit",
                    majorGridlineWidth: "Major Gridline Width",
                    minorGridlineWidth: "Minor Gridline Width",
                    majorGridlineColor: "Major Gridline Color",
                    minorGridlineColor: "Minor Gridline Color",
                    tickLabelPosition: {
                        title: "Tick Label Position",
                        values: {
                            none: "None",
                            nextToAxis: "NextToAxis"
                        }
                    }

                }

            },
        setButton: "Set",
        combo: {
            title: "ClusteredColumn-LineChart Setting",
            value: {}
        }
    },

    slicerTab: {
        slicerStyle: {
            title: "Slicer Style",
            light: {
                light1: "light1",
                light2: "light2",
                light3: "light3",
                light5: "light5",
                light6: "light6"
            },
            dark: {
                dark1: "dark1",
                dark2: "dark2",
                dark3: "dark3",
                dark5: "dark5",
                dark6: "dark6"
            }
        },
        general: {
            title: "General",
            name: "Name",
            captionName: "Caption Name",
            itemSorting: {
                title: "Item Sorting",
                option: {
                    none: "None",
                    ascending: "Ascending",
                    descending: "Descending"
                }
            },
            displayHeader: "Display Header"
        },
        layout: {
            title: "Layout",
            columnNumber: "Column Number",
            buttonHeight: "Button Height",
            buttonWidth: "Button Width"
        },
        property: {
            title: "Property",
            moveAndSize: "Move and size with cells",
            moveAndNoSize: "Move and don't size with cells",
            noMoveAndSize: "Don't move and size with cells",
            locked: "Locked"
        }
    },
    colorPicker: {
        themeColors: "Theme Colors",
        standardColors: "Standard Colors",
        noFills: "No Fills"
    },
    conditionalFormat: {
        setButton: "Set",
        ruleTypes: {
            title: "Type",
            highlightCells: {
                title: "Highlight Cells Rules",
                values: {
                    cellValue: "Cell Value",
                    specificText: "Specific Text",
                    dateOccurring: "Date Occurring",
                    unique: "Unique",
                    duplicate: "Duplicate"
                }
            },
            topBottom: {
                title: "Top/Bottom Rules",
                values: {
                    top10: "Top10",
                    average: "Average"
                }
            },
            dataBars: {
                title: "Data Bars",
                labels: {
                    minimum: "Minimum",
                    maximum: "Maximum",
                    type: "Type",
                    value: "Value",
                    appearance: "Appearance",
                    showBarOnly: "Show Bar Only",
                    useGradient: "Use Gradien",
                    showBorder: "Show Border",
                    barDirection: "Bar Direction",
                    negativeFillColor: "Negative Color",
                    negativeBorderColor: "Negative Border",
                    axis: "Axis",
                    axisPosition: "Position",
                    axisColor: "Color"
                },
                valueTypes: {
                    number: "Number",
                    lowestValue: "LowestValue",
                    highestValue: "HighestValue",
                    percent: "Percent",
                    percentile: "Percentile",
                    automin: "Automin",
                    automax: "Automax",
                    formula: "Formula"
                },
                directions: {
                    leftToRight: "Left-to-Right",
                    rightToLeft: "Right-to-Left"
                },
                axisPositions: {
                    automatic: "Automatic",
                    cellMidPoint: "CellMidPoint",
                    none: "None"
                }
            },
            colorScales: {
                title: "Color Scales",
                labels: {
                    minimum: "Minimum",
                    midpoint: "Midpoint",
                    maximum: "Maximum",
                    type: "Type",
                    value: "Value",
                    color: "Color"
                },
                values: {
                    twoColors: "2-Color Scale",
                    threeColors: "3-Color Scale"
                },
                valueTypes: {
                    number: "Number",
                    lowestValue: "LowestValue",
                    highestValue: "HighestValue",
                    percent: "Percent",
                    percentile: "Percentile",
                    formula: "Formula"
                }
            },
            iconSets: {
                title: "Icon Sets",
                labels: {
                    style: "Style",
                    showIconOnly: "Show Icon Only",
                    reverseIconOrder: "Reverse Icon Order",

                },
                types: {
                    threeArrowsColored: "ThreeArrowsColored",
                    threeArrowsGray: "ThreeArrowsGray",
                    threeTriangles: "ThreeTriangles",
                    threeStars: "ThreeStars",
                    threeFlags: "ThreeFlags",
                    threeTrafficLightsUnrimmed: "ThreeTrafficLightsUnrimmed",
                    threeTrafficLightsRimmed: "ThreeTrafficLightsRimmed",
                    threeSigns: "ThreeSigns",
                    threeSymbolsCircled: "ThreeSymbolsCircled",
                    threeSymbolsUncircled: "ThreeSymbolsUncircled",
                    fourArrowsColored: "FourArrowsColored",
                    fourArrowsGray: "FourArrowsGray",
                    fourRedToBlack: "FourRedToBlack",
                    fourRatings: "FourRatings",
                    fourTrafficLights: "FourTrafficLights",
                    fiveArrowsColored: "FiveArrowsColored",
                    fiveArrowsGray: "FiveArrowsGray",
                    fiveRatings: "FiveRatings",
                    fiveQuarters: "FiveQuarters",
                    fiveBoxes: "FiveBoxes"
                },
                valueTypes: {
                    number: "Number",
                    percent: "Percent",
                    percentile: "Percentile",
                    formula: "Formula"
                }
            },
            removeConditionalFormat: {
                title: "None"
            }
        },
        operators: {
            cellValue: {
                types: {
                    equalsTo: "EqualsTo",
                    notEqualsTo: "NotEqualsTo",
                    greaterThan: "GreaterThan",
                    greaterThanOrEqualsTo: "GreaterThanOrEqualsTo",
                    lessThan: "LessThan",
                    lessThanOrEqualsTo: "LessThanOrEqualsTo",
                    between: "Between",
                    notBetween: "NotBetween"
                }
            },
            specificText: {
                types: {
                    contains: "Contains",
                    doesNotContain: "DoesNotContain",
                    beginsWith: "BeginsWith",
                    endsWith: "EndsWith"
                }
            },
            dateOccurring: {
                types: {
                    today: "Today",
                    yesterday: "Yesterday",
                    tomorrow: "Tomorrow",
                    last7Days: "Last7Days",
                    thisMonth: "ThisMonth",
                    lastMonth: "LastMonth",
                    nextMonth: "NextMonth",
                    thisWeek: "ThisWeek",
                    lastWeek: "LastWeek",
                    nextWeek: "NextWeek"
                }
            },
            top10: {
                types: {
                    top: "Top",
                    bottom: "Bottom"
                }
            },
            average: {
                types: {
                    above: "Above",
                    below: "Below",
                    equalOrAbove: "EqualOrAbove",
                    equalOrBelow: "EqualOrBelow",
                    above1StdDev: "Above1StdDev",
                    below1StdDev: "Below1StdDev",
                    above2StdDev: "Above2StdDev",
                    below2StdDev: "Below2StdDev",
                    above3StdDev: "Above3StdDev",
                    below3StdDev: "Below3StdDev"
                }
            }
        },
        texts: {
            cells: "Format only cells with:",
            rankIn: "Format values that rank in the:",
            inRange: "values in the selected range.",
            values: "Format values that are:",
            average: "the average for selected range.",
            allValuesBased: "Format all cells based on their values:",
            all: "Format all:",
            and: "and",
            formatStyle: "use style",
            showIconWithRules: "Display each icon according to these rules:"
        },
        formatSetting: {
            formatUseBackColor: "BackColor",
            formatUseForeColor: "ForeColor",
            formatUseBorder: "Border"
        }
    },
    cellTypes: {
        title: "Cell Types",
        buttonCellType: {
            title: "ButtonCellType",
            values: {
                marginTop: "Margin-Top",
                marginRight: "Margin-Right",
                marginBottom: "Margin-Bottom",
                marginLeft: "Margin-Left",
                text: "Text",
                backColor: "BackColor"
            }
        },
        checkBoxCellType: {
            title: "CheckBoxCellType",
            values: {
                caption: "Caption",
                textTrue: "TextTrue",
                textIndeterminate: "TextIndeterminate",
                textFalse: "TextFalse",
                textAlign: {
                    title: "TextAlign",
                    values: {
                        top: "Top",
                        bottom: "Bottom",
                        left: "Left",
                        right: "Right"
                    }
                },
                isThreeState: "IsThreeState"
            }
        },
        comboBoxCellType: {
            title: "ComboBoxCellType",
            values: {
                editorValueType: {
                    title: "EditorValueType",
                    values: {
                        text: "Text",
                        index: "Index",
                        value: "Value"
                    }
                },
                itemsText: "Items Text",
                itemsValue: "Items Value"
            }
        },
        hyperlinkCellType: {
            title: "HyperlinkCellType",
            values: {
                linkColor: "LinkColor",
                visitedLinkColor: "VisitedLinkColor",
                text: "Text",
                linkToolTip: "LinkToolTip"
            }
        },
        clearCellType: {
            title: "None"
        },
        setButton: "Set"
    },
    sparklineDialog: {
        title: "SparklineEx Setting",
        sparklineExType: {
            title: "Type",
            values: {
                line: "Line",
                column: "Column",
                winLoss: "Win/Loss",
                pie: "Pie",
                area: "Area",
                scatter: "Scatter",
                spread: "Spread",
                stacked: "Stacked",
                bullet: "Bullet",
                hbar: "Hbar",
                vbar: "Vbar",
                variance: "Variance",
                boxplot: "BoxPlot",
                cascade: "Cascade",
                pareto: "Pareto",
                month: "Month",
                year: "Year"
            }
        },
        lineSparkline: {
            dataRange: "Data Range",
            locationRange: "Location Range",
            dataRangeError: "Data range is invalid!",
            singleDataRange: "Data range should be in a single row or column.",
            locationRangeError: "Location range is invalid!"
        },
        bulletSparkline: {
            measure: "Measure",
            target: "Target",
            maxi: "Maxi",
            forecast: "Forecast",
            good: "Good",
            bad: "Bad",
            tickunit: "Tickunit",
            colorScheme: "ColorScheme",
            vertical: "Vertical"
        },
        hbarSparkline: {
            value: "Value",
            colorScheme: "ColorScheme"
        },
        varianceSparkline: {
            variance: "Variance",
            reference: "Reference",
            mini: "Mini",
            maxi: "Maxi",
            mark: "Mark",
            tickunit: "TickUnit",
            colorPositive: "ColorPositive",
            colorNegative: "ColorNegative",
            legend: "Legend",
            vertical: "Vertical"
        },
        monthSparkline: {
            year: "Year",
            month: "Month",
            emptyColor: "Empty Color",
            startColor: "Start Color",
            middleColor: "Middle Color",
            endColor: "End Color",
            colorRange: "Color Range"
        },
        yearSparkline: {
            year: "Year",
            emptyColor: "Empty Color",
            startColor: "Start Color",
            middleColor: "Middle Color",
            endColor: "End Color",
            colorRange: "Color Range"
        }
    },
    chartDialog: {
        title: "chartEx Setting",
        chartExType: {
            title: "Type",
            values: {
                columnClustered: "Clustered Column",
                columnStacked: "Stacked Column",
                columnStacked100: "100% Stacked Column",
                line: "Line",
                lineStacked: "Stacked Line",
                lineStacked100: "100% Stacked Line",
                lineMarkers: "Line With Markers",
                lineMarkersStacked: "Stacked Line With Markers",
                lineMarkersStacked100: "100% Stacked Line With Markers",
                pie: "Pie",
                doughnut: "Doughnut",
                barClustered: "Clustered Bar",
                barStacked: "Stacked Bar",
                barStacked100: "100% Stacked Bar",
                area: "Area",
                areaStacked: "Stacked Area",
                areaStacked100: "100% Stacked Area",
                xyScatter: "Scatter",
                xyScatterSmooth: "Scatter with Smooth Lines and Markers",
                xyScatterSmoothNoMarkers: "Scatter with Smooth Lines",
                xyScatterLines: "Scatter with Straight Lines and Markers",
                xyScatterLinesNoMarkers: "Scatter with Straight Lines",
                bubble: "Bubble",
                stockHLC: "High-Low-Close",
                stockOHLC: "Open-High-Low-Close",
                stockVHLC: "Volumn-High-Low-Close-Stock",
                stockVOHLC: "Volumn-Open-High-Low-Close-Stock",
                combo: "Clustered Column-Line"
            }
        }
    },
    slicerDialog: {
        insertSlicer: "Insert Slicer"
    },
    passwordDialog: {
        title: "Password",
        error: "Incorrect Password!"
    },
    tooltips: {
        style: {
            fontBold: "Mark text bold.",
            fontItalic: "Mark text italic",
            fontUnderline: "Underline text.",
            fontOverline: "Overline text.",
            fontLinethrough: "Strikethrough text."
        },
        alignment: {
            leftAlign: "Align text to the left.",
            centerAlign: "Center text.",
            rightAlign: "Align text to the right.",
            topAlign: "Align text to the top.",
            middleAlign: "Align text to the middle.",
            bottomAlign: "Align text to the bottom.",
            decreaseIndent: "Decrease the indent level.",
            increaseIndent: "Increase the indent level."
        },
        border: {
            outsideBorder: "Outside Border",
            insideBorder: "Inside Border",
            allBorder: "All Border",
            leftBorder: "Left Border",
            innerVertical: "Inner Vertical",
            rightBorder: "Right Border",
            topBorder: "Top Border",
            innerHorizontal: "Inner Horizontal",
            bottomBorder: "Bottom Border"
        },
        format: {
            percentStyle: "Percent Style",
            commaStyle: "Comma Style",
            increaseDecimal: "Increase Decimal",
            decreaseDecimal: "Decrease Decimal"
        }
    },
    defaultTexts: {
        buttonText: "Button",
        checkCaption: "Check",
        comboText: "United States,China,Japan",
        comboValue: "US,CN,JP",
        hyperlinkText: "LinkText",
        hyperlinkToolTip: "Hyperlink Tooltip"
    },
    messages: {
        invalidImportFile: "Invalid file, import failed.",
        duplicatedSheetName: "Duplicated sheet name.",
        duplicatedTableName: "Duplicated table name.",
        rowColumnRangeRequired: "Please select a range of row or column.",
        imageFileRequired: "The file must be image!",
        duplicatedSlicerName: "Duplicated slicer name.",
        invalidSlicerName: "Slicer name is not valid."
    },
    dialog: {
        ok: "OK",
        cancel: "Cancel"
    },
    chartDataLabels:{
        center:'Center',
        insideEnd:'Inside End',
        outsideEnd:'Outside End',
        bestFit:'Best Fit',
        above:'Above',
        below:'Below',
    }
};

