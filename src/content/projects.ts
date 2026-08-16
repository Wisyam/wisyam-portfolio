/**
 * Projects section content (from the ICAM-2 content dump).
 * Roles/stacks are verbatim from the dump; where the dump omits a role it is
 * derived from the matching Experience entry (also part of the dump).
 */

export interface Project {
  name: string
  description: string
  roles: string[]
  stack: string[]
}

export const PROJECTS: Project[] = [
  {
    name: 'mobigo-rental',
    description:
      'Aplikasi web rental mobil fullstack (autentikasi, transaksi sewa, dashboard admin, responsive).',
    roles: ['Frontend', 'Backend', 'UI/UX Designer'],
    stack: ['Next.js', 'Tailwind CSS', 'Express.js', 'MySQL'],
  },
  {
    name: 'diesnatalis-app',
    description:
      'Website fullstack Diesnatalis SMK Telkom Malang. Sistem manajemen keuangan untuk kasir/admin dengan UI/UX custom dan maintenance production.',
    roles: ['Frontend & Backend Developer'],
    stack: ['React', 'Node.js', 'Express.js', 'MySQL'],
  },
  {
    name: 'game-server',
    description:
      'Pengembangan private game server dengan fitur lengkap, load balancing sederhana, port forwarding, UI React & Tailwind.',
    roles: ['Developer & Administrator'],
    stack: ['Lua', 'React', 'Tailwind', 'Networking'],
  },
  {
    name: '3d-model-store',
    description:
      'Toko online 3D model dengan digital marketing, rekrutmen tim, dan game server test untuk client experience langsung pada 3D model.',
    roles: ['Owner'],
    stack: ['Blender', 'Digital Marketing', 'Game Dev'],
  },
]
