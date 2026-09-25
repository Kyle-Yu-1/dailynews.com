# EIE1005 · Workshop 1 数据可视化（v10 · 全对齐 PPT 代码格式）

> 📖 v10 说明（按你的要求重做）：主教学路径的全部代码**与 PPT / 项目文件夹同款格式**——三行 import → `plt.figure + subplots_adjust + suptitle` → `GridSpec + add_subplot` → pandas 读数据 → `df.plot(ax=…, kind=…, x=…, y=…)` → `plt.show()`。每节仍是「完整项目代码 → 逐行拆解 → 输出 → 术语 → 参数 → 易错 → 回扣作业」。其它写法（ax.plot / plt.subplots / pyplot）只放在第 8 步作对照。

## 📎 原始课件
- **01 - Part 01 - From Data.pdf**（133 页，Canvas files/130052）：1.1 什么是数据可视化 / 1.2 环境 / 1.3 数据与显示（22 个示例代码）/ 1.4 Workshop 01 (A)
- **02 - Part 02 - To Insight.pdf**（WS01(B)，Canvas files/130047，7 页）
- **06 - Python Project Folder**（22 个 `.py` + 3 个 Excel；已解压到桌面 `EIE1005`）
- WS01(A) 数据源：PolyU Graduate Employment Survey 2023（SAO 官方 PDF）

## ⏱ 30 秒速览

**① 一句话**：完全按 PPT 的代码格式，从零到交两份作业（WS01(A) + WS01(B)）。

**② 学习路径（按顺序）**

| 步 | 内容 |
|---|---|
| 0.5 | 数据可视化四原则（选对图 / 诚实轴 / 去杂乱 / 一句话结论） |
| 1–3 | PPT 骨架 → 三个概念 → 让图完整 |
| 4 | 四种必考图（每图 PPT 同款完整代码） |
| 5–6 | 一页多图 + pandas 读数据 |
| 7 | 两份作业 A/B 与检查清单 |
| 8 | 四种代码写法对照 |
| 9 | 进阶美化（背景/柱特效/渐变/颜色条/主题） |
| 10 | 作业三版（基础/进阶/炫酷） |

**三条结论**
1. PPT 骨架 = `import → figure → subplots_adjust → suptitle → GridSpec → add_subplot → read_excel → df.plot → show`。
2. `df.plot(ax=ax1, kind=…, x=…, y=…)` 是 PPT 唯一画图写法；`kind` 换 `line/area/bar/barh/pie`。
3. 检查清单四问：Q1 图数、Q2 故事、Q3 类型、Q4 样式。

**关键词**：Figure、GridSpec、add_subplot、DataFrame、df.plot、kind、suptitle、subplots_adjust、set_title、set_xticklabels、marker、color。

## 前置 / 后接
- 前置：Python 基础；L1 数据分析五步。
- 后接：Test 1（L1+L2+W1）；WS01(A) 9/24 截止、WS01(B) 10/2 截止。

---

## 第 0.5 步 · 数据可视化四原则（每原则：反例 → 修正完整代码）

> 🧠 拓展（Wilke《Fundamentals of Data Visualization》+ Knaflic《Storytelling with Data》，检索于 2026-09-25）：先记住四条原则，后面的美化都围绕它们。

**原则 1 · 选对图**：趋势用折线、对比用柱、占比用饼。反例：拿饼图看趋势 ❌。

**原则 2 · 诚实坐标轴**：柱状图必须从 0 开始（高度=量），否则夸大差距。

```python
# 反例 ❌：y 轴不从 0 开始，60 和 48 看着像差一倍
df.plot(ax=ax1, kind='bar', x='major', y='salary')
ax1.set_ylim(40, 65)

# 修正 ✅：保留 0 基线
df.plot(ax=ax1, kind='bar', x='major', y='salary')
ax1.set_ylim(0, 65)
```

**原则 3 · 去杂乱（灰色衬托 + 一个强调色）**：把不重要的元素变灰，只留一个颜色讲重点。

```python
# 反例 ❌：满屏彩色，不知道看哪
df.plot(ax=ax1, kind='bar', x='major', color=['r', 'g', 'b', 'y', 'm'])

# 修正 ✅：全部灰，只有最大值用强调色
colors = ['#c0392b' if v == df['salary'].max() else '#9aa0a6' for v in df['salary']]
df.plot(ax=ax1, kind='bar', x='major', color=colors)
```

**原则 4 · 每图一句话结论**：图下加一句「读图结论」，老板不用猜。

```python
ax1.set_title('Salary by Major', fontweight='bold')
ax1.text(0.02, -0.18, 'Conclusion: Medicine graduates earn the most ($61k).',
         transform=ax1.transAxes, fontsize=10, color='#555')
```

> 🌐 来源：https://clauswilke.com/dataviz/ ；https://www.storytellingwithdata.com/ （检索于 2026-09-25）

---

## 第 1 步 · PPT 骨架：先跑通一张图

**① 完整项目代码（PPT 同款，复制即跑）**

```python
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

fig = plt.figure(figsize=(15, 9))
plt.subplots_adjust(top=0.9, bottom=0.1, left=0.1, right=0.95)
fig.suptitle('Example 01 - Simple Chart', fontsize=24)

gs = gridspec.GridSpec(1, 1)
ax1 = fig.add_subplot(gs[0, 0])

data = {'Year': [2022, 2023, 2024, 2025],
        'Apple Price': [20, 25, 18, 28]}
df_price = pd.DataFrame(data)
df_price.plot(ax=ax1, kind='line', x='Year', y='Apple Price')

plt.show()
```

**② 逐行拆解**

| 行 | 干什么 | 为什么这样写 |
|---|---|---|
| 1–3 | 三个 import | pandas 管数据、pyplot 画图、gridspec 切格子 |
| 5 | `plt.figure(figsize=(15, 9))` | 建画布（整张纸），宽 15 高 9 英寸 |
| 6 | `plt.subplots_adjust(top=0.9, …)` | 图四周留白，顶部留 10% 放大标题 |
| 7 | `fig.suptitle(…, fontsize=24)` | 整幅**总标题**，字号 24 |
| 9–10 | `GridSpec(1, 1)` + `add_subplot(gs[0, 0])` | 1 格，把格子变成坐标轴 `ax1` |
| 12–14 | `pd.DataFrame(data)` | 把字典变成 DataFrame（类 Excel 表格） |
| 15 | `df_price.plot(ax=ax1, kind='line', x=…, y=…)` | **PPT 唯一画图写法**：画到 ax1、类型、横/纵列 |
| 17 | `plt.show()` | 显示 |

**③ 输出**：一张折线图，大标题在上，图居中。
**④ 术语**：DataFrame 数据框 / GridSpec 网格规格 / suptitle 总标题 / subplots_adjust 留白调整。
**⑤ 易错**：忘 `plt.show()` 图不出现；`x=` 列名写错报 KeyError。

---

## 第 2 步 · 三个核心概念（对应 PPT 变量名）

```
fig（Figure 画布 = 一整张纸）
 ├─ gs（GridSpec = 纸上划好的格子规划表）
 │    └─ ax1（Axes = 第 1 个格子里的坐标区/小图）
 │          └─ df.plot(ax=ax1, ...) 画的线/柱 = Artist（元素）
 └─ suptitle = 整张纸的大标题
```

> 📖 逐条：`fig` 是画布；`gs = GridSpec(行, 列)` 只是规划；`ax1 = fig.add_subplot(gs[r, c])` 把某格变成坐标轴；之后 `df.plot(ax=ax1, …)` 都画到它身上。`fig.suptitle` 是总标题，`ax1.set_title` 才是每张小图的标题。

---

## 第 3 步 · 让图完整（PPT 的 Style 五种）

**① 完整项目代码（PPT 同款）**

```python
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

fig = plt.figure(figsize=(15, 9))
plt.subplots_adjust(top=0.9, bottom=0.1, left=0.1, right=0.95)
fig.suptitle('Example 03 - Line Chart', fontsize=24)

gs = gridspec.GridSpec(1, 1)
ax1 = fig.add_subplot(gs[0, 0])

df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price', color='g')

ax1.set_title('Apple Price Over Years')          # 图标题
ax1.set_xlabel('Year')                           # 横轴标签
ax1.set_ylabel('Price in USD $')                 # 纵轴标签（带单位）
ax1.legend(loc='best')                           # 图例
ax1.grid(visible=True, axis='y')                 # 网格（只画横线）
ax1.set_xticklabels(['2022', '2023', '2024', '2025'], rotation=45)  # 刻度旋转 45°

plt.show()
```

**② PPT 颜色速查表**：`'b'` 蓝 blue · `'g'` 绿 green · `'r'` 红 red · `'c'` 青 cyan · `'m'` 品红 magenta · `'y'` 黄 yellow · `'k'` 黑 black · `'w'` 白 white。
**③ PPT 标记速查表**：`'o'` 圆 circle · `'+'` 加号 plus · `'*'` 星号 star · `'s'` 方 square · `'x'` 叉 x · `'D'` 菱形 diamond。
**④ 术语**：set_title 图标题 / set_xlabel 横轴标签 / legend 图例 / grid 网格 / set_xticklabels 刻度标签 / rotation 旋转角度。
**⑤ 易错**：`suptitle`（总标题）与 `set_title`（子图标题）别混；刻度旋转 PPT 用 **45°**。

---

## 第 4 步 · 四种必考图（每种 PPT 同款完整代码）

### 4.1 折线图 Line（Example 03 原格式）

```python
fig = plt.figure(figsize=(15, 9))
plt.subplots_adjust(top=0.9, bottom=0.1, left=0.1, right=0.95)
fig.suptitle('Example 03 - Line Chart', fontsize=24)
gs = gridspec.GridSpec(1, 1)
ax1 = fig.add_subplot(gs[0, 0])

df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price.plot(ax=ax1, kind='line', marker='o', x='Year', y='Apple Price')
plt.show()
```

> 逐行：`kind='line'` 折线；`marker='o'` 数据点画圆；`x/y` 指定列。易错：点多时 marker 缩小、线加粗。多线=再调一次 `.plot(..., y='Orange Price')`。进阶实例见 [Graph Gallery 折线](https://python-graph-gallery.com/line-chart/)。

### 4.2 面积图 Area（Example 05 原格式）

```python
fig = plt.figure(figsize=(15, 9))
plt.subplots_adjust(top=0.9, bottom=0.1, left=0.1, right=0.95)
fig.suptitle('Example 05 - Area Chart', fontsize=24)
gs = gridspec.GridSpec(1, 1)
ax1 = fig.add_subplot(gs[0, 0])

df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price.plot(ax=ax1, kind='area', x='Year', y='Apple Price', alpha=0.1)
df_price.plot(ax=ax1, kind='area', x='Year', y='Orange Price', alpha=0.1)
plt.show()
```

> 逐行：`kind='area'` 面积；`alpha=0.1` 半透明避免两层互盖。易错：层多每层都要 alpha。进阶见 [Graph Gallery 面积](https://python-graph-gallery.com/area-plot/)。

### 4.3 柱状图 Bar / 横柱 Barh（Example 06/07 原格式）

```python
# 竖柱（Example 06）
df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')

# 横柱（Example 07，长类目名不被裁）
df_price.plot(ax=ax1, kind='barh', x='Year', y='Apple Price')

# 堆叠（Example 08）
df_price.plot(ax=ax1, kind='barh', stacked=True, x='Year')
```

> 逐行：`bar` 竖柱、`barh` 横柱、`stacked=True` 堆叠（不写 `y=` 即画全部数值列）。易错：竖柱长名被裁 → 用 `barh`；y 轴应从 0 起。进阶见 [Graph Gallery 柱状](https://python-graph-gallery.com/barplot/)。

### 4.4 饼图 Pie（Example 09 原格式）

```python
df_price.plot(ax=ax1, kind='pie', y='Apple Price', labels=df_price['Year'])
```

> 逐行：饼图**没有 `x=`**——`y=` 决定扇区大小、`labels=` 是分类标签。易错：类别 >9 会糊；别加 3D。进阶见 [Graph Gallery 饼图](https://python-graph-gallery.com/pie-plot/)。

---

## 第 5 步 · 一页放多图（Example 11–14 原格式）

```python
# 1 图（基线）
gs = gridspec.GridSpec(1, 1)
ax1 = fig.add_subplot(gs[0, 0])

# 2 图（左右并排）
gs = gridspec.GridSpec(1, 2)
ax1 = fig.add_subplot(gs[0, 0]); ax2 = fig.add_subplot(gs[0, 1])

# 4 图（2x2）
gs = gridspec.GridSpec(2, 2)
ax1 = fig.add_subplot(gs[0, 0]); ax2 = fig.add_subplot(gs[0, 1])
ax3 = fig.add_subplot(gs[1, 0]); ax4 = fig.add_subplot(gs[1, 1])

# 3 图（左通栏 + 右两小图）
gs = gridspec.GridSpec(2, 2)
ax1 = fig.add_subplot(gs[:, 0])          # 冒号 = 整列合并 → 通栏
ax2 = fig.add_subplot(gs[0, 1]); ax3 = fig.add_subplot(gs[1, 1])
```

> 考点：`gs[:, 0]` 的冒号是「取整列」，实现通栏大图（Example 14 / 20 同款）。

---

## 第 6 步 · 数据准备（PPT 两种数据源 + pandas 速查卡）

```python
# PPT 数据源 ①：手造 DataFrame（Example 01）
data = {'Year': [2022, 2023, 2024, 2025],
        'Apple Price': [20, 25, 18, 28],
        'Orange Price': [16, 18, 20, 26]}
df_price = pd.DataFrame(data)

# PPT 数据源 ②：读 Excel（Example 02）
df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
```

**pandas 速查卡（官方 10min 精选）**

| 需求 | 一行式 |
|---|---|
| 排序 | `df.sort_values('salary', ascending=False)` |
| 分组求均值 | `df.groupby('major')['salary'].mean()` |
| 筛选 | `df[df['salary'] > 0]`（等价 `df.query('salary > 0')`） |
| 去缺失 | `df.dropna()` |
| 去重复 | `df.drop_duplicates()` |
| 前 5 行 | `df.head(5)` |

> 🌐 来源：https://pandas.pydata.org/docs/user_guide/10min.html（检索于 2026-09-25）

---


## 第 7 步 · 两份作业：WS01(A) 与 WS01(B)（PPT 原文）

### 7.1 两份作业对比

| | WS01(A)（Part 01） | WS01(B)（Part 02） |
|---|---|---|
| 数据 | **PolyU Graduate Employment Survey 2023**（SAO） | USA College Graduate Salary 2025 Projection（Table 01–04） |
| 要求 | 60 分钟设计、交 Blackboard | 60 分钟设计、交 Blackboard |
| 文件命名 | `EIE1005_StudentID_Workshop_01_A.py` | `EIE1005_StudentID_Workshop_01_B.py` |
| 截止 | 9/24 23:59（10 分） | 10/2 23:59（10 分） |

### 7.2 检查清单（A/B 同款四类 · PPT 第 133 页原文）

**Chart Layout 四问**：Q1 几张图（1/2/3/4）· Q2 数据讲什么故事 · Q3 类型（Line/Area/Bar/Pie）· Q4 样式（Title/Label/Legend/Grid Line/Color）。

1. **Data Accuracy & Integrity**：[ ] Source Consistency：数据与 2023 PolyU SAO 数据集一致？
2. **Chart Formatting & Labels**：[ ] 每图顶部清晰加粗标题 · [ ] X/Y 轴带单位 · [ ] 图例可见准确 · [ ] 刻度合理易读
3. **Visual Presentation & Layout**：[ ] 同类目同色 · [ ] 柱状图左轴系名完整不裁 · [ ] 三图对齐留白均匀 · [ ] 标签不压线/柱
4. **Final Verification**：[ ] 文件命名 `EIE1005_StudentID_Workshop_01_A.py`（A）或 `..._Workshop_01_B.py`（B）

### 7.3 WS01(A) 关键数据（PPT 第 121–127 页原文）

- **就业率 98.7%**（含就业与升学）· **问卷回收率 85.5%**（4,241 人中 3,628 人回应）
- 毕业去向：就业 82.4% · 升学 8.8% · 其他 7.7%（移民/返乡/不求职）· 失业 1.1%
- **平均月薪 $24,017**（较 2022 的 $22,827 上升 5.2%）；2023 年 49.0% 毕业生月薪高于 $21,999（2022 仅 40.3%）
- 行业平均月薪：社区与社会服务 $32,652（+5.5%）· 政府及相关机构 $25,343（+9.7%，增幅最高）· 建造/工程与工业 $22,382（+6.5%）· 商业 $20,304（+4.3%）· 教育 $18,320（−3.8%）

> 📖 译注：WS01(A) 的「故事」就是"就业率高、薪资上涨、政府/社区行业领跑"——Q2 可以直接用这三句。

### 7.4 四问 → 代码映射

| 问 | 决定 | PPT 代码 |
|---|---|---|
| Q1 几张图 | 布局 | `gs = gridspec.GridSpec(行, 列)` + `add_subplot(gs[r, c])` |
| Q2 故事 | 选列 | `x='Year'`、`y='Apple Price'` 等 |
| Q3 类型 | kind | `kind='line' / 'area' / 'bar' / 'barh' / 'pie'` |
| Q4 样式 | 装饰 | `set_title / set_xlabel / set_ylabel / legend / grid / color` |

---

## 第 8 步 · 代码书写方式（四种写法，重点）

> 📖 译注（v10）：**写法④（pandas 一行式）就是 PPT 的主教学格式**（`df.plot(ax=…, kind=…, x=…, y=…)`）；其余三种写法（参数内联 / setter / pyplot）作对照与拓展。

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

### 8.1 写法① · 参数写进调用（最直观）

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

### 8.2 写法② · 先画后 setter（最灵活）

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

### 8.3 写法③ · pyplot 状态机式（单图最快）

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

### 8.4 写法④ · pandas 一行式（数据 + 图一体）

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


### 8.5 更多完整项目（练习多写法）

**项目 A · pandas 多列多图（写法④进阶）**

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_excel('salary.xlsx', sheet_name='Table 01')

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
df.plot(ax=axes[0], kind='bar', x='major', y='salary')      # 左：柱状
df.plot(ax=axes[1], kind='pie', y='salary', labels=df['major'], autopct='%1.1f%%')  # 右：饼图
fig.suptitle('Salary Overview', fontweight='bold')
plt.show()
```

> 逐行：`df.plot(ax=目标轴, kind=...)` 把 pandas 的图指定画到 `axes[i]` 上；`fig.suptitle` 是整幅总标题（与每张图的 `set_title` 不同）。

**项目 B · setter 循环批量改（写法②进阶）**

```python
import matplotlib.pyplot as plt

series = {
    'Apple': [20, 25, 18, 28],
    'Orange': [16, 18, 20, 26],
}
colors = ['#1f77b4', '#ff7f0e']

fig, ax = plt.subplots(figsize=(8, 5))
lines = []
for (name, y), c in zip(series.items(), colors):
    line, = ax.plot([2022, 2023, 2024, 2025], y)   # 先只画，不带样式
    line.set_color(c)          # 循环里按条件逐个改
    line.set_marker('o')
    line.set_label(name)
    lines.append(line)

ax.legend(); ax.grid(True, linestyle='--', alpha=0.5)
plt.show()
```

> 逐行：`zip(series.items(), colors)` 把「数据 + 颜色」成对取出；循环内先 `plot` 再 `set_color/set_marker/set_label`——这就是 setter 写法最适合的场景（重复 + 按条件）。

---

---

## 第 9 步 · 进阶美化（重点）

> 📖 译注（v10）：进阶技巧用 `ax` 对象式更细，与 PPT 骨架的桥 = `ax1.containers[0]`（从 `df.plot` 返回的 Axes 里取柱对象）。

### 9.1 给整张图加背景

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

#### 9.1.1 个性化背景八招

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

### 9.2 柱状图七种特效

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

### 9.3 按数值渐变着色

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

### 9.3.1 归一化家族与色带选择

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

### 9.4 颜色条 colorbar

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

### 9.5 高难度拓展 + 技巧库 + 避雷

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
| 4 | 渐变柱 | `imshow` + 双三次插值（见 9.4） |
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

### 9.6 主题库（内置风格 / qbstyles / matplotx / mplcyberpunk / mplstyle）

> 🧠 拓展（用户提供文章内容，检索于 2026-09-23）：图形美观度直接决定信息传递效率。美化分四层：**内置风格 → 主题库（qbstyles / matplotx）→ 发光特效（mplcyberpunk）→ 自定义 .mplstyle**。每节按「是什么 → 逐行讲解 → 坑」展开。

#### 9.6.1 Matplotlib 内置预设风格

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

#### 9.6.2 qbstyles（QuantumBlack 专业风）

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

#### 9.6.3 matplotx（Dracula / Pitaya Smoothie 等主题）

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

#### 9.6.4 mplcyberpunk（赛博朋克发光）

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

#### 9.6.5 自定义样式文件 .mplstyle

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

#### 9.6.6 选型建议

| 场景 | 方案 |
|---|---|
| 作业 / 考试提交 | 内置风格 + 自定义 `.mplstyle` + `rcParams` |
| 个人演示、追求好看 | qbstyles / matplotx / mplcyberpunk |
| 同一脚本多主题 | `with plt.style.context(...)` |
| 需要个性化背景 | 见 §9.1.1 八招（渐变 / 图片 / 水印 / 角标 / 条纹 / 极坐标 / 圆角） |

---

---

---

## 第 10 步 · 作业三版（全用 PPT 骨架）

### 10.1 基础版 · WS01(B) 2×2 四图（PPT 格式，可直接交）

```python
# EIE1005_StudentID_Workshop_01_B.py —— 基础版
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

fig = plt.figure(figsize=(15, 9))
plt.subplots_adjust(top=0.9, bottom=0.1, left=0.1, right=0.95)
fig.suptitle('USA College Graduate Salary 2025', fontsize=24)

gs = gridspec.GridSpec(2, 2)
ax1 = fig.add_subplot(gs[0, 0])   # Line
ax2 = fig.add_subplot(gs[0, 1])   # Area
ax3 = fig.add_subplot(gs[1, 0])   # Barh
ax4 = fig.add_subplot(gs[1, 1])   # Pie

t = pd.read_excel('salary.xlsx', sheet_name='Table 01')
t.plot(ax=ax1, kind='line', marker='o', x='year', y='salary')
t.plot(ax=ax2, kind='area', x='year', y='salary', alpha=0.1)
t.plot(ax=ax3, kind='barh', x='major', y='salary', color='g')
t.plot(ax=ax4, kind='pie', y='salary', labels=t['major'])

ax1.set_title('Salary Trend'); ax2.set_title('Salary Area')
ax3.set_title('Salary by Major'); ax4.set_title('Salary Share')
ax1.set_xlabel('Year'); ax1.set_ylabel('Salary (USD)')
ax3.set_xlabel('Salary (USD)')
plt.show()
```

### 10.2 进阶版 · PPT 骨架 + 渐变着色 + 颜色条

```python
import matplotlib.colors as mcolors

fig = plt.figure(figsize=(15, 9))
plt.subplots_adjust(top=0.9, bottom=0.1, left=0.1, right=0.95)
fig.suptitle('Salary by Major (Gradient)', fontsize=24)
gs = gridspec.GridSpec(1, 1)
ax1 = fig.add_subplot(gs[0, 0])

t = pd.read_excel('salary.xlsx', sheet_name='Table 01').sort_values('salary')
cmap = plt.get_cmap('viridis')
norm = mcolors.Normalize(vmin=t['salary'].min(), vmax=t['salary'].max())
colors = [cmap(norm(v)) for v in t['salary']]

t.plot(ax=ax1, kind='barh', x='major', y='salary', color=colors, legend=False)
bars = ax1.containers[0]              # df.plot 画出的柱，从这里拿对象
ax1.bar_label(bars, fmt='%d', padding=3)

sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm); sm.set_array(t['salary'])
fig.colorbar(sm, ax=ax1, label='Salary (USD)')
ax1.set_title('Salary by Major (Gradient)')
ax1.set_xlabel('Salary (USD)')
plt.show()
```

> 📖 译注：PPT 风格与进阶技巧的桥 = `ax1.containers[0]`（df.plot 返回的 Axes 里第一个容器就是柱集合，供 `bar_label` 使用）。

### 10.3 炫酷版 · 主题 + 发光（演示用，提交勿用）

```python
import numpy as np
import mplcyberpunk
import matplotlib.pyplot as plt

plt.style.use('cyberpunk')
x = np.linspace(0, 10, 20); y = np.sin(x)
plt.figure(figsize=(8, 8))
plt.plot(x, y, marker='o')
mplcyberpunk.add_glow_effects()
plt.title('Cyberpunk Style Plot')
plt.show()
```

> ⚠️ 第三方库老师机器未必安装，正式提交用 10.1 / 10.2。

---

## 附录 B · 资源与书单（官方 / 高校 / 经典教材）

**官方教程**
- [Matplotlib Pyplot tutorial](https://matplotlib.org/stable/tutorials/pyplot.html) ｜ [Quick start guide（推荐 OO 写法）](https://matplotlib.org/stable/users/explain/quick_start.html) ｜ [Plot types 全图型](https://matplotlib.org/stable/plot_types/index.html)
- [pandas 官方 10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html)
- [Python Graph Gallery](https://python-graph-gallery.com/)（数百图 + 完整代码）

**高校课程**
- [MIT OCW 6.100L · Lecture 25: Plotting](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/)
- [Real Python · Data Visualization with Python 学习路径](https://realpython.com/learning-paths/data-visualization-python/)

**经典教材（按学习顺序）**
1. 《Python for Data Analysis》第 3 版 · Wes McKinney（pandas 作者，工具书；第 9 章绘图）
2. 《Fundamentals of Data Visualization》 · Claus O. Wilke（免费在线：https://clauswilke.com/dataviz/ ，选型与诚实作图）
3. 《Storytelling with Data》 · Cole N. Knaflic（去杂乱、单一强调色、一句话结论）
4. 《The Visual Display of Quantitative Information》 · Edward Tufte（data-ink ratio 经典）

**建议学习顺序**：官方 Pyplot 入门 → 本页第 1–7 步 → McKinney 第 9 章查缺 → Wilke 学选型 → Knaflic 学讲结论 → Graph Gallery 找进阶实例。

> 🌐 检索于 2026-09-25（来源均为官方/高校/经典出版物）。

---



---

## 附录 A · Workshop 1 项目包 22 例逐例详解（原 W1 篇全文保留）

> 📖 说明：按「详细易懂优先、不缩篇幅」原则，原 W1 篇的 22 个示例**逐例逐行完整保留**于此（A.1–A.8），并附原篇自测（A.9）、强化练习（A.10）与答疑（A.11）；全部 `.py` 完整代码另见「📎 原始课件」的逐文件原文。

### A.1 通用骨架逐行讲解（原 W1 篇）

每个示例前 6 行都一模一样，先一次性讲透；后面每个例子只讲「跟骨架不同的那几行」。

#### 1.1 三行 import（导入库）

```python
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
```

> 逐行：
> - `import pandas as pd`：导入 **pandas**（Python 的数据分析库），起别名 `pd`。本课用它读 Excel 和存「表格」（DataFrame）。
> - `import matplotlib.pyplot as plt`：导入 **Matplotlib** 的 `pyplot` 模块，起别名 `plt`。`pyplot` 是 Matplotlib 的「画图入口」，几乎所有画图命令都从 `plt.` 开始。
> - `import matplotlib.gridspec as gridspec`：导入 `gridspec`（网格规格），用来把一张大图**切成多个小格子**、再在格子里放图。

> 🧠 拓展（外部资料）：pandas 的 `DataFrame` 可理解成「带列名的二维表格」，类似 Excel 的一个 sheet；Matplotlib 是 Python 事实上的标准画图库，`pyplot` 模仿 MATLAB 的绘图风格。这两个库是「数据分析三件套」（numpy / pandas / matplotlib）之二。
> 🌐 来源：pandas 官方文档 https://pandas.pydata.org/docs/ ；Matplotlib 官方文档 https://matplotlib.org/stable/ （检索于 2026-09-16）

#### 1.2 建图（Figure）+ 留白 + 大标题

```python
fig = plt.figure(figsize=(15, 9))
plt.subplots_adjust(top=0.9, bottom=0.1, left=0.1, right=0.95)
fig.suptitle('Example XX - ...', fontsize=24)
```

> 逐行：
> - `fig = plt.figure(figsize=(15, 9))`：新建一张「画布」叫 `fig`（Figure 对象），尺寸 `figsize=(15,9)` 表示**宽 15 英寸、高 9 英寸**（约 16:9 的宽屏比例）。`fig` 是整张图，里面可以装多个小图。
> - `plt.subplots_adjust(top=0.9, bottom=0.1, left=0.1, right=0.95)`：调整图与画布边缘的**留白**，数值是「占画布的比例」（0~1）。`top=0.9` 表示图的最上边距画布顶边 10% 的位置，`bottom=0.1` 同理。这里给顶部留 10% 空间放大标题。
> - `fig.suptitle('Example XX - ...', fontsize=24)`：给**整张画布**加一个总标题（supertitle），字号 24。

> 🔴 考点：区分两个概念——`Figure`（整张画布）与 `Axes`（画布里某个具体的坐标系/图）。一个 `Figure` 可以包含多个 `Axes`。考试常见「Figure 和 Axes 是什么关系」的选择/判断题。

#### 1.3 划格子 + 建坐标轴（GridSpec / add_subplot）

```python
gs = gridspec.GridSpec(1, 1)
ax1 = fig.add_subplot(gs[0, 0])
```

> 逐行：
> - `gs = gridspec.GridSpec(1, 1)`：定义一个 **1 行 1 列**的网格 `gs`（只有 1 个格子）。`GridSpec(2, 2)` 就是 2 行 2 列共 4 格。
> - `ax1 = fig.add_subplot(gs[0, 0])`：在 `gs` 的第 0 行第 0 列的格子里**创建一个坐标轴对象** `ax1`。`gs[行, 列]` 的下标从 0 开始。
> - 之后所有 `df.plot(ax=ax1, ...)` 都画到这个 `ax1` 上。

> 🧠 拓展（外部资料）：`gs[:, 0]` 这种写法里的冒号表示「整列都占」，例如 `gs[:, 0]` = 第 0 列的**所有行**（见 Example 14 / 20 的「左侧通栏大图」用法）。
> 🌐 来源：Matplotlib GridSpec 官方教程 https://matplotlib.org/stable/users/explain/axes/arranging_axes.html （检索于 2026-09-16）

#### 1.4 读数据 + 画图 + 显示

```python
df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price.plot(ax=ax1, kind='line', x='Year', y='Apple Price')
plt.show()
```

> 逐行：
> - `df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')`：用 pandas 读取 Excel 文件里名为 `Price` 的工作表，得到一个 `DataFrame` 并存入变量 `df_price`。
> - `df_price.plot(ax=ax1, kind='line', x='Year', y='Apple Price')`：调用 DataFrame 自带的 `.plot()` 方法画图。参数含义：
>   - `ax=ax1`：画到哪个坐标轴；
>   - `kind='line'`：图表类型（折线图）；
>   - `x='Year'`：用哪一列当横轴；
>   - `y='Apple Price'`：用哪一列当纵轴。
> - `plt.show()`：把画好的图**弹窗显示**出来。在 Jupyter / VS Code 里通常会自动内嵌显示。

> 🔴 考点：`df.plot()` 是 pandas 对 Matplotlib 的**封装**，底层仍然调用 Matplotlib；所以参数 `kind`、`ax`、`x`、`y` 都是 pandas 的 `.plot()` 参数，不是 `plt.` 的参数。知道「谁在调用谁」能避免张冠李戴。

> 📖 译注（数据核对）：`Price` 表实际内容为 `Year=[2022,2023,2024,2025]`、`Apple Price=[20,25,99,28]`、`Orange Price=[16,18,20,26]`。注意 **Example 01 里手写的 `Apple Price` 是 `[20,25,18,28]`，与 Excel 的 2024 年 `99` 不一致**（`99` 疑似课件笔误，应为 19/18 一类）。考试与作业以**课件 Excel 为准**，此处仅作提醒。

---

### A.2 数据准备 · Example 01–02（原 W1 篇）

#### Example 01 · Simple Chart - Pandas DataFrame（用代码直接造表）

```python
data = {'Year' : [2022, 2023, 2024, 2025],
        'Apple Price' : [20, 25, 18, 28],
        'Orange Price' : [16, 18, 20, 26]}
df_price = pd.DataFrame(data)
df_price.plot(ax=ax1, kind='line', x='Year', y='Apple Price')
```

> 逐行（只讲与骨架不同的部分）：
> - `data = {...}`：用 Python **字典（dict）** 手写三列数据；`'Year'`、`'Apple Price'`、`'Orange Price'` 是「列名」，后面是各列的值列表。
> - `df_price = pd.DataFrame(data)`：把字典转成 **DataFrame** 表格——字典的 key 变列名，value 列表变列数据。
> - 最后一行用 `kind='line'` 画「Apple Price 随 Year 变化」的折线。

> 🧠 拓展（外部资料）：`DataFrame` 的每列长度必须相等，否则会报 `ValueError`；这是初学者最常犯的错。
> 🌐 来源：pandas DataFrame 文档 https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html （检索于 2026-09-16）

#### Example 02 · Simple Chart - Read Excel File（从 Excel 读表）

```python
df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price.plot(ax=ax1, kind='line', x='Year', y='Apple Price')
```

> 逐行：
> - 唯一变化是把 Example 01 的「手写 dict」换成 `pd.read_excel(...)`，从外部 Excel 文件读入数据，其余完全相同。
> - `sheet_name='Price'` 指定读哪个工作表。

> 🔴 考点：`read_excel` 是 pandas 的函数，需要已安装 `openpyxl` 才能读 `.xlsx`（Anaconda 一般自带；报错 `Missing optional dependency 'openpyxl'` 时 `pip install openpyxl` 即可）。

---

### A.3 图表类型 · Example 03–10（原 W1 篇）

> 规则：**只改 `df_price.plot(...)` 里的 `kind=` 和个别参数**，就能换图表类型；前面 6 行骨架不变。下面每个例子给出完整原文 + 新增行的逐行讲解。

#### Example 03 · 折线图（单线）——加数据点 `marker='o'`

```python
df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price.plot(ax=ax1, kind='line', marker='o', x='Year', y='Apple Price')
```

> 逐行：
> - `marker='o'`：在每个数据点画一个**圆点标记**，让人一眼看出「离散的数据点」位置。常用标记还有 `'s'`（方块）、`'^'`（三角）、`'*'`（星号）。
> - 其余同骨架：折线图 `kind='line'`。

#### Example 04 · 折线图（多线）——画两条线

```python
df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price.plot(ax=ax1, kind='line', marker='o', x='Year', y='Apple Price')
df_price.plot(ax=ax1, kind='line', marker='o', x='Year', y='Orange Price')
```

> 逐行：
> - 关键点：在**同一个 `ax1` 上连续调用两次 `.plot()`**，第二条线会叠画在同一张图上（Matplotlib 默认自动换颜色）。
> - 第一行画 Apple Price，第二行画 Orange Price，`x='Year'` 不变。

> 🔴 考点：同轴叠加 = 多次调用 `plot` 且 `ax=` 指向同一个 Axes 对象；若忘了写 `ax=ax1`，每次会新建一张图，就叠不到一起。

#### Example 05 · 面积图 `kind='area'`

```python
df_price.plot(ax=ax1, kind='area', x='Year', y='Apple Price', alpha=0.1)
df_price.plot(ax=ax1, kind='area', x='Year', y='Orange Price', alpha=0.1)
```

> 逐行：
> - `kind='area'`：面积图（折线下方填充颜色）。
> - `alpha=0.1`：**透明度**，取值 0（全透明）~1（不透明）。设为 0.1 是为了两条面积叠在一起时还能看清彼此的交叉区域。

#### Example 06 · 柱状图（标准）`kind='bar'`

```python
df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')
# df_price.plot(ax=ax1, kind='bar', x='Year')
```

> 逐行：
> - `kind='bar'`：竖柱状图。
> - 被注释的那行（`#` 开头）是备选写法：**不写 `y=`** 时，pandas 会把 `x='Year'` 之外的所有数值列都画出来（Apple + Orange 两根柱）。`#` 在 Python 里是「注释」，不执行。

> 🔴 考点：`#` 注释行不参与运行；`x`/`y` 省略规则——`y` 省略时默认画全部数值列。

#### Example 07 · 横向柱状图 `kind='barh'`

```python
df_price.plot(ax=ax1, kind='barh', x='Year', y='Apple Price')
```

> 逐行：
> - `kind='barh'`：`bar` + `horizontal`，**横向柱状图**，类别沿 Y 轴排列（适合类别名很长、竖着放不下时）。

#### Example 08 · 堆叠柱状图 `stacked=True`

```python
df_price.plot(ax=ax1, kind='barh', stacked=True, x='Year')
```

> 逐行：
> - `stacked=True`：**堆叠**，把多列数值叠成一根柱（用于看「总量 + 各部分占比」）。
> - 这里没写 `y=`，所以会把 Apple Price、Orange Price 两列堆叠在一起。

> 🧠 拓展（外部资料）：堆叠图适合「构成/占比」，但**不适合比较各部分的绝对大小**（因为基线不齐，人眼难比），需要精确比较时改用分组柱状图或折线图。
> 🌐 来源：Data Visualization Society 关于 bar chart 的讨论 https://www.datavisualizationsociety.org/ （检索于 2026-09-16）

#### Example 09 · 饼图 `kind='pie'`

```python
df_price.plot(ax=ax1, kind='pie', y='Apple Price', labels=df_price['Year'])
```

> 逐行：
> - `kind='pie'`：饼图（显示**占比**）。
> - `y='Apple Price'`：用哪一列的值决定「扇区大小」。
> - `labels=df_price['Year']`：把 `Year` 列的值当作每个扇区的**标签**。

> 🔴 考点：饼图没有 `x=` 参数，而是用 `y`（数值）+ `labels`（分类标签）。这也是它与其它图最明显的差别。

#### Example 10 · Start and End（画所有列，看起止趋势）

```python
df_price.plot(ax=ax1, kind='line', marker='o', x='Year')
```

> 逐行：
> - 这里**没有 `y=`**，所以 `Apple Price`、`Orange Price` 两列都画成折线，且都带 `marker='o'`。
> - 标题「Start and End」意在强调：折线图最能看「起点→终点」的整体变化趋势。

---

### A.4 图表布局 · Example 11–14（原 W1 篇）

> 核心：`GridSpec(行数, 列数)` 决定「几格」，`fig.add_subplot(gs[行, 列])` 把图放进指定格。

#### Example 11 · 1 图（基线）

```python
gs = gridspec.GridSpec(1, 1)
ax1 = fig.add_subplot(gs[0, 0])
```

> 逐行：`GridSpec(1,1)` 只有 1 格，`gs[0,0]` 放唯一一张图。这是其它布局的基线。

#### Example 12 · 2 图（左右并排）

```python
gs = gridspec.GridSpec(1, 2)
ax1 = fig.add_subplot(gs[0, 0])
ax2 = fig.add_subplot(gs[0, 1])

df_price_01 = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price_01.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')

df_price_02 = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price_02.plot(ax=ax2, kind='bar', x='Year', y='Orange Price')
```

> 逐行：
> - `GridSpec(1, 2)`：1 行 2 列 → **2 个格子**（左右并排）。
> - `ax1=gs[0,0]`、`ax2=gs[0,1]`：左格、右格各一个 Axes。
> - 数据读了两遍（`df_price_01`、`df_price_02`），分别画到 `ax1`、`ax2`。

> 📖 译注：这里反复 `read_excel` 同一个文件只是教学演示，真实代码读一次就够，再复用变量即可。

#### Example 13 · 4 图（2×2）

```python
gs = gridspec.GridSpec(2, 2)
ax1 = fig.add_subplot(gs[0, 0])
ax2 = fig.add_subplot(gs[0, 1])
ax3 = fig.add_subplot(gs[1, 0])
ax4 = fig.add_subplot(gs[1, 1])
# ...4 个 df_price 分别画 bar/line 到 ax1~ax4
```

> 逐行：
> - `GridSpec(2, 2)`：2 行 2 列 → **4 格**。
> - 下标规律：`gs[行, 列]`，行/列都从 0 开始；顺序 `[0,0]→[0,1]→[1,0]→[1,1]` 即「左上→右上→左下→右下」。

#### Example 14 · 3 图（左侧通栏大图 + 右侧两小图）

```python
gs = gridspec.GridSpec(2, 2)
ax1 = fig.add_subplot(gs[:, 0])
ax2 = fig.add_subplot(gs[0, 1])
ax3 = fig.add_subplot(gs[1, 1])
```

> 逐行：
> - `gs[:, 0]`：冒号 `:` 表示「所有行」→ 第 0 列的**上下两格合并**成一个竖长图 `ax1`。
> - `gs[0,1]`、`gs[1,1]`：右列上下两个小图。
> - 最终布局 = 左边一大图 + 右边上下两小图，共 **3 张图**。

> 🔴 考点：`gs[:, 0]` 的冒号是「切片/取整列」，是 GridSpec 合并格子的写法，考试可能问「哪行代码实现了通栏/跨行」。

---

### A.5 样式美化 · Example 15–19（原 W1 篇）

> 核心：`ax1.set_xxx()` 是给**单个 Axes** 加细节；`fig.suptitle` 是给整张画布加总标题。

#### Example 15 · 子图标题 `set_title`

```python
df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')
ax1.set_title('Apple Price Over Years')
```

> 逐行：`ax1.set_title('...')` 给当前这张小图（Axes）加标题；与骨架里 `fig.suptitle(...)`（整幅总标题）不同。

#### Example 16 · 坐标轴标签 `set_xlabel / set_ylabel`

```python
df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')
ax1.set_xlabel('Year')
ax1.set_ylabel('Price in USD $')
```

> 逐行：
> - `set_xlabel('Year')`：横轴标签。
> - `set_ylabel('Price in USD $')`：纵轴标签，说明单位是美元 `$`。

> 🔴 考点：`set_title` 是「图标题」、`set_xlabel/set_ylabel` 是「轴标签」、`suptitle` 是「整幅总标题」，三者别混。

#### Example 17 · 图例 `legend`

```python
ax1.legend(loc='best')
# ax1.legend().set_visible(False)
```

> 逐行：
> - `ax1.legend(loc='best')`：显示**图例**，`loc='best'` 让 Matplotlib 自动挑一个不挡数据的位置。
> - 注释行 `ax1.legend().set_visible(False)`：如果想**隐藏图例**，用这行（取消注释即可）。

#### Example 18 · 网格线 `grid`

```python
ax1.grid(visible=True)
# ax1.grid(visible=True, axis='x')
# ax1.grid(visible=True, axis='y')
# ax1.grid(visible=False)
```

> 逐行：
> - `ax1.grid(visible=True)`：打开**网格线**，方便读数。
> - 三个注释行是可选项：`axis='x'` 只画竖线、`axis='y'` 只画横线、`visible=False` 关闭网格。

#### Example 19 · 颜色 `color`

```python
# df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price', color='g')
df_price.plot(ax=ax1, kind='bar', x='Year', color=['g','y'])
```

> 逐行：
> - `color='g'`：给整组柱统一指定绿色（g=green，其它常用 r=红、b=蓝、y=黄、k=黑）。
> - `color=['g','y']`：给**多列分别指定颜色**——第一列绿色、第二列黄色；因此这里不写 `y=`，让两列都画出来。

> 🧠 拓展（外部资料）：Matplotlib 颜色可用单字母（`'g'`）、全名（`'green'`）、十六进制（`'#008000'`）或 RGB 元组 `(0,0.5,0)`。色盲友好配色可参考 ColorBrewer。
> 🌐 来源：Matplotlib 颜色文档 https://matplotlib.org/stable/users/explain/colors/colors.html ；ColorBrewer https://colorbrewer2.org/ （检索于 2026-09-16）

---

### A.6 刻度标签旋转 · Example 21–22（原 W1 篇）

#### Example 21 · X 轴刻度标签 `set_xticklabels`

```python
df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')
ax1.set_xticklabels(['2022', '2023', '2024', '2025'], rotation=45)
# ax1.set_xticklabels(['2022', '2023', '2024', '2025'], rotation=45)
```

> 逐行：
> - `set_xticklabels([...], rotation=45)`：把横轴刻度文字**手动替换**成指定列表，并旋转 45°。
> - 注释行是 `rotation=45`（竖排）的备选。

> 📖 译注：刻度文字太长、挤在一起时用 `rotation` 旋转解决；`set_xticklabels` 的数量要和数据点数量一致，否则会错位。

#### Example 22 · Y 轴刻度标签 `set_yticklabels`（横向柱状图）

```python
df_price.plot(ax=ax1, kind='barh', x='Year', y='Apple Price')
ax1.set_yticklabels(['2022', '2023', '2024', '2025'], rotation=45)
# ax1.set_yticklabels(['2022', '2023', '2024', '2025'], rotation=45)
```

> 逐行：
> - 因为 `kind='barh'` 是**横向**柱状图，类别在 **Y 轴**，所以改刻度要用 `set_yticklabels(...)`（不是 xtick）。
> - `rotation=45` 把 Y 轴标签旋转 45°。

---

### A.7 综合练习 · Example 20 All in One（原 W1 篇）

```python
gs = gridspec.GridSpec(2, 2)
ax1 = fig.add_subplot(gs[:, 0])
ax2 = fig.add_subplot(gs[0, 1])
ax3 = fig.add_subplot(gs[1, 1])

df_price_01 = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price_01.plot(ax=ax1, kind='bar', x='Year', color=['y','b'])
ax1.set_title('Apple and Orange - Price Over Years')
ax1.set_xlabel('Year')
ax1.set_ylabel('Price in USD $')

df_price_02 = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price_02.plot(ax=ax2, kind='line', marker='o', x='Year', y='Apple Price', color='y')
ax2.set_title('Apple Price Over Years')
ax2.grid(visible=True)

df_price_03 = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price_03.plot(ax=ax3, kind='line', marker='o', x='Year', y='Orange Price', color='b')
ax3.set_title('Orange Price Over Years')
ax3.legend(loc='best')

plt.show()
```

> 逐行（按区块）：
> - 布局：`GridSpec(2,2)`，左列通栏 `ax1`，右列上 `ax2`、下 `ax3` → 3 图。
> - 左上 `ax1`：柱状图，`color=['y','b']` 两列分别黄/蓝，配 `set_title` + `set_xlabel` + `set_ylabel`。
> - 右上 `ax2`：Apple Price 折线（黄色），配 `set_title` + `grid(visible=True)`。
> - 右下 `ax3`：Orange Price 折线（蓝色），配 `set_title` + `legend(loc='best')`。
> - 这张图 = 本文件夹所有知识点的「一页式总结」。

> 🔴 考点：这是全文件夹的**集大成**，几乎每题必考的一个文件；把「布局 + 类型 + 样式」三块串起来就掌握了 Workshop 1 的代码。

---

### A.8 作业模板（原 W1 篇）

- `EIE1005_Part01_Workshop01_StudentID.py`：**空文件**，是 Workshop 1 报告（Part 01）的起点，要求你自己写代码，用 `EIE1005_Part01_Workshop01_Data.xlsx` 画图。
- `EIE1005_Part02_Workshop02_StudentID.py`：**空文件**，对应 Workshop 1 报告（Part 02），用 `EIE1005_Part02_Workshop02_Data.xlsx` 画图。

> 📖 译注（数据说明）：
> - `Part01_Workshop01_Data.xlsx`：`Department`（各学院就业/深造人数）、`Sector`（行业平均月薪）、`Range`（月薪区间毕业生人数）。
> - `Part02_Workshop02_Data.xlsx`：`Level`/`Age`/`Major`/`Gender` 各维度下的薪资数据，适合做柱状/饼图/多图布局练习。

> 🔴 考点：提交文件要**把 `StudentID` 换成你自己的学号**，这是 Canvas 作业的常见命名要求。



### A.9 原 W1 篇自测（答案折叠）

**Q1** 代码 `import matplotlib.pyplot as plt` 中，`plt` 是（ ）
A. 一个变量名，可随意改
B. `pyplot` 模块的别名，代表 Matplotlib 的画图入口
C. 必须叫 `plt`，改了就报错

<details><summary>点我看答案</summary>

**B**。`as plt` 是起别名，`plt` 只是约定俗成的简写（换成 `p` 也能跑，但会破坏习惯）。思路：`import X as Y` = 导入 X 并命名为 Y。易错点：把「别名」当成「不可改的关键字」。

</details>

**Q2** 要把「竖柱状图」改成「横向柱状图」，最小改动是（ ）
A. 把 `x='Year'` 改成 `y='Year'`
B. 把 `kind='bar'` 改成 `kind='barh'`
C. 把 `ax=ax1` 删掉

<details><summary>点我看答案</summary>

**B**。`barh` = bar + horizontal。结论：图表类型只看 `kind=`。易错点：`barh` 的类别在 Y 轴，改刻度时要用 `set_yticklabels` 而不是 `set_xticklabels`。

</details>

**Q3** `GridSpec(2, 2)` 配合 `ax1 = fig.add_subplot(gs[:, 0])` 最终画出几张图？`gs[:, 0]` 表示什么？

<details><summary>点我看答案</summary>

共 3 张图。`gs[:, 0]` 的冒号表示「第 0 列的所有行」，即把左列上下两格合并成一张通栏大图；右列 `[0,1]`、`[1,1]` 各一张小图。思路：`[行, 列]`，`:` 是切片取全部。易错点：把 `[:, 0]` 理解成「第 0 行」——错，第一个下标才是行。

</details>

**Q4** 饼图与折线/柱状图在参数上的最大区别是（ ）
A. 用 `x=` 指定类别、`y=` 指定数值
B. 用 `y=` 指定数值、`labels=` 指定扇区标签，没有 `x=`
C. 饼图不需要 `kind=` 参数

<details><summary>点我看答案</summary>

**B**。饼图写法：`df.plot(ax=ax1, kind='pie', y='Apple Price', labels=df_price['Year'])`。结论：饼图靠 `y`（大小）+ `labels`（标签）。易错点：给饼图写 `x=` 是多余/错误的。

</details>

**Q5** 想把 Apple、Orange 两条折线画在**同一张图**上，关键做法是（ ）
A. 两次调用 `.plot()` 时都写 `ax=ax1`（同一个 Axes）
B. 每次新建一个 Figure
C. 把两条线的数据拼成一个 DataFrame 后只画一次

<details><summary>点我看答案</summary>

**A**（C 也能实现，但不是本课件演示的做法）。课件 Example 04 的做法是：同一个 `ax1` 上连续调用两次 `.plot()`。思路：`ax=` 指定落点，同落点即叠加。易错点：忘了写 `ax=ax1` 会各画各的，叠不到一起。

</details>

**Q6** `alpha=0.1` 与 `color=['g','y']` 分别控制什么？

<details><summary>点我看答案</summary>

`alpha=0.1` 控制**透明度**（0 全透明～1 不透明，面积图叠加时用）；`color=['g','y']` 控制**多列数据分别的颜色**（第一列绿、第二列黄）。思路：alpha=透明度，color 列表=按列配色。易错点：给单个系列配多色列表会长度不匹配。

</details>

---

---

### A.10 强化练习（原 W1 篇）

> 建议：先独立做，再展开答案；做错的回到正文对应小节重看。

> 记忆口诀（三句话）：
> - **图表类型看 `kind`**：line / area / bar / barh / pie，堆叠加 `stacked=True`。
> - **布局看 `GridSpec` + `add_subplot`**：`GridSpec(行, 列)` 划格子，`gs[行, 列]` 放图，`gs[:, 0]` 是整列通栏。
> - **样式看 `set_xxx`**：title / xlabel / ylabel / legend / grid / color / rotation。

**Q7（连线）** 把图表类型和要写的 `kind=` 配对：
- 左：折线图、面积图、柱状图、横向柱状图、饼图
- 右：`'line'`、`'area'`、`'bar'`、`'barh'`、`'pie'`

<details><summary>点我看答案</summary>

line=折线图，area=面积图，bar=柱状图，barh=横向柱状图，pie=饼图。易错点：`barh` 是「横向」不是「堆叠」；堆叠是另加 `stacked=True`。

</details>

**Q8（填空）** 写出这些「样式方法」的作用：
1. `ax1.set_title(...)` → ______
2. `ax1.set_xlabel(...)` / `ax1.set_ylabel(...)` → ______
3. `ax1.legend(...)` → ______
4. `ax1.grid(...)` → ______
5. `color=` → ______
6. `ax1.set_xticklabels([...], rotation=45)` → ______

<details><summary>点我看答案</summary>

1 图标题；2 横/纵轴标签；3 图例；4 网格线；5 颜色；6 横轴刻度文字并旋转 45°。易错点：`set_title` 是「这张小图的标题」，`suptitle` 才是「整张画布的大标题」。

</details>

**Q9（单选）** `plt.figure(figsize=(15, 9))` 里的 `15` 和 `9` 表示（ ）
A. 150×90 像素
B. 宽 15 英寸、高 9 英寸
C. 15 列 9 行

<details><summary>点我看答案</summary>

B。`figsize=(宽, 高)`，单位是英寸。思路：约 16:9 宽屏比例。易错点：误以为是像素。

</details>

**Q10（单选）** 要画「左右并排的 2 张图」，`GridSpec` 应写（ ）
A. `GridSpec(1, 2)`
B. `GridSpec(2, 1)`
C. `GridSpec(2, 2)`

<details><summary>点我看答案</summary>

A。`GridSpec(行, 列)`：`(1,2)` 是 1 行 2 列 = 左右并排；`(2,1)` 是上下两行；`(2,2)` 是 4 格。易错点：把行、列顺序记反。

</details>

**Q11（代码补全）** 补全：画「Apple Price 随 Year 变化的折线图，带圆点标记」：
```python
df_price.plot(ax=ax1, kind=______, marker=______, x=______, y=______)
```

<details><summary>点我看答案</summary>

```python
df_price.plot(ax=ax1, kind='line', marker='o', x='Year', y='Apple Price')
```
易错点：`marker='o'` 是字母 o（circle），不是数字 0。

</details>

**Q12（找错）** 下面想画「饼图」，哪写错了？
```python
df_price.plot(ax=ax1, kind='pie', x='Year', y='Apple Price')
```

<details><summary>点我看答案</summary>

饼图不用 `x=`。正确写法：
```python
df_price.plot(ax=ax1, kind='pie', y='Apple Price', labels=df_price['Year'])
```
思路：饼图 = `y`（数值决定扇区大小）+ `labels`（分类标签）。

</details>

**Q13（判断）** `marker='o'` 只在折线图里有效，柱状图不能用。（对 / 错）

<details><summary>点我看答案</summary>

错。`marker` 是「数据点标记」，折线图最常用（如 `marker='o'`）；柱状图本身用柱子表示数据，一般不需要 marker，但并非语法禁止。

</details>

**Q14（单选）** `alpha=0.1` 控制的是（ ）
A. 颜色深浅
B. 透明度
C. 线条粗细

<details><summary>点我看答案</summary>

B。`alpha` 取值 0（全透明）~1（不透明）。面积图里设 0.1 是为了两条面积重叠时都能看清。易错点：别和 `color` 混淆。

</details>

**Q15（单选）** 把两条折线画在同一张图上，关键是（ ）
A. 两次 `.plot()` 都写 `ax=ax1`
B. 每次新建一个 `figure`
C. 用两个不同的 `GridSpec`

<details><summary>点我看答案</summary>

A。同一个 Axes 上多次 `.plot()` 即叠加（Example 04）。易错点：忘了写 `ax=ax1` 会各画各的图。

</details>

**Q16（填空）** `ax1 = fig.add_subplot(gs[:, 0])` 中，`gs[:, 0]` 表示取 GridSpec 的 ______（行/列）全部、第 ______ 列，结果是一张左侧通栏大图。

<details><summary>点我看答案</summary>

行方向全部、第 0 列。思路：`[行, 列]`，冒号 `:` 是「全部」，写在第一位就是「所有行」。易错点：把第一个下标当成列。

</details>

**Q17（代码补全）** 补全：横向柱状图 + 堆叠所有数值列：
```python
df_price.plot(ax=ax1, kind=______, stacked=______, x='Year')
```

<details><summary>点我看答案</summary>

```python
df_price.plot(ax=ax1, kind='barh', stacked=True, x='Year')
```
思路：不写 `y=` 时画全部数值列；`stacked=True` 把它们堆成一根柱。

</details>

**Q18（找错）** 下面想给 X 轴刻度旋转 45°，哪写错了？
```python
df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')
ax1.set_yticklabels(['2022', '2023', '2024', '2025'], rotation=45)
```

<details><summary>点我看答案</summary>

竖柱状图 `kind='bar'` 的年份在 **X 轴**，应改用 `set_xticklabels`；`set_yticklabels` 对应横向柱状图 `kind='barh'`（此时类别才在 Y 轴）。易错点：横向/纵向对应的轴记混。

</details>

**Q19（综合排序）** 把「画一张带标题、轴标签、网格的柱状图」的正确代码顺序排好：
① `df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')`
② `import pandas as pd` / `import matplotlib.pyplot as plt`
③ `plt.show()`
④ `ax1.set_title('Apple Price Over Years')` / `ax1.set_xlabel('Year')` / `ax1.grid(visible=True)`
⑤ `fig = plt.figure(figsize=(15, 9))` / `gs = gridspec.GridSpec(1,1)` / `ax1 = fig.add_subplot(gs[0,0])`

<details><summary>点我看答案</summary>

② → ⑤ → ① → ④ → ③。思路：先导入 → 建画布和坐标轴 → 画图 → 加样式 → 显示。这就是本课所有例子的「骨架」。

</details>

**Q20（记忆复述）** 不看笔记，口头复述三句口诀（图表类型 / 布局 / 样式分别看什么）。

<details><summary>点我看答案</summary>

类型看 `kind`；布局看 `GridSpec + add_subplot`；样式看 `set_xxx + legend/grid/color/rotation`。能完整复述即代表你已掌握本课主线。

</details>

### A.11 答疑补充（原 W1 篇）

> 📖 译注 · `fig.add_subplot(gs[0, 0])` 到底在干什么？
> - `gs` 是 GridSpec 网格规划表：由 `fig.add_gridspec(行数, 列数)` 创建，只负责把画布分成几行几列，本身不是图。
> - `gs[0, 0]` = 第 0 行、第 0 列（左上角）那个格子，下标从 0 开始。
> - `fig.add_subplot(gs[0, 0])` = 把这个格子变成一个坐标轴 Axes，之后在这个 Axes 里画图。
> - 任意布局来自 GridSpec 的切片写法：`gs[0, :]` 占整行、`gs[:, 0]` 占整列、`gs[0, 1:]` 跨列合并；`add_subplot` 本身只负责把格子变成坐标轴。

> 📖 译注 · `subplots_adjust(...)` 到底在干什么？
> - 它只做一件事：调整子图之间的间距 + 子图区域四周的留白（纯排版），不改数据、不改坐标范围、不改子图个数。
> - 参数（0~1 比例）：`left / right / bottom / top` 控制子图区域距画布四边的距离；`wspace` 控制横向间距、`hspace` 控制纵向间距（以子图平均宽/高的比例计）。
> - 默认约：left=0.125、right=0.9、bottom=0.11、top=0.88、wspace=0.2、hspace=0.2。
> - 何时用：子图挤在一起、标签重叠 → 加大 `hspace`/`wspace`；想给大标题留位置 → 调小 `top`。
> - 自动替代：`plt.tight_layout()`，或创建 figure 时传 `constrained_layout=True`。

> 🔴 考点：`gs[行, 列]` 第一个下标是行、第二个是列；`:` 是“取整行/整列”的切片；把 `[:, 0]` 理解成“第 0 行”是常见错误。

---

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

---

---

## 参考来源（本次新增）
> 🌐 你提供的 5 篇参考，2026-09-23 读取状态：
> - ✅ [15 个可视化图表（cnblogs）](https://www.cnblogs.com/fanruan/p/19955941)：已读取，用于 §二选型速查与误区。
> - ✅ [可视化设计与图表配置技巧（FineBI）](https://www.finebi.com/blog/article/68d52cf428946ecca8ed5264)：已读取（含商业推广，仅取设计原则，用于 §二点四/二点五/五）。
- ✅ 用户粘贴文章《Matplotlib 图表美化：内置样式 / qbstyles / matplotx / mplcyberpunk / 自定义 .mplstyle》（2026-09-23 由你提供全文）：已并入 §五主题美化（并修复原文格式错乱与 `dark =Fasle` 笔误）。
> - ⚠️ https://blog.51cto.com/aiweker/13318911：无法访问（页面解析失败），内容未纳入；推测为 pyecharts 指南，等你能访问时补。
> - ⚠️ https://zhuanlan.zhihu.com/p/346416675：403 无法访问，内容未纳入。
> - ⚠️ https://blog.csdn.net/fuhanghang/article/details/128016831：521 无法访问，内容未纳入。
> 🌐 官方来源：Matplotlib Gallery https://matplotlib.org/stable/gallery/index.html ；渐变柱 https://matplotlib.org/stable/gallery/lines_bars_and_markers/gradient_bar.html ；颜色条放置 https://matplotlib.org/stable/users/explain/axes/colorbar_placement.html ；Plotly https://plotly.com/python/ ；pyecharts https://pyecharts.org/ 。

---

> 🌐 v10 新增来源：Canvas 130052《Part 01 - From Data.pdf》(133 页)；官方 Pyplot/Quick start/Plot types、pandas 10min、Python Graph Gallery；MIT OCW 6.100L L25；《Python for Data Analysis 3e》(McKinney)、《Fundamentals of Data Visualization》(Wilke)、《Storytelling with Data》(Knaflic)、《The Visual Display of Quantitative Information》(Tufte)。检索于 2026-09-25。
## 更新记录
- 2026-09-25 v10（全对齐 PPT 代码格式）：主教学代码全部改为 PPT 同款骨架（plt.figure/subplots_adjust/suptitle/GridSpec/add_subplot/df.plot/show）；修正刻度旋转 45°、颜色/标记表按 PPT；新增第 0.5 步四原则（反例→修正）；第 4 步每图附 Graph Gallery；第 7 步改双作业 WS01(A)+(B) 并补 GES2023 关键数据；第 10 步三版全部 PPT 骨架；新增附录 B 资源书单；内容源自 Canvas 130052 全文。
- 2026-09-24 v9（方案 A 重写）：第 1~10 步阶梯式重排；重点=四种写法与进阶美化。
- 更早记录见 git 历史。

