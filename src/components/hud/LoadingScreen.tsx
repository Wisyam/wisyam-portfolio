/**
 * Full-screen loading overlay shown while the 3D scene chunk loads and the
 * WebGL canvas initializes (see App.tsx: the overlay stays until the Canvas
 * onCreated callback fires and a short minimum time has elapsed).
 *
 * Rendered above the HUD (z-[60]) so the world never flashes in half-built.
 */

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 bg-slate-950">
      <div className="flex flex-col items-center gap-1.5">
        <span className="font-mono text-lg font-bold tracking-tight text-white sm:text-xl">
          Wisyam Zain Amanullah
        </span>
        <span className="text-xs text-slate-400">Loading 3D world…</span>
      </div>
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400"
        role="status"
        aria-label="Loading"
      />
    </div>
  )
}
