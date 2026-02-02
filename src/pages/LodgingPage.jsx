import { motion } from 'framer-motion'
import { Building, MapPin, Car, Plane, ParkingCircle, Clock, Bell } from 'lucide-react'
import { travel, alternateHotels } from '../data/lodging'
import Container from '../components/ui/Container'
import GlowCard from '../components/ui/GlowCard'
import GradientText from '../components/ui/GradientText'
import AnimatedSection from '../components/ui/AnimatedSection'
import { useTheme } from '../hooks/useTheme'

function LodgingPage() {
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
            <Building className="w-8 h-8 text-grass" />
            <span className="text-sm font-mono text-grass tracking-wider uppercase">
              Accommodations
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            <GradientText>HOTEL & TRAVEL</GradientText>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
            Planning your trip to the California State Yo-Yo Contest?
            Here's what you need to know about travel and accommodations.
          </p>
        </AnimatedSection>

        {/* Lodging TBD Notice */}
        <AnimatedSection animation="fadeUp" delay={0.1} className="mb-12">
          <GlowCard glowColor="gold" className="max-w-3xl mx-auto">
            <div className="p-8 text-center">
              <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 ${
                isDark
                  ? 'bg-gradient-to-br from-gold/20 to-gold-dark/20'
                  : 'bg-gradient-to-br from-gold/10 to-gold-dark/10'
              }`}>
                <Bell className="w-10 h-10 text-gold" />
              </div>
              <h2 className={`text-2xl md:text-3xl font-display font-bold mb-4 ${
                isDark ? 'text-white' : 'text-surface-900'
              }`}>
                2026 Hotel Block Coming Soon
              </h2>
              <p className={`text-lg mb-6 ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                We're currently working on securing a hotel room block for the 2026 contest.
                Check back soon for official partner hotel information and discounted rates!
              </p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                isDark
                  ? 'bg-surface-700/50 border-white/10'
                  : 'bg-white border-light-300 shadow-sm'
              }`}>
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className={`text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                  Lodging details to be announced
                </span>
              </div>
            </div>
          </GlowCard>
        </AnimatedSection>

        {/* Nearby Hotels - General Reference */}
        <AnimatedSection animation="fadeUp" delay={0.15} className="mb-12">
          <div className="max-w-3xl mx-auto">
            <h3 className={`text-xl font-display font-bold mb-2 text-center ${
              isDark ? 'text-white' : 'text-surface-900'
            }`}>
              Hotels Near the Venue
            </h3>
            <p className={`text-center mb-6 ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
              While we finalize the official hotel block, here are some nearby options to consider:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {alternateHotels.map((altHotel) => (
                <div
                  key={altHotel.name}
                  className={`p-4 rounded-xl border ${
                    isDark
                      ? 'bg-surface-700/30 border-white/5'
                      : 'bg-white border-light-300'
                  }`}
                >
                  <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-surface-900'}`}>
                    {altHotel.name}
                  </h4>
                  <p className={`text-sm mb-1 ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                    {altHotel.distance}
                  </p>
                  <a
                    href={`tel:${altHotel.phone}`}
                    className="text-grass text-sm hover:underline"
                  >
                    {altHotel.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Travel & Parking Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Travel Information */}
          <AnimatedSection animation="fadeLeft" delay={0.2}>
            <GlowCard glowColor="gold" className="h-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDark
                      ? 'bg-gradient-to-br from-gold/20 to-cal-red/20'
                      : 'bg-gradient-to-br from-gold/10 to-cal-red/10'
                  }`}>
                    <Plane className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className={`text-xl font-display font-bold ${
                    isDark ? 'text-white' : 'text-surface-900'
                  }`}>
                    Travel Information
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className={`flex items-start gap-3 p-3 rounded-lg ${
                    isDark ? 'bg-surface-700/30' : 'bg-light-100'
                  }`}>
                    <MapPin className="w-5 h-5 text-cal-red mt-0.5 flex-shrink-0" />
                    <div>
                      <p className={`text-sm mb-1 ${isDark ? 'text-white/40' : 'text-surface-500'}`}>From Sacramento</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-surface-900'}`}>{travel.fromSacramento}</p>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-lg ${
                    isDark ? 'bg-surface-700/30' : 'bg-light-100'
                  }`}>
                    <MapPin className="w-5 h-5 text-cal-red mt-0.5 flex-shrink-0" />
                    <div>
                      <p className={`text-sm mb-1 ${isDark ? 'text-white/40' : 'text-surface-500'}`}>From San Francisco</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-surface-900'}`}>{travel.fromSanFrancisco}</p>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-lg ${
                    isDark ? 'bg-surface-700/30' : 'bg-light-100'
                  }`}>
                    <MapPin className="w-5 h-5 text-cal-red mt-0.5 flex-shrink-0" />
                    <div>
                      <p className={`text-sm mb-1 ${isDark ? 'text-white/40' : 'text-surface-500'}`}>From Los Angeles</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-surface-900'}`}>{travel.fromLosAngeles}</p>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-lg ${
                    isDark ? 'bg-surface-700/30' : 'bg-light-100'
                  }`}>
                    <Plane className="w-5 h-5 text-grass mt-0.5 flex-shrink-0" />
                    <div>
                      <p className={`text-sm mb-1 ${isDark ? 'text-white/40' : 'text-surface-500'}`}>Recommended Airport</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-surface-900'}`}>{travel.recommendedAirport}</p>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-lg ${
                    isDark ? 'bg-surface-700/30' : 'bg-light-100'
                  }`}>
                    <Car className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className={`text-sm mb-1 ${isDark ? 'text-white/40' : 'text-surface-500'}`}>Transportation</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-surface-900'}`}>{travel.transportation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </AnimatedSection>

          {/* Parking Information */}
          <AnimatedSection animation="fadeRight" delay={0.3}>
            <GlowCard glowColor="grass" className="h-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDark
                      ? 'bg-gradient-to-br from-grass/20 to-grass-dark/20'
                      : 'bg-gradient-to-br from-grass/10 to-grass-dark/10'
                  }`}>
                    <ParkingCircle className="w-6 h-6 text-grass" />
                  </div>
                  <h3 className={`text-xl font-display font-bold ${
                    isDark ? 'text-white' : 'text-surface-900'
                  }`}>
                    Parking Information
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border ${
                    isDark
                      ? 'bg-gradient-to-br from-grass/5 to-grass-dark/5 border-grass/20'
                      : 'bg-gradient-to-br from-grass/5 to-grass-dark/5 border-grass/20'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-display font-bold text-grass">FREE</span>
                      <span className={isDark ? 'text-white/60' : 'text-surface-600'}>parking available</span>
                    </div>
                    <p className={isDark ? 'text-white/80' : 'text-surface-700'}>
                      {travel.parking}
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${isDark ? 'bg-surface-700/30' : 'bg-light-100'}`}>
                    <p className={`text-sm mb-2 ${isDark ? 'text-white/40' : 'text-surface-500'}`}>Location</p>
                    <p className={isDark ? 'text-white/80' : 'text-surface-700'}>
                      Near Chico Women's Club - just steps away from the competition venue
                    </p>
                  </div>

                  <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <span>{travel.parkingNote}</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </AnimatedSection>
        </div>

        {/* Decorative Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className={`absolute top-1/4 -right-32 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-grass/10' : 'bg-grass/5'
          }`} />
          <div className={`absolute bottom-1/4 -left-32 w-96 h-96 rounded-full blur-3xl ${
            isDark ? 'bg-gold/10' : 'bg-gold/5'
          }`} />
        </div>
      </Container>
    </motion.div>
  )
}

export default LodgingPage
