# Isracard · שאלון הערכה עצמית — ניהול בעידן ה־AI

A ten-statement self-assessment for managers, delivered by NGG for Isracard.
Two dimensions are scored — **Human Leadership** and **AI Coworker** — each on a 5–25 scale with three interpretation bands. Results can be downloaded as a JPG or printed to PDF. Answers stay in the browser (`localStorage`) and are never transmitted.

This is the Isracard edition of the questionnaire first built for MalamTeam. Content and scoring are unchanged; the presentation follows the Isracard/NGG design system.

## Design system

Values come from the Isracard deck design system and are used as given:

| Token | Value | Used for |
| --- | --- | --- |
| Isracard blue | `#2221ba` | Brand band, primary button, progress fill |
| Accent violet | `#763af8` | Human Leadership fills (white text) |
| Accent amber | `#ffa229` | AI Coworker fills (ink text) |
| Ink | `#000000` | All body and title text on white |
| Neutral line / e8 / shadow | `#bfbfbf` / `#e8e8e8` / `#41464d` | Card stroke, tracks, muted text |
| Radius card / tile | `37px` / `23px` | Cards, tiles, buttons |
| Type | Assistant 400 / 700 | Everything |

Conventions kept from the system: one background colour per surface, colour tiles above white cards, the Isracard + NGG lockup running left-to-right in the footer, the five-mark strip as the only ornament, no emoji, no blur, no glass. Interactive states are opacity changes only.

Logos live in `public/` (`isracard-logo.png`, `isracard-logo-white.png`, `ngg-logo.png`, `brand-marks-stack.png`).

## Development

```bash
npm install
npm run dev
npm run build   # tsc + vite build → docs/
```

Deployed to GitHub Pages from `docs/` by `.github/workflows/deploy.yml`. The Vite `base` is `/Isracard-quest/`.

## Structure

```
src/
  App.tsx                    screen state, localStorage persistence
  data/surveyContent.ts      questions, rating labels, dimensions, copy
  lib/scoring.ts             totals, bands, percentages
  components/
    IntroScreen.tsx          brand band, opening text, dimension cards, instructions
    QuestionCard.tsx         one statement per screen with RatingScale
    RatingScale.tsx          1–5 tiles, mobile and desktop layouts
    ProgressHeader.tsx       title, lockup, progress track
    ResultsScreen.tsx        two DimensionResultCards + export actions
    DimensionResultCard.tsx  score tile, bar, level badge, interpretation
    ExportCard.tsx           off-screen 800px card rendered to JPG
    PrintSummary.tsx         print-only layout
    BrandLockup.tsx          Isracard + NGG logos
    MarkStrip.tsx            five-mark ornament
    PageFooter.tsx           footer row with lockup
```
