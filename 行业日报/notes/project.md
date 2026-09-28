# EIE1005 · Mini-project 完全指南（小组项目 + 准备工作坊）

> 按 note-organizer 规则：课件原文用正文色，后加讲解/考点用引用块。数据来源：Canvas courses/4018 Week 2 模块（文件 169566、171152），检索于 2026-09-28。

## 📎 原始课件
- **Group Project and Demonstration.pdf**（2 页 · files/171152）：小组项目要求、评分、截止
- **Mini-project Preparation - Developing Character Recognition with Deep Learning.docx**（14 页 · files/169566）：Teachable Machine 入门 + MNIST 手写数字识别全流程
- 视频：`Mini-project Preparation…Deep Learning.mp4`、`Data Preparation.mp4`
- 数据：`MNIST Dataset.zip`（训练/测试各 0–9 十类，每类 100 张）、`Additional data.zip`（数字 1、7 的另一种手写风格）
- 工具：Teachable Machine https://teachablemachine.withgoogle.com/

## ⏱ 30 秒速览

- **一句话**：5–6 人组队，用 Teachable Machine 训练"识别物体"的 AI 模型，录 5–7 分钟 PPT 演示视频，11/28 前交。
- **三个关键节点**：9/30 组队截止（People→Groups→Join）→ 训练+测试（3–5 类/组；准备课做 MNIST 0–9 十类练习）→ **11/28 交演示视频（每组一份，anyone-with-link 可看）**。
- **评分**：演示技巧与组织 15% + 技术内容 85%（问题陈述 15% / 采样 20% / Teachable Machine 训练 25% / 测试 25%）。

## 一、小组项目总要求（Group Project PDF 原文）

- **组队**：5–6 人；Canvas「People」→「Groups」→ Join 加入；**9/30 前提交组员名单**，逾期未组队将被随机分到不足 5 人的组。
- **任务**：开放命题——用 **Teachable Machine** 训练 AI 模型识别物体，应用到自己专业领域；鼓励自学、逻辑思维与演示能力。
- **流程**：① 建 3–5 个类别 → ② 采样（相机拍摄或网上下载，参考 Data Preparation.mp4）→ ③ Teachable Machine 训练 → ④ 测试模型 → ⑤ 录 5–7 分钟演示视频（必须用 PowerPoint）。
- **提交**：**11/28 前**交到 Canvas（Week 2 模块内稍后放出提交链接）；**每组交一份**；给视频 **Web 链接**（OneDrive/YouTube 等）并设 **anyone with link can view**；**以最后一次提交为准评分**；迟交扣分。

## 二、演示视频 PPT 五段结构（原文）

1. **Front page**：清晰标题 + 组号、全体成员姓名与学号、**每人分工**。
2. **Introduction**：项目概述、目标与意义。
3. **Objective(s)**：任务如何应用到自己专业 + 明确目标、如何改进该应用。
4. **Implementation and results**：数据怎么准备 → Teachable Machine 怎么训练 → 截图展示模型准确率。
5. **Conclusions**：关键发现与贡献 + 成功与局限反思 + 未来改进方向。

> 🔴 考点/评分提示：英文**简洁、逻辑清晰、流畅**给高分（High marks）。

## 三、评分细则（20%）

| 部分 | 占比 |
|---|---|
| Presentation skills and Organization | 15% |
| Technical Content（合计 85%） | |
| · Problem statement and objectives | 15% |
| · Collect samples（拍摄/网上下载） | 20% |
| · Use Teachable Machine to train | 25% |
| · Test the well-trained model | 25% |

## 四、准备课：Teachable Machine + MNIST 手写数字识别（docx 14 页原文整理）

> 目标：能讲清神经网络训练流程；会用 MNIST 数据集与训练管线；实现/训练/评估手写数字分类模型；会读性能指标并发现问题。（**本工作表无需提交**）

### 4.1 Teachable Machine 入门（Part I）

- 网页工具，无需代码；本项目用 **Image Project → Standard image model**（另两种：Audio、Pose）。
- 界面术语：Class（类）、Add Image Samples（拍照/上传/拖拽采样）、**Epochs**（整个训练集过多少遍）、**Batch size**（一次迭代用的样本数；100 张图、batch=10 → 1 epoch=10 batch）、**Learning rate**（向损失函数最小值移动的步长）、Under the hood（训练详情）、Preview（测试）、Panel（可下载项目文件，含样本但不含已训练模型）。

### 4.2 训练流程（Part II · 10 类手写数字）

1. 解压 MNIST：`MNIST – training`（0–9 十个文件夹，每类 100 张）与 `MNIST – testing`。
2. Teachable Machine 建 **10 个类**：Number 0 … Number 9；每类从对应文件夹**随机传 20 张**。
3. 点 **Train Model** 训练（85% 样本训练、15% 留作验证）。
4. **Under the hood** 看 vocab：Training samples 85% / Testing(validation) samples 15%；看 **Accuracy per epoch**（分对比例，满分 1）与 **Loss per epoch**（越接近 0 越好，学习变好时下降）。
5. 测试：把 `MNIST – testing` 里的图拖进 **Preview**，或 Webcam 手写数字实时测；观察输出概率与标签是否一致。

### 4.3 三张实验表（准备课必做，理解参数影响）

**① 每类样本量**（20 vs 100 张，参数不动）→ 记录：最早达到最好训练精度的 epoch / 最终测试精度 / 第 10、30、49 轮的测试损失。
**② Epochs**（10 vs 50，batch=16、lr=0.001 不动）→ 最终测试精度、最终损失、最终测试损失。
**③ Batch size**（16 vs 64，epochs=50、lr=0.001 不动）→ 同上。

> 📖 译注：做完比较差异，能回答"样本越多/训练越久/批次怎么影响精度与损失"——这正是 Test 1 Part B 与项目报告里可能被问的点。

### 4.4 提高多样性（Additional data）

- Additional data.zip：数字 **1 和 7 的另一种手写风格**。
- 实验：用原模型预测新风格 1/7 → 看性能；然后把 1、7 两类的样本换成 **75 张 MNIST + 25 张 Additional** 重训 → 再测，比较提升。

## 五、术语表（中英对照）

| 英文 | 中文 | 一句话 |
|---|---|---|
| Teachable Machine | 可教机器学习（网页训练工具） | 无代码训练图像/音频/姿态模型 |
| Image Project | 图像项目 | 本项目类型 |
| class / label | 类别 / 标签 | Number 0…9 |
| sample | 样本 | 每类图片 |
| epochs | 训练轮数 | 整个训练集过一遍=1 epoch |
| batch size | 批次大小 | 一次迭代用多少样本 |
| learning rate | 学习率 | 参数更新步长 |
| accuracy | 准确率 | 分对比例，满分 1 |
| loss | 损失 | 预测误差，越接近 0 越好 |
| validation | 验证 | 15% 未训练样本测泛化 |
| vocab | 词表（模型类别表） | Under the hood 里查看 |

## 六、自测（答案折叠）

<details><summary>Q1 组队与提交的两个硬截止？</summary>
组队 9/30（逾期随机分配）；报告+演示视频 11/28（迟交扣分，每组一份，以最后一次提交评分）。</details>
<details><summary>Q2 演示视频 PPT 必须有哪五部分？</summary>
Front page（标题+组员学号分工）→ Introduction → Objectives（应用到专业）→ Implementation & results（采样/训练/准确率截图）→ Conclusions（发现+局限+未来）。</details>
<details><summary>Q3 100 张图、batch size 10，几个 batch 才算 1 epoch？</summary>
10 个 batch（100/10）。Epoch=整个训练集过一遍。</details>
<details><summary>Q4 Teachable Machine 默认训练/验证比例？</summary>
85% 训练、15% 验证（从未用于训练的样本来评估泛化）。</details>
<details><summary>Q5 评分里技术内容四块各占多少？</summary>
问题陈述 15%、采样 20%、训练 25%、测试 25%；另有演示技巧与组织 15%。</details>

## 更新记录
- 2026-09-28 全量更新：并入《Group Project and Demonstration.pdf》要求/评分/截止与《Mini-project Preparation》14 页 Teachable Machine+MNIST 全流程；补三张参数实验表、术语表、自测。
