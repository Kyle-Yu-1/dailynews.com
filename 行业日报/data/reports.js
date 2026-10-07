window.DAILY_REPORTS = [
  {
    "date": "2026-09-06",
    "industry": "机器人",
    "title": "机器人领域每日动态 · 中美前沿版（含学习规划）",
    "summary": "2026 量产元年叠加 VLA→WAM 范式切换；中国以场景牵引+出海+开源生态推进，美国以基础模型+算力平台+学术联盟定义上游；跨本体迁移与安全准入成为 9 月新热点。",
    "content": "# 背景：中美科技前沿（分开论述）\n\n## 中国前沿\n- 2026 被称为人形机器人“量产元年”：上半年我国人形机器人出货量超 4 万台，占全球约 97%；GB/T 47245—2026《机器人智能控制系统总体架构》等智能控制国标于 9 月 1 日实施。\n- WRC 2026（主题“人机共生，产需共融”）释放明确信号：行业评价标准从“炫技”转向“干活”。\n- 代表性进展：北京人形机器人创新中心“Pelican-Unify”具身大一统模型；银河通用 AstraBrain 智慧药房 7×24 运营；魔法原子 Magic-VLA K02 出海 IFA；宇树机器人亮相沙特 LEAP 2026。\n- 学术与国家队：国家自然科学基金委员会期刊刊发《具身智能的关键挑战与技术》综述；清华、上海 AI Lab、北大、上交、中科院等输出 FP3、Dexora、WholeBodyVLA（ICLR 2026）、Ψ0、Hex、Ultra 等。\n- 路线特征：全栈国产化（灵境智源致境 T300/T81）+ 场景驱动 + 硬件铺量反哺数据 + 开源社区（自变量 WALL-OSS-0.5，黑客松三天跑通全流程）。\n\n## 美国前沿\n- NVIDIA 平台链：GR00T N1 是首个开源的通用人形基础模型，已快速迭代至 N1.5/N1.6/N1.7，衍生 GR00T-H（医疗），配套 Isaac Sim / Isaac Teleop；IEEE/JSAP 2026 指出 GR00T N1.6 在 Blackwell GPU 上仍主要为内存带宽受限。\n- 范式主张：英伟达机器人负责人称“VLA 已死、遥操也死了”，主张 WAM 成为新预训练范式、数据转向 Sensorized Human Data，并提出“算力=环境=数据”。\n- 学术联盟：Amazon FAR 联合 MIT、Berkeley、Stanford、Cornell 的 OmniRetarget 获 ICRA 2026 双料最佳论文；TTIC/Waymo/JHU/TRI 的相机条件化策略同届获奖。\n- 路线特征：上游基础模型 + 算力平台 + 产学研联盟，主导世界模型 / WAM 理论建构。\n\n# 核心思维模式（6 个）\n\n1. **联合分布思维**：VLA 学的是反应式映射 P(动作|观测)，WAM 建模“未来状态与动作”的联合分布，显式考虑干预后世界如何演化。\n2. **世界模型 = 预测核心**：把观测压缩为状态、模拟动作条件化未来、支撑超越反应式控制的规划。\n3. **数据生态替代**：遥操作、便携人类示范、仿真、第一视角视频四类数据组成生态；EgoScale 证明人类数据 log-linear Scaling；XRZero-G0 发现 10:1 混合可媲美纯真机数据。\n4. **精准度诅咒**：高精度任务的数据需求遵循更陡的 Scaling 定律，倒逼数据效率革命。\n5. **安全边界前置**：世界模型引入投毒、后门、传感器欺骗、提示注入等新攻击面，既是安全盾也可能产生“预测性安全幻觉”。\n6. **跨本体中间表示**：TrAct 用“视觉轨迹”作为本体相关控制与本体无关预测之间的共享接口；OmniRetarget 一次示范可生成多本体数据。通用化的关键不是统一身体，而是统一中间表示。\n\n# 专家争论最激烈的方面（6 个）\n\n1. **VLA 已到天花板，还是仍是主力？** VLA 派：语义泛化积累深厚（综述被引 461），WholeBodyVLA 推至全身操控；WAM 派：VLA 是 reactive mapping，不建模干预后演化，应建模联合分布。\n2. **数据从哪来？** 遥操作最保真但昂贵；人类第一视角数据有 log-linear Scaling（EgoScale）；合成数据可自进化（DexFlywheel）；XRZero-G0 主张 10:1 混合。\n3. **Scaling 万能论 vs 数据效率论 vs 反 Scaling**：多样性派称任务多样性是关键（IEEE T-RO 2026）；效率派引 Curse of Precision；反 Scaling 派引钱学森 1993 年书信“机器人至多小型大系统，AI 进化主义派论点有局限”。\n4. **端到端一体 vs 分层专家混合**：Ψ0、WholeBodyVLA 押单体；Hex、VLM+RL 分层、接触隐式 MPC 押结构。\n5. **通用人形 vs 形态务实主义，以及 B 端 vs C 端**：通用派押“一套模型管全身”；务实派称轮式/机械臂更高效便宜；启元押 C 端个人机器人，多数头部押 B 端工业。\n6. **开源协作 vs 全栈自研 + 安全悖论**：开源派 Meta HumanCLAW、GR00T N1、Ψ0；自研派星动纪元 95% 自研、灵境智源全栈国产化；世界模型既是盾又可能产生预测性安全幻觉。\n\n# 十个“一眼验真懂”的问题（附答案与思考）\n\n1. **WAM 与 VLA 的数学本质区别？** VLA：P(动作|观测) 反应式映射；WAM：未来状态与动作的联合分布。\n2. **WAM 为何分 Cascaded 与 Joint？** 级联可解释但误差级联；联合紧凑但难分离监控。\n3. **“世界模型只能想象未来、不能决定动作”对应学术上什么问题？** 预测与决策两个监督目标被割裂。\n4. **Curse of Precision 揭示什么？** 误差阈值收紧 → 可接受样本幂律稀缺 → 数据需求陡增。\n5. **EgoScale 的 log-linear Scaling 为何重要？** 无动作标签的人类第一视角数据也能规模化提升真机操作。\n6. **XRZero-G0 的 10:1 混合说明什么？** 少量真机 + 大量 robot-free 数据可替代大部分昂贵真机采集。\n7. **世界模型安全的 duality 是什么？** 它既是安全盾，又是被投毒/欺骗后可操纵的“假未来”。\n8. **中美前沿的路线差异本质？** 中国下游场景拉动（硬件、国标、开源生态）；美国上游模型/算力推动（基础模型、平台、学术联盟）。\n9. **TrAct 为什么用“视觉轨迹”作共享接口？** 轨迹在图像空间可预测、与本体解耦，让一个世界模型服务多种本体。\n10. **启元押 C 端个人机器人、头部押 B 端工业，争议本质是什么？** 通用性、可靠性与付费意愿三者的先后次序之争。\n\n# 大学学习规划与建议\n\n## 为什么现在值得学\n- 2026 是量产元年、也是 VLA→WAM 的范式切换窗口；数据工程师、仿真工程师、具身模型训练与部署岗位缺口大；开源权重（GR00T、Ψ0、Meta HumanCLAW）把入门门槛降到“一台电脑+一个仿真环境”。\n\n## 本科阶段：打牢三根支柱\n- 数学：线性代数、概率统计、微积分、数值优化。\n- 编程：Python（PyTorch）、C++、Linux、Git、ROS 2。\n- 核心课：机器人学（运动学/动力学）、反馈控制、计算机视觉（3D 几何优先）、强化学习、深度学习。\n- 教材：Modern Robotics、Probabilistic Robotics、Sutton & Barto《强化学习》、Siciliano《Robotics: Modelling, Planning and Control》。\n- 公开课：MIT 6.4210 Robotic Manipulation、Stanford CS229/CS231A、Berkeley CS285、国家高等教育智慧教育平台《机器人技术导论》。\n\n## 实践与竞赛（大一到大三持续做）\n- 仿真起步：MuJoCo、Isaac Sim 或 Webots 复现抓取 demo，再上真机（校园机器人队/实验室）。\n- 竞赛：RoboCup、ICRA/IROS 机器人竞赛、VEX/FRC（低年级）、开源社区黑客松。\n- 作品集：用 GR00T/Ψ0 开源权重做一个小项目并写清“数据→训练→部署”链路。\n\n## 科研入门（大三—研究生）\n- 精读：WAM 综述（arXiv:2605.12090）、VLA 综述、ICRA/CoRL 最佳论文。\n- 复现：Ψ0、GR00T、Dexora 的数据管道；从“换数据看成功率变化”开始做消融。\n- 高价值方向：世界模型/WAM、数据 Scaling 与合成数据、3D 几何先验、跨本体迁移（TrAct/ZETA）、安全与评估（PACT/安全综述）。\n\n## 升学与就业\n- 中国：专硕偏工程落地（宇树、智元、银河通用、魔法原子、灵境智源等产业 + 高校联培）；学硕/直博偏学术（清华、上海 AI Lab、北大、上交、中科院）。\n- 美国：研究型 PhD（MIT、Berkeley、Stanford、CMU）与 NVIDIA、Meta、Amazon 工业实验室；开源权重让“非名校+强作品集”同样有竞争力。\n\n## 一句话路线\n先打牢“几何 + 控制 + 学习”三根支柱，再跟紧“WAM”与“数据 Scaling”两条主线，用开源模型做出自己的项目，最后按“要科研选学硕/直博、要落地选专硕/产业”做选择。\n",
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
        "label": "Ψ0: An Open Foundation Model Towards Universal Humanoid Loco-Manipulation (arXiv:2603.12263)",
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
        "label": "TrAct (arXiv:2608.24101)",
        "url": "https://arxiv.org/abs/2608.24101"
      },
      {
        "label": "ZETA (arXiv:2609.02546)",
        "url": "https://arxiv.org/abs/2609.02546"
      },
      {
        "label": "PACT (arXiv:2609.01662)",
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
        "label": "人民网英文版：Chinese robots shine at LEAP 2026",
        "url": "http://en.people.cn/n3/2026/0906/c90000-20496534.html"
      },
      {
        "label": "央广网：从“展台”到“赛场” 人形机器人加速商业化进程",
        "url": "http://finance.cnr.cn/zbpd/20260902/t20260902_527802411.shtml"
      },
      {
        "label": "科技日报：具身智能走向规模化落地",
        "url": "https://www.stdaily.com/web/gdxw/2026-08/26/content_570040.html"
      },
      {
        "label": "香港中通社：专家质疑人形机器人“预编程噱头”",
        "url": "http://hkcna.hk/docDetail.jsp?id=101251457&channel=2810"
      },
      {
        "label": "国家高等教育智慧教育平台《机器人技术导论》",
        "url": "https://higher.smartedu.cn/course/68018382b836e5522a7bebf3"
      }
    ]
  },
  {
    "date": "2026-09-06",
    "industry": "机器人",
    "title": "机器人领域每日动态 · 学术权威版（WAM 新范式特辑）",
    "summary": "2026 学术主线从 VLA 转向 WAM：DreamZero 宣称“WAM 即零样本策略”，Science Robotics 发表 SONIC 通用 token 空间；数据 Scaling 与跨本体迁移成为最热争论，中国以全栈国产化+开源生态推进，美国以基础模型+算力平台定义上游。",
    "content": "# 背景：中美科技前沿（分开论述）\n\n## 中国前沿\n- 官方标准：GB/T 47245—2026《机器人智能控制系统总体架构》等一批机器人智能控制国标于 9 月 1 日实施，产业进入标准化推进期。\n- 产业拐点：2026 上半年我国人形机器人出货量超 4 万台、占全球约 97%；WRC 2026（主题“人机共生，产需共融”）明确从“炫技”转向“干活”，物流、药房、产线成为竞争焦点。\n- 学术与国家队：国家自然科学基金委员会期刊刊发《具身智能的关键挑战与技术》综述；中国团队密集输出 Ψ0（开源通用人形基础模型）、MotionWAM、WholeBodyVLA、Hex、Ultra、From-w1、AnyBody 等全身操控工作；跨本体全身控制工作实现 7 台真实人形机器人零样本迁移。\n- 出海动态：宇树机器人亮相沙特 LEAP 2026；魔法原子 Magic-VLA K02 在欧洲 IFA 2026 推出工业落地方案。\n- 路线特征：全栈国产化 + 场景驱动 + 硬件铺量反哺数据 + 开源社区。\n\n## 美国前沿\n- Science Robotics（2026）发表 SONIC：用“通用 token 空间”大幅提升运动跟踪，并支撑 VLA 驱动全身 locomanipulation，是被引逾百次的代表性工作。\n- NVIDIA 平台链：GR00T N1 首个开源通用人形基础模型快速迭代 N1.5/N1.6/N1.7，配套 Isaac Sim / Isaac Teleop；Meta 全开源 HumanCLAW，基础模型进入具身决策层。\n- WAM 理论建构：DreamZero（14B）宣称“世界动作模型就是零样本策略”；GigaWorld-Policy 把通用视频生成模型转化为机器人策略初始化；另有 Oa-WAM、WAM4D、Dream-Tac、MotuBrain 等一批 WAM 变体。\n- 学术联盟：Amazon FAR 联合 MIT/Berkeley/Stanford/Cornell 的 OmniRetarget 获 ICRA 2026 双料最佳论文；TrAct、ZETA、PACT 显示“跨本体”与“安全准入”成为新热点。\n- 路线特征：上游基础模型 + 算力平台 + 产学研联盟，主导世界模型/WAM 理论建构与开源生态。\n\n# 核心思维模式（6 个）\n\n1. **联合分布思维**：VLA 学反应式映射 P(动作|观测)；WAM 建模“未来状态与动作”的联合分布，显式考虑干预后世界演化；DreamZero 进一步证明该联合模型可直接用作零样本策略。\n2. **“零样本即策略”思维**：把“预测未来”与“执行动作”合一，世界动作模型本身即策略，省去单独的动作头，降低泛化损失。\n3. **数据生态替代**：遥操作、人类示范、仿真、第一视角视频组成数据生态；EgoScale 证明人类数据 log-linear Scaling；XRZero-G0 发现 10:1 混合可媲美纯真机；GigaWorld-Policy 复用通用视频数据做策略预训练。\n4. **精准度诅咒**：高精度任务的数据需求遵循更陡的 Scaling 定律，倒逼数据效率革命与几何先验回归。\n5. **跨本体中间表示**：SONIC 的通用 token 空间、TrAct 的视觉轨迹、跨本体模板模型都在回答同一问题——通用化的关键不是统一身体，而是统一中间表示。\n6. **安全边界前置**：世界模型引入投毒、后门、传感器欺骗、提示注入等新攻击面，既是安全盾也可能产生“预测性安全幻觉”。\n\n# 专家争论最激烈的方面（6 个）\n\n1. **WAM 泛化是否真优于 VLA（新增实证）**：DreamZero 宣称 WAM 即零样本策略（被引 255），但系统性稳健性研究直接比较 WAM 与 VLA 在分布偏移下的泛化，指出收益取决于“动作生成方式”而非“世界模型骨干”；产业侧英伟达称“VLA 已死”，而 VLA 综述（被引 461）与 WholeBodyVLA 仍代表 VLA 主力路线。\n2. **数据从哪来**：遥操作最保真但昂贵；人类第一视角数据有 log-linear Scaling（EgoScale）；合成数据可自进化（DexFlywheel）；XRZero-G0 主张 10:1 混合；GigaWorld-Policy 主张复用互联网视频生成数据。\n3. **Scaling 万能论 vs 数据效率论 vs 反 Scaling**：多样性派称任务多样性是关键（IEEE T-RO 2026）；效率派引 Curse of Precision；反 Scaling 派引钱学森 1993 年书信“机器人至多小型大系统，AI 进化主义派论点有局限”。\n4. **端到端一体 vs 分层专家混合**：Ψ0、WholeBodyVLA 押单体；Hex、跨本体模板模型、接触隐式 MPC 押结构与专家分工。\n5. **通用人形 vs 形态务实主义，以及 B 端 vs C 端**：通用派押“一套模型管全身”；务实派称轮式/机械臂更高效便宜；启元押 C 端个人机器人，头部押 B 端工业——本质是通用性、可靠性与付费意愿的先后次序之争。\n6. **开源协作 vs 全栈自研 + 安全悖论**：开源派 GR00T N1、Ψ0、Meta HumanCLAW；自研派全栈国产化路线；世界模型既是盾又可能产生预测性安全幻觉。\n\n# 十个“一眼验真懂”的问题（附答案与思考）\n\n1. **WAM 与 VLA 的数学本质区别？** VLA：P(动作|观测) 反应式映射；WAM：未来状态与动作的联合分布。思考：能否说出“反应式映射 vs 联合分布/干预后演化”。\n2. **DreamZero 说“WAM are zero-shot policies”，依据是什么？“零样本策略”与“零样本泛化”有何区别？** 依据是 WAM 把动作预测并入未来预测的联合建模，无需额外动作头；区别在于前者指模型结构上直接输出策略，后者指在新任务上的表现。思考：理解“结构即策略”与“泛化能力”是两个层次。\n3. **稳健性研究比较 WAM 与 VLA 泛化时，为什么要区分“动作生成方式”与“世界模型骨干”？** 因为若不控制变量，无法判断泛化差异来自哪一部分，结论可能被架构混淆。思考：理解消融与归因是实证研究可信度的关键。\n4. **SONIC 的“通用 token 空间”解决什么问题？为什么能支撑 VLA 驱动全身 locomanipulation？** 它把不同本体、不同动作统一到同一 token 空间，让 VLA 与底层运动控制器在共享表示上对接，从而打通语言指令到全身动作。思考：理解“统一接口”如何降低全身控制的整合成本。\n5. **GigaWorld-Policy 为什么要把通用视频生成模型转化为策略初始化？** 通用视频数据量大且无动作标签，预训练后的视频模型自带对物理世界的先验，可作策略的强起点，从而复用互补数据源。思考：理解“跨模态预训练先验迁移”。\n6. **Oa-WAM 的“对象可寻址世界状态”相比像素级预测有何优势？** 以物体为单位的显式状态更结构化、更易定位与操控，能提升鲁棒性并降低对稠密像素预测的依赖。思考：理解“结构化表示优于像素回归”的归纳偏置。\n7. **Curse of Precision 揭示什么？** 误差阈值收紧导致可接受样本幂律稀缺，高精度任务的数据需求陡增。思考：理解“误差阈值→样本空间→数据需求”的因果链。\n8. **EgoScale 的 log-linear Scaling 与 XRZero-G0 的 10:1 混合分别说明什么？** 前者说明无动作标签的人类第一视角数据可规模化；后者说明少量真机 + 大量 robot-free 数据可替代大部分昂贵采集。二者共同指向“数据经济学优化”。\n9. **跨本体模板模型如何实现 7 台真机零样本迁移？** 把多台人形机器人的共享结构抽象成模板模型，策略在模板上训练，迁移时映射回各本体。思考：理解“共享结构抽取”是跨本体泛化的前提。\n10. **中美前沿的路线差异本质？** 中国以场景牵引 + 全栈国产化 + 硬件铺量 + 开源生态自下游推进；美国以基础模型 + 算力平台 + 产学研联盟自上而下定义范式。思考：用“下游拉动 vs 上游推动”概括。\n\n# 大学学习规划与建议\n\n## 为什么现在值得学\n- 2026 是量产元年、也是 VLA→WAM 的范式切换窗口；数据工程师、仿真工程师、具身模型训练与部署岗位缺口大；GR00T、Ψ0、HumanCLAW 等开源权重把入门门槛降到“一台电脑 + 仿真环境”。\n\n## 本科阶段：打牢三根支柱\n- 数学：线性代数、概率统计、微积分、数值优化。\n- 编程：Python（PyTorch）、C++、Linux、Git、ROS 2。\n- 核心课：机器人学（运动学/动力学）、反馈控制、计算机视觉（3D 几何优先）、强化学习、深度学习。\n- 教材：Modern Robotics、Probabilistic Robotics、Sutton & Barto《强化学习》、Siciliano《Robotics: Modelling, Planning and Control》。\n- 公开课：MIT 6.4210 Robotic Manipulation、Stanford CS229/CS231A、Berkeley CS285、国家高等教育智慧教育平台《机器人技术导论》。\n\n## 实践与竞赛\n- 仿真起步：MuJoCo、Isaac Sim 复现抓取 demo，再上真机（校园机器人队/实验室）。\n- 竞赛：RoboCup、ICRA/IROS 机器人竞赛、开源社区黑客松。\n- 作品集：用开源权重做“数据→训练→部署”完整链路并写清方法与消融。\n\n## 科研入门（大三—研究生）\n- 精读：WAM 综述、世界模型综述、SONIC（Science Robotics）、DreamZero、稳健性研究。\n- 复现：Ψ0、GR00T、Dexora 的数据管道；从“换数据看成功率变化”开始做消融。\n- 高价值方向：世界模型/WAM、数据 Scaling 与合成数据、3D 几何先验、跨本体迁移（通用 token 空间/视觉轨迹）、安全与评估。\n\n## 升学与就业\n- 中国：专硕偏工程落地（宇树、智元、银河通用等产业 + 高校联培）；学硕/直博偏学术（清华、上海 AI Lab、北大、上交、中科院）。\n- 美国：研究型 PhD（MIT、Berkeley、Stanford、CMU）与 NVIDIA、Meta、Amazon 工业实验室；开源权重让“非名校 + 强作品集”同样有竞争力。\n\n## 一句话路线\n先打牢“几何 + 控制 + 学习”三根支柱，再跟紧“WAM”与“数据 Scaling”两条主线，用开源模型做出自己的项目，最后按“要科研选学硕/直博、要落地选专硕/产业”做选择。\n",
    "sources": [
      {
        "label": "Ye S., et al. World Action Models Are Zero-Shot Policies (DreamZero). arXiv:2602.15922 (2026)",
        "url": "https://arxiv.org/abs/2602.15922"
      },
      {
        "label": "Zhang Z., et al. Do World Action Models Generalize Better than VLAs? A Robustness Study. arXiv:2603.22078 (2026)",
        "url": "https://arxiv.org/abs/2603.22078"
      },
      {
        "label": "Wang S., et al. World Action Models: The Next Frontier in Embodied AI. arXiv:2605.12090 (2026)",
        "url": "https://arxiv.org/abs/2605.12090"
      },
      {
        "label": "Ye A., et al. GigaWorld-Policy: An Efficient Action-Centered World-Action Model. arXiv:2603.17240 (2026)",
        "url": "https://arxiv.org/abs/2603.17240"
      },
      {
        "label": "Liu Y., et al. OA-WAM: Object-Addressable World Action Model. arXiv:2605.06481 (2026)",
        "url": "https://arxiv.org/abs/2605.06481"
      },
      {
        "label": "Li Y., et al. WAM4D: Fast 4D World Action Model via Spatial Register Tokens. arXiv:2606.14048 (2026)",
        "url": "https://arxiv.org/abs/2606.14048"
      },
      {
        "label": "Lou Y., et al. Dream-Tac: A Unified Tactile World Action Model. arXiv:2606.08737 (2026)",
        "url": "https://arxiv.org/abs/2606.08737"
      },
      {
        "label": "Xiang C., et al. MotuBrain: An Advanced World Action Model for Robot Control. arXiv:2604.27792 (2026)",
        "url": "https://arxiv.org/abs/2604.27792"
      },
      {
        "label": "Hou B., et al. World Model for Robot Learning: A Comprehensive Survey. arXiv:2605.00080 (2026)",
        "url": "https://arxiv.org/abs/2605.00080"
      },
      {
        "label": "Luo Z., et al. SONIC: Supersizing Motion Tracking for Natural Humanoid Whole-Body Control. Science Robotics (2026)",
        "url": "https://www.science.org/doi/abs/10.1126/scirobotics.aed4592"
      },
      {
        "label": "Xie W., et al. KungFuBot: Physics-Based Humanoid Whole-Body Control. NeurIPS 2025",
        "url": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/5a0e51901cff2b42d379ec7869603e91-Abstract-Conference.html"
      },
      {
        "label": "Wei S., et al. Ψ0: An Open Foundation Model Towards Universal Humanoid Loco-Manipulation. arXiv:2603.12263 (2026)",
        "url": "https://arxiv.org/abs/2603.12263"
      },
      {
        "label": "Zheng J., et al. MotionWAM. arXiv:2606.09215 (2026)",
        "url": "https://arxiv.org/abs/2606.09215"
      },
      {
        "label": "Zeng W., et al. Scaling Behavior Foundation Model for Humanoid Robots. arXiv:2607.15163 (2026)",
        "url": "https://arxiv.org/abs/2607.15163"
      },
      {
        "label": "Xue Y., et al. Scalable and General Whole-Body Control for Cross-Humanoid Locomotion. arXiv:2602.05791 (2026)",
        "url": "https://arxiv.org/abs/2602.05791"
      },
      {
        "label": "Liu F., et al. Security of World-Model-Based Embodied AI. arXiv:2607.28226 (2026)",
        "url": "https://arxiv.org/abs/2607.28226"
      },
      {
        "label": "Xu C., et al. The Curse of Precision. arXiv:2607.23108 (2026)",
        "url": "https://arxiv.org/abs/2607.23108"
      },
      {
        "label": "Zheng R., et al. EgoScale. arXiv:2602.16710 (2026)",
        "url": "https://arxiv.org/abs/2602.16710"
      },
      {
        "label": "Wang J., et al. XRZero-G0. arXiv:2604.13001 (2026)",
        "url": "https://arxiv.org/abs/2604.13001"
      },
      {
        "label": "Shi M., et al. Is Diversity All You Need for Scalable Robotic Manipulation? IEEE Transactions on Robotics (2026)",
        "url": "https://ieeexplore.ieee.org/abstract/document/11488937/"
      },
      {
        "label": "Li D., et al. What Foundation Models Can Bring for Robot Learning in Manipulation: A Survey. International Journal of Robotics Research (2026)",
        "url": "https://journals.sagepub.com/doi/abs/10.1177/02783649251390579"
      },
      {
        "label": "郝杰等. 具身智能的关键挑战与技术. 国家自然科学基金委员会期刊 (2026)",
        "url": "https://www.sciencep.com/"
      },
      {
        "label": "澎湃新闻：具身大佬，为这几个问题“吵翻”了 (2026-08-21)",
        "url": "https://m.thepaper.cn/newsDetail_forward_33824808"
      },
      {
        "label": "21世纪经济报道：具身智能的“ChatGPT时刻”何时到来？(2026-08-21)",
        "url": "https://m.21jingji.com/article/20260821/herald/05e1985fc27526ee95fe934f79d9fc3b.html"
      },
      {
        "label": "人民网英文版：Chinese robots shine at LEAP 2026 (2026-09-05)",
        "url": "http://en.people.cn/n3/2026/0906/c90000-20496534.html"
      },
      {
        "label": "央广网：从“展台”到“赛场” 人形机器人加速商业化进程 (2026-09-01)",
        "url": "http://finance.cnr.cn/zbpd/20260902/t20260902_527802411.shtml"
      },
      {
        "label": "科技日报：具身智能走向规模化落地 底层“智脑”站上产业风口 (2026-08-26)",
        "url": "https://www.stdaily.com/web/gdxw/2026-08/26/content_570040.html"
      },
      {
        "label": "国家高等教育智慧教育平台《机器人技术导论》",
        "url": "https://higher.smartedu.cn/course/68018382b836e5522a7bebf3"
      }
    ]
  }
,
  {
    "date": "2026-09-07",
    "industry": "机器人",
    "title": "机器人领域每日动态 · 中美前沿版（含学习规划）",
    "summary": "中博会“广东十骏”组团亮相、工信部人形机器人标准体系征求意见、宇树发布世界模型驱动全自主格斗；美国 Q2 机器人融资 186 亿美元创纪录、Lyte 完成 1.65 亿美元 C 轮、FCC 准入争论升温；跨机器人技能迁移与轮腿变形式成学术新热点。",
    "content": "# 背景：中美科技前沿（分开论述）\n\n## 中国前沿\n- 产业集结：第二十一届中国国际中小企业博览会（中博会）具身智能展上，“广东十骏”——逐际动力、自变量、智平方、乐聚、众擎、美的、小鹏、荣耀、优必选、越疆十家广东人形机器人整机企业首次组团亮相；逐际动力展出 27 自由度全尺寸交互机器人 LimX Luna。\n- 标准先行：工信部 8 月 24 日就《国家人形机器人产业标准体系建设指南（2026 版）》（征求意见稿）公开征求意见（反馈截止 9 月 23 日），拟规范人形机器人唯一标识、编码规则与识别机制。\n- 世界模型落地信号：宇树科技 9 月 7 日发布 UnifoLM-X2-1.0，宣称全球首次实现世界模型实时驱动的全自主人形机器人格斗，突破瞬时规划、决策与动态交互执行瓶颈。\n- 赛场与边界：8 月 22–26 日在北京国家速滑馆举行的 2026 世界人形机器人运动会（据报道近 2,000 台机器人、16 国参与）上，宇树机器人参加拔河、80 公斤级踢拳等对抗项目；赛后《解放军报》呼吁把实验室前沿技术加速转入军事训练场，人形机器人“从舞台走向战场”引发广泛讨论。\n- 路线特征：标准体系 + 区域集群 + 场景展示三位一体，硬件铺量与政策节奏并进。\n\n## 美国前沿\n- 资本集中：PitchBook 报告显示 2026 年第二季度机器人/物理 AI 融资达 186 亿美元、450 笔交易，金额创纪录（环比 +25.3%），但交易数环比下降 14.1%——钱正在涌向头部。\n- 感知上游加码：Lyte AI 完成 1.65 亿美元 C 轮，投后估值 16 亿美元，主打从定制芯片到软件栈的全栈机器人感知。\n- 上市窗口：LG 电子旗下 Bear Robotics 启动 Pre-IPO 融资、筹备纳斯达克上市；但 LG 方面通过韩媒回应“尚未作出上市决定”，融资与上市信息仍在推进中。\n- 安全准入：FCC 自 2026 年 7 月 28 日起把外国制造的先进机器人设备纳入 Covered List；MassRobotics 成员调查显示 43% 企业认为该限制“有益或非常有益”，行业内部立场分裂。\n- 学术窗口：IROS 2026 定于 9 月 27 日–10 月 1 日在匹兹堡举行；港中大（深圳）MaskVLA（视觉掩码对抗 VLA 轨迹过拟合）等一批论文被接收。\n- 路线特征：资本向头部集中 + 感知基础设施卡位 + 监管框架成型，从“能造”走向“可准入”。\n\n# 核心思维模式（6 个）\n\n1. **世界模型实时闭环**：宇树 UnifoLM-X2-1.0 把未来预测直接接入实时决策，模型在对抗中边预测边行动——世界模型从“离线规划器”变成“感知-预测-决策-执行”闭环的一部分。\n2. **标准化即基础设施**：工信部标准体系聚焦唯一标识、编码与识别，本质是把机器人变成可追溯、可互联、可监管的资产；标准解决的是“系统间接口”，而非单机性能。\n3. **感知即数据入口**：Lyte 押注从芯片到感知栈的垂直整合——感知质量决定数据质量，数据质量决定策略上限，上游感知是整个具身数据链的第一道闸门。\n4. **接触即力觉约束**：FWBC-VLA 用“力意图全身补偿”处理接触丰富的轮腿臂操作，说明接触任务需要的不只是位置轨迹，而是双向力/力矩约束。\n5. **交互非对称思维**：H2INT 在训练时保留机器人对行人运动的影响，并允许不同行人有不同响应度——机器人不是被动的避障者，而是人群流动的参与者。\n6. **运动学层抽象思维**：Science Robotics 的“演示一次、多方执行”把技能写在本体无关的运动学层，跨机器人迁移的关键是找到合适的抽象层级。\n\n# 专家争论最激烈的方面（6 个）\n\n1. **世界模型是真闭环还是演示？** 宇树用全自主格斗证明“世界模型实时驱动”可行性；学界稳健性研究则指出 WAM 的泛化收益取决于动作生成方式而非世界模型骨干，商业化演示与学术基准之间存在张力。\n2. **机器人军用化的边界在哪？** 《解放军报》呼吁加速“实验室转训练场”，国际舆论关注“从舞池到战场”；可靠性、可解释、可审计的自主决策与人类监督红线成为焦点。\n3. **FCC 准入是保护还是封闭？** 43% 的 MassRobotics 成员认为限制“有益”，但初创企业面临供应链与市场准入双重约束；安全主权与全球协作之争进入机器人领域。\n4. **标准先行会锁死早期路线吗？** 支持者认为标准化降低互联与监管成本，反对者担心过早定标会束缚快速迭代的架构与接口创新。\n5. **通用全尺寸 vs 形态务实主义再起**：广东十骏各押差异化路径，X2-N 用可变形轮腿换多场景能力；通用派押“一套身体打天下”，务实派押“按场景选身体”。\n6. **上市估值是否透支量产能力？** Bear Robotics 启动 Pre-IPO 与 LG“尚未决定”的温差，叠加 Q2 融资金额新高但交易数下滑，反映“资本热、落地冷”的普遍疑虑。\n\n# 十个“一眼验真懂”的问题（附答案与思考）\n\n1. **宇树 UnifoLM-X2-1.0 的“世界模型实时驱动”与遥控的本质区别？** 遥控是人在环外发指令、机器人执行；全自主格斗由模型实时预测未来并自主规划决策，人退出闭环。思考：自主性的刻度 = 人退出控制环的哪一层。\n2. **为什么“全自主格斗”比跳舞更能验证世界模型？** 对手动作不可预知、对抗强交互、高动态，模型必须持续预测对手意图与自身动力学并实时响应。思考：基准任务的信息不确定度越高，越能暴露模型短板。\n3. **工信部标准体系为什么先管“唯一标识、编码与识别”？** 它是全生命周期追溯、设备互联互通与安全监管的共同前提。思考：标准化先解决“同一套语言”，再谈“同一套能力”。\n4. **Lyte AI 把“感知”做成 16 亿美元估值赛道，逻辑是什么？** 感知决定数据质量，数据决定策略上限；从定制芯片到软件栈的垂直整合是对数据链上游的卡位。思考：上游基础设施往往比单一应用更值钱。\n5. **FWBC-VLA 的“力觉全身补偿”解决什么问题？** 接触任务中力/力矩偏差会同时破坏平衡与操作精度，仅靠视觉位置轨迹无法表达接触约束。思考：接触 = 双向力约束，不只是末端位置。\n6. **H2INT 为什么要保留“机器人对行人运动的影响”？** 真实人群中机器人进入会改变人流分布，若训练时忽略这一影响，策略与真实交互分布不匹配。思考：sim2real 的鸿沟也藏在“交互不对称”里。\n7. **X2-N 的轮腿/足腿双模式本质是什么权衡？** 轮式在平地上高效稳定，足腿能越障爬楼；可变形机构用复杂度换取多场景覆盖。思考：通用性往往以机构与控制的复杂度为代价。\n8. **“演示一次、多方执行”为什么强调“无需重新调参”？** 跨本体迁移最难的不是动作本身，而是逐台重调参数；把技能抽象到运动学层即可与具体硬件解耦。思考：抽象层级越高，迁移成本越低。\n9. **WAM 的泛化真比 VLA 好吗？稳健性研究如何回答？** 稳健性研究提示收益取决于动作生成方式而非世界模型骨干，不能只看名义架构。思考：实证结论必须经过消融与归因，避免“架构崇拜”。\n10. **Q2 融资金额创新高、交易数却下降，说明什么？** 资本向头部集中，长尾初创融资变难，行业进入马太效应阶段。思考：看产业要看“中位数”，不能只看“总额”。\n11. **FCC 把机器人设备纳入 Covered List 对初创意味着什么？** 供应链与市场准入双重收紧；43% 成员认为有利说明行业内部立场分裂。思考：安全与开放是长期动态平衡，不是一次裁决。\n12. **《解放军报》“实验室转训练场”的技术前提是什么？** 高可靠性、可解释、可审计的自主决策，以及人类可随时干预与安全停机。思考：军事化会加速可靠性研究，也把伦理红线推向台前。\n\n# 大学学习规划与建议\n\n## 为什么现在值得学\n- 2026 是量产元年，标准体系启动、资本集中、监管成型三条主线交汇；数据工程师、仿真工程师、具身模型训练与部署岗位缺口大。\n- IROS 2026 即将在匹兹堡举行，其录用论文（如 MaskVLA）是极佳的“当周阅读清单”，适合用来建立学术语感。\n\n## 本科阶段：打牢三根支柱\n- 数学：线性代数、概率统计、微积分、数值优化。\n- 编程：Python（PyTorch）、C++、Linux、Git、ROS 2。\n- 核心课：机器人学（运动学/动力学）、反馈控制、计算机视觉（3D 几何优先）、强化学习、深度学习。\n- 教材：Modern Robotics、Probabilistic Robotics、Sutton & Barto《强化学习》、Siciliano《Robotics: Modelling, Planning and Control》。\n\n## 实践与竞赛\n- 仿真起步：MuJoCo、Isaac Sim 复现抓取与 loco-manipulation demo，再上真机（校园机器人队/实验室）。\n- 竞赛：RoboCup、ICRA/IROS 机器人竞赛、开源社区黑客松。\n- 作品集：用开源权重做“数据→训练→部署”完整链路，并写清方法与消融；把 FWBC-VLA 的力觉数据管道作为接触任务入门复现对象。\n\n## 科研入门（大三—研究生）\n- 精读：世界模型/WAM 综述、SONIC（Science Robotics）、“演示一次、多方执行”（Science Robotics）、WAM vs VLA 稳健性研究。\n- 复现：从 IROS 2026 录用论文（如 MaskVLA）开始，做“换数据看成功率变化”的消融。\n- 高价值方向：世界模型实时闭环、接触丰富操作（力觉全身补偿）、跨本体技能迁移、稠密人群导航、安全准入与评估。\n\n## 升学与就业\n- 中国：专硕偏工程落地（宇树、智元、银河通用、优必选等产业 + 高校联培）；学硕/直博偏学术（清华、上海 AI Lab、北大、上交、港中大（深圳）、中科院）。\n- 美国：研究型 PhD（MIT、Berkeley、Stanford、CMU）与 NVIDIA、Meta、Amazon 工业实验室；开源权重让“非名校 + 强作品集”同样有竞争力。\n\n## 一句话路线\n先打牢“几何 + 控制 + 学习”三根支柱，再跟紧“世界模型实时闭环”与“数据 Scaling”两条主线，用开源模型做出自己的项目，最后按“要科研选学硕/直博、要落地选专硕/产业”做选择。",
    "sources": [
      {
        "label": "新华网：小企业干出大智能——第二十一届中国国际中小企业博览会见闻 (2026-09-07)",
        "url": "https://www.news.cn/fortune/20260907/720ca8b230a04b3f95cb68ec5335ac07/c.html"
      },
      {
        "label": "中国网：多款“硬核”人形机器人亮相第二十一届中博会具身智能展 (2026-09-05)",
        "url": "http://news.china.com.cn/2026-09/05/content_118681490.shtml"
      },
      {
        "label": "工业和信息化部：《国家人形机器人产业标准体系建设指南（2026版）》（征求意见稿）公示 (2026-08-24)",
        "url": "https://www.miit.gov.cn/gzcy/yjzj/art/2026/art_cb9cca921b2946c595d897b14bf520a6.html"
      },
      {
        "label": "澎湃新闻：宇树科技首次实现人形机器人全自主搏击 (2026-09-07)",
        "url": "https://www.thepaper.cn/newsDetail_forward_34025152"
      },
      {
        "label": "Reuters (via Internazionale)：From dance floor to war: China readies humanoid robots for combat (2026-09-07)",
        "url": "https://www.internazionale.it/ultime-notizie-reuters/2026/09/07/from-dance-floor-to-war-china-readies-humanoid-robots-for-combat"
      },
      {
        "label": "PitchBook：Q2 2026 Robotics & Physical AI Report: The Money Is in the Motion (2026)",
        "url": "https://pitchbook.com/news/reports/q2-2026-robotics-physical-ai-report-the-money-is-in-the-motion"
      },
      {
        "label": "The Robot Report：Lyte raises $165M to help robots better sense their surroundings (2026-09-03)",
        "url": "https://www.therobotreport.com/lyte-raises-165m-help-robots-better-sense-their-surroundings/"
      },
      {
        "label": "Seoul Economic Daily：LG Electronics Unit Bear Robotics Launches Pre-IPO Round (2026-09-07)",
        "url": "https://en.sedaily.com/news/2026/09/07/lg-electronics-unit-bear-robotics-launches-pre-ipo-round"
      },
      {
        "label": "Yonhap Infomax：LG Electronics - 'No Decision Made on Nasdaq Listing of US Subsidiary Bear Robotics' (2026-09-07)",
        "url": "https://en.infomaxai.com/news/articleView.html?idxno=138216"
      },
      {
        "label": "The Robot Report：MassRobotics shares member survey results around FCC restrictions (2026-09-06)",
        "url": "https://www.therobotreport.com/massrobotics-shares-member-survey-results-around-fcc-restrictions/"
      },
      {
        "label": "IROS 2026 官网（9 月 27 日–10 月 1 日 · 匹兹堡）",
        "url": "https://2026.ieee-iros.org/"
      },
      {
        "label": "香港中文大学（深圳）理工学院：李镇教授团队论文被 IROS 2026 接收（MaskVLA）",
        "url": "https://sse.cuhk.edu.cn/en/article/2334"
      },
      {
        "label": "FWBC-VLA: Force-Aware Whole-Body Compensation for Contact-Rich Loco-Manipulation. arXiv:2609.03889 (2026)",
        "url": "https://arxiv.org/abs/2609.03889"
      },
      {
        "label": "H2INT: Human-Human & Human-Robot Interaction Transformer for Robot Navigation in Dense and Uncertain Crowds. arXiv:2609.05300 (2026)",
        "url": "https://arxiv.org/abs/2609.05300"
      },
      {
        "label": "X2-N: A Transformable Wheel-legged Humanoid Robot with Dual-mode Locomotion and Manipulation. arXiv:2604.21541 (2026)",
        "url": "https://arxiv.org/abs/2604.21541"
      },
      {
        "label": "Do World Action Models Generalize Better than VLAs? A Robustness Study. arXiv:2603.22078 (2026)",
        "url": "https://arxiv.org/abs/2603.22078"
      },
      {
        "label": "Salunkhe D. H., et al. Demonstrate once, execute on many: Kinematic intelligence for cross-robot skill transfer. Science Robotics 11(113) (2026)",
        "url": "https://www.science.org/doi/10.1126/scirobotics.aea1995"
      }
    ]
  },
  {
  "date": "2026-10-07",
  "industry": "机器人",
  "title": "机器人顶刊论文精读库 · 总目录与 17 大方向地图",
  "summary": "按方向精选 Science Robotics / Nature / T-RO / IJRR 等顶刊代表作，每篇五部分：原版摘要 → 逐句翻译 → 讲解 → 方向时间线 → 第一性原理。首批已上线 3 篇，其余按批次补齐。",
  "content": "## 这个栏目是什么\n- 精选机器人各前沿方向的顶刊代表作，每篇按「五部分」精读：① 论文原本（原版摘要逐字 + 原文链接）② 逐句翻译 ③ 讲解 ④ 方向时间线 ⑤ 第一性原理。\n- 建议学习路径：先只看「论文原本」的标题与摘要，试着自己概括问题与方法；再对照翻译与讲解；最后独立完成「第一性原理」里的自测题。\n\n## 17 大方向地图\n| # | 方向 | 代表作（期刊/会议 · 年份） | 状态 |\n|---|---|---|---|\n| 01 | 足式运动 × 强化学习 | Hwangbo et al., Science Robotics 2019（ANYmal） | ✅ 已上线 |\n| 02 | 视觉-语言-动作基础模型 | Brohan et al., RT-2（arXiv 2023） | ✅ 已上线 |\n| 03 | 软体机器人 | Rus & Tolley, Nature 2015 | ✅ 已上线 |\n| 04 | 灵巧操作 | Andrychowicz et al., IJRR 2020（Dactyl 转魔方） | ⏳ 批次 2 |\n| 05 | 模仿学习 | Chi et al., Diffusion Policy, RSS 2023 最佳论文 | ⏳ 批次 2 |\n| 06 | 视觉触觉传感 | Yuan et al., GelSight, Sensors 2017 | ⏳ 批次 2 |\n| 07 | 微型/毫微机器人 | Hu et al., Nature 2018（多模态运动软体） | ⏳ 批次 3 |\n| 08 | 群体机器人 | Rubenstein et al., Science 2014（千机器人） | ⏳ 批次 3 |\n| 09 | SLAM 空间智能 | Mur-Artal & Tardós, ORB-SLAM2, IEEE T-RO 2017 | ⏳ 批次 3 |\n| 10 | 端到端自动驾驶 | Hu et al., UniAD, CVPR 2023 最佳论文 | ⏳ 批次 4 |\n| 11 | 空中机器人 | Kaufmann et al., Nature 2023（无人机竞速） | ⏳ 批次 4 |\n| 12 | 手术机器人 | Saeidi et al., Science Robotics 2022（STAR） | ⏳ 批次 4 |\n| 13 | 可穿戴机器人 | Collins et al., Nature 2015（无动力外骨骼） | ⏳ 批次 5 |\n| 14 | 最优运动规划 | Karaman & Frazzoli, IJRR 2011（RRT*） | ⏳ 批次 5 |\n| 15 | 大规模深度抓取 | Levine et al., IJRR 2018（hand-eye） | ⏳ 批次 5 |\n| 16 | 世界模型 | Hafner et al., Nature 2025（Dreamer V3） | ⏳ 批次 6 |\n| 17 | 水下仿生机器人 | Katzschmann et al., Science Robotics 2018（SOFI） | ⏳ 批次 6 |\n\n## 更新计划\n- 批次 1（今天 2026-10-07）：方向 01 / 02 / 03 已上线。\n- 批次 2–6（后续）：每批 3 篇，直到 17 方向全覆盖；之后随最新顶刊滚动补充新方向。\n- 与「机器人每日动态」分工：本库负责**吃透经典**，日报负责**追踪前沿**（如 VLA→WAM 范式切换）。\n\n## 五部分学习法（每篇通用）\n1. 论文原本：先读原版摘要，定位问题、方法与证据。\n2. 逐句翻译：中英对照，扫清语言障碍。\n3. 讲解：还原作者的决策链与实验证据。\n4. 时间线：把单篇论文放进该方向的演化史。\n5. 第一性原理：把论文拆到公理层，再自己重建一遍，用自测题检验。"
},
  {
  "date": "2026-10-07",
  "industry": "机器人",
  "title": "论文精读 01 · 足式运动×强化学习 | Learning Agile and Dynamic Motor Skills for Legged Robots",
  "summary": "ETH Zurich 把仿真里训练的策略直接部署到四足机器人 ANYmal：首次实现超越传统方法的敏捷奔跑与摔倒恢复，打通 sim-to-real 闭环。Science Robotics 2019。",
  "content": "## 论文信息\n- 标题：Learning Agile and Dynamic Motor Skills for Legged Robots（让足式机器人学会敏捷、动态的运动技能）\n- 作者：Jemin Hwangbo、Joonho Lee、Alexey Dosovitskiy、Dario Bellicoso、Vassilios Tsounis、Vladlen Koltun、Marco Hutter\n- 机构：ETH Zurich 机器人系统实验室（RSL）+ Intel 智能系统实验室\n- 期刊：Science Robotics, Vol. 4, Issue 26, eaau5872（2019-01-16）\n- DOI：10.1126/scirobotics.aau5872 ｜ arXiv：1901.08652\n\n## 第一部分 · 论文原本（原版摘要逐字）\nLegged robots pose one of the greatest challenges in robotics. Dynamic and agile maneuvers of animals cannot be imitated by existing methods that are crafted by humans. A compelling alternative is reinforcement learning, which requires minimal craftsmanship and promotes the natural evolution of a control policy. However, so far, reinforcement learning research for legged robots is mainly limited to simulation, and only few and comparably simple examples have been deployed on real systems. The primary reason is that training with real robots, particularly with dynamically balancing systems, is complicated and expensive. In the present work, we introduce a method for training a neural network policy in simulation and transferring it to a state-of-the-art legged system, thereby leveraging fast, automated, and cost-effective data generation schemes. The approach is applied to the ANYmal robot, a sophisticated medium-dog-sized quadrupedal system. Using policies trained in simulation, the quadrupedal machine achieves locomotion skills that go beyond what had been achieved with prior methods: ANYmal is capable of precisely and energy-efficiently following high-level body velocity commands, running faster than before, and recovering from falling even in complex configurations.\n\n原文链接：[arXiv 全文 PDF](https://arxiv.org/pdf/1901.08652) · [Science Robotics 页面](https://www.science.org/doi/10.1126/scirobotics.aau5872)\n（说明：以上为作者公开摘要之逐字引用；论文全文请通过上述开放获取链接阅读。）\n\n## 第二部分 · 逐句翻译\n1. 「足式机器人是机器人学中最难的挑战之一」——开篇定位问题。\n2. 「动物那些动态、敏捷的机动动作，现有由人类手工设计的方法模仿不了」——传统控制器靠手工调参，天花板明显。\n3. 「强化学习是更有吸引力的替代方案：几乎不需要手工雕琢，并让控制策略自然演化」——把「设计控制器」变成「优化控制器」。\n4. 「然而，此前的足式机器人强化学习研究大多停留在仿真，只有极少数相对简单的例子部署到了真实系统」——指出 gap。\n5. 「首要原因是：在真机上训练，尤其是对需要动态平衡的系统，既复杂又昂贵」——真机试错 = 摔机 + 耗时 + 不可扩展。\n6. 「本文提出：在仿真中训练神经网络策略，再迁移到最先进的足式系统上，从而利用快速、自动、低成本的数据生成方案」——核心贡献 = sim-to-real 闭环。\n7. 「该方法被应用于 ANYmal——一台精密的中型犬大小的四足系统」——验证平台。\n8. 「使用仿真训练的策略，四足机器获得了超越以往方法的运动能力：能精确且节能地跟随高层身体速度命令、跑得比以前更快、即使在复杂姿态下摔倒也能恢复」——三大可测结果。\n\n### 术语对照\n| 英文 | 中文/含义 |\n|---|---|\n| legged robots | 足式（腿式）机器人 |\n| agile / dynamic maneuvers | 敏捷 / 动态机动动作 |\n| reinforcement learning (RL) | 强化学习 |\n| control policy | 控制策略（观测→动作的映射） |\n| sim-to-real transfer | 仿真到实机的迁移 |\n| quadrupedal system | 四足系统 |\n| high-level body velocity commands | 高层身体速度命令（前进/横移/转向速度） |\n\n## 第三部分 · 讲解\n### 3.1 问题与背景\n控制四足机器人传统有两条路：①模型预测控制 MPC——每步解优化，依赖精确动力学模型，对接触与柔顺执行器的建模误差敏感；②手工设计步态 + 反馈调参——通用性差。作者换赛道：**把控制器交给强化学习在仿真里「进化」出来**，人类唯一的手工输入只剩「奖励函数」。\n\n### 3.2 方法四支柱（按论文顺序）\n1. 精确的刚体动力学仿真（含接触求解器）作为训练环境。\n2. 执行器网络 actuator net：在真机上采集数据，训练一个 3 层 × 32 单元、tanh 激活的 MLP，把「期望力矩/关节命令」映射为「实际输出」，建模 ANYmal 12 个串联弹性执行器（SEA）的复杂动态。仿真 + 执行器网络 = 混合仿真器。\n3. 在混合仿真器里用 TRPO（信赖域策略优化，默认超参）训练高斯策略（输出各关节命令）；策略输入包括机器人姿态、基座速度、最近 3 步的关节角与控制历史、人的操作命令。\n4. 奖励 + 课程：奖励鼓励「跟上速度命令 + 能耗最小（惩罚关节力矩平方）+ 动作平稳」，并逐步提高命令速度与地形难度。步态不人工指定，由优化自然涌现。\n\n### 3.3 结果\n- 精确、节能地跟随速度命令（前向/横移/转向）；\n- 跑动速度超过此前方法；\n- 复杂姿态摔倒后能翻身恢复；\n- 从仿真到真机几乎无需修改。\n\n### 3.4 为什么是里程碑\n它证明了「在仿真里学、在真机上用」对**需要动态平衡的高自由度系统**可行。此后四足/人形强化学习全部沿用这条范式（GPU 并行仿真 + 域随机化 + 真机零微调），并催生 2020 年代四足机器人的量产浪潮。\n\n### 3.5 关键术语\n- TRPO：给策略更新加 KL 散度约束，保证每步更新不让策略「突变」。\n- 串联弹性执行器 SEA：电机 + 弹性元件串联，抗冲击、力矩可控，但建模复杂——正是 actuator net 要学的对象。\n- 课程学习 curriculum：从简单任务逐渐加难，防止策略过早卡在局部解。\n\n## 第四部分 · 方向时间线（足式机器人）\n| 时间 | 里程碑 | 意义 |\n|---|---|---|\n| 1968 | GE Walking Truck（Mosher） | 第一台液压步行机，人驾驶 |\n| 1983 | Raibert 单足跳机器人（MIT Leg Lab） | 动态平衡三定律：落点/姿态/弹跳高度 |\n| 1986 | Raibert《Legged Robots that Balance》 | 足式动力学控制的理论奠基 |\n| 2005 | Boston Dynamics BigDog | 液压四足野外行走 |\n| 2016 | ANYmal（ETH Zurich） | 电驱动 + SEA 四足，面向工业巡检 |\n| 2019 | 本文（Science Robotics） | 仿真 RL → 真机：跑动 + 摔倒恢复 |\n| 2020 | Lee et al.（Science Robotics） | teacher-student + RMA 自适应陌生地形 |\n| 2022 | Miki et al.（Science Robotics） | 野外感知四足（山地行走） |\n| 2023 | Hoeller et al.（Science Robotics） | ANYmal Parkour 跑酷 |\n| 2024–2026 | 四足量产 + 人形 RL | 宇树等量产；人形全身 sim-to-real 成主流 |\n\n## 第五部分 · 第一性原理\n### 5.1 从最底层公理出发\n1. 刚体动力学：关节力矩决定加速度 M(q)q̈ + C(q,q̇)q̇ + G(q) = τ + JᵀF，但接触力 F 受「不穿透、不粘着」的互补性约束——方程组在落脚/离地瞬间不连续。\n2. 反馈原理：开环命令在扰动下发散；能稳定部署的控制器必然是一个闭环映射 π(s)→a。\n3. 优化原理：RL 把「找控制器」变成「在策略空间里做随机梯度上升」，策略梯度定理给出 ∇J = E[∇logπ(a|s)·R]；TRPO 用 KL 约束限制步长。\n4. 泛化原理：策略只在训练分布内可信；sim-to-real 的实质是让仿真分布逼近真实分布（精确模型 + 数据驱动的执行器模型 + 随机化），而不是发明更强的算法。\n5. 涌现原理：不编码步态模板时，步态 = 在「能耗惩罚 + 速度命令 + 存活约束」下的动力学最优解，trot 等步态自然涌现。\n\n### 5.2 推导链（一句话串起全文）\n机器人难控制 → 因为接触不连续 + 建模误差 → 反馈映射必须「优化」而非手写 → 真机优化太贵 → 在廉价仿真里优化 → 仿真与真实有 gap → 用真机数据学 actuator net 弥合 gap → 迁移后策略成立。\n\n### 5.3 本质一句话\n把「手工写控制器」替换为「在仿真里用梯度搜索闭环策略，再用数据驱动的执行器模型弥合仿真与现实的裂缝」。\n\n### 5.4 作者的思维模型\n1. 人类只设计两样东西：奖励函数与仿真器，其余交给优化器。\n2. 建模误差的补救靠数据（actuator net），不靠更复杂的方程。\n3. 虚拟世界试错近乎免费 → 先在仿真里无限次跌倒，再最小代价迁移。\n\n### 5.5 你需要补的知识\n- RL 基础：状态/动作/奖励/折扣、策略梯度定理、TRPO 与 PPO 的 KL 思想；\n- 机器人学：刚体动力学（牛顿-欧拉）、接触与摩擦模型、SEA 力矩控制；\n- 工程：域随机化（domain randomization）、sim-to-real 评测协议（真机成功率/能耗/速度）。\n\n### 5.6 自测题（盖住上面再答）\n1. 为什么不在真机上直接训练 RL？给出两个工程原因。\n2. 奖励里惩罚「关节力矩平方」会让什么行为涌现？\n3. actuator net 在学习什么？为什么它能缩小 sim-to-real gap？\n4. 若把策略输入里的「基座速度」去掉会怎样？为什么？\n5. 用一句话向投资人解释：TRPO 的 KL 约束在保护什么？",
  "sources": [
    {
      "label": "arXiv 全文 PDF（1901.08652）",
      "url": "https://arxiv.org/pdf/1901.08652"
    },
    {
      "label": "Science Robotics 页面（10.1126/scirobotics.aau5872）",
      "url": "https://www.science.org/doi/10.1126/scirobotics.aau5872"
    }
  ]
},
  {
  "date": "2026-10-07",
  "industry": "机器人",
  "title": "论文精读 02 · 视觉-语言-动作模型 | RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control",
  "summary": "Google DeepMind 把动作离散成文本 token 喂进视觉-语言大模型：一个模型同时学会看图、懂语言、做动作，并从互联网知识中获得语义推理与泛化。VLA 范式奠基作。",
  "content": "## 论文信息\n- 标题：RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control（RT-2：视觉-语言-动作模型把网络知识迁移到机器人控制）\n- 作者：Anthony Brohan 等 54 位作者（Robotics at Google, Google DeepMind）\n- 发表：arXiv:2307.15818（2023-07-28）\n- 链接：https://arxiv.org/abs/2307.15818\n\n## 第一部分 · 论文原本（原版摘要逐字）\nWe study how vision-language models trained on Internet-scale data can be incorporated directly into end-to-end robotic control to boost generalization and enable emergent semantic reasoning. Our goal is to enable a single end-to-end trained model to both learn to map robot observations to actions and enjoy the benefits of large-scale pretraining on language and vision-language data from the web. To this end, we propose to co-fine-tune state-of-the-art vision-language models on both robotic trajectory data and Internet-scale vision-language tasks, such as visual question answering. In contrast to other approaches, we propose a simple, general recipe to achieve this goal: in order to fit both natural language responses and robotic actions into the same format, we express the actions as text tokens and incorporate them directly into the training set of the model in the same way as natural language tokens. We refer to such category of models as vision-language-action models (VLA) and instantiate an example of such a model, which we call RT-2. Our extensive evaluation (6k evaluation trials) shows that our approach leads to performant robotic policies and enables RT-2 to obtain a range of emergent capabilities from Internet-scale training. This includes significantly improved generalization to novel objects, the ability to interpret commands not present in the robot training data (such as placing an object onto a particular number or icon), and the ability to perform rudimentary reasoning in response to user commands (such as picking up the smallest or largest object, or the one closest to another object). We further show that incorporating chain of thought reasoning allows RT-2 to perform multi-stage semantic reasoning, for example figuring out which object to pick up for use as an improvised hammer (a rock), or which type of drink is best suited for someone who is tired (an energy drink).\n\n原文链接：[arXiv 全文 PDF](https://arxiv.org/pdf/2307.15818)\n（说明：以上为作者公开摘要之逐字引用；论文全文请通过上述开放获取链接阅读。）\n\n## 第二部分 · 逐句翻译\n1. 「我们研究如何把在互联网规模数据上训练的视觉-语言模型，直接嵌入端到端机器人控制，以提升泛化并催生涌现式语义推理」——总问题。\n2. 「我们的目标：让单个端到端模型既学会『观测→动作』的映射，又享受网络语言与视觉-语言数据大规模预训练的红利」——把两类数据源合二为一。\n3. 「为此，我们在机器人轨迹数据和互联网规模的视觉-语言任务（如视觉问答）上共同微调最先进的视觉-语言模型」——方法 = co-fine-tuning。\n4. 「与其他方法不同，我们给出一个简单通用的配方：把动作表达为文本 token，像自然语言 token 一样直接放进模型的训练集」——核心一招。\n5. 「我们把这类模型称为视觉-语言-动作模型（VLA），其实例之一即 RT-2」——命名与定义范式。\n6. 「6000 次评估试验表明：该方法得到可用的机器人策略，并让 RT-2 从互联网规模训练中获得一系列涌现能力」——证据规模。\n7. 「包括对新物体泛化显著提升、能理解机器人训练数据里没有的命令（如把物体放到特定数字或图标上）、能执行初级推理（拿最小或最大的物体、离另一物体最近的）」——三种涌现。\n8. 「我们还表明，加入思维链推理让 RT-2 能进行多阶段语义推理：例如找出哪件物体可当临时锤子（一块石头）、哪种饮料最适合疲惫的人（能量饮料）」——CoT 加成。\n\n### 术语对照\n| 英文 | 中文/含义 |\n|---|---|\n| vision-language model (VLM) | 视觉-语言模型 |\n| end-to-end control | 端到端控制 |\n| co-fine-tune | 共同微调 |\n| trajectory data | 轨迹数据（观测-动作序列） |\n| action tokenization | 动作 token 化（离散化） |\n| emergent capability | 涌现能力 |\n| chain of thought (CoT) | 思维链推理 |\n\n## 第三部分 · 讲解\n### 3.1 背景\nRT-1（2022）证明 Transformer 能学动作，但机器人数据又贵又窄；而互联网 VLM 里存着海量语义知识（形状、数量、材料、用途）。问题：怎么让网络知识「流」进机器人动作？\n\n### 3.2 核心一招：动作文本化\n把 7 维连续动作（末端位置 Δ3、姿态 Δ3、夹爪开合 1）每维离散成 256 个 bins，变成模型词表里的「词」。于是「预测动作」=「预测文本」，机器人控制退化成大模型最擅长的序列建模。\n\n### 3.3 共同微调 co-fine-tuning\n在 PaLI-X（55B）/ PaLM-E（12B）上，把「网络视觉问答数据」与「机器人轨迹数据」混在一起微调，两者共享权重——防止只喂机器人数据把网络知识「冲掉」。\n\n### 3.4 涌现能力\n- 泛化新物体（训练里没见过）；\n- 读懂数字/图标命令（放到 3 号位置）；\n- 初级推理（拿最小的、离某物最近的）；\n- CoT 多步推理（石头当锤子、给疲惫的人拿能量饮料）。\n\n### 3.5 意义\n定义 VLA 范式，给出「动作 = 另一种语言」的配方；后续 Octo / OpenVLA / π0 / GR00T 都在此框架上演进。\n\n## 第四部分 · 方向时间线（具身基础模型）\n| 时间 | 里程碑 | 意义 |\n|---|---|---|\n| 2022.12 | RT-1（arXiv:2212.06817） | Transformer 学动作，真机规模化数据 |\n| 2023.03 | PaLM-E（arXiv:2303.03378） | 多模态具身大模型 |\n| 2023.07 | 本文 RT-2 | 动作 token 化，VLA 范式奠基 |\n| 2023.10 | Open X-Embodiment / RT-X（arXiv:2310.08864） | 跨机构数据联盟 |\n| 2024 | Octo / OpenVLA / π0 | 开源策略与流匹配行动头 |\n| 2025 | Gemini Robotics / GR00T N1 开源 | 人形基础模型产业化 |\n| 2026 | VLA→WAM 范式之争 | 联合分布建模接棒（见本网站 9 月机器人日报） |\n\n## 第五部分 · 第一性原理\n### 5.1 从最底层公理出发\n1. 语言是压缩的世界知识：互联网文本把人类对世界的语义关系编码进模型权重。\n2. 序列统一性：自回归「预测下一个 token」是所有序列任务的通用接口。\n3. 动作可离散化：连续空间 → 有限 bins → 词表词；于是控制 = 序列建模。\n4. 共享表示 → 迁移：视觉/语言/动作共用同一个分布，语言上学到的语义先验直接约束动作输出。\n5. 泛化 = 语义级插值：没见过的新物体能抓，因为网络知识提供了「概念级」先验，把泛化从像素级提升到语义级。\n\n### 5.2 推导链\n机器人泛化差 → 因为机器人数据窄 → 网络语言数据宽 → 语言里有语义先验 → 把动作变成语言 token → 两类数据共享一个模型 → 先验自然流入动作 → 泛化与推理涌现。\n\n### 5.3 本质一句话\n把「机器人控制」重新定义成「大语言模型续写动作 token」，从而把互联网规模的先验知识免费注入物理动作。\n\n### 5.4 作者的思维模型\n1. 表示统一主义：vision-language-action 用同一词表。\n2. 先世界知识、后动作：预训练在前，动作微调在后。\n3. 规模换泛化：数据多样性决定能力上限。\n\n### 5.5 你需要补的知识\n- Transformer 自回归机制与 tokenizer；\n- VLM 预训练（PaLI-X / PaLM-E）；\n- 共同微调与灾难性遗忘；\n- 模仿学习 / 行为克隆；\n- 评测协议：held-out 泛化任务设计。\n\n### 5.6 自测题（盖住上面再答）\n1. 为什么把动作做成 256 bins 的离散 token，而不是回归连续值？\n2. 「把动作 token 混进文本训练集」为什么能让网络知识迁移到动作？\n3. CoT 在 RT-2 里起什么作用？为什么多步推理会提升成功率？\n4. 机器人训练数据里只有「抓杯子」，模型为什么可能执行「放到 3 号位」？\n5. 从第一性原理看 VLA 的局限：数据分布、推理延迟、离散化分别带来什么代价？",
  "sources": [
    {
      "label": "arXiv 全文 PDF（2307.15818）",
      "url": "https://arxiv.org/pdf/2307.15818"
    }
  ]
},
  {
  "date": "2026-10-07",
  "industry": "机器人",
  "title": "论文精读 03 · 软体机器人 | Design, Fabrication and Control of Soft Robots",
  "summary": "MIT CSAIL 的 Daniela Rus 与 Michael Tolley 在 Nature 发表的领域定名综述：为什么机器人可以不要骨骼，如何用顺应材料设计、制造与控制软体机器人。",
  "content": "## 论文信息\n- 标题：Design, Fabrication and Control of Soft Robots（软体机器人的设计、制造与控制）\n- 作者：Daniela Rus、Michael T. Tolley（MIT CSAIL）\n- 期刊：Nature, Vol. 521, No. 7553, pp. 467–475（2015-05-28）\n- DOI：10.1038/nature14543\n- 开放获取作者稿：[MIT DSpace PDF](https://dspace.mit.edu/handle/1721.1/100772)\n\n## 第一部分 · 论文原本（原版摘要逐字）\nConventionally, engineers have employed rigid materials to fabricate precise, predictable robotic systems, which are easily modelled as rigid members connected at discrete joints. Natural systems, however, often match or exceed the performance of robotic systems with deformable bodies. Cephalopods, for example, achieve amazing feats of manipulation and locomotion without a skeleton; even vertebrates such as humans achieve dynamic gaits by storing elastic energy in their compliant bones and soft tissues. Inspired by nature, engineers have begun to explore the design and control of soft-bodied robots composed of compliant materials. This Review discusses recent developments in the emerging field of soft robotics.\n\n原文链接：[Nature 页面](https://www.nature.com/articles/nature14543) · [MIT 开放获取作者稿](https://dspace.mit.edu/handle/1721.1/100772)\n（说明：以上为作者公开摘要之逐字引用；全文请通过上述链接阅读。）\n\n## 第二部分 · 逐句翻译\n1. 「传统上，工程师用刚性材料制造精确、可预测的机器人系统，它们易于建模为『离散关节连接的刚体构件』」——旧范式的方便之处。\n2. 「然而，自然系统常常用可形变的躯体达到甚至超越机器人的性能」——生物的反例。\n3. 「例如头足类动物（章鱼等）没有骨骼也能完成惊人的操作与运动；即便是人类这样的脊椎动物，也靠顺应性的骨骼与软组织储存弹性能量来实现动态步态」——两个生物证据。\n4. 「受自然启发，工程师开始探索由顺应材料构成的软体机器人的设计与控制」——转向软体范式。\n5. 「本综述讨论软体机器人这一新兴领域的最新进展」——文章定位：领域蓝图。\n\n### 术语对照\n| 英文 | 中文/含义 |\n|---|---|\n| rigid members / discrete joints | 刚性构件 / 离散关节 |\n| deformable bodies | 可形变躯体 |\n| compliant materials | 顺应性材料 |\n| elastic energy | 弹性能量 |\n| soft-bodied robots | 软体机器人 |\n\n## 第三部分 · 讲解\n### 3.1 范式对比：硬 vs 软\n- 硬：自由度有限、可精确建模（关节角）、位置控制精确，但刚性碰撞危险、难以适应非结构化环境。\n- 软：连续弹性体，形变场无限维，天然安全（碰撞时靠材料吸收能量），能被动贴合被抓物，但位置精度与建模都难。\n\n### 3.2 三大支柱（综述主线）\n1. 设计/驱动：变长腱驱动（tendon）、气动人工肌肉（McKibben/PAM）、形状记忆合金（SMA）、电活性聚合物（EAP）等。\n2. 传感：可拉伸应变传感器、曲率传感器、嵌入柔性电子，把形变转成电信号。\n3. 制造：模具浇筑（silicone molding）、3D 打印、形状沉积制造（SDM）等。\n\n### 3.3 控制的挑战\n无限自由度 → 常曲率假设等降维建模；模型不确定性大 → 反馈控制 + 学习；还可以「把智能下放给本体」（欠驱动、被动顺应）。\n\n### 3.4 意义\n这篇 Review 给新兴领域定了名、划了地图：设计-制造-控制三轴框架沿用至今，是软体机器人方向引用量最高的文献之一。\n\n## 第四部分 · 方向时间线（软体机器人）\n| 时间 | 里程碑 | 意义 |\n|---|---|---|\n| 1950s–60s | McKibben 气动人工肌肉 | 最早的柔性驱动器 |\n| 1990s | 连续体「象鼻」机器人（Hirose 等） | 连续体运动学起步 |\n| 2010 | 颗粒堵塞通用抓手（Brown et al., PNAS） | 软抓手的经典机制 |\n| 2011 | 多步态软体机器人（Shepherd et al., PNAS） | 气动四足软体爬行 |\n| 2015 | 本文综述（Nature） | 领域定名与蓝图 |\n| 2016 | Octobot 全软自主机器人（Nature） | 无刚性部件的自主软体 |\n| 2018 | 水下软体机器鱼 SOFI（Science Robotics） | 软体仿生游动 |\n| 2020s | 软抓手商业化 / 软手术机器人 / 可拉伸电子皮肤 | 走向应用 |\n\n## 第五部分 · 第一性原理\n### 5.1 从最底层公理出发\n1. 材料的力-形变关系决定机器人的「力学个性」：刚性系统自由度有限、易建模；软体是连续弹性体，形变场无限维（偏微分方程描述）。\n2. 安全 = 顺应性：碰撞冲击力由材料刚度与形变决定（F ≈ kx），软体把「控制层」的力约束下沉到「材料层」。\n3. 智能的具身化 embodiment：本体结构承担部分计算——欠驱动 + 通过形变被动适应，减少传感与控制负担。\n4. 弹性储能：弹性元件把动能 ↔ 势能往复转换，模仿动物步态的能量回收。\n5. 连续体运动学：常曲率假设把无限维问题降到有限维（弧长 s、曲率 κ、弯曲方向 φ），控制对象从「每个关节」变成「每个分段」。\n\n### 5.2 推导链\n刚性机器人精确但危险、难适应 → 生物靠可形变躯体解决 → 用顺应材料造机器人 → 天然安全与被动适应 → 代价是无限自由度难建模 → 用常曲率降维 + 反馈/学习控制 → 并把部分智能下放给材料本身。\n\n### 5.3 本质一句话\n软体机器人把智能与安全从「软件控制」下放到「材料本体」，用形变换取顺应性与鲁棒性。\n\n### 5.4 作者的思维模型\n1. 本体即计算：让材料替你完成一部分控制。\n2. 与环境的力交换优先于位置精度。\n3. 生物启发：章鱼无骨骼，却能完成最难的灵巧操作。\n\n### 5.5 你需要补的知识\n- 弹性力学：胡克定律、大变形与超弹性材料（硅胶）；\n- 连续体机器人常曲率运动学（弧长/曲率/方向角参数化）；\n- 驱动原理：气动 PAM、腱驱动、SMA、EAP；\n- 软传感与柔性制造工艺。\n\n### 5.6 自测题（盖住上面再答）\n1. 为什么软体机器人「天然安全却难精确控制」？从自由度角度回答。\n2. 常曲率假设把无限维问题降成了什么？\n3. 颗粒堵塞（jamming）抓手为什么能抓起不规则物体？\n4. 举一个「硬比软好」的场景，并说明判断依据。\n5. 弹性储能如何解释动物跑步的经济性？",
  "sources": [
    {
      "label": "Nature 原文页面（10.1038/nature14543）",
      "url": "https://www.nature.com/articles/nature14543"
    },
    {
      "label": "MIT DSpace 开放获取作者稿",
      "url": "https://dspace.mit.edu/handle/1721.1/100772"
    }
  ]
}
];
