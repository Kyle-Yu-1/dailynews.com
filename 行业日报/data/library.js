/* 图书馆数据 · 学习 Agent
   每本书：id 唯一；localPdf 为站内 PDF 路径 */
window.LIBRARY_BOOKS = [
  {
    id: "nndl-v2",
    title: "神经网络与深度学习",
    edition: "第二版",
    author: "邱锡鹏",
    org: "复旦大学 · 计算机科学技术学院",
    category: "深度学习",
    accent: "#d4a574",
    glyph: "🧠",
    desc: "复旦大学邱锡鹏教授著，官方开源免费教材。从机器学习基础讲到前馈、卷积、循环网络，再到注意力机制、大语言模型与深度强化学习，体系完整，适合系统入门与进阶。",
    tags: ["开源教材", "神经网络", "深度学习", "大模型"],
    localPdf: "files/library/nndl-v2.pdf",
    size: "7.6 MB"
  },
  {
    id: "nndl-practice-v2",
    title: "神经网络与深度学习：案例与实践",
    edition: "第二版",
    author: "邱锡鹏",
    org: "复旦大学",
    category: "动手实践",
    accent: "#c38d94",
    glyph: "⚙️",
    desc: "配套实战教材：用 PyTorch 从零实现关键算法，再应用到实际任务，10 章 Notebook 与电子书全部开源，和主书搭配学习效果最好。",
    tags: ["PyTorch", "动手实践", "开源"],
    localPdf: "files/library/nndl-practice.pdf",
    size: "4.4 MB"
  }
];