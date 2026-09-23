# EIE1005 Workshop 1 (B) · To Insight —— 数据可视化进阶代码笔记（高难度）

> 按 note-organizer 规则：课件原文用正文色，后加的讲解/考点/拓展一律用引用块（金色左边框）区分。

## 📎 原始课件
- [Workshop 01 (B) 逐页原文（7页）](files/eie1005/eie1005-ws01b-insight-原文.txt)
- [Canvas 原版 PDF](https://canvas.polyu.edu.hk/courses/4018/files/130047)

## ⏱ 30 秒速览
- 一句话：用 Python 把「USA College Graduate Salary 2025 表格数据」变成讲故事的图表并交到 Blackboard。
- 三个核心结论：① 先答 Q1–Q4（几张图/什么故事/什么类型/什么样式）再写代码；② 每种图都有固定模板；③ 按专业四类清单自查后命名 EIE1005_StudentID_Workshop_01_B.py。

## 一、任务原文（7 页完整保留）
数据集：USA College Graduate Salary 2025 Projection（Table 01–04，Excel 已提供）。
任务：60 分钟内设计图表，提交到 PolyU Blackboard。
检查清单：
1. **Chart Layout**：Q1 画几张图？Q2 数据讲什么故事？Q3 类型（Line/Area/Bar/Pie）？Q4 样式（Title/Label/Legend/Grid/Color）？
2. **Data Accuracy**：数据与 2023 PolyU SAO 数据集一致。
3. **Formatting & Labels**：每图有加粗标题；XY 轴有单位标签；图例可见准确；刻度合理易读。
4. **Visual Presentation**：同类目同色；系名不被裁掉；三图对齐留白均匀；标签不与线/柱重叠。
5. **Final Verification**：文件命名 EIE1005_StudentID_Workshop_01_B.py。

## 二、实现 PPT 全部效果的进阶代码

> 📖 译注（源自第 6–7 页 + 官方文档）：先建立「一图一 ax」的面向对象写法，再用 GridSpec 排布 1–4 张图。

```python
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

df = pd.read_excel('salary.xlsx', sheet_name=None)   # 多表一起读
fig = plt.figure(figsize=(16, 9))
gs = gridspec.GridSpec(2, 2)                          # 最多 4 图

ax1 = fig.add_subplot(gs[0, 0])   # Line
ax2 = fig.add_subplot(gs[0, 1])   # Area
ax3 = fig.add_subplot(gs[1, 0])   # Bar
ax4 = fig.add_subplot(gs[1, 1])   # Pie

# 折线
ax1.plot(df['t1']['year'], df['t1']['salary'], marker='o', linewidth=2)
# 面积（alpha 叠透明度）
ax2.fill_between(x, y, alpha=0.3); ax2.plot(x, y, color='g')
# 柱状（横向避免长系名被裁）
ax3.barh(y=names, width=values, color='#1f77b4')
# 饼图（百分比标签）
ax4.pie(values, labels=names, autopct='%1.1f%%', startangle=90)
```

> 🔴 考点（源自第 7 页）：Q3 的四种类型对应 API——Line=plot()、Area=fill_between()+plot()、Bar=bar()/barh()、Pie=pie(autopct=)。

### 样式清单 → 代码（Q4）
```python
ax.set_title('USA Graduate Salary 2025', fontweight='bold', fontsize=13)
ax.set_xlabel('Year'); ax.set_ylabel('Salary (USD)')
ax.legend(loc='best', frameon=False)
ax.grid(True, linestyle='--', alpha=0.5)
ax.set_facecolor('#fafafa')
fig.subplots_adjust(wspace=0.35, hspace=0.4)   # 三图对齐、留白均匀
fig.savefig('EIE1005_StudentID_Workshop_01_B.png', dpi=300, bbox_inches='tight')
```

> 🧠 拓展（基础拓展）：bbox_inches='tight' 防止标签被裁；barh 比 bar 更适合长文本类目。

## 三、高难度拓展（强学习者）
```python
# 1) 双轴：薪资 + 增长率
ax1b = ax1.twinx()
ax1b.plot(year, growth, color='r', linestyle=':')
ax1b.set_ylabel('Growth %')

# 2) 子图间共享轴
fig2, (a, b) = plt.subplots(2, 1, sharex=True, figsize=(12, 8))

# 3) 标注关键点 + 误差棒
ax1.annotate('Peak', xy=(2025, peak), xytext=(2020, peak*0.9),
             arrowprops=dict(arrowstyle='->'))
ax1.errorbar(x, y, yerr=err, capsize=3)

# 4) 更现代的 mosaic 布局
fig3, axd = plt.subplot_mosaic('AB;CC', figsize=(14, 8))
```

> 🧠 拓展（进阶拓展）：twinx 双轴要写明颜色对应关系；sharex 让多图缩放联动；subplot_mosaic 用字符串描述布局（A/B/C 为格名），比 GridSpec 更直观。
> 🌐 来源：Matplotlib 官方教程 https://matplotlib.org/stable/（检索于 2026-09-23）

## 四、提交前自查清单（代码化）
- [ ] 数据来源一致（2023 PolyU SAO）
- [ ] 每图标题加粗；XY 轴带单位；图例准确
- [ ] 同类目同色；系名完整；三图对齐
- [ ] 文件名 EIE1005_StudentID_Workshop_01_B.py
- [ ] 提交到 PolyU Blackboard

## 五、自测（≥5 题）

<details><summary>Q1 四种图对应的 Matplotlib API？</summary>
Line=plot()；Area=fill_between()+plot()；Bar=bar()/barh()；Pie=pie()。思路：名称即方法。易错：面积图忘叠加透明度。</details>

<details><summary>Q2 为什么长系名建议 barh？</summary>
横向柱状图给类目留更宽的标签空间，避免旋转/裁切。思路：标签长度决定方向。</details>

<details><summary>Q3 subplots_adjust 在这里的作用？</summary>
控制子图间距与四周边距，让三图对齐、留白均匀。思路：纯排版。</details>

<details><summary>Q4 twinx 双轴的坑？</summary>
两套 y 轴易读混——必须用颜色/图例对应两条线。思路：一轴一线一颜色。</details>

<details><summary>Q5 提交文件名是什么？</summary>
EIE1005_StudentID_Workshop_01_B.py。思路：按规范命名是检查清单硬指标。</details>

## 更新记录
- 2026-09-23 补：模板逐行讲解 + 联网检索的 10 种制图效果与技巧（官方 Gallery）。
- 2026-09-23 首次整理：Canvas 文件 130047（Workshop 01 B），逐页保留 7 页，代码讲解 + 高难度拓展。

## 二点五、模板代码逐行讲解

> 📖 译注 · 逐行（对应上文模板）：
> - `import pandas as pd`：pandas 读表格数据（Excel/CSV）。
> - `df = pd.read_excel('salary.xlsx', sheet_name=None)`：一次读入所有工作表，返回 {表名: DataFrame} 字典；`sheet_name=None` 表示“全部表”。
> - `fig = plt.figure(figsize=(16, 9))`：新建画布 Figure，宽 16 英寸、高 9 英寸（16:9，适合演示）。
> - `gs = gridspec.GridSpec(2, 2)`：把画布切成 2 行 2 列的网格，返回网格规划表 gs。
> - `ax1 = fig.add_subplot(gs[0, 0])`：把第 0 行第 0 列的格子变成坐标轴对象 ax1；其余 ax2/ax3/ax4 同理。
> - `ax1.plot(x, y, marker='o', linewidth=2)`：在 ax1 上画折线；marker 描点、linewidth 线宽。
> - `ax2.fill_between(x, y, alpha=0.3)`：把曲线与 x 轴之间的区域填色，alpha 控制透明度（0 透明 ~1 不透明）。
> - `ax3.barh(y=names, width=values, color='#1f77b4')`：横向柱状图；y 是类目、width 是数值，'#1f77b4' 是十六进制颜色。
> - `ax4.pie(values, labels=names, autopct='%1.1f%%', startangle=90)`：饼图；autopct 显示百分比（保留 1 位小数）、startangle 从 90° 起画。
> - `fig.subplots_adjust(wspace=0.35, hspace=0.4)`：横向间距 0.35、纵向间距 0.4（占子图平均宽/高比例），防止标签重叠。
> - `fig.savefig('x.png', dpi=300, bbox_inches='tight')`：导出 PNG，300 dpi 高清，tight 裁掉多余白边。

## 二点六、效果与技巧库（联网检索 · 检索于 2026-09-23）

> 🧠 拓展 · 每种技巧：左=效果，右=一句话实现，细节见官方 Gallery。

1. **环形图 Donut**：饼图挖空中心 → `wedgeprops=dict(width=0.4)` 或嵌套 `pie()` 两次。
2. **水平柱状分布图**：长类目 → `ax.barh()`，类目标签完整不被裁。
3. **堆叠面积图 / 流图 Stackplot**：多系列累计 → `ax.stackplot(x, y1, y2, labels=[...])`。
4. **渐变柱状图 Gradient bar**：柱体填渐变 → 用 `imshow` + `clip_path` 或分段色块。
5. **误差带**：数据不确定区间 → `ax.fill_between(x, y-err, y+err, alpha=0.2)`。
6. **双轴 Twinx**：两个量纲同图 → `ax2 = ax1.twinx()`，右轴独立。
7. **共享轴**：多图联动缩放 → `plt.subplots(2, 1, sharex=True)`。
8. **Mosaic 布局**：字符串描述网格 → `plt.subplot_mosaic('AB;CC')`。
9. **自动排版**：`constrained_layout=True` 或 `fig.tight_layout()`，连颜色条/大标题都自动避让。
10. **统一风格**：`plt.rcParams` 预设字体/线宽/网格，或选内置风格 `plt.style.use('seaborn-v0_8')`。

> 🌐 来源：Matplotlib 官方 Gallery https://matplotlib.org/stable/gallery/index.html ；环形/嵌套饼图 https://matplotlib.org/stable/gallery/pie_and_polar_charts/nested_pie.html ；水平柱状分布 https://matplotlib.org/stable/gallery/lines_bars_and_markers/horizontal_barchart_distribution.html ；堆叠图 https://matplotlib.org/stable/gallery/lines_bars_and_markers/stackplot_demo.html（检索于 2026-09-23）
