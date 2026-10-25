## 📎 原始课件
- [Module 3 页面](https://canvas.polyu.edu.hk/courses/4018/modules/items/19629) · 视频 [Q4iwoEPsgao](https://www.youtube.com/watch?v=Q4iwoEPsgao)（Dr. Buang, PolyU COMP）· [字幕稿](files/eie1005/aida/M3-machine-learning.txt)

# EIE1005 · AIDA 模块 3 · 机器学习导论

## ⏱ 30 秒速览
一句话：机器学习 = 从经验（数据）中学习、从而在任务上提高表现的程序。
三条结论：① 三种类型 = **监督（有标签）/ 无监督（无标签）/ 强化（靠奖惩）**；② 历史：1950s 感知机 → 1980s 反向传播 → AI 寒冬 → 2016 AlphaGo 战胜围棋冠军；③ 应用遍及 CV、NLP、机器人等。
关键词：Mitchell definition, experience E / tasks T / performance P, supervised/unsupervised/reinforcement, perceptron, backpropagation, AlphaGo。

## 一、为什么学
- Bill Gates："机器学习上的突破价值十个微软。"；斯坦福前校长："机器学习是 hot new thing"；它正在改变世界。

## 二、定义（★必背英文原句）
- Merriam-Webster 的 learning：the activity or process of gaining knowledge or skill by studying, practicing, being taught or experiencing something。
- **Tom Mitchell 的机器学习定义（考试爱考）**：A computer program is said to **learn from experience E** with respect to some class of **tasks T** and **performance measure P**, if its performance at tasks in T, as measured by P, **improves with experience E**。
- 大白话：程序从经验中学，任务表现随之变好。

## 三、历史
- 1950s：第一个**感知机（perceptron）**算法被发明并做成电路（还不是电脑）。
- 1980s：**反向传播（backpropagation）**等基础思想诞生。
- 1980s：**AI 寒冬（AI winter）**——程序解不了人们期望的难题，信心崩塌。
- 2016：DeepMind 的 **AlphaGo** 击败人类围棋冠军，全球直播；机器学习进入大浪潮。
- 涉及的学科：数学（概率、统计、优化）+ 生物学/心理学/神经科学。

## 四、三种类型（必考）
| 类型 | 训练方式 | 典型任务 |
|---|---|---|
| **Supervised 监督** | 带标签（targets/labels） | 分类 classification、回归 regression |
| **Unsupervised 无监督** | 无标签，直接喂原始数据 | 聚类 clustering、降维 dimension reduction |
| **Reinforcement 强化** | 用"错误"训练：奖励/惩罚 | 玩游戏、机器人导航 |

- 示例：图像分类（监督）；马↔斑马视频互转（无监督，无需标签也能生成逼真视频）；机器人避障导航（强化——撞墙受罚，学会不撞）。

## 五、总结三要点
1. 机器学习**从经验解决任务并提升表现**（数据中学，罚了就不犯）。
2. 三大类：监督 / 无监督 / 强化。
3. 应用广泛：计算机视觉、自然语言处理、机器人，乃至化学、生物。

## 🎯 考点
- Mitchell 定义（E/T/P 对应）；三类型定义与例子；历史关键点（1950s 感知机、1980s 反向传播、AI winter、2016 AlphaGo）。

## 自测
1. 默写 Mitchell 定义中 E、T、P 各指什么？
2. 监督 / 无监督 / 强化各靠什么训练？
3. AI 寒冬发生在哪个年代、原因是什么？
答案：1 experience 经验 / tasks 任务 / performance 表现度量；定义大意=表现随经验改进 2 标签 / 无标签 / 奖惩 3 1980s，程序解不了难题、信心崩塌。
