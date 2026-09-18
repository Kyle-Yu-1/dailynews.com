# EIE1005 · Workshop 1 数据可视化 Python 代码逐行讲解（06 Python Project Folder）

> 本页 = Workshop 1「Data Visualization – From Data to Insight」的 **Python 项目文件夹**整理；面向初学者，把 22 个 Matplotlib 示例**逐文件、逐行**讲清楚，并补充考点与拓展。课件原文（每个 `.py` 的完整代码）见「📎 原始课件」中的逐文件原文，两者可互跳。

## 📎 原始课件
- 原始压缩包：`行业日报/files/eie1005/EIE1005-DataViz-06-Python-Project-Folder-Student.zip`（49,941 bytes）
- 逐文件原文（全部 `.py` 完整代码）：`行业日报/files/eie1005/dataviz06-python-project-原文.txt`
- 数据文件（Excel）：
  - `EIE1005_Part01_Data.xlsx` → sheet `Price`（Year / Apple Price / Orange Price）
  - `EIE1005_Part01_Workshop01_Data.xlsx` → sheet `Department`、`Sector`、`Range`
  - `EIE1005_Part02_Workshop02_Data.xlsx` → sheet `Level`、`Age`、`Major`、`Gender`
- 同课其它课件（Canvas「Week 3 and 4: Workshop 1: Data Visualization」模块）：
  - `00 - Introduction.pdf`、`01 - Part 01 - From Data.pdf`、`01 - Part 01 - Workshop 01 (A).pdf`、`02 - Part 02 - To Insight.pdf`、`02 - Part 02 - Workshop 01 (B).pdf`、`03 - Summary.pdf`、`04 - PCRoom U204C Python Setting.pdf`、`05 - Python Code Hints.pdf`

## ⏱ 30 秒速览

> 用「连环追问」30 秒抓住主线：**是什么 → 为什么 → 怎么做 → 有什么用**。

**① 这是什么？**
- 一句话：这是一份 **Matplotlib 数据可视化练习包**——用 **pandas 读 Excel 数据、Matplotlib 画图**，22 个例子从「画一条线」一路练到「多图布局 / 样式 / 刻度标签」，是 Workshop 1 报告的代码底稿。

**② 为什么要学？**
- 这门课的目标是「把数据变成图、把图讲成故事」；Matplotlib 是 Python 画图的事实标准，22 个例子正好覆盖你交 Workshop 报告要用的全部技能。

**③ 怎么学最省力？——抓住「一个骨架 + 三个开关」**
- 一个骨架：`import` → 建 `Figure` → `GridSpec` 划格子 → `add_subplot` 建坐标轴 → `read_excel` 读数据 → `df.plot()` 画图 → `plt.show()` 显示。
- 开关一（类型）：只改 `kind=`，取值 `line`（折线）/ `area`（面积）/ `bar`（柱状）/ `barh`（横向柱状）/ `pie`（饼图）；堆叠加 `stacked=True`。
- 开关二（布局）：只改 `GridSpec(行, 列)` 与 `gs[行, 列]`，`gs[:, 0]` 是整列通栏。
- 开关三（样式）：`set_title / set_xlabel / set_ylabel`（文字）、`legend / grid`（图例/网格）、`color / rotation`（颜色/刻度旋转）。

**④ 学完能干什么？**
- 能把 Excel 数据独立画成「带标题、轴标签、图例、网格」的图，并按「Q1 几张图 → Q2 讲什么故事 → Q3 什么类型 → Q4 什么样式」的清单完成 **Workshop 01 (A)**。

**三条结论（闭卷能复述才算记住）**
1. 骨架统一：22 个例子结构完全一样，只换「读数据 + 画图」那两行。
2. 类型看 `kind`：`line / area / bar / barh / pie`，堆叠靠 `stacked=True`。
3. 美观三招：文字（`set_title/set_xlabel/set_ylabel`）、图例网格（`legend/grid`）、颜色刻度（`color/rotation`）。

**关键词**：pandas、DataFrame、Matplotlib、pyplot、Figure、Axes、GridSpec、read_excel、plot、kind、legend、grid、xticklabels、rotation。

## 前置 / 后接
- 前置：L1「数据分析五步、数据表示」；L2 的「数据可视化」铺垫。
- 后接：Workshop 1 报告（WS01 A，Week 3/4 提交）；Test 1（覆盖 L1+L2+W1）。

---

## 目录结构（解压后）

```text
EIE1005 - Data Visualization - 06 - Python Project Folder - Student/
├── EIE1005_Part01_Example01~22 ...py   # 22 个教学示例
├── EIE1005_Part01_Workshop01_StudentID.py   # 空模板（作业：Part01）
├── EIE1005_Part02_Workshop02_StudentID.py   # 空模板（作业：Part02）
├── EIE1005_Part01_Data.xlsx                 # Price 表
├── EIE1005_Part01_Workshop01_Data.xlsx      # Workshop1 数据
├── EIE1005_Part02_Workshop02_Data.xlsx      # Workshop2 数据
└── .vscode/settings.json                    # VS Code 配置（可忽略）
```

> 📖 译注：压缩包里还混有 macOS 的 `__MACOSX/`、`._*`、`.DS_Store` 文件，都是苹果系统生成的元数据，**与课程无关，直接忽略**。

---

## 零、环境配置（课件 1.2 Working Environment 全文整理 · P14–31）

> 本节把课件「1.2 Working Environment」（P14–31）与「1.3 Files, Data and Display」里的 VS Code 部分（P33–45）**原文整理**成笔记；带 `> 🧠 拓展` / `> 📖 译注` 的是后加内容，其余为课件原文。

### 0.1 为什么用 Python（P16–17）

课件原文要点（P16 · Python）：
- **High-level & General-purpose**：高层、通用，几乎任何任务都能做；
- **Human-readable**：语法清晰、优先可读性；
- **Focus on Logic**：自动管理内存，专注逻辑；
- **Interpreted**：无需复杂编译即可直接运行，适合快速原型；
- **Dynamic Typing**：无需手动声明变量类型，Python 自动推断；
- **Power Included**：自带庞大的标准库（数学、文件 I/O、网络等）。

课件原文（P17 · Python - Data Science & AI）：
- **Data Analysis**：用 NumPy & Pandas 处理大规模数据，用 Matplotlib & Plotly 展示数据；
- **AI & Machine Learning**：用 TensorFlow & PyTorch 构建 ChatGPT、人脸识别等；
- 结论：**"Python is the #1 language for Data Analysis and AI"**（本课所在的位置）。

> 🔴 考点：Python 的特点常考 `interpreted`（解释型）、`dynamic typing`（动态类型）、`high-level`；P17 的「四大库 NumPy/Pandas/Matplotlib/Plotly + 两大框架 TensorFlow/PyTorch」也常考。

### 0.2 先分清：装什么、不装什么（后加避坑）

| 要装 | 不要装 |
|---|---|
| **Anaconda（Python 发行版）** | `r-mass` 这类 **R 语言包**（R 是另一门统计语言，与本课无关） |
| **VS Code + Python 扩展** | anaconda.org 上零散的「单个包」页面 |
| 后面补 `openpyxl` | —— |

> 📖 译注：很多人会在 `anaconda.org` 搜到 `r-mass` 就以为要装它——那是 R 的 MASS 包，**跳过**。要下载的是 `anaconda.com/download` 的 **Anaconda Distribution 安装包**（一个 `.exe`）。

### 0.3 Anaconda 与虚拟环境（P18–21）

课件原文（P18 · Anaconda Virtual Environment）：
- **为什么用虚拟环境**：Python 项目应使用 virtual environment 来管理和隔离依赖，防止冲突与包混乱；
- **为什么 Anaconda**：面向数据科学最流行的发行版，打包了 **Python 解释器、包管理器（conda, pip）、常用分析库（NumPy, Pandas, Matplotlib, Plotly）**。

课件原文（P19 · Isolation is Key）：
- **Conflict Prevention**：保证项目 A 的库不会弄坏项目 B；
- **Package Clutter**：保持全局 Python 安装干净。

课件原文 4 步命令（P20 · Virtual Environment Setup）：

```bash
# 1. Create Environment：创建名为 py_01 的隔离环境，带全套 anaconda
conda create --name py_01 anaconda

# 2. Activate Environment：进入环境（命令行提示符变成 (py_01)）
conda activate py_01

# 3. Verify Installation：验证，应输出 Python 3.x.x
python --version

# 4. Install Extra Packages：需要时用 conda 或 pip 补装
pip install plotly
```

课件原文背景（P21 · Why We Need Anaconda）：Anaconda 创立于 2012 年（原 Continuum Analytics，2017 年更名 Anaconda），为解决早期「装一个库（如 NumPy）会弄坏另一个库」的 **Dependency Hell** 而生；它开发的 **conda** 包管理器能同时处理 Python 与非 Python 依赖，把复杂配置变成「一键式」；如今是全球数据科学标准，用户超 4,500 万。

> 🧠 拓展：这份项目代码还要读 `.xlsx`，课件四库不含 `openpyxl`，请补装：
> ```bash
> pip install openpyxl
> ```

### 0.4 四大核心库（P23–31 原文）

课件原文（P24）：数据科学生态 = **Process（处理）→ Analyze（分析）→ Visualize（可视化）**，本课聚焦四个库：**NumPy、Pandas、Matplotlib、Plotly**。

按课件原文逐一整理（P27–30）：

| 库 | 用途（原文） | 安装命令（原文） | 导入写法（原文） |
|---|---|---|---|
| **NumPy** | 高性能数值计算；快速多维数组操作，是多数重型数据处理库的基础 | `pip install numpy` 或 `conda install numpy` | `import numpy as np` |
| **Pandas** | 数据分析与操作；核心组件是 DataFrame（可编程电子表格），用于清洗、重塑、探索数据 | `pip install pandas` 或 `conda install pandas` | `import pandas as pd` |
| **Matplotlib** | 静态 2D 画图；Python 默认绘图库，可靠稳健，对静态图提供细粒度控制 | `pip install matplotlib` 或 `conda install matplotlib` | `import matplotlib.pyplot as plt` |
| **Plotly** | 交互式网页画图；现代、基于 JavaScript，支持在浏览器中缩放、平移、悬停 | `pip install plotly` 或 `conda install plotly` | `import plotly.express as px` / `import plotly.graph_objects as go` / `import plotly.io as pio` |

课件原文「选库总结」表（P31 · Choosing the Right Library）：

| 库 | 类别 | 主要用途 |
|---|---|---|
| NumPy | Processing | 高速数学运算与数组 |
| Pandas | Processing | 数据清洗、操作（类 Excel） |
| Matplotlib | Visualization | 论文/报告用的静态精确图表 |
| Plotly | Visualization | 交互式仪表盘与网页探索 |

> 🔴 考点：本课代码固定 `import pandas as pd`、`import matplotlib.pyplot as plt`、`import matplotlib.gridspec as gridspec`；P25 原句「Matplotlib 是 Pandas 的默认绘图引擎」也可能考。Plotly 的三种 import（px / go / pio）只在本节出现，项目代码里未用到。

### 0.5 VS Code 工作台（P22、P33–45）

课件原文（P22 · The Workbench）：
- VS Code 是强大的**开源编辑器**，用于编写和调试 Python；
- **Integrated Terminal**：不用离开编辑器就能运行 Anaconda 命令；
- **Python Extension**：提供 IntelliSense 与调试工具。

课件原文（P33–45）整理成 5 步：
1. **Launch IDE**：打开 VS Code；
2. **Open Folder**：打开项目文件夹 EIE1005；
3. 为什么用 `.py`：扩展名让编辑器把它当 Python 代码，提供语法高亮和错误检查（P35）；
4. **Install Python Extension**：在扩展市场安装 Python 扩展（P41–42）；
5. **Setup Python Interpreter**：右下角选择解释器（选 `py_01`），然后**右键 → Run Python File** 运行代码（P43–45）。

> 📖 译注：P35 课件写「Open Folder: EIE1005」，对应你解压出的 `EIE1005 - Data Visualization - 06 - Python Project Folder - Student` 文件夹。

### 0.6 路线 B · 最小化安装（后加）

> 🧠 拓展（不想装 Anaconda 时）：在 python.org 装官方 Python（安装时勾选 **Add python.exe to PATH**），然后：
> ```bash
> pip install pandas matplotlib openpyxl
> ```
> 以后凡是提示缺哪个库，就 `pip install 库名`。

### 0.7 常见报错排查（后加，实用）

| 报错 | 原因 | 解决 |
|---|---|---|
| `ModuleNotFoundError: No module named 'pandas'` | 没装 pandas，或解释器选错 | `pip install pandas`，并在 VS Code 右下角切到正确解释器 |
| `Missing optional dependency 'openpyxl'` | 缺 openpyxl | `pip install openpyxl` |
| `FileNotFoundError: 'EIE1005_Part01_Data.xlsx'` | 运行目录不对（没打开项目文件夹） | 用 VS Code「Open Folder」打开项目根目录再运行 |
| `'python' 不是内部或外部命令` | Python 没加入 PATH | 改用 **Anaconda Prompt** 运行，或重装时勾选 Add to PATH |
| 图一闪就关 | 某些命令行直接跑脚本不阻塞 | 在 VS Code 里 Run，或代码结尾保留 `plt.show()` |

### 0.8 一键速查命令卡（后加）

> 🧠 拓展（复制即用）：
> ```bash
> # Anaconda 路线：建环境 → 激活 → 补 openpyxl
> conda create --name py_01 anaconda
> conda activate py_01
> python --version
> pip install openpyxl
> 
> # 最小化路线：直接装本课所需
> pip install pandas matplotlib openpyxl
> ```


---

## 一、运行环境与「通用骨架」逐行讲解

每个示例前 6 行都一模一样，先一次性讲透；后面每个例子只讲「跟骨架不同的那几行」。

### 1.1 三行 import（导入库）

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

### 1.2 建图（Figure）+ 留白 + 大标题

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

### 1.3 划格子 + 建坐标轴（GridSpec / add_subplot）

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

### 1.4 读数据 + 画图 + 显示

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

## 二、数据准备（pandas）· Example 01–02

### Example 01 · Simple Chart - Pandas DataFrame（用代码直接造表）

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

### Example 02 · Simple Chart - Read Excel File（从 Excel 读表）

```python
df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price.plot(ax=ax1, kind='line', x='Year', y='Apple Price')
```

> 逐行：
> - 唯一变化是把 Example 01 的「手写 dict」换成 `pd.read_excel(...)`，从外部 Excel 文件读入数据，其余完全相同。
> - `sheet_name='Price'` 指定读哪个工作表。

> 🔴 考点：`read_excel` 是 pandas 的函数，需要已安装 `openpyxl` 才能读 `.xlsx`（Anaconda 一般自带；报错 `Missing optional dependency 'openpyxl'` 时 `pip install openpyxl` 即可）。

---

## 三、图表类型（kind=）· Example 03–10

> 规则：**只改 `df_price.plot(...)` 里的 `kind=` 和个别参数**，就能换图表类型；前面 6 行骨架不变。下面每个例子给出完整原文 + 新增行的逐行讲解。

### Example 03 · 折线图（单线）——加数据点 `marker='o'`

```python
df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price.plot(ax=ax1, kind='line', marker='o', x='Year', y='Apple Price')
```

> 逐行：
> - `marker='o'`：在每个数据点画一个**圆点标记**，让人一眼看出「离散的数据点」位置。常用标记还有 `'s'`（方块）、`'^'`（三角）、`'*'`（星号）。
> - 其余同骨架：折线图 `kind='line'`。

### Example 04 · 折线图（多线）——画两条线

```python
df_price = pd.read_excel('EIE1005_Part01_Data.xlsx', sheet_name='Price')
df_price.plot(ax=ax1, kind='line', marker='o', x='Year', y='Apple Price')
df_price.plot(ax=ax1, kind='line', marker='o', x='Year', y='Orange Price')
```

> 逐行：
> - 关键点：在**同一个 `ax1` 上连续调用两次 `.plot()`**，第二条线会叠画在同一张图上（Matplotlib 默认自动换颜色）。
> - 第一行画 Apple Price，第二行画 Orange Price，`x='Year'` 不变。

> 🔴 考点：同轴叠加 = 多次调用 `plot` 且 `ax=` 指向同一个 Axes 对象；若忘了写 `ax=ax1`，每次会新建一张图，就叠不到一起。

### Example 05 · 面积图 `kind='area'`

```python
df_price.plot(ax=ax1, kind='area', x='Year', y='Apple Price', alpha=0.1)
df_price.plot(ax=ax1, kind='area', x='Year', y='Orange Price', alpha=0.1)
```

> 逐行：
> - `kind='area'`：面积图（折线下方填充颜色）。
> - `alpha=0.1`：**透明度**，取值 0（全透明）~1（不透明）。设为 0.1 是为了两条面积叠在一起时还能看清彼此的交叉区域。

### Example 06 · 柱状图（标准）`kind='bar'`

```python
df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')
# df_price.plot(ax=ax1, kind='bar', x='Year')
```

> 逐行：
> - `kind='bar'`：竖柱状图。
> - 被注释的那行（`#` 开头）是备选写法：**不写 `y=`** 时，pandas 会把 `x='Year'` 之外的所有数值列都画出来（Apple + Orange 两根柱）。`#` 在 Python 里是「注释」，不执行。

> 🔴 考点：`#` 注释行不参与运行；`x`/`y` 省略规则——`y` 省略时默认画全部数值列。

### Example 07 · 横向柱状图 `kind='barh'`

```python
df_price.plot(ax=ax1, kind='barh', x='Year', y='Apple Price')
```

> 逐行：
> - `kind='barh'`：`bar` + `horizontal`，**横向柱状图**，类别沿 Y 轴排列（适合类别名很长、竖着放不下时）。

### Example 08 · 堆叠柱状图 `stacked=True`

```python
df_price.plot(ax=ax1, kind='barh', stacked=True, x='Year')
```

> 逐行：
> - `stacked=True`：**堆叠**，把多列数值叠成一根柱（用于看「总量 + 各部分占比」）。
> - 这里没写 `y=`，所以会把 Apple Price、Orange Price 两列堆叠在一起。

> 🧠 拓展（外部资料）：堆叠图适合「构成/占比」，但**不适合比较各部分的绝对大小**（因为基线不齐，人眼难比），需要精确比较时改用分组柱状图或折线图。
> 🌐 来源：Data Visualization Society 关于 bar chart 的讨论 https://www.datavisualizationsociety.org/ （检索于 2026-09-16）

### Example 09 · 饼图 `kind='pie'`

```python
df_price.plot(ax=ax1, kind='pie', y='Apple Price', labels=df_price['Year'])
```

> 逐行：
> - `kind='pie'`：饼图（显示**占比**）。
> - `y='Apple Price'`：用哪一列的值决定「扇区大小」。
> - `labels=df_price['Year']`：把 `Year` 列的值当作每个扇区的**标签**。

> 🔴 考点：饼图没有 `x=` 参数，而是用 `y`（数值）+ `labels`（分类标签）。这也是它与其它图最明显的差别。

### Example 10 · Start and End（画所有列，看起止趋势）

```python
df_price.plot(ax=ax1, kind='line', marker='o', x='Year')
```

> 逐行：
> - 这里**没有 `y=`**，所以 `Apple Price`、`Orange Price` 两列都画成折线，且都带 `marker='o'`。
> - 标题「Start and End」意在强调：折线图最能看「起点→终点」的整体变化趋势。

---

## 四、图表布局（一张画布放几张图）· Example 11–14

> 核心：`GridSpec(行数, 列数)` 决定「几格」，`fig.add_subplot(gs[行, 列])` 把图放进指定格。

### Example 11 · 1 图（基线）

```python
gs = gridspec.GridSpec(1, 1)
ax1 = fig.add_subplot(gs[0, 0])
```

> 逐行：`GridSpec(1,1)` 只有 1 格，`gs[0,0]` 放唯一一张图。这是其它布局的基线。

### Example 12 · 2 图（左右并排）

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

### Example 13 · 4 图（2×2）

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

### Example 14 · 3 图（左侧通栏大图 + 右侧两小图）

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

## 五、样式美化 · Example 15–19

> 核心：`ax1.set_xxx()` 是给**单个 Axes** 加细节；`fig.suptitle` 是给整张画布加总标题。

### Example 15 · 子图标题 `set_title`

```python
df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')
ax1.set_title('Apple Price Over Years')
```

> 逐行：`ax1.set_title('...')` 给当前这张小图（Axes）加标题；与骨架里 `fig.suptitle(...)`（整幅总标题）不同。

### Example 16 · 坐标轴标签 `set_xlabel / set_ylabel`

```python
df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')
ax1.set_xlabel('Year')
ax1.set_ylabel('Price in USD $')
```

> 逐行：
> - `set_xlabel('Year')`：横轴标签。
> - `set_ylabel('Price in USD $')`：纵轴标签，说明单位是美元 `$`。

> 🔴 考点：`set_title` 是「图标题」、`set_xlabel/set_ylabel` 是「轴标签」、`suptitle` 是「整幅总标题」，三者别混。

### Example 17 · 图例 `legend`

```python
ax1.legend(loc='best')
# ax1.legend().set_visible(False)
```

> 逐行：
> - `ax1.legend(loc='best')`：显示**图例**，`loc='best'` 让 Matplotlib 自动挑一个不挡数据的位置。
> - 注释行 `ax1.legend().set_visible(False)`：如果想**隐藏图例**，用这行（取消注释即可）。

### Example 18 · 网格线 `grid`

```python
ax1.grid(visible=True)
# ax1.grid(visible=True, axis='x')
# ax1.grid(visible=True, axis='y')
# ax1.grid(visible=False)
```

> 逐行：
> - `ax1.grid(visible=True)`：打开**网格线**，方便读数。
> - 三个注释行是可选项：`axis='x'` 只画竖线、`axis='y'` 只画横线、`visible=False` 关闭网格。

### Example 19 · 颜色 `color`

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

## 六、刻度标签旋转 · Example 21–22

### Example 21 · X 轴刻度标签 `set_xticklabels`

```python
df_price.plot(ax=ax1, kind='bar', x='Year', y='Apple Price')
ax1.set_xticklabels(['2022', '2023', '2024', '2025'], rotation=45)
# ax1.set_xticklabels(['2022', '2023', '2024', '2025'], rotation=90)
```

> 逐行：
> - `set_xticklabels([...], rotation=45)`：把横轴刻度文字**手动替换**成指定列表，并旋转 45°。
> - 注释行是 `rotation=90`（竖排）的备选。

> 📖 译注：刻度文字太长、挤在一起时用 `rotation` 旋转解决；`set_xticklabels` 的数量要和数据点数量一致，否则会错位。

### Example 22 · Y 轴刻度标签 `set_yticklabels`（横向柱状图）

```python
df_price.plot(ax=ax1, kind='barh', x='Year', y='Apple Price')
ax1.set_yticklabels(['2022', '2023', '2024', '2025'], rotation=45)
# ax1.set_yticklabels(['2022', '2023', '2024', '2025'], rotation=90)
```

> 逐行：
> - 因为 `kind='barh'` 是**横向**柱状图，类别在 **Y 轴**，所以改刻度要用 `set_yticklabels(...)`（不是 xtick）。
> - `rotation=45` 把 Y 轴标签旋转 45°。

---

## 七、综合练习 · Example 20（All in One）

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

## 八、作业模板（空文件）

- `EIE1005_Part01_Workshop01_StudentID.py`：**空文件**，是 Workshop 1 报告（Part 01）的起点，要求你自己写代码，用 `EIE1005_Part01_Workshop01_Data.xlsx` 画图。
- `EIE1005_Part02_Workshop02_StudentID.py`：**空文件**，对应 Workshop 1 报告（Part 02），用 `EIE1005_Part02_Workshop02_Data.xlsx` 画图。

> 📖 译注（数据说明）：
> - `Part01_Workshop01_Data.xlsx`：`Department`（各学院就业/深造人数）、`Sector`（行业平均月薪）、`Range`（月薪区间毕业生人数）。
> - `Part02_Workshop02_Data.xlsx`：`Level`/`Age`/`Major`/`Gender` 各维度下的薪资数据，适合做柱状/饼图/多图布局练习。

> 🔴 考点：提交文件要**把 `StudentID` 换成你自己的学号**，这是 Canvas 作业的常见命名要求。

---

## 自测（答案折叠）

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

## 🧠 强化练习（帮助记忆）

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


## 更新记录
- 2026-09-18 增补：按课件《From Data.pdf》1.2 Working Environment（P14–31）原文整理环境配置（Python 特点 / Anaconda / 四大库 / VS Code）。
- 2026-09-18 增补：环境配置指南（零、Anaconda/VS Code/报错排查）+ 强化练习 Q7–Q20。
- 2026-09-16 答疑补充：GridSpec/add_subplot 与 subplots_adjust 详解。
- 2026-09-16 首次整理：基于 Canvas EIE1005「Week 3 and 4: Workshop 1: Data Visualization」模块的 `EIE1005 - Data Visualization - 06 - Python Project Folder - Student.zip`，逐文件提取 22 个示例 `.py` 与 3 个 Excel 数据文件，生成逐文件原文与逐行讲解。

---

## 🧠 答疑补充（课后提问）

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






