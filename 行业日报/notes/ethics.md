## 📎 原始课件
- [阅读 1 原文](files/eie1005/ethics-read1.txt)
- [阅读 2 · AI 偏见原文](files/eie1005/ethics-read2.txt)
- [LaMDA 案例原文](files/eie1005/ethics-lamda.txt)

# EIE1005 · AI 伦理阅读笔记(Week 1 必读)

> 对应 L1 课件"Ethical Considerations and Risks"与 AI Ethics Readings 模块
> 覆盖:阅读1(Accenture 负责任 AI)+ 阅读2(5 个 AI 偏见真实案例)+ LaMDA 案例讨论

---

## 阅读 1:Rethinking Responsibility with Generative AI(Accenture)

### GenAI 六大风险(重点背)
1. **Bias & harm 偏见与伤害**:歧视性/有害结果,可通过数据、模型或运行过程引入;
2. **Liability & compliance 责任与合规**:监管快速变化,企业面临罚款、处罚、诉讼;
3. **Unreliable outputs 不可靠输出**:GenAI 会"幻觉(hallucination)",不可靠就没人用;
4. **Confidentiality & security 保密与安全**:信息保护、防泄露与攻击;
5. **Sustainability 可持续性**:AI 算力密集,影响 ESG(能耗、碳排放、成本);
6. **Workplace transition 职场转型**:AI 替代岗位,须配套再培训(reskilling)与新角色。

### 企业落地"负责任 AI"四步路线
1. **建立 AI 治理与原则**(governance & principles,明确问责);
2. **开展 AI 风险评估**(公平、可解释、透明、准确、安全、人类影响);
3. **系统性启用负责任 AI 测试**(用工具持续衡量并缓解);
4. **持续监控与合规**(monitoring & compliance);
5. 全程跨部门协作,关注:劳动力影响、可持续、隐私、安全。

### Accenture 七大负责任 AI 原则(会考)
1. **Human by design 以人为本**:每次部署都先想对"人"的影响;
2. **Fairness 公平**:公平对待所有群体,缓解不必要偏见;
3. **Transparency, explainability & accuracy 透明/可解释/准确**:适当披露 AI 使用,让人能理解与评估输出;
4. **Safety 安全**:评估安全风险并减轻伤害;
5. **Accountability 问责**:明确角色、政策、责任的治理结构;
6. **Compliance, data privacy & cybersecurity 合规/隐私/安全**:守法、数据受保护、防网络攻击;
7. **Sustainability 可持续**:考虑对地球的影响。

> 案例:M**AS(新加坡金融管理局)+ Accenture 共建 Veritas 联盟**,按"公平、伦理、问责、透明"(FEAT)评估金融 AI 系统。

---

## 阅读 2:5 Real-life Examples of AI Bias(五个真实案例)

1. **Amazon 招聘 AI 歧视女性** — 用十年简历训练打分系统,历史简历男性占多数 ⇒ 自动压低女性/女子大学毕业生的分数,重训后仍不公平,项目被叫停。
2. **UNDP:AI 图像生成器强化 STEM 性别刻板印象** — 让 DALL·E 2 / Stable Diffusion 画"IT专家/数学家/科学家/工程师",结果几乎都是男性;现实里女性只占 STEM 领域 29%。**训练数据里的人间偏见会被 AI 复刻。**
3. **MIT CSAIL:风险预测算法有种族偏见** — 900 人心理危机热线实验,含种族/宗教信息;AI 的"处方性(prescriptive)建议"更多对非裔/穆斯林建议报警;跟从 AI 的人做了更多歧视性决定,而没 AI 时他们并不带偏见。
4. **Google 广告系统更常把高薪职位推给男性** — CMU 用 AdFisher 建 1.7 万个假求职档案、观察 50 万+广告:$200k+ 高薪教练岗向男性展示 1852 次、女性仅 318 次;给女性的常是普通职位。
5. **HireVue 视频面试歧视残障候选人** — 一名聋人原住民女性用 ASL 手语面试,语音识别无法理解;要求人工字幕被拒,反馈却叫她"加强有效沟通、练习积极倾听";Intuit 最终未录用。模型没学过非标准口音/手语。

### 结论与对策
- AI 能完全无偏见吗?**取决于训练数据的质量与完整性**;
- 缓解手段:测试偏见、定期审计模型公平性、**多元团队**参与数据与训练、透明主动披露。

---

## 案例讨论:Google LaMDA 与"AI 有意识"之争

### 背景
2022 年 6 月,Google Responsible AI 工程师 **Blake Lemoine** 公开声称对话模型 **LaMDA**(Language Model for Dialogue Applications)"有意识/有感受"。他在安全测试中与 LaMDA 谈哲学、死亡、权利,LaMDA 说"害怕被关闭",于是 Lemoine 认为它有了意识,甚至雇了律师。
**Google 回应**:LaMDA 只是"在数十亿文本上预测概率分布"的高级模式匹配系统,用来模仿人类对话,并无意识。

### 必看视频(Canvas 页面内嵌)
1. Bloomberg:Google Engineer Blake Lemoine on LaMDA Sentience Claims
2. FRANCE 24:Google's 'sentient' AI system LaMDA 'is really just a very large chatbot'

### 三大伦理维度(考点)
1. **Anthropomorphism & Deception 拟人化与欺骗**:人天然会把情感/意图投射到会说自然语言的机器上 ⇒ 情感操纵与依赖风险;
2. **AI Hype vs. Real Safety Risks 炒作 vs 真风险**:争论"意识"会转移公众与监管注意力,掩盖算法偏见、错误信息、版权等现实危害;
3. **Corporate Whistleblowing & Disclosure 企业吹哨与披露**:专有 AI 研发、保密协议(NDA)与"内部伦理担忧何时应公开"。

### 讨论题(无标准答案,用批判性思维)
1. 对话流利(过图灵测试)就足以证明意识吗,还是须满足科学/生物学的意识标准?
2. 开发者是否应让对话 AI 明确提醒用户"我是没有情感的统计算法",以防人类情感依附?
3. 为什么许多 AI 伦理研究者认为"执着于 AI 意识/人格"对当前治理是危险的?

> 答题思路:区分"语言能力"与"意识";优先治理现实中可量化的伤害;透明披露义务。

---

## 与考试关联
- L1 课件列出四大伦理风险(偏见公平/错误信息深度伪造/知识产权/环境影响)与阅读1六大风险对应,Test 1 可能出概念题;
- 把 5 个真实案例当例子记 1–2 个即可支撑论述题;
- LaMDA 案例考"拟人化 / 炒作 / 吹哨"三个维度最可能。