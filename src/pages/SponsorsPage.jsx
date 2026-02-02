import { useState } from 'react'
import { motion } from 'framer-motion'
import { Handshake, Mail, Phone, Building2, CheckCircle } from 'lucide-react'
import Container from '../components/ui/Container'
import GlowCard from '../components/ui/GlowCard'
import Button from '../components/ui/Button'
import GradientText from '../components/ui/GradientText'
import AnimatedSection from '../components/ui/AnimatedSection'
import { useTheme } from '../hooks/useTheme'

function SponsorForm({ isDark }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    vendorTable: false,
    notes: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    console.log('Sponsor form data:', formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-cal flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-surface-900'} mb-3`}>
          Thank You!
        </h3>
        <p className={isDark ? 'text-white/70' : 'text-surface-600'}>
          We have received your sponsorship inquiry. Our team will be in touch soon!
        </p>
      </motion.div>
    )
  }

  const inputClasses = (fieldName) =>
    `w-full px-4 py-3 rounded-xl ${isDark ? 'bg-surface-700/50' : 'bg-white'} border ${
      errors[fieldName]
        ? 'border-red-500'
        : isDark ? 'border-white/10 focus:border-grass' : 'border-light-300 focus:border-grass'
    } ${isDark ? 'text-white placeholder-white/40' : 'text-surface-900 placeholder-surface-400'} font-body transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-grass/30 focus:shadow-grass`

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={`block ${isDark ? 'text-white/80' : 'text-surface-700'} text-sm font-medium mb-2`}>
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={inputClasses('firstName')}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className={`block ${isDark ? 'text-white/80' : 'text-surface-700'} text-sm font-medium mb-2`}>
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={inputClasses('lastName')}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={`block ${isDark ? 'text-white/80' : 'text-surface-700'} text-sm font-medium mb-2`}>
            <Mail className="w-4 h-4 inline mr-2" />
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses('email')}
            placeholder="john@company.com"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className={`block ${isDark ? 'text-white/80' : 'text-surface-700'} text-sm font-medium mb-2`}>
            <Phone className="w-4 h-4 inline mr-2" />
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses('phone')}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className={`block ${isDark ? 'text-white/80' : 'text-surface-700'} text-sm font-medium mb-2`}>
          <Building2 className="w-4 h-4 inline mr-2" />
          Company Name *
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={inputClasses('company')}
          placeholder="Your Company Inc."
        />
        {errors.company && (
          <p className="text-red-400 text-xs mt-1">{errors.company}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="vendorTable"
          name="vendorTable"
          checked={formData.vendorTable}
          onChange={handleChange}
          className={`w-5 h-5 rounded ${isDark ? 'bg-surface-700 border-white/20' : 'bg-white border-light-300'} text-grass focus:ring-grass/30 focus:ring-offset-0 cursor-pointer`}
        />
        <label
          htmlFor="vendorTable"
          className={`${isDark ? 'text-white/80' : 'text-surface-700'} text-sm cursor-pointer`}
        >
          I am interested in having a vendor table at the event
        </label>
      </div>

      <div>
        <label className={`block ${isDark ? 'text-white/80' : 'text-surface-700'} text-sm font-medium mb-2`}>
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className={`${inputClasses('notes')} resize-none`}
          placeholder="Tell us about your sponsorship interests, preferred tier, or any questions..."
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        <Handshake className="w-5 h-5" />
        Submit Inquiry
      </Button>
    </form>
  )
}

function SponsorsPage() {
  const { isDark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${isDark ? 'bg-surface-900' : 'bg-light-100'} pt-24 pb-16`}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold-light/20 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <AnimatedSection animation="fadeDown" className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-display font-bold mb-4">
            <GradientText>BECOME A SPONSOR</GradientText>
          </h1>
          <p className={`${isDark ? 'text-white/60' : 'text-surface-600'} text-lg max-w-2xl mx-auto`}>
            Partner with California's premier yo-yo competition and connect
            with passionate enthusiasts from around the world.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" className="max-w-3xl mx-auto">
          <GlowCard glowColor="gold" className="overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-cal mb-4">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h2 className={`text-3xl font-display font-bold ${isDark ? 'text-white' : 'text-surface-900'} mb-3`}>
                  Sponsorship Inquiry
                </h2>
                <p className={`${isDark ? 'text-white/60' : 'text-surface-600'} max-w-lg mx-auto`}>
                  Interested in sponsoring Cal States 2026? Fill out the form below and we'll be in touch!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { title: 'Brand Exposure', desc: 'Logo on all materials' },
                  { title: 'Community Access', desc: 'Connect with enthusiasts' },
                  { title: 'Event Presence', desc: 'Vendor table options' },
                ].map((benefit) => (
                  <div
                    key={benefit.title}
                    className={`text-center p-4 rounded-xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-surface-100 border-light-300'} border`}
                  >
                    <h3 className={`${isDark ? 'text-white' : 'text-surface-900'} font-semibold mb-1`}>
                      {benefit.title}
                    </h3>
                    <p className={`${isDark ? 'text-white/50' : 'text-surface-500'} text-sm`}>{benefit.desc}</p>
                  </div>
                ))}
              </div>

              <SponsorForm isDark={isDark} />
            </div>
          </GlowCard>
        </AnimatedSection>
      </Container>
    </motion.div>
  )
}

export default SponsorsPage
