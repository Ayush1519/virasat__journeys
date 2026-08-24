# Virasat Journeys

Build a premium, modern, and highly interactive web application called “VIRASAT” (meaning heritage) designed to educate children and young users about cultural heritage sites, primarily focusing on India.

The app should combine storytelling, education, interactivity, and personalization with a visually stunning and unique UI.

---

1. CORE PURPOSE:

- Educate users about heritage sites, history, culture, food, clothing, and values

- Make learning fun and engaging for children and youth

- Encourage emotional connection through storytelling and personal memories

---

2. UI/UX DESIGN (HIGH PRIORITY):

- Premium, creative, and non-generic UI (avoid template-like design)

- Design style:

  

  - Modern + Indian cultural fusion (subtle traditional patterns, textures)

  - Glassmorphism + soft gradients + card-based layout

  - Rounded corners (16–24px), soft shadows, depth layers

- Color Palette:

  

  - Saffron (#FF9933)

  - Deep Blue (#1A237E)

  - Ivory/off-white background

  - Smooth gradients instead of flat colors

- Typography:

  

  - Modern fonts (Poppins / Inter style)

  - Bold headings, friendly readable text

- Animations:

  

  - Smooth transitions (fade, slide)

  - Hover effects (scale + glow)

  - Scroll animations (reveal, parallax)

  - Micro-interactions

---

3. NAVIGATION:

- Sticky glassmorphism navbar:

  

  - Home

  - Explore

  - Map

  - Quiz

  - Memories

  - About

  - Help

  - Contact

  - Language selector

- Footer:

  

  - About

  - Privacy Policy

  - Terms & Conditions

  - Contact info

  - Social links

---

4. HOMEPAGE:

- Hero section with large cultural visual + tagline:

  “Explore India’s Heritage in a Fun Way”

- Animated search bar

- Featured heritage carousel

- Category cards (Food, Culture, Clothing, Monuments)

- Interactive mini-map

---

5. HERITAGE SITE DETAIL PAGE:

   For each site include:

- Name, location, map integration

- History:

  - Simple explanation (kids)

  - Detailed explanation (advanced)

- Image gallery

- Cultural importance

- Local food

- Traditional clothing

- Fun facts

UI:

- Timeline-style history

- Tabbed sections (History, Food, Clothing, Music, Facts)

- Sticky section navigation

---

6. REGIONAL MUSIC:

- Add 1–3 regional songs or instrumental tracks per site

- Audio player with modern UI (waveform/progress bar)

- Cultural description of music

---

7. VOICE EXPLANATION:

- “Listen” button for each section

- Text-to-Speech narration

- Multi-language voice support

- Playback controls (speed, replay)

---

8. MULTILINGUAL SUPPORT:

- Default: English + Hindi

- Integrate Google Translate API for dynamic translation

- Instant language switching

- Cache translations

- Allow manual override for important content

---

9. 3D EXPERIENCE:

- Interactive 3D models / virtual tours for selected sites

- Rotate, zoom, explore

- Fullscreen immersive mode

- Fallback images if unavailable

---

10. MEMORY FEATURE (NO LOGIN REQUIRED):

- No sign up/login required

- Allow users to:

  

  - Upload personal visit images

  - Add title, description, date

  - Save memory linked to a site

- Storage:

  

  - Use local storage or anonymous backend

- “My Memories” page:

  

  - Grid/gallery layout

  - Edit/delete option

  - Slideshow view

  - Scrapbook-style emotional UI

- Optional:

  

  - Share memory as image/link

---

11. LEARNING MODE:

- Quiz (MCQs)

- Score tracking

- Rewards/badges

- Confetti animation on completion

---

12. STANDARD APP FEATURES:

About Page:

- Purpose, mission, benefits

Help Page:

- FAQ

- How to use

- Troubleshooting

Contact Page:

- Contact form (Name, Email, Message)

Settings:

- Language switch

- Audio control

- Theme toggle (light/dark)

Other:

- Notifications (toast)

- Custom 404 page

- Loading skeletons

---

13. TECH STACK:

- Frontend: React + Tailwind CSS

- Backend: Node.js / serverless

- Database: Firebase / Supabase

- Translation: Google Translate API

- TTS: Google Text-to-Speech

- 3D: Three.js / WebGL

---

14. PERFORMANCE:

- Lazy loading

- Image compression

- Fast load time

- Optimized assets

---

15. OUTPUT:

- Complete working codebase

- Component-based structure

- Premium UI design implemented

- Sample dataset (5 Indian heritage sites)

- Audio + multilingual demo

- Setup instructions

---

IMPORTANT:

- Avoid generic UI

- Focus on uniqueness, creativity, and engagement

- Make it feel like a real modern product, not a student template

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/08899fe4-67e4-457a-ba23-7a3dcbb64ee4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
