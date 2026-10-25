## 📎 原始课件
- [Module 6 页面](https://canvas.polyu.edu.hk/courses/4018/modules/items/19635) · 视频 [NDbMeAsSmC0](https://www.youtube.com/watch?v=NDbMeAsSmC0)（Prof. Sunungul? PolyU COMP）· [字幕稿](files/eie1005/aida/M6-big-data.txt)

# EIE1005 · AIDA 模块 6 · 大数据计算导论

## ⏱ 30 秒速览
一句话：Big Data = **大到/复杂到传统软件处理不了**的数据集；处理靠**分布式集群 + MapReduce**。
三条结论：① 特征 = **4V**（Volume/Velocity/Variety/Veracity，Gartner 先提 3V）；② 思想 = **分而治之**：大任务拆小、并行、再合并；③ 经典案例：AlphaGo（3000 万步棋）、Google 流感趋势、杭州城市大脑。
关键词：big data, 4V, distributed, MapReduce, shuffle, partition and conquer。

## 一、数据从哪来
每分钟都在产生海量数据：社交媒体、软件日志、传感器、GPS、交易、交通……

## 二、定义（两条）
1. **Wikipedia**：处理那些**太大/太复杂、传统数据处理软件搞不定**的数据集的领域；涵盖数据全生命周期（采集、存储、分析、搜索、共享、传输、可视化、查询、更新、隐私）。
2. **Gartner**：**高容量、高速度、高多样**的信息资产，需要成本效益高的创新处理方式以增强洞察与决策。

## 三、4V（必考，与模块 1 呼应）
| V | 含义 | 例证 |
|---|---|---|
| **Volume 量** | 数据规模 | 50 亿人用手机；一辆车几百个传感器；大型强子对撞机每年 **15 TB** |
| **Velocity 速** | 生成快 + 处理快 | 每 60 秒 1100 万条即时消息；决策错过时效即无用 |
| **Variety 多样** | 形式多样 | 结构化（表格）/半结构化（XML）/非结构化（文本、图）；一封邮件即含多种 |
| **Veracity 真实性** | 不确定、有错误 | 测量误差、人为错误、虚假评论（fake reviews） |

## 四、系统与计算范式
- **平台**：数据中心机架（rack）堆几十台机器，交换机互联；核心思想 = **分而治之（partition and conquer）**——一个任务拆成多个小任务，各机器只处理一部分数据，并行跑。
- **MapReduce**：只用两个简单程序搞定复杂任务——
  1. **Map**：对一小块数据并行处理，产出**中间结果**（部分解）；
  2. **Shuffle**：中间结果在机器间交换传输；
  3. **Reduce**：收集合并所有中间结果 → 最终解。
- **可视化**：帮人理解现状、预测未来、便于决策。

## 五、应用案例（必考）
- **AlphaGo**：从 16 万盘棋、**3000 万步**专家走法学习，训练深度强化学习模型战胜人类大师。
- **Google Flu Trends**：凭搜索关键词精准预测流感。
- **DeepMind 眼疾诊断**：准确率超过专家。
- **杭州城市大脑**：摄像头 + 交通传感器实时监控、预警、智能决策支撑智慧城市。

## 🎯 考点
- 两条定义的关键词（too large/complex；high volume/velocity/variety）；4V 例证；MapReduce 三步；分而治之；四个应用案例。

## 自测
1. Big Data 与传统数据的本质区别（按 Wikipedia 定义）？
2. MapReduce 的三个环节各做什么？
3. AlphaGo 为何算"大数据"案例？
答案：1 大到/复杂到传统软件无法处理 2 Map 并行处理小块数据出中间结果；Shuffle 交换传输中间结果；Reduce 合并得最终解 3 从 16 万盘棋 3000 万步中学习。
