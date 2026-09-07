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
];
