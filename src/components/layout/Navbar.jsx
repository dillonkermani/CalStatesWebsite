import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ChevronDown, Sun, Moon } from 'lucide-react'
import MobileMenu from './MobileMenu'
import { useTheme } from '../../hooks/useTheme'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Location', path: '/location' },
  {
    name: 'Compete',
    path: '/compete',
    dropdown: [{ name: 'Rules', path: '/rules' }],
  },
  { name: 'Results', path: '/results' },
  { name: 'Lodging', path: '/lodging' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Contact', path: '/contact' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownRef = useRef(null)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-surface-900/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/10'
              : 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-light-300'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              {/* Bear Logo */}
              <motion.img
                src="/images/logo.png"
                alt="Cal States Logo"
                className="h-12 md:h-14 w-auto object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              />
              <motion.div
                className="relative hidden sm:block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <span className="font-display text-lg md:text-xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-cal-red via-cal-red-light to-cal-red bg-clip-text text-transparent">
                    CAL STATES
                  </span>
                  <span className={`ml-2 ${isDark ? 'text-white' : 'text-surface-900'}`}>2026</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.dropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className={`group flex items-center px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                          isDark
                            ? 'text-gray-300 hover:text-white'
                            : 'text-surface-600 hover:text-surface-900'
                        }`}
                      >
                        <span className="relative">
                          {link.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-grass group-hover:w-full transition-all duration-300" />
                        </span>
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === link.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute top-full left-0 mt-2 w-48 backdrop-blur-xl rounded-lg border shadow-xl overflow-hidden ${
                              isDark
                                ? 'bg-surface-800/95 border-white/10 shadow-black/30'
                                : 'bg-white border-light-300 shadow-black/10'
                            }`}
                          >
                            <NavLink
                              to={link.path}
                              onClick={() => setActiveDropdown(null)}
                              className={({ isActive }) =>
                                `block px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                                  isActive
                                    ? 'bg-grass/10 text-grass'
                                    : isDark
                                      ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                                      : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                                }`
                              }
                            >
                              {link.name}
                            </NavLink>
                            {link.dropdown.map((sublink) => (
                              <NavLink
                                key={sublink.name}
                                to={sublink.path}
                                onClick={() => setActiveDropdown(null)}
                                className={({ isActive }) =>
                                  `block px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                                    isActive
                                      ? 'bg-grass/10 text-grass'
                                      : isDark
                                        ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                                        : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                                  }`
                                }
                              >
                                {sublink.name}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `group relative px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                          isActive
                            ? 'text-grass'
                            : isDark
                              ? 'text-gray-300 hover:text-white'
                              : 'text-surface-600 hover:text-surface-900'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <span className="relative">
                          {link.name}
                          <motion.span
                            className="absolute -bottom-1 left-0 h-0.5 bg-grass"
                            initial={{ width: isActive ? '100%' : '0%' }}
                            animate={{ width: isActive ? '100%' : '0%' }}
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                          {isActive && (
                            <motion.span
                              layoutId="activeTab"
                              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-grass shadow-glow-green"
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          )}
                        </span>
                      )}
                    </NavLink>
                  )}
                </div>
              ))}

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`ml-4 p-2 rounded-lg transition-colors duration-200 ${
                  isDark
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                }`}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>
            </div>

            {/* Mobile Menu Button + Theme Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDark
                    ? 'text-gray-300 hover:text-white hover:bg-white/5'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                }`}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className={`relative p-2 rounded-lg transition-colors duration-200 ${
                  isDark
                    ? 'text-gray-300 hover:text-white hover:bg-white/5'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                }`}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  )
}

export default Navbar
