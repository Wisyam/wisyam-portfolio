/**
 * About section content (from the ICAM-2 content dump, scraped from wisyam.site).
 */

export interface About {
  name: string
  role: string
  location: string
  /** Short factual headline, e.g. "5+ years". */
  experience: string
  /** One or two short bio lines, derived only from dump facts. */
  bio: string[]
}

export const ABOUT: About = {
  name: 'Wisyam Zain Amanullah',
  role: 'Full-Stack Developer / AI Native Engineer',
  location: 'Malang, Indonesia',
  experience: '5+ years coding (since 2020)',
  bio: [
    'Full-stack developer building web apps with React/Next.js and Laravel, plus game servers and 3D projects.',
    'Currently focused on AI-native engineering and modern web development.',
  ],
}
