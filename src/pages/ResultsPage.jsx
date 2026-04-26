import { motion } from 'framer-motion'
import { Trophy, ExternalLink } from 'lucide-react'
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
            Official results from the 2026 California State Yo-Yo Contest.
          </p>
        </AnimatedSection>

        {/* 2026 Results */}
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <GlowCard glowColor="gold" className="max-w-2xl mx-auto">
            <div className="p-8 text-center">
              <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 ${
                isDark
                  ? 'bg-gradient-to-br from-gold/20 to-gold-dark/20'
                  : 'bg-gradient-to-br from-gold/10 to-gold-dark/10'
              }`}>
                <Trophy className="w-10 h-10 text-gold" />
              </div>
              <h2 className={`text-2xl md:text-3xl font-display font-bold mb-4 ${
                isDark ? 'text-white' : 'text-surface-900'
              }`}>
                2026 Results Are Live!
              </h2>
              <p className={`text-lg mb-6 ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                The 2026 California State Yo-Yo Contest has concluded.
                View the official results from April 25, 2026 below.
              </p>
              <a
                href="https://compete.yoyocontest.com/results/2026-california-state-yo-yo-contest"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  isDark
                    ? 'bg-gold/20 border border-gold/40 text-gold hover:bg-gold/30 hover:border-gold/60'
                    : 'bg-gold/10 border border-gold/30 text-gold-dark hover:bg-gold/20 hover:border-gold/50'
                }`}
              >
                <span>View Official Results</span>
                <ExternalLink className="w-4 h-4" />
              </a>
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
