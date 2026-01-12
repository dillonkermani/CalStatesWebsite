import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Instagram, Youtube, Facebook } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Location', path: '/location' },
  { name: 'Results', path: '/results' },
]

const competeLinks = [
  { name: 'Compete', path: '/compete' },
  { name: 'Rules', path: '/rules' },
  { name: 'Lodging', path: '/lodging' },
  { name: 'Sponsors', path: '/sponsors' },
]

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
]

function Footer() {
  const currentYear = new Date().getFullYear()
  const { isDark } = useTheme()

  return (
    <footer className="relative mt-auto">
      {/* Top Gradient Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-cal-red/50 to-transparent" />

      <div className={`backdrop-blur-xl border-t ${
        isDark
          ? 'bg-surface-900/90 border-white/5'
          : 'bg-light-100/90 border-light-300'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-flex items-center gap-3 mb-4">
                <motion.img
                  src="/images/logo.png"
                  alt="Cal States Logo"
                  className="h-16 w-auto object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="font-display text-xl font-bold tracking-tight"
                >
                  <span className="bg-gradient-to-r from-cal-red via-cal-red-light to-cal-red bg-clip-text text-transparent">
                    CAL STATES
                  </span>
                  <span className={`ml-2 ${isDark ? 'text-white' : 'text-surface-900'}`}>2026</span>
                </motion.div>
              </Link>
              <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-surface-600'}`}>
                California State Yo-Yo Contest - Where passion meets precision.
                Join us for the premier yo-yo competition on the West Coast.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      isDark
                        ? 'bg-surface-700/50 text-gray-400 hover:text-grass hover:bg-surface-600/50'
                        : 'bg-surface-100 text-surface-500 hover:text-grass hover:bg-surface-200'
                    }`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`font-display text-sm font-bold uppercase tracking-wider mb-4 ${
                isDark ? 'text-white' : 'text-surface-900'
              }`}>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`group flex items-center font-medium transition-colors duration-200 ${
                        isDark
                          ? 'text-gray-400 hover:text-white'
                          : 'text-surface-600 hover:text-surface-900'
                      }`}
                    >
                      <span className="w-0 h-0.5 bg-grass mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compete Links */}
            <div>
              <h3 className={`font-display text-sm font-bold uppercase tracking-wider mb-4 ${
                isDark ? 'text-white' : 'text-surface-900'
              }`}>
                Competition
              </h3>
              <ul className="space-y-3">
                {competeLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`group flex items-center font-medium transition-colors duration-200 ${
                        isDark
                          ? 'text-gray-400 hover:text-white'
                          : 'text-surface-600 hover:text-surface-900'
                      }`}
                    >
                      <span className="w-0 h-0.5 bg-cal-red mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className={`font-display text-sm font-bold uppercase tracking-wider mb-4 ${
                isDark ? 'text-white' : 'text-surface-900'
              }`}>
                Contact Us
              </h3>
              <div className="space-y-4">
                <motion.a
                  href="mailto:california.state.yoyo@gmail.com"
                  whileHover={{ x: 4 }}
                  className={`flex items-center transition-colors duration-200 ${
                    isDark
                      ? 'text-gray-400 hover:text-grass'
                      : 'text-surface-600 hover:text-grass'
                  }`}
                >
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="text-sm break-all font-medium">california.state.yoyo@gmail.com</span>
                </motion.a>

                {/* Newsletter Signup */}
                <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/5' : 'border-light-300'}`}>
                  <p className={`text-xs uppercase tracking-wider mb-3 font-semibold ${
                    isDark ? 'text-gray-500' : 'text-surface-500'
                  }`}>
                    Stay Updated
                  </p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter email"
                      className={`flex-1 px-3 py-2 border rounded-l-lg text-sm focus:outline-none focus:border-grass/50 transition-colors duration-200 ${
                        isDark
                          ? 'bg-surface-700/50 border-white/10 text-white placeholder-gray-500'
                          : 'bg-white border-light-300 text-surface-900 placeholder-surface-400'
                      }`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-gradient-to-r from-cal-red to-cal-red-light rounded-r-lg text-white text-sm font-bold hover:shadow-glow-red transition-shadow duration-200"
                    >
                      Go
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={`mt-12 pt-8 border-t ${isDark ? 'border-white/5' : 'border-light-300'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className={`text-sm font-medium ${isDark ? 'text-gray-500' : 'text-surface-500'}`}>
                &copy; {currentYear} California State Yo-Yo Contest. All rights reserved.
              </p>
              <p className={`text-sm flex items-center ${isDark ? 'text-gray-600' : 'text-surface-400'}`}>
                <span className="mr-2">Powered by passion for yo-yos</span>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-4 h-4 rounded-full border-2 border-cal-red border-t-transparent"
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      {isDark && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-grass/30 to-transparent" />
      )}
    </footer>
  )
}

export default Footer
