/**
 * Portfolio section definitions: the 6 buildings scattered across the world.
 * Kept in one place so later tasks (player collision, interaction, landing
 * page) can reference the exact building positions and landing metadata.
 */

export type SectionVariant =
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'contact'

/**
 * Icon key for the landing page. The landing page maps these keys to its own
 * icon set — the content module only carries the key, not the icon itself.
 */
export type SectionIcon =
  | 'user'
  | 'code'
  | 'folder'
  | 'briefcase'
  | 'graduation-cap'
  | 'envelope'

export interface PortfolioSection {
  id: SectionVariant
  label: string
  /** Building origin in world units: [x, y, z]. y is always 0 (ground). */
  position: [number, number, number]
  /**
   * Radius (world units) of the ground highlight ring shown under the
   * building while hovered or in interaction range. The E-key interaction
   * range is derived from this radius (see PortfolioScene), so ring and
   * gameplay stay in sync with the building footprint.
   */
  ringRadius: number

  // ---- Landing metadata (shared with the 3D HUD legend) ----
  icon: SectionIcon
  accentColor: string
  description: string
}

export const SECTIONS: PortfolioSection[] = [
  {
    id: 'about',
    label: 'About',
    position: [-9, 0, -8],
    ringRadius: 2.5,
    icon: 'user',
    accentColor: '#e67e22',
    description: 'Full-stack developer & AI-native engineer based in Malang, Indonesia.',
  },
  {
    id: 'skills',
    label: 'Skills',
    position: [8, 0, -9],
    ringRadius: 1.8,
    icon: 'code',
    accentColor: '#8e44ad',
    description: 'JavaScript, TypeScript, React/Next.js, Laravel, Node.js & more.',
  },
  {
    id: 'projects',
    label: 'Projects',
    position: [11, 0, 5],
    ringRadius: 3.0,
    icon: 'folder',
    accentColor: '#3498db',
    description: 'Web apps, game servers and a 3D model store — fullstack builds.',
  },
  {
    id: 'experience',
    label: 'Experience',
    position: [3, 0, 11],
    ringRadius: 4.3,
    icon: 'briefcase',
    accentColor: '#27ae60',
    description: 'Apique Group, PT Lanius and freelance work since 2020.',
  },
  {
    id: 'education',
    label: 'Education',
    position: [-10, 0, 7],
    ringRadius: 2.9,
    icon: 'graduation-cap',
    accentColor: '#f1c40f',
    description: 'Universitas Ciputra Surabaya & SMK Telkom Malang, plus certifications.',
  },
  {
    id: 'contact',
    label: 'Contact',
    position: [-3, 0, 12],
    ringRadius: 2.1,
    icon: 'envelope',
    accentColor: '#e74c3c',
    description: 'GitHub, LinkedIn, Instagram, phone — reach out anytime.',
  },
]
