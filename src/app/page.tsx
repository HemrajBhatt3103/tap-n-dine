'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Menu, X, 
  QrCode, Smartphone, CreditCard, Users, 
  Coffee, Utensils, Hotel, Truck, PartyPopper,
  ChevronRight, Check, Star, ArrowRight,
  Clock, Globe, Shield, Zap, Leaf, Settings,
  MessageCircle, Award, BarChart3, UserCheck, Calendar,
  Instagram, Linkedin, Mail, Phone, MapPin, Camera,
  Handshake,
  Icon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  // Refs for sections
  const menuScrollerRef = useRef<HTMLDivElement>(null)
  const businessTypesScrollerRef = useRef<HTMLDivElement | null>(null)
  const howItWorksScrollerRef = useRef<HTMLDivElement | null>(null)
  const whatIsTapNDineScrollerRef = useRef<HTMLDivElement | null>(null)
  const whyChooseUsScrollerRef = useRef<HTMLDivElement | null>(null)
  const advantagesScrollerRef = useRef<HTMLDivElement>(null)
  const testimonialsScrollerRef = useRef<HTMLDivElement>(null)
  const happyClientsScrollerRef = useRef<HTMLDivElement | null>(null)

  // ✅ Safe auto-scroll setup
  useEffect(() => {
    const setupAutoScroll = (
      ref: React.RefObject<HTMLDivElement | null | undefined>,
      speed: number = 1
    ): (() => void) | undefined => {
      const scroller = ref.current
      if (!scroller) return

      let scrollAmount = 0
      const scrollStep = 1
      const scrollDelay = 5 / speed
      let isPaused = false
      let intervalId: NodeJS.Timeout | null = null

      const scroll = () => {
        if (!scroller || isPaused) return
        scroller.scrollLeft += scrollStep
        scrollAmount += scrollStep
        if (scrollAmount >= scroller.scrollWidth - scroller.clientWidth) {
          scrollAmount = 0
          scroller.scrollLeft = 0
        }
      }

      const startScrolling = () => {
        if (intervalId) clearInterval(intervalId)
        intervalId = setInterval(scroll, scrollDelay)
      }

      const pauseScrolling = () => {
        isPaused = true
        if (intervalId) clearInterval(intervalId)
      }

      const resumeScrolling = () => {
        isPaused = false
        startScrolling()
      }

      scroller.addEventListener('mouseenter', pauseScrolling)
      scroller.addEventListener('mouseleave', resumeScrolling)
      scroller.addEventListener('touchstart', pauseScrolling)
      scroller.addEventListener('touchend', resumeScrolling)

      startScrolling()

      return () => {
        if (intervalId) clearInterval(intervalId)
        scroller.removeEventListener('mouseenter', pauseScrolling)
        scroller.removeEventListener('mouseleave', resumeScrolling)
        scroller.removeEventListener('touchstart', pauseScrolling)
        scroller.removeEventListener('touchend', resumeScrolling)
      }
    }

    // Initialize autoscrolls
    const cleanupBusinessTypes = setupAutoScroll(businessTypesScrollerRef, 0.4)
    const cleanupHowItWorks = setupAutoScroll(howItWorksScrollerRef, 0.3)
    const cleanupWhatIsTapNDine = setupAutoScroll(whatIsTapNDineScrollerRef, 0.4)
    const cleanupWhyChooseUs = setupAutoScroll(whyChooseUsScrollerRef, 0.3)
    const cleanupHappyClients = setupAutoScroll(happyClientsScrollerRef, 0.4)

    // Cleanup on unmount
    return () => {
      cleanupBusinessTypes?.()
      cleanupHowItWorks?.()
      cleanupWhatIsTapNDine?.()
      cleanupWhyChooseUs?.()
      cleanupHappyClients?.()
    }
  }, [])


  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'pricing', 'testimonials', 'faqs', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const openWhatsApp = () => {
    window.open('https://wa.me/916351324531?text=Hi!%20I%20came%20across%20Tap-n-Dine%20and%20I%E2%80%99m%20interested%20in%20learning%20more%20about%20how%20it%20works%20for%20restaurants.%20Could%20you%20please%20share%20a%20quick%20demo%20or%20pricing%20details%3F', '_blank')
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const message = `*New Contact Form Submission*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Message:* ${formData.message}\n\n_Sent from Lazlle Tap-n-Dine website_`
    
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/916351324531?text=${encodedMessage}`, '_blank')
    
    // Reset form
    setFormData({ name: '', phone: '', email: '', message: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact' }
  ]

  const businessTypes = [
    { icon: Utensils, name: 'Restaurants', caption: 'Serve smarter. Manage faster.' },
    { icon: Coffee, name: 'Cafés', caption: 'Brew better. Order easier.' },
    { icon: Truck, name: 'Food Trucks', caption: 'Mobile menu. Maximum reach.' },
    { icon: PartyPopper, name: 'Banquets', caption: 'Event dining. Redefined.' },
    { icon: Hotel, name: 'Hotels', caption: 'Room service. Revolutionized.' }
  ]

  const happyClients = [
    { name: 'Raj Rajeshwari', image: '/rajrajeshwari.jpg' },
    { name: 'Hungry Birds', image: '/hungry_birds.avif' },
    { name: 'Gravy & Grills', image: '/gravy.jpg' },
    { name: 'Jagdamba', image: '/jagdamba.png' },
    { name: 'Mahi Omlette & Chinese', image: '/mahi.png' },
    { name: 'Nanking', image: '/nanking.png' },
  ]

  const howItWorks = [
    { step: '1', title: 'Scan', description: 'Customers scan QR code at their table', icon: QrCode },
    { step: '2', title: 'Explore Menu', description: 'Browse menu with photos and descriptions', icon: Smartphone },
    { step: '3', title: 'Order & Enjoy', description: 'Place your order and enjoy your food', icon: CreditCard }
  ]

  const pricingPlans = [
    {
      name: 'BASIC',
      color: 'orange',
      pricing: {
        '6 months': '₹3,199',
        '12 months': '₹4,199'
      },
      features: [
        'Unlimited menu edits by developer',
        '2 major menu/design revamps',
        'Mobile-first, fast-loading UI',
        'Annual hosting included',
        '6 permanent QR codes',
        'Go live within 24 hours'
      ],
      popular: false
    },
    {
      name: 'PRO',
      color: 'blue',
      pricing: {
        '6 months': '₹3,199',
        '12 months': '₹4,199'
      },
      features: [
        'All Basic features',
        'Advanced filters, nutrition info, analytics',
        'Premium design, logo, and photos',
        'Swiggy, Zomato, WhatsApp ordering buttons',
        '10 branded QR codes',
        'Unlimited edits, 4 major changes'
      ],
      popular: true
    },
    {
      name: 'ULTRA',
      color: 'purple',
      pricing: {
        '6 months': '₹6,499 for 1st outlet (₹999/outlet)',
        '12 months': '₹8,499 for 1st outlet (₹1,999/outlet)'
      },
      features: [
        'All Pro features + multi-outlet dashboard',
        'Bulk & branded QR generation (20+)',
        'Optional custom domains per outlet',
        'Swiggy, Zomato, WhatsApp per outlet',
        'Fast-track onboarding/support',
        'Popular add-ons: extra QRs, translations, photoshoots, analytics, seasonal menus, custom designs'
      ],
      popular: false
    }
  ]

  const advantages = [
    { icon: Leaf, title: 'No Printing', description: 'Save trees, go digital' },
    { icon: Zap, title: 'Instant Updates', description: 'Change menu in seconds' },
    { icon: Shield, title: 'Eco-Friendly', description: 'Reduce paper waste' },
    { icon: Clock, title: 'Fast Setup', description: 'Live in under 2 hours' },
    { icon: BarChart3, title: 'Analytics', description: 'Track customer preferences' }
  ]

  const testimonials = [
    {
      name: 'Alpesh Amin',
      role: 'Owner of Hungry Birds',
      content: 'Loved scanning the QR and ordering in seconds — super smooth experience!',
      rating: 5
    },
    {
      name: 'Mihir Shah',
      role: 'Owner off Shree RajRajeshwari',
      content: 'No more waiting for staff. I can browse and order at my own pace. Brilliant!',
      rating: 5
    },
    {
      name: 'Hitesh Patel',
      role: 'Owner of NanKing',
      content: 'The photos and descriptions make choosing so much easier. Great UX!',
      rating: 5
    },
    {
      name: 'Rishabh Patel',
      role: 'Owner of Mahi Omlette',
      content: "Seamless and quick! The digital menu made dining effortless and fun.",
      rating: 5
    },
    {
      name: 'Ayush Rana',
      role: 'Owner of Jagdamba Chevda',
      content: "Tap-n-Dine has transformed how we serve customers — fast, easy, and completely hassle-free!",
      rating: 5
    }

  ]



  const faqs = [
    {
      question: 'How quickly can I set up Tap-n-Dine?',
      answer: 'You can go live within 24 hours! Simply sign up, provide your menu details, and we\'ll handle the rest.'
    },
    {
      question: 'What payment methods are supported?',
      answer: 'We support all major payment methods including credit/debit cards, UPI, net banking, and popular digital wallets.'
    },
    {
      question: 'Can I update my menu after going live?',
      answer: 'Yes! Basic plan includes unlimited edits by developer, Pro and Ultra plans include self-service editing capabilities.'
    },
    {
      question: 'Do you support multiple languages?',
      answer: 'Yes, Ultra plan includes multilingual support. We can add translations as an add-on for other plans.'
    },
    {
      question: 'What about custom domains?',
      answer: 'Ultra plan includes optional custom domains per outlet. This can be added as an add-on to other plans.'
    },
    {
      question: 'How do the QR codes work?',
      answer: 'We provide permanent QR codes that link to your digital menu. Simply place them on tables and customers can scan to order.'
    },
    {
      question: 'Is there customer support?',
      answer: 'All plans include support. Ultra plan gets priority fast-track support with dedicated account manager.'
    },
    {
      question: 'Can I integrate with Swiggy/Zomato?',
      answer: 'Pro and Ultra plans include integration buttons for Swiggy, Zomato, and WhatsApp ordering.'
    }
  ]

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'orange': return 'bg-orange-500 hover:bg-orange-600 border-orange-500'
      case 'blue': return 'bg-blue-500 hover:bg-blue-600 border-blue-500'
      case 'purple': return 'bg-purple-500 hover:bg-purple-600 border-purple-500'
      default: return 'bg-gray-500 hover:bg-gray-600 border-gray-500'
    }
  }

  return (
    <div
  className="min-h-screen overflow-x-hidden"
  style={{ backgroundColor: 'var(--lazlle-bg-light)', color: 'var(--lazlle-text-dark)' }}
>
  {/* Mobile-First Navigation */}
  <nav
    className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'var(--border)' }}
  >
    <div className="responsive-container">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center">
          <img
            src="/laz.jpg"
            alt="Lazlle Logo"
            className="w-10 h-10 md:w-16 md:h-16 object-contain mr-2"
          />
          <div className="flex flex-row items-center space-x-2">
            <span
              style={{
                color: 'var(--lazlle-text-black)',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: '22px',
                letterSpacing: '0.4px',
              }}
            >
              Lazlle
            </span>
            <Badge
              variant="secondary"
              className="text-xs md:text-base"
              style={{
                color: 'var(--lazlle-text-medium)',
                fontFamily: "'Montserrat', sans-serif",
                padding: '0px 2px ',
                fontSize: '12px',
              }}
            >
              Tap-n-Dine
            </Badge>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'text-orange-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-t border-gray-100"
          >
            <div className="responsive-container py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${ 
                    activeSection === item.id ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={openWhatsApp}
                className="responsive-button mt-4"
              >
                Get Demo
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Responsive */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="responsive-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge
              className="mb-4 max-w-sm"
              style={{
                backgroundColor: 'var(--lazlle-bg-light)',
                color: 'var(--lazlle-text-dark)',
                fontSize: '1.5rem',
                fontWeight: '600',
                whiteSpace: 'normal',   
                lineHeight: '1.4',
              }}
            >
              System for Digital Ordering Via QR Code
            </Badge>
            <h1 className="responsive-heading">
              Revolutionize Your
              <span style={{ color: 'var(--lazlle-text-dark)' }}> Restaurant</span>
              <br />
              with Tap-n-Dine
            </h1>
            <p className="responsive-text mx-auto mb-8">
              A QR-based ordering platform by Lazlle — simple, smart, and fast.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <button 
                onClick={openWhatsApp}
                className="responsive-button"
                style={{ backgroundColor: 'var(--lazlle-text-dark)' }}
              >
                Get Demo
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="responsive-button"
                style={{ backgroundColor: 'var(--lazlle-text-dark)' }}
              >
                See Pricing
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12"
          >
            <div className="responsive-card max-w-lg mx-auto">
              <div className="aspect-video rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, var(--lazlle-bg-light), rgba(219, 228, 234, 0.5))' }}>
                <div className="text-center">
                  <QrCode className="w-16 h-16 mx-auto mb-3" style={{ color: 'var(--lazlle-text-dark)' }} />
                  <p className="font-medium" style={{ color: 'var(--lazlle-text-gray)' }}>Scan • Order • Enjoy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Tap-n-Dine Section */}
      <section id="features" style={{ backgroundColor: '#ffffff' }}>
        <div className="responsive-section">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="responsive-heading">What is Tap-n-Dine</h2>
              <p className="responsive-text mx-auto">
                  With Tap-n-Dine, your consumers can browse and place orders using a QR-based platform.              
              </p>
            </motion.div>


          {/* Auto-scrolling feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div 
              ref={whatIsTapNDineScrollerRef}
              className="what-is-tap-n-dine-auto-scroll-container pb-4"
            >
              <div className="flex space-x-4" style={{ width: 'max-content' }}>
                {[ 
                  { title: 'Digital Menu', desc: 'Interactive menu with photos', icon: Smartphone },
                  { title: 'QR Code', desc: 'Scan to order instantly', icon: QrCode },
                  { title: 'Real-time Updates', desc: 'Live order tracking', icon: Zap },
                  { title: 'Seamless Ordering', desc: 'Smooth ordering experience for every table', icon: Handshake },
                  { title: 'Easy Management', desc: 'Manage menu and orders effortlessly', icon: Settings }
                ].map((item, index) => (
                  <div key={item.title} className="flex-shrink-0 w-72">
                    <div className="mobile-card h-full">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <item.icon className="w-8 h-8 text-gray-800" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section>
        <div className="responsive-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="responsive-heading">Who It's For</h2>
            <p className="responsive-text mx-auto">
              Perfect solution for every food business
            </p>
          </motion.div>

          <div className="business-types-auto-scroll-container relative">
            {/* Fade edges for smooth transition */}
            <div className="absolute left-0 top-0 bottom-0  bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0  bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
            
            <div 
              ref={businessTypesScrollerRef}
              className="flex flex-wrap justify-center gap-4"
            >
              {businessTypes.map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-[280px] flex-shrink-0"
                >
                  <div className="section-card h-full">
                    <div className="text-center">
                      <div className="icon-container mx-auto">
                        <type.icon className="w-6 h-6 md:w-7 md:h-7" />
                      </div>
                      <h3 className="responsive-subheading mb-3">{type.name}</h3>
                      <p className="fluid-text-small text-gray-600 italic">{type.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Happy Clients Section */}
      <section style={{ backgroundColor: '#ffffff' }}>
        <div className="responsive-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="responsive-heading">Happy Clients</h2>
            <p className="responsive-text mx-auto">
              Trusted by the best in the business
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div 
              ref={happyClientsScrollerRef}
              className="business-types-auto-scroll-container pb-4"
            >
              <div className="flex space-x-4" style={{ width: 'max-content' }}>
                {happyClients.map((client, index) => (
                  <div key={client.name} className="flex-shrink-0 w-72">
                    <div className="section-card h-full">
                      <div className="text-center">
                        <div className="w-full h-40 rounded-lg flex items-center justify-center mx-auto mb-4 overflow-hidden">
                          <img src={client.image} alt={client.name} className="w-full h-full object-contain" />
                        </div>                        <h3 className="responsive-subheading mb-3">{client.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section>
        <div className="responsive-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="responsive-heading">How It Works</h2>
            <p className="responsive-text mx-auto">
              Simple 3-step process to get started
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div 
              ref={howItWorksScrollerRef}
              className="what-is-tap-n-dine-auto-scroll-container pb-4 lg:flex lg:justify-center"
            >
              <div className="flex space-x-4" style={{ width: 'max-content' }}>
                {howItWorks.map((step, index) => (
                  <div key={step.step} className="flex-shrink-0 w-72">
                    <div className="section-card h-full">
                      <div className="text-center">
                        <div className="relative mb-6">
                          <div className="icon-container mx-auto">
                            <step.icon className="w-7 h-7 md:w-8 md:h-8" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg" style={{ backgroundColor: 'var(--lazlle-text-dark)' }}>
                            {step.step}
                          </div>
                        </div>
                        <h3 className="responsive-subheading mb-4">{step.title}</h3>
                        <p className="fluid-text-small text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section - Redesigned */}
      <section id="pricing" className="bg-gray-50">
        <div className="responsive-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="responsive-heading">Choose a Plan That Fits You</h2>
            <p className="responsive-text max-w-2xl mx-auto">
              Flexible pricing for businesses of all sizes. Start with Basic, grow with Ultra.
            </p>
          </motion.div>

          {/* Responsive Pricing Grid */}
          <div className="pricing-grid mb-12">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${plan.popular ? 'pro-glow' : ''}`}
              >
                <div className={`responsive-card h-full flex flex-col ${ 
                  plan.popular ? 'pro-highlight' : ''
                }`}>
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="text-center mb-4">
                      <Badge className="bg-orange-500 text-white px-3 py-1 text-sm font-medium" style={{ backgroundColor: 'var(--lazlle-text-dark)' }}>
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {/* Plan Name */}
                  <div className="text-center mb-6">
                    <h3 className="responsive-subheading">{plan.name}</h3>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="space-y-3">
                      {Object.entries(plan.pricing).map(([period, price]) => (
                        <div key={period} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                          <span className="text-gray-600 font-medium">{period}</span>
                          <span className="font-bold text-lg text-gray-900">{price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-grow mb-6">
                    <div className="space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <button 
                      onClick={openWhatsApp}
                      className={`responsive-button w-full ${ 
                        plan.popular 
                          ? '' 
                          : ''
                      }`}
                      style={{ backgroundColor: plan.popular ? 'var(--lazlle-text-dark)' : 'var(--lazlle-text-gray)' }}
                    >
                      Start Free Demo
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="responsive-card">
              <h3 className="responsive-subheading text-center mb-8">Plan Comparison</h3>
              <div className="comparison-table-responsive">
                <div className="scroll-indicator-top">
                  <div className="scroll-hint">← Scroll to see more →</div>
                </div>
                <div className="table-container-horizontal">
                  <table className="w-full">
                    <thead className="sticky-header">
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-900 min-w-[150px]">Feature</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900 min-w-[100px]">Basic</th>
                        <th className="text-center py-4 px-4 font-semibold">Pro</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900 min-w-[100px]">Ultra</th>
                      </tr>
                    </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Menu Editing</td>
                      <td className="text-center py-4 px-4 text-gray-600">Unlimited edits</td>
                      <td className="text-center py-4 px-4 text-gray-600">Unlimited edits</td>
                      <td className="text-center py-4 px-4 text-gray-600">Unlimited edits</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">QR Codes</td>
                      <td className="text-center py-4 px-4 text-gray-600">6</td>
                      <td className="text-center py-4 px-4 text-gray-600">10</td>
                      <td className="text-center py-4 px-4 text-gray-600">20+</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Analytics</td>
                      <td className="text-center py-4 px-4 crossmark">❌</td>
                      <td className="text-center py-4 px-4 checkmark">✅</td>
                      <td className="text-center py-4 px-4 checkmark">✅</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Third-party Integration</td>
                      <td className="text-center py-4 px-4 crossmark">❌</td>
                      <td className="text-center py-4 px-4 checkmark">✅</td>
                      <td className="text-center py-4 px-4 checkmark">✅</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Multi-outlet</td>
                      <td className="text-center py-4 px-4 crossmark">❌</td>
                      <td className="text-center py-4 px-4 crossmark">❌</td>
                      <td className="text-center py-4 px-4 checkmark">✅</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-900">Priority Support</td>
                      <td className="text-center py-4 px-4 crossmark">❌</td>
                      <td className="text-center py-4 px-4 text-orange-500 font-bold">❌</td>
                      <td className="text-center py-4 px-4 checkmark">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
              
              <div className="text-center mt-8">
                <button 
                  onClick={openWhatsApp}
                  className="responsive-button text-white"
                  style={{ backgroundColor: 'var(--lazlle-text-dark)' }}
                >
                  Start Free Demo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ backgroundColor: '#ffffff' }}>
        <div className="responsive-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="responsive-heading">Why Choose Us</h2>
            <p className="responsive-text mx-auto">
              Built for modern restaurants
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div 
              ref={whyChooseUsScrollerRef}
              className="what-is-tap-n-dine-auto-scroll-container pb-4"
            >
              <div className="flex space-x-4" style={{ width: 'max-content' }}>
                {[ 
                  { icon: Zap, title: 'Instant Updates', desc: 'Change menu in seconds' },
                  { icon: Smartphone, title: 'Mobile-First', desc: 'Optimized for all devices' },
                  { icon: Globe, title: 'Multilingual', desc: 'Support multiple languages' },
                  { icon: BarChart3, title: 'Analytics', desc: 'Track customer preferences' },
                  { icon: Users, title: '24/7 Support', desc: 'Always here to help' },
                  { icon: Leaf, title: 'Eco-Friendly', desc: 'Reduce paper waste' }
                ].map((item, index) => (
                  <div key={item.title} className="flex-shrink-0 w-72">
                    <div className="section-card h-full">
                      <div className="text-center">
                        <div className="icon-container mx-auto mb-4">
                          <item.icon className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <h3 className="responsive-subheading mb-3">{item.title}</h3>
                        <p className="fluid-text-small text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advantages Section */}
      <section>
        <div className="responsive-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="responsive-heading">Advantages of Tap-n-Dine</h2>
            <p className="responsive-text mx-auto">
              Benefits that transform your business
            </p>
          </motion.div>

          <div className="advantages-grid">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <div className="section-card h-full">
                  <div className="text-center">
                    <div className="icon-container mx-auto mb-4">
                      <advantage.icon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <h3 className="responsive-subheading mb-3">{advantage.title}</h3>
                    <p className="fluid-text-small text-gray-600">{advantage.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50">
        <div className="responsive-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="responsive-heading">What Diners Say</h2>
            <p className="responsive-text mx-auto">
              Real feedback from actual customers
            </p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <div className="section-card h-full">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="fluid-text-small text-gray-700 italic mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full mr-3 flex items-center justify-center">
                      <Users className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
                      <p className="fluid-text-small text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* FAQs Section */}
      <section id="faqs" className="bg-gray-50">
        <div className="responsive-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="responsive-heading">Frequently Asked Questions</h2>
            <p className="responsive-text mx-auto">
              Got questions? We've got answers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="faq-container"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="section-card border-0">
                  <AccordionTrigger className="text-left hover:no-underline px-0 py-4">
                    <span className="fluid-text-small font-medium text-gray-900">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="fluid-text-small text-gray-600 leading-relaxed pt-0">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="responsive-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="responsive-heading">Let's Get You Started</h2>
            <p className="responsive-text mx-auto">
              Ready to transform your restaurant? Get in touch!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="responsive-card">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      className="mt-1"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</Label>
                    <Input 
                      id="phone" 
                      placeholder="Your phone number" 
                      className="mt-1"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    className="mt-1"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your restaurant..." 
                    rows={4} 
                    className="mt-1 resize-none"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="responsive-button w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Send via WhatsApp
                  <MessageCircle className="ml-2 w-5 h-5 inline" />
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Contact Details</h3>
                    <div className="space-y-3">
                      <a href="tel:+916351324531" className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                        <Phone className="w-5 h-5 mr-3" />
                        <span>+91 6351 324 531</span>
                      </a>
                      <a href="mailto:lazlleandco@gmail.com" className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                        <Mail className="w-5 h-5 mr-3" />
                        <span>lazlleandco@gmail.com</span>
                      </a>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-3" />
                        <span>Vadodara, India</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a 
                        href="https://www.instagram.com/lazlle.in/"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        <Instagram className="w-6 h-6" />
                      </a>
                      <a 
                        href="https://www.linkedin.com/company/lazlle"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        <Linkedin className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="responsive-container">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Lazlle</span>
              <Badge variant="secondary" className="text-xs">Tap-n-Dine</Badge>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Lazlle Studio | Tap-n-Dine — Made in Vadodara, India.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
