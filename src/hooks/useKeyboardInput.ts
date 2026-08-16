/**
 * Keyboard state for the player: WASD + arrow keys.
 *
 * Returns a plain getter instead of React state, so holding or releasing a
 * key never triggers a re-render — the game loop reads the current input
 * inside useFrame.
 */

import { useEffect, useRef } from 'react'

interface InputAxis {
  /** World-space movement per axis. W/up = -z, S/down = +z, A/left = -x, D/right = +x. */
  x?: number
  z?: number
}

const KEY_MAP: Record<string, InputAxis> = {
  KeyW: { z: -1 },
  ArrowUp: { z: -1 },
  KeyS: { z: 1 },
  ArrowDown: { z: 1 },
  KeyA: { x: -1 },
  ArrowLeft: { x: -1 },
  KeyD: { x: 1 },
  ArrowRight: { x: 1 },
}

export interface PlayerInput {
  /** Normalized movement vector; diagonal is not faster than straight. */
  x: number
  z: number
}

/**
 * Returns a function that reads the current input vector. Values are
 * normalized to length <= 1 (diagonals get scaled to 1/√2 per axis).
 */
export function useKeyboardInput(): () => PlayerInput {
  const held = useRef(new Set<string>())

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.code in KEY_MAP)) return
      held.current.add(event.code)
      // Keep arrow keys from scrolling the page.
      if (event.code.startsWith('Arrow')) event.preventDefault()
    }
    const onKeyUp = (event: KeyboardEvent) => {
      held.current.delete(event.code)
    }
    // If the window loses focus while a key is held, the keyup never arrives
    // and the character would keep moving forever — drop all held keys.
    const clearHeld = () => held.current.clear()
    const onVisibilityChange = () => {
      if (document.hidden) clearHeld()
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', clearHeld)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', clearHeld)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return () => {
    let x = 0
    let z = 0
    for (const code of held.current) {
      const axis = KEY_MAP[code]
      if (axis.x) x += axis.x
      if (axis.z) z += axis.z
    }
    const length = Math.hypot(x, z)
    if (length > 1) {
      x /= length
      z /= length
    }
    return { x, z }
  }
}
