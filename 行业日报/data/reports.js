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
  }
];
