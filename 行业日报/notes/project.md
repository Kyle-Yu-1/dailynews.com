## 📎 原始课件
- [Mini-project 项目要求（原文）](files/eie1005/project-requirements.txt)
- [Mini-project Preparation（原文）](files/eie1005/project-preparation.txt)

# EIE1005 Mini-Project 完全指南(占 20%)

> 来源:Group Project and Demonstration.pdf + Mini-project Preparation.docx
> 一句话:5–6 人组队,用 Teachable Machine 训练一个"识别物体"的 AI 模型,做成 5–7 分钟 PPT 演示视频,11/28 前提交。

## 任务要求

- 用 **Teachable Machine**(https://teachablemachine.withgoogle.com/)训练 AI 模型识别物体,主题要**能应用到你的专业**;
- 建 **3–5 个类别(class)**;
- 采集样本:自己拍照 或 从网上下载(参考 Data Preparation.mp4);
- 训练 → 测试 → 录 5–7 分钟演示视频(**必须用 Microsoft PowerPoint**)。

## 组队(9/30 截止)

Canvas → **People → Groups** → 点 **Join** 加入一个 5–6 人小组;9/30 后没组的会被随机塞进不足 5 人的组。

## 数据集(Canvas Week 2 模块下载)

- `MNIST Dataset.zip`:解压后 `MNIST – training`(0–9 十个文件夹,每类 100 张)与 `MNIST – testing`;
- `Additional data.zip`:文件夹 `1`、`7` 是数字 1、7 的**另一种手写风格**(用来测泛化)。

## Workshop 实操流程(照着做)

### Part I:Teachable Machine 入门
1. 打开 teachablemachine.withgoogle.com → **Get Started**;
2. 选 **Image Project** → **Standard image model**;
3. 界面要点:
   - **Class Name / Add a Class**:建 10 个类,命名为 Number 0 ~ Number 9(多余的可 More option → Delete Class);
   - **Add Image Samples**:Webcam 拍照 / 上传 / 拖拽;
   - **Training 高级设置**:Epochs(整轮数)、Batch size(一次迭代用的样本数;100 张图 batch=10 ⇒ 1 epoch=10 batches)、Learning rate(向损失最小点移动的步长)、Under the hood(训练细节);
   - **Preview**:训练后在这里测模型;
   - **Panel**:可"Download the project as file"(只存样本,不存模型)。

### Part II:手写数字识别训练
1. 每类先上传 **20 张** MNIST-training 样本(随机)→ Train Model;
2. 打开 **Under the hood → vocab**:可见 **Training samples 85% / Testing(validation)samples 15%**(15% 不参与训练,用来评估没见过的新数据);
3. 看 **Accuracy per epoch**(训练中分类正确比例,完美=1)与 **Loss per epoch**(学得越差 loss 越大,完美=0,学习过程中 loss 应下降)。

### 三张实验表(worksheet 要求记录,No submission)
- **样本量对比**:每类 20 张 vs 100 张(记录:首个达到最佳 train accuracy 的 epoch、最终 test accuracy、10/30/49 epoch 的 test loss)→ 换样本用 More Option → Remove All Samples 再传。
- **Epochs 对比**:10 vs 50(batch=16、lr=0.001 不变)。
- **Batch size 对比**:16 vs 64(epochs=50、lr=0.001 不变)。
- **预期规律**:样本多 → 泛化更好、test loss 更低;epoch 过多 → train 精度继续涨但 test 可能过拟合;batch 越大 → 每 epoch 迭代少、训练更稳但可能收敛慢。

### 测试与多样性
- 训练好(100 张/类,Epochs=50,Batch=16,lr=0.001)后,把 `MNIST – testing` 的图拖进 **Preview**,或 Webcam 手写数字测试;Preview 每个类的 Output = 该类概率,取最高者为预测。
- 多样性实验:把 Additional data(1、7)的图喂给已训练模型 → **性能会明显下降**(没见过的新风格);然后把 1、7 两类改为「75 张 MNIST + 25 张 Additional」重训 → 性能回升。结论:**训练样本多样性影响泛化能力**。

## 演示视频结构(评分点,PPT 必含)

1. **Front page**:清晰标题(体现应用方向)+ 组号 + 全员姓名学号 + **每人分工**;
2. **Introduction**:项目概述、目标与意义;
3. **Objective(s)**:任务如何应用到本专业 + 想改进什么;
4. **Implementation and results**:数据准备 → Teachable Machine 训练过程 → 截取结果展示模型准确率;
5. **Conclusions**:关键发现与贡献 + 成功与局限反思 + 未来改进方向。

> 高分要点:简洁、逻辑清晰、**流利清晰的英语**。

## 评分细则

- Presentation skills & Organization:**15%**
- Technical Content:**85%**
  - Problem statement & objectives **15%**
  - Collect samples(拍照/下载)**20%**
  - Teachable Machine 训练 **25%**
  - 测试已训模型 **25%**

## 提交(11/28 前)

- 每组**一次**提交,Canvas 提交链接稍后在 Week 2 模块放出;
- 提交演示视频的**网页链接**(OneDrive / YouTube 等),权限设为"**anyone with link can view**";
- **以最后一次提交为准**;逾期扣分。

## 行动清单

- [ ] 9/30 前:Canvas 组队(5–6 人)并分工
- [ ] 下载 MNIST Dataset.zip 与 Additional data.zip
- [ ] 用 Teachable Machine 完成 20 vs 100 样本实验表
- [ ] 完成 epochs、batch size 调参实验表
- [ ] 选一个"结合本专业"的识别主题(不必非手写数字,可另采样本做 3–5 类)
- [ ] 录 5–7 分钟 PPT 演示(英文)
- [ ] 11/28 前:上传视频链接(anyone with link)