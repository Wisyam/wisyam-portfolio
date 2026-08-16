/**
 * Education & certifications section content (from the ICAM-2 content dump).
 */

export interface EducationEntry {
  title: string
  school: string
  period: string
  detail?: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
  detail?: string
}

export const EDUCATION: EducationEntry[] = [
  {
    title: 'S1 Teknik Informatika',
    school: 'Universitas Ciputra Surabaya',
    period: 'Feb 2026 - sekarang',
    detail: 'Fokus software engineering & web modern.',
  },
  {
    title: 'Software Engineer & Network Engineer',
    school: 'SMK Telkom Malang',
    period: '2022 - 2025',
  },
]

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'React Developer Certificate',
    issuer: 'Dicoding.com',
    year: 'Sep 2023',
  },
  {
    name: 'Backend Dev Certificate',
    issuer: 'LaniusMV',
    year: 'Apr 2025',
  },
  {
    name: 'Web Development Fundamentals',
    issuer: 'Dicoding.com',
    year: '2023',
    detail: 'HTML, JS DOM, JS Async',
  },
]
