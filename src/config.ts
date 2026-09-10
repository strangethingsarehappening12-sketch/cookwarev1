// ─────────────────────────────────────────────────────────────
// COOKWARE CAMPAIGN CONFIG
// Every knob for "Remind Vlad" lives here. Change these values
// to reconfigure the whole site — nothing else needs editing.
// ─────────────────────────────────────────────────────────────

export type VladStatus = 'not_pitched' | 'pitched'

export interface CookwareConfig {
  /** Day 1 of the campaign. Day count is derived from this date. */
  launchDate: string // ISO date, e.g. '2026-09-09'
  /** Starting counters (before any local increments). */
  startingReminderCount: number
  startingPitchCount: number
  /** Symbolic $1B goal. Replace with a live market-cap feed later — see MarketCapProvider below. */
  targetMarketCap: number
  /** Placeholder progress value (0–1) until a real market-cap API is wired in. */
  placeholderProgress: number
  /** Default Vlad status. Toggle in the demo control, or drive from a real API later. */
  vladStatus: VladStatus
  projectName: string
  handle: string
}

export const cookwareConfig: CookwareConfig = {
  launchDate: '2026-09-09',
  startingReminderCount: 1,
  startingPitchCount: 1,
  targetMarketCap: 1_000_000_000,
  placeholderProgress: 0.00042,
  vladStatus: 'not_pitched',
  projectName: 'COOKWARE',
  handle: '@cookware',
}

// ─────────────────────────────────────────────────────────────
// Swap this for a real fetch() to a market-cap API later.
// Keeping it isolated here means nothing else in the app changes.
// ─────────────────────────────────────────────────────────────
export async function getMarketCapProgress(): Promise<number> {
  // return fetch('/api/marketcap').then(r => r.json()).then(d => d.currentCap / cookwareConfig.targetMarketCap)
  return Promise.resolve(cookwareConfig.placeholderProgress)
}

export function getCurrentDay(launchDate: string, now: Date = new Date()): number {
  const start = new Date(launchDate + 'T00:00:00')
  const diffMs = now.getTime() - start.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  return Math.max(1, diffDays + 1)
}
