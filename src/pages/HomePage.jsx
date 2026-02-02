import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Trophy, Users, ChevronDown, Star, Clock, Building2, HandHeart, ClipboardCheck, Camera, Wrench } from 'lucide-react'
import CountdownTimer from '../components/ui/CountdownTimer'
import GlowCard from '../components/ui/GlowCard'
import Button from '../components/ui/Button'
import AnimatedSection from '../components/ui/AnimatedSection'
import GradientText from '../components/ui/GradientText'
import Container from '../components/ui/Container'
import { useTheme } from '../hooks/useTheme'

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

// Floating particle component
function FloatingParticle({ delay, duration, x, y, size }) {
  const { isDark } = useTheme()

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: isDark
          ? 'radial-gradient(circle, rgba(0, 245, 212, 0.4) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(124, 181, 24, 0.3) 0%, transparent 70%)',
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// Animated mesh background
function MeshBackground() {
  const { isDark } = useTheme()

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary gradient mesh */}
      <div className={`absolute inset-0 ${
        isDark
          ? 'bg-gradient-to-br from-gold/10 via-surface-900 to-cal-red/10'
          : 'bg-gradient-to-br from-grass/10 via-light-100 to-cal-red/5'
      }`} />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(255, 56, 100, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(196, 30, 58, 0.08) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(157, 78, 221, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(124, 181, 24, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(196, 30, 58, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      <FloatingParticle delay={0} duration={6} x={10} y={20} size={8} />
      <FloatingParticle delay={1} duration={8} x={85} y={15} size={6} />
      <FloatingParticle delay={2} duration={7} x={70} y={60} size={10} />
      <FloatingParticle delay={0.5} duration={9} x={25} y={70} size={7} />
      <FloatingParticle delay={3} duration={6} x={50} y={30} size={5} />
      <FloatingParticle delay={1.5} duration={8} x={90} y={80} size={8} />
      <FloatingParticle delay={2.5} duration={7} x={15} y={85} size={6} />

      {/* Grid overlay */}
      <div
        className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.02]'}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(${isDark ? '255,255,255' : '0,0,0'},0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${isDark ? '255,255,255' : '0,0,0'},0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  )
}

// Scroll indicator component
function ScrollIndicator() {
  const { isDark } = useTheme()

  return (
    <motion.div
      className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center gap-2 cursor-pointer z-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      onClick={() => {
        document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <span className={`text-sm tracking-wider uppercase ${isDark ? 'text-gray-400' : 'text-surface-500'}`}>Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6 text-gold" />
      </motion.div>
    </motion.div>
  )
}

// Hero section
function HeroSection() {
  const { isDark } = useTheme()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MeshBackground />

      <Container className="relative z-10 pt-24 pb-32">
        <div className="flex flex-col items-center text-center">
          {/* Year badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className={`inline-flex items-center px-4 py-2 rounded-full backdrop-blur-xl border text-gold font-mono text-sm tracking-wider ${
              isDark
                ? 'bg-surface-800/60 border-gold/30'
                : 'bg-white/80 border-gold/40 shadow-sm'
            }`}>
              <Star className="w-4 h-4 mr-2" />
              2026
            </span>
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="font-display font-bold tracking-tight">
              <span className={`block text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2 ${
                isDark ? 'text-white' : 'text-surface-900'
              }`}>
                CALIFORNIA STATE
              </span>
              <GradientText
                as="span"
                gradient="cal"
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              >
                YO-YO CONTEST
              </GradientText>
            </h1>
          </motion.div>

          {/* Event details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`mt-8 flex flex-wrap items-center justify-center gap-4 ${
              isDark ? 'text-gray-300' : 'text-surface-600'
            }`}
          >
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${
              isDark
                ? 'bg-surface-800/40 border-white/5'
                : 'bg-white/80 border-light-300 shadow-sm'
            }`}>
              <Calendar className="w-5 h-5 text-cal-red" />
              <span className="font-medium">April 25, 2026</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${
              isDark
                ? 'bg-surface-800/40 border-white/5'
                : 'bg-white/80 border-light-300 shadow-sm'
            }`}>
              <MapPin className="w-5 h-5 text-gold" />
              <span className="font-medium">Chico Women's Club</span>
            </div>
          </motion.div>

          {/* Countdown timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 w-full"
          >
            <CountdownTimer />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/schedule">
              <Button variant="primary" size="lg">
                <Calendar className="w-5 h-5" />
                View Schedule
              </Button>
            </Link>
            <Link to="/compete">
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>

      <ScrollIndicator />
    </section>
  )
}

// About section
function AboutSection() {
  const { isDark } = useTheme()

  const highlights = [
    {
      icon: Users,
      title: 'Free Spectating',
      description: 'Watch the best yo-yo players compete at no cost.',
      glowColor: 'grass',
    },
    {
      icon: Building2,
      title: 'Historic Venue',
      description: 'Held at the beautiful Chico Women\'s Club',
      glowColor: 'gold',
    },
    {
      icon: Trophy,
      title: 'Multiple Divisions',
      description: 'Categories for all skill levels and styles.',
      glowColor: 'grass',
    },
    {
      icon: Star,
      title: 'National Yo-Yo Museum',
      description: 'Visit the nearby National Yo-Yo Museum.',
      glowColor: 'cal',
    },
  ]

  return (
    <section id="about-section" className="relative py-24 sm:py-32">
      <Container>
        <AnimatedSection animation="fadeUp" className="text-center mb-16">
          <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-surface-900'
          }`}>
            One of California's Premier{' '}
            <GradientText gradient="cal">Yo-Yo Events</GradientText>
          </h2>
          <p className={`max-w-3xl mx-auto text-lg leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-surface-600'
          }`}>
            The California State Yo-Yo Contest is one of the longest-running and most
            renowned state yo-yo competitions in the United States. Join us for an
            unforgettable day of skill, artistry, and community in beautiful Chico, California.
          </p>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeUp"
          staggerChildren
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => (
            <GlowCard key={index} glowColor={item.glowColor}>
              <div className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                  isDark ? 'bg-surface-700/50' : 'bg-grass/10'
                }`}>
                  <item.icon className="w-7 h-7 text-grass" />
                </div>
                <h3 className={`font-display text-lg font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-surface-900'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-surface-600'
                }`}>
                  {item.description}
                </p>
              </div>
            </GlowCard>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  )
}

// Quick links section
function QuickLinksSection() {
  const { isDark } = useTheme()

  const links = [
    {
      to: '/schedule',
      icon: Clock,
      title: 'Schedule',
      description: 'View the full event timeline and competition schedule',
      glowColor: 'grass',
    },
    {
      to: '/compete',
      icon: Trophy,
      title: 'Compete',
      description: 'Register to compete and learn about divisions',
      glowColor: 'gold',
    },
    {
      to: '/location',
      icon: MapPin,
      title: 'Location',
      description: 'Find directions and venue information',
      glowColor: 'grass',
    },
    {
      to: '/results',
      icon: Star,
      title: 'Results',
      description: 'View 2026 competition results after the contest',
      glowColor: 'cal',
    },
  ]

  return (
    <section className={`relative py-24 sm:py-32 ${isDark ? 'bg-surface-800/30' : 'bg-light-200/50'}`}>
      {/* Background gradient */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark
          ? 'bg-gradient-to-b from-surface-900 via-transparent to-surface-900'
          : 'bg-gradient-to-b from-light-100 via-transparent to-light-100'
      }`} />

      <Container className="relative z-10">
        <AnimatedSection animation="fadeUp" className="text-center mb-16">
          <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-surface-900'
          }`}>
            Quick Links
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${isDark ? 'text-gray-400' : 'text-surface-600'}`}>
            Everything you need to know about Cal States 2026
          </p>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeUp"
          staggerChildren
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {links.map((link, index) => (
            <Link key={index} to={link.to} className="block">
              <GlowCard glowColor={link.glowColor} className="h-full">
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl border mb-5 ${
                    isDark
                      ? 'bg-gradient-to-br from-surface-700/80 to-surface-800/80 border-white/5'
                      : 'bg-gradient-to-br from-white to-light-100 border-light-300'
                  }`}>
                    <link.icon className="w-8 h-8 text-grass" />
                  </div>
                  <h3 className={`font-display text-xl font-semibold mb-3 ${
                    isDark ? 'text-white' : 'text-surface-900'
                  }`}>
                    {link.title}
                  </h3>
                  <p className={`text-sm leading-relaxed flex-1 ${
                    isDark ? 'text-gray-400' : 'text-surface-600'
                  }`}>
                    {link.description}
                  </p>
                  <motion.span
                    className="mt-4 text-grass text-sm font-medium inline-flex items-center gap-1"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    Explore
                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </motion.span>
                </div>
              </GlowCard>
            </Link>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  )
}

// Volunteer section
function VolunteerSection() {
  const { isDark } = useTheme()

  const volunteerRoles = [
    {
      icon: ClipboardCheck,
      title: 'Judging',
      description: 'Score competitor performances using NYYL standards',
    },
    {
      icon: Users,
      title: 'Check-in',
      description: 'Welcome competitors and distribute materials',
    },
    {
      icon: Camera,
      title: 'Media',
      description: 'Capture performances and event moments',
    },
    {
      icon: Wrench,
      title: 'Setup',
      description: 'Help with stage setup and breakdown',
    },
  ]

  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <AnimatedSection animation="fadeUp" className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <HandHeart className="w-6 h-6 text-cal-red" />
            <span className="text-sm font-mono text-cal-red tracking-wider uppercase">
              Get Involved
            </span>
          </div>
          <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-surface-900'
          }`}>
            <GradientText gradient="cal">Volunteers Needed</GradientText>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-surface-600'
          }`}>
            Help make Cal States 2026 a success! The California State Yo-Yo Contest is organized
            through the National Yo-Yo League nonprofit. We need volunteers for:
          </p>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeUp"
          staggerChildren
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {volunteerRoles.map((role, index) => (
            <GlowCard key={index} glowColor="cal">
              <div className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
                  isDark ? 'bg-surface-700/50' : 'bg-cal-red/10'
                }`}>
                  <role.icon className="w-7 h-7 text-cal-red" />
                </div>
                <h3 className={`font-display text-lg font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-surface-900'
                }`}>
                  {role.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-surface-600'
                }`}>
                  {role.description}
                </p>
              </div>
            </GlowCard>
          ))}
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" className="text-center">
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              <HandHeart className="w-5 h-5" />
              Contact Us to Volunteer
            </Button>
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  )
}

// Main HomePage component
function HomePage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <HeroSection />
      <AboutSection />
      <VolunteerSection />
      <QuickLinksSection />
    </motion.div>
  )
}

export default HomePage
