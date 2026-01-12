import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Trophy, Zap, Sparkles, Music, Clock, AlertCircle } from 'lucide-react'
import { divisions } from '../data/rules'
import Container from '../components/ui/Container'
import GlowCard from '../components/ui/GlowCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import GradientText from '../components/ui/GradientText'
import AnimatedSection from '../components/ui/AnimatedSection'
import { useTheme } from '../hooks/useTheme'

const iconMap = {
  Trophy: Trophy,
  Zap: Zap,
  Sparkles: Sparkles,
}

const glowColorMap = {
  'Trophy': 'bear',
  'Zap': 'grass',
  'Sparkles': 'grass',
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

function CompetePage() {
  const { isDark } = useTheme()

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Header Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-cal-red/10' : 'bg-cal-red/5'
          }`} />
          <div className={`absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl ${
            isDark ? 'bg-grass/10' : 'bg-grass/5'
          }`} />
        </div>

        <Container className="relative z-10">
          <AnimatedSection animation="fadeUp" className="text-center">
            <Badge variant="default" className="mb-6">
              California State Yo-Yo Contest 2026
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6">
              <GradientText gradient="cal">COMPETE</GradientText>
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
              Show off your skills and compete against California's best yo-yo players
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Registration Status Banner */}
      <section className="pb-12">
        <Container>
          <AnimatedSection animation="scale" delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden">
              <div className={`absolute inset-0 ${
                isDark
                  ? 'bg-gradient-to-r from-bear-light/20 via-cal-red/20 to-bear-medium/20'
                  : 'bg-gradient-to-r from-bear-light/10 via-cal-red/10 to-bear-medium/10'
              }`} />
              <div className={`relative p-6 md:p-8 text-center ${
                isDark ? 'glass-strong' : 'bg-white/90 border border-light-300 rounded-2xl'
              }`}>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-bear-light" />
                  <span className="text-lg font-display font-bold text-bear-light uppercase tracking-wider">
                    Registration Closed
                  </span>
                </div>
                <p className={isDark ? 'text-white/70' : 'text-surface-600'}>
                  The registration deadline was <span className={`font-semibold ${isDark ? 'text-white' : 'text-surface-900'}`}>April 9th, 2026</span>.
                  Thank you to all who registered!
                </p>
                <div className={`mt-4 flex items-center justify-center gap-2 text-sm ${
                  isDark ? 'text-white/50' : 'text-surface-500'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>Competition Date: April 12th, 2026</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Division Cards */}
      <section className="py-16">
        <Container>
          <AnimatedSection animation="fadeUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <GradientText gradient="grass">Competition Divisions</GradientText>
            </h2>
            <p className={`max-w-xl mx-auto ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
              Choose your division and compete for the California State title
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {divisions.map((division, index) => {
              const IconComponent = iconMap[division.icon]
              const glowColor = glowColorMap[division.icon]

              return (
                <AnimatedSection
                  key={division.id}
                  animation="fadeUp"
                  delay={0.1 + index * 0.1}
                >
                  <GlowCard glowColor={glowColor} className="h-full">
                    <div className="p-6 md:p-8">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          isDark
                            ? 'bg-gradient-to-br from-white/10 to-white/5'
                            : 'bg-gradient-to-br from-grass/10 to-grass/5'
                        }`}>
                          <IconComponent className="w-7 h-7 text-grass" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className={`text-xl font-display font-bold mb-2 ${
                        isDark ? 'text-white' : 'text-surface-900'
                      }`}>
                        {division.name}
                      </h3>
                      <p className={`text-sm mb-4 ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                        {division.description}
                      </p>

                      {/* Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-2">
                          <span className="text-xs text-grass font-semibold uppercase tracking-wider mt-0.5">
                            Eligibility
                          </span>
                          <span className={`text-sm ${isDark ? 'text-white/70' : 'text-surface-600'}`}>
                            {division.eligibility}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-xs text-cal-red font-semibold uppercase tracking-wider mt-0.5">
                            Format
                          </span>
                          <span className={`text-sm ${isDark ? 'text-white/70' : 'text-surface-600'}`}>
                            {division.format}
                          </span>
                        </div>
                      </div>

                      {/* Link to Rules */}
                      <Link
                        to={`/rules#${division.id}`}
                        className="inline-flex items-center gap-2 text-sm text-grass hover:text-grass/80 transition-colors font-medium"
                      >
                        View Division Rules
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </GlowCard>
                </AnimatedSection>
              )
            })}
          </div>

          {/* CTA Button */}
          <AnimatedSection animation="fadeUp" delay={0.4} className="text-center mt-12">
            <Link to="/rules">
              <Button variant="secondary" size="lg">
                View Full Competition Rules
              </Button>
            </Link>
          </AnimatedSection>
        </Container>
      </section>

      {/* Music Submission Section */}
      <section className="py-16 relative">
        <div className={`absolute inset-0 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-b from-transparent via-surface-800/30 to-transparent'
            : 'bg-gradient-to-b from-transparent via-light-200/50 to-transparent'
        }`} />
        <Container className="relative z-10">
          <AnimatedSection animation="fadeUp">
            <GlowCard glowColor="cal">
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    isDark
                      ? 'bg-gradient-to-br from-cal-red/20 to-cal-red/20'
                      : 'bg-gradient-to-br from-cal-red/10 to-cal-red/10'
                  }`}>
                    <Music className="w-8 h-8 text-cal-red" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-display font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-surface-900'
                    }`}>
                      Music Submission
                    </h3>
                    <p className={`mb-4 ${isDark ? 'text-white/70' : 'text-surface-600'}`}>
                      All competitors must submit their freestyle music before the event.
                      Music must be appropriate for all audiences.
                    </p>
                    <ul className={`space-y-2 text-sm ${isDark ? 'text-white/60' : 'text-surface-500'}`}>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-grass" />
                        MP3 format preferred (320kbps recommended)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-grass" />
                        Include your name and division in the filename
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-grass" />
                        Backup copy will be available at check-in
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </GlowCard>
          </AnimatedSection>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <Container>
          <AnimatedSection animation="fadeUp" className="text-center">
            <p className={`mb-6 ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
              Have questions about competing?
            </p>
            <Link to="/contact">
              <Button variant="ghost" size="md">
                Contact Us
              </Button>
            </Link>
          </AnimatedSection>
        </Container>
      </section>
    </motion.div>
  )
}

export default CompetePage
