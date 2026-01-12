import { motion } from 'framer-motion'
import { Building, Phone, MapPin, Car, Plane, ParkingCircle, Clock, ExternalLink, Copy, Check, Tag } from 'lucide-react'
import { useState } from 'react'
import { hotel, travel, alternateHotels } from '../data/lodging'
import Container from '../components/ui/Container'
import GlowCard from '../components/ui/GlowCard'
import Button from '../components/ui/Button'
import GradientText from '../components/ui/GradientText'
import AnimatedSection from '../components/ui/AnimatedSection'
import { useTheme } from '../hooks/useTheme'

function LodgingPage() {
  const { isDark } = useTheme()
  const [copied, setCopied] = useState(false)

  const handleBookNow = () => {
    window.open(hotel.bookingUrl, '_blank')
  }

  const copyBookingCode = async () => {
    try {
      await navigator.clipboard.writeText(hotel.bookingCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy booking code:', err)
    }
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
            <Building className="w-8 h-8 text-grass" />
            <span className="text-sm font-mono text-grass tracking-wider uppercase">
              Accommodations
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            <GradientText>HOTEL & TRAVEL</GradientText>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
            Book your stay for the California State Yo-Yo Contest.
            We have a special room block at our partner hotel.
          </p>
        </AnimatedSection>

        {/* Featured Hotel Card */}
        <AnimatedSection animation="fadeUp" delay={0.1} className="mb-12">
          <GlowCard glowColor="grass" className="max-w-3xl mx-auto">
            <div className="p-8">
              {/* Hotel Header */}
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <div>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-semibold text-grass border rounded-full mb-3 ${
                    isDark ? 'bg-grass/10 border-grass/30' : 'bg-grass/10 border-grass/20'
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-grass animate-pulse" />
                    OFFICIAL PARTNER HOTEL
                  </span>
                  <h2 className={`text-2xl md:text-3xl font-display font-bold ${
                    isDark ? 'text-white' : 'text-surface-900'
                  }`}>
                    {hotel.name}
                  </h2>
                  <p className={`text-sm mt-1 italic ${isDark ? 'text-white/60' : 'text-surface-500'}`}>
                    {hotel.note}
                  </p>
                </div>
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                  isDark
                    ? 'bg-gradient-to-br from-grass/20 to-grass-dark/20'
                    : 'bg-gradient-to-br from-grass/10 to-grass-dark/10'
                }`}>
                  <Building className="w-8 h-8 text-grass" />
                </div>
              </div>

              {/* Booking Code Highlight */}
              <div className={`mb-6 p-4 rounded-xl border ${
                isDark
                  ? 'bg-gradient-to-r from-bear-tan/10 to-bear-light/10 border-bear-tan/30'
                  : 'bg-gradient-to-r from-bear-tan/5 to-bear-light/5 border-bear-tan/20'
              }`}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Tag className="w-6 h-6 text-bear-tan" />
                    <div>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                        Group Booking Code
                      </p>
                      <p className="text-2xl font-mono font-bold text-bear-tan tracking-wider">
                        {hotel.bookingCode}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={copyBookingCode}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10 border-white/10'
                        : 'bg-surface-100 hover:bg-surface-200 border-light-300'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-grass" />
                        <span className="text-grass text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className={`w-4 h-4 ${isDark ? 'text-white/60' : 'text-surface-500'}`} />
                        <span className={`text-sm ${isDark ? 'text-white/60' : 'text-surface-500'}`}>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Hotel Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cal-red mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`text-sm mb-1 ${isDark ? 'text-white/40' : 'text-surface-500'}`}>Address</p>
                    <p className={isDark ? 'text-white/80' : 'text-surface-700'}>{hotel.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cal-red mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`text-sm mb-1 ${isDark ? 'text-white/40' : 'text-surface-500'}`}>Phone</p>
                    <a href={`tel:${hotel.phone}`} className={`hover:text-grass transition-colors ${
                      isDark ? 'text-white/80' : 'text-surface-700'
                    }`}>
                      {hotel.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-bear-tan mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`text-sm mb-1 ${isDark ? 'text-white/40' : 'text-surface-500'}`}>Distance from Venue</p>
                    <p className={isDark ? 'text-white/80' : 'text-surface-700'}>{hotel.distance}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-bear-tan mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`text-sm mb-1 ${isDark ? 'text-white/40' : 'text-surface-500'}`}>Room Block Dates</p>
                    <p className={isDark ? 'text-white/80' : 'text-surface-700'}>{hotel.bookingDates}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className={`rounded-xl p-4 mb-6 ${
                isDark ? 'bg-surface-700/30' : 'bg-light-100'
              }`}>
                <p className={`text-sm mb-2 ${isDark ? 'text-white/40' : 'text-surface-500'}`}>Room Block Features</p>
                <ul className="space-y-2">
                  {hotel.features.map((feature, index) => (
                    <li key={index} className={`flex items-center gap-2 ${isDark ? 'text-white/80' : 'text-surface-700'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-grass" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-cal-red mt-3 font-semibold">
                  Book by {hotel.bookingDeadline} for discounted rates
                </p>
              </div>

              {/* Book Now Button */}
              <Button
                variant="primary"
                size="lg"
                onClick={handleBookNow}
                className="w-full md:w-auto"
              >
                Book Now with Group Rate
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </GlowCard>
        </AnimatedSection>

        {/* Alternate Hotels */}
        <AnimatedSection animation="fadeUp" delay={0.15} className="mb-12">
          <div className="max-w-3xl mx-auto">
            <h3 className={`text-xl font-display font-bold mb-4 text-center ${
              isDark ? 'text-white' : 'text-surface-900'
            }`}>
              Other Nearby Hotels
            </h3>
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
            <GlowCard glowColor="bear" className="h-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDark
                      ? 'bg-gradient-to-br from-bear-light/20 to-cal-red/20'
                      : 'bg-gradient-to-br from-bear-light/10 to-cal-red/10'
                  }`}>
                    <Plane className="w-6 h-6 text-bear-light" />
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
                    <Car className="w-5 h-5 text-bear-tan mt-0.5 flex-shrink-0" />
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
                      Near Chico City Plaza - just steps away from the competition venue
                    </p>
                  </div>

                  <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                    <div className="w-2 h-2 rounded-full bg-bear-tan" />
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
            isDark ? 'bg-bear-medium/10' : 'bg-bear-medium/5'
          }`} />
        </div>
      </Container>
    </motion.div>
  )
}

export default LodgingPage
