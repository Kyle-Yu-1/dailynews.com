# EIE1005 专业词汇 · 中英互译

> 覆盖 L1–L4、三次工作坊、伦理与项目课件中出现过的术语（合并自 OneNote 词汇表 + 讲义）。

## 基础概念
- Artificial Intelligence (AI) — 人工智能
- Machine Learning (ML) — 机器学习
- Deep Learning (DL) — 深度学习
- Data Analytics — 数据分析
- Large Language Model (LLM) — 大型语言模型
- Generative AI — 生成式人工智能
- Foundational Model — 基础模型
- Multimodal AI System — 多模态人工智能系统
- Human-level Intelligence — 人类级智能
- Superhuman General Intelligence — 超人类通用智能
- Artificial General Intelligence (AGI) — 通用人工智能
- Narrow AI / Weak AI — 狭义人工智能 / 弱人工智能
- Turing Test — 图灵测试
- Perceptron — 感知机

## 机器学习
- Supervised Learning — 监督学习
- Unsupervised Learning — 无监督学习
- Reinforcement Learning — 强化学习
- Classification — 分类
- Regression — 回归
- Clustering — 聚类
- Training Set — 训练集
- Feature — 特征
- Label — 标签
- Overfitting — 过拟合
- Underfitting — 欠拟合
- Few-shot Learning — 小样本学习
- Zero-shot Learning — 零样本学习
- Fine-tuning — 微调
- Agent — 智能体

## 计算机视觉 / 深度学习
- Computer Vision — 计算机视觉
- Image Representation — 图像表示
- Pixel — 像素
- Convolution — 卷积
- Convolution Kernel / Filter — 卷积核 / 滤波器
- Stride — 步长
- Padding — 填充
- Feature Map — 特征图
- Convolutional Neural Network (CNN) — 卷积神经网络
- Receptive Field — 感受野
- Weight Sharing — 权值共享
- Pooling — 池化
- Flatten — 展平
- Fully Connected Layer — 全连接层
- Pattern Recognition (PR) — 模式识别

## 数据与数据质量
- Quantitative Data — 定量数据
- Qualitative Data — 定性数据
- First-party / Second-party / Third-party Data — 第一方 / 第二方 / 第三方数据
- Open Data — 开放数据
- Data Schema — 数据模式
- Data Governance — 数据治理
- Data Wrangling / Preprocessing — 数据清洗 / 数据预处理
- Missing Values — 缺失值
- Redundancy — 冗余数据
- Inconsistency — 不一致性
- Noise — 噪声数据
- Outlier — 异常值 / 离群点
- Nominal Scale — 标称尺度
- Sparse Data Set — 稀疏数据集
- Predictive Model — 预测模型
- Deduplication — 去重

## 虚拟世界与对话式 AI
- Digital Twin — 数字孪生
- Simulation — 仿真
- Pathfinding — 寻路
- Navigation Mesh — 导航网格
- Behavior Tree — 行为树
- Finite State Machine — 有限状态机
- Token — 词元 / 标记
- Embedding — 嵌入
- Transformer — 变换器（注意力架构）
- Attention — 注意力机制
- Retrieval-Augmented Generation (RAG) — 检索增强生成
- Chatbot — 聊天机器人
- Hallucination — 幻觉
- Perplexity — 困惑度
- Conversational AI — 对话式人工智能

## 伦理与社会
- Bias — 偏差 / 偏见
- Fairness — 公平性
- Intellectual Property — 知识产权
- Misinformation — 虚假信息
- Deepfake — 深度伪造
- Carbon Footprint — 碳足迹
- Privacy — 隐私

## 应用场景
- Predictive Maintenance — 预测性维护
- Fault Detection — 故障检测
- Drug Discovery — 药物发现
- Medical Imaging — 医学成像
- Personalized Medicine — 个性化医疗
- Market Research — 市场研究
- Industry Report — 行业报告
- Summarization — 摘要生成
- Translation — 翻译
- Text Generation — 文本生成
- Programming Assistance — 编程辅助
- Natural Language Understanding (NLU) — 自然语言理解
- Creative Applications — 创意应用
- distill — 提炼；蒸馏
- dense — 稠密的；密度大的
- citation — 引文，引用
- slope — 斜率；斜坡
- illustrate — 说明；加插图于

## Python / 数据可视化（pandas + Matplotlib）
- import — 导入（模块/库）
- alias — 别名
- pandas — Python 数据分析库
- DataFrame — 数据框（带列名的二维表格）
- read_excel — 读取 Excel 文件
- sheet_name — 工作表名
- matplotlib — Python 绘图库
- pyplot — Matplotlib 的画图入口模块
- gridspec — 网格规格（用于划分布局）
- Figure — 画布 / 整张图对象
- Axes — 坐标轴对象（画布里的一张小图）
- figsize — 画布尺寸
- subplots_adjust — 调整子图与画布间距
- suptitle — 整幅总标题
- GridSpec — 网格规格对象
- add_subplot — 在网格中添加子图
- marker — 数据点标记
- line chart — 折线图
- area chart — 面积图
- bar chart — 柱状图
- barh — 横向柱状图（horizontal bar）
- stacked — 堆叠（柱状图）
- pie chart — 饼图
- alpha — 透明度
- legend — 图例
- grid — 网格线
- color — 颜色
- title — 图标题
- xlabel / ylabel — 横/纵轴标签
- xticklabels / yticklabels — 横/纵轴刻度标签
- rotation — 旋转角度
- plt.show() — 显示图形

### 进阶 · 颜色与背景（Workshop 01 B 新增，检索于 2026-09-23）
- figure — 画布（整张图对象）
- patch — 补丁对象（画布 / 坐标区的底片矩形）
- facecolor — 背景色 / 表面颜色
- edgecolor — 描边颜色
- alpha — 透明度
- colormap (cmap) — 色带 / 颜色映射表
- Normalize — 归一化（把数值映射到 0–1）
- TwoSlopeNorm — 双斜率归一化（正负发散用）
- ScalarMappable — 标量可映射对象（colorbar 的桥）
- colorbar — 颜色条（渐变色示意图 + 数值标尺）
- gradient — 渐变
- hatch — 填充纹理（斜线、点等）
- bar_label — 柱顶数值标签
- yerr — 误差棒长度
- capsize — 误差棒端帽大小
- annotate — 注释标注（箭头指向关键点）
- spines — 坐标轴边框线
- bbox_inches — 导出时的裁剪边界
- dpi — 每英寸点数（图像分辨率）
- interpolation — 插值（bicubic 双三次插值）
- transAxes — 轴坐标变换（0..1 相对坐标）
- viridis — 感知均匀色带（蓝紫→黄）
- RdYlGn — 红黄绿发散色带
- FancyBboxPatch — 圆角矩形补丁
- constrained_layout — 受约束自动布局
- tight_layout — 紧凑布局

### 进阶 · 图表选型与设计（Workshop 01 B v3 新增，检索于 2026-09-23）
- scatter plot — 散点图
- bubble chart — 气泡图
- heatmap — 热力图
- boxplot — 箱线图
- radar chart — 雷达图
- rose chart / Nightingale rose — 南丁格尔玫瑰图
- bullet chart — 子弹图
- waterfall chart — 瀑布图
- sunburst chart — 旭日图
- stacked bar / stacked area — 堆叠柱状图 / 堆叠面积图
- diverging bar — 双向条形图
- dimension — 维度（分类字段）
- measure — 度量（数值指标）
- data cleaning — 数据清洗
- data aggregation — 数据聚合
- trend line — 趋势线
- mean line — 均值线
- annotation — 注释标注
- chart type selection — 图表选型
- color scheme — 配色方案
- hierarchy — 信息层级

### 进阶 · 主题美化（Workshop 01 B v4 新增，2026-09-23）
- preset style — 预设风格（如 ggplot、fivethirtyeight）
- style.use / style.context — 全局 / 局部加载风格
- theme — 主题（Dracula 等）
- rcParams — 运行时配置参数（字体、网格、线条等）
- mplstyle — Matplotlib 样式文件（.mplstyle）
- glow — 发光（线条光效）
- qbstyles — QuantumBlack 的 Matplotlib 样式库
- matplotx — 主题库（Dracula、Pitaya Smoothie）
- mplcyberpunk — 赛博朋克风格库
- serif / sans-serif — 衬线体 / 无衬线体
- monospace — 等宽字体
- markerfacecolor — 标记填充色
- titlecolor / labelcolor — 标题色 / 轴标签色

### 进阶 · 个性化背景（Workshop 01 B v5 新增，2026-09-23）
- watermark — 水印
- zorder — 图层顺序（数值大靠上）
- fig.text — 画布上的文字（坐标 0–1）
- imread — 读取图片文件
- LinearSegmentedColormap — 自定义分段色带
- rc_context — 临时覆盖样式的上下文
- default style — 默认风格（恢复用）
- brand / logo corner — 品牌角标

### 进阶 · 背景与归一化（Workshop 01 B v6 新增，2026-09-24）
- polar coordinates — 极坐标
- thetagrid / rgrid — 角度网格 / 半径网格
- LogNorm — 对数归一化
- BoundaryNorm — 边界（分档）归一化
- ListedColormap — 离散色带
- sequential colormap — 顺序型色带
- diverging colormap — 发散型色带
- qualitative colormap — 定性（分类）色带
- stripes texture — 条纹纹理
- rounded canvas — 圆角画布
- transparent — 透明背景

### 进阶 · 多写法对照（Workshop 01 B v6.1 新增，2026-09-24）
- object-oriented API — 面向对象式（fig/ax 对象）
- pyplot state machine — pyplot 状态机式
- pandas plot — pandas 一行式绘图
- setter — set_ 系列修改方法
- plt.gca() — 获取当前坐标轴
- ax.get_figure() — 由坐标轴取回画布

