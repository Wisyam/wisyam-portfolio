/**
 * Unified content module — the single import point for ALL portfolio content.
 *
 * Both the landing page (`/`) and the 3D section panels (`/game`) MUST import
 * content from here, never from the individual files below, so the facts
 * (scraped from wisyam.site) have exactly one source of truth.
 *
 * Import from the parent folder: `import { ABOUT, SECTIONS } from '../content'`
 */

export * from './about'
export * from './contact'
export * from './education'
export * from './experience'
export * from './projects'
export * from './sections'
export * from './skills'
export * from './world-props'
