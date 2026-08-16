/**
 * Per-session activity checklist (HUD): the 6 core section visits plus the 6
 * mini interactions from the V2 epic. State lives in React state only, so the
 * checklist resets every session (localStorage is intentionally NOT used).
 *
 * Wiring to the real interaction triggers (opening a section panel, standing
 * at a mini-interaction spot) happens in the Interaction V2 issue — for now
 * items are marked done manually from the HUD checklist.
 */

import { useCallback, useMemo, useState } from 'react'
import { SECTIONS, type SectionVariant } from '../content'

export type MiniInteractionId =
  | 'water-garden'
  | 'feed-chicken'
  | 'sit-bench'
  | 'ring-bell'
  | 'pick-fruit'
  | 'notice-board'

export type ActivityId = SectionVariant | MiniInteractionId

export interface Activity {
  id: ActivityId
  label: string
  group: 'section' | 'mini'
}

/** Core sections first, then the 6 mini interactions (epic decision #7). */
export const ACTIVITIES: Activity[] = [
  ...SECTIONS.map((section) => ({
    id: section.id as ActivityId,
    label: section.label,
    group: 'section' as const,
  })),
  { id: 'water-garden', label: 'Water the garden', group: 'mini' },
  { id: 'feed-chicken', label: 'Feed the chickens', group: 'mini' },
  { id: 'sit-bench', label: 'Sit on the bench', group: 'mini' },
  { id: 'ring-bell', label: 'Ring the village bell', group: 'mini' },
  { id: 'pick-fruit', label: 'Pick fruit', group: 'mini' },
  { id: 'notice-board', label: 'Read the notice board', group: 'mini' },
]

export interface ActivityLog {
  activities: readonly Activity[]
  completed: ReadonlySet<ActivityId>
  isDone: (id: ActivityId) => boolean
  markDone: (id: ActivityId) => void
  reset: () => void
}

export function useActivityLog(): ActivityLog {
  const [completed, setCompleted] = useState<ReadonlySet<ActivityId>>(
    () => new Set<ActivityId>(),
  )

  const isDone = useCallback((id: ActivityId) => completed.has(id), [completed])

  const markDone = useCallback((id: ActivityId) => {
    setCompleted((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const reset = useCallback(() => setCompleted(new Set()), [])

  const activities = useMemo(() => ACTIVITIES, [])

  return { activities, completed, isDone, markDone, reset }
}
