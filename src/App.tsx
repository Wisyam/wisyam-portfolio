import { lazy, Suspense, useEffect, useState } from 'react'
import { Hud } from './components/hud/Hud'
import { LoadingScreen } from './components/hud/LoadingScreen'
import { SectionPanel } from './components/panel/SectionPanel'
import { SECTIONS, type SectionVariant } from './content/sections'

/**
 * The 3D scene (three.js + R3F + drei) is the heaviest part of the bundle, so
 * it is code-split: the page shell, HUD and panels stay in the critical chunk
 * and the scene chunk is fetched on demand. The LoadingScreen covers both the
 * chunk fetch (Suspense) and the WebGL initialization (onReady).
 */
const SceneCanvas = lazy(() =>
  import('./components/SceneCanvas').then((module) => ({ default: module.SceneCanvas })),
)

/** Keep the loading screen up briefly after the scene is ready to avoid a flash. */
const MIN_LOADING_MS = 400

function App() {
  const [activeSection, setActiveSection] = useState<SectionVariant | null>(null)
  const [sceneReady, setSceneReady] = useState(false)
  const [minLoadingElapsed, setMinLoadingElapsed] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setMinLoadingElapsed(true), MIN_LOADING_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const showLoading = !sceneReady || !minLoadingElapsed
  const active = SECTIONS.find((section) => section.id === activeSection) ?? null

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-slate-900">
      {showLoading && <LoadingScreen />}
      <Suspense fallback={null}>
        <SceneCanvas
          activeSection={activeSection}
          onOpenSection={setActiveSection}
          onReady={() => setSceneReady(true)}
        />
      </Suspense>
      <Hud onOpenSection={setActiveSection} />
      <SectionPanel section={active} onClose={() => setActiveSection(null)} />
    </main>
  )
}

export default App
