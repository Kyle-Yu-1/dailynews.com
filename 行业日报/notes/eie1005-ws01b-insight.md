# EIE1005 · Workshop 01 (B)「To Insight」数据可视化进阶笔记（重写版）

> 按 note-organizer 规则：课件原文用正文色，后加讲解 / 考点 / 拓展一律用引用块（金色左边框）。本版参考 Workshop 1「Python 项目文件夹」笔记的结构全量重写：30 秒速览 → 任务与检查清单 → 骨架逐行讲解 → 五大进阶主题（整图背景 / 柱状图特效 / 数值渐变着色 / 颜色条 / 双轴等）→ 自测。

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

**③ 怎么做？——一个骨架 + 四个开关 + 五大进阶特效**
- 骨架：`import` → `figure` → `GridSpec` → `add_subplot` → `read_excel` → 画图 → 保存。
- 开关一 · 类型：Q3 的 Line / Area / Bar / Pie = `plot` / `fill_between+plot` / `bar`+`barh` / `pie`。
- 开关二 · 布局：Q1 的 1–4 张图 = `GridSpec(行,列)` + `gs[行,列]`。
- 开关三 · 样式：Q4 = `set_title / set_xlabel / set_ylabel / legend / grid / color`。
- 开关四 · 背景：`fig.patch.set_facecolor`（整张画布）/ `ax.set_facecolor`（单图区）/ `savefig(facecolor=…)`（导出不丢底色）。
- 五大进阶特效：① 整图背景（含渐变）② 柱状图特效 ③ 按数值渐变着色 ④ 颜色条图例 ⑤ 双轴 / 共享轴 / 误差带等。

**④ 学完能干什么？**
交出「带标题轴标图例网格 + 数值渐变着色 + 颜色条 + 自定义背景」的高分图，并逐项过掉 P7 的四类专业检查清单。

**三条结论（闭卷能复述才算记住）**
1. 四问定框架：Q1 决定图数、Q2 决定讲什么故事、Q3 决定 API、Q4 决定样式。
2. 颜色三件套：`colormap`（色带）+ `Normalize`（数值归一化）+ `ScalarMappable`（喂给 colorbar 的桥），是「按数值着色 + 颜色条」的通用套路。
3. 背景有两层：`fig.patch` 管整张画布底、`ax.set_facecolor` 管每个子图底；**导出 PNG 还要 `facecolor` 参数，否则背景又变白**。

**关键词**：Figure、Axes、GridSpec、colormap、Normalize、TwoSlopeNorm、ScalarMappable、colorbar、facecolor、edgecolor、hatch、bar_label、gradient、twinx、sharex、subplot_mosaic、savefig。

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

> 🔴 考点（源自第 7 页）：四类清单 = 四个评分维度。Q3 的四种类型与 Matplotlib API 一一对应（见 §二）；「同类目同色」「系名不被裁」「标签不重叠」三条最容易丢分。

### 1.3 四问 → 代码映射表

| 问 | 决定什么 | 对应代码 |
|---|---|---|
| Q1 几张图 | 画布布局 | `GridSpec(行,列)` + `fig.add_subplot(gs[r,c])` |
| Q2 什么故事 | 选哪些列 / 表 | `df['表名']['列名']` |
| Q3 什么类型 | 画图 API | `plot / fill_between / bar、barh / pie` |
| Q4 什么样式 | 装饰 | `set_title… / legend / grid / color / facecolor` |

---

## 二、通用骨架逐行讲解

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

## 三、主题一 · 给整张图加背景（重点新增）

> 🧠 拓展（外部资料，检索于 2026-09-23）：Matplotlib 背景分两层——**figure**（整张画布，含子图之间与四周）和 **axes**（每张子图的绘图区）。两层各设各的。

```python
fig = plt.figure(figsize=(16, 9))
fig.patch.set_facecolor('#f2f2f7')      # ① 整张画布底色
ax = fig.add_subplot(111)
ax.set_facecolor('#fffdf5')             # ② 单个坐标区底色（只盖绘图区）

# ③ 导出坑：savefig 默认把背景盖成白色，必须显式带上 facecolor：
fig.savefig('out.png', dpi=300, facecolor=fig.get_facecolor())
```

> 📖 译注：只想「全图统一底色」时，`fig.patch.set_facecolor` 与 `savefig(facecolor=…)` 必须成对；也可全局写 `plt.rcParams['savefig.facecolor'] = '#f2f2f7'`。

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
> 📖 译注：`cmap_range=(0.2, 0.8)` 只取色带中间一段、避开两端太艳；`alpha=0.5` 是半透明，别盖住图线。要点：背景渐变用「imshow 铺图 + transAxes 坐标」，不是给 figure 填色。

---

## 四、主题二 · 柱状图特殊效果（重点新增）

基础命令与七种特效：

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

> 📖 译注：
> - 排序降序：先 `df.sort_values('salary', ascending=False)` 再画，视觉从高到低更「讲得出故事」。
> - `bar_label` 直接对应检查清单的「No Overlaps / 标签齐全」；标签顶到柱顶时把 `ylim` 上限放宽留白。
> - `FancyBboxPatch` 是手动画矩形，记得同步设置 `xlim/ylim`，否则圆角柱显示不全。
> - `hatch`、`edgecolor` 对黑白打印 / 色弱友好，是「Visual Presentation」加分项。

> 🔴 考点：`bar_label`（标签）、`yerr+capsize`（误差）、`edgecolor`（描边）三组参数名要能默写。

---

## 五、主题三 · 每个柱子按数值大小映射渐变色（重点新增）

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

> 📖 译注：`norm(v)` 把 v 压缩到 0–1，`cmap(0..1)` 返回该位置的 RGBA 颜色。`vmin/vmax` 用数据 min/max 时「最小柱最紫、最大柱最黄」对比最强；想反映绝对量级就固定 `vmin=0`。

**两种常用变化**
- 单色由浅到深：`cmap = plt.get_cmap('Blues')`，数值越大越深，风格克制、适合正式报告。
- 正负发散色带（增长/下降一眼看出）：

```python
cmap = plt.get_cmap('RdYlGn')                 # 红→黄→绿
norm = mcolors.TwoSlopeNorm(vmin=-10, vcenter=0, vmax=10)
colors = [cmap(norm(v)) for v in growth]      # 负值红、0 黄、正值绿
```

> 🧠 拓展：`TwoSlopeNorm(vcenter=0)` 把 0 钉在色带中点（黄色），正负两侧颜色对称，是「增长率」图的标配。

---

## 六、主题四 · 添加渐变色示意图（颜色条 colorbar）

> 🧠 拓展（外部资料，检索于 2026-09-23）：柱状图本身没有图像 mappable，需用 `ScalarMappable` 造一座「同 cmap + 同 norm」的桥，再喂给 `fig.colorbar`。

```python
sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)
sm.set_array(values)                          # 让 colorbar 知道数值范围

fig.colorbar(sm, ax=ax, label='Salary (USD)')            # 默认右侧竖条
fig.colorbar(sm, ax=ax, orientation='horizontal',        # 顶部横条
             location='top', shrink=0.7, aspect=25,
             label='Salary (USD)')
```

> 📖 译注：`shrink` 缩短长度、`aspect` 控制粗细、`location` 放上/下/左/右。颜色条就是「渐变色示意图 + 数值标尺」，让读图者知道「颜色 = 数值」的对应关系。旧版 Matplotlib（<3.6）若报 `set_array` 相关错误，可改用 `sm.set_array([])`。

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
> 📖 译注 · 别混：**主题三 = 每根柱一个颜色（颜色随数值变）；本实现 = 每根柱内部从底到顶渐变**。两种都是「渐变色」，但实现与用途不同。

---

## 七、主题五 · 自主补充更多（高难度拓展 + 技巧库）

### 7.1 高难度组合

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

> 🧠 拓展：`twinx` 两套 y 轴必须用颜色/图例把线与轴对应起来；`sharex` 多图缩放联动；`subplot_mosaic` 用字符串描述布局（A/B/C 是格名），比 GridSpec 更直观。

### 7.2 效果与技巧库（联网检索 · 检索于 2026-09-23）

| # | 效果 | 一句话实现 |
|---|---|---|
| 1 | 环形图 Donut | `wedgeprops=dict(width=0.4)` |
| 2 | 水平柱状分布图 | `ax.barh()` |
| 3 | 堆叠面积 / 流图 | `ax.stackplot(x, y1, y2)` |
| 4 | 渐变柱 | `imshow` + 双三次插值（见 §六） |
| 5 | 误差带 | `fill_between(..., alpha=0.2)` |
| 6 | 双轴 | `ax.twinx()` |
| 7 | 共享轴 | `subplots(2, 1, sharex=True)` |
| 8 | Mosaic 布局 | `plt.subplot_mosaic('AB;CC')` |
| 9 | 自动排版 | `constrained_layout=True` / `tight_layout()` |
| 10 | 统一风格 | `plt.rcParams` / `plt.style.use('seaborn-v0_8')` |

> 🌐 来源：Matplotlib 官方 Gallery https://matplotlib.org/stable/gallery/index.html ；颜色条放置说明 https://matplotlib.org/stable/users/explain/axes/colorbar_placement.html（检索于 2026-09-23）

### 7.3 常见坑（避雷清单）

| 症状 | 原因与解法 |
|---|---|
| 导出后背景又变白 | `savefig` 默认白底 → 加 `facecolor=fig.get_facecolor()` |
| 长系名被裁 | 用 `barh()` 或 `tight_layout()` |
| colorbar 报 `No mappable was found` | 先建 `ScalarMappable(cmap=…, norm=…)` |
| 标签与柱重叠 | `bar_label` 的 `padding` + 放大 `ylim` 上限 |

---

## 八、提交前自查清单（代码化）

- [ ] 数据与 2023 PolyU SAO 一致
- [ ] 每图粗体标题；XY 轴带单位；图例准确；刻度合理
- [ ] 同类目同色；系名完整；三图对齐；无重叠
- [ ] 文件名 `EIE1005_StudentID_Workshop_01_B.py`；提交 PolyU Blackboard

## 自测（答案折叠）

<details><summary>Q1 四问分别决定什么？</summary>
Q1 图数→GridSpec 布局；Q2 故事→选哪列数据；Q3 类型→API（plot/fill_between/bar、barh/pie）；Q4 样式→标题轴标图例网格颜色。思路：四问=布局/数据/API/装饰。</details>

<details><summary>Q2 给整图加了背景色，导出 PNG 又变白，为什么？</summary>
savefig 默认把画布盖成白色。解法：`fig.savefig(..., facecolor=fig.get_facecolor())`。易错：只改 fig 不改 savefig。</details>

<details><summary>Q3 「按数值着色」的三件套是什么？</summary>
colormap + Normalize + ScalarMappable。normalize 把数值压到 0–1，cmap 映射成 RGBA，ScalarMappable 是给 colorbar 用的桥。</details>

<details><summary>Q4 colorbar 报「No mappable was found」怎么修？</summary>
柱状图没有自带 mappable，先 `sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)`，再 `fig.colorbar(sm, ax=ax)`。</details>

<details><summary>Q5 「渐变柱」和「按数值着色」有什么区别？</summary>
渐变柱=每根柱内部从底到顶渐变（imshow+extent）；按数值着色=每根柱一个颜色、颜色随数值大小变（Normalize+cmap）。思路：一根一个色 vs 一根内部渐变色。</details>

<details><summary>Q6 为什么长系名建议 barh？</summary>
横向柱状图把类目标签放在宽的方向，避免旋转/裁字。思路：标签长度决定柱的方向。</details>

<details><summary>Q7 TwoSlopeNorm 用来干什么？</summary>
把 vcenter 钉在色带中点（如 0=黄色），正负两侧颜色对称，适合增长率这类有正有负的数据。</details>

<details><summary>Q8 圆角柱怎么实现？</summary>
原生 bar 不支持圆角，用 `FancyBboxPatch(..., boxstyle='round,pad=0,rounding_size=0.08')` 手画，并同步设置 xlim/ylim。</details>

## 更新记录
- 2026-09-23 重写（v2）：参考 Workshop 1 笔记结构全量重写；新增五大主题（整图背景含渐变 / 柱状图七种特效 / 数值渐变着色 / 颜色条图例 / 双轴共享轴等）；P1–P7 原文重新逐页提取并回填；新增避雷清单。
- 2026-09-23 v1：首次整理 + 骨架逐行讲解 + 10 种制图技巧库。
