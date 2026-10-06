## 📎 原始课件
- [2627_TM1326_SE.pptx（14 页，逐页原文）](files/me29004/tm1326-surface-finishing-原文.txt)
- [SE 选择题练习.docx（Canvas）](https://canvas.polyu.edu.hk/courses/3503/files/132870)

# ME29004 第 5 课 · 表面处理（Surface Finishing）

## 工作坊内容
- 关键工艺：**砂纸打磨 sanding、蒸气抛光 vapour polishing、喷涂 spray coating**。
- 实用测试：**摩擦测试 friction test 与粗糙度测试 roughness test** 评估表面质量。
- 目标：改善外观与功能（抓取纹理、减摩、防腐蚀）。

## 要点
1. **打磨**：目数越大越细；由粗到细逐级递进（如 120→240→400→800→1200），不跳级；方向一致。
2. **蒸气抛光**：溶剂蒸气使表层塑料微熔流平，适合 ABS 等，需通风。
3. **喷涂**：清洁 → 底漆 → 薄喷多层；附着力取决于表面清洁与底漆。
4. **测试**：粗糙度 Ra 越小越光滑；摩擦系数 μ 影响抓取与滑动。
5. 本项目应用：瓶盖夹爪接触面做纹理防滑，运动面减摩。

## 自测
1. 目数与粗糙度的关系？2. 打磨为何不能跳目数？3. 蒸气抛光适用什么材料、注意什么？

---

## 完整课件要点（2627_TM1326_SE · 14 页 · 2026/27）

### 一、四种工艺一句话
| 工艺 | 一句话 | 关键参数/材料 |
|---|---|---|
| **Sanding 砂纸打磨** | 去层纹、平滑、打底 | 120–220 粗 → 400 中 → 800–1000 细 → 湿磨 |
| **Sand blasting 喷砂** | 除锈除污、增粗糙度提附着力、做哑光 | 磨料：Aluminum oxide / Glass beads / Steel grit |
| **Vapour polishing 蒸气抛光** | 溶剂蒸气溶解表层平滑打印件 | ABS/ASA/PLA/nylon/TPU/PC |
| **Spray coating 喷涂** | 外观 + 耐久 + 调摩擦 | 三层：primer + paint + clear coat |

### 二、Sanding 细节（P5）
- 缺点四连：Time-Consuming（耗时）/ Manual Effort（费力易疲劳）/ Risk of Over-Sanding（变形磨平细节）/ Limited for Intricate Parts（难进细小缝隙）。
- 口诀：**粗→中→细→湿磨**，不跳目数。

### 三、Vapour polishing 细节（P7–P8）
- 五目的：溶平阶梯结构 / 减层纹 / 高光外观 / 降低活动件摩擦 / 为后续工艺准备。
- 三步骤：溶剂蒸气腔暴露 → 蒸气软化平滑 → 晾干硬化。
- **过度抛光四害**：Deformation（变形）· Loss of Detail（丢细节）· Cracking（变脆开裂）· Sticky Surface（发粘吸尘）。

### 四、Friction test 与 Roughness test（P10–P11）
- **摩擦定义**（背英文）：Friction is a force that opposes motion between two surfaces in contact。
- **四因素**：Surface roughness / Material type / Weight(force) / Lubrication。
- 摩擦日常五例：行走防滑、刹车、抓握、擦火柴、驾车抓地。
- **Roughness test**：粗糙度仪（profilometer）探针扫表面记录峰谷；影响摩擦磨损、外观手感、零件配合。

### 五、安全（P3，本课评估含 MC 或安全题）
- 未授权不开机、不离开运转中的机器、车间内不玩/跑/吃喝。
- 长发扎起；禁宽松衣物与项链/围巾/手镯/手套；戴 PPE。
- 化学品容器用后盖紧；**溅入眼/皮肤：清水冲 15 分钟**。

### 六、本项目实践（P12）
- 3D 打印件三件套：**Sanding → Vapour polishing → Painting**。
- 学习安排：30min 讲解 + 45min 演示 + 15min 休息 + 60min 练习 + 30min MC 评估。

> 🔴 考点：四种工艺用途与关键参数（grit 序列、磨料、适用材料）、过度抛光四害、摩擦定义与四因素、安全冲洗 15 分钟。


## 🧠 拓展（外部权威资料，检索于 2026-10-06）

### 1. 砂纸目数 ↔ 表面粗糙度 Ra
> 🧠 拓展（外部资料，检索于 2026-10-06）：目数越大 Ra 越小，但细磨到一定目数后 Ra 趋于稳定。实验数据（Nature Sci. Rep. 2019，打磨基板）：1500 Grit → Ra ≈ 1.02 μm；600 Grit → Ra ≈ 1.03 μm；220 Grit 与 120 Grit 则更粗糙——即 600 目以上再细磨收益递减。
> 🌐 来源：https://www.nature.com/articles/s41598-019-51490-5 · 换算：1 microinch = 0.025 μm（finishing.com）。

### 2. 蒸气抛光的溶剂-材料-温度对照
> 🧠 拓展（外部资料，检索于 2026-10-06）：蒸气抛光机理=溶剂蒸气溶解 ABS/PLA 表层聚合物，表面链段流动流平后溶剂蒸发，留下更光滑表面。典型参数：**ABS 用丙酮（acetone），抛光温度约 56°C；PLA 用四氢呋喃（THF），约 66°C**（温度取溶剂沸点附近）。
> 🌐 来源：Tribology in Industry 2022（tribology.rs/journals/2022/2022-4/2022-4-01.html）· Springer Progress in Additive Manufacturing 2022（s40964-022-00391-7）。
> 📖 译注：课件说"不同材料用不同溶剂"，此处给出具体对应；实验室采用超声雾化（ultrasonic mist maker）的低成本蒸气腔方案。

### 3. 喷涂的三层结构与厚度
> 🧠 拓展（外部资料，检索于 2026-10-06）：汽车/工业喷涂标准流程 = **primer（底漆）→ base coat（色漆）→ clear coat（清漆）**，每层喷涂后经 flash-off（闪干区）再进烘箱；clear coat 干膜厚约 1.0–3.0 mil（≈ **25–75 μm**）。
> 🌐 来源：欧盟 JRC《表面处理最佳可行技术参考（STS BREF）》2020（eippcb.jrc.ec.europa.eu）· US 专利 US20070110902A1。

### 4. 常用材料摩擦系数（数量级参考）
> 🧠 拓展（外部资料，检索于 2026-10-06）：静/动摩擦系数典型值——**钢-钢 0.74 / 0.57；铝-钢 0.61 / 0.47；橡胶-混凝土 ≈ 0.8；木-木 0.25–0.5；铸铁-铸铁 0.10–0.15（干）**。课件四因素（粗糙度/材料/正压力/润滑）与手册一致：润滑可使 μ 降到 0.1 以下。
> 🌐 来源：EPA 工程摩擦系数表（epa.gov）·《Elements of Machine Design》（HathiTrust）· ScienceDirect Static Coefficient 综述。

### 5. 进阶工艺（了解即可）
> 🧠 拓展（外部资料，检索于 2026-10-06）：除蒸气抛光外，聚合物打印件还可用**激光抛光**：FDM 件以 7 J/cm² 能量密度处理后 Ra 降约 95%（最终 ≈1.9 μm）；功率过高会因聚合物熔点低而过熔。
> 🌐 来源：Nazarbayev University 综述（nur.nu.edu.kz）· Perez Deway & Ulutan 研究。

> ⚠️ 以课件为准：考试按课件口径；以上拓展仅作理解与报告写作素材。
