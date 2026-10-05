## 📎 原始课件
- [TM1326 Lesson 1_270826.pdf（46 页）](files/me29004/tm1326-lesson1-electronics-原文.txt) · Canvas courses/3503 files/177171

# ME29004 第 3 课 · 电子原型（Electronic Prototyping）

## 工作坊内容（来自主课件）
- 电路基础与电机类型；**模拟/数字方式控制 DC 电机**：PWM 调速、H 桥换向。
- **Arduino 控制伺服（servo）与步进（stepper）电机**：接线、信号、编程。
- 组装并操作 **XY 工作台**：电机库 + 坐标控制。

## 要点
1. **PWM**：占空比调平均电压 → 调速/调亮度。
2. **H 桥**：四个开关组合实现正转/反转/制动；集成芯片如 L298N/TB6612。
3. **伺服电机**：PWM 脉宽对应角度（通常 50Hz 下 0.5–2.5ms），自带反馈，适合定位。
4. **步进电机**：脉冲数=角度，配合驱动板（A4988/TMC），适合开环定位。
5. **XY 工作台**：两轴运动 + 限位开关 + 坐标编程 → 本项目「抬升-移动-放下」的控制基础。

## 安全
断电改线；确认电源与板卡电压；电机电流超过驱动能力要另供电源；焊台规范。

## 自测
1. PWM 调速原理？2. H 桥为何能换向？3. 伺服与步进各自适合什么场景？

---

## 完整课件要点（TM1326 Lesson 1 · 46 页 · 2026-08-27）

### 一、电路基础（P7–P10）
- **电路三要素**：Component（元件）+ Connection（连接）+ Breadboard/PCB（面包板/印刷板）。
- **三种连接状态**：Open Circuit（开路，不通）/ Closed Circuit（闭路，导通）/ Short Circuit（短路，危险）。
- **信号两类**：Digital（1=High、0=Low、Pulse、Bus）vs Analog（Voltage 0–5V、Current 0–20mA）。

### 二、电机类型（P11，英文定义可背）
- **Motor**：converts electrical energy into mechanical energy，via electromagnetic induction。
- **DC Motor**：直流电→机械能；玩具、电动车、家电。
- **Servo Motor**：高精度可控；机器人、CNC。
- **Stepper Motor**：离散步进、精确定位；打印机、扫描仪、CNC。

### 三、DC 电机·模拟控制（P12–P18）
- **A1 变速换向**：2×3.7V 锂电池 + 调压模块 + 风扇；可变电阻调 0–5V 调速；**交换输出端子**换向。
- **A2 双掷开关换向**：切换开关极改变转向。
- **A3 转速表测速**：扇叶贴反光纸 + 数字转速表；电压 0→5V 每 0.5V 记录转速，**Excel 画电压-转速图**。
- **安全**：改线先断电、工作台整洁、桌面禁饮食。

### 四、Arduino 数字控制（P19–P25）
- 准备：Arduino Uno、USB 线、杜邦线（公母/母母/公公）、IDE（arduino.cc）。MacBook Type-C 需转接头。
- **L298 真值表（重点）**：IA1/IA2 输入 L L→**Stop**；H L→**CW**；L H→**CCW**；H H→**Break**。
- **PWM（Pulse Width Modulation）**：占空比调平均电压 → 调速；Arduino 用 `analogWrite`。

### 五、伺服电机（P26–P32）
- 三线颜色：**Signal 橙 / VDD 红 / Ground 棕**。
- 角度 ∝ 脉宽：**1ms→0°，2ms→180°**。
- Sensor Shield 扩展板：多路电源/地脚。单伺服接 D9，双伺服接 D9+D10。
- 例程：File → Examples → Servo → **Sweep**。

### 六、步进电机（P33–P42）
- **NEMA-17 双极混合步进**：1.7×1.7in 安装面；步距角 **1.8°/0.9°**；**200/400 步/转**。
- **A4988 驱动板**：只需 Step + Direction 两引脚。接线：STEP D7、DIR D6、EN D2/D3。
- 电源：220V AC → **12V DC** 给驱动板。
- 库：Tools → Manage Libraries → 搜 **AccelStepper** → INSTALL；`Single_Stepper.ino`。

> 🔴 考点：电机三种类型与用途、三种电路状态、L298 真值表、Servo 三线颜色与 1ms/2ms、NEMA-17 步距角与每转步数。
> 🧠 拓展（外部资料，检索于 2026-10-05）：PWM 占空比 50% 时平均电压 = 0.5×Vcc；H 桥由四个开关（或 L298 双 H 桥）组成，禁止同一侧上下管同时导通（直通短路）。
