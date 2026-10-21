## 📎 原始课件
- 覆盖全部考试范围：L1、L2、AI 伦理三篇、Workshop1（Python）、Mini-Project 准备、NVIDIA 讲座（链接见 [冲刺笔记](eie1005-test1-prep.md)）

# EIE1005 · Test 1 全真模拟卷（2026-10-05 最新结构）
> 结构完全按今日官方通知：**Part 1 五题 MCQ（NVIDIA）+ Part 2 十五题 MCQ + Part 3 两道简答**，共 70 分钟。
> 建议：先闭卷做完 40 分钟，再对答案与解析；答案在每部分末尾折叠。

## Part 1 · NVIDIA 讲座（5 × MCQ）

**Q1.** 在 NVIDIA 讲座中，AI Agent 由哪两部分组成？
A. Model + Dataset　B. Harness + Models　C. Sensor + Actuator　D. Prompt + Token

**Q2.** Agent 工作的核心循环是？
A. Reason → Observe → Act　B. Act → Observe → Reason　C. Observe → Reason → Act　D. Observe → Act → Reason

**Q3.** NVIDIA 的开源模型 Nemotron 主要面向哪个领域？
A. Physical AI　B. Robotics　C. Agentic AI　D. Biomedical AI

**Q4.** Cosmos 3 作为 World Model 的主要作用是？
A. 把训练评估从数月缩到数天　B. 把合成数据生成提速最高 60 倍（含未见场景）
C. 把视觉转成密集描述与警报　D. 让策略从通用 embodiment 预训练中更快适配

**Q5.** 讲座中机器人/Physical AI 的三大支柱是（训练/仿真/推理）？
A. GR00T / Omniverse / Jetson Thor　B. GR00T / Cosmos / CUDA　C. Isaac Sim / Isaac Lab / ROS　D. Nemotron / Cosmos / Clara

<details><summary>Part 1 答案与解析</summary>
1. **B**。讲座原文 "Agent = Harness + Models"：Harness 提供 Memory/Context/Sandbox/Orchestration，Models 是 LLM 大脑。
2. **C**。Observe（观察）→ Reason（推理）→ Act（行动），每步由 LLM 执行。
3. **C**。矩阵对号入座：Nemotron→Agentic AI；Cosmos→Physical AI；GR00T→Robotics；Clara→Biomedical；Earth-2→AI-Physics。
4. **B**。四种角色区分：VLM=视觉转描述；World Model=合成数据提速 60x；World Simulator=训练评估数月→数天；WAM=策略更快适配。
5. **A**。TRAINING=GR00T、SIMULATION=Omniverse、INFERENCE=Jetson Thor（+CUDA-X/Isaac）。
</details>

## Part 2 · W1 + 伦理 + W2 + Workshop + Mini-Project（15 × MCQ）

**Q6.** 课程中 Artificial Intelligence 的目标是？
A. 开发只按显式指令执行的软件　B. 制造能模仿、辅助甚至超越人类认知能力的机器　C. 设计运算更快的硬件　D. 用机器人替代工厂劳动

**Q7.** Strong AI（AGI）与 Weak AI（Narrow AI）的本质区别？
A. Strong 用深度学习，Weak 用经典算法　B. Strong 用于创意，Weak 用于逻辑
C. Strong 具备跨领域的通用智能，Weak 只在特定任务上专用　D. Strong 只能跑在量子计算机上

**Q8.** 某公司从数据经纪商处购买"由多个网站聚合的顾客购买记录"，这属于？
A. First-party data　B. Second-party data　C. Third-party data　D. Qualitative data

**Q9.** 数据分析五步的正确顺序？
A. Collect → Define → Determine → Wrangle → Interpret
B. Define Questions and Goals → Collect Data → Data Wrangling → Determine Analysis → Interpret Results
C. Define → Wrangle → Collect → Determine → Interpret
D. Collect → Wrangle → Define → Determine → Interpret

**Q10.** 下列哪一项**不属于**课件列出的数据质量五大问题？
A. Missing Values　B. Redundancy　C. Inconsistency　D. Encryption

**Q11.** K-means 中 centroid（质心）是什么？
A. 每类的第一个数据点　B. 一组实例的一种"重心"，且组内各点到它的 within-cluster sum of squares 最小
C. 离原点最近的点　D. 随机噪声点

**Q12.** 一张 1920×1080 的 RGB 彩色图像，每通道 8 bits，总大小为？
A. 1920×1080×8 bits　B. 1920×1080×3×8 = 49,766,400 bits　C. 1920×1080×24×3 bits　D. 1920×1080×3 bytes

**Q13.** 图像识别/分类 Pattern Recognition 系统的正确流水线是？
A. Sensor → Pre-processing/enhancement → Feature extraction → Classification → Class Assignment
B. Sensor → Feature extraction → Pre-processing → Classification
C. Classification → Feature extraction → Sensor → Pre-processing
D. Sensor → Classification → Feature extraction → Pre-processing

**Q14.** 关于 Image Enhancement，正确的是？
A. 增加了图像固有的信息内容　B. 锐化边缘、边界、对比度，提高所选特征的动态范围以便检测　C. 把彩色图变灰度　D. 给图像加噪声

**Q15.** 神经网络训练的五个重要步骤，第 2 步是？
A. Randomly initialize weights and biases　B. Compute Loss for the entire training image
C. Determine network activation for each training image　D. Update weights using gradient descent

**Q16.** 输入是 40×40 灰度图、输出三类（狗/兔/鼠），输入层神经元数 N 与输出层神经元数 M 分别是？
A. N=40, M=3　B. N=1600, M=3　C. N=1600, M=40　D. N=3, M=1600

**Q17.** 关于 Loss，正确的是？
A. 网络表现越差，Loss 越小　B. Loss 与表现无关　C. 网络表现越弱，Loss 越大　D. Loss 恒为 0

**Q18.** CNN 相比全连接网络的特点（课件观点）是？
A. 每个神经元必须看整张图　B. 神经元只需看图像的一小片区域，检测关键局部模式（如"狗鼻子"），参数更少
C. 不用训练　D. 只能处理文字

**Q19.** 模型能识别普通狗、但识别不了"无毛狗"，最可能的原因是？
A. 学习率太高　B. 训练数据里没有无毛狗的照片　C. 图片分辨率太低　D. 网络层数太少

**Q20.** 关于 AI 偏见的真实案例（伦理阅读），下列说法符合材料的是？
A. 有偏 AI 建议会影响人们在紧急任务中的决策，即使本人平时不带偏见
B. AI 一旦有数据就不会有偏见　C. 只有少数族裔数据才会让 AI 有偏见　D. 偏见只在训练阶段产生

<details><summary>Part 2 答案与解析</summary>
6. **B**（L1 原文：mimic, assist, or surpass human cognitive abilities）。
7. **C**（官方 Sample 02 原题；A/B/D 均为干扰项）。
8. **C**（官方 Sample 03 原题：聚合多家来源再出售的是第三方数据）。
9. **B**（五步原词顺序，必背）。
10. **D**。五大问题是 Missing values / Redundancy / Inconsistency / Noise / Outliers，Encryption 不在列。
11. **B**（centroid 定义原文："a kind of centre of gravity… within-cluster sum of squares … is minimum"）。
12. **B**（L2 课件原题：1920×1080×3×8 = 49,766,400 bits）。
13. **A**（PR 流水线五段顺序，课件原文）。
14. **B**（"does not increase the inherent information content… increases the dynamic range"）。
15. **C**（训练五步：①初始化权重偏置 → ②算每张训练图的网络激活 → ③算 Loss → ④梯度下降更新 → ⑤Epoch 重复）。
16. **B**（N=40×40=1600 像素；M=类别数 3；权重数=1600×16+16×3=25,648）。
17. **C**（"The weaker the performance, the larger the Loss"）。
18. **B**（CNN 局部感受野 + dog-nose detector 例子，参数更少）。
19. **B**（训练数据代表性不足；对应猫狗例子）。
20. **A**（伦理阅读案例：紧急任务中听从有偏 AI 建议者做出更多歧视性决定）。
</details>

## Part 3 · 简答（2 题）

**Q21.（约 10 分）** Name the five steps of Data Analysis Process and briefly describe each step.

**Q22.（约 10 分）** Consider a fully-connected neural network for classifying images of dogs, rabbits and mice, with a 40×40 grayscale input and one hidden layer of 16 neurons.
(a) List the five important steps to train the network.
(b) How many neurons are in the input and output layers? Then calculate the number of weights.

<details><summary>Part 3 参考答案</summary>
**Q21.** ① Define Questions and Goals：定义问题陈述与目标（提出假设）；② Collect Data：收集定量/定性数据，来源含 First/Second/Third-party；③ Data Wrangling：数据清洗/预处理（缺失值、冗余、不一致、噪声、离群点）；④ Determine Analysis：依问题选择诊断/描述/预测分析；⑤ Interpret Results：分享洞见，以人人易懂的方式呈现并证明结论科学。

**Q22.**
(a) ① Randomly initialize Weights and Biases；② Determine network activation for each training image；③ Compute Loss for the entire training image；④ Update Weights（using Gradient Descent）；⑤ Epoch：Repeat ②–④ until Loss reduces to an Acceptable Level。
(b) 输入层 N = 40×40 = **1600** 个神经元（每像素一个）；输出层 M = **3**（三类 one-hot）。权重数 = 1600×16 + 16×3 = 25,600 + 48 = **25,648**。
</details>

## 考试当天提醒
1. **先查考场**：Canvas Modules → Test 1 Information；两间教室相距远，走错/迟到不给补时。
2. 70 分钟分配：Part 1 约 8 分钟 → Part 2 约 30 分钟 → Part 3 约 25 分钟 → 检查 7 分钟。
3. 简答题先写英文五步名，再补中文解释要点，英文采分点优先。