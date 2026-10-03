## 📎 原始课件
- [NVIDIA 讲座逐页原文](files/eie1005/guest-lecture-nvidia-原文.txt)
- 来源：Canvas courses/4018 files/264264（PolyU Guest Lecture.pdf，49 页）

# EIE1005 · Guest Lecture 笔记（Week 5 · NVIDIA）
## How Open Models, Agents, and Physical AI Are Fueling a Flywheel of Innovations

> 演讲者：Dr. Ginny Wong（Senior Data Scientist, NVIDIA AI Technology Center）· 2026-09-28 · **出席计分（Guest 5%），且是 Test 1 Part A 十道 MCQ 的考点来源**。

## ⏱ 30 秒速览
一句话：NVIDIA 讲座讲的是"AI Agent 时代"——Agent = Harness + Models，按 Observe→Reason→Act 循环干活；AI 不是一刀切，要"Systems of Models + 专用 Agent"；最后落到 Physical AI（机器人）生态：GR00T 训练、Omniverse 仿真、Cosmos 世界模型、Jetson Thor 推理。

三条结论：
1. **Agent 三要素**：Agent = Harness + Models；循环 Observe → Reason → Act；从"生成答案"走向"替你完成任务"。
2. **模型矩阵对号入座**：Nemotron→Agentic AI、Cosmos→Physical AI、GR00T→Robotics、Clara→Biomedical、Earth-2→AI-Physics、Alpamayo→Autonomous Vehicle。
3. **机器人三大支柱**：TRAINING = GR00T · SIMULATION = Omniverse · INFERENCE = Jetson Thor；"训练数据是机器人的最大挑战"。

关键词：Agent、Harness、Observe-Reason-Act、System of Models、Specialized Agents、Nemotron、Cosmos 3、Physical AI、GR00T、Omniverse、Isaac Sim/Lab、Sim2Real。

## 一、AI Agent 的演进（P2–P4）
- 演进主线：**From LLMs and multi-turn prompts to long-running agents that complete tasks**。
- 时间线：**ChatGPT（Nov 2022）→ DeepSeek（Jan 2025）→ Agent Harnesses（2026）**。
- Token 规模三级跳：ChatGPT **100s** of Tokens → Reasoning Models **1000s** → AI Agents **1,000,000s** of Tokens（Understanding, thinking, acting）。
- **Agent = Harness + Models**；Agentic AI 是新的计算范式（New Computing Pattern）；从"generating answers"到"doing work"；软件工程 3x productivity。

## 二、Agent 的运行机制（P5–P7）
新计算范式八要素：**Memory（Harness | NemoClaw）、Context、LLM、Sandbox | OpenShell、Orchestration、Prompt、Tools and Skills、Security and Governance**。
- 核心循环：**Observe → Reason → Act**（每步由 LLM 执行）。
- 实例：让 Agent 写一个 JavaScript 牛顿摆动画 HTML；或"我丢了遥控器电池盖，生成一个可直接 3D 打印的 CAD 文件"——都是给上下文后按 Observe→Reason→Act 完成。

## 三、Systems of Models 与专用 Agent（P8–P15）
- **AI is Not a One Size Fits All Problem**：长时运行的 Agent 系统需要 Systems of Models + Specialized Agents + High Efficiency。
- Agentic AI 常**混合专有与开源模型**：Open LLM、Open VLM、GPT-5、Multimodal Router、ASR、TTS、Guardrails。
- 专用 Agent 五大好处：Deployment Flexibility、Data & IP Control、Cost Optimization、Adaptability & Continuous Learning、Domain-Specific Accuracy。
- **Post-training 四要素**：Computational Scale、Specialized Environments & Verifiers、Domain Tasks、Base Model。

## 四、NVIDIA 开源模型矩阵（P10–P11）
| 模型/系列 | 对应领域 |
|---|---|
| Nemotron | Agentic AI（智能体） |
| Cosmos | Physical AI（物理世界） |
| GR00T | Robotics（机器人） |
| Clara | Biomedical AI（生物医疗） |
| Earth-2 | AI-Physics（AI 物理） |
| Alpamayo | Autonomous Vehicle（自动驾驶） |

- **Nemotron 开源规模（易考数字）**：10 Trillion Pretraining Tokens · 40 Million Post-training Samples · 900K RL Tasks · 11K Safety Traces。
- Nemotron 系列：Nemotron 3 / VL / Speech / RAG / Safety。

## 五、Physical AI 与机器人生态（P20–P38）
- Physical AI 市场：**$98 Trillion** industries；口号 "Ask me or tell me to do something"。
- 输入输出：**Text Tokens + Sensor Tokens → Physical AI Foundation Model → Action Tokens**。
- 三大支柱：**TRAINING = GR00T · SIMULATION = Omniverse · INFERENCE = Jetson Thor**（+ CUDA-X Libraries、Isaac 开放机器人平台）。
- **Training Data is the Grand Challenge of Robotics**（机器人数据四环节：Data Generation、Environment Generation、Policy Learning、Policy Evaluation）。

### Cosmos 3（P25）
- Physical AI 的前沿基础模型，输入输出覆盖 Text/Image/Video/Audio/Action，Reasoner（自回归）+ Generator（扩散），**Built on Mixture of Transformer**。
- 四种角色（高频考点）：
  - **As Vision Language Model (VLM)**：把视觉变成密集描述、亚秒级洞察与警报；
  - **As World Model**：合成数据生成提速最高 **60x**；
  - **As World Simulator**：训练与评估从数月缩到数天；
  - **As World Action Model (WAM)**：借助通用 embodiment 预训练更快适配策略。

### Isaac Sim vs Isaac Lab（P31–P36）
- **Isaac Sim**：高保真物理仿真（PhysX/RTX）、SIL/HIL 测试、合成数据生成、ROS 2 集成，用于"测试与验证"。
- **Isaac Lab**：机器人策略训练框架（RL、imitation learning）、并行仿真、Isaac Lab-Arena 大规模评估，用于"学习与训练"。
- 记忆口诀：**Sim 做仿真测试，Lab 做学习训练**。
- 其他工具：Omniverse NuRec（3D Gaussian 重建）、Isaac TeleOp（遥操作数据采集）、GR00T End-to-end Workflow（数据→训练→评估→部署，Jetson Thor）。

## 🔥 Test 1 Part A · 十道预测题（源自本讲座）
> 🔴 考点：Part A 的 10 道 MCQ 出自本讲座，以下 10 个点最可能考：
1. **Agent 公式**：Agent = Harness + Models。
2. **演进时间线**：ChatGPT (Nov 2022) → DeepSeek (Jan 2025) → Agent Harnesses (2026)。
3. **Token 三级跳**：100s → 1000s → 1,000,000s。
4. **Agent 循环顺序**：Observe → Reason → Act。
5. **新范式八要素**：Memory / Context / LLM / Sandbox / Orchestration / Prompt / Tools / Security & Governance。
6. **"AI 不是一刀切"的解法**：Systems of Models + Specialized Agents。
7. **模型矩阵对应**：Nemotron↔Agentic AI、Cosmos↔Physical AI、GR00T↔Robotics、Clara↔Biomedical、Earth-2↔AI-Physics。
8. **Nemotron 数据规模**：10 Trillion tokens / 40M samples / 900K RL tasks / 11K safety traces。
9. **Cosmos 3 的四种角色**：VLM / World Model / World Simulator / WAM。
10. **机器人三大支柱**：GR00T（训练）、Omniverse（仿真）、Jetson Thor（推理）；Isaac Sim vs Isaac Lab 的分工。

## 七、自测（答案折叠）
1. Agent 的组成公式是什么？
<details><summary>查看答案</summary>Agent = Harness + Models。Harness 提供 Memory、Context、Sandbox、Orchestration 等"外骨骼"，Models 是大脑（LLM）。</details>

2. Agent 工作的核心循环？
<details><summary>查看答案</summary>Observe（观察）→ Reason（推理）→ Act（行动），每步由 LLM 执行。易错点：顺序不能写成 Reason→Observe。</details>

3. 为什么说"AI is not a one size fits all problem"？
<details><summary>查看答案</summary>单一模型难满足所有任务；应构建 Systems of Models + Specialized Agents，兼顾高效率、成本与领域精度。</details>

4. Nemotron / Cosmos / GR00T / Clara / Earth-2 分别对应什么领域？
<details><summary>查看答案</summary>Agentic AI / Physical AI / Robotics / Biomedical AI / AI-Physics。易错点：Nemotron 是智能体、Cosmos 是物理世界，别对调。</details>

5. Isaac Sim 与 Isaac Lab 的区别？
<details><summary>查看答案</summary>Isaac Sim 是高保真物理仿真（SIL/HIL 测试、合成数据、ROS2）；Isaac Lab 是策略训练（RL/模仿学习、并行仿真、Arena 评估）。口诀：Sim 仿真测试，Lab 学习训练。</details>

6. Cosmos 3 作为 World Model 的作用？
<details><summary>查看答案</summary>把合成数据生成提速最多 60x，包括未见过的场景；作为 World Simulator 则把训练评估从数月缩到数天。</details>