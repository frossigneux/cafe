"""Builds public/og.jpg (1200x630), the social sharing thumbnail.

Run: python3 -I scripts/make-og.py
Left: tomato panel with the café name and what it serves. Right: the café illustration.
Re-run after changing the name or src/assets/cafe.jpg.
"""
import json
import pathlib

from PIL import Image, ImageDraw, ImageFont

root = pathlib.Path(__file__).resolve().parent.parent
name = json.loads((root / 'content/settings.json').read_text())['name']
W, H, PANEL = 1200, 630, 560
TOMATO, CREAM = (196, 63, 26), (255, 250, 243)

ka_bold = '/usr/share/fonts/truetype/noto/NotoSansGeorgian-Bold.ttf'
la_bold = '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf'
la_reg = '/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf'
ka_reg = '/usr/share/fonts/truetype/noto/NotoSansGeorgian-Regular.ttf'


def is_georgian(ch):
    return 'Ⴀ' <= ch <= 'ჿ'


def draw_mixed(d, xy, text, size, bold=True, fill=CREAM):
    """Draws text switching between the Georgian and Latin faces per character run."""
    ka = ImageFont.truetype(ka_bold if bold else ka_reg, size)
    la = ImageFont.truetype(la_bold if bold else la_reg, size)
    x, y = xy
    for ch in text:
        f = ka if is_georgian(ch) else la
        d.text((x, y), ch, font=f, fill=fill)
        x += f.getlength(ch)
    return x


img = Image.new('RGB', (W, H), TOMATO)
photo = Image.open(root / 'src/assets/cafe.jpg').convert('RGB')
scale = H / photo.height
photo = photo.resize((round(photo.width * scale), H), Image.LANCZOS)
pw = W - PANEL
left = max(0, (photo.width - pw) // 2)
img.paste(photo.crop((left, 0, left + pw, H)), (PANEL, 0))

d = ImageDraw.Draw(img)
draw_mixed(d, (64, 160), name, 66)
draw_mixed(d, (64, 290), 'პიცა · ხაჭაპური · ხინკალი · ყავა', 29, bold=False)
draw_mixed(d, (64, 340), 'Pizza · Khachapuri · Khinkali · Coffee', 29, bold=False)
d.rounded_rectangle((64, 440, 64 + 380, 440 + 72), radius=16, fill=(31, 122, 71))
draw_mixed(d, (92, 455), 'Order on WhatsApp', 32)

img.save(root / 'public/og.jpg', quality=88, optimize=True)
print('wrote public/og.jpg')
