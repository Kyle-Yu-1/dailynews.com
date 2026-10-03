## 📎 原始课件
- [Past Paper 2023/24 Sem 1 Late（含答案）](files/eie1005/past-paper-2324-late-solution.txt)
- [L1 课件原文](files/eie1005/l1-original.txt) · [L2 课件原文](files/eie1005/l2-original.txt)
- 来源：Canvas courses/4018/pages/past-paper（file 264805）

# EIE1005 · Test 1 考前冲刺（10/5 周一 16:30–18:20 · Z209 闭卷 70 分钟）

## ⏱ 30 秒速览
一句话：Test 1 的简答题与往年卷 **Q1（数据分析五步 + Strong/Weak AI + 质心）和 Q2（神经网络训练五步 + 神经元/权重计算 + 数据偏置）几乎一样**，把这两道大题背下来再吃透 3 道样题 MC，就能拿到大头分。

三条结论：
1. **必背两张"五步清单"**：数据分析五步（Define Questions → Collect → Wrangle → Determine Analysis → Interpret）＋ 神经网络训练五步（初始化权重 → 算激活 → 算 Loss → 梯度下降更新 → Epoch 重复）。
2. **必背三类英文定义**：AI 的目标、Strong/Weak AI 的区别、centroid 的定义——都按课件英文原句背。
3. **计算题送分**：输入层神经元 = 像素数（40×40→1600），输出层 = 类别数（M=3），权重数 = 相邻两层神经元数相乘再相加。

关键词：Data Analysis Process、Strong/Narrow AI、centroid、K-means、training five steps、Loss、Gradient Descent、Epoch、one-hot、weights、training data bias。

---

## 一、考试形式（源自 Canvas Past Paper 页 + 课程总纲）
- 闭卷、纸质、70 分钟；Part A 10 道 MCQ（Week 5 NVIDIA 讲座）+ Part B 20 道 MCQ/简答（W1+W2 讲义与阅读/case、W3-4 Workshop、Mini-project 准备）。
- 教师原话：**"Test 1 - very similar short questions as the past paper Q1 and Q2."**
- Python 不考手写代码，但要读懂语句并预测输出图（见 Workshop1 笔记）。

## 二、往年真题 Q1（25 分）· 答案照背
### (a) 数据分析五步（10 分）
1. **Define Questions and Goals** — Define the problem statement and objectives.
2. **Collect Data** — Collect quantitative and/or qualitative data from different sources (First, Second, and Third-party data).
3. **Data Wrangling** — Data cleaning or Data Pre-processing.
4. **Determine Analysis** — Choosing a method of analysis (Diagnostic, Descriptive, or Predictive) depends heavily on the questions/goals defined earlier and the type of analysis needed.
5. **Interpret Results** — Sharing insights and findings; presenting them in a manner which is digestible to everyone.

> 🔴 考点（源自 Past Paper Q1a）：五步的英文名称是采分点，务必原词背下；描述部分写关键词即可。
> 📖 译注：Wrangle = "驯服/整理"；Diagnostic 诊断性（找原因）、Descriptive 描述性（总结现状）、Predictive 预测性（预测未来）。

### (b) Strong AI 与 Weak AI（10 分）
- **Strong AI**：Self-aware, emotion, response is unpredictable; like human beings; only in fictional characters (at this moment at least).
- **Weak AI (Narrow AI)**：A specific type of artificial intelligence in which a technology outperforms humans in some very narrowly defined tasks.

> 🔴 考点：对照 Sample 02，MC 会考二者"本质区别"——Strong AI = generalized intelligence across many domains；Weak AI = specialized for specific tasks。避开"强 AI 用深度学习/量子计算机"这类干扰项。

### (c) K-means 的质心 centroid（5 分）
- A centroid represents a kind of **centre of gravity** for a set of instances in the same cluster.
- The **within-cluster sum of squares** distance between the centroid and each data point is **minimum**.

> 🔴 考点：K-means 五步也要会复述（课件 L1）：① 随机定 k 个质心 → ② 把每个实例分给最近的质心 → ③ 用组内实例重算质心 → ④ 再分配 → ⑤ 重复 3、4 直到不再变化。

## 三、往年真题 Q2（25 分）· 神经网络训练
### (a) 训练五步（10 分）
1. **Randomly initialize Weights and Biases**
2. **Determine network activation for each training image**
3. **Compute Loss for the entire training image**
4. **Update Weights**（using **Gradient Descent**）
5. **Epoch: Repeat Steps 2–4 until Loss reduces to an Acceptable Level**

> 🔴 考点：与 L2 课件第 58–60 页逐字一致；"The weaker the performance of the network, the larger the Loss" 也是常考点。

### (b) 计算题（10 分）· 40×40 灰度输入，分狗/兔/鼠三类
- 输入层神经元 **N = 40 × 40 = 1600**（每个像素一个神经元）
- 输出层神经元 **M = 3**（三个类别，one-hot 输出）
- 权重数 = **1600 × 16 + 16 × 3 = 25,648**（输入→隐藏 1600×16；隐藏→输出 16×3）

> 🔴 考点（换数字仍会）：权重数 = 相邻两层神经元数**相乘**后**逐层相加**（题目给隐藏层 16 个神经元）。课件原例：28×28→784 输入、784×30 权重；256×256→65,536 输入、65,536×30 权重。
> 📖 译注：one-hot vector = 只有正确类别为 1、其余全 0 的期望输出向量。

### (c) 识别不了"无毛狗"（5 分）
- 原因：**训练数据中没有无毛狗的照片**（训练样本代表性不足/数据偏置）。
- 呼应课件开头的猫狗例子：孩子没见过不同品种/颜色/大小的动物时也会混淆。

## 四、官方 Sample Test 1 MC（3 道，答案已标）
1. **AI 的主要目标** → A. To create machines that can mimic, assist, or surpass human cognitive abilities.
2. **Strong vs Weak AI 的本质区别** → C. Strong AI possesses generalized intelligence across many domains, while Weak AI is specialized for specific tasks.
3. **从 data broker 买到的聚合数据** → C. Third-party data.

## 五、必背英文定义清单（考前过一遍）
| 术语 | 背这句英文 |
|---|---|
| AI | AI refers to the field of computer science that focuses on the development of systems and algorithms capable of performing tasks that typically require human intelligence. |
| Goal of AI | To create machines that can mimic, assist, or surpass human cognitive abilities in various domains. |
| Machine Learning | A type of AI that allows software applications to become more accurate in predicting outcomes without being explicitly programmed. |
| Deep Learning | A subset of ML using layered neural networks (deep neural networks) to model complex patterns. |
| Supervised Learning | Learning from **labelled** training data. |
| Unsupervised Learning | Finding structure in **unlabelled** data (e.g., clustering). |
| Reinforcement Learning | Learning by **trial and error** through rewards and penalties. |
| Clustering | Divide the dataset into a number of groups; objects in the same group are similar to each other. |
| Centroid | A kind of centre of gravity for a set of instances in the same cluster. |
| Loss | The weaker the performance of the network, the larger the Loss. |
| Epoch | Repeat steps (activation → loss → update) until Loss reduces to an acceptable level. |
| Pattern Recognition | We rely on patterns or features to figure out what type of objects. |
| CNN | A neural network architecture designed for image/video applications; neurons only see a small region to detect critical patterns. |

## 六、预测考题（基于往年卷换法）
1. **五步类**：把数据分析五步打乱排序选正确项；考"Collect Data 三种方"（First/Second/Third-party）。
2. **定义类**：AI 目标、Strong/Weak、Narrow AI 例子（AlphaGo、spam filter）。
3. **计算类**：换输入尺寸（28×28 或 64×64）求 N/M/权重数；给 K-means 步骤排顺序。
4. **概念类**：supervised vs unsupervised vs reinforcement 各举一例。
5. **读图类**：给一行 `df.plot(...)` 或 `plt` 代码，问输出什么图（横条/堆叠/折线，见 Workshop1 笔记）。
6. **Frequent Pattern Mining**：给交易表算 support / confidence，判断规则是否 qualified（≥ minsup 且 ≥ minconf）。
7. **NVIDIA 讲座 MC（Part A 十题）**：来自 Week 5 NVIDIA 讲座（Dr. Ginny Wong），十大预测考点已整理成 [Guest Lecture 笔记](eie1005-guest-nvidia.md)：Agent=Harness+Models、Observe→Reason→Act、ChatGPT→DeepSeek→Agent Harnesses 时间线、100s→1000s→1,000,000s token 三级跳、Systems of Models、NVIDIA 模型矩阵（Nemotron/Cosmos/GR00T/Clara/Earth-2）、Cosmos 3 四角色、GR00T/Omniverse/Jetson Thor 三支柱、Isaac Sim vs Isaac Lab。

## 七、自测（答案折叠）
1. 简述数据分析五步。
<details><summary>查看答案</summary>Define Questions and Goals（定义问题与目标）→ Collect Data（收集定量/定性、第一/二/三方数据）→ Data Wrangling（清洗/预处理）→ Determine Analysis（诊断/描述/预测）→ Interpret Results（解读并以易理解方式呈现）。易错点：第三步是 Wrangle 不是 Analysis；第二步三种方别写反。</details>

2. Strong AI 与 Weak AI 的区别？
<details><summary>查看答案</summary>Strong AI（AGI）：自我意识、情绪、类人、跨领域通用智能，目前仅存在于虚构角色；Weak AI（Narrow AI）：在极窄定义的特定任务上超越人类（如 AlphaGo）。易错点：不是"用不用深度学习"的区别。</details>

3. 神经网络训练五步？
<details><summary>查看答案</summary>① 随机初始化权重与偏置 → ② 对每张训练图计算网络激活 → ③ 计算整批训练图的 Loss → ④ 梯度下降更新权重 → ⑤ Epoch：重复 ②–④ 直到 Loss 降到可接受。易错点：Loss 越大代表表现越差。</details>

4. 32×32 灰度图、隐藏层 20 神经元、分 4 类，求输入/输出神经元数与权重数。
<details><summary>查看答案</summary>N=32×32=1024；M=4；权重=1024×20 + 20×4 = 20,480 + 80 = 20,560。思路：相邻两层相乘，逐层相加。</details>

5. 模型识别普通狗很好但识别不了某种罕见犬，为什么？
<details><summary>查看答案</summary>训练数据缺少该品种/该类样本（数据代表性不足、bias）。对应课件"孩子没见过不同品种的猫狗前会混淆"。</details>