/**
 * Coarse-pointer (touch) detection. Used to switch the HUD between the
 * keyboard-first desktop layout and the tap-first mobile layout: on touch
 * devices the controls hint is hidden and tap-to-move is enabled.
 *
 * Computed once on mount — the pointer type of a device does not change
 * mid-session, so a subscription would be pure overhead.
 */

import { useState } from 'react'

export function useIsTouch(): boolean {
  const [isTouch] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches,
  )
  return isTouch
}
