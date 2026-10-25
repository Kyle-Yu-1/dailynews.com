## 📎 原始课件
- [Module 7 页面](https://canvas.polyu.edu.hk/courses/4018/modules/items/19642) · 视频 [2189-IRmcys](https://www.youtube.com/watch?v=2189-IRmcys) + [b_-KBprO7JQ](https://www.youtube.com/watch?v=b_-KBprO7JQ) + [yNhQ5_vkb1U](https://www.youtube.com/watch?v=yNhQ5_vkb1U) · [字幕稿](files/eie1005/aida/M7a-excel-basics.txt) 等 3 份

# EIE1005 · AIDA 模块 7 · Excel 入门（IT 素养）

## ⏱ 30 秒速览
一句话：Excel = 电子表格软件，三大数据类型（数值/文本/逻辑），核心操作 = 格式、冻结窗格、查找替换，常用函数记住 **IF / VLOOKUP / COUNT / SUM / RANK** 即可。
三条结论：① 数据类型默认对齐：**数值右对齐、文本左对齐、逻辑居中**；② 行列调整三种方法：**拖动 / 双击自适应 / 右键设值**；③ VLOOKUP 四参数 = 查找值、范围、列号、精确/近似。
关键词：spreadsheet, wrap text, freeze panes, Ctrl+F, IF, VLOOKUP, SUMIF, RANK。

## 一、基础操作
- 界面：快速访问工具栏、功能区（Ribbon）、工作表。
- 输入：选中单元格→输入→Enter/Tab 切换。
- **自动换行 wrap text**：Home→Wrap Text；或右键 Format Cells→Alignment→Wrap Text。
- 单元格格式：右键 Format Cells→Number 选项卡；边框：工具栏边框菜单，或 Format Cells→Border。
- 行高/列宽：① 拖动表头交界（双箭头）；② 双击交界自动适配；③ 右键 Row Height / Column Width 输入数值。
- **冻结窗格 Freeze Panes**：View→Freeze First Row / Freeze First Column；取消 = Unfreeze。
- 隐藏行/列：右键 Hide / Unhide。
- 查找替换：**Ctrl+F**（文本、数字、公式均可替换）。
- 文件保护：设置密码加密。

## 二、常用函数速查（必背表）
| 函数 | 作用 | 备注 |
|---|---|---|
| **IF** | 条件判断 | =IF(条件,真值,假值)，如 78→"good" |
| **MID(text,start,len)** | 从文本中间取子串 | 起点+长度 |
| **LEFT / RIGHT** | 从左/右取 n 个字符 | 第二参数=字符数 |
| **TEXT** | 把值转成指定格式 | 如日期→年份 |
| **VLOOKUP(值,范围,列号,精确/近似)** | 按匹配查找 | 四参数必记 |
| **COUNT / COUNTA?** | 数数值单元格 | COUNT 只数数值 |
| **COUNTIF(范围,条件)** | 按条件计数 | 如数"more"文本 |
| **SUM / SUMIF** | 求和 / 条件求和 | SUMIF 如日销量≥500 |
| **MAX / MIN** | 最大 / 最小值 | |
| **STDEV** | 标准差 | |
| **AVERAGE** | 平均值 | |
| **RANK(值,范围,序)** | 排名（范围要绝对引用） | 同分：**RANK.AVG 取平均（5.5），RANK.EQ 取最高（5）** |
| **FREQUENCY(数据,区间)** | 频数分布 | 分析成绩分布 |

## 🎯 考点
- 三种数据类型的默认对齐；冻结窗格路径；Ctrl+F；VLOOKUP 四参数；RANK.AVG vs RANK.EQ；SUMIF/COUNTIF 的"条件"概念。

## 自测
1. 数值/文本/逻辑的默认对齐方式？
2. VLOOKUP 的四个参数？
3. 两人同分 70 并列第 5、6 名，RANK.AVG 与 RANK.EQ 各返回什么？
答案：1 右/左/居中 2 查找值、查找范围、返回列号、精确或近似匹配 3 RANK.AVG=5.5；RANK.EQ=5。
