============================================================
GEMINI GUIDE — IMAGES ONLY (AAAI Event Hub @ TCET)
============================================================

WHERE TO PASTE:  gemini.google.com  ->  type in the chat box
(every images/*/PROMPT.txt file is already written for Gemini's
style: one rich natural-language paragraph, no keyword soup,
no negative-prompt field — exclusions are written into the sentence)

HOW TO GET INSANE REALISM IN GEMINI:
1. Paste ONE prompt per message. Ask for one image at a time.
2. Always name the camera + lens inside the prompt
   ("full-frame mirrorless camera, 35mm lens, f/1.8") — this is
   the single biggest realism lever in Imagen/Gemini.
3. Ask for the aspect ratio by name at the end of the prompt
   ("16:9 widescreen", "4:5 portrait", "1:1 square").
4. If something looks fake, reply in the SAME chat:
   "keep everything identical but make the lighting more
   natural and the skin texture more realistic" — Gemini
   remembers and refines.
5. CONSISTENCY TRICK for a whole section: generate the best
   first image, then for every next variant attach that image
   and say "same scene, same lighting, same colour grade, now
   ..." — this keeps startframe/lifestyle/endframe matching.

WHAT TO GENERATE PER FOLDER (variants):
- badge-viewer        -> 36 frames (rotate 10 degrees each message)
- welcome             -> 6 frames (startframe, lifestyle x2, endframe, 2 alt angles)
- noise-control       -> 3 (startframe, lifestyle, endframe)
- audio-performance   -> 3 (startframe, lifestyle, endframe)
- personalized-listening -> 3 (startframe, lifestyle, endframe)
- fitness             -> 3 (startframe, lifestyle, endframe)
- hearing-health      -> 3 (startframe, lifestyle, endframe)
- battery             -> 2 (hero, detail close-up)
- team                -> 2 (wide candid, closer candid)
- og-meta             -> 1 banner (16:9, crop/export to 1200x630)

EXPORT SIZES (resize after download):
small 368px | medium 724px | large 1120px | plus @2x of each
og-meta: exactly 1200x630

FILE NAMING (drop-in swap for old assets):
<name>_startframe__<id>_large_2x.png
<name>_lifestyle__<id>_large_2x.png
<name>_endframe__<id>_large_2x.png

VIDEO + ANIMATION PROMPTS ARE UNTOUCHED AND STILL WORK FOR LATER.
