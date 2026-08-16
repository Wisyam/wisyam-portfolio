/**
 * Experience section content (from the ICAM-2 content dump).
 */

export interface ExperienceEntry {
  role: string
  company: string
  period: string
  description: string
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: 'Full-Stack Developer',
    company: 'Apique Group, Malang',
    period: 'Jun 2025 - Present',
    description:
      'Pengembangan & pemeliharaan aplikasi web full-stack React/Next.js dan Laravel. Koordinasi dengan tim desain untuk fitur UI/UX responsif.',
  },
  {
    role: 'Backend Intern',
    company: 'PT Lanius Inovasi Indonesia, Malang',
    period: 'Nov 2024 - Apr 2025',
    description:
      'Pengembangan backend system, query & pembuatan tabel database deploy ke produksi, integrasi & pengujian data.',
  },
  {
    role: 'Frontend & Backend Developer',
    company: 'Diesnatalis SMK Telkom Malang',
    period: 'Sep 2023 - 2024',
    description:
      'Desain UI/UX dan pengembangan website fullstack untuk manajemen keuangan, koordinasi & maintenance dengan guru pembimbing.',
  },
  {
    role: 'Fullstack Dev, UI/UX & Mentor',
    company: 'Mobigo Project, Malang',
    period: 'Mar 2024 - Apr 2024',
    description:
      'Web rental mobil (auth, transaksi sewa, dashboard admin), mentoring anggota tim dari desain hingga deployment.',
  },
  {
    role: 'Freelance / Self Employed',
    company: '',
    period: 'Jul 2020 - 2025',
    description:
      'Game server development, 3D model store owner, game server administrator & bug hunter.',
  },
]
