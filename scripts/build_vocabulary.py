# -*- coding: utf-8 -*-
"""把各课程 notes/*-vocabulary.md 词汇表解析为网站单词库 data/vocabulary.js。

用法：python scripts/build_vocabulary.py
规则：词汇表格式 `- English (ABBR) — 中文`，`## 分类` 作为语境分组。
"""
import re
import os
import json

BASE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "行业日报")
NOTES = os.path.join(BASE, "notes")
OUT = os.path.join(BASE, "data", "vocabulary.js")
SENTENCES = os.path.join(BASE, "data", "sentences.json")
sent_map = {}
if os.path.exists(SENTENCES):
    with open(SENTENCES, encoding="utf-8") as f:
        sent_map = json.load(f)

FILES = [
    ("eie1005-vocabulary.md", "EIE1005", "eie"),
    ("me29004-vocabulary.md", "ME29004/IC2117", "me"),
    ("ama1110-vocabulary.md", "AMA1110", "ama"),
    ("ap10005-vocabulary.md", "AP10005", "ap"),
    ("lei1101-vocabulary.md", "LEI1101", "lei"),
    ("itsec-vocabulary.md", "IT 安全", "it"),
]

entries = []
stats = {}
for fname, course, prefix in FILES:
    path = os.path.join(NOTES, fname)
    context = "未分类"
    count = 0
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.rstrip("\n").rstrip("\r")
            m = re.match(r"^\s*##\s+(.+?)\s*$", line)
            if m:
                context = m.group(1).strip()
                continue
            m = re.match(r"^\s*[-*]\s+(.+?)\s+—\s+(.+?)\s*$", line)
            if not m:
                continue
            word, meaning = m.group(1).strip(), m.group(2).strip()
            abbr = ""
            ab = re.search(r"\(([A-Z][A-Za-z0-9./\- ]{0,24})\)\s*$", word)
            if ab:
                abbr = ab.group(1).strip()
                word = word[:ab.start()].strip()
            count += 1
            entries.append({
                "id": "%s-%03d" % (prefix, count),
                "word": word,
                "abbr": abbr,
                "meaning": meaning,
                "phonetic": "",
                "course": course,
                "context": context,
                "sentence": sent_map.get(course + "::" + word, ""),
            })
    stats[course] = count

lines = []
lines.append("/* 学习 Agent 单词库 · 由 scripts/build_vocabulary.py 从 notes/*-vocabulary.md 自动生成")
lines.append("   请勿直接手改本文件：要增删词条请改对应课程的 vocabulary.md，再重跑本脚本 */")
lines.append("window.VOCABULARY = " + json.dumps(entries, ensure_ascii=False, indent=2) + ";")
with open(OUT, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

print("生成完成 ->", OUT)
print("总词条：%d" % len(entries))
for k, v in stats.items():
    print("  %s: %d" % (k, v))