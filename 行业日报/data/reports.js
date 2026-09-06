window.DAILY_REPORTS = [
  {
    "date": "2026-09-06",
    "industry": "机器人",
    "title": "机器人领域每日动态 · 中美前沿版（含学习规划）",
    "summary": "2026 量产元年叠加 VLA→WAM 范式切换；中国以场景牵引+出海+开源生态推进，美国以基础模型+算力平台+学术联盟定义上游；跨本体迁移与安全准入成为 9 月新热点。",
    "content": "# 背景：中美科技前沿（分开论述）\n\n## 中国前沿\n- 量产元年兑现：2026 上半年我国人形机器人出货量超 4 万台、占全球约 97%；9 月 1 日 GB/T 47245—2026 等机器人智能控制国标正式实施。\n- WRC 2026（主题“人机共生，产需共融”）明确从“炫技”转向“干活”：物流、药房、产线等真实场景成为竞争焦点。\n- 出海加速：魔法原子 Magic-VLA K02 在 IFA 2026 面向欧洲推出柔性搬运、物流分拣工业方案；启元机器人携启元 Q1/T1 个人机器人首秀 IFA 并斩获两项国际创新大奖，尚品宅配与启元合资成立“尚元智启”，聚焦具身智能 C 端落地；宇树机器人亮相沙特 LEAP 2026。\n- 学术与国家队：国家自然科学基金委员会期刊刊发《具身智能的关键挑战与技术》综述；清华、上海 AI Lab、北大、上交、中科院等输出 FP3、Dexora、WholeBodyVLA、Ψ0、Hex、Ultra 等工作。\n- 路线特征：全栈国产化（灵境智源致境 T300/T81）+ 场景驱动 + 硬件铺量反哺数据 + 开源社区（自变量 WALL-OSS-0.5 三天跑通全流程）。\n\n## 美国前沿\n- NVIDIA 平台链：GR00T N1 首个开源通用人形基础模型快速迭代至 N1.5/N1.6/N1.7，衍生 GR00T-H 医疗版，配套 Isaac Sim/Isaac Teleop；IEEE/JSAP 2026 指出其在 Blackwell GPU 上仍主要为内存带宽受限。\n- 范式主张：英伟达机器人负责人称“VLA 已死、遥操也死了”，主张 WAM 新预训练范式 + Sensorized Human Data，并提出“算力=环境=数据”。\n- 决策层开源竞赛：Meta 全开源 HumanCLAW（arXiv:2607.27180），基础模型进入具身智能决策层，与 GR00T 开源路线形成对标。\n- 学术联盟：Amazon FAR 联合 MIT/Berkeley/Stanford/Cornell 的 OmniRetarget 获 ICRA 2026 双料最佳论文；9 月初新作 TrAct（视觉轨迹桥接控制与世界模型）、ZETA（跨本体 VLA 零样本迁移对照研究）、PACT（人机协作动作准入）显示“跨本体”与“安全准入”成为新热点。\n- 路线特征：上游基础模型 + 算力平台 + 产学研联盟，主导世界模型/WAM 理论建构与开源生态。\n\n# 核心思维模式（6 个）\n\n1. **联合分布思维**：VLA 学的是反应式映射 P(动作|观测)；WAM 建模“未来状态与动作”的联合分布，显式考虑干预后世界如何演化。\n2. **世界模型 = 预测核心**：把观测压缩为状态、模拟动作条件化未来、支撑超越反应式控制的规划。\n3. **数据生态替代**：遥操作、便携人类示范、仿真、第一视角视频四类数据组成生态；EgoScale 证明人类数据 log-linear Scaling；XRZero-G0 发现 10:1 混合可媲美纯真机数据。\n4. **精准度诅咒**：高精度任务的数据需求遵循更陡的 Scaling 定律，倒逼数据效率革命。\n5. **安全边界前置**：世界模型引入投毒、后门、传感器欺骗、提示注入等新攻击面，既是安全盾也可能产生“预测性安全幻觉”。\n6. **跨本体中间表示**：TrAct 用“视觉轨迹”作为本体相关控制与本体无关预测之间的共享接口；OmniRetarget 一次示范可生成多本体数据。通用化的关键不是统一身体，而是统一中间表示。\n\n# 专家争论最激烈的方面（6 个）\n\n1. **VLA 已到天花板，还是仍是主力？** VLA 派：语义泛化积累深厚（综述被引 461），WholeBodyVLA 推至全身操控；WAM 派：VLA 是 reactive mapping，不建模干预后演化，应建模联合分布。\n2. **数据从哪来？** 遥操作最保真但昂贵；人类第一视角数据有 log-linear Scaling（EgoScale）；合成数据可自进化（DexFlywheel）；XRZero-G0 主张 10:1 混合。\n3. **Scaling 万能论 vs 数据效率论 vs 反 Scaling**：多样性派称任务多样性是关键（IEEE T-RO 2026）；效率派引 Curse of Precision；反 Scaling 派引钱学森 1993 年书信“机器人至多小型大系统，AI 进化主义派论点有局限”。\n4. **端到端一体 vs 分层专家混合**：Ψ0、WholeBodyVLA 押单体；Hex、VLM+RL 分层、接触隐式 MPC 押结构。\n5. **通用人形 vs 形态务实主义，以及 B 端 vs C 端**：通用派押“一套模型管全身”；务实派称轮式/机械臂更高效便宜，杨立昆称“当前人形机器人智商不如家猫”；启元押 C 端个人机器人，多数头部押 B 端工业——争论本质是“通用性先行”还是“可靠性与付费场景先行”。\n6. **开源协作 vs 全栈自研 + 安全悖论**：开源派 Meta HumanCLAW、GR00T N1、Ψ0；自研派星动纪元 95% 自研、灵境智源全栈国产化；世界模型既是盾又可能产生预测性安全幻觉。\n\n# 十个“一眼验真懂”的问题（附答案与思考）\n\n1. **WAM 与 VLA 的数学本质区别？** VLA：P(动作|观测) 反应式映射；WAM：未来状态与动作的联合分布。思考：能否说出“反应式映射 vs 联合分布/干预后演化”。\n2. **WAM 为何分 Cascaded 与 Joint？** 级联可解释但误差级联；联合紧凑但难分离监控。权衡：误差隔离 vs 表达能力。\n3. **“世界模型只能想象未来、不能决定动作”对应学术上什么问题？** 预测（状态建模）与决策（动作生成）两个监督目标被割裂。\n4. **Curse of Precision 揭示什么？** 误差阈值收紧 → 可接受样本幂律稀缺 → 数据需求陡增。\n5. **EgoScale 的 log-linear Scaling 为何重要？** 无动作标签的人类第一视角数据也能规模化提升真机操作。\n6. **XRZero-G0 的 10:1 混合说明什么？** 少量真机 + 大量 robot-free 数据可替代大部分昂贵真机采集。\n7. **世界模型安全的 duality 是什么？** 它既是安全盾，又是被投毒/欺骗后可操纵的“假未来”。\n8. **中美前沿的路线差异本质？** 中国下游场景拉动（硬件、国标、出海、开源生态）；美国上游模型/算力推动（基础模型、平台、学术联盟）。\n9. **TrAct 为什么用“视觉轨迹”作共享接口？** 因为轨迹在图像空间可预测、与本体解耦，能桥接“本体相关控制”与“本体无关视觉预测”，让一个世界模型服务多种本体。思考：理解“接口解耦”为何是跨本体迁移的关键。\n10. **启元押 C 端个人机器人、头部押 B 端工业，争议本质是什么？** B 端看“可靠性+付费场景”，C 端看“情绪价值+个性化生态”；本质是通用性、可靠性与付费意愿三者的先后次序之争。\n\n# 大学学习规划与建议\n\n## 为什么现在值得学\n- 2026 是量产元年、也是 VLA→WAM 的范式切换窗口；数据工程师、仿真工程师、具身模型训练与部署岗位缺口大；开源权重（GR00T、Ψ0、Meta HumanCLAW）把入门门槛降到“一台电脑+一个仿真环境”。\n\n## 本科阶段：打牢三根支柱\n- 数学：线性代数、概率统计、微积分、数值优化。\n- 编程：Python（PyTorch）、C++、Linux、Git、ROS 2。\n- 核心课：机器人学（运动学/动力学）、反馈控制、计算机视觉（3D 几何优先）、强化学习、深度学习。\n- 教材：Modern Robotics（Lynch & Park）、Probabilistic Robotics（Thrun 等）、Sutton & Barto《强化学习》、Siciliano《Robotics: Modelling, Planning and Control》。\n- 公开课：MIT 6.4210 Robotic Manipulation、Stanford CS229/CS231A、Berkeley CS285、国家高等教育智慧教育平台《机器人技术导论》。\n\n## 实践与竞赛（大一到大三持续做）\n- 仿真起步：MuJoCo、Isaac Sim 或 Webots 复现抓取 demo，再上真机（校园机器人队/实验室）。\n- 竞赛：RoboCup、ICRA/IROS 机器人竞赛、VEX/FRC（低年级）、开源社区黑客松。\n- 作品集：用 GR00T/Ψ0 开源权重做一个小项目并写清“数据→训练→部署”链路，比空背知识点有用得多。\n\n## 科研入门（大三—研究生）\n- 精读：WAM 综述（arXiv:2605.12090）、VLA 综述、ICRA/CoRL 最佳论文。\n- 复现：Ψ0、GR00T、Dexora 的数据管道；从“换数据看成功率变化”开始做消融。\n- 高价值方向（结合今天热点）：世界模型/WAM、数据 Scaling 与合成数据、3D 几何先验、跨本体迁移（TrAct/ZETA）、安全与评估（PACT/安全综述）。\n\n## 升学与就业\n- 中国：专硕偏工程落地（宇树、智元、银河通用、魔法原子、灵境智源等产业 + 高校联培）；学硕/直博偏学术（清华、上海 AI Lab、北大、上交、中科院）。\n- 美国：研究型 PhD（MIT、Berkeley、Stanford、CMU）与 NVIDIA、Meta、Amazon 工业实验室；开源权重让“非名校+强作品集”同样有竞争力。\n\n## 一句话路线\n先打牢“几何 + 控制 + 学习”三根支柱，再跟紧“WAM”与“数据 Scaling”两条主线，用开源模型做出自己的项目，最后按“要科研选学硕/直博、要落地选专硕/产业”做选择。\n",
    "sources": [
      {
        "label": "World Action Models: The Next Frontier in Embodied AI (arXiv:2605.12090)",
        "url": "https://arxiv.org/abs/2605.12090"
      },
      {
        "label": "Security of World-Model-Based Embodied AI (arXiv:2607.28226)",
        "url": "https://arxiv.org/abs/2607.28226"
      },
      {
        "label": "Psi-0: An Open Foundation Model Towards Universal Humanoid Loco-Manipulation (arXiv:2603.12263)",
        "url": "https://arxiv.org/abs/2603.12263"
      },
      {
        "label": "MotionWAM (arXiv:2606.09215)",
        "url": "https://arxiv.org/abs/2606.09215"
      },
      {
        "label": "The Curse of Precision (arXiv:2607.23108)",
        "url": "https://arxiv.org/abs/2607.23108"
      },
      {
        "label": "EgoScale (arXiv:2602.16710)",
        "url": "https://arxiv.org/abs/2602.16710"
      },
      {
        "label": "XRZero-G0 (arXiv:2604.13001)",
        "url": "https://arxiv.org/abs/2604.13001"
      },
      {
        "label": "Hex: Humanoid-Aligned Experts (arXiv:2604.07993)",
        "url": "https://arxiv.org/abs/2604.07993"
      },
      {
        "label": "OmniRetarget, ICRA 2026 best papers (arXiv:2509.26633)",
        "url": "https://arxiv.org/abs/2509.26633"
      },
      {
        "label": "Meta HumanCLAW (arXiv:2607.27180)",
        "url": "https://arxiv.org/abs/2607.27180"
      },
      {
        "label": "TrAct: Bridging Robot Control and Visual Prediction with Visual Tracks (arXiv:2608.24101)",
        "url": "https://arxiv.org/abs/2608.24101"
      },
      {
        "label": "ZETA: Zero-Shot Cross-Embodiment VLA Transfer (arXiv:2609.02546)",
        "url": "https://arxiv.org/abs/2609.02546"
      },
      {
        "label": "PACT: Provenance-Conserving Multi-View Fusion for HRC (arXiv:2609.01662)",
        "url": "https://arxiv.org/abs/2609.01662"
      },
      {
        "label": "郝杰等《具身智能的关键挑战与技术》国家自然科学基金委员会期刊",
        "url": "https://www.sciencep.com/"
      },
      {
        "label": "Shi et al. Is Diversity All You Need for Scalable Robotic Manipulation? IEEE T-RO 2026",
        "url": "https://ieeexplore.ieee.org/abstract/document/11488937/"
      },
      {
        "label": "澎湃：具身大佬，为这几个问题吵翻了",
        "url": "https://m.thepaper.cn/newsDetail_forward_33824808"
      },
      {
        "label": "21经济：具身智能的ChatGPT时刻何时到来",
        "url": "https://m.21jingji.com/article/20260821/herald/05e1985fc27526ee95fe934f79d9fc3b.html"
      },
      {
        "label": "DoNews：放弃大力出奇迹，类脑推理重构机器人落地逻辑",
        "url": "https://www.donews.com/news/detail/1/6677947.html"
      },
      {
        "label": "36氪：VLA死了，遥操也死了，英伟达机器人一号位说的",
        "url": "https://m.36kr.com/p/3804094350810882"
      },
      {
        "label": "启元机器人首秀 IFA 2026 斩获两项国际创新大奖（大象新闻）",
        "url": "https://www.hntv.tv/yc/article/1/2096195475819302913"
      },
      {
        "label": "魔法原子亮相 IFA 2026，物理AI加速落地欧洲工业产线（河南广电）",
        "url": "https://www.hntv.tv/recommend/article/1/2096246211486642178"
      },
      {
        "label": "国家高等教育智慧教育平台《机器人技术导论》",
        "url": "https://higher.smartedu.cn/course/68018382b836e5522a7bebf3"
      }
    ]
  }
];
