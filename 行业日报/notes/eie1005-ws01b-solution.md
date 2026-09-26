# EIE1005 · WS01(B) 个人作业逐行讲解 + 子图排版间距专题

> 按 note-organizer 规则：你的代码为正文（代码块），后加讲解 / 易错 / 拓展用引用块。原文件：`C:\Users\19461\OneDrive\Desktop\EIE1005_26107541D_Workshop_01_B\EIE1005_26107541D_Workshop_01_B.py.py`

## 📎 原始文件与数据
- 脚本：`C:\Users\19461\OneDrive\Desktop\EIE1005_26107541D_Workshop_01_B\EIE1005_26107541D_Workshop_01_B.py.py`（60 行）
- 数据：`EIE1005_Part02_Workshop02_Data.xlsx`，四张表 Level / Age / Major / Gender

## ⏱ 30 秒速览

- **一句话**：一张 2×3 网格的薪资 Dashboard——学历横柱（按值分三色）、年龄折线、专业柱状、男/女两张饼图。
- **三个要点**：① 骨架 = PPT 同款（figure→GridSpec→df.plot）；② 学历图用列表推导式按 Salary 分三档颜色；③ 排版与间距靠 `subplots_adjust` / `GridSpec(wspace, hspace)` 调整。
- **关键词**：GridSpec、df.plot、颜色分档、legend handles、subplots_adjust、wspace/hspace、tight_layout、set_position。

---

## 一、逐行讲解

### 1. 导入（1–4 行）

```python
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import matplotlib.patches as mpatches
```

> 📖 译注：前三行 PPT 标准三件套；第 4 行 `mpatches` 用于**自定义图例颜色块**（见 26–30 行）。

### 2. 画布与总标题（6–8 行）

```python
fig = plt.figure(figsize=(15, 9))
plt.subplots_adjust(top=0.9, bottom=0.1, left=0.1, right=0.95)
fig.suptitle('FUTURENOVA: GALACTIC CAREER & SALARY INSIGHTS DASHBOARD', fontsize=24, fontweight='bold')
```

> 📖 译注：`subplots_adjust` 只设了四周边距，**没设 `wspace/hspace`**（子图间距）——专题三会补。
> ⚠️ 易错：总标题写成了科幻名，建议改为 `USA College Graduate Salary: 2025 Projection`，与数据一致（Q2 要求）。

### 3. 五图布局（10–15 行）

```python
axis = gridspec.GridSpec(2, 3)
ax1 = fig.add_subplot(axis[:, 0])   # 左列整列合并 → 通栏大图
ax2 = fig.add_subplot(axis[0, 1])   # 右上
ax3 = fig.add_subplot(axis[0, 2])   # 右中上
ax4 = fig.add_subplot(axis[1, 1])   # 右下
ax5 = fig.add_subplot(axis[1, 2])   # 右最下
```

> 📖 译注：`axis[:, 0]` 的冒号=取整列（上下两格合并），共 **5 张图**。
> ⚠️ 易错：WS01(B) Q1 只允许 **1/2/3/4 张图**，5 张超范围——建议砍成 2×2 四图（把两张饼图合成双环饼）。

### 4. 图 1 · 学历横柱 + 按值分三色（17–30 行）

```python
df1 = pd.read_excel('EIE1005_Part02_Workshop02_Data.xlsx', sheet_name='Level')
colors = ['#b41f60' if v >= 100000 else ("#3e4197" if v >= 50000 else '#1fb424')
          for v in df1['Salary']]
df1.plot(ax=ax1, kind='barh', x='Level', y='Salary', color=colors)
```

> 📖 译注 · 逐行：
> - 列表推导式：`v` 依次=每行 Salary，`>=100000` 红、`>=50000` 蓝、否则绿。
> - `kind='barh'` 横向柱：类目在 y 轴、数值在 x 轴。
> - pandas 的 `color` 按**列**取色，而这里每行一色——**能跑通是因为 pandas 对单列 bar 会把它当逐柱颜色列表**；多列时就要换 `ax.barh(...)`。

```python
ax1.set_title('Salary by Educational Backgrounds', fontweight='bold')
ax1.set_xlabel('Salary in USD', fontweight='bold')
ax1.set_ylabel('Educational Level', fontweight='bold')
ax1.grid(linestyle='--', alpha=0.5, axis='x')
ax1.set_axisbelow(True)
```

> 📖 译注：barh 数值方向是 x，所以网格 `axis='x'` 正确；`set_axisbelow(True)` 让网格压在柱下面。

```python
ax1.legend(handles=[
    mpatches.Patch(color='#22bd60', label='<= 50,000'),
    mpatches.Patch(color='#bd2222', label='50,000-100,000'),
    mpatches.Patch(color='#2222bd', label='> 100,000'),
], loc='lower right', fontsize=8, title='Salary')
```

> ⚠️ 易错：图例颜色/区间与柱色**对不上**——柱色是 `>=100000` 红、`>=50000` 蓝、其余绿；图例却写"红=5万~10万、蓝=>10万"。应改成：
> `Patch('#b41f60', '> 100,000')`、`Patch('#3e4197', '50,000–100,000')`、`Patch('#1fb424', '< 50,000')`。

### 5. 图 2 · 年龄折线（32–41 行）

```python
df2 = pd.read_excel('EIE1005_Part02_Workshop02_Data.xlsx', sheet_name='Age')
df2.plot(ax=ax2, kind='line', x='Age', y='Salary', color='g', marker='o')
new_func(ax2)
ax2.set_ylabel('Salary in USD', fontweight='bold')
ax2.set_xlabel('Age Groups', fontweight='bold')
ax2.grid(linestyle='--', alpha=0.5, axis='y')
ax2.set_ylim(0, 80000)
ax2.set_axisbelow(True)
```

> 🔴 严重：第 36 行 `new_func(ax2)` **函数未定义**，运行到这会 `NameError: name 'new_func' is not defined`——删掉这行，或先 `def new_func(ax): ...`。
> ⚠️ 易错：`x='Age'` 是文本列，pandas 折线图 x 轴标签会错乱（实测 "65+" 出现两次）。改法：`df2 = df2.set_index('Age')` 后不写 `x=`，或用 `set_xticks/set_xticklabels`。
> 📖 译注：`set_ylim(0, 80000)` 从 0 起避免夸大波动，好评。

### 6. 图 3 · 专业柱状（43–50 行）

```python
df3.plot(ax=ax3, kind='bar', x='Major', y='Salary', color='#27892a')
ax3.set_xticklabels(df3['Major'], rotation=0, fontsize=6)
```

> ⚠️ 易错：竖柱 + 7 个长专业名 + `rotation=0` → 标签重叠。改 `rotation=45` 或干脆 `kind='barh'`（检查清单 Readability：名字必须完整可读）。

### 7. 图 4 / 5 · 男、女饼图（52–58 行）

```python
df4.plot(ax=ax4, kind='pie', y='Male', color='#167883', labels=df4['Level'], autopct='%1.1f%%')
df5.plot(ax=ax5, kind='pie', y='Female', color='#838116', labels=df5['Level'], autopct='%1.1f%%')
```

> 📖 译注：Gender 表是"不同性别里各学历的**人数**"，所以 `y='Male'/'Female'` + `autopct` 画出的正是**占比**，用法正确。
> ⚠️ 易错：pandas 饼图会**忽略单个颜色字符串**（实测显示默认蓝橙绿）。想自定义要传列表：
> `color=['#167883', '#22a6b3', '#95afc0']`（3 块 3 色）。
> 📖 拓展：两张饼可合成**双环饼**（外环 Male radius=1、内环 Female radius=0.7，各配 `wedgeprops=dict(width=0.3)`），从而把 5 图压成 4 图。

---

## 二、易错与修正清单（汇总）

| # | 问题 | 修正 |
|---|---|---|
| 1 | `new_func(ax2)` 未定义 → NameError | 删除或先定义 |
| 2 | 图例颜色区间与柱色对不上 | 按柱色重写三个 Patch |
| 3 | 5 图超 Q1 的 1–4 | 双饼合并 → 2×2 四图 |
| 4 | pie 单色被忽略 | 给颜色列表 |
| 5 | ax3 标签重叠 | rotation=45 或 barh |
| 6 | ax2 `x='Age'` 文本刻度乱 | set_index 或手动刻度 |
| 7 | suptitle 与数据无关 | 改成 USA 薪资主题 |

---

## 三、专题 · 子图排版与间距

### 3.1 `subplots_adjust` 六个参数

```python
plt.subplots_adjust(left=0.1, right=0.95, top=0.9, bottom=0.1,
                    wspace=0.3, hspace=0.35)
```

| 参数 | 含义 | 常用值 |
|---|---|---|
| `left / right` | 图区左右边界（画布宽的比例） | 0.1 / 0.95 |
| `top / bottom` | 图区上下边界 | 0.9 / 0.1 |
| `wspace` | **左右子图间距**（占子图平均宽的比例） | 0.2–0.4 |
| `hspace` | **上下子图间距**（占子图平均高的比例） | 0.2–0.4 |

### 3.2 GridSpec 自带间距（推荐，边建网格边设）

```python
axis = gridspec.GridSpec(2, 2,
                         wspace=0.3, hspace=0.35,          # 子图间距
                         width_ratios=[1.5, 1],            # 列宽比：左 1.5 右 1
                         height_ratios=[1, 1.2])           # 行高比
```

- `width_ratios / height_ratios`：各列/各行的宽度比例（列表长度 = 列数/行数）。
- 优点：间距在建网格时就定好，不用事后 `subplots_adjust` 再调。

### 3.3 自动排版（一劳永逸）

```python
fig = plt.figure(figsize=(15, 9), constrained_layout=True)  # 建图时开启
# 或画完后：
fig.tight_layout()     # 自动收拢，标签不被裁
fig.tight_layout(pad=1.5, w_pad=1.0, h_pad=1.0)   # 还可调 pad
```

- `tight_layout()`：一次自动算间距（最省事）；
- `constrained_layout=True`：连 colorbar、suptitle 都一起避让（更智能）；
- 坑：两者**别和 `subplots_adjust` 同时用**，会互相覆盖。

### 3.4 手动微调单个子图

```python
ax2.set_position([0.42, 0.55, 0.25, 0.35])   # [left, bottom, width, height]，画布 0~1 坐标
```

### 3.5 你的 5 图布局推荐参数

```python
axis = gridspec.GridSpec(2, 3, wspace=0.5, hspace=0.45,
                         width_ratios=[1.3, 1, 1])
# 左列通栏图稍宽，右侧四小图彼此留 0.5 倍子图宽、上下留 0.45 倍高的间距
```

---

## 四、自测（答案折叠）

<details><summary>Q1 `wspace/hspace` 的单位是什么？</summary>
不是像素，是"占子图平均宽/高的比例"。0.3 表示间距 = 子图宽度的 30%。</details>
<details><summary>Q2 `tight_layout` 和 `subplots_adjust` 能一起用吗？</summary>
不建议。tight_layout 会自动重算间距并覆盖 subplots_adjust 的值；二选一。</details>
<details><summary>Q3 `width_ratios=[2,1]` 表示什么？</summary>
第 1 列宽度是第 2 列的 2 倍；配合 `GridSpec(1,2)` 得到"左宽右窄"布局。</details>

## 更新记录
- 2026-09-26 首次整理：对你 60 行 WS01(B) 脚本逐行讲解；汇总 7 处易错；新增「子图排版与间距」专题（subplots_adjust / GridSpec 间距 / tight_layout / set_position）。
