/**
 * Portfolio section definitions: the 6 buildings scattered across the world.
 * Kept in one place so later tasks (player collision, interaction) can
 * reference the exact building positions.
 */

export type SectionVariant =
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'contact'

export interface PortfolioSection {
  id: SectionVariant
  label: string
  /** Building origin in world units: [x, y, z]. y is always 0 (ground). */
  position: [number, number, number]
}

export const SECTIONS: PortfolioSection[] = [
  { id: 'about', label: 'About', position: [-9, 0, -8] },
  { id: 'skills', label: 'Skills', position: [8, 0, -9] },
  { id: 'projects', label: 'Projects', position: [11, 0, 5] },
  { id: 'experience', label: 'Experience', position: [3, 0, 11] },
  { id: 'education', label: 'Education', position: [-10, 0, 7] },
  { id: 'contact', label: 'Contact', position: [-3, 0, 12] },
]
