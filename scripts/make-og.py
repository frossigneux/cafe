"""Builds public/og.jpg (1200x630), the social sharing thumbnail.

Run: python3 -I scripts/make-og.py
Left: tomato panel with the café name and what it serves. Right: the first picture of
"gallery" in content/settings.json. The publish workflow runs it before every build.
"""
import json
import pathlib

from PIL import Image, ImageDraw, ImageFont

root = pathlib.Path(__file__).resolve().parent.parent
settings = json.loads((root / 'content/settings.json').read_text())
name = settings['name']
gallery = [g.get('image') for g in settings.get('gallery') or [] if g.get('image')]
W, H, PANEL = 1200, 630, 560
TOMATO, CREAM = (196, 63, 26), (255, 250, 243)

fonts = root / 'scripts/fonts'
ka_bold = fonts / 'NotoSansGeorgian-Bold.ttf'
la_bold = fonts / 'NotoSans-Bold.ttf'
la_reg = fonts / 'NotoSans-Regular.ttf'
ka_reg = fonts / 'NotoSansGeorgian-Regular.ttf'


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
if gallery:
    # "/photos/x.jpg" as Pages CMS writes it, or a bare "x.jpg".
    file = gallery[0].strip().removeprefix('/').removeprefix('content/').removeprefix('photos/')
    photo = Image.open(root / 'content/photos' / file).convert('RGB')
    pw = W - PANEL
    scale = max(H / photo.height, pw / photo.width)
    photo = photo.resize((round(photo.width * scale), round(photo.height * scale)), Image.LANCZOS)
    left, top = (photo.width - pw) // 2, (photo.height - H) // 2
    img.paste(photo.crop((left, top, left + pw, top + H)), (PANEL, 0))

d = ImageDraw.Draw(img)
draw_mixed(d, (64, 160), name, 66)
draw_mixed(d, (64, 290), 'პიცა · ხაჭაპური · ხინკალი · ყავა', 29, bold=False)
draw_mixed(d, (64, 340), 'Pizza · Khachapuri · Khinkali · Coffee', 29, bold=False)
d.rounded_rectangle((64, 440, 64 + 380, 440 + 72), radius=16, fill=(31, 122, 71))
draw_mixed(d, (92, 455), 'Order on WhatsApp', 32)

img.save(root / 'public/og.jpg', quality=88, optimize=True)
print('wrote public/og.jpg')
