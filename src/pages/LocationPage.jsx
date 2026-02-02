import { motion } from 'framer-motion'
import { MapPin, Navigation, Car, TreePine, Building, ExternalLink, Star, Camera, Ticket } from 'lucide-react'
import { venue, nearbyAttraction } from '../data/venue'
import Container from '../components/ui/Container'
import GlowCard from '../components/ui/GlowCard'
import Button from '../components/ui/Button'
import GradientText from '../components/ui/GradientText'
import AnimatedSection from '../components/ui/AnimatedSection'
import { useTheme } from '../hooks/useTheme'

const featureIcons = {
  'Permanent stage': Building,
  'Ample shade trees': TreePine,
  'Surrounded by shops and restaurants': Star,
  'Free spectator seating': Ticket,
}

function FeatureItem({ feature, isDark }) {
  const Icon = featureIcons[feature] || Star

  return (
    <motion.div
      className={`flex items-center gap-3 p-3 rounded-xl border ${
        isDark
          ? 'bg-surface-700/30 border-white/5'
          : 'bg-light-100 border-light-300'
      }`}
      whileHover={{ x: 4, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
        isDark ? 'bg-grass/10 border border-grass/30' : 'bg-grass/10'
      }`}>
        <Icon className="w-4 h-4 text-grass" />
      </div>
      <span className={`text-sm ${isDark ? 'text-white/80' : 'text-surface-700'}`}>{feature}</span>
    </motion.div>
  )
}

function LocationPage() {
  const { isDark } = useTheme()
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.8!2d-121.8406!3d39.7285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808327a5d5c0e8a9%3A0x9f7d6a9c9c9c9c9c!2s592%20E%203rd%20St%2C%20Chico%2C%20CA%2095928!5e0!3m2!1sen!2sus!4v1234567890`

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
              <GradientText>VENUE & LOCATION</GradientText>
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
              Join us at the historic Chico Women's Club for an unforgettable day of yo-yo competition
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* Main Venue Info */}
      <section className="py-12">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Venue Card */}
            <AnimatedSection delay={0.1}>
              <GlowCard glowColor="grass" className="h-full">
                <div className="p-8">
                  {/* Venue header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-grass to-grass-dark flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-surface-900" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-display font-bold mb-1 ${
                        isDark ? 'text-white' : 'text-surface-900'
                      }`}>
                        {venue.name}
                      </h2>
                      <p className={`font-mono text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>
                        {venue.address}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`mb-6 leading-relaxed ${isDark ? 'text-white/70' : 'text-surface-600'}`}>
                    {venue.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
                      isDark ? 'text-white/40' : 'text-surface-500'
                    }`}>
                      Venue Features
                    </h3>
                    {venue.features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} isDark={isDark} />
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full">
                      <Navigation className="w-4 h-4" />
                      Get Directions
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </a>
                </div>
              </GlowCard>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection delay={0.2}>
              <GlowCard glowColor="grass" className="h-full overflow-hidden">
                <iframe
                  src={googleMapsEmbedUrl}
                  className="w-full min-h-[400px] lg:min-h-[500px] block"
                  style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg) contrast(0.9)' : 'none', height: '100%' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Chico Women's Club Map"
                />
              </GlowCard>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Photo Gallery */}
      <section className="py-12">
        <Container>
          <AnimatedSection className="mb-8">
            <h2 className={`text-3xl font-display font-bold flex items-center gap-3 ${
              isDark ? 'text-white' : 'text-surface-900'
            }`}>
              <Camera className="w-8 h-8 text-cal-red" />
              Venue Gallery
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-4">
            {venue.images.map((image, index) => (
              <AnimatedSection key={index} delay={0.1 * index}>
                <motion.div
                  className={`relative aspect-video rounded-2xl overflow-hidden border group ${
                    isDark
                      ? 'bg-surface-700/50 border-white/10'
                      : 'bg-light-200 border-light-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Actual image */}
                  <img
                    src={image}
                    alt={`${venue.name} - View ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDark
                      ? 'bg-gradient-to-t from-surface-900/80 via-transparent to-transparent'
                      : 'bg-gradient-to-t from-black/30 via-transparent to-transparent'
                  }`} />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* National Yo-Yo Museum */}
      <section className="py-12">
        <Container>
          <AnimatedSection delay={0.1}>
            <GlowCard glowColor="cal">
              <div className="p-8 md:flex items-center gap-8">
                {/* Museum Image */}
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className={`aspect-square rounded-xl overflow-hidden border ${
                    isDark
                      ? 'border-cal-red/30'
                      : 'border-cal-red/20'
                  }`}>
                    <img
                      src="https://explore-butte.transforms.svdcdn.com/production/images/Arts-and-Culture/Yo-Yo-Museum/National-Yo-Yo-Museum_2019_Chico_4_OPTIMIZED.jpg?w=1200&h=630&q=82&auto=format&fit=crop&crop=focalpoint&fp-x=0.2983&fp-y=0.4213&dm=1708982963&s=3f7c850fc61548b7a958e4d7c60115be"
                      alt="National Yo-Yo Museum"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-2/3">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 ${
                    isDark
                      ? 'bg-cal-red/10 border border-cal-red/30'
                      : 'bg-cal-red/10 border border-cal-red/20'
                  }`}>
                    <Star className="w-3.5 h-3.5 text-cal-red" />
                    <span className="text-cal-red text-xs font-semibold uppercase tracking-wider">
                      Must Visit
                    </span>
                  </div>

                  <h2 className={`text-3xl font-display font-bold mb-4 ${
                    isDark ? 'text-white' : 'text-surface-900'
                  }`}>
                    {nearbyAttraction.name}
                  </h2>

                  <p className={`leading-relaxed mb-6 ${isDark ? 'text-white/70' : 'text-surface-600'}`}>
                    {nearbyAttraction.description}
                  </p>

                  <div className={`flex items-center gap-2 ${isDark ? 'text-white/50' : 'text-surface-500'}`}>
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Just a few blocks from the venue</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </AnimatedSection>
        </Container>
      </section>

      {/* Travel Tips */}
      <section className="py-12">
        <Container>
          <AnimatedSection className="mb-8">
            <h2 className={`text-3xl font-display font-bold flex items-center gap-3 ${
              isDark ? 'text-white' : 'text-surface-900'
            }`}>
              <Car className="w-8 h-8 text-gold" />
              Travel Tips
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Parking */}
            <AnimatedSection delay={0.1}>
              <GlowCard glowColor="grass">
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isDark
                      ? 'bg-grass/10 border border-grass/30'
                      : 'bg-grass/10'
                  }`}>
                    <Car className="w-6 h-6 text-grass" />
                  </div>
                  <h3 className={`text-xl font-display font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-surface-900'
                  }`}>
                    Parking
                  </h3>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-white/70' : 'text-surface-600'}`}>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-grass mt-2" />
                      Free street parking throughout downtown
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-grass mt-2" />
                      Municipal parking garage on 2nd Street
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-grass mt-2" />
                      Arrive early for best spots
                    </li>
                  </ul>
                </div>
              </GlowCard>
            </AnimatedSection>

            {/* Public Transit */}
            <AnimatedSection delay={0.2}>
              <GlowCard glowColor="grass">
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isDark
                      ? 'bg-grass-dark/10 border border-grass-dark/30'
                      : 'bg-grass-dark/10'
                  }`}>
                    <Navigation className="w-6 h-6 text-grass-dark" />
                  </div>
                  <h3 className={`text-xl font-display font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-surface-900'
                  }`}>
                    Public Transit
                  </h3>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-white/70' : 'text-surface-600'}`}>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-grass-dark mt-2" />
                      B-Line bus service available
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-grass-dark mt-2" />
                      Downtown Transit Center nearby
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-grass-dark mt-2" />
                      Bike-friendly area with racks
                    </li>
                  </ul>
                </div>
              </GlowCard>
            </AnimatedSection>

            {/* Nearby Amenities */}
            <AnimatedSection delay={0.3}>
              <GlowCard glowColor="cal">
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isDark
                      ? 'bg-cal-red/10 border border-cal-red/30'
                      : 'bg-cal-red/10'
                  }`}>
                    <Building className="w-6 h-6 text-cal-red" />
                  </div>
                  <h3 className={`text-xl font-display font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-surface-900'
                  }`}>
                    Nearby Amenities
                  </h3>
                  <ul className={`space-y-2 text-sm ${isDark ? 'text-white/70' : 'text-surface-600'}`}>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cal-red mt-2" />
                      Multiple restaurants within walking distance
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cal-red mt-2" />
                      Coffee shops and cafes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cal-red mt-2" />
                      Public restrooms available
                    </li>
                  </ul>
                </div>
              </GlowCard>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <Container>
          <AnimatedSection className="text-center">
            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                <Navigation className="w-5 h-5" />
                Open in Google Maps
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </AnimatedSection>
        </Container>
      </section>
    </motion.div>
  )
}

export default LocationPage
