'use client';
import LicensePlateSearch from './components/LicensePlateSearch';
import FloatingCTA from './components/FloatingCTA';
import { useContext, useEffect, useRef } from 'react';
import { LanguageContext } from './components/LanguageProvider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundCars from './components/BackgroundCars';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TEXT = {
  da: {
    heroTitle: 'Find din bils værdi med ét klik',
    heroDesc: 'Indtast dit nummerpladenummer og få øjeblikkelig vurdering af din bils værdi',
    howTitle: 'Sådan fungerer det',
    steps: [
      {
        title: 'Indtast nummerplade',
        desc: 'Indtast dit nummerpladenummer i søgefeltet',
      },
      {
        title: 'Vi finder din bil',
        desc: 'Vi henter oplysninger om din bil fra det officielle register',
      },
      {
        title: 'Få din vurdering',
        desc: 'Modtag en præcis vurdering af din bils værdi',
      },
    ],
  },
  en: {
    heroTitle: 'Find your car\'s value instantly',
    heroDesc: 'Enter your license plate and get an instant car value estimate',
    howTitle: 'How it works',
    steps: [
      {
        title: 'Enter license plate',
        desc: 'Type your license plate number in the search field',
      },
      {
        title: 'We find your car',
        desc: 'We fetch your car details from the official register',
      },
      {
        title: 'Get your valuation',
        desc: 'Receive an accurate estimate of your car\'s value',
      },
    ],
  },
};

export default function Home() {
  const { language } = useContext(LanguageContext);
  const t = TEXT[language];
  const heroRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      tl.from('.hero-title', { 
        y: 30, 
        opacity: 0, 
        duration: 0.8,
        delay: 0.05
      })
      .from('.hero-description', { 
        y: 20, 
        opacity: 0, 
        duration: 0.6 
      }, '-=0.5')
      .from('.license-search', { 
        y: 20, 
        opacity: 0, 
        duration: 0.8 
      }, '-=0.4')
      .from('.how-heading', {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, '-=0.3')
      .from('.step-item', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.13,
      }, '-=0.2');
    }
  }, []);

  return (
    <main className="min-h-screen pb-24 bg-dot-pattern relative overflow-x-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-25 -z-10"></div>
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-50 to-transparent opacity-80 -z-10"></div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-blue-50 to-transparent opacity-80 -z-10"></div>
      
      {/* Blue accent shapes */}
      <div className="absolute top-32 left-10 w-64 h-64 rounded-full bg-blue-400 opacity-5 blur-3xl -z-10"></div>
      <div className="absolute bottom-32 right-10 w-80 h-80 rounded-full bg-blue-400 opacity-5 blur-3xl -z-10"></div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-24 px-4 flex flex-col items-center justify-center mt-10 overflow-hidden">
        <BackgroundCars />
        <div className="max-w-2xl w-full text-center space-y-8">
          <h1 className="hero-title text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-900">
            {t.heroTitle} 🚗
          </h1>
          <p className="hero-description text-xl text-gray-600 mb-8">
            {t.heroDesc}
          </p>
          <div id="license-plate-search" className="license-search">
            <LicensePlateSearch />
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section ref={stepsRef} className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="how-heading flex flex-col items-center justify-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              {t.howTitle}
            </h2>
            <span className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></span>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {t.steps.map((step, i) => (
              <div key={i} className="step-item text-center flex flex-col items-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md transition-all duration-300 relative">
                  <span className="text-2xl font-bold text-blue-600">{i + 1}</span>
                  <div className="absolute inset-0 bg-blue-200 rounded-full transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 text-base">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <FloatingCTA />
    </main>
  );
}
