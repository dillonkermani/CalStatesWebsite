import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Check, Copy, Users, ExternalLink } from 'lucide-react'
import Container from '../components/ui/Container'
import GlowCard from '../components/ui/GlowCard'
import Button from '../components/ui/Button'
import GradientText from '../components/ui/GradientText'
import AnimatedSection from '../components/ui/AnimatedSection'
import { useTheme } from '../hooks/useTheme'

const CONTACT_EMAIL = 'california.state.yoyo@gmail.com'

function ContactForm() {
  const { isDark } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Form is ready for backend integration
    console.log('Contact form data:', formData)

    setIsSubmitting(false)
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
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-grass to-grass-dark flex items-center justify-center shadow-grass"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-surface-900'} mb-3`}>
          Message Sent!
        </h3>
        <p className={`${isDark ? 'text-white/70' : 'text-surface-600'} mb-6`}>
          Thank you for reaching out. We will get back to you as soon as
          possible.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setIsSubmitted(false)
            setFormData({ name: '', email: '', message: '' })
          }}
        >
          Send Another Message
        </Button>
      </motion.div>
    )
  }

  const inputClasses = (fieldName) =>
    `w-full px-4 py-3 rounded-xl ${isDark ? 'bg-surface-700/50' : 'bg-white'} border ${
      errors[fieldName]
        ? 'border-red-500 focus:border-red-500'
        : isDark ? 'border-white/10 focus:border-grass' : 'border-light-300 focus:border-grass'
    } ${isDark ? 'text-white placeholder-white/40' : 'text-surface-900 placeholder-surface-400'} font-body transition-all duration-300 focus:outline-none focus:ring-2 ${
      errors[fieldName]
        ? 'focus:ring-red-500/30'
        : 'focus:ring-grass/30 focus:shadow-grass'
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label className={`block ${isDark ? 'text-white/80' : 'text-surface-700'} text-sm font-medium mb-2`}>
          Your Name <span className="text-cal-red">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClasses('name')}
          placeholder="John Doe"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-red-400 text-xs mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className={`block ${isDark ? 'text-white/80' : 'text-surface-700'} text-sm font-medium mb-2`}>
          <Mail className="w-4 h-4 inline mr-2" />
          Email Address <span className="text-cal-red">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputClasses('email')}
          placeholder="john@example.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-red-400 text-xs mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label className={`block ${isDark ? 'text-white/80' : 'text-surface-700'} text-sm font-medium mb-2`}>
          Message <span className="text-cal-red">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`${inputClasses('message')} resize-none`}
          placeholder="How can we help you? Ask about registration, rules, or anything else..."
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-red-400 text-xs mt-1">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}

function ContactInfo() {
  const { isDark } = useTheme()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <div className="space-y-8">
      {/* Email Section */}
      <div>
        <h3 className={`text-lg font-display font-semibold ${isDark ? 'text-white' : 'text-surface-900'} mb-4 flex items-center gap-2`}>
          <Mail className="w-5 h-5 text-grass" />
          Email Us
        </h3>
        <div className={`flex items-center gap-3 p-4 rounded-xl ${isDark ? 'bg-surface-700/50 border-white/10' : 'bg-white border-light-300'} border`}>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-grass hover:text-grass-dark transition-colors font-mono text-sm flex-1 truncate"
          >
            {CONTACT_EMAIL}
          </a>
          <button
            onClick={copyEmail}
            className={`p-2 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-surface-100 hover:bg-surface-200 border-light-300'} border transition-all duration-200 group`}
            title="Copy email address"
          >
            {copied ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Check className="w-4 h-4 text-grass" />
              </motion.div>
            ) : (
              <Copy className={`w-4 h-4 ${isDark ? 'text-white/60 group-hover:text-white' : 'text-surface-500 group-hover:text-surface-900'} transition-colors`} />
            )}
          </button>
        </div>
      </div>

      {/* Organized By Section */}
      <div>
        <h3 className={`text-lg font-display font-semibold ${isDark ? 'text-white' : 'text-surface-900'} mb-4 flex items-center gap-2`}>
          <Users className="w-5 h-5 text-cal-red" />
          Organized By
        </h3>
        <div className={`p-4 rounded-xl ${isDark ? 'bg-surface-700/50 border-white/10' : 'bg-white border-light-300'} border`}>
          <p className={`${isDark ? 'text-white/80' : 'text-surface-800'} font-medium mb-2`}>
            National Yo-Yo League
          </p>
          <p className={`${isDark ? 'text-white/50' : 'text-surface-500'} text-sm`}>
            Dedicated to promoting yo-yo sports and competitions across the
            United States.
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className={`pt-6 border-t ${isDark ? 'border-white/10' : 'border-light-300'}`}>
        <h3 className={`text-sm font-display font-semibold ${isDark ? 'text-white/60' : 'text-surface-500'} uppercase tracking-wider mb-4`}>
          Quick Links
        </h3>
        <div className="space-y-2">
          {[
            { label: 'Competition Rules', href: '/rules' },
            { label: 'Schedule', href: '/schedule' },
            { label: 'Become a Sponsor', href: '/sponsors' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`flex items-center gap-2 ${isDark ? 'text-white/70' : 'text-surface-600'} hover:text-grass transition-colors text-sm group`}
            >
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactPage() {
  const { isDark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${isDark ? 'bg-surface-900' : 'bg-light-100'} pt-24 pb-16`}
    >
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-grass/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-cal-red/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Page Header */}
        <AnimatedSection animation="fadeDown" className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-display font-bold mb-4">
            <GradientText gradient="grass">CONTACT US</GradientText>
          </h1>
          <p className={`${isDark ? 'text-white/60' : 'text-surface-600'} text-lg max-w-2xl mx-auto`}>
            Have questions about the California State Yo-Yo Contest? We are here
            to help. Reach out and we will get back to you as soon as possible.
          </p>
        </AnimatedSection>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Left: Contact Form */}
          <AnimatedSection animation="fadeRight" delay={0.1}>
            <GlowCard glowColor="grass" className="h-full">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-grass to-grass-dark flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h2 className={`text-xl font-display font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>
                    Send a Message
                  </h2>
                </div>
                <ContactForm />
              </div>
            </GlowCard>
          </AnimatedSection>

          {/* Right: Contact Info */}
          <AnimatedSection animation="fadeLeft" delay={0.2}>
            <GlowCard glowColor="cal" className="h-full">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cal-red to-gold flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h2 className={`text-xl font-display font-bold ${isDark ? 'text-white' : 'text-surface-900'}`}>
                    Get in Touch
                  </h2>
                </div>
                <ContactInfo />
              </div>
            </GlowCard>
          </AnimatedSection>
        </div>

        {/* Additional Info */}
        <AnimatedSection animation="fadeUp" delay={0.3} className="mt-12">
          <div className="text-center max-w-2xl mx-auto">
            <p className={`${isDark ? 'text-white/50' : 'text-surface-500'} text-sm`}>
              For urgent matters, please email us directly at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-grass hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              . We typically respond within 24-48 hours.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </motion.div>
  )
}

export default ContactPage
