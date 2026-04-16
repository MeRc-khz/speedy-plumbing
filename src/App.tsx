/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  Star, 
  Calendar as CalendarIcon,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Wrench
} from 'lucide-react';

// --- Types ---
interface Review {
  id: number;
  source: 'Yelp' | 'Google';
  author: string;
  rating: number;
  text: string;
  color: string;
}

// --- Constants ---
const REVIEWS: Review[] = [
  {
    id: 1,
    source: 'Yelp',
    author: 'Juan R.',
    rating: 5,
    text: '"Speedy indeed! Fixed my burst pipe in 20 minutes. Fair price!"',
    color: '#FF4500'
  },
  {
    id: 2,
    source: 'Google',
    author: 'Sarah M.',
    rating: 5,
    text: '"Best plumber in San Diego. Beto is the most professional tech I\'ve met."',
    color: '#4285F4'
  }
];

const TIME_SLOTS = [
  '08:00 AM', '10:30 AM', '01:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'
];

const PAYMENT_METHODS = ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER'];

// --- Components ---

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b-4 border-primary shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-primary shadow-md overflow-hidden shrink-0">
            <img 
              src="/speedie_pipes.png" 
              alt="Speedy Plumbing and Drain Cleaning Logo" 
              className="w-full h-full object-contain p-1"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="text-primary font-bold text-xl sm:text-2xl tracking-tight uppercase leading-tight">Speedy Plumbing and Drain Cleaning</h1>
            <p className="text-secondary font-bold text-[10px] sm:text-xs uppercase tracking-wider">Quality Service at a Fair Price</p>
          </div>
        </div>

        {/* Desktop Contact */}
        <div className="hidden md:flex flex-col items-end">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-accent text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-primary/10">
              Se Habla Español
            </span>
            <div className="text-primary font-extrabold text-xl flex items-center gap-1">
              <Phone className="w-5 h-5" />
              (619) 471-7995
            </div>
          </div>
          <div className="text-[11px] text-text-light font-medium">
            Chula Vista, CA • Beto Palacios
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="flex items-center gap-3 text-primary font-bold text-lg">
                <Phone className="w-5 h-5" />
                (619) 471-7995
              </div>
              <div className="flex items-center gap-3 text-text-light">
                <Mail className="w-5 h-5" />
                spedyplumbingsd@gmail.com
              </div>
              <div className="pt-2">
                <span className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded uppercase">
                  Se Habla Español
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Calendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(22);
  const [selectedTime, setSelectedTime] = useState<string | null>('10:30 AM');
  const [isBooked, setIsBooked] = useState(false);

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const dates = [
    { day: 18, disabled: true }, { day: 19, disabled: true }, { day: 20, disabled: true }, 
    { day: 21, disabled: true }, { day: 22, active: true }, { day: 23 }, { day: 24 },
    { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, { day: 1 }
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setIsBooked(true);
      setTimeout(() => setIsBooked(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-secondary rounded-full" />
        <h2 className="text-primary font-bold text-xl uppercase tracking-tight">Schedule Your Service</h2>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {days.map(day => (
          <div key={day} className="text-center text-[10px] font-bold text-text-light pb-2">{day}</div>
        ))}
        {dates.map((d, i) => (
          <button
            key={i}
            disabled={d.disabled}
            onClick={() => !d.disabled && setSelectedDate(d.day)}
            className={`
              aspect-square rounded-lg flex flex-col items-center justify-center transition-all
              ${d.disabled ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'hover:border-primary border border-gray-100'}
              ${selectedDate === d.day && !d.disabled ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-text-dark'}
            `}
          >
            <span className="text-sm font-bold">{d.day}</span>
            {d.active && <span className="text-[8px] font-medium opacity-80">Today</span>}
          </button>
        ))}
      </div>

      <p className="text-xs font-bold text-text-dark mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4 text-secondary" />
        Available Times for Oct {selectedDate}:
      </p>

      {/* Time Slots */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
        {TIME_SLOTS.map(time => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`
              py-2.5 px-2 rounded-lg text-xs font-bold transition-all border
              ${selectedTime === time 
                ? 'bg-secondary text-white border-secondary shadow-sm' 
                : 'bg-white text-text-light border-gray-200 hover:border-secondary/50'}
            `}
          >
            {time}
          </button>
        ))}
      </div>

      <button 
        onClick={handleBooking}
        disabled={isBooked}
        className={`
          mt-auto w-full py-4 rounded-xl font-bold text-lg uppercase tracking-wide transition-all shadow-lg
          ${isBooked 
            ? 'bg-success text-white cursor-default' 
            : 'bg-secondary text-white hover:bg-secondary/90 hover:-translate-y-0.5 active:translate-y-0'}
        `}
      >
        {isBooked ? (
          <span className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            Request Sent!
          </span>
        ) : (
          'Confirm Booking & Request Estimate'
        )}
      </button>
    </div>
  );
}

function InfoPanel() {
  return (
    <div className="flex flex-col gap-6">
      {/* Service Badges */}
      <div className="grid grid-cols-2 gap-3">
        {['COMMERCIAL', 'RESIDENTIAL', 'INDUSTRIAL', 'FREE ESTIMATE'].map((label, i) => (
          <div 
            key={label}
            className={`
              bg-white p-4 rounded-xl font-bold text-[11px] text-center border-b-4 border-gray-200 shadow-sm
              ${i === 3 ? 'text-success' : 'text-text-dark'}
            `}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Trust Box */}
      <div className="bg-accent rounded-xl p-6 border-2 border-dashed border-primary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck className="w-16 h-16 text-primary" />
        </div>
        <h3 className="text-primary font-bold text-lg mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          Why Speedy Plumbing and Drain Cleaning?
        </h3>
        <p className="text-text-light text-sm leading-relaxed">
          Owner-operated by <strong>Beto Palacios</strong>, serving Chula Vista for over 15 years. 
          We specialize in fast diagnostics and honest repairs. Bonded, Insured, and fully licensed (<strong>#895607</strong>) for your peace of mind.
        </p>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {REVIEWS.map(review => (
          <motion.div 
            key={review.id}
            whileHover={{ x: 5 }}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4"
          >
            <div 
              className="px-3 py-2 rounded-lg text-white font-black text-sm shrink-0"
              style={{ backgroundColor: review.color }}
            >
              {review.source === 'Yelp' ? 'Yelp' : 'G'}
            </div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-text-dark text-xs italic leading-relaxed mb-1">
                {review.text}
              </p>
              <span className="text-[10px] font-bold text-text-light">— {review.author}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Hours */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-secondary" />
            Hours of Operation
          </h4>
          <div className="space-y-1 text-sm">
            <p>Monday - Sunday: 7:00 AM - 7:00 PM</p>
            <p className="text-secondary font-bold">Open 7 Days a Week</p>
          </div>
        </div>

        {/* Payment & Contact */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-secondary" />
            Payment Methods
          </h4>
          <div className="flex flex-wrap gap-2">
            {PAYMENT_METHODS.map(method => (
              <span key={method} className="border border-neutral-700 px-2 py-1 rounded text-[10px] font-bold">
                {method}
              </span>
            ))}
          </div>
          <div className="pt-2 space-y-1 text-sm">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              spedyplumbingsd@gmail.com
            </p>
            <p className="flex items-center gap-2 text-white font-bold">
              <Phone className="w-4 h-4" />
              (619) 471-7995
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="space-y-4 md:text-right">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">
            License # 895607
          </h4>
          <div className="space-y-1 text-sm">
            <p>Bonded & Insured</p>
            <p>© {new Date().getFullYear()} Speedy Plumbing and Drain Cleaning SD</p>
            <p className="text-[10px] opacity-50">Serving Chula Vista & San Diego County</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg-custom font-sans text-text-dark selection:bg-secondary selection:text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Calendar />
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InfoPanel />
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
