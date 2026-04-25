import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Crown, Zap, Sparkles, Search, Users, ListOrdered, Hourglass } from 'lucide-react'
import { competitorDivisions } from '../data/competitors'
import Container from '../components/ui/Container'
import GradientText from '../components/ui/GradientText'
import AnimatedSection from '../components/ui/AnimatedSection'
import Badge from '../components/ui/Badge'
import { useTheme } from '../hooks/useTheme'

const iconMap = {
  Trophy,
  Crown,
  Zap,
  Sparkles,
}

const accentToTextClass = {
  'cal-red': 'text-cal-red',
  'grass': 'text-grass',
  'gold': 'text-gold',
}

const accentToBgSoft = {
  'cal-red': 'bg-cal-red/10',
  'grass': 'bg-grass/10',
  'gold': 'bg-gold/10',
}

const accentToBorder = {
  'cal-red': 'border-cal-red/30',
  'grass': 'border-grass/30',
  'gold': 'border-gold/30',
}

const accentToGlow = {
  'cal-red': 'shadow-glow-red',
  'grass': 'shadow-glow-green',
  'gold': 'shadow-glow-gold',
}

const accentToHoverGlow = {
  'cal-red': 'group-hover:shadow-glow-red',
  'grass': 'group-hover:shadow-glow-green',
  'gold': 'group-hover:shadow-glow-gold',
}

const accentToGradient = {
  'cal-red': 'from-cal-red via-cal-red-light to-cal-red',
  'grass': 'from-grass via-grass-light to-grass',
  'gold': 'from-gold via-gold-light to-gold',
}

function totalCompetitors() {
  const all = competitorDivisions.flatMap((d) => d.competitors.map((c) => c.name))
  return new Set(all).size
}

function CompetitorsPage() {
  const { isDark } = useTheme()
  const [activeId, setActiveId] = useState(competitorDivisions[0].id)
  const [query, setQuery] = useState('')

  const activeDivision = useMemo(
    () => competitorDivisions.find((d) => d.id === activeId) ?? competitorDivisions[0],
    [activeId]
  )

  const filteredCompetitors = useMemo(() => {
    if (!query.trim()) return activeDivision.competitors
    const q = query.trim().toLowerCase()
    return activeDivision.competitors.filter((c) => c.name.toLowerCase().includes(q))
  }, [activeDivision, query])

  const totals = useMemo(
    () => ({
      divisions: competitorDivisions.length,
      unique: totalCompetitors(),
      slots: competitorDivisions.reduce((sum, d) => sum + d.competitors.length, 0),
    }),
    []
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="min-h-screen pb-24"
    >
      {/* Header */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-cal-red/10' : 'bg-cal-red/5'
          }`} />
          <div className={`absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl ${
            isDark ? 'bg-grass/10' : 'bg-grass/5'
          }`} />
        </div>

        <Container className="relative z-10">
          <AnimatedSection animation="fadeUp" className="text-center">
            <Badge variant="default" className="mb-6">
              Freestyle Order &middot; April 25, 2026
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6">
              <GradientText gradient="cal">COMPETITORS</GradientText>
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
              The official freestyle order for every division at the 2026 California State Yo-Yo Contest.
            </p>
          </AnimatedSection>

          {/* Stat strip */}
          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
              <StatCard label="Divisions" value={totals.divisions} icon={Trophy} isDark={isDark} accent="cal-red" />
              <StatCard label="Competitors" value={totals.unique} icon={Users} isDark={isDark} accent="grass" />
              <StatCard label="Performance Slots" value={totals.slots} icon={ListOrdered} isDark={isDark} accent="gold" />
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Division switcher */}
      <section className="pb-8">
        <Container>
          <AnimatedSection animation="fadeUp" delay={0.15}>
            <div
              className={`sticky top-20 z-20 -mx-4 px-4 py-3 sm:mx-0 sm:px-0 backdrop-blur-md rounded-2xl ${
                isDark ? 'bg-surface-900/60' : 'bg-white/70'
              }`}
            >
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {competitorDivisions.map((division) => {
                  const Icon = iconMap[division.icon] || Trophy
                  const isActive = activeId === division.id
                  return (
                    <button
                      key={division.id}
                      onClick={() => setActiveId(division.id)}
                      className={`relative flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-display text-sm font-semibold transition-all duration-300 whitespace-nowrap border ${
                        isActive
                          ? `${accentToBgSoft[division.accentColor]} ${accentToBorder[division.accentColor]} ${accentToTextClass[division.accentColor]} ${
                              isDark ? accentToGlow[division.accentColor] : ''
                            }`
                          : isDark
                            ? 'bg-surface-800/60 border-white/10 text-white/70 hover:text-white hover:border-white/20'
                            : 'bg-white border-light-300 text-surface-600 hover:text-surface-900 hover:border-light-400'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? accentToTextClass[division.accentColor] : ''}`} />
                      <span>{division.name}</span>
                      <span
                        className={`ml-1 inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-[11px] font-bold ${
                          isActive
                            ? `${accentToBgSoft[division.accentColor]} ${accentToTextClass[division.accentColor]}`
                            : isDark
                              ? 'bg-white/10 text-white/60'
                              : 'bg-surface-100 text-surface-500'
                        }`}
                      >
                        {division.pending ? 'TBD' : division.competitors.length}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Active division content */}
      <section className="pb-20">
        <Container>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDivision.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Division header card */}
              <DivisionHeader
                division={activeDivision}
                isDark={isDark}
                query={query}
                onQueryChange={setQuery}
                resultCount={filteredCompetitors.length}
              />

              {/* Body */}
              <div className="mt-8">
                {activeDivision.pending ? (
                  <PendingState division={activeDivision} isDark={isDark} />
                ) : filteredCompetitors.length === 0 ? (
                  <EmptySearchState query={query} isDark={isDark} />
                ) : (
                  <CompetitorGrid
                    competitors={filteredCompetitors}
                    accent={activeDivision.accentColor}
                    isDark={isDark}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footnote */}
          <div className="mt-12 text-center">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                isDark
                  ? 'bg-surface-800/60 border-white/10 text-white/60'
                  : 'bg-white border-light-300 text-surface-600'
              }`}
            >
              <ListOrdered className="w-4 h-4 text-grass" />
              <span className="text-sm">Order subject to change. Check in by 10:30 AM on event day.</span>
            </div>
          </div>
        </Container>
      </section>
    </motion.div>
  )
}

function StatCard({ label, value, icon: Icon, accent, isDark }) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-3 py-4 rounded-2xl border backdrop-blur-md ${
        isDark
          ? 'bg-surface-800/60 border-white/10'
          : 'bg-white border-light-300 shadow-card-light'
      }`}
    >
      <div className={`w-9 h-9 rounded-xl mb-2 flex items-center justify-center ${accentToBgSoft[accent]} border ${accentToBorder[accent]}`}>
        <Icon className={`w-4 h-4 ${accentToTextClass[accent]}`} />
      </div>
      <div className={`font-display text-2xl font-black ${isDark ? 'text-white' : 'text-surface-900'}`}>
        {value}
      </div>
      <div className={`text-[11px] uppercase tracking-wider font-semibold mt-1 ${
        isDark ? 'text-white/50' : 'text-surface-500'
      }`}>
        {label}
      </div>
    </div>
  )
}

function DivisionHeader({ division, isDark, query, onQueryChange, resultCount }) {
  const Icon = iconMap[division.icon] || Trophy
  const totalCount = division.competitors.length

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border ${accentToBorder[division.accentColor]} ${
        isDark ? 'bg-surface-800/60' : 'bg-white shadow-card-light'
      }`}
    >
      {/* Accent strip */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentToGradient[division.accentColor]}`} />

      <div className="relative p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Left: title block */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${accentToBgSoft[division.accentColor]} ${accentToBorder[division.accentColor]}`}
              >
                <Icon className={`w-5 h-5 ${accentToTextClass[division.accentColor]}`} />
              </div>
              <div>
                <h2 className={`text-2xl md:text-3xl font-display font-bold ${
                  isDark ? 'text-white' : 'text-surface-900'
                }`}>
                  {division.fullName}
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                  {division.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right: search + count */}
          {!division.pending && (
            <div className="flex items-center gap-3 md:gap-4">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
                  isDark
                    ? 'bg-surface-900/60 border-white/10'
                    : 'bg-light-100 border-light-300'
                }`}
              >
                <Search className={`w-4 h-4 ${isDark ? 'text-white/40' : 'text-surface-400'}`} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="Search competitors"
                  aria-label="Search competitors"
                  className={`bg-transparent outline-none text-sm w-44 sm:w-56 ${
                    isDark
                      ? 'text-white placeholder:text-white/40'
                      : 'text-surface-900 placeholder:text-surface-400'
                  }`}
                />
              </div>
              <div
                className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border ${accentToBgSoft[division.accentColor]} ${accentToBorder[division.accentColor]}`}
              >
                <Users className={`w-4 h-4 ${accentToTextClass[division.accentColor]}`} />
                <span className={`text-sm font-semibold ${accentToTextClass[division.accentColor]}`}>
                  {query ? `${resultCount} of ${totalCount}` : `${totalCount} competitors`}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CompetitorGrid({ competitors, accent, isDark }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.03 } },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
    >
      {competitors.map((competitor) => (
        <CompetitorCard
          key={`${competitor.order}-${competitor.name}`}
          competitor={competitor}
          accent={accent}
          isDark={isDark}
        />
      ))}
    </motion.div>
  )
}

function CompetitorCard({ competitor, accent, isDark }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -3 }}
      className={`group relative flex items-center gap-4 p-4 rounded-2xl border transition-colors duration-300 ${
        isDark
          ? `bg-surface-800/60 border-white/10 hover:border-white/20`
          : `bg-white border-light-300 hover:border-light-400 shadow-card-light`
      }`}
    >
      {/* Order badge */}
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border font-display font-black text-lg ${accentToBgSoft[accent]} ${accentToBorder[accent]} ${accentToTextClass[accent]} ${accentToHoverGlow[accent]} transition-shadow duration-300`}
      >
        {competitor.order}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <div className={`text-xs font-mono uppercase tracking-wider ${
          isDark ? 'text-white/40' : 'text-surface-400'
        }`}>
          Order {competitor.order}
        </div>
        <div
          className={`font-display font-bold text-base sm:text-lg truncate ${
            isDark ? 'text-white' : 'text-surface-900'
          }`}
          title={competitor.name}
        >
          {competitor.name}
        </div>
      </div>

      {/* Decorative accent on the right */}
      <div className={`absolute top-0 right-0 w-1.5 h-full rounded-r-2xl bg-gradient-to-b ${accentToGradient[accent]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </motion.div>
  )
}

function PendingState({ division, isDark }) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-6 py-16 rounded-3xl border-2 border-dashed ${
        isDark ? 'bg-surface-800/40 border-white/10' : 'bg-light-100 border-light-300'
      }`}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${accentToBgSoft[division.accentColor]} border ${accentToBorder[division.accentColor]}`}>
        <Hourglass className={`w-7 h-7 ${accentToTextClass[division.accentColor]}`} />
      </div>
      <h3 className={`font-display text-xl md:text-2xl font-bold mb-2 ${
        isDark ? 'text-white' : 'text-surface-900'
      }`}>
        Finalists pending
      </h3>
      <p className={`max-w-md text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
        {division.pendingMessage}
      </p>
    </div>
  )
}

function EmptySearchState({ query, isDark }) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-6 py-16 rounded-3xl border ${
        isDark ? 'bg-surface-800/40 border-white/10' : 'bg-light-100 border-light-300'
      }`}
    >
      <Search className={`w-8 h-8 mb-3 ${isDark ? 'text-white/40' : 'text-surface-400'}`} />
      <p className={`font-display font-semibold ${isDark ? 'text-white' : 'text-surface-900'}`}>
        No competitors match &ldquo;{query}&rdquo;
      </p>
      <p className={`text-sm mt-1 ${isDark ? 'text-white/50' : 'text-surface-500'}`}>
        Try a different name or clear the search.
      </p>
    </div>
  )
}

export default CompetitorsPage
