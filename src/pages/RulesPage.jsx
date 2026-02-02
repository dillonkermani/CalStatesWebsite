import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Zap, Sparkles, ChevronDown, Info, Wind, Music, CheckCircle, XCircle } from 'lucide-react'
import { divisions, generalRules, multiDivisionRules, musicRequirements, venueConsiderations } from '../data/rules'
import Container from '../components/ui/Container'
import GlowCard from '../components/ui/GlowCard'
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
  'Trophy': 'sunset',
  'Zap': 'neon',
  'Sparkles': 'cyan',
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const accordionVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
      opacity: { duration: 0.2 }
    }
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
      opacity: { duration: 0.3, delay: 0.1 }
    }
  },
}

function AccordionItem({ division, isOpen, onToggle, index, isDark }) {
  const IconComponent = iconMap[division.icon]
  const glowColor = glowColorMap[division.icon]

  return (
    <AnimatedSection animation="fadeUp" delay={0.1 + index * 0.1}>
      <GlowCard glowColor={glowColor} id={division.id}>
        <div className="overflow-hidden">
          {/* Accordion Header */}
          <button
            onClick={onToggle}
            className={`w-full p-6 md:p-8 flex items-center justify-between text-left transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-surface-100'}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-grass" />
              </div>
              <div>
                <h3 className={`text-xl font-display font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>{division.name}</h3>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-surface-600'} mt-1`}>{division.description}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex-shrink-0 ml-4"
            >
              <ChevronDown className={`w-6 h-6 ${isDark ? 'text-white/60' : 'text-surface-500'}`} />
            </motion.div>
          </button>

          {/* Accordion Content */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                variants={accordionVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="overflow-hidden"
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <div className={`border-t ${isDark ? 'border-white/10' : 'border-light-300'} pt-6`}>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Eligibility */}
                      <div className="space-y-2">
                        <span className="text-xs text-grass font-semibold uppercase tracking-wider">
                          Eligibility
                        </span>
                        <p className={isDark ? 'text-white/80' : 'text-surface-700'}>{division.eligibility}</p>
                      </div>

                      {/* Format */}
                      <div className="space-y-2">
                        <span className="text-xs text-cal-red-light font-semibold uppercase tracking-wider">
                          Format
                        </span>
                        <p className={isDark ? 'text-white/80' : 'text-surface-700'}>{division.format}</p>
                      </div>
                    </div>

                    {/* Detailed Rules */}
                    <div className="space-y-2">
                      <span className="text-xs text-gold font-semibold uppercase tracking-wider">
                        Division Rules
                      </span>
                      <ul className="space-y-3 mt-3">
                        {division.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-grass to-grass-dark mt-2 flex-shrink-0" />
                            <span className={isDark ? 'text-white/70' : 'text-surface-600'}>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlowCard>
    </AnimatedSection>
  )
}

function RulesPage() {
  const { isDark } = useTheme()
  const [openDivisions, setOpenDivisions] = useState(new Set([divisions[0]?.id]))

  const toggleDivision = (id) => {
    setOpenDivisions((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

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
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-grass/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <AnimatedSection animation="fadeUp" className="text-center">
            <Badge variant="success" className="mb-6">
              Based on 2024 NYYL Rules
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6">
              <GradientText gradient="cal">COMPETITION RULES</GradientText>
            </h1>
            <p className={`text-xl ${isDark ? 'text-white/60' : 'text-surface-600'} max-w-2xl mx-auto`}>
              Complete rules and guidelines for all competition divisions
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Division Rules Accordions */}
      <section className="py-12">
        <Container>
          <AnimatedSection animation="fadeUp" className="mb-8">
            <h2 className={`text-2xl font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-surface-900'}`}>
              Division Rules
            </h2>
            <p className={isDark ? 'text-white/60' : 'text-surface-600'}>
              Click on each division to view detailed rules and requirements
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {divisions.map((division, index) => (
              <AccordionItem
                key={division.id}
                division={division}
                isOpen={openDivisions.has(division.id)}
                onToggle={() => toggleDivision(division.id)}
                index={index}
                isDark={isDark}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Multi-Division Participation Rules */}
      <section className="py-16">
        <Container>
          <AnimatedSection animation="fadeUp">
            <GlowCard glowColor="grass">
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-grass/20 to-grass-dark/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-grass" />
                  </div>
                  <h2 className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>
                    Multi-Division Participation
                  </h2>
                </div>

                <p className={`${isDark ? 'text-white/60' : 'text-surface-600'} mb-6`}>
                  Want to compete in multiple divisions? Here is what is allowed:
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {multiDivisionRules.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        item.allowed
                          ? 'bg-grass/5 border-grass/20'
                          : 'bg-cal-red-light/5 border-cal-red-light/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {item.allowed ? (
                          <CheckCircle className="w-5 h-5 text-grass flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-cal-red-light flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-surface-900'} mb-1`}>{item.rule}</h4>
                          <p className={`${isDark ? 'text-white/60' : 'text-surface-600'} text-sm`}>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlowCard>
          </AnimatedSection>
        </Container>
      </section>

      {/* Music Requirements */}
      <section className="py-12">
        <Container>
          <AnimatedSection animation="fadeUp">
            <GlowCard glowColor="cal">
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cal-red-light/20 to-cal-red/20 flex items-center justify-center">
                    <Music className="w-5 h-5 text-cal-red" />
                  </div>
                  <h2 className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>
                    Music Requirements
                  </h2>
                </div>

                <ul className="space-y-4">
                  {musicRequirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-r from-cal-red-light to-cal-red flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span className={isDark ? 'text-white/80' : 'text-surface-700'}>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          </AnimatedSection>
        </Container>
      </section>

      {/* General Rules Section */}
      <section className="py-12">
        <Container>
          <AnimatedSection animation="fadeUp">
            <GlowCard glowColor="gold">
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-cal-red-light/20 flex items-center justify-center">
                    <Info className="w-5 h-5 text-gold" />
                  </div>
                  <h2 className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>
                    General Rules
                  </h2>
                </div>

                <ul className="space-y-4">
                  {generalRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-r from-gold to-cal-red-light flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span className={isDark ? 'text-white/80' : 'text-surface-700'}>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          </AnimatedSection>
        </Container>
      </section>

      {/* Venue Note Section */}
      <section className="py-12 pb-24">
        <Container>
          <AnimatedSection animation="fadeUp">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-grass-dark/10 via-grass/10 to-grass-dark/10" />
              <div className="relative glass p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-grass/20 to-grass-dark/20 flex items-center justify-center flex-shrink-0">
                    <Wind className="w-6 h-6 text-grass" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-display font-bold mb-1 ${isDark ? 'text-white' : 'text-surface-900'}`}>
                      {venueConsiderations.title}
                    </h3>
                    <p className={isDark ? 'text-white/70' : 'text-surface-600'}>
                      {venueConsiderations.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </motion.div>
  )
}

export default RulesPage
