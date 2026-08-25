# AAAI Event Hub @ TCET — Asset Prompts (TCET college theme, NOT Apple)

Every empty asset folder now contains its own `PROMPT.txt`.
Open the folder → open PROMPT.txt → select all → paste into **firefly.adobe.com**.

- **Videos** -> Firefly > Video > Generate Video (paid credits via a Firefly plan)
- **Images** -> Firefly > Text-to-Image (same credit balance)
- Finished files go in that same folder, named like the originals (see naming rules below).

## Folder map

| Folder | Type | Replaces on site |
|---|---|---|
| `hero-video/` | 1 video | `/public/videos/aaai-hero*` |
| `animations/hero` ... `animations/fitness-hero` | 10 videos | `/public/105/media/.../anim/*` |
| `images/badge-viewer/` | 360 spin frames | `/public/images/overview/product-viewer/` |
| `images/welcome/` | start/lifestyle/end | `overview/welcome/`, `welcome-variant/`, `variant/` |
| `images/noise-control/` ... `images/og-meta/` | stills | matching `overview/*` folders |

## Shared style
Every prompt ends with the TCET master style: ultra-realistic 8K, AAAI Event at TCET college campus Mumbai,
Indian students + faculty with lanyards, warm stage lights mixed with electric blue #2E6FF2 and violet #7B5CFA,
tech-fest energy, cinematic shallow depth of field, no readable text, no watermark.
Full copy: `MASTER-STYLE.txt`.

## Export sizes
- Images: small 368px / medium 724px / large 1120px, each also @2x (PNG)
- Videos: small / medium / large (+ `_2x`), webm + mp4/mov, muted, seamless loops
- og-meta: exactly 1200x630

## File naming (drop-in swap)
```
<name>_startframe__<id>_small.png   (+ _medium, _large, _small_2x, _medium_2x, _large_2x)
<name>_lifestyle__<id>_large_2x.png
<name>_endframe__<id>_large_2x.png
videos: small.mp4/webm, medium.*, large.* + _2x versions
```
