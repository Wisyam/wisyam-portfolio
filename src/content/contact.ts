/**
 * Contact section content (from the ICAM-2 content dump).
 * href values are the real, clickable targets; the raw dump value is shown
 * as the visible label.
 */

export interface ContactLink {
  label: string
  value: string
  href: string
  /** true = open in a new tab (external site), false = device action (tel). */
  external: boolean
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'GitHub',
    value: 'github.com/Wisyam',
    href: 'https://github.com/Wisyam',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/wisyam-zain-amanullah',
    href: 'https://linkedin.com/in/wisyam-zain-amanullah',
    external: true,
  },
  {
    label: 'Instagram',
    value: '@wyscamx',
    href: 'https://instagram.com/wyscamx',
    external: true,
  },
  {
    label: 'Phone',
    value: '+62 838 3197 3277',
    href: 'tel:+6283831973277',
    external: false,
  },
  {
    label: 'Site',
    value: 'wisyam.site',
    href: 'https://wisyam.site',
    external: true,
  },
]
