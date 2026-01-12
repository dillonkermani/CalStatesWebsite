import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Trophy, FileText, History, Award, ChevronDown, Star } from 'lucide-react'
import { results2026, historicalResults, contestHistory } from '../data/results'
import Container from '../components/ui/Container'
import GlowCard from '../components/ui/GlowCard'
import Button from '../components/ui/Button'
import GradientText from '../components/ui/GradientText'
import AnimatedSection from '../components/ui/AnimatedSection'
import { useTheme } from '../hooks/useTheme'

function ResultsPage() {
  const { isDark } = useTheme()
  const [expandedYear, setExpandedYear] = useState(null)

  const handleDownload = (filename) => {
    // In production, this would link to actual PDF files
    window.open(`/results/${filename}`, '_blank')
  }

  const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24 pb-16"
    >
      <Container>
        {/* Page Header */}
        <AnimatedSection animation="fadeUp" className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <Trophy className="w-8 h-8 text-bear-tan" />
            <span className="text-sm font-mono text-grass tracking-wider uppercase">
              Competition Results
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            <GradientText>2026 RESULTS</GradientText>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
            Official results from the California State Yo-Yo Contest.
            Download PDF scoresheets for each division.
          </p>
        </AnimatedSection>

        {/* Results Grid */}
        <AnimatedSection
          animation="fadeUp"
          staggerChildren={true}
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {results2026.map((result, index) => (
            <GlowCard
              key={result.division}
              glowColor={index === results2026.length - 1 ? 'grass' : 'bear'}
              className="h-full"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Division Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDark
                      ? 'bg-gradient-to-br from-bear-light/20 to-bear-medium/20'
                      : 'bg-gradient-to-br from-bear-light/10 to-bear-medium/10'
                  }`}>
                    <FileText className="w-6 h-6 text-cal-red" />
                  </div>
                  {index === results2026.length - 1 && (
                    <span className={`px-3 py-1 text-xs font-mono font-semibold text-bear-tan rounded-full ${
                      isDark
                        ? 'bg-bear-tan/10 border border-bear-tan/30'
                        : 'bg-bear-tan/10 border border-bear-tan/20'
                    }`}>
                      FINALS
                    </span>
                  )}
                </div>

                {/* Division Name */}
                <h3 className={`text-xl font-display font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-surface-900'
                }`}>
                  {result.division}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-6 flex-grow ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                  {result.description}
                </p>

                {/* Download Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDownload(result.filename)}
                  className="w-full"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </div>
            </GlowCard>
          ))}
        </AnimatedSection>

        {/* Updated Note */}
        <AnimatedSection animation="fadeUp" delay={0.4} className="text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
            isDark
              ? 'bg-surface-700/50 border-white/10'
              : 'bg-white border-light-300 shadow-sm'
          }`}>
            <div className="w-2 h-2 rounded-full bg-grass animate-pulse" />
            <span className={`text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
              Results updated April 12, 2026
            </span>
          </div>
        </AnimatedSection>

        {/* Historical Results Section */}
        <AnimatedSection animation="fadeUp" className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <History className="w-6 h-6 text-cal-red" />
              <span className="text-sm font-mono text-cal-red tracking-wider uppercase">
                Contest History
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <GradientText gradient="bear">Past Champions</GradientText>
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
              {contestHistory.description}
            </p>
          </div>

          {/* Notable Champions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {contestHistory.notableChampions.map((champion, index) => (
              <GlowCard key={champion.name} glowColor={index === 0 ? 'grass' : 'cal'}>
                <div className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${
                    isDark
                      ? 'bg-gradient-to-br from-grass/20 to-grass-dark/20'
                      : 'bg-gradient-to-br from-grass/10 to-grass-dark/10'
                  }`}>
                    <Award className="w-6 h-6 text-grass" />
                  </div>
                  <h4 className={`font-display font-bold mb-1 ${isDark ? 'text-white' : 'text-surface-900'}`}>
                    {champion.name}
                  </h4>
                  <p className="text-bear-tan text-sm font-semibold mb-1">{champion.titles}x Champion</p>
                  <p className={`text-xs ${isDark ? 'text-white/50' : 'text-surface-500'}`}>{champion.years}</p>
                </div>
              </GlowCard>
            ))}
          </div>

          {/* Historical Results by Year */}
          <div className="space-y-4">
            {historicalResults.map((yearData) => (
              <GlowCard key={yearData.year} glowColor="bear">
                <button
                  onClick={() => toggleYear(yearData.year)}
                  className={`w-full p-6 flex items-center justify-between text-left transition-colors ${
                    isDark ? 'hover:bg-white/5' : 'hover:bg-surface-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      isDark
                        ? 'bg-gradient-to-br from-bear-light/20 to-bear-medium/20'
                        : 'bg-gradient-to-br from-bear-light/10 to-bear-medium/10'
                    }`}>
                      <span className="text-2xl font-display font-bold text-bear-light">
                        {yearData.year}
                      </span>
                    </div>
                    <div>
                      <h3 className={`text-xl font-display font-bold ${
                        isDark ? 'text-white' : 'text-surface-900'
                      }`}>
                        {yearData.year} California State Champions
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                        {yearData.location}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedYear === yearData.year ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-6 h-6 ${isDark ? 'text-white/60' : 'text-surface-500'}`} />
                  </motion.div>
                </button>

                {expandedYear === yearData.year && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className={`border-t pt-6 ${isDark ? 'border-white/10' : 'border-light-300'}`}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                        {yearData.champions.map((champion) => (
                          <div
                            key={champion.division}
                            className={`p-4 rounded-xl border ${
                              isDark
                                ? 'bg-surface-700/30 border-white/5'
                                : 'bg-light-100 border-light-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="w-4 h-4 text-bear-tan" />
                              <span className="text-xs font-mono text-grass uppercase tracking-wider">
                                {champion.division}
                              </span>
                            </div>
                            <p className={`font-display font-semibold ${
                              isDark ? 'text-white' : 'text-surface-900'
                            }`}>
                              {champion.name}
                            </p>
                            {champion.note && (
                              <p className={`text-xs mt-1 ${isDark ? 'text-white/50' : 'text-surface-500'}`}>
                                {champion.note}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </GlowCard>
            ))}
          </div>
        </AnimatedSection>

        {/* Contest Since Badge */}
        <AnimatedSection animation="fadeUp" className="text-center">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border ${
            isDark
              ? 'bg-gradient-to-r from-bear-light/20 via-cal-red/20 to-bear-medium/20 border-cal-red/30'
              : 'bg-gradient-to-r from-bear-light/10 via-cal-red/10 to-bear-medium/10 border-cal-red/20'
          }`}>
            <Trophy className="w-5 h-5 text-bear-light" />
            <span className={isDark ? 'text-white' : 'text-surface-900'}>
              Celebrating <span className="text-bear-light font-bold">{contestHistory.totalYears} years</span> of California yo-yo excellence since {contestHistory.founded}
            </span>
          </div>
        </AnimatedSection>

        {/* Decorative Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className={`absolute top-1/4 -right-32 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-bear-medium/10' : 'bg-bear-medium/5'
          }`} />
          <div className={`absolute bottom-1/4 -left-32 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-cal-red/10' : 'bg-cal-red/5'
          }`} />
        </div>
      </Container>
    </motion.div>
  )
}

export default ResultsPage
