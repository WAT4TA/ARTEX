#!/usr/bin/env python3
"""Regenerate src/i18n/zh-tw.generated.json (Traditional Chinese, Taiwan).

Converts every zh-CN UI string with OpenCC (s2twp: Simplified -> Traditional
with Taiwan phrasing), then applies the term overrides below. Run from web/:

    pip install opencc-python-reimplemented
    node scripts/generate-zh-tw.cjs | python3 scripts/generate-zh-tw.py

Hand edits to the generated file are lost on the next run; add an override here.
"""
import json
import pathlib
import sys

from opencc import OpenCC

# Taiwan usage that s2twp leaves in mainland form. Order matters: longer first.
OVERRIDES = [
    ("賬", "帳"),
    ("界面", "介面"),
    ("菜單", "選單"),
    ("響應", "回應"),
    ("字段", "欄位"),
    ("調用", "呼叫"),
    ("鏈接", "連結"),
    ("鏈路", "路徑"),
    ("端口", "連接埠"),
    ("線程", "執行緒"),
    ("激活", "啟用"),
    ("回滾", "復原"),
    ("令牌", "權杖"),
    ("視圖", "檢視"),
    ("審批", "審核"),
    ("渠道", "管道"),
    ("推送", "推播"),
    ("質量", "品質"),
    ("控制檯", "控制台"),
    ("後臺", "後台"),
    ("重置", "重設"),
    ("獲取", "取得"),
    ("併發", "並行"),
    ("模板", "範本"),
    ("實時", "即時"),
    ("計劃任務", "排程任務"),
    ("歸檔", "封存"),
    ("域名", "網域"),
    ("配置", "設定"),
    ("型別", "類型"),
    ("自定義", "自訂"),
    ("地址", "位址"),
    ("免責宣告", "免責聲明"),
    ("生成", "產生"),
    ("隻", "只"),
    ("支持", "支援"),
]


def main() -> None:
    source = json.load(sys.stdin)
    cc = OpenCC("s2twp")
    out = {}
    for key in sorted(source):
        text = cc.convert(source[key])
        for old, new in OVERRIDES:
            text = text.replace(old, new)
        out[key] = text
    target = pathlib.Path(__file__).resolve().parent.parent / "src" / "i18n" / "zh-tw.generated.json"
    target.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {len(out)} strings to {target}", file=sys.stderr)


if __name__ == "__main__":
    main()
