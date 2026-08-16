import { useState } from 'react'
import { SceneCanvas } from './components/SceneCanvas'
import { SectionPanel } from './components/panel/SectionPanel'
import { SECTIONS, type SectionVariant } from './content/sections'

function App() {
  const [activeSection, setActiveSection] = useState<SectionVariant | null>(null)
  const active = SECTIONS.find((section) => section.id === activeSection) ?? null

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-slate-900">
      <SceneCanvas activeSection={activeSection} onOpenSection={setActiveSection} />
      <SectionPanel section={active} onClose={() => setActiveSection(null)} />
    </main>
  )
}

export default App
