## 📎 原始课件
- 对应 Lecture set 与仿真见 [Canvas → Modules](https://canvas.polyu.edu.hk/courses/4764/modules)。

# AP10005 第 1 课 · 力学（课堂笔记合并版）

> 合并自 OneNote《AP10005 Physics I 笔记整理》，按「因果法」框架组织。

## 一、总框架：Cause and Effect 因果法
用「原因 → 结果」串联全部知识点：
- **Kinematics 运动学**：只描述运动本身（位移、速度、加速度），不追问成因
- **Dynamics 动力学**：解释运动成因（外力、质量如何驱动运动）

## 二、质点与质心
- **Point mass model 质点模型**：把物体抽象为集中全部质量的单点，忽略形状与形变
- **Center of mass 质心**：系统运动效果等价于「总质量 M 集中在质心、仅受合外力」的单个质点，与内部旋转/振动/形变无关
- **质心坐标**：X_CM = Σ(mᵢ·xᵢ)/M，同理 Y_CM、Z_CM

## 三、标量、矢量与单位
- **Scalar 标量**：只有数值+单位；**Vector 矢量**：数值+单位+方向，三者任一改变即变
- **Displacement 位移**（矢量，只与起终点有关）vs **Distance 路程**（标量，实际轨迹长度）
- **Velocity 速度**（矢量，位移/时间）vs **Speed 速率**（标量，路程/时间）
- **Acceleration 加速度**：速度随时间的变化率，单位 m/s²
- **SI 七基本单位**：米 m、千克 kg、秒 s、开尔文 K、安培 A、坎德拉 cd、摩尔 mol
- **量级前缀**：kilo 10³、milli 10⁻³、nano 10⁻⁹…（质量例外：用 gram 搭配前缀，不加在 kilo 上）

## 四、运动图像与微积分
- s-t 图：斜率 = 瞬时速度 v=Δs/Δt
- v-t 图：斜率 = 瞬时加速度 a=Δv/Δt；面积 = 总位移
- a-t 图：面积 = 总速度变化量
- **Derivative 导数**：位移对时间求导=速度，速度求导=加速度；**Integral 积分**：加速度积分=速度变化，速度积分=位移

## 五、一维匀变速与自由落体
四组核心方程（竖直方向把 x 换成 y 即可）：
1. vxf = vxi + axt
2. xf = xi + (vxi+vxf)/2 · t
3. xf = xi + vxi·t + ½axt²
4. vxf² = vxi² + 2ax(xf−xi)
- **Free fall 自由落体**：仅受重力，加速度恒为 g ≈ 9.80 m/s²（随海拔升高减小、随纬度升高略增）

## 六、矢量运算
- 负矢量：大小相同方向相反；A−B = A + (−B)
- **分解**：Ax=Acosθ、Ay=Asinθ；**合成**：R=√(Rx²+Ry²)、θ=arctan(Ry/Rx)
- 单位矢量：大小=1 的参考方向标记（i、j）

## 七、二维运动与抛体
- 分析流程：初速度分解 → x、y 两方向各自按一维独立计算 → 由总时间 t 关联
- 水平方向：不受力，匀速；竖直方向：仅受重力，加速度 −g，匀变速
- **Maximum height 最大高度**：该点竖直速度=0
- **对称抛体**：同高度抛出与落地，轨迹关于最高点对称
- **Range 射程**：R = v0²·sin2θ/g；互补抛射角射程相同

## 自测
1. 速度与速率、位移与路程的区别？2. v-t 图面积代表什么？3. 抛体最高点速度为零吗？4. 互补角为什么射程相同？

## 资源
- PhET 官方仿真：https://phet.colorado.edu/
- HyperPhysics：http://hyperphysics.phy-astr.gsu.edu/
- MIT OCW 8.01：https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/
