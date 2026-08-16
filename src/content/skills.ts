/**
 * Skills section content (from the ICAM-2 content dump).
 */

export interface SkillGroup {
  title: string
  items: string[]
}

export const SKILLS: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['JavaScript', 'TypeScript', 'HTML/CSS', 'PHP/Laravel'],
  },
  {
    title: 'Frameworks',
    items: ['React/Next.js', 'Node.js', 'Express.js', 'Tailwind CSS'],
  },
  {
    title: 'Tools',
    items: ['Git/GitHub', 'Figma', 'VS Code', 'AI Agents'],
  },
]
