import { motion } from 'framer-motion'
import { Trophy, Calendar } from 'lucide-react'
import Container from '../components/ui/Container'
import GlowCard from '../components/ui/GlowCard'
import GradientText from '../components/ui/GradientText'
import AnimatedSection from '../components/ui/AnimatedSection'
import { useTheme } from '../hooks/useTheme'

function ResultsPage() {
  const { isDark } = useTheme()

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
            <Trophy className="w-8 h-8 text-gold" />
            <span className="text-sm font-mono text-grass tracking-wider uppercase">
              Competition Results
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            <GradientText>RESULTS</GradientText>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
            Official results from the California State Yo-Yo Contest.
            Check back after the 2026 contest for this year's results!
          </p>
        </AnimatedSection>

        {/* 2026 Results Coming Soon */}
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <GlowCard glowColor="gold" className="max-w-2xl mx-auto">
            <div className="p-8 text-center">
              <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 ${
                isDark
                  ? 'bg-gradient-to-br from-gold/20 to-gold-dark/20'
                  : 'bg-gradient-to-br from-gold/10 to-gold-dark/10'
              }`}>
                <Calendar className="w-10 h-10 text-gold" />
              </div>
              <h2 className={`text-2xl md:text-3xl font-display font-bold mb-4 ${
                isDark ? 'text-white' : 'text-surface-900'
              }`}>
                2026 Results Coming Soon
              </h2>
              <p className={`text-lg mb-6 ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                The 2026 California State Yo-Yo Contest hasn't happened yet!
                Results will be posted here after the competition on April 25, 2026.
              </p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                isDark
                  ? 'bg-surface-700/50 border-white/10'
                  : 'bg-white border-light-300 shadow-sm'
              }`}>
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                  Contest Date: April 25, 2026
                </span>
              </div>
            </div>
          </GlowCard>
        </AnimatedSection>

        {/* Decorative Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className={`absolute top-1/4 -right-32 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-gold/10' : 'bg-gold/5'
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
