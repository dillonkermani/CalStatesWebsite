import { motion } from 'framer-motion'
import { Building, MapPin, Car, Plane, ParkingCircle, Clock, ExternalLink, Phone } from 'lucide-react'
import { hotel, travel, alternateHotels } from '../data/lodging'
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

        {/* Official Hotel Block */}
        <AnimatedSection animation="fadeUp" delay={0.1} className="mb-12">
          <GlowCard glowColor="gold" className="max-w-3xl mx-auto">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  isDark
                    ? 'bg-gradient-to-br from-gold/20 to-gold-dark/20'
                    : 'bg-gradient-to-br from-gold/10 to-gold-dark/10'
                }`}>
                  <Building className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h2 className={`text-2xl md:text-3xl font-display font-bold ${
                    isDark ? 'text-white' : 'text-surface-900'
                  }`}>
                    {hotel.name}
                  </h2>
                  <p className={`text-sm mt-1 ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                    Official Contest Hotel
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {hotel.features.map((feature) => (
                  <div
                    key={feature}
                    className={`flex items-start gap-2 p-3 rounded-lg ${
                      isDark ? 'bg-surface-700/30' : 'bg-light-100'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                    <span className={`text-sm ${isDark ? 'text-white/80' : 'text-surface-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className={`flex items-center gap-2 mb-6 p-3 rounded-lg border ${
                isDark
                  ? 'bg-gold/10 border-gold/20'
                  : 'bg-gold/5 border-gold/20'
              }`}>
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-surface-700'}`}>
                  Booking deadline: <span className="text-gold font-bold">{hotel.bookingDeadline}</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={hotel.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-surface-900 font-semibold hover:bg-gold-dark transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Book Online
                </a>
                <a
                  href={`tel:${hotel.phone}`}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-semibold transition-colors ${
                    isDark
                      ? 'border-white/20 text-white hover:bg-white/5'
                      : 'border-light-300 text-surface-900 hover:bg-light-100'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  Call Hotel
                </a>
              </div>
            </div>
          </GlowCard>
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
