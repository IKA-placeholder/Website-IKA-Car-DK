'use client';

import { useState, useContext, useEffect } from 'react';
import { LanguageContext } from './LanguageProvider';
import AdvancedValuation from './AdvancedValuation';

interface CarData {
  make: string;
  model: string;
  year: number;
  estimatedValue: number;
}

const TEXT = {
  da: {
    label: 'Indtast nummerplade',
    placeholder: 'FX 12 345',
    button: 'Søg',
    loading: 'Søger...',
    error: 'Der opstod en fejl ved søgning. Prøv igen senere.',
    carDetails: 'Biloplysninger',
    make: 'Mærke',
    model: 'Model',
    year: 'Årgang',
    value: 'Estimeret værdi',
    advancedValuation: 'Få avanceret vurdering',
    quickValuation: 'Hurtig vurdering',
    advancedDescription: 'En mere præcis vurdering baseret på flere detaljer om din bil'
  },
  en: {
    label: 'Enter license plate',
    placeholder: 'e.g. FX 12 345',
    button: 'Search',
    loading: 'Searching...',
    error: 'An error occurred. Please try again later.',
    carDetails: 'Car details',
    make: 'Make',
    model: 'Model',
    year: 'Year',
    value: 'Estimated value',
    advancedValuation: 'Get advanced valuation',
    quickValuation: 'Quick valuation',
    advancedDescription: 'A more accurate valuation based on additional details about your car'
  },
};

export default function LicensePlateSearch() {
  const { language } = useContext(LanguageContext);
  const t = TEXT[language];
  const [plateNumber, setPlateNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [carData, setCarData] = useState<CarData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Demo state, would come from auth context in a real app
  const [animateCard, setAnimateCard] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Remove spaces from plate number for API call
      const formattedPlate = plateNumber.replace(/\s+/g, '');
      const response = await fetch(`https://ika-car-dk-api.onrender.com/predict/${formattedPlate}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch car data');
      }

      const data = await response.json();
      
      setCarData({
        make: data.maerke || '',
        model: data.model || '',
        year: data.årgang || '',
        estimatedValue: data.estimated_price || 0
      });
      
      // Trigger animation when data is loaded
      setTimeout(() => setAnimateCard(true), 100);
    } catch (err) {
      setError(t.error);
      console.error('Error fetching car data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset animation state when language changes
  useEffect(() => {
    if (carData) {
      setAnimateCard(false);
      setTimeout(() => setAnimateCard(true), 100);
    }
  }, [language, carData]);

  // For demo purposes, toggle logged in state
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  if (showAdvanced) {
    return (
      <AdvancedValuation 
        plateNumber={plateNumber} 
        onBack={() => setShowAdvanced(false)}
        isLoggedIn={isLoggedIn}
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white/95 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="plateNumber" className="text-lg font-semibold text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zM15 5a1 1 0 00-1-1h-3a1 1 0 100 2h3a1 1 0 001-1zM5 5a1 1 0 011-1h3a1 1 0 110 2H6a1 1 0 01-1-1zM15 11a1 1 0 00-1-1h-3a1 1 0 100 2h3a1 1 0 001-1zM5 11a1 1 0 011-1h3a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            {t.label}
          </label>
          <div className="relative">
            <div className="flex gap-2">
              <input
                type="text"
                id="plateNumber"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                placeholder={t.placeholder}
                className="flex-1 px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg bg-gray-50 shadow-inner"
                required
                pattern="[A-Z0-9 ]{2,8}"
                title={t.label}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t.loading}
                  </span>
                ) : (
                  <>
                    {t.button}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 animate-fade-in">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {carData && (
        <>
          <div className={`mt-8 p-6 bg-white rounded-xl shadow-lg transition-all border border-gray-100 ${animateCard ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.carDetails}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg hover-lift">
                <p className="text-sm text-blue-600 font-medium mb-1">{t.make}</p>
                <p className="font-semibold text-lg">{carData.make}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg hover-lift">
                <p className="text-sm text-blue-600 font-medium mb-1">{t.model}</p>
                <p className="font-semibold text-lg">{carData.model}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg hover-lift">
                <p className="text-sm text-blue-600 font-medium mb-1">{t.year}</p>
                <p className="font-semibold text-lg">{carData.year}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg text-white hover-lift">
                <p className="text-sm font-medium mb-1">{t.value}</p>
                <p className="font-bold text-lg">{carData.estimatedValue.toLocaleString(language === 'da' ? 'da-DK' : 'en-GB')} kr.</p>
              </div>
            </div>
          </div>

          <div className={`mt-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 ${animateCard ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t.advancedValuation}
                </h3>
                <p className="text-sm text-gray-600 ml-7">{t.advancedDescription}</p>
              </div>
              <button
                onClick={() => setShowAdvanced(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors whitespace-nowrap shadow-md flex items-center justify-center"
              >
                {t.advancedValuation}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Debug button to toggle login state - remove in production */}
          <div className="mt-4 text-center">
            <button 
              onClick={toggleLogin}
              className="text-xs text-gray-500 underline"
            >
              {isLoggedIn ? 'Debug: Set logged out' : 'Debug: Set logged in'}
            </button>
          </div>
        </>
      )}
    </div>
  );
} 