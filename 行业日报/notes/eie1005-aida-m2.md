## 📎 原始课件
- [Module 2 页面](https://canvas.polyu.edu.hk/courses/4018/modules/items/19627) · 视频 [7kBJerjnQTk](https://www.youtube.com/watch?v=7kBJerjnQTk)（Google 官方课程）· [字幕稿](files/eie1005/aida/M2-generative-ai-prompting.txt)

# EIE1005 · AIDA 模块 2 · 生成式 AI 与提示词工程

## ⏱ 30 秒速览
一句话：Prompting = 向 GenAI 工具**提供具体指令**以获得期望输出；好提示词 = **任务 + 上下文 + 格式（+ 迭代）**。
三条结论：① 幻觉（hallucination）是 GenAI 输出的错误/荒谬内容，模糊指令与"猜答案"时更易发生，必须 fact-check；② 负责任使用 = 守政策、不输入机密、评估偏见、披露使用、**human-in-the-loop**；③ 提示词技巧适用于所有工具（Gemini/ChatGPT/Copilot/Claude）。
关键词：GenAI, prompt, task/context/format, hallucination, bias, human-in-the-loop。

## 一、基础概念
- **Generative AI**：基于从现有数据学到的模式**生成新内容**（文本、图像、代码、音频）的 AI。
- **Prompting（提示词工程）**：向 Gen 工具提供具体指令以获取信息或完成任务的过程；指令即 **prompt**。是"艺术 + 科学"——像给新同事布置任务：给上下文、设参数。
- 常见聊天工具：OpenAI ChatGPT、Google Gemini（原视频拼作"OpenIA/Google Gemini"）。

## 二、提示词框架（核心）
- 把提示词写全三要素：**Task（任务）+ Context（上下文）+ Format（输出格式）**；效果不好就**迭代（iterate）**细化。
- 例："I want to send a reminder… extract the times of the keynote and two panels **from this schedule** **into a table**"——任务 + 上下文 + 格式俱全。
- **多模态提示**：可输入图片/音频（城市地图→地标清单、录音→要点、平面图→房间列表）。

## 三、典型用途（视频列举）
头脑风暴、制定计划、按不同受众起草邮件、会议纪要总结与行动项、分析数据/表格→图表→幻灯片 + 讲稿、复杂项目拆解、造一个**个性化 AI 助手**（练面试、备困难对话）。

## 四、负责任使用（必考）
- 先问三件事：与目标/义务是否一致？是否符合组织政策与法律？不合就别用。
- **保密**：未查公司政策前不把机密/敏感数据输入公开工具；个人使用也别输入隐私；关注数据用途。
- **幻觉 hallucinations**：输出不一致、不正确甚至荒谬；常因指令含糊或工具"猜答案"；必须**核查与交叉比对**（Gemini 有内置 Fact Checker）。
- **偏见 bias**：可能表现为刻板印象；用具体详细的提示词 + 迭代，并使用包容性语言（如 serviceman → service person，避免性别化词）。
- **披露使用**：向他人分享内容时说明用了 GenAI。
- **Human-in-the-loop**：GenAI 不会像人一样批判性思考，人必须验证输出后才使用。

## 🎯 考点
- prompting 定义；提示词框架要素；幻觉的定义、成因、对策；负责任使用四要点；human-in-the-loop 含义。

## 自测
1. 什么是 prompting？
2. 幻觉是什么？什么时候更容易发生？怎么防？
3. human-in-the-loop 指什么？
答案：1 向 GenAI 工具提供具体指令以得到期望输出 2 输出与事实不一致/错误/荒谬；指令含糊或模型猜测时；用核查与交叉比对防 3 人在最终使用前验证 AI 输出。
