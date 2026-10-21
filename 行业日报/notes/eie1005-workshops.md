## 📎 原始课件
- Workshop 1：见 [eie1005-w1-dataviz-python.md](eie1005-w1-dataviz-python.md)（WS01(A)/(B) 均截止）。
- Workshop 3：《Workshop3_v1.13.docx》（Canvas file 267949，2026-10-21 下载）；配套程序 FrozenLake_random.py / FrozenLake_finetune.py 在 Canvas 同模块；原始文件 `行业日报/files/eie1005/workshop3-worksheet.docx`，逐页原文 `ws3-original.txt`。
- Workshop 2：Canvas 尚未发布（Test 2 范围含 WS2&3，发布后补）。

# EIE1005 三次 Workshop 笔记（各占 10%，共 30%）

## Workshop 1 · Data Visualization – From Data to Insight（Wk3&4）
- 🐍 完整全讲见：[eie1005-w1-dataviz-python.md](eie1005-w1-dataviz-python.md)（零基础→WS01(B)：22 例逐例详解 + 背景/渐变着色/颜色条/主题美化）。**WS01(B) 截止 10/2 23:59，命名 EIE1005_StudentID_Workshop_01_B.py**
- 目标：把数据变成能讲故事的图表，写出见解。
- 要点：图表类型选择（趋势用折线、占比用饼/条、分布用直方图/箱线图）；避免误导性坐标轴；颜色与标注；洞察 = 对比 + 解释原因。
- 工具：Matplotlib / Tableau / Power BI / Excel。
- 报告建议：数据来源 → 处理 → 3 张关键图 → 每条图配一句结论 → 局限。

## Workshop 3 · Developing Game AI with OpenAI Gym（Wk8&9，Lab 3 提交 11/1）
- 目标：用强化学习训练并测试一个游戏 AI（FrozenLake，Q-learning），学会分析 RL 的关键参数。
- 软件：Windows 10+、Anaconda Navigator ≥2.0.3、Spyder ≥4.2.5（Mac 用 Terminal 启动）。
- 装包（Spyder 的 Console 里）：`pip install gymnasium` → `pip install gymnasium[toy-text]`（约 20 秒）→ 菜单 Console → Restart kernel。
> 🔴考点：Gym 已并入 **Gymnasium**；命令是 `gymnasium`，不是旧名 gym。

### 游戏环境 FrozenLake 速记
- Gym 的 Toy Text 环境：4×4 冰面，从 S 走到 G，掉进 H 失败，冰面滑可能不受控。
- 状态编号 = row×总列数+col（从 0 起）：S=0 … G=3×4+3=**15**，共 16 个状态。
- 动作 4 个：0 LEFT、1 DOWN、2 RIGHT、3 UP。
- 内置奖励：到 G +1；到 H 或 F 都是 0。

### Part I · 准备（工作页 p.4）
1. 登录电脑 → 2. 启动 Anaconda Navigator → 3. 点 Launch 打开 Spyder（Editor / Debugger / Console 三窗口，本 workshop 不写代码，只在 Console 敲命令）→ 5. pip 装 gymnasium 与 toy-text → 6. Restart kernel。

### Part II · 不训练先试玩（p.5–7）
- 把 Baseline 程序（页 5 代码，`FrozenLake_baseline.py`）拷进 Editor，保存到 Desktop 后 Run。
- 程序随机选动作（`env.action_space.sample()`），每步打印当前状态与奖励；碰到状态 5/7/11/12（洞）break；`input("Press Enter to continue:")` 单步执行。
- 有时按 Enter 后 agent 不动：因为系统让它出界，agent 保持原状态（不是卡死）。
- 玩到掉洞后截图（Win+Shift+S / Snipping），回答：Console 显示的当前状态与奖励值是什么？与游戏面板是否一致？
> 🔴考点：`#` 开头是注释；缩进必须逐字一致，改缩进程序就跑不了；代码要从下载的文档复制，不要从网页直接复制。

### Part III · 训练 agent（p.7–11）
1. 新建文件，粘入 Training Program（`FrozenLake_training.py`）：Q 表 `Q = np.zeros([16, 4])`；参数 **eta=0.628、gma=0.9**；动作选择 `a = np.argmax(Q[s,:] + np.random.randn(...)*(1./(i+1)))`（探索噪声随局数衰减）；每步用 Bellman 方程更新 Q：`Q[s,a] = Q[s,a] + eta*(reward + gma*np.max(Q[state,:]) - Q[s,a])`。
2. 保存为 FrozenLake_training.py；Run 后先输入 10 局训练：Q 表基本全 0（训练不足，可能全程到不了 Goal）。
3. 再 Run 输入 **500 局**：训练几乎瞬间完成；>10 局时图形不显示（render_mode 切成 rgb_array）提速。
4. 按所得 Q 表在地图上画出 agent 到 Goal 的路径（Q 表读法：每行是该状态下 4 个动作的值，取最大值对应的动作；例如 state 0 行最大 0.59049 在列 2 → 向右；state 2 行最大 0.729 在列 1 → 向下）。
5. 另存 `FrozenLake_train_n_play.py`，在训练程序末尾追加 Testing Program：用训练好的 Q 表玩 10 局（`a = np.argmax(Q[s,:])`），统计到达 Goal 的次数与平均步数（到 15 即 goal+=1，goal_step+=j）。
6. 结果：训练 500 局后 agent 每局都能到 Goal；把 Q 表、到达次数、平均步数粘贴到工作表。
> 🔴考点：Q 表行=状态(0–15)、列=动作(0–3)；行动按该行最大 Q 值对应的列。

### Part IV · 引入随机性（p.11–13）
1. 下载 `FrozenLake_random.py` 打开并 Run：输入训练局数 500、测试局数 10；问是否随机模式 → 输 **Y**。
2. 随机模式下（is_slippery=True 效果）：agent 不严格按程序给出的方向走，会以等概率滑向另外三个方向之一 → 只有 **1/3 概率**按指定方向移动（对应 Part II 讲义 p.22）。
3. 10 局测试统计不可靠 → 再 Run，训练 500、测试 **100**（>10 局不显示棋盘提速）。
4. Run 10 次，每次记录 T（到达 Goal 次数）与 S（平均步数，四舍五入整数）；T=0 或 S 无限则跳过该组，直到记满 10 组；因波动大，要求报 **均值与标准差**（Excel `STDEV.S`）。
> 🔴考点：随机性来自冰面滑（1/3 概率），不是随机动作；统计要多次（100 局）才有意义。

### Part V · 调参（p.13–14）
1. 可调参数：**训练局数**（10→500 成功率↑，但“越多越好”吗？）、**学习率 Eta**（0~1，Bellman 方程里控制 Q 表学习快慢）、**折扣因子 Gamma**（控制下一状态对奖励方案的影响）、**奖励方案**（默认到 G +1 其他 0；可给掉洞加负惩罚）。
2. 下载 `FrozenLake_finetune.py`，程序会依次问：训练局数、Eta、Gamma、掉洞惩罚（必须是 -0.99~0 的负小数）；回车用默认值；之后自动跑 10 次、每次测试 100 局，每轮结束暂停：按 **C 继续 / Q 退出**。
3. 目标：把 Part IV(4) 的**平均成功率提高几个百分点**（例：30%→33%，45%→48%），记录每次 T 与 S。
4. 开放题：先只改一个参数对比；最优参数一般与默认差别不大，别测极端值浪费时间。
- 两个问题（工作页 p.13–14）：①T 的均值与标准差是多少？说明你做了什么修改。②调整 Eta 与 Gamma 的利弊与趋势？
> 🧠拓展（趋势参考）：η 太大→震荡不收敛；η 太小→学得慢。γ 接近 1→更看重长期收益（更有远见）；γ 太小→只看眼前。掉洞负惩罚通常能更快避开洞，但过大会让 agent 过度保守。

### 提交
- Canvas「Lab 3 Submission (Workshop 3)」，**11/1 截止**；逾期每天扣 20%。
- 高分清单：①截图证明自己跑通 ②步骤+关键代码 ③记录一次失败与修复 ④挂钩课程概念（如“这里用 Bellman 方程更新 Q 值，η 是学习率”）。

## 通用高分清单
1. 截图/录屏证明「你自己跑通了」；2. 写明步骤与关键代码；3. 记录一次失败与修复；4. 与课程概念挂钩（如「这里用了监督学习」）。

## 更新记录
- 2026-10-21 · 依据 Canvas《Workshop3_v1.13.docx》补全 Workshop 3（Game AI / FrozenLake 五部分全流程 + 考点）；修正原“WS2=Game AI、WS3=对话式AI”的占位错误（实际 WS3=Game AI，11/1 截止）。
- 2026-09-24 · Workshop 1 指向合并版全讲并补 WS01(B) 截止。
