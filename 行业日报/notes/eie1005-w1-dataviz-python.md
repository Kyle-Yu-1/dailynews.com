# EIE1005 · Workshop 1 数据可视化全讲（零基础 → WS01(B) 进阶 · 合并版）

> 📖 合并说明：原「06 Python Project Folder 逐行讲解」与「Workshop 01 (B) To Insight」两篇笔记已合并为一篇，并按阿基米德提问法重排成一条连贯学习路径——**§零 从零开始（最小 5 行 + 三个概念 + 环境）→ §一~九 任务 / 选型 / 骨架 / 四种图 / 美化进阶 → 附录 A 22 例分组速查**。逐文件 / 逐页原文仍在 `files/` 目录，本页只讲结构与精要。

## 📎 原始课件
- **06 Python Project Folder**（22 个示例 `.py` + 3 个 Excel）：
  - 原始压缩包：`行业日报/files/eie1005/EIE1005-DataViz-06-Python-Project-Folder-Student.zip`
  - 逐文件原文（全部 `.py` 完整代码）：`行业日报/files/eie1005/dataviz06-python-project-原文.txt`
  - 数据：`EIE1005_Part01_Data.xlsx`（sheet `Price`：Year / Apple Price / Orange Price）、`EIE1005_Part01_Workshop01_Data.xlsx`（Department / Sector / Range）、`EIE1005_Part02_Workshop02_Data.xlsx`（Level / Age / Major / Gender）
- **Workshop 01 (B)「To Insight」**：
  - 逐页原文（7 页）：`行业日报/files/eie1005/eie1005-ws01b-insight-原文.txt`
  - Canvas 原版 PDF：https://canvas.polyu.edu.hk/courses/4018/files/130047
  - 数据：USA College Graduate Salary 2025 Projection（Table 01–04，Excel 已提供）

## ⏱ 30 秒速览

> 连环追问：是什么 → 为什么 → 怎么学 → 有什么用。

**① 这是什么？**
一句话：**Workshop 1 数据可视化的完整教程**——从「只会 print」教到「能交一份符合专业标准的 WS01(B) 图表作业」。

**② 为什么学？**
这门课的目标是「把数据变成图、把图讲成故事」；Matplotlib 是 Python 画图的事实标准。WS01(B) 不只考"会不会画"，更考"是否按专业标准自查"。

**③ 怎么学最省力？——按顺序走，别跳步**
1. **§零**：先跑通最小 5 行，记住 Figure（画布）/ Axes（坐标区）/ Artist（元素）三个概念。
2. **§一~三**：看 WS01(B) 任务与四问，掌握"读数据 → 建图 → 画图"骨架。
3. **§三~四**：四种必考图完整代码 + 背景 / 柱状图 / 渐变着色 / 颜色条等进阶。
4. **§五~九**：主题美化、预处理、完整示例、交互式图。
5. **附录 A**：用 22 个官方示例把上面知识点串起来练一遍。

**④ 学完能干什么？**
交出「选型正确 + 标签齐全 + 数值着色 + 颜色条 + 自定义背景 + 结论标注」的高分 WS01(B) `.py`，并逐项过掉 P7 的四类专业检查清单。

**三条结论（闭卷能复述才算记住）**
1. 四问定框架：Q1 图数、Q2 故事、Q3 类型、Q4 样式。
2. 画图 = 读数据（pandas）→ 建画布（Figure）→ 划格子（GridSpec）→ 画（plot/bar/pie）→ 保存。
3. 颜色三件套 `colormap + Normalize + ScalarMappable` 是「按数值着色 + 颜色条」的通用套路。

**关键词**：Figure、Axes、Artist、GridSpec、DataFrame、kind、colormap、Normalize、colorbar、facecolor、bar_label、twinx、subplot_mosaic、savefig。

## 前置 / 后接
- 前置：Python 基础（变量、列表、函数调用）；L1「数据分析五步、数据表示」。
- 后接：Test 1（覆盖 L1+L2+W1）；EIE1005 三次 Workshop 总览与报告高分清单。

---

## 零、从零开始（先跑通一张图，再谈美化）

### 0.1 一张图的最小 5 行

```python
import matplotlib.pyplot as plt            # ① 引入画图工具箱
plt.plot([1, 2, 3, 4], [1, 4, 9, 16])      # ② 画折线：两组等长的数
plt.title('My First Chart')                # ③ 标题
plt.xlabel('x'); plt.ylabel('y')           # ④ 横/纵轴标签
plt.show()                                 # ⑤ 显示出来
```

> 📖 译注 · 逐行：
> - ① 每个脚本第一句：`import matplotlib.pyplot as plt`，给画图库起短名 `plt`。
> - ② `plt.plot(横坐标列表, 纵坐标列表)`：把 (1,1)、(2,4)、(3,9)、(4,16) 四个点连成线。两个列表**长度必须相等**。
> - ③④ 标题与轴标签，全是可选装饰，没有也能画。
> - ⑤ `plt.show()` 弹窗显示；在 VS Code 里右键「Run Python File」就能看到。

### 0.2 三个核心概念（先记住，后面全靠它们）

```
Figure（画布）：一整张纸
 └─ Axes（坐标区）：纸上的一块绘图区（一张纸可贴多块）
     ├─ Line2D（线）、Patch（柱/扇形）…… 统称 Artist
     └─ Text（标题/标签）、XAxis / YAxis（坐标轴）
```

> 📖 译注：
> - **Figure = 整张画布**，`plt.figure()` 创建；一张画布可装多张子图。
> - **Axes = 一个坐标系**（一张小图），画图、标题、坐标都挂在它身上；`ax.plot / ax.set_title`。
> - **Artist = 一切可见元素**（线、柱、文字、图例）。它们都有 `set_xxx` 方法（见 §3.6 写法②）。
> - 两种 API：`plt.plot(...)`（状态机式，单图最快）与 `ax.plot(...)`（对象式，多图清晰）。前者内部也是先拿到"当前 Axes"再画。

### 0.3 怎么运行代码

- **VS Code**：打开项目文件夹 → 右键 `.py` → Run Python File；图会弹窗。
- **Anaconda Prompt**：`python 文件名.py`。
- 坑：图一闪就关 → 结尾保留 `plt.show()`；文件找不到 → 用「Open Folder」打开项目根目录再运行（见 §零.4 报错表）。

### 0.4 环境速查（精简自 W1 篇）

```bash
# Anaconda 路线：建环境 → 激活 → 补 openpyxl
conda create --name py_01 anaconda
conda activate py_01
pip install openpyxl

# 最小化路线：只装本课所需
pip install pandas matplotlib openpyxl
```

| 库 | 用途 | 导入写法 |
|---|---|---|
| NumPy | 数值计算、数组 | `import numpy as np` |
| Pandas | 数据清洗、DataFrame | `import pandas as pd` |
| Matplotlib | 静态 2D 画图 | `import matplotlib.pyplot as plt` |
| Plotly | 交互式网页图 | `import plotly.express as px` |

**常见报错速查**：

| 报错 | 原因 | 解决 |
|---|---|---|
| `ModuleNotFoundError: ... 'pandas'` | 没装或解释器选错 | `pip install pandas`；VS Code 右下角切解释器 |
| `Missing optional dependency 'openpyxl'` | 缺 openpyxl | `pip install openpyxl` |
| `FileNotFoundError: '....xlsx'` | 运行目录不对 | VS Code「Open Folder」打开项目根目录 |
| `'python' 不是内部或外部命令` | 未加 PATH | 用 Anaconda Prompt |
| 图一闪就关 | 直接跑脚本不阻塞 | 保留 `plt.show()` |

### 0.5 pandas 与 matplotlib 的分工

> 📖 译注：**pandas 管数据、matplotlib 管画图**。`df.plot(...)` 是 pandas 对 matplotlib 的封装——它先帮你从 DataFrame 取好列，再调 matplotlib 画。所以：
> - `df.plot(kind='bar', ...)` ✅（kind 是 pandas 参数）
> - `ax.plot(kind='pie')` ❌（kind 不是 matplotlib 参数，会报 TypeError）
> 完整对比见 §3.6.4。

---

## 一、任务与专业检查清单（课件 P1–P7 原文保留）

### 1.1 任务（P2–P6）
- 主题（P2）：**I want to Understand —— USA College Graduate Salary: 2025 Projection, Are You Ready?**
- 数据（P3–P5）：From Data → To Insight，Table 01–04；P5 写明 Excel 已提供（Already Provided Excel File for You）。
- 要求（P6）：Please Design Your Workshop 01 (B)，限时 60 分钟，Submit Your Work by PolyU Blackboard。

> 📖 译注（P3–P4）：Table 01–04 的数据表是图片、PDF 无文字层，数值一律以提供的 Excel 为准。

### 1.2 第 7 页：Pre-submission Checklist（逐条原文）

**Chart Layout（四问）**

| 问 | 内容 |
|---|---|
| Q1 | How many charts to display? 1 / 2 / 3 / 4 Chart |
| Q2 | What story does this data set tell? |
| Q3 | What Type of Chart? Line / Area / Bar / Pie |
| Q4 | What Kind of Style? Title / Label / Legend / Grid Line / Color |

**1. Data Accuracy & Integrity（数据准确与完整）**
- [ ] Source Consistency：数据是否与 2023 PolyU SAO 数据集一致？

**2. Chart Formatting & Labels（格式与标签）**
- [ ] Descriptive Titles：每张图顶部是否有清晰加粗标题？
- [ ] Axis Labels：X、Y 轴是否都带单位标签？
- [ ] Legend Clarity：图例是否可见且准确？
- [ ] Scale & Intervals：轴刻度是否合理易读？

**3. Visual Presentation & Layout（视觉呈现与布局）**
- [ ] Consistency：不同图中同类目是否用同一颜色？
- [ ] Readability：柱状图左轴的 Department 名称是否完整显示、不被裁掉？
- [ ] Alignment：三张图是否对齐整齐、留白均匀？
- [ ] No Overlaps：数据标签 / 文本框是否不与线、柱重叠？

**4. Final Verification（最终核验）**
- [ ] File Naming：`EIE1005_StudentID_Workshop_01_B.py`

> 🔴 考点（源自第 7 页）：四类清单 = 四个评分维度。「同类目同色」「系名不被裁」「标签不重叠」三条最容易丢分。

### 1.3 四问 → 代码映射表

| 问 | 决定什么 | 对应代码 |
|---|---|---|
| Q1 几张图 | 画布布局 | `GridSpec(行,列)` + `fig.add_subplot(gs[r,c])` |
| Q2 什么故事 | 选哪些列 / 表 | `df['表名']['列名']` |
| Q3 什么类型 | 画图 API | `plot / fill_between / bar、barh / pie` |
| Q4 什么样式 | 装饰 | `set_title… / legend / grid / color / facecolor` |

---

### 1.4 检查清单逐条拆解（怎么满足 + 坑）

| 条目 | 含义 | 代码实现 | 常见坑 |
|---|---|---|---|
| Source Consistency | 数值与 2023 PolyU SAO 数据一致 | 只用提供的 Excel，不手输、不换源 | 另找网图数据，数值对不上 |
| Descriptive Titles | 每图顶部清晰**加粗**标题 | `ax.set_title(..., fontweight='bold')` | 忘 bold，标题太淡 |
| Axis Labels | X / Y 轴都带单位 | `set_xlabel('Year')`、`set_ylabel('Salary (USD)')` | 只写名称不写单位 |
| Legend Clarity | 图例可见且准确 | `ax.legend(loc='best')`，多线必须设 `label` | 多线无图例分不清 |
| Scale & Intervals | 刻度合理易读 | `set_ylim` / `set_xticks` 控制跨度 | 不从 0 开始被质疑夸大（见译注） |
| Consistency 同类同色 | 跨图同类目同一颜色 | 预定义 `color_map = {'Engineering': '#1f77b4', ...}` | 每张图随手换色 |
| Readability 系名不裁 | 柱状图左轴系名完整 | `barh()` 或 `tight_layout()` | 竖柱长名被裁 |
| Alignment 三图对齐 | 三图整齐、留白均匀 | `GridSpec` + `subplots_adjust(wspace, hspace)` | 手工摆放导致漂移 |
| No Overlaps | 标签不压线 / 柱 | `bar_label(padding=)` + 放大 `ylim` | annotate 文字压线 |
| File Naming | 命名规范 | `EIE1005_StudentID_Workshop_01_B.py` | 大小写 / 下划线写错 |

> 📖 译注（Scale 两难）：柱状图的高度代表量，**应从 0 开始**才不误导；但差距小时从 0 又看不出区别。考试按「合理易读」处理——柱状图保留 0 基线，折线图可放大局部但需注明截断。

---

## 二、先选对图，再画好图（图表选型决策 · 综合参考）

> 🧠 拓展（用户提供参考，检索于 2026-09-23）：课件 Q3 只给四种类型（Line/Area/Bar/Pie），但真正的选型按「**比较 / 构成 / 分布与联系**」四类场景走。原则是「场景驱动」而非「工具驱动」。

### 2.1 四步选型流程

| 步骤 | 操作 | 关键问题 |
|---|---|---|
| 1 | 明确分析目标 | 看趋势 / 对比 / 占比 / 分布 / 关联？ |
| 2 | 梳理数据结构 | 有多少类别？连续时间还是离散分类？ |
| 3 | 匹配图表形式 | 哪种形式最直观？ |
| 4 | 检查量级与空间 | 条目太多 / 页面放不下时换横向或分组 |

### 2.2 高频图表速查表（15+ 种 · 要点与坑合并版）

**比较类（比大小、比多少）**

| 图 | 适用场景 | 要点 | Matplotlib 实现 | 坑 |
|---|---|---|---|---|
| 折线图 | 看趋势 | 时间点 >20 时缩小 marker、加粗线 | `ax.plot(..., marker='o', linewidth=2)` | 点密成「蜘蛛网」 |
| 面积图 | 趋势 + 总量感 | 每层加 `alpha`、顺序合理 | `fill_between` + `plot` | 上层盖下层 |
| 柱状图 | 5–12 条对比 | 柱宽适中、间距别太空；数值标柱顶 | `ax.bar(x, y)` + `bar_label` | 条多挤成梳子 |
| 条形图 | 条目 >12 | 横过来不挤；先排序再画 | `ax.barh(y, width)` | 不排序难找最大 |
| 南丁格尔玫瑰图 | 数值差距小时放大差异 | 扇形面积 ∝ 半径² | 极坐标 `ax.bar(theta, r)` | 差距大时小值被压没 |
| 双向条形图 | 正反 / 收支对比 | 中心轴为界分左右 | 两组 `barh`，一组取负值 | 正负轴刻度不对称 |
| 子弹图 | 实际 vs 目标 vs 预警区间 | 一眼看达标情况 | 堆积 `barh` + 标线模拟 | 无原生、需模拟 |
| 雷达图 | 多维评估（≤8 维） | 面积越大综合越强 | 极坐标多边形 | 维度多图形乱 |

**构成类（部分与整体）**

| 图 | 适用场景 | 要点 | Matplotlib 实现 | 坑 |
|---|---|---|---|---|
| 饼图 | 5–9 类占比 | 小类合并 Other；**别加 3D** | `ax.pie(..., autopct=)` | 3D 饼图误判面积 |
| 环形图 | 占比 + 中心放标题 | 空心空间利用率高 | `wedgeprops=dict(width=0.4)` | 与饼图混用无意义 |
| 旭日图 | 大区→城市→门店多层构成 | 层层下钻 | Plotly `sunburst` 或嵌套 `pie` | 无原生 |
| 堆叠面积图 | 连续时间的构成变化 | ≤5 层；重要放最底层 | `ax.stackplot(x, y1, y2)` | 层多分不清 |
| 堆叠柱状图 | 离散分类的构成 | 每柱=一年，内部堆叠 | `ax.bar(..., bottom=)` | 连续时间误用 |
| 瀑布图 | 增减过程（净利 100→70） | 正负用不同颜色 | 手动 `bottom=cumsum` | 无原生 |

**分布与联系类（找规律、找关系）**

| 图 | 适用场景 | 要点 | Matplotlib 实现 | 坑 |
|---|---|---|---|---|
| 散点图 | 两个变量的关系 | 加均值线分四象限 | `ax.scatter(x, y)` | 点数多糊成团 |
| 气泡图 | 三个变量（第三维=大小） | 气泡大=体量大 | `ax.scatter(x, y, s=size)` | 缺尺寸图例 |
| 热力图 | 区域密度分布 | 蓝→红单色渐变，别用彩虹 | `ax.imshow(z, cmap=)` | 彩虹色刺眼 |
| 箱线图 | 分布与离群点 | 中位数 / 四分位 / 异常值 | `ax.boxplot(data)` | 与均值混淆 |

> 📖 译注：每张图的**完整可运行代码**见 §2.6（12 种）；四种必考图（Line/Area/Bar/Barh/Pie）的完整代码见 §3.5。

### 2.3 常见选型误区（避雷）

| 误区 | 正确做法 |
|---|---|
| 趋势用饼图 | 折线 / 面积图 |
| 类别太多仍用饼图 | 条形图，或小类合并成 Other |
| 3D 饼图（倾斜误判面积） | 平面饼图 / 环形图 |
| 彩虹配色 | ≤3–5 色，同类用深浅区分 |
| 一页堆满图 | 一页 ≤3 张主图，核心信息放大 |

### 2.4 配色与信息层次原则

> 🧠 拓展（用户提供参考，检索于 2026-09-23）：美感 70% 靠规范、30% 靠审美。

- **配色 ≤3–5 色**：主色（正常数据，蓝/绿）+ 辅助色（灰/浅蓝）+ 警示色（红/橙，只给异常）。
- **同类深浅**：同一色系的深浅变化区分层次，比多色更易读（如 `cmap='Blues'`）。
- **色盲友好**：避免纯红 vs 纯绿强对比，可换蓝 vs 橙。
- **信息分三层**：
  | 层级 | 内容 | 视觉处理 |
  |---|---|---|
  | 核心信息 | 关键结论/指标 | 高对比色 + 加粗 + 居中 |
  | 支撑数据 | 趋势、分布、细节 | 灰色系、弱化 |
  | 辅助元素 | 标题、图例、单位、来源 | 角落、小字 |
- **排版**：倒金字塔（最重要在上方/中心）；对齐 + 均匀留白；标签简明；字体字号统一（标题 16、正文 12–14）。

### 2.5 让图「讲出结论」（洞察力）

- 用 `annotate` 标记异常点 / 转折点 + 一句文字（如「3 月新品上线，销量暴涨」）。
- 加趋势线 / 均值线：`ax.axhline(mean, linestyle='--')`。
- 图下加一句结论：「本月同比增长 30%，主要受新品拉动」——老板不用猜。
- 对比拆分：今年 vs 去年用双折线或分组柱；分面 `subplots` 看各部门贡献。

> 🌐 来源：用户提供的参考 4（[15 个可视化图表](https://www.cnblogs.com/fanruan/p/19955941)）与参考 5（[可视化设计与配置技巧](https://www.finebi.com/blog/article/68d52cf428946ecca8ed5264)，含商业推广内容），检索于 2026-09-23；代码实现以 Matplotlib 官方文档为准。

---

### 2.6 扩展图 · 完整可运行代码速查（逐条）

> 🧠 拓展（自主补充，2026-09-24）：上面每种图只给了 API 名字，这里补「六要素齐全」的完整代码（import / 数据 / 建图 / 画图 / 样式 / 显示）。共用数据见开头，每段可独立复制运行。

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.arange(5)                       # 0,1,2,3,4
v1 = [10, 18, 12, 22, 16]              # 系列 1
v2 = [4, 6, 8, 5, 9]                   # 系列 2
names = ['Eng', 'Bus', 'Sci', 'Arts', 'Med']
```

**① 环形图（Donut）**

```python
fig, ax = plt.subplots()
ax.pie(v1, labels=names, autopct='%1.1f%%', startangle=90,
       wedgeprops=dict(width=0.4))        # width<1 挖空中心 → 环形
ax.set_title('Donut Chart')
plt.show()
```

**② 堆叠面积图（Stackplot）**

```python
fig, ax = plt.subplots()
ax.stackplot(x, v1, v2, labels=['A', 'B'], alpha=0.7)   # 两层累加
ax.legend(loc='upper left')
ax.set_title('Stacked Area')
plt.show()
```

**③ 堆叠柱状图（Stacked Bar）**

```python
fig, ax = plt.subplots()
ax.bar(x, v1, label='A')
ax.bar(x, v2, bottom=v1, label='B')        # bottom=垫在 v1 之上
ax.legend()
ax.set_title('Stacked Bar')
plt.show()
```

**④ 散点图（Scatter，第三维=颜色）**

```python
fig, ax = plt.subplots()
sc = ax.scatter(x, v1, s=60, c=v2, cmap='viridis')   # s 点大小；c 数值→渐变着色
fig.colorbar(sc, ax=ax, label='V2')                  # 散点自带 mappable，直接给 colorbar
ax.set_title('Scatter + Colormap')
plt.show()
```

**⑤ 气泡图（Bubble，第三维=大小）**

```python
fig, ax = plt.subplots()
ax.scatter(x, v1, s=np.array(v2) * 30, alpha=0.6)    # s 与 v2 成正比
ax.set_title('Bubble Chart')
plt.show()
```

**⑥ 热力图（Heatmap）**

```python
fig, ax = plt.subplots()
z = np.random.rand(5, 5)                     # 5x5 随机矩阵（真实数据用 df.corr() 等）
im = ax.imshow(z, cmap='Blues')              # 单色渐变，别用彩虹
fig.colorbar(im, ax=ax)
ax.set_title('Heatmap')
plt.show()
```

**⑦ 箱线图（Boxplot）**

```python
fig, ax = plt.subplots()
ax.boxplot([v1, v2], tick_labels=['A', 'B'])   # 中位数/四分位/离群点
ax.set_title('Boxplot')
plt.show()
```

**⑧ 南丁格尔玫瑰图（Rose）**

```python
fig = plt.figure(figsize=(6, 6))
ax = fig.add_subplot(111, projection='polar')          # 极坐标
theta = np.linspace(0, 2 * np.pi, len(v1), endpoint=False)
ax.bar(theta, v1, width=2 * np.pi / len(v1) * 0.8, alpha=0.8)   # 每瓣宽度
ax.set_title('Nightingale Rose')
plt.show()
```

**⑨ 双向条形图（Diverging Bar）**

```python
vals = [12, -7, 9, -3, 15]
fig, ax = plt.subplots()
ax.barh(names, [v if v > 0 else 0 for v in vals], color='green')   # 右侧正值
ax.barh(names, [v if v < 0 else 0 for v in vals], color='red')     # 左侧负值
ax.axvline(0, color='black', lw=0.8)               # 中心轴
ax.set_title('Diverging Bar')
plt.show()
```

**⑩ 雷达图（Radar）**

```python
fig = plt.figure(figsize=(6, 6))
ax = fig.add_subplot(111, projection='polar')
theta = np.linspace(0, 2 * np.pi, len(v1), endpoint=False)
vals = np.append(v1, v1[0]); theta_c = np.append(theta, theta[0])   # 首尾相接闭合
ax.plot(theta_c, vals); ax.fill(theta_c, vals, alpha=0.25)
ax.set_title('Radar Chart')
plt.show()
```

**⑪ 瀑布图（Waterfall，手动）**

```python
deltas = [100, -20, -30, -10, 20]                 # 每步增减
cum = np.cumsum([0] + deltas)                     # 累计和（起点 0）
fig, ax = plt.subplots()
for i, d in enumerate(deltas):
    ax.bar(i, d, bottom=cum[i], color='green' if d >= 0 else 'red')
ax.axhline(0, color='black', lw=0.8)
ax.set_title('Waterfall')
plt.show()
```

**⑫ 子弹图（Bullet，模拟）**

```python
fig, ax = plt.subplots()
ax.barh(['Q1'], [85], color='#4f81bd')                       # 实际值 85
ax.barh(['Q1'], [100], color='none', edgecolor='black')      # 目标 100 空心框
ax.axvline(100, color='black', lw=1)                         # 目标线
ax.set_title('Bullet Chart (simulated)')
plt.show()
```

> 📖 译注：Matplotlib 无原生「玫瑰/雷达/瀑布/子弹」，上面都是**用极坐标或手动叠加**模拟；需要真交互/原生支持时换 Plotly（§八）。

---

## 三、通用骨架逐行讲解（逐行 + 坑）

> 本骨架是 22 个示例与 WS01(B) 共用的「一图一 ax」写法：先建画布 → 划格子 → 建坐标轴 → 读数据 → 画图 → 保存。每一行都给「作用 / 参数 / 坑」。

### 3.1 三行 import（逐条）

```python
import pandas as pd                       # 数据分析：读 Excel/CSV；别名 pd 是社区约定
import matplotlib.pyplot as plt           # 绘图入口：figure/plot/show/savefig；别名 plt
import matplotlib.gridspec as gridspec    # 网格布局：把画布切成 rows x cols
```

> 📖 译注 · 逐条：
> - `pandas`：读表（`read_excel`）、清洗（`dropna`）、聚合（`groupby`）全靠它。
> - `pyplot`：命令式 API（`plt.plot / plt.show`）；下面用 `figure/add_subplot` 的**对象式 API** 管理多图。
> - `gridspec`：只管「规划格子」，真正画图交给各 ax。
> - 坑：`pd / plt / gridspec` 三个别名是社区约定，别乱起名；对象式与状态机式别混用。

### 3.2 读数据（逐条）

```python
df = pd.read_excel('salary.xlsx', sheet_name=None)              # None=读全部表 → {表名: DataFrame}
# df1 = pd.read_excel('salary.xlsx', sheet_name='Table 01')     # 只读一张表 → DataFrame
```

> 📖 译注 · 逐条：
> - `sheet_name=None` → 返回**字典**：`df['Table 01']` 取表、`df.keys()` 看表名。
> - `sheet_name='Table 01'` → 返回**单个 DataFrame**，指定表时更直接。
> - 常用参数：`header=0`（第 0 行作列名）、`index_col=0`（第 0 列作行索引）、`usecols='A:D'`（只读几列）。
> - 坑：读 Excel 依赖 `openpyxl`（Anaconda 自带）；路径含中文/空格用原始字符串 `r'...'`；`sheet_name=None` 后忘 `['表名']` 会拿到整个字典报错。

### 3.3 建画布 + 划格子 + 建坐标轴（逐条）

```python
fig = plt.figure(figsize=(16, 9))    # 画布 16x9 英寸；还可 dpi=100、facecolor=
gs = gridspec.GridSpec(2, 2)         # 规划 2 行 2 列；wspace/hspace 可在此统一设
ax1 = fig.add_subplot(gs[0, 0])      # 左上格
ax2 = fig.add_subplot(gs[0, 1])      # 右上格
ax3 = fig.add_subplot(gs[1, 0])      # 左下格
ax4 = fig.add_subplot(gs[1, 1])      # 右下格
```

> 📖 译注 · 逐条：
> - `figsize=(宽, 高)` 单位英寸；`dpi` 决定像素密度。
> - `GridSpec(2,2)` 只规划不画；`gs[r,c]` 支持切片：`gs[0, :]` 第一行整条、`gs[:, 0]` 第一列整条。
> - `fig.add_subplot(gs[r,c])` 把格子变成坐标轴对象；后续 `plot / bar / set_title` 都作用在 ax 上。
> - 等价写法：`fig, axes = plt.subplots(2, 2)`，用 `axes[0,0]` 取值——更简洁。
> - 坑：`gs[0,0]` 从 0 数起；同一格子重复 `add_subplot` 会重叠；混用 `plt.plot` 与 `ax.plot` 容易画错图，选一种坚持到底。

### 3.4 Q4 样式清单（逐条 + 坑）

```python
ax.set_title('USA Graduate Salary 2025', fontweight='bold', fontsize=13)
ax.set_xlabel('Year'); ax.set_ylabel('Salary (USD)')
ax.legend(loc='best', frameon=False)
ax.grid(True, linestyle='--', alpha=0.5)
fig.subplots_adjust(wspace=0.35, hspace=0.4)
fig.savefig('EIE1005_StudentID_Workshop_01_B.png', dpi=300, bbox_inches='tight')
```

> 📖 译注 · 逐条：
> - `set_title`：`fontweight='bold'` 满足「Descriptive Titles」；`pad=` 调标题与图间距。
> - `set_xlabel / set_ylabel`：文字里直接写单位。
> - `legend(loc='best')`：自动找遮挡最少的位置；`frameon=False` 去图例框。
> - `grid(True, linestyle='--', alpha=0.5)`：`axis='x'/'y'` 可只画一个方向。
> - `subplots_adjust(wspace, hspace)`：数值是「占子图平均宽/高比例」——0.35 = 左右间距为子图宽的 35%。
> - `savefig(dpi=300, bbox_inches='tight')`：300 dpi 高清；tight 裁白边防标签被切。
> - 坑：`bbox_inches='tight'` 会轻微缩放内容；文件名写错不报错、默默存到别处。

---

### 3.5 四种必考图 · 完整可运行代码（逐条）

> 🧠 拓展（自主补充，2026-09-24）：四种图的 API 参数逐条已并入本节末尾；下面是「六要素齐全」的完整脚本，可直接复制改数据用。

**① 折线图 Line**

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_excel('salary.xlsx', sheet_name='Table 01')    # ① 读数据
x = df['year']; y = df['salary']                            # ② 取两列

fig, ax = plt.subplots(figsize=(10, 5))                     # ③ 建图
ax.plot(x, y, marker='o', linewidth=2, color='#1f77b4',
        label='Salary')                                     # ④ 画折线：参数一次写完
ax.set_title('Salary Trend', fontweight='bold')             # ⑤ 样式：加粗标题
ax.set_xlabel('Year'); ax.set_ylabel('Salary (USD)')        #    轴标签带单位
ax.legend(); ax.grid(True, linestyle='--', alpha=0.5)       #    图例 + 淡网格
fig.savefig('line.png', dpi=300, bbox_inches='tight')       # ⑥ 导出高清
```

**② 面积图 Area**

```python
fig, ax = plt.subplots(figsize=(10, 5))
ax.fill_between(x, y, alpha=0.3)                 # 先填色（半透明）
ax.plot(x, y, color='#2e8b57', linewidth=2)      # 再描边，边线不被盖
ax.set_title('Salary Area', fontweight='bold')
ax.set_xlabel('Year'); ax.set_ylabel('Salary (USD)')
ax.grid(True, linestyle='--', alpha=0.5)
fig.savefig('area.png', dpi=300, bbox_inches='tight')
```

**③ 柱状图 Bar（竖向）**

```python
fig, ax = plt.subplots(figsize=(10, 5))
bars = ax.bar(names, values, width=0.6, color='#1f77b4')
ax.bar_label(bars, fmt='%.0f', padding=3)        # 柱顶数值标签
ax.set_title('Salary by Major', fontweight='bold')
ax.set_ylabel('Salary (USD)')
ax.set_ylim(0, max(values) * 1.2)                # 从 0 起 + 顶部留白放标签
fig.savefig('bar.png', dpi=300, bbox_inches='tight')
```

**④ 条形图 Barh（横向，长系名）**

```python
order = sorted(range(len(values)), key=lambda i: values[i])   # 排序索引
fig, ax = plt.subplots(figsize=(10, 5))
ax.barh([names[i] for i in order], [values[i] for i in order],
        color='#1f77b4')                          # 横向，系名完整不裁
ax.set_title('Salary by Major', fontweight='bold')
ax.set_xlabel('Salary (USD)')
fig.savefig('barh.png', dpi=300, bbox_inches='tight')
```

**⑤ 饼图 Pie**

```python
fig, ax = plt.subplots(figsize=(7, 7))
ax.pie(values, labels=names, autopct='%1.1f%%',
       startangle=90, wedgeprops=dict(width=0.4))   # 挖环形 + 百分比
ax.set_title('Salary Share', fontweight='bold')
fig.savefig('pie.png', dpi=300, bbox_inches='tight')
```

**API 参数逐条（原「四种图 API」并入本节）**

> 📖 译注 · 逐条：
> - `plot`：`marker` 数据点形状、`linewidth` 线宽、`color` 线色、`label` 图例名。
> - `fill_between`：填「曲线与 x 轴之间」；`alpha=0.3` 半透明。先填色再 `plot` 描边，边线才不被盖。
> - `barh`：`y=` 类目、`width=` 数值、`height=` 柱粗（横向柱的「高」）；长系名用横柱。
> - `pie`：`autopct='%1.1f%%'` 百分比 1 位小数、`startangle=90` 从 12 点起画、`wedgeprops` 可挖环形。
> - 坑：竖向 `bar` 的长类目名在 x 轴必被裁，WS01(B) 检查清单点名用 `barh`；饼图类别 >9 会糊。

### 3.6 同一效果的多种写法（四种写法逐条详解）

> 🧠 阿基米德提问法结论：同一效果至少有 4 种等价写法，各司其职——①参数写进调用（最直观）②先画后 setter（便于循环批量改）③pyplot 状态机（单图最快）④pandas 一行式（数据+图一体）。下面先给对照表，再逐个写法「是什么 → 完整代码 → 逐行 → 适用场景 → 坑」展开。

**对照表（效果 → 四种写法）**

| 效果 | ① 写进调用 | ② setter 另行改 | ③ pyplot 状态机 | ④ pandas 一行式 |
|---|---|---|---|---|
| 颜色 | `ax.plot(x,y,color='red')` | `line.set_color('red')` | `plt.plot(x,y,color='red')` | `df.plot(color='red')` |
| 线宽 | `plot(...,linewidth=2)` | `line.set_linewidth(2)` | `plt.plot(...,linewidth=2)` | `df.plot(linewidth=2)` |
| 线型 | `plot(...,linestyle='--')` | `line.set_linestyle('--')` | 同左 | `df.plot(linestyle='--')` |
| 数据点 | `plot(...,marker='o')` | `line.set_marker('o')` | 同左 | `df.plot(marker='o')` |
| 透明度 | `plot(...,alpha=0.5)` | `line.set_alpha(0.5)` | 同左 | `df.plot(alpha=0.5)` |
| 标题 | `ax.set_title('T')` | `ax.title.set_text('T')` | `plt.title('T')` | `df.plot(title='T')` |
| 轴标签 | `ax.set_xlabel('X')` | `ax.xaxis.set_label_text('X')` | `plt.xlabel('X')` | `ax.set_xlabel('X')`（df.plot 返回 ax） |
| 图例 | `ax.legend()` | `line.set_label('名')` 再 legend | `plt.legend()` | `df.plot(legend=True)` |
| 网格 | `ax.grid(True)` | `ax.grid(color=, ls=, alpha=)` | `plt.grid(True)` | `df.plot(grid=True)` |
| 背景 | `ax.set_facecolor('#fafafa')` | `ax.patch.set_facecolor('#fafafa')` | `plt.gca().set_facecolor(...)` | 改 rcParams |
| 柱顶标签 | `ax.bar_label(bars)` | 手动 `ax.text(i, v, ...)` | 无简写 | 不方便，仍用 ax |
| 按值着色 | `bar(color=colors)` | `bars.set_facecolor(colors)` | 无简写 | `df.plot(colormap='viridis')`（散点） |
| 颜色条 | `fig.colorbar(sm, ax=ax)` | `sm.set_array(v)` 后 colorbar | `plt.colorbar(sm)` | 无简写 |

#### 3.6.1 写法① · 参数写进调用（最直观）

**是什么**：颜色、线宽、标记等全部作为**关键字参数**，在 `ax.plot(...)` 调用时一次性传入。

```python
fig, ax = plt.subplots(figsize=(10, 5))
ax.plot(x, y, color='red', linewidth=2, marker='o', label='Salary')   # 一行写全
ax.set_title('Salary Trend', fontweight='bold')
ax.set_xlabel('Year'); ax.set_ylabel('Salary (USD)')
ax.legend(); ax.grid(True, linestyle='--', alpha=0.5)
ax.set_facecolor('#fafafa')
fig.savefig('a.png', dpi=300, bbox_inches='tight')
```

> 📖 译注 · 逐行：
> - `color / linewidth / marker / label` 都是 `plot()` 的**已知参数**，一行写完。
> - 标题、轴标签、图例、网格**不是** `plot` 的参数，所以接着用 `set_title / legend / grid`。

**适用**：一次成型、参数固定的静态图；代码最短最好读。
**坑**：
- 参数多时一行过长，可换行、每行一个参数；
- 写错参数名直接 `TypeError`——只有该函数的已知参数能写进调用。

#### 3.6.2 写法② · 先画后 setter（最灵活）

**是什么**：先 `line, = ax.plot(x, y)` 拿到 **Line2D 对象**，再用 `line.set_xxx(...)` 逐个改样式。**Matplotlib 里线、柱、轴、标题都是 Artist，全都带 `set_` 方法**，所以这条套路对任何元素通用。

```python
fig, ax = plt.subplots(figsize=(10, 5))
line, = ax.plot(x, y)              # ① 先只画，不带样式；逗号解包拿那一条线
line.set_color('red')              # ② 逐个 setter 修改
line.set_linewidth(2)
line.set_marker('o')
line.set_label('Salary')
ax.set_title('Salary Trend'); ax.title.set_fontweight('bold')   # ③ 标题也是 Artist，可先设后改
ax.set_xlabel('Year'); ax.set_ylabel('Salary (USD)')
ax.legend(); ax.grid(True, linestyle='--', alpha=0.5)
ax.patch.set_facecolor('#fafafa')  # ④ 与 ax.set_facecolor 完全等价
fig.savefig('b.png', dpi=300, bbox_inches='tight')
```

**常用 `set_` 清单**：

| 对象 | setter 示例 |
|---|---|
| Line2D（线） | `set_color / set_linewidth / set_linestyle / set_marker / set_markersize / set_markerfacecolor / set_label / set_alpha / set_zorder / set_visible(False)` |
| Axes（轴） | `set_title / set_xlabel / set_ylabel / set_xlim / set_ylim / set_facecolor / set_xticks` |
| 批量改多个 | `ax.set(title=..., xlabel=..., ylabel=..., ylim=(0, 100))` |

> 📖 译注 · 逐行：
> - `ax.plot` 返回的是**列表**，`line, = ...` 的逗号把列表里那一条线解包出来；丢逗号会把列表当线用而报错。
> - setter 返回 `None`，别写成 `line = line.set_color('r')`，也**不能链式** `line.set_color('r').set_linewidth(2)`。

**适用**：循环里按条件改样式、动画、交互式更新（同一个对象反复改，不必重画）。
**坑**：所有 `set_*` 要在 `plt.show()/savefig` 之前执行；之后才改的话需要重新渲染。

#### 3.6.3 写法③ · pyplot 状态机式（单图最快）

**是什么**：用 `plt.` 开头的函数；Matplotlib 内部始终维护「**当前 figure**」和「**当前 axes**」，`plt.xxx` 都打到这个"当前"对象上。

```python
plt.figure(figsize=(10, 5))                       # 建画布并设为"当前"
plt.plot(x, y, color='red', linewidth=2, marker='o', label='Salary')
plt.title('Salary Trend', fontweight='bold')
plt.xlabel('Year'); plt.ylabel('Salary (USD)')
plt.legend(); plt.grid(True, linestyle='--', alpha=0.5)
plt.gca().set_facecolor('#fafafa')                # gca()=拿当前坐标轴
plt.savefig('c.png', dpi=300, bbox_inches='tight')
```

> 📖 译注 · 逐行：
> - `plt.figure` 新建并激活一张画布；`plt.plot` 画到「当前 axes」，同时返回 Line2D 列表。
> - `plt.gca()` = get current **axes**；`plt.gcf()` = get current **figure**。
> - 切换对象：`plt.sca(ax)` 把某个 ax 设为当前；`plt.scf(fig)` 同理。

**适用**：单图脚本、Jupyter 快速探索。
**坑**：多子图时 `plt.plot` 总打到最后激活的那个 axes，**极易画错地方**——多图一律用 ax 对象式（写法①/②）。

#### 3.6.4 写法④ · pandas 一行式（数据 + 图一体）

**是什么**：DataFrame / Series 自带 `.plot`，用 `kind=` 选图型；内部仍是调用 Matplotlib，**返回 Axes**。

```python
ax = df.plot(x='year', y='salary', kind='line',
             color='red', linewidth=2, marker='o', legend=True)   # pandas 直接画
ax.set_title('Salary Trend', fontweight='bold')
ax.set_xlabel('Year'); ax.set_ylabel('Salary (USD)')
ax.grid(True, linestyle='--', alpha=0.5); ax.set_facecolor('#fafafa')
ax.get_figure().savefig('d.png', dpi=300, bbox_inches='tight')   # ax.get_figure() 拿画布
```

> 📖 译注 · 逐行：
> - `kind=` 取值：`line / area / bar / barh / pie / scatter / hist / box / kde`；等价写法 `df.plot.line(...)`、`df.plot.pie(...)`（kind 换成方法名）。
> - 返回 **Axes**：接着用 `ax.set_title(...)` 补样式；保存要 `ax.get_figure()`。
> - 多列时每列自动一条线；只想画一列用 `y='列名'`；饼图必须指定 `y=`（数值列）。

**适用**：刚读完 Excel、边清洗边画。
**坑（重点）**：
- **`kind=` 只属于 pandas**：`ax.plot(kind='pie')` 不存在，会报 `TypeError: plot() got an unexpected keyword argument 'kind'`——Matplotlib 选图型靠换方法名（plot / bar / barh / pie / scatter）。
- `df.plot` 返回 Axes 不是 Figure，直接 `.savefig()` 会报错。

**四种写法怎么选（横向对比）**

| 写法 | 场景 | 一句话 |
|---|---|---|
| ① 参数内联 | 一次性静态图 | 最直观、最短 |
| ② setter | 循环 / 动画 / 动态改样式 | 最灵活、可复用对象 |
| ③ pyplot | 单图快速探索 | 最快，多图易错 |
| ④ pandas | 清洗后直接出图 | 与 pandas 流程无缝 |

> 📖 译注：四种写法**输出完全一致**，按场景选；本作业推荐 ①（参数集中、好维护），多子图别用 ③。

---

## 四、五大进阶主题（重点新增）

### 4.1 给整张图加背景（逐条讲解）

> 🧠 拓展（外部资料，检索于 2026-09-23）：Matplotlib 背景分**三层**，互不隶属：① `fig.patch` 画布底（含子图之间与四周留白）② `ax.patch` 绘图区底（坐标轴围起来的区域）③ `savefig` 导出底（默认白色，会盖掉前两层）。

```python
fig = plt.figure(figsize=(16, 9))
fig.patch.set_facecolor('#f2f2f7')          # ① 画布底色：子图之间 + 四周留白都变灰
ax = fig.add_subplot(111)
ax.set_facecolor('#fffdf5')                 # ② 绘图区底色：只有坐标轴围住的区域变米白

# ③ 导出坑：savefig 默认把背景盖成白色，必须显式带上 facecolor：
fig.savefig('out.png', dpi=300, facecolor=fig.get_facecolor())
```

> 📖 译注 · 逐条：
> - `fig.patch`：Figure 自带的矩形「底片」，`set_facecolor` 改整张画布底色。
> - `ax.set_facecolor`：改单个坐标区底色；**每个子图可不同色**，实现「分块配色」。
> - `facecolor=fig.get_facecolor()`：让导出文件沿用画布底色；不写则 savefig 默认白底，前两步白做。
> - 全局写法：`plt.rcParams['savefig.facecolor'] = '#f2f2f7'`，一次设置、以后每次导出都生效。

**进阶 · 整图渐变背景**（官方 Gallery 同款思路）

```python
import numpy as np

def gradient_image(ax, direction=1, cmap_range=(0, 1), **kw):
    phi = direction * np.pi / 2            # 0=竖渐变，1=横渐变
    v = np.array([np.cos(phi), np.sin(phi)])
    X = np.array([[v @ [1, 0], v @ [1, 1]],
                  [v @ [0, 0], v @ [0, 1]]])
    a, b = cmap_range
    X = a + (b - a) / X.max() * X
    return ax.imshow(X, interpolation='bicubic', clim=(0, 1),
                     aspect='auto', **kw)

# extent 用 0..1 + transAxes = 铺满整个坐标区（与数据坐标无关）
gradient_image(ax, direction=1, extent=(0, 1, 0, 1),
               transform=ax.transAxes, cmap='RdYlGn',
               cmap_range=(0.2, 0.8), alpha=0.5)
```

> 🌐 来源：Matplotlib 官方 Gallery「Bar chart with gradients」https://matplotlib.org/stable/gallery/lines_bars_and_markers/gradient_bar.html（检索于 2026-09-23）
> 📖 译注 · 逐条：`direction` 控制渐变方向；`cmap_range=(0.2, 0.8)` 只取色带中间一段、避开两端太艳；`alpha=0.5` 半透明别盖住图线。

#### 4.1.1 个性化背景进阶（八招，逐条）

**① 双色分区背景**（画布与绘图区两个颜色，层次分明）

```python
fig.patch.set_facecolor('#0f172a')   # 外层深蓝灰（画布）
ax.set_facecolor('#1e293b')          # 内层稍浅（绘图区），形成「嵌板」观感
# 线/文字换亮色：ax.plot(..., color='#38bdf8'); 轴标签 ax.tick_params(colors='white')
```

**② 三色渐变背景**（任意「停靠点」自定义渐变）

```python
from matplotlib.colors import LinearSegmentedColormap

def gradient_3stop(ax, stops=((0, '#e8f0fe'), (0.5, '#ffffff'), (1, '#fdeaea'))):
    # stops：[(位置 0~1, 颜色), ...]；位置在中间=颜色分界处
    cmap = LinearSegmentedColormap.from_list('bg', [c for _, c in stops])
    X = np.tile(np.linspace(0, 1, 256), (256, 1))   # 每行相同 → 横向渐变（竖向转置即可）
    ax.imshow(X, extent=(0, 1, 0, 1), transform=ax.transAxes,
              cmap=cmap, aspect='auto', zorder=0, alpha=0.9)

gradient_3stop(ax)   # 左蓝 → 中白 → 右粉
```

> 📖 译注 · 逐条：`LinearSegmentedColormap.from_list` 用「位置+颜色」造一条自定义色带；`np.tile` 造 256×256 的渐变矩阵；`zorder=0` 垫在最底层。想要竖向渐变，把矩阵转置（`X.T`）即可。

**③ 图片背景**（贴一张照片/纹理图，做淡淡底纹）

```python
import matplotlib.image as mpimg

bg = mpimg.imread('bg.png')          # 读入任意 PNG/JPG（得到 高×宽×3 的数组）
ax.imshow(bg, extent=(0, 1, 0, 1), transform=ax.transAxes,
          aspect='auto', zorder=0, alpha=0.12)   # 铺满绘图区、垫底、12% 透明度
ax.patch.set_alpha(0)                # 关键：关闭绘图区自身底色，否则挡住图片

ax.plot(x, y, zorder=3)              # 图线 zorder=3，保证盖在背景之上
```

> 📖 译注 · 逐条：`extent=(0,1,0,1)+transform=ax.transAxes` 让图片按「绘图区比例」铺满、与数据坐标无关；`zorder` 数值越大越靠上（背景 0 < 图线 3）；`ax.patch.set_alpha(0)` 把 axes 底色变透明，图片才露得出来。`aspect='auto'` 允许图片被拉伸铺满。

**④ 水印 / 署名**（画布正中的淡色斜字）

```python
fig.text(0.5, 0.5, 'POLYU', fontsize=90, color='gray',
         alpha=0.06, rotation=30, ha='center', va='center', zorder=0)
```

> 📖 译注 · 逐条：`fig.text` 用的是**画布坐标（0~1）**，(0.5,0.5)=正中心，与子图数据无关；`alpha=0.06` 几乎透明、`rotation=30` 斜放；导出时随图一起保存。

**⑤ 角标 / 署名条**（右下角小字）

```python
ax.text(0.99, 0.01, 'EIE1005 · StudentID', transform=ax.transAxes,
        ha='right', va='bottom', fontsize=9, color='#888888')
```

> 📖 译注 · 逐条：`transform=ax.transAxes` 让坐标 (0.99, 0.01) 按绘图区比例定位 → 右下角；`ha/va` 右对齐+底对齐，字号加大也不越界。

**⑥ 对角条纹纹理背景**

```python
def stripes(ax, color1='#ffffff', color2='#e2e8f0', width=0.02):
    yy, xx = np.mgrid[0:256, 0:256]                       # 256x256 网格坐标
    X = ((xx + yy) // (256 * width) % 2).astype(float)    # (x+y) 对角方向分 0/1
    cmap = LinearSegmentedColormap.from_list('st', [color1, color2])
    ax.imshow(X, extent=(0, 1, 0, 1), transform=ax.transAxes,
              cmap=cmap, aspect='auto', zorder=0, alpha=0.6)

stripes(ax, width=0.03)
```

> 📖 译注 · 逐条：`xx + yy` 的值沿「↘ 对角方向」相同，`// (256*width)` 再 `%2` 就把画面切成等宽斜条（0/1 两色）；`width` 越小条纹越密；`alpha` 调淡后垫底。

**⑦ 极坐标背景（玫瑰图底）**

```python
fig = plt.figure(figsize=(8, 8))
ax = fig.add_subplot(111, projection='polar')   # 极坐标系（角度 + 半径）
ax.set_facecolor('#0b1026')                     # 深色底
ax.set_theta_zero_location('N')                 # 0° 指向正北（默认是东）
ax.set_thetagrids(range(0, 360, 45))            # 每 45° 一条辐射网格
ax.set_rgrids([20, 40, 60], angle=30)           # 半径网格 + 标签角度

angles = np.linspace(0, 2 * np.pi, 12, endpoint=False)   # 12 个角，弧度制
ax.bar(angles, radii, width=0.3, color='#22d3ee',
       edgecolor='white', alpha=0.8)                     # 每个角度一根「花瓣」
```

> 📖 译注 · 逐条：`projection='polar'` 建极坐标轴；`set_theta_zero_location('N')` 让 0° 朝正北；`thetagrids/rgrids` 分别控制角度与半径网格；`bar(angles, radii)` 的 width 是扇形角宽。坑：角度用**弧度**；width 别超过 `2π/n`，否则花瓣重叠。

**⑧ 圆角画布**

```python
from matplotlib.patches import FancyBboxPatch

fig.patch.set_facecolor('none')                       # 画布透明，露出圆角外的区域
fig.patches.append(FancyBboxPatch(
    (0, 0), 1, 1, transform=fig.transFigure,          # 画布坐标 0~1
    boxstyle='round,pad=0.01,rounding_size=0.03',     # 四角圆滑程度
    facecolor='#f8fafc', edgecolor='#cbd5e1',
    linewidth=1.5, zorder=0))                         # 垫在最底层
ax.set_zorder(1)                                      # 绘图区盖在圆角底片上
fig.savefig('rounded.png', facecolor='none', transparent=True)
```

> 📖 译注 · 逐条：`transform=fig.transFigure` 用画布坐标（0~1）画满整幅；`rounding_size` 越大角越圆；`zorder=0` 垫底、`ax.set_zorder(1)` 让图盖上来；`transparent=True` 导出保留透明。坑：PNG 支持透明、JPG 不支持；透明背景在深色网页里可能看不清字。

**综合示例（示意预览）**

![个性化背景综合示例（AI 示意图，非真实数据）](files/eie1005/img/demo-background.png)

> 📖 译注：上图为「三色渐变背景 + 水印 + 数值渐变着色 + 颜色条 + 圆角外框」的合成示意，代码见本小节 ②③④⑧。

### 4.2 柱状图特殊效果（七种）

```python
bars = ax.bar(x, values, width=0.6)

# 1) 描边（轮廓）
ax.bar(x, values, edgecolor='black', linewidth=1.2)
# 2) 填充纹理（黑白打印也能区分）
ax.bar(x, values, hatch='//')            # 可选 // .. xx ** oo
# 3) 半透明
ax.bar(x, values, alpha=0.7)
# 4) 柱顶数值标签（Matplotlib >= 3.4）
ax.bar_label(bars, fmt='%.0f', padding=3)
# 5) 高亮最大/最小柱
colors = ['#c0392b' if v == max(values) else '#1f77b4' for v in values]
ax.bar(x, values, color=colors)
# 6) 误差棒
ax.bar(x, values, yerr=err, capsize=4, error_kw=dict(elinewidth=1.5))
# 7) 圆角柱（原生 bar 不支持圆角，用补丁手画）
from matplotlib.patches import FancyBboxPatch
for xi, vi in zip(x, values):
    ax.add_patch(FancyBboxPatch((xi - 0.25, 0), 0.5, vi,
                 boxstyle='round,pad=0,rounding_size=0.08',
                 mutation_scale=1, facecolor='#1f77b4'))
```

> 📖 译注：排序降序先 `df.sort_values('salary', ascending=False)`；`bar_label` 对应检查清单「No Overlaps」；`FancyBboxPatch` 要同步设置 `xlim/ylim`。
> 🔴 考点：`bar_label`、`yerr+capsize`、`edgecolor` 三组参数名要能默写。

### 4.3 每个柱子按数值大小映射渐变色

核心三件套：**colormap（色带）+ Normalize（数值→0..1）+ 取色**。

```
values ──Normalize──> [0,1] ──colormap──> RGBA 颜色 ──> bar(color=...)   （柱）
        └───────────── 同一个 norm + cmap ──> ScalarMappable ──> fig.colorbar（渐变示意）
```

```python
import matplotlib.colors as mcolors
import numpy as np

values = np.array([42000, 51000, 46000, 58000, 39000])   # 示例薪资

cmap = plt.get_cmap('viridis')                            # 感知均匀色带
norm = mcolors.Normalize(vmin=values.min(), vmax=values.max())
colors = [cmap(norm(v)) for v in values]                  # 每根柱一个 RGBA

bars = ax.bar(x, values, color=colors)
```

> 📖 译注：`norm(v)` 把 v 压到 0–1，`cmap(0..1)` 返回该位置的 RGBA。`vmin/vmax` 用数据 min/max 对比最强；想反映绝对量级就固定 `vmin=0`。

**两种常用变化**
- 单色由浅到深：`cmap = plt.get_cmap('Blues')`，数值越大越深。
- 正负发散色带：`norm = mcolors.TwoSlopeNorm(vmin=-10, vcenter=0, vmax=10)` + `cmap='RdYlGn'`，负红、0 黄、正绿。

### 4.3.1 归一化家族与色带选择（逐条）

**Normalize 家族**（数值 → 0..1 的不同压缩方式）：

```python
from matplotlib import colors as mcolors

norm = mcolors.Normalize(vmin=0, vmax=100)            # ① 线性：最常用
norm = mcolors.LogNorm(vmin=1, vmax=1e5)              # ② 对数：跨数量级（1→10万）用
norm = mcolors.TwoSlopeNorm(vmin=-10, vcenter=0, vmax=10)  # ③ 正负发散：0 钉中点
norm = mcolors.BoundaryNorm([0, 40, 60, 80, 100], ncolors=4)  # ④ 离散分段：分档着色
```

> 📖 译注 · 逐条：
> - `Normalize`：线性映射，差距均匀体现。
> - `LogNorm`：数值跨好几个数量级（如 1、100、10000）时，小值才不会被压成同一个颜色；`vmin` 必须 >0。
> - `TwoSlopeNorm(vcenter=0)`：0 落在色带中点（黄），正负两侧对称，适合增长率。
> - `BoundaryNorm(boundaries, ncolors)`：把连续值切成几档，配合 `ListedColormap` 做「红黄绿」分档。

**色带三类怎么选**：

| 类型 | 例子 | 何时用 |
|---|---|---|
| sequential 顺序型 | `viridis`、`Blues` | 数值只有大小方向（0→大） |
| diverging 发散型 | `RdYlGn`、`coolwarm` | 有正有负、以某点为界 |
| qualitative 定性型 | `tab10`、`Set2` | 类目之间无大小关系 |

> 📖 译注：定类数据（工程/商科/理科）用 qualitative 色带；有量级的数值用 sequential；有正负用 diverging——**类别别用渐变，数值别用定性色**。

### 4.4 添加渐变色示意图（颜色条 colorbar）

> 🧠 拓展（外部资料，检索于 2026-09-23）：柱状图本身没有图像 mappable，用 `ScalarMappable` 造一座「同 cmap + 同 norm」的桥，再喂给 `fig.colorbar`。

```python
sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)
sm.set_array(values)                          # 让 colorbar 知道数值范围

fig.colorbar(sm, ax=ax, label='Salary (USD)')            # 默认右侧竖条
fig.colorbar(sm, ax=ax, orientation='horizontal',        # 顶部横条
             location='top', shrink=0.7, aspect=25,
             label='Salary (USD)')
```

> 📖 译注：`shrink` 缩短长度、`aspect` 控制粗细、`location` 放上/下/左/右。颜色条 = 「渐变色示意图 + 数值标尺」。旧版 Matplotlib（<3.6）若报错可改用 `sm.set_array([])`。

**colorbar 参数逐条速查**：

| 参数 | 作用 | 示例 |
|---|---|---|
| `label` | 颜色条标题（单位） | `label='Salary (USD)'` |
| `orientation` | 竖条 / 横条 | `'vertical'` / `'horizontal'` |
| `location` | 放哪一侧 | `'right' / 'left' / 'top' / 'bottom'` |
| `shrink` | 长度缩放 | `0.7` = 原长的 70% |
| `aspect` | 粗细（越大越细） | `25` |
| `pad` | 与图的间距 | `0.05` |
| `extend` | 两端加「越界三角」 | `'both' / 'max' / 'neither'` |
| `ticks` | 自定义刻度位置 | `ticks=[0, 0.5, 1]` |

**离散颜色条（分档 + 自定义刻度）**：

```python
cmap = mcolors.ListedColormap(['#e74c3c', '#f1c40f', '#2ecc71'])   # 红/黄/绿 三档
norm = mcolors.BoundaryNorm([0, 40, 70, 100], ncolors=3)
sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)
sm.set_array(values)
cb = fig.colorbar(sm, ax=ax)
cb.set_ticks([20, 55, 85])               # 刻度放每档中点
cb.set_ticklabels(['Low', 'Mid', 'High'])
```

> 📖 译注 · 逐条：`ListedColormap` 只给有限几种颜色；`BoundaryNorm` 把数值按边界分档；`set_ticks/set_ticklabels` 自定义刻度与文字。坑：`ncolors` 与 `len(cmap.colors)` 要一致；`sm.set_array(values)` 别忘，否则 colorbar 报错。

**替代方案 · 离散图例**（颜色档位少时更清晰）

```python
import matplotlib.patches as mpatches
legend_handles = [mpatches.Patch(color=c, label=f'{lo:,.0f}–{hi:,.0f}')
                  for c, lo, hi in zip(colors, lows, highs)]
ax.legend(handles=legend_handles, title='Salary')
```

**官方「渐变填充单柱」完整实现**（每根柱内部自带垂直渐变）

```python
def gradient_bar(ax, x, y, width=0.5, bottom=0):
    for left, top in zip(x, y):
        right = left + width
        gradient_image(ax, extent=(left, right, bottom, top),
                       cmap='Blues_r', cmap_range=(0, 0.8))

gradient_bar(ax, x, y, width=0.7)
```

> 🌐 来源：https://matplotlib.org/stable/gallery/lines_bars_and_markers/gradient_bar.html（检索于 2026-09-23）
> 📖 译注 · 别混：**4.3 = 每根柱一个颜色（颜色随数值变）；本实现 = 每根柱内部从底到顶渐变**。

### 4.5 高难度拓展 + 技巧库 + 避雷

```python
# 双轴：薪资 + 增长率
ax1b = ax1.twinx()
ax1b.plot(year, growth, color='r', linestyle=':')
ax1b.set_ylabel('Growth %')

# 多图联动缩放
fig2, (a, b) = plt.subplots(2, 1, sharex=True, figsize=(12, 8))

# 标注关键点
ax1.annotate('Peak', xy=(2025, peak), xytext=(2020, peak * 0.9),
             arrowprops=dict(arrowstyle='->'))

# 误差带（不确定区间）
ax.fill_between(x, y - err, y + err, alpha=0.2)

# 现代布局 mosaic
fig3, axd = plt.subplot_mosaic('AB;CC', figsize=(14, 8))
```

**效果与技巧库（联网检索 · 检索于 2026-09-23）**

| # | 效果 | 一句话实现 |
|---|---|---|
| 1 | 环形图 Donut | `wedgeprops=dict(width=0.4)` |
| 2 | 水平柱状分布图 | `ax.barh()` |
| 3 | 堆叠面积 / 流图 | `ax.stackplot(x, y1, y2)` |
| 4 | 渐变柱 | `imshow` + 双三次插值（见 4.4） |
| 5 | 误差带 | `fill_between(..., alpha=0.2)` |
| 6 | 双轴 | `ax.twinx()` |
| 7 | 共享轴 | `subplots(2, 1, sharex=True)` |
| 8 | Mosaic 布局 | `plt.subplot_mosaic('AB;CC')` |
| 9 | 自动排版 | `constrained_layout=True` / `tight_layout()` |
| 10 | 统一风格 | `plt.rcParams` / `plt.style.use('seaborn-v0_8')` |

**常见坑（避雷清单）**

| 症状 | 原因与解法 |
|---|---|
| 导出后背景又变白 | `savefig` 默认白底 → 加 `facecolor=fig.get_facecolor()` |
| 长系名被裁 | 用 `barh()` 或 `tight_layout()` |
| colorbar 报 `No mappable was found` | 先建 `ScalarMappable(cmap=…, norm=…)` |
| 标签与柱重叠 | `bar_label` 的 `padding` + 放大 `ylim` 上限 |

> 🌐 来源：Matplotlib 官方 Gallery https://matplotlib.org/stable/gallery/index.html ；颜色条放置说明 https://matplotlib.org/stable/users/explain/axes/colorbar_placement.html（检索于 2026-09-23）

---

## 五、全局美化：预设风格与主题库（用户提供文章 · 逐条详解）

> 🧠 拓展（用户提供文章内容，检索于 2026-09-23）：图形美观度直接决定信息传递效率。美化分四层：**内置风格 → 主题库（qbstyles / matplotx）→ 发光特效（mplcyberpunk）→ 自定义 .mplstyle**。每节按「是什么 → 逐行讲解 → 坑」展开。

### 5.1 Matplotlib 内置预设风格（逐条）

**是什么**：`plt.style.available` 里列出的整套预设，一键换掉底色、网格、字体、配色，绘图代码一行都不用改。

```python
import matplotlib.pyplot as plt

print(plt.style.available)           # ① 打印全部可用风格名（版本不同略有差异）
plt.style.use('ggplot')              # ② 全局加载：灰底+白网格，R 语言 ggplot2 风
# plt.style.use('fivethirtyeight')   # ③ 数据新闻风：粗线、大标题、无竖网格
# plt.style.use('seaborn-v0_8')      # ④ 现代浅色风（新版旧名 'seaborn' 已改名）
# plt.style.use('dark_background')   # ⑤ 黑底亮线：深色演示最出片
# plt.style.use('grayscale')         # ⑥ 灰阶：黑白打印友好

x = range(10)
y = [i ** 2 for i in x]
plt.plot(x, y)                       # 绘图代码完全不用改，外观自动换
plt.title('Sample Plot with Preset Style')
plt.show()
```

**常用风格速查**：

| 风格 | 观感 | 适合场景 |
|---|---|---|
| `ggplot` | 灰底、白网格 | 通用报告 |
| `fivethirtyeight` | 粗线、大标题 | 数据新闻、洞察展示 |
| `seaborn-v0_8` | 现代浅色 | 日常分析 |
| `dark_background` | 黑底亮线 | 演示 / 答辩 |
| `grayscale` | 灰阶 | 黑白打印 |
| `bmh` | 暖灰贝叶斯风 | 金融序列 |
| `tableau-colorblind10` | 色盲友好配色 | 论文、多人阅读 |

> 📖 译注 · 逐条：
> - `style.use('x')` 是**全局一次性**：改完所有后续图都是它；想恢复默认用 `plt.style.use('default')`。
> - `with plt.style.context('x'):` 是**局部临时**：只在 with 块内生效，出块自动还原——多图混用主题时推荐它。

### 5.2 qbstyles（QuantumBlack 专业风，逐条）

**是什么**：QuantumBlack（麦肯锡旗下 AI 咨询）发布的样式库，深色模式自带「咨询公司报告」质感。

```python
# pip install qbstyles                       # ① 安装（只需一次）
from qbstyles import mpl_style              # ② 导入样式入口函数

mpl_style(dark=True)                        # ③ 加载主题：True=深色专业风；False=浅色
plt.plot(x, y, marker='o')                  # ④ 之后正常画图，自动套用
plt.title('Sample Plot with qbstyles')
plt.show()
```

> 📖 译注 · 逐条：
> - `dark=True`：深色主题；`dark=False`：浅色主题（原文「dark =Fasle」是笔误，应为 `dark=False`）。
> - 它同时重设了 rcParams（背景/字体/配色/网格），和 `style.use` 属于同一类「整套换肤」。
> - ⚠️ 坑：第三方库，交作业的 `.py` 在老师机器上未必安装 → 提交版别用，演示可加分。

### 5.3 matplotx（Dracula / Pitaya Smoothie 等主题，逐条）

**是什么**：一个「主题集合」库，内置 Dracula（紫黑程序员风）、Pitaya Smoothie 等多个主题；用 context 临时套用，不污染全局。

```python
# pip install matplotx
import matplotlib.pyplot as plt
import matplotx

with plt.style.context(matplotx.styles.dracula):   # ① 只在 with 块内启用 Dracula
    x = range(10)
    y = [i ** 2 for i in x]
    plt.plot(x, y)                                 # ② 块内所有图共用该主题
    plt.title('Sample Plot with matplotx Dracula Theme')
    plt.show()                                     # ③ 出块后自动还原默认样式
```

> 📖 译注 · 逐条：
> - `matplotx.styles.<主题名>` 是库注册好的 rcParams 字典；`style.context(字典)` 临时应用。
> - 想看全部主题名：`print([s for s in dir(matplotx.styles) if not s.startswith('_')])`。
> - 适合「同一脚本里不同图用不同主题」；用 `context` 而非 `use`，避免全局被改乱。

### 5.4 mplcyberpunk（赛博朋克发光，逐条）

**是什么**：未来感「黑底霓虹 + 线条发光」风格库；适合酷炫演示、博客头图，不适合正式报告。

```python
# pip install mplcyberpunk
import numpy as np
import mplcyberpunk
import matplotlib.pyplot as plt

plt.style.use('cyberpunk')              # ① 加载库注册好的 cyberpunk 风格（黑底霓虹）
x = np.linspace(0, 10, 20)
y = np.sin(x)

plt.plot(x, y, marker='o')              # ② 正常画图
mplcyberpunk.make_lines_glow()          # ③ 关键一步：给「已有线条」叠一圈辉光
# mplcyberpunk.add_glow_effects()       # ④ 一键给图内所有对象（线/柱/散点）加发光

plt.title('Cyberpunk Style Plot')
plt.show()
```

> 📖 译注 · 逐条：
> - `make_lines_glow()` 只处理 `plot` 画的线；`add_glow_effects()` 会扫一遍图内所有可发光对象，覆盖面更广。
> - 发光本质是「在原线周围叠几圈越来越淡的同色线」，所以**线越多越费时间**。
> - ⚠️ 坑：黑底风格导出后背景是深色，打印 / PDF 阅读费墨，考试报告慎用。

### 5.5 自定义样式文件 .mplstyle（逐参数详解）

**是什么**：把 rcParams 写进一个文本文件，一次定义、处处复用；**零第三方依赖**，提交作业最稳。

**语法规则（逐条）**：
- 每行 `key : value`，冒号前后空格无所谓；
- `#` 开头整行是注释；
- 布尔写 `True / False`；多个值写 `[a, b]`（如 `figure.figsize : 8, 6`）；
- 颜色可用名字（`lightgray`）或 hex（`#f2f2f7`）。

**参数逐条速查表**：

| 参数 | 作用 | 示例值 | 生效效果 |
|---|---|---|---|
| `font.family` | 字体族 | `sans-serif` | 全部文字换无衬线体 |
| `font.size` | 全局字号 | `14` | 刻度、标签、标题基准字号 |
| `font.style` | 字形 | `normal / italic` | 斜体等 |
| `font.weight` | 字重 | `normal / bold` | 加粗 |
| `axes.facecolor` | 绘图区底色 | `lightgray` | 坐标轴围住的区域变灰 |
| `axes.edgecolor` | 坐标轴边框色 | `black` | 四条边线颜色 |
| `axes.linewidth` | 边框线宽 | `1.5` | 边框粗细 |
| `grid.color` | 网格线颜色 | `white` | 网格线颜色 |
| `grid.linestyle` | 网格线型 | `--` / `-.` / `-` | 虚线 / 点划线 / 实线 |
| `grid.linewidth` | 网格线宽 | `0.8` | 网格粗细 |
| `grid.alpha` | 网格透明度 | `0.5` | 0 全透、1 全实 |
| `xtick.color` / `ytick.color` | 刻度文字颜色 | `darkgray` | 刻度数字变灰 |
| `xtick.direction` / `ytick.direction` | 刻度方向 | `in` / `out` / `inout` | 刻度朝内/外/双向 |
| `axes.titlecolor` | 标题颜色 | `darkred` | 标题变深红 |
| `axes.labelcolor` | 轴标签颜色 | `darkblue` | X/Y 轴名称变深蓝 |
| `lines.color` | 线条颜色 | `blue` | 默认线色 |
| `lines.linewidth` | 线条宽度 | `2.0` | 默认线宽 |
| `lines.linestyle` | 线型 | `--` | 默认虚线 |
| `lines.marker` | 标记形状 | `o` / `*` / `s` | 数据点形状 |
| `lines.markerfacecolor` | 标记填充色 | `red` | 数据点内部颜色 |
| `lines.markersize` | 标记大小 | `6` | 数据点尺寸 |
| `figure.facecolor` | 整图底色 | `white` | 画布（含四周留白）颜色 |
| `figure.edgecolor` | 整图边缘色 | `black` | 画布边框颜色 |
| `figure.figsize` | 画布尺寸（英寸） | `8, 6` | 宽 8、高 6 |
| `savefig.dpi` | 导出分辨率 | `300` | 保存 PNG 的清晰度 |

**示例 `my_style.mplstyle`**：

```text
font.size : 14
axes.facecolor : lightgray
axes.edgecolor : black
grid.color : white
grid.alpha : 0.5
lines.color : blue
lines.linewidth : 2.0
xtick.color : darkgray
ytick.color : darkgray
axes.titlecolor : darkred
axes.labelcolor : darkblue
figure.figsize : 8, 6
savefig.dpi : 300
```

**三种使用方式（逐条）**：

```python
plt.style.use('my_style.mplstyle')              # ① 加载整个样式文件（全局）
plt.rcParams['lines.linewidth'] = 2.0           # ② 代码里直接改单项（全局）
with plt.rc_context({'grid.alpha': 0.3}):       # ③ 临时块内覆盖（局部，推荐用于微调）
    plt.plot(x, y)
```

> 📖 译注：`.mplstyle` 本质就是把 rcParams 写进文本文件。提交 `.py` 时把 `.mplstyle` 一起交（或把参数写成 ② 的形式），**零第三方依赖、最稳**。

### 5.6 选型建议

| 场景 | 方案 |
|---|---|
| 作业 / 考试提交 | 内置风格 + 自定义 `.mplstyle` + `rcParams` |
| 个人演示、追求好看 | qbstyles / matplotx / mplcyberpunk |
| 同一脚本多主题 | `with plt.style.context(...)` |
| 需要个性化背景 | 见 §4.1.1 八招（渐变 / 图片 / 水印 / 角标 / 条纹 / 极坐标 / 圆角） |

---

## 六、数据预处理与优化闭环（逐条 + pandas 代码）

> 🧠 拓展（用户提供参考，检索于 2026-09-23）：不要拿原始数据直接作图，先预处理——「垃圾进，垃圾出」。

### 6.1 四步预处理（逐条 + 代码）

```python
import pandas as pd

df = pd.read_excel('salary.xlsx', sheet_name='Table 01')

df = df.dropna()                            # ① 清洗：删缺失值所在行
df = df.drop_duplicates()                   # ② 去重：删完全相同的行
df = df[df['salary'] > 0]                   # ③ 去异常：只留正工资
df['year'] = pd.to_datetime(df['year'])     # ④ 结构：统一时间字段格式

monthly = (df.groupby('major')['salary']      # ⑤ 聚合：按专业求平均
             .mean()
             .sort_values(ascending=False))   # ⑥ 排序：降序，好画条形图
```

> 📖 译注 · 逐条：
> - `dropna()`：默认删「任一列有缺失」的行；`subset=['salary']` 可只按某列删。
> - `drop_duplicates()`：默认保留第一次出现；`subset='id'` 按主键去重。
> - `df[df['salary'] > 0]`：布尔筛选，等价 `query('salary > 0')`。
> - `to_datetime()`：字符串统一成日期类型；格式不合会报错，`format='%Y'` 可指定。
> - `groupby('major')['salary'].mean()`：按维度分组、对度量求均值；`agg(['mean','max'])` 可一次多指标。
> - 坑：`dropna` 会删整行、数据少时慎用；`groupby` 后忘记 `.mean()` 只得到一个分组对象。

### 6.2 优化闭环六步（逐条）

1. **数据检查**：二次核对源数据与公式，防「乌龙结论」。
2. **视觉增量**：调整色彩 / 布局 / 标签，突出核心信息（见 §2.4）。
3. **信息补充**：加趋势线、均值线、同比 / 环比指标（见 §2.5）。
4. **交互（可选）**：筛选、联动、下钻（见 §八）。
5. **反馈迭代**：找同学 / 助教试用，按意见改。
6. **定稿导出**：`dpi=300 + bbox_inches='tight' + facecolor`（见 §3.4）。

---

## 七、完整示例脚本（把全部技巧串起来）

> 🧠 拓展（自主整合，2026-09-23）：一个脚本串起「背景两层 → 排序 → 渐变着色 → 描边 → 柱顶标签 → 高亮极值 → 均值线 → annotate 注释 → 颜色条 → 高清导出」，可直接当 WS01(B) 的 Bar 图底稿。

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors

# 数据（示例薪资）
depts = ['Engineering', 'Business', 'Sciences', 'Arts', 'Medicine']
salary = np.array([52000, 48000, 61000, 44000, 59000])

# 画布与背景两层
fig, ax = plt.subplots(figsize=(12, 7))
fig.patch.set_facecolor('#f4f4f8')
ax.set_facecolor('#fffdf8')

# 排序 + 按数值渐变着色
order = np.argsort(salary)
salary_sorted = salary[order]
depts_sorted = [depts[i] for i in order]
cmap = plt.get_cmap('viridis')
norm = mcolors.Normalize(vmin=salary_sorted.min(), vmax=salary_sorted.max())
colors = [cmap(norm(v)) for v in salary_sorted]

bars = ax.bar(depts_sorted, salary_sorted, color=colors,
              edgecolor='white', linewidth=1.2)

# 柱顶标签 + 高亮最大值
for i, v in enumerate(salary_sorted):
    color = '#c0392b' if v == salary_sorted.max() else 'black'
    ax.text(i, v + 800, f'${v:,}', ha='center', va='bottom',
            color=color, fontweight='bold')

# 均值线 + 结论注释
mean_s = salary_sorted.mean()
ax.axhline(mean_s, color='grey', linestyle='--', alpha=0.7)
ax.annotate(f'Mean ${mean_s:,.0f}', xy=(2, mean_s),
            xytext=(2.6, mean_s + 7000), arrowprops=dict(arrowstyle='->'))

# 颜色条 + 轴标签 + 标题
sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)
sm.set_array(salary_sorted)
fig.colorbar(sm, ax=ax, label='Salary (USD)')
ax.set_title('USA College Graduate Salary 2025', fontweight='bold', fontsize=14)
ax.set_ylabel('Salary (USD)')
ax.set_ylim(0, salary_sorted.max() * 1.25)
ax.grid(True, axis='y', linestyle='--', alpha=0.4)

# 高清导出且不丢背景
fig.savefig('EIE1005_StudentID_Workshop_01_B.png', dpi=300,
            bbox_inches='tight', facecolor=fig.get_facecolor())
```

---

**逐行 walkthrough（①②③…对应脚本里的注释）**：

> 📖 译注 · 逐条：
> - ①② `fig.patch` + `ax.set_facecolor`：两层背景，导出时还要 `facecolor=fig.get_facecolor()`。
> - ③④ `argsort` 排序 + `cmap/norm/colors`：数值越大颜色越亮（见 §4.3）。
> - ⑤ `edgecolor='white'`：柱间白色描边，深色背景也不糊。
> - ⑥⑦ `ax.text` 柱顶标签 + 最大柱标红：直接满足「No Overlaps」与「讲结论」。
> - ⑧ `axhline(mean)`：均值参考线；`annotate` 用箭头把「Mean」文字指过去。
> - ⑨ `ScalarMappable + colorbar`：颜色条图例（见 §4.4）。
> - ⑩ `set_ylim(0, max*1.25)`：顶部留 25% 空间放标签；从 0 开始避免误导。
> - ⑪ `savefig(dpi=300, bbox_inches='tight', facecolor=...)`：高清、裁边、不丢背景。

---

## 八、交互式图表拓展（逐条 + 迷你代码）

> 🧠 拓展（自主补充，检索于 2026-09-23）：作业要求 `.py` + 静态 PNG 即可；交互只是加分项。

**Matplotlib**（静态、出版级、完全可控）

```python
import matplotlib.pyplot as plt
plt.plot(x, y)          # 画完是死图；plt.show() 弹窗可缩放但不可导出交互
```

**Plotly**（悬停 / 缩放 / 下钻 / 旭日 / 瀑布原生）

```python
import plotly.express as px

fig = px.bar(x=depts, y=salary, color=salary,   # ① color=数值 → 自动渐变+颜色条
             title='USA College Graduate Salary 2025')
fig.show()        # ② 打开交互页面：悬停看值、框选缩放、右上角导出
```

> 📖 译注 · 逐条：`px.bar` 一行完成「数值渐变着色 + 颜色条」，比 Matplotlib 的 Normalize 三件套省事；`fig.show()` 在浏览器打开。坑：需要 `pip install plotly`；导出静态图用 `fig.write_image(...)` 还需装 kaleido。

**pyecharts**（ECharts 的 Python 封装，中文生态）

```python
from pyecharts.charts import Bar

bar = (Bar()
       .add_xaxis(depts)                # ① 横轴类目
       .add_yaxis('Salary', salary))    # ② 数值系列
bar.render('salary.html')               # ③ 生成可交互网页，浏览器打开
```

> 📖 译注 · 逐条：`add_xaxis / add_yaxis` 是链式写法；`render` 输出 HTML。坑：需要 `pip install pyecharts`；交作业仍是 `.py`+PNG，HTML 只作演示。

| 库 | 特点 | 何时用 |
|---|---|---|
| Matplotlib | 静态、出版级、完全可控 | 本次作业、论文图 |
| Plotly | 悬停 / 缩放 / 下钻 / 旭日 / 瀑布原生 | 演示、看板 |
| pyecharts | ECharts 封装，中文生态，30+ 图表 | 中文报告、网页嵌入 |

> 🌐 来源：https://plotly.com/python/ ；https://pyecharts.org/（检索于 2026-09-23）

---

## 九、提交前自查清单（代码化）

- [ ] 数据与 2023 PolyU SAO 一致
- [ ] 每图粗体标题；XY 轴带单位；图例准确；刻度合理
- [ ] 同类目同色；系名完整；三图对齐；无重叠
- [ ] 选型正确（趋势=折线、对比=柱、占比=饼）
- [ ] 配色 ≤3–5 色；异常点已标注；图下有结论
- [ ] 文件名 `EIE1005_StudentID_Workshop_01_B.py`；提交 PolyU Blackboard

## 附录 A · Workshop 1 项目包 22 例分组速查

> 📖 说明：22 个示例的**完整逐行原笔记已并入本页各章节**（骨架见 §3、类型见 §3.5、样式见 §3.4、进阶见 §4–§8），本附录按知识点分组给「最小代码 + 一句讲解」，方便按需翻查；全部 `.py` 完整代码见「📎 原始课件」里的逐文件原文。

### A.1 通用骨架（22 例的前 6 行都一样）

```python
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

fig = plt.figure(figsize=(15, 9))                      # 画布 15x9 英寸
plt.subplots_adjust(top=0.9, bottom=0.1, left=0.1, right=0.95)   # 四周留白
fig.suptitle('Example XX', fontsize=24)                # 整幅总标题
gs = gridspec.GridSpec(1, 1)                           # 1 行 1 列网格
ax1 = fig.add_subplot(gs[0, 0])                        # 建坐标轴 ax1
```

### A.2 数据准备 · Example 01–02

```python
# Example 01 · 手造 DataFrame（不用文件）
df_price = pd.DataFrame({'Year': [2022, 2023, 2024, 2025],
                         'Apple Price': [20, 25, 99, 28],
                         'Orange Price': [16, 18, 20, 26]})

# Example 02 · 从 Excel 读表
df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
```

> 📖 译注：Example 01 手写的 `99` 与 Excel 的 2024 年值不一致，疑似课件笔误；**考试与作业以课件 Excel 为准**。

### A.3 图表类型 · Example 03–10（只改 `kind=`）

```python
df_price.plot(ax=ax1, kind='line', x='Year', y='Apple Price')            # 03 折线
df_price.plot(ax=ax1, kind='line', x='Year')                             # 04 两条线（省 y=画全部列）
df_price.plot(ax=ax1, kind='area', x='Year', y='Apple Price')            # 05 面积
df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')             # 06 柱状
df_price.plot(ax=ax1, kind='barh', x='Year', y='Apple Price')            # 07 横向柱
df_price.plot(ax=ax1, kind='barh', stacked=True, x='Year')               # 08 堆叠柱
df_price.plot(ax=ax1, kind='pie', y='Apple Price', labels=df_price['Year'])  # 09 饼图（无 x=）
df_price.plot(ax=ax1, kind='line', marker='o', x='Year')                 # 10 起止趋势
```

> 📖 译注：`y=` 省略时默认画全部数值列；饼图没有 `x=`，用 `y`（数值）+ `labels`（标签）。

### A.4 图表布局 · Example 11–14（只改 `GridSpec`）

```python
gs = gridspec.GridSpec(1, 1)          # 11 一张图
ax1 = fig.add_subplot(gs[0, 0])

gs = gridspec.GridSpec(1, 2)          # 12 左右两张
ax1 = fig.add_subplot(gs[0, 0]); ax2 = fig.add_subplot(gs[0, 1])

gs = gridspec.GridSpec(2, 2)          # 13 2x2 四张
ax1 = fig.add_subplot(gs[0, 0]); ax2 = fig.add_subplot(gs[0, 1])
ax3 = fig.add_subplot(gs[1, 0]); ax4 = fig.add_subplot(gs[1, 1])

gs = gridspec.GridSpec(2, 2)          # 14 左通栏大图 + 右两小图
ax1 = fig.add_subplot(gs[:, 0])       # 冒号 = 整列合并
ax2 = fig.add_subplot(gs[0, 1]); ax3 = fig.add_subplot(gs[1, 1])
```

> 🔴 考点：`gs[:, 0]` 的冒号是「切片/取整列」，实现通栏大图。

### A.5 样式 · Example 15–19（给 ax1 加细节）

```python
ax1.set_title('Apple Price Over Years')          # 15 子图标题
ax1.set_xlabel('Year')                           # 16 轴标签
ax1.set_ylabel('Price in USD $')
ax1.legend(loc='best')                           # 17 图例（隐藏：legend().set_visible(False)）
ax1.grid(visible=True, axis='x')                 # 18 网格（可只画 x/y 向）
df_price.plot(ax=ax1, kind='bar', x='Year', color=['g', 'y'])   # 19 颜色（一列一色）
```

### A.6 综合与刻度 · Example 20–22

```python
# Example 20 · All in One：骨架 + 多图多类型 + 全部样式合到一个脚本（综合练习）

# Example 21 · X 轴刻度旋转（柱状图标签太长时）
ax1.set_xticklabels(['2022', '2023', '2024', '2025'], rotation=90)

# Example 22 · Y 轴刻度旋转（横向柱状图）
ax1.set_yticklabels(['2022', '2023', '2024', '2025'], rotation=90)
```

**作业空模板**：`EIE1005_Part01_Workshop01_StudentID.py`（Part 01 作业）、`EIE1005_Part02_Workshop02_StudentID.py`（Part 02 作业）——在空模板上按本页技巧补全即可。

**强化练习 3 题**：① 不看笔记默写通用骨架 6 行；② 把 Example 09 饼图改成环形图（加 `wedgeprops`）；③ 用 2×2 GridSpec 画 line/area/bar/pie 四图并统一加标题轴标（即 WS01(B) 雏形）。

---

## 自测（答案折叠）

<details><summary>Q1 四问分别决定什么？</summary>
Q1 图数→GridSpec 布局；Q2 故事→选哪列数据；Q3 类型→API（plot/fill_between/bar、barh/pie）；Q4 样式→标题轴标图例网格颜色。</details>

<details><summary>Q2 看趋势、分类对比、占比、两变量关系各选什么图？</summary>
趋势→折线/面积；分类对比→柱状（≤12）/条形（>12）；占比→饼图（5–9 类）/环形；关系→散点。思路：先定场景再选图。</details>

<details><summary>Q3 给整图加了背景色，导出 PNG 又变白，为什么？</summary>
savefig 默认把画布盖成白色。解法：`fig.savefig(..., facecolor=fig.get_facecolor())`。</details>

<details><summary>Q4 「按数值着色」的三件套是什么？</summary>
colormap + Normalize + ScalarMappable：normalize 把数值压到 0–1，cmap 映射成 RGBA，ScalarMappable 是给 colorbar 用的桥。</details>

<details><summary>Q5 colorbar 报「No mappable was found」怎么修？</summary>
先 `sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)`，再 `fig.colorbar(sm, ax=ax)`。</details>

<details><summary>Q6 「渐变柱」和「按数值着色」有什么区别？</summary>
渐变柱=每根柱内部从底到顶渐变（imshow+extent）；按数值着色=每根柱一个颜色、颜色随数值大小变。</details>

<details><summary>Q7 为什么长系名建议 barh？</summary>
横向柱状图把类目标签放在宽的方向，避免旋转/裁字。</details>

<details><summary>Q8 配色和信息层次有哪些原则？</summary>
≤3–5 色（主色+辅助色+警示色）；同类用深浅；避免红绿强对比；信息分核心（高对比加粗）/支撑（灰）/辅助（小字角落）。</details>

<details><summary>Q9 怎么让图「讲出结论」？</summary>
annotate 标记异常+文字、axhline 加均值/趋势线、图下一句结论、对比拆分（双线/分组柱/分面）。</details>

<details><summary>Q10 `style.use` 与 `style.context` 有什么区别？</summary>
use 全局生效；context 只在 with 块内临时生效。思路：全局 vs 局部。</details>

<details><summary>Q11 自定义 .mplstyle 文件的作用与优点？</summary>
把 rcParams（字体/背景/网格/线条/刻度/savefig.dpi）写进文本文件统一加载；零第三方依赖，交作业最稳。</details>

<details><summary>Q12 图片背景的关键参数是什么？</summary>
`ax.imshow(bg, extent=(0,1,0,1), transform=ax.transAxes, aspect='auto', zorder=0, alpha=0.12)`，并且 `ax.patch.set_alpha(0)` 让绘图区底透明、图线 `zorder=3` 盖在上面。</details>

<details><summary>Q13 水印 `fig.text(0.5, 0.5, ...)` 的坐标是什么意思？</summary>
fig.text 用画布坐标 0~1，(0.5,0.5)=整幅图正中心，与子图数据坐标无关；alpha 调淡、rotation 斜放。</details>

<details><summary>Q14 圆角柱怎么实现？</summary>
原生 bar 不支持圆角，用 `FancyBboxPatch(..., boxstyle='round,pad=0,rounding_size=0.08')` 手画，并同步设置 xlim/ylim。</details>

<details><summary>Q15 Normalize / LogNorm / TwoSlopeNorm / BoundaryNorm 各自什么时候用？</summary>
线性值→Normalize；跨数量级（1→10万）→LogNorm；有正负且以 0 为界→TwoSlopeNorm(vcenter=0)；把值切几档→BoundaryNorm+ListedColormap。</details>

<details><summary>Q16 极坐标背景的三个关键设置？</summary>
`projection='polar'` 建轴、`set_theta_zero_location('N')` 让 0° 朝北、`set_thetagrids/set_rgrids` 设角度与半径网格；`bar(angles, radii, width=)` 画扇形，角度用弧度。</details>

<details><summary>Q17 圆角画布的关键步骤？</summary>
`fig.patch.set_facecolor('none')` 透明底 + `FancyBboxPatch(boxstyle='round,...,rounding_size=...', transform=fig.transFigure, zorder=0)` 圆角底片 + `ax.set_zorder(1)`，导出 `transparent=True`。</details>

<details><summary>Q18 `ax.plot(kind='pie')` 为什么报错？</summary>
`kind` 是 pandas 的 `.plot` 参数，不是 Matplotlib 的；Matplotlib 选图型靠换方法名（plot/bar/barh/pie/scatter）。pandas 写法是 `df.plot(kind='pie', y='col')`，底层仍调 `ax.pie`。</details>

<details><summary>Q19 最小 5 行里每行干什么？</summary>
import=引入画图库；plt.plot(两组等长列表)=连点成线；title=标题；xlabel/ylabel=轴标签；show=显示。缺 show 或列表不等长都会出问题。</details>

<details><summary>Q20 Figure、Axes、Artist 是什么关系？</summary>
Figure=整张画布（一张纸）；Axes=纸上的一个坐标系（可多块）；Artist=坐标系里一切可见元素（线/柱/文字）。一个 Figure 可含多个 Axes，一个 Axes 含多个 Artist。</details>

## 参考来源（本次新增）
> 🌐 你提供的 5 篇参考，2026-09-23 读取状态：
> - ✅ [15 个可视化图表（cnblogs）](https://www.cnblogs.com/fanruan/p/19955941)：已读取，用于 §二选型速查与误区。
> - ✅ [可视化设计与图表配置技巧（FineBI）](https://www.finebi.com/blog/article/68d52cf428946ecca8ed5264)：已读取（含商业推广，仅取设计原则，用于 §二点四/二点五/五）。
- ✅ 用户粘贴文章《Matplotlib 图表美化：内置样式 / qbstyles / matplotx / mplcyberpunk / 自定义 .mplstyle》（2026-09-23 由你提供全文）：已并入 §五主题美化（并修复原文格式错乱与 `dark =Fasle` 笔误）。
> - ⚠️ https://blog.51cto.com/aiweker/13318911：无法访问（页面解析失败），内容未纳入；推测为 pyecharts 指南，等你能访问时补。
> - ⚠️ https://zhuanlan.zhihu.com/p/346416675：403 无法访问，内容未纳入。
> - ⚠️ https://blog.csdn.net/fuhanghang/article/details/128016831：521 无法访问，内容未纳入。
> 🌐 官方来源：Matplotlib Gallery https://matplotlib.org/stable/gallery/index.html ；渐变柱 https://matplotlib.org/stable/gallery/lines_bars_and_markers/gradient_bar.html ；颜色条放置 https://matplotlib.org/stable/users/explain/axes/colorbar_placement.html ；Plotly https://plotly.com/python/ ；pyecharts https://pyecharts.org/ 。

## 更新记录
- 2026-09-24 v8（两篇合并）：W1「06 Python Project Folder」与 WS01(B) 笔记合并为一篇；新增 §零 从零开始（最小 5 行 / 三概念 / 环境 / 报错）；新增附录 A 22 例分组速查；自测增至 20 题；(B) 原文件改为跳转页。
- 2026-09-24 v7.1：§3.6 四种写法改为逐条详解（各含是什么 / 完整代码 / 逐行 / set_ 清单 / 适用 / 坑），新增 `ax.plot(kind=)` 易错点与写法选择表；自测增至 18 题。
- 2026-09-24 v7（整体整合）：合并 §2.6「坑」进 §2.2 三张速查表（补面积图行）；删除 §3.4 并把 API 参数逐条并入 §3.5；重排 3.5→3.4、3.6→3.5、3.7→3.6 并同步交叉引用；skill 同步新增「整体迭代」铁律。
- 2026-09-24 v6.1（阿基米德提问法优化）：§2.6 新增 12 种扩展图完整可运行代码（原 §2.7，v7 重排）；§3.6 新增四种必考图完整代码；§3.7 新增「同一效果四种写法」对照表 + 4 个等价完整脚本（参数内联 / setter / pyplot / pandas）。
- 2026-09-24 v6：应「全部逐条详解 + 尽可能拓展」——§1 新增检查清单逐条拆解、§2 新增每图一条坑、§3 全段重写为逐行+坑、§4.1.1 背景扩到八招（新增对角条纹/极坐标/圆角画布）+示例图、§4.3 新增 Normalize 家族与色带选择、§4.4 新增 colorbar 参数速查与离散色条、§6 重写为 pandas 代码逐条、§7 新增逐行 walkthrough、§8 重写为三库迷你代码；自测增至 17 题。
- 2026-09-23 v5：§五主题美化改为逐条详解（每库按「是什么→逐行→坑」）；§4.1 新增五招个性化背景（双色/三色渐变/图片/水印/角标）；自测增至 14 题。
- 2026-09-23 v4：新增 §五 全局美化（内置风格 / qbstyles / matplotx / mplcyberpunk / 自定义 mplstyle），自测增至 12 题；来源并入用户粘贴文章。
- 2026-09-23 v3（完美版）：新增图表选型决策（§二）、设计美学与结论标注、数据预处理闭环（§五）、完整示例脚本（§六）、交互式图表（§七）、自测扩至 10 题；融合 5 篇用户参考（2 篇成功、3 篇无法访问并标注）。
- 2026-09-23 v2：新增五大主题（整图背景 / 柱状图七种特效 / 数值渐变着色 / 颜色条 / 双轴共享轴等）；P1–P7 原文重新逐页提取回填；避雷清单。
- 2026-09-23 v1：首次整理 + 骨架逐行讲解 + 10 种制图技巧库。
