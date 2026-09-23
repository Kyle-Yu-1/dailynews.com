# EIE1005 · Workshop 01 (B)「To Insight」数据可视化完全笔记（v5 完美版）

> 按 note-organizer 规则：课件原文用正文色，后加讲解 / 考点 / 拓展一律用引用块（金色左边框）。本版（v5）在 v4 基础上把「主题美化库」改为逐条详解、把「整图背景」扩成五招个性化背景，并融合你提供的参考（见 §参考来源）。

## 📎 原始课件
- 逐页原文（7 页，2026-09-23 重新逐页提取）：`行业日报/files/eie1005/eie1005-ws01b-insight-原文.txt`
- Canvas 原版 PDF：https://canvas.polyu.edu.hk/courses/4018/files/130047
- 数据：USA College Graduate Salary 2025 Projection（Table 01–04，Excel 已提供）

## ⏱ 30 秒速览

> 连环追问：是什么 → 为什么 → 怎么做 → 有什么用。

**① 这是什么？**
一句话：把「USA College Graduate Salary 2025」Excel 数据在 60 分钟内做成 1–4 张「讲得出故事」的图表，交到 PolyU Blackboard，文件名 `EIE1005_StudentID_Workshop_01_B.py`。

**② 为什么学？**
这是 Workshop 1 的第二份作业，重点不在「会画」，而在「按专业标准自查」：数据一致、标签齐全、颜色一致、对齐无重叠。

**③ 怎么做？——先选图、再画图、最后润色（三阶段）**
- 选图（§二）：按「趋势 / 对比 / 占比 / 分布」定图表类型；Q3 只考四种（Line/Area/Bar/Pie），但思路通用。
- 画图（§三、§四）：骨架 `import → figure → GridSpec → add_subplot → read_excel → 画图 → 保存`；五大进阶特效 = 整图背景、柱状图特效、数值渐变着色、颜色条、双轴等。
- 润色（§2.5、§六）：配色 ≤3–5 色、信息分三层、标记异常与均值线、图下一句结论；一键换肤见 §五主题库。再自查导出。

**④ 学完能干什么？**
交出「选型正确 + 数值着色 + 颜色条 + 自定义背景 + 结论标注」的高分图，逐项过掉 P7 的四类专业检查清单。

**三条结论（闭卷能复述才算记住）**
1. 四问定框架：Q1 图数、Q2 故事、Q3 类型、Q4 样式。
2. 选型四场景：趋势→折线/面积、分类对比→柱/条形、占比→饼/环形、分布关系→散点/热力。
3. 颜色三件套：`colormap + Normalize + ScalarMappable` 是「按数值着色 + 颜色条」的通用套路；背景两层 `fig.patch` / `ax.set_facecolor`，导出要带 `facecolor`。

**关键词**：Figure、Axes、GridSpec、图表选型、style、mplstyle、主题库、colormap、Normalize、ScalarMappable、colorbar、facecolor、edgecolor、hatch、bar_label、annotate、twinx、sharex、subplot_mosaic、savefig。

## 前置 / 后接
- 前置：Workshop 1「数据可视化 Python 代码逐行讲解」（06 Python Project Folder，22 个示例）。
- 后接：Test 1；三次 Workshop 总览与报告高分清单。

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

## 二、先选对图，再画好图（图表选型决策 · 综合参考）

> 🧠 拓展（用户提供参考，检索于 2026-09-23）：课件 Q3 只给四种类型（Line/Area/Bar/Pie），但真正的选型按「**比较 / 构成 / 分布与联系**」四类场景走。原则是「场景驱动」而非「工具驱动」。

### 2.1 四步选型流程

| 步骤 | 操作 | 关键问题 |
|---|---|---|
| 1 | 明确分析目标 | 看趋势 / 对比 / 占比 / 分布 / 关联？ |
| 2 | 梳理数据结构 | 有多少类别？连续时间还是离散分类？ |
| 3 | 匹配图表形式 | 哪种形式最直观？ |
| 4 | 检查量级与空间 | 条目太多 / 页面放不下时换横向或分组 |

### 2.2 高频图表速查表（15+ 种）

**比较类（比大小、比多少）**

| 图 | 适用场景 | 要点 | Matplotlib 实现 |
|---|---|---|---|
| 柱状图 | 5–12 个条目对比 | 柱宽适中、间距别太空；数值标柱顶 | `ax.bar(x, y)` + `bar_label` |
| 条形图 | 条目 >12 | 横过来不挤 | `ax.barh(y, width)` |
| 折线图 | 看趋势 | >20 个点时缩小 marker、加粗线 | `ax.plot(..., marker='o', linewidth=2)` |
| 南丁格尔玫瑰图 | 数值差距小时放大差异 | 扇形面积 ∝ 半径² | 极坐标：`ax=plt.subplot(projection='polar'); ax.bar(theta, r)` |
| 双向条形图 | 正反 / 收支对比 | 以中心轴为界分左右 | 两组 `barh`，一组取负值 |
| 子弹图 | 实际 vs 目标 vs 预警区间 | 一眼看达标情况 | 无原生，用堆积 `barh` + 标线模拟 |
| 雷达图 | 多维评估（≤8 维） | 面积越大综合越强 | `plt.subplot(projection='polar')` 多边形 |

**构成类（部分与整体）**

| 图 | 适用场景 | 要点 | Matplotlib 实现 |
|---|---|---|---|
| 饼图 | 5–9 类占比 | >9 类把小的合并成 Other；**别加 3D** | `ax.pie(..., autopct=)` |
| 环形图 | 占比 + 中心放标题 | 空间利用率高 | `wedgeprops=dict(width=0.4)` |
| 旭日图 | 大区→城市→门店多层构成 | 层层下钻 | 无原生，Plotly `sunburst` 或嵌套 `pie` |
| 堆叠面积图 | 连续时间的构成变化 | ≤5 层；最重要的放最底层 | `ax.stackplot(x, y1, y2)` |
| 堆叠柱状图 | 离散分类的构成 | 每柱=一年，内部堆叠 | `ax.bar(..., bottom=)` |
| 瀑布图 | 增减过程（净利 100→70） | 正负用不同颜色 | 无原生，手动 `bottom=cumsum` 或 Plotly `waterfall` |

**分布与联系类（找规律、找关系）**

| 图 | 适用场景 | 要点 | Matplotlib 实现 |
|---|---|---|---|
| 散点图 | 两个变量的关系 | 加两条均值线分四象限 | `ax.scatter(x, y)` |
| 气泡图 | 三个变量（第三维=大小） | 气泡大=体量大 | `ax.scatter(x, y, s=size)` |
| 热力图 | 区域密度分布 | 用蓝→红单色渐变，别用彩虹 | `ax.imshow(z, cmap=)` |
| 箱线图 | 分布与离群点 | 中位数 / 四分位 / 异常值 | `ax.boxplot(data)` |

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

## 三、通用骨架逐行讲解

```python
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

df = pd.read_excel('salary.xlsx', sheet_name=None)   # 一次读全部工作表 -> {表名: DataFrame}
fig = plt.figure(figsize=(16, 9))                    # 整张画布，16:9（英寸）
gs = gridspec.GridSpec(2, 2)                         # 2x2 网格规划表（只规划、不画）
ax1 = fig.add_subplot(gs[0, 0]); ax2 = fig.add_subplot(gs[0, 1])
ax3 = fig.add_subplot(gs[1, 0]); ax4 = fig.add_subplot(gs[1, 1])

ax1.plot(x, y, marker='o', linewidth=2)              # Line：折线 + 数据点 + 线宽
ax2.fill_between(x, y, alpha=0.3); ax2.plot(x, y, color='g')   # Area：填色 + 描线
ax3.barh(y=names, width=values, color='#1f77b4')     # Bar：长系名用横向避免裁字
ax4.pie(values, labels=names, autopct='%1.1f%%', startangle=90)  # Pie：百分比标签
```

> 📖 译注 · 逐行：
> - `import pandas as pd`：pandas 读表格（Excel/CSV）。
> - `read_excel(..., sheet_name=None)`：`None` 表示读全部工作表，返回 `{表名: DataFrame}` 字典。
> - `plt.figure(figsize=(16, 9))`：新建画布 Figure，宽 16、高 9 英寸。
> - `gridspec.GridSpec(2, 2)`：把画布切成 2 行 2 列，返回网格规划表 `gs`。
> - `fig.add_subplot(gs[r, c])`：把第 r 行第 c 列的格子变成坐标轴对象；ax1–ax4 同理。
> - `plot(marker='o', linewidth=2)`：marker 描点、linewidth 线宽。
> - `fill_between(..., alpha=0.3)`：把曲线与 x 轴之间填色，alpha 0=全透明、1=不透明。
> - `barh(y=names, width=values)`：横向柱状图，y 是类目、width 是数值；`'#1f77b4'` 是十六进制颜色。
> - `pie(autopct='%1.1f%%', startangle=90)`：百分比保留 1 位小数、从 90° 起画。

**Q4 样式清单 → 代码**

```python
ax.set_title('USA Graduate Salary 2025', fontweight='bold', fontsize=13)
ax.set_xlabel('Year'); ax.set_ylabel('Salary (USD)')
ax.legend(loc='best', frameon=False)
ax.grid(True, linestyle='--', alpha=0.5)
fig.subplots_adjust(wspace=0.35, hspace=0.4)   # 子图横/纵向间距，防标签重叠
fig.savefig('EIE1005_StudentID_Workshop_01_B.png', dpi=300, bbox_inches='tight')
```

> 📖 译注：`subplots_adjust(wspace,hspace)` 的数值是「占子图平均宽/高的比例」；`bbox_inches='tight'` 裁掉多余白边、防标签被切；`dpi=300` 高清。

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

#### 4.1.1 个性化背景进阶（五招，逐条）

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
| 需要个性化背景 | 见 §4.1.1 五招（渐变 / 图片 / 水印 / 角标） |

---

## 六、数据预处理与优化闭环


> 🧠 拓展（用户提供参考，检索于 2026-09-23）：不要拿原始数据直接作图，先预处理。

| 步骤 | 操作 | 工具 |
|---|---|---|
| 清洗 | 去异常值 / 重复值、补缺失值 | pandas |
| 结构调整 | 统一字段名、格式、时间维度 | pandas |
| 聚合 | 按月 / 季度 / 部门汇总 | `groupby()` |
| 分组 | 区分维度（横轴）与度量（纵轴） | DataFrame 取列 |

**优化闭环六步**：① 二次检查数据与公式 → ② 视觉增量（色彩/布局/标签）→ ③ 信息补充（趋势线、均值线、同比/环比）→ ④ 交互（筛选、联动，可选）→ ⑤ 收反馈迭代 → ⑥ 定稿导出。

> 🌐 来源：用户提供的参考 5，检索于 2026-09-23（商业博客，概念参考，代码以官方文档为准）。

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

## 八、交互式图表拓展（自主补充）

> 🧠 拓展（自主补充，检索于 2026-09-23）：作业要求 `.py` + 静态 PNG 即可；交互只是加分项。

| 库 | 特点 | 何时用 |
|---|---|---|
| Matplotlib | 静态、出版级、完全可控 | 本次作业、论文图 |
| Plotly | 悬停 / 缩放 / 下钻 / 旭日 / 瀑布原生 | 演示、看板 |
| pyecharts | ECharts 的 Python 封装，中文生态，30+ 图表 | 中文报告、网页嵌入 |

> 🌐 来源：https://plotly.com/python/ ；https://pyecharts.org/（检索于 2026-09-23）

---

## 九、提交前自查清单（代码化）

- [ ] 数据与 2023 PolyU SAO 一致
- [ ] 每图粗体标题；XY 轴带单位；图例准确；刻度合理
- [ ] 同类目同色；系名完整；三图对齐；无重叠
- [ ] 选型正确（趋势=折线、对比=柱、占比=饼）
- [ ] 配色 ≤3–5 色；异常点已标注；图下有结论
- [ ] 文件名 `EIE1005_StudentID_Workshop_01_B.py`；提交 PolyU Blackboard

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
- 2026-09-23 v5：§五主题美化改为逐条详解（每库按「是什么→逐行→坑」）；§4.1 新增五招个性化背景（双色/三色渐变/图片/水印/角标）；自测增至 14 题。
- 2026-09-23 v4：新增 §五 全局美化（内置风格 / qbstyles / matplotx / mplcyberpunk / 自定义 mplstyle），自测增至 12 题；来源并入用户粘贴文章。
- 2026-09-23 v3（完美版）：新增图表选型决策（§二）、设计美学与结论标注、数据预处理闭环（§五）、完整示例脚本（§六）、交互式图表（§七）、自测扩至 10 题；融合 5 篇用户参考（2 篇成功、3 篇无法访问并标注）。
- 2026-09-23 v2：新增五大主题（整图背景 / 柱状图七种特效 / 数值渐变着色 / 颜色条 / 双轴共享轴等）；P1–P7 原文重新逐页提取回填；避雷清单。
- 2026-09-23 v1：首次整理 + 骨架逐行讲解 + 10 种制图技巧库。
