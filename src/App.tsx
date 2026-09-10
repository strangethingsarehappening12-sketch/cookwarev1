import { useEffect, useMemo, useState } from 'react'
import {
  cookwareConfig,
  getCurrentDay,
  getMarketCapProgress,
  VladStatus as VladStatusType,
} from './config'
import { useLocalStorage } from './hooks/useLocalStorage'
import Header from './components/Header'
import Footer from './components/Footer'
import Counter from './components/Counter'
import ProgressBar from './components/ProgressBar'
import VladStatus from './components/VladStatus'
import ReminderCard from './components/ReminderCard'
import LoreTimeline, { TimelineEntry } from './components/LoreTimeline'
import CookwarePot from './components/CookwarePot'

const TIMELINE: TimelineEntry[] = [
  { day: 1, note: 'First reminder.' },
  { day: 7, note: 'Still reminding Vlad.' },
  { day: 30, note: 'Still reminding Vlad.' },
  { day: 100, note: 'You get the idea.' },
]

export default function App() {
  const day = useMemo(() => getCurrentDay(cookwareConfig.launchDate), [])

  const [reminders, setReminders] = useLocalStorage(
    'cookware_reminders',
    cookwareConfig.startingReminderCount,
  )
  const [pitches] = useLocalStorage('cookware_pitches', cookwareConfig.startingPitchCount)
  const [vladStatus, setVladStatus] = useLocalStorage<VladStatusType>(
    'cookware_vlad_status',
    cookwareConfig.vladStatus,
  )
  const [progress, setProgress] = useState(cookwareConfig.placeholderProgress)

  useEffect(() => {
    getMarketCapProgress().then(setProgress)
  }, [])

  const handleRemind = () => setReminders((n) => n + 1)
  const toggleVladDemo = () =>
    setVladStatus((s) => (s === 'pitched' ? 'not_pitched' : 'pitched'))

  const shareMessage = `Day ${day} of reminding Vlad to pitch Cookware.\n\nThe question isn't if he mentions it.\n\nIt's how many reminders it takes to get Cookware to $1B.`

  return (
    <div id="top" className="min-h-screen">
      <Header onRemind={handleRemind} />

      {/* HERO */}
      <section className="mx-auto max-w-5xl px-5 pb-16 pt-14 sm:pt-20">
        <div className="grid items-center gap-10 sm:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-mono text-xs tracking-wide text-clay">
              DAY {day} · REMINDER {reminders}
            </p>
            <h1 className="mt-3 font-display text-6xl font-bold leading-[0.95] sm:text-7xl">
              REMIND VLAD.
            </h1>
            <p className="mt-5 font-display text-2xl font-semibold sm:text-3xl">
              Day {day} of reminding Vlad to pitch Cookware.
            </p>
            <p className="mt-4 max-w-md text-ink/70">
              The question isn't if he mentions it. It's how many reminders it takes to
              get Cookware to $1B.
            </p>
            <button
              id="remind"
              onClick={handleRemind}
              className="mt-8 rounded-full border-[3px] border-ink bg-clay px-8 py-4 font-display text-lg font-bold text-cream shadow-thick transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              REMIND VLAD
            </button>
          </div>
          <CookwarePot className="mx-auto w-56 sm:w-72" />
        </div>
      </section>

      {/* LIVE COUNTERS */}
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="grid gap-5 sm:grid-cols-3">
          <Counter label="REMINDERS TO VLAD" value={reminders} accent />
          <Counter label="PITCHES MADE" value={pitches} />
          <Counter label="GOAL" value={cookwareConfig.targetMarketCap} prefix="$" />
        </div>
      </section>

      {/* $1B PROGRESS */}
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="rounded-3xl border-[3px] border-ink bg-white p-8 shadow-thick sm:p-12">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">COOKWARE → $1B</h2>
          <p className="mt-2 text-sm text-ink/60">
            Symbolic progress marker — not a live feed yet.
          </p>
          <div className="mt-6">
            <ProgressBar progress={progress} fromLabel="$0" toLabel="$1,000,000,000" />
          </div>
        </div>
      </section>

      {/* VLAD STATUS */}
      <section id="tracker" className="mx-auto max-w-5xl px-5 pb-16">
        <h2 className="mb-5 font-display text-3xl font-bold sm:text-4xl">
          THE VLAD PITCH TRACKER
        </h2>
        <VladStatus status={vladStatus} onToggleDemo={toggleVladDemo} />
      </section>

      {/* LORE */}
      <section id="lore" className="border-y-[3px] border-ink bg-ink py-16 text-cream">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">THE LORE</h2>
          <p className="mt-6 whitespace-pre-line font-display text-xl leading-relaxed sm:text-2xl">
            {`Day 1 starts the clock.\n\nEvery reminder gets counted.\nEvery pitch gets counted.\n\nIf Vlad ever pitches Cookware, the counter doesn't stop.\n\nThe mission simply enters its next chapter.`}
          </p>
        </div>
      </section>

      {/* DAILY REMINDER / SHARE CARD */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <ReminderCard day={day} reminders={reminders} pitches={pitches} shareMessage={shareMessage} />
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-3xl px-5 pb-24">
        <h2 className="mb-8 font-display text-3xl font-bold sm:text-4xl">THE TIMELINE</h2>
        <LoreTimeline entries={TIMELINE} currentDay={day} />
      </section>

      <Footer />
    </div>
  )
}
