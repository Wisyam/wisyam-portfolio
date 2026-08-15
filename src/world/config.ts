/**
 * World layout contract for the top-down portfolio game.
 *
 * This is the single source of truth for map size and section placement.
 * Later tasks (player movement, interaction raycasting, content panels)
 * read SECTIONS / WORLD_HALF from here instead of hardcoding positions.
 */

export type SectionId =
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'contact'

export type RoofStyle = 'pyramid' | 'flat'

export type SectionFeature =
  | 'screen'
  | 'antenna'
  | 'chimney'
  | 'flag'
  | 'mailbox'
  | 'none'

export interface SectionConfig {
  id: SectionId
  /** Floating label shown above the building. */
  label: string
  /** World position of the building base (y is always 0). */
  position: [number, number, number]
  /** Building body color - each section gets a distinct accent. */
  color: string
  roofColor: string
  roof: RoofStyle
  /** Building body height in world units. */
  height: number
  feature: SectionFeature
}

/** Half of the playable square map. The fence sits near this line. */
export const WORLD_HALF = 20

/** Where the boundary fence is placed (world units from center). */
export const BOUNDARY = WORLD_HALF - 0.4

/** Top-down angled camera rig (pitch ~54deg, semi-3D look). */
export const CAMERA_RIG = {
  position: [0, 22, 16] as [number, number, number],
  target: [0, 0, 0] as [number, number, number],
}

/** Six portfolio sections placed on a hexagon ring (radius 9). */
export const SECTIONS: SectionConfig[] = [
  {
    id: 'about',
    label: 'About',
    position: [7.79, 0, 4.5],
    color: '#f59e0b',
    roofColor: '#b45309',
    roof: 'pyramid',
    height: 2.2,
    feature: 'none',
  },
  {
    id: 'skills',
    label: 'Skills',
    position: [0, 0, 9],
    color: '#8b5cf6',
    roofColor: '#6d28d9',
    roof: 'flat',
    height: 2.2,
    feature: 'screen',
  },
  {
    id: 'projects',
    label: 'Projects',
    position: [-7.79, 0, 4.5],
    color: '#ec4899',
    roofColor: '#be185d',
    roof: 'pyramid',
    height: 2.2,
    feature: 'chimney',
  },
  {
    id: 'experience',
    label: 'Experience',
    position: [-7.79, 0, -4.5],
    color: '#3b82f6',
    roofColor: '#1d4ed8',
    roof: 'flat',
    height: 3.2,
    feature: 'antenna',
  },
  {
    id: 'education',
    label: 'Education',
    position: [0, 0, -9],
    color: '#10b981',
    roofColor: '#047857',
    roof: 'pyramid',
    height: 2.2,
    feature: 'flag',
  },
  {
    id: 'contact',
    label: 'Contact',
    position: [7.79, 0, -4.5],
    color: '#ef4444',
    roofColor: '#b91c1c',
    roof: 'flat',
    height: 2.2,
    feature: 'mailbox',
  },
]
