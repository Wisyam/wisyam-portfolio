/**
 * Landing page (`/`) — pixel-flavored parallax, hero, quest cards, chibi 2D.
 *
 * Reads all portfolio content from the unified content module (`src/content`
 * barrel) — same single source the 3D game uses. The 3D scene chunk is only
 * loaded when the user navigates to /game (react-router + code split in
 * GamePage), so this page stays light.
 */

import { ParallaxBackground } from '../components/landing/ParallaxBackground'
import { Hero } from '../components/landing/Hero'
import { QuestSection } from '../components/landing/QuestCards'
import { Footer } from '../components/landing/Footer'

export function LandingPage() {
  return (
    <div className="relative min-h-dvh bg-[#8ec9e8]">
      <ParallaxBackground />
      <main className="relative">
        <Hero />
        <QuestSection />
        <Footer />
      </main>
    </div>
  )
}
