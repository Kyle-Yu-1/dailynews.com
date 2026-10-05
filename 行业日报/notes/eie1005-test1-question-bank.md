## 📎 原始课件
- 范围：L1+L2+AI 伦理三篇+Workshop1（Exercise 1.4/WS01 A/B）+Mini-Project 准备+NVIDIA 讲座+Past Paper
- 来源：Canvas courses/4018（past-paper file 264805、Guest Lecture file 264264、Assignment 19620）

# EIE1005 · Test 1 刷题全集（5 MC + 15 MC + 2 简答）

> 按 2026-10-05 官方最新结构出题；Part 1=5 MC（NVIDIA）、Part 2=15 MC、Part 3=2 简答，70 分钟。
> 含三套全真模拟卷 + Python 读图/找错专项 + L1 Readings 专项 + 简答专项 + 考点速记卡，答案全部附后。

## ⏱ 30 秒速览
一句话：Test 1 简答题 ≈ 往年卷 Q1（数据分析五步 + Strong/Weak AI + centroid）与 Q2（训练五步 + 神经元/权重计算 + 数据偏置）；Part 1 五题 = NVIDIA 讲座（Agent/Cosmos/Isaac）；Part 2 大头在定义、流程、计算与 Python 读图。

三条结论：
1. **两张五步清单必背**：数据分析五步 + 神经网络训练五步（英文原词）。
2. **计算题两模板**：权重数=相邻两层神经元相乘逐层相加；RGB 图像大小=分辨率×3×8 bits。
3. **Python 不写代码，但要会读语句预测图**：kind（bar/barh/line/pie）、legend 挂 ax、grid、marker、stacked。

关键词：五步、centroid、training steps、weights、data quality、PR pipeline、Agent=Harness+Models、Cosmos、Isaac Sim/Lab。

---

## 一、WS01 A（Exercise 1.4）考点映射与推测

WS01 A 的代码结构就是 Test 1 Python 题的出题原型（Exercise 1.4：读 Data.xlsx 画三张图）。

| WS01 A 代码元素 | 可能考法 |
|---|---|
| `pd.read_excel('Data.xlsx', sheet_name='Table1')` | 问作用 / sheet 不存在会怎样 |
| `gridspec.GridSpec(2,2)` + `fig.add_subplot(axis[0,:])` | 问 axis[0,:] 是哪里（顶行通栏） |
| `df1.plot(kind='barh', x='...', stacked=True)` | 问输出什么图（水平堆叠柱状图） |
| `df2.plot(kind='bar')` | 垂直柱状图 |
| `df3.plot(kind='line', marker='o')` | 带圆点折线图 |
| `ax1.legend(loc='best')` | 找错题：别写 df1.legend（DataFrame 没有） |
| `ax.set_axisbelow(True)` | 找错题：别写 GridSpec.set_axisbelow |
| `ax1.set_xlabel/set_ylabel/set_title` | 问作用 |
| `ax1.grid(visible=True, axis='y')` | 只显示水平网格线 |
| `fig.suptitle(..., fontsize=24)` | 整图总标题 |
| `plt.subplots_adjust(top=.9,bottom=.1,left=.1,right=.9)` | 调整边距 |
| `plt.show()` | 脚本结尾必须显示 |
| `color=['#0000FF','#00FF00']` | 指定系列颜色；数量=数据列数 |

> 🔴 推测：Part 2 至少 2–3 题 Python 读图/找错，全部来自上面这张表；简答不会让你写代码。

---

## 二、模拟卷一（5 + 15 + 2）

### Part 1 · NVIDIA
1. AI Agent 由哪两部分组成？→ **B. Harness + Models**
2. Agent 核心循环？→ **C. Observe → Reason → Act**
3. Nemotron 面向哪个领域？→ **C. Agentic AI**
4. Cosmos 3 作 World Model 的作用？→ **B. 合成数据提速最高 60x（含未见场景）**
5. 机器人三支柱（训练/仿真/推理）？→ **A. GR00T / Omniverse / Jetson Thor**

### Part 2 · 15 MC（答案）
6.B（AI 目标：mimic/assist/surpass）· 7.C（Strong 通用 vs Weak 专用）· 8.C（Third-party data）· 9.B（五步顺序）· 10.D（Encryption 不是五大数据质量问题）· 11.B（centroid=重心+组内平方和最小）· 12.B（1920×1080×3×8=49,766,400）· 13.A（PR 流水线五段）· 14.B（Image Enhancement 不增加信息量）· 15.C（训练第 2 步：算激活）· 16.B（N=1600,M=3）· 17.C（表现越弱 Loss 越大）· 18.B（CNN 局部感受野）· 19.B（训练数据缺无毛狗）· 20.A（有偏 AI 影响紧急决策）

### Part 3 · 简答
Q21 数据分析五步（英文名+一句）· Q22 训练五步 + N=1600、M=3、权重 25,648。

---

## 三、模拟卷二（5 + 15 + 2）

### Part 1
1.B（ChatGPT Nov22→DeepSeek Jan25→Agent Harnesses 2026）· 2.A（100s→1000s→1,000,000s）· 3.B（Systems of Models+Specialized Agents）· 4.B（Isaac Sim=仿真测试）· 5.C（Nemotron 10 Trillion pretraining tokens）

### Part 2
6.A（ML=无需显式编程）· 7.B（DL 是 ML 子集）· 8.B（LLM 都是基础模型，反之不成立）· 9.A（sales figures=定量）· 10.B（第二方=别家第一方数据）· 11.B（27% 时间清洗）· 12.C（K-means 第 3 步重算质心）· 13.B（A⇒C，A 前件 C 后件）· 14.D（利润增加不是风险）· 15.B（治理第一步：establish governance）· 16.B（LaMDA sentient）· 17.C（8bit=256 级灰）· 18.A（feature extractor 提取特征）· 19.A（batch=一次迭代的样本集）· 20.B（barh+stacked=水平堆叠柱状图）

### Part 3
Q21 数据质量五问题（missing/redundancy/inconsistency/noise/outlier）· Q22 PR 流水线五段。

---

## 四、模拟卷三（5 + 15 + 2）

### Part 1
1.D（"无需训练数据"不是好处）· 2.D（无监督聚类不是 Post-training 要素）· 3.B（$98 Trillion）· 4.A（数据四环节）· 5.A（Reasoner 自回归 + Generator 扩散）

### Part 2
6.B（Turing Test）· 7.B（AlphaGo=弱 AI）· 8.B（聚类=无监督）· 9.B（强化=试错奖惩）· 10.B（Transformer 抓长依赖）· 11.B（访谈/评论=定性）· 12.B（nominal→0-1 编码产生稀疏）· 13.B（one-hot=仅正确类为 1）· 14.A（RGB）· 15.A（scatter plot 看分布/决策域）· 16.B（颜色比半径更判别）· 17.C（28×28=784）· 18.A（Image/Audio/Pose）· 19.A（learning rate=步长）· 20.B（legend loc='best' 自动摆位）

### Part 3
Q21 监督/无监督/强化区别+例子 · Q22 K-means 五步+centroid 定义。

---

## 五、Python 专项（读图 12 + 找错 12）

### 读图（答案）
P1 B（barh+stacked=水平堆叠）· P2 B（line+marker='o'）· P3 C（pie）· P4 A（subplots(2,2)=四子图）· P5 B（set_xlabel 标 x 轴）· P6 A（subplots_adjust 调边距）· P7 B（axis[0,:]=顶行跨两列）· P8 B（读 Table1 表）· P9 B（axis='y' 只横线）· P10 A（suptitle 总标题）· P11 B（color 列颜色）· P12 B（bar 竖、barh 横）

### 找错（答案）
E1 B（df.legend→ax.legend）· E2 B（GridSpec 无 set_axisbelow）· E3 A（网格垫底 ax.set_axisbelow(True)）· E4 A（路径/工作目录）· E5 B（分类轴旋转）· E6 B（DataFrame vs Axes）· E7 B（颜色数=列数）· E8 A · E9 A · E10 A · E11 A · E12 A（结尾 plt.show()）

---

## 六、L1 Readings 专项 + 通用简答

Readings：R1 A（Turing Test 判机器是否像人思考）· R2 B（AlphaGo=窄 AI）· R3 B（沃尔玛看购买记录+社交帖决定进货，飓风前 Pop-Tarts 卖光）· R4 B（不同政治立场帖子点击率低）· R5 A（Netflix 推荐）· R6 B（Transformer 抓长距离依赖）· R7 A（K-means=分区+原型聚类）

通用简答 6 题：S1 Data Analytics 定义+例子 · S2 AI 伦理四风险 · S3 定量 vs 定性 · S4 三种数据方 · S5 CNN 局部感受野 · S6 epoch/batch size/learning rate（答案要点见下）

<details><summary>通用简答答案要点</summary>
S1：use data to answer questions（AI/ML/DL/GenAI 技术）；例子 Netflix 推荐、Walmart 库存。
S2：Bias & Fairness / Misinformation & Deepfakes / Intellectual Property / Environmental Impact。
S3：Quantitative=numeric（sales, marks）；Qualitative=descriptive（interviews, reviews）。
S4：First-party=自己直接收集（干净结构化）；Second-party=别家的一手数据（结构化可靠）；Third-party=第三方聚合（大量非结构化 big data）。
S5：CNN=面向图像/视频的架构；神经元只需看小块区域（dog-nose），关键模式小于整图，参数更少。
S6：Epoch=整份训练集过几遍；Batch=一次迭代的样本数（100 图 batch10→1 epoch=10 batch）；Learning rate=走向 loss 最小值的步长。
</details>

---

## 七、考点速记卡

- **Cosmos 3 四角色**：VLM=看懂（转描述）；World Model=造数据（60x）；World Simulator=省时（月→天）；WAM=学动作（更快适配）。
- **Isaac Sim vs Lab**：Sim=场地/仿真测试（SIL、合成数据、ROS2）；Lab=教练/训练策略（RL、并行仿真）。
- **NVIDIA 模型矩阵**：Nemotron→Agentic AI；Cosmos→Physical AI；GR00T→Robotics；Clara→Biomedical；Earth-2→AI-Physics。
- **Accenture 六风险**：偏、责、幻、密、绿、岗（Bias/Liability/Unreliable/Confidentiality/Sustainability/Workplace）。
- **Accenture 治理五步**：①governance & principles ②risk assessments ③responsible testing ④monitoring & compliance（+贯穿 workforce/sustainability/privacy/security）。
- **Accenture 七原则**：Human by design / Fairness / Transparency-explainability-accuracy / Safety / Accountability / Compliance-privacy-security / Sustainability。
- **LaMDA**：2022，Google Responsible AI 工程师 Lemoine 称其 sentient（fear of being turned off→请律师）；Google 反驳=pattern matching+概率分布；三伦理维度=拟人化、炒作 vs 真实风险、举报披露。
- **Frequent Pattern Mining**：A⇒C 中 A=antecedent、C=consequent；support=并集出现比例；confidence=support(并)/support(A)；qualified=双过阈值（≥minsup 且 ≥minconf）。
- **数据分析案例**：Netflix 推荐 / Walmart 库存（飓风 Pop-Tarts）/ Facebook 信息流 / 体育选材 / 药企化合物。

---

## 八、考试当天
1. **先查考场**（Canvas Modules→Test 1 Information，两教室相距远，迟到不补时）。
2. 70 分钟：Part1 约 8min → Part2 约 30min → Part3 约 25min → 检查 7min。
3. 简答先写英文术语/步骤名，再补解释；采分点是英文原词。

更新记录：最后更新 2026-10-05 · 整合三套模拟卷与专项题 · 数据来源（Canvas Test1 通知、past-paper、Guest Lecture、Assignment 19620）