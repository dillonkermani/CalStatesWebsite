import { motion } from 'framer-motion'
import { Clock, Trophy, Coffee, Award, Flag, UserCheck } from 'lucide-react'
import { schedule } from '../data/schedule'
import Container from '../components/ui/Container'
import GradientText from '../components/ui/GradientText'
import AnimatedSection from '../components/ui/AnimatedSection'
import { useTheme } from '../hooks/useTheme'

const typeConfig = {
  competition: {
    color: 'cal-red',
    bgColor: 'bg-cal-red/10',
    borderColor: 'border-cal-red/30',
    glowColor: 'shadow-cal-red',
    icon: Trophy,
  },
  break: {
    color: 'bear-tan',
    bgColor: 'bg-bear-tan/10',
    borderColor: 'border-bear-tan/30',
    glowColor: 'shadow-[0_0_20px_rgba(254,228,64,0.3)]',
    icon: Coffee,
  },
  ceremony: {
    color: 'grass',
    bgColor: 'bg-grass/10',
    borderColor: 'border-grass/30',
    glowColor: 'shadow-grass',
    icon: Award,
  },
  registration: {
    color: 'grass-dark',
    bgColor: 'bg-grass-dark/10',
    borderColor: 'border-grass-dark/30',
    glowColor: 'shadow-[0_0_20px_rgba(76,201,240,0.3)]',
    icon: UserCheck,
  },
  end: {
    color: 'bear-medium',
    bgColor: 'bg-bear-medium/10',
    borderColor: 'border-bear-medium/30',
    glowColor: 'shadow-glow',
    icon: Flag,
  },
}

function TimelineNode({ type, isActive, isDark }) {
  const config = typeConfig[type] || typeConfig.competition
  const Icon = config.icon

  return (
    <motion.div
      className={`
        relative z-10 w-12 h-12 rounded-full
        ${config.bgColor} ${config.borderColor}
        border-2 flex items-center justify-center
        transition-all duration-300
        ${isActive && isDark ? config.glowColor : ''}
      `}
      whileHover={{ scale: 1.1 }}
    >
      <Icon className={`w-5 h-5 text-${config.color}`} />
      {/* Pulse effect */}
      <motion.div
        className={`absolute inset-0 rounded-full ${config.bgColor} opacity-50`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  )
}

function SchedulePage() {
  const { isDark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24 pb-16"
    >
      {/* Page Header */}
      <section className="py-16">
        <Container>
          <AnimatedSection className="text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <GradientText>EVENT SCHEDULE</GradientText>
            </h1>
            <p className={`text-xl md:text-2xl font-mono ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
              April 11, 2026 &bull; Chico City Plaza
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-12">
        <Container size="lg">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-grass via-cal-red to-bear-medium hidden md:block">
              {/* Glowing effect on the line */}
              {isDark && (
                <div className="absolute inset-0 w-full bg-gradient-to-b from-grass via-cal-red to-bear-medium blur-sm opacity-50" />
              )}
            </div>

            {/* Mobile timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-grass via-cal-red to-bear-medium md:hidden">
              {isDark && (
                <div className="absolute inset-0 w-full bg-gradient-to-b from-grass via-cal-red to-bear-medium blur-sm opacity-50" />
              )}
            </div>

            {/* Timeline events */}
            <div className="space-y-12">
              {schedule.map((event, index) => (
                <div key={index} className="relative">
                  {/* Desktop layout */}
                  <div className="hidden md:flex items-center">
                    {/* Left side content (even indices) */}
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : ''}`}>
                      {index % 2 === 0 && (
                        <AnimatedSection delay={index * 0.1} animation="fadeRight">
                          <TimelineCardDesktop event={event} align="right" isDark={isDark} />
                        </AnimatedSection>
                      )}
                    </div>

                    {/* Center node */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-20">
                      <AnimatedSection delay={index * 0.1} animation="scale">
                        <TimelineNode type={event.type} isActive isDark={isDark} />
                      </AnimatedSection>
                    </div>

                    {/* Right side content (odd indices) */}
                    <div className={`w-1/2 ${index % 2 !== 0 ? 'pl-12' : ''}`}>
                      {index % 2 !== 0 && (
                        <AnimatedSection delay={index * 0.1} animation="fadeLeft">
                          <TimelineCardDesktop event={event} align="left" isDark={isDark} />
                        </AnimatedSection>
                      )}
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden flex items-start gap-6">
                    {/* Node */}
                    <div className="flex-shrink-0 z-20">
                      <AnimatedSection delay={index * 0.1} animation="scale">
                        <TimelineNode type={event.type} isActive isDark={isDark} />
                      </AnimatedSection>
                    </div>

                    {/* Card */}
                    <div className="flex-1 pb-4">
                      <AnimatedSection delay={index * 0.1} animation="fadeLeft">
                        <TimelineCardDesktop event={event} align="left" isDark={isDark} />
                      </AnimatedSection>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <Container>
          <AnimatedSection className="text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
              isDark
                ? 'bg-surface-700/50 border-white/10'
                : 'bg-white border-light-300 shadow-sm'
            }`}>
              <Clock className="w-4 h-4 text-grass" />
              <span className={`text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                Schedule subject to minor changes
              </span>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </motion.div>
  )
}

function TimelineCardDesktop({ event, align, isDark }) {
  const config = typeConfig[event.type] || typeConfig.competition
  const Icon = config.icon

  return (
    <motion.div
      className={`
        relative p-6 rounded-2xl
        backdrop-blur-xl
        border ${config.borderColor}
        transition-all duration-300
        group
        ${align === 'right' ? 'text-right' : 'text-left'}
        ${isDark ? 'bg-surface-800/60' : 'bg-white/90 shadow-sm'}
      `}
      whileHover={{
        y: -4,
        boxShadow: isDark ? (
          event.type === 'competition'
            ? '0 0 30px rgba(247, 37, 133, 0.3)'
            : event.type === 'break'
            ? '0 0 30px rgba(254, 228, 64, 0.3)'
            : event.type === 'ceremony'
            ? '0 0 30px rgba(0, 245, 212, 0.3)'
            : '0 0 30px rgba(76, 201, 240, 0.3)'
        ) : '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Gradient overlay on hover */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
        bg-gradient-to-br ${config.bgColor}
        transition-opacity duration-300
      `} />

      <div className="relative z-10">
        {/* Time badge */}
        <div className={`
          inline-flex items-center gap-2 px-3 py-1 rounded-full
          ${config.bgColor} ${config.borderColor} border
          mb-3
        `}>
          <Clock className={`w-3.5 h-3.5 text-${config.color}`} />
          <span className={`font-mono text-sm font-semibold text-${config.color}`}>
            {event.time}
          </span>
        </div>

        {/* Event name */}
        <h3 className={`text-xl font-display font-bold mb-2 ${
          isDark ? 'text-white' : 'text-surface-900'
        }`}>
          {event.event}
        </h3>

        {/* Description */}
        <p className={`text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
          {event.description}
        </p>

        {/* Type indicator */}
        <div className={`mt-4 flex items-center gap-2 ${align === 'right' ? 'justify-end' : ''}`}>
          <Icon className={`w-4 h-4 text-${config.color}`} />
          <span className={`text-xs uppercase tracking-wider ${
            isDark ? 'text-white/40' : 'text-surface-400'
          }`}>
            {event.type}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default SchedulePage
