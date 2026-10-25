## 📎 原始课件
- [Module 5 页面](https://canvas.polyu.edu.hk/courses/4018/modules/items/19633) · 视频 [bfmFfD2RIcg](https://www.youtube.com/watch?v=bfmFfD2RIcg) + [6M5VXKLf4D4](https://www.youtube.com/watch?v=6M5VXKLf4D4)（Simplilearn）· [字幕稿1](files/eie1005/aida/M5a-neural-network.txt) / [字幕稿2](files/eie1005/aida/M5b-deep-learning.txt)

# EIE1005 · AIDA 模块 5 · 神经网络与深度学习

## ⏱ 30 秒速览
一句话：神经网络 = 层层神经元，**前向传播算输出、反向传播改权重**，反复迭代直到预测准。
三条结论：① 层次关系：**AI ⊃ ML ⊃ DL**；② ML 要人挑特征，DL 自动学特征，但要**更多数据 + GPU + 更长训练时间**；③ 28×28=**784** 像素进输入层，输出层一个神经元一个类别。
关键词：neuron, weight, bias, activation function, forward/back propagation, 784, GPU, TensorFlow/PyTorch。

## 一、神经网络（视频 1）
- 神经网络是深度学习的基础，结构受大脑启发；输入数据→识别模式→预测新数据输出。
- **结构**：输入层（接收输入）→ 隐藏层（主要计算）→ 输出层（给出结果）。
- **工作流程**（方形/圆形/三角形例子）：
  1. 图像 28×28 = **784 像素**，每个像素喂给输入层每个神经元；
  2. 神经元之间靠**通道（权重 weight）**连接：输入 × 权重求和；
  3. 加**偏置（bias）**→ 过**激活函数（activation function，阈值函数）**→ 决定神经元是否"激活"；
  4. 逐层传递 = **前向传播（forward propagation）**；
  5. 输出层**值最高的神经元**发射，其值即概率 → 预测类别；
  6. **训练**：预测输出与实际输出比较得**误差（error，大小+符号）**→ 误差沿网络传回 = **反向传播（back propagation）**→ 调整权重 → 前向/反向循环迭代，直到多数预测正确；可能需数小时到数月。
- 应用：人脸识别/年龄估计、预测（降雨、股价）、音乐创作。
- ⚠️ 视频内题目："哪句**不**正确？a) 激活函数是阈值函数 b) 误差在每层计算 c) 训练含前向+反向传播 d) 多数处理在隐层"→ **答案 b**（误差在输出层计算，非每层）。

## 二、深度学习（视频 2）
- 层级：**AI**（让机器模仿人类行为）⊃ **ML**（用数据训练的算法实现 AI）⊃ **DL**（受大脑结构启发的 ML，用人工神经网络）。
- **ML vs DL**：识别番茄 vs 樱桃——ML 要人指定特征（大小、果梗）；DL 由网络**自动选特征**，代价是需要**海量数据**。
- 手写数字 9 例子：784 像素 → 输入层；输出层每神经元代表一个数字。
- **三大局限**：① 数据量（需海量数据）；② 算力（需 GPU——数千核心，昂贵）；③ 训练时间（数小时到数月，随数据量与层数增加）。
- 主流框架：**TensorFlow、PyTorch、Keras**、DeepLearning4j、Caffe、Microsoft Cognitive Toolkit。
- ⚠️ 视频内排序题：神经网络工作顺序 = **b 求加权和 → a 加偏置 → d 过激活函数 → c 神经元激活**（B→A→D→C）。

## 三、AIDA Interactive Playground（配套实操，见 Overview Videos）
- MNIST 数据集（0–9 手写数字）；模型编辑器：**输入层 → Flatten（把 2D 网格拉成一行）→ 两个 Dense 层**（设置激活函数与 units 神经元数）。
- 训练参数：**learning rate 学习率**（高=快但不精确）、**batch size 批次大小**、**epochs 轮数**；看 **loss（下降=学得好）与 accuracy（上升=认得准）** 曲线。
- 评估：**per-class accuracy 每类准确率 + confusion matrix 混淆矩阵**。

## 🎯 考点
- 前向/反向传播的定义；权重/偏置/激活函数各干什么；784 与 28×28；AI⊃ML⊃DL；ML 与 DL 的区别（特征工程 vs 自动 + 数据量）；三大局限；框架名。

## 自测
1. 前向传播与反向传播各做什么？
2. ML 与 DL 在"特征"上的根本区别？
3. 深度学习三大局限？
答案：1 前向=加权和+偏置+激活逐层传到输出；反向=误差回传调权重 2 ML 人工选特征，DL 自动学特征但需海量数据 3 数据量、算力（GPU）、训练时间。
