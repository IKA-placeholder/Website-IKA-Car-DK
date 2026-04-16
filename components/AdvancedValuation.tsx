import { LanguageContext } from "@components/LanguageProvider";
import { useState, useContext } from "react";

interface AdvancedFormData {
  mileage: string;
  horsepower: string;
  condition: string;
  hasServiceHistory: boolean;
  lastInspectionDate: string;
  modifications: string;
  ownerCount: string;
}

const TEXT = {
  da: {
    title: "Avanceret Vurdering",
    description: "Få en mere præcis vurdering ved at udfylde flere detaljer om din bil",
    loginRequired: "Du skal være logget ind for at bruge avanceret vurdering",
    register: "Opret konto",
    login: "Log ind",
    mileage: "Kilometertal",
    horsepower: "Hestekræfter",
    condition: "Stand",
    conditionOptions: {
      excellent: "Fremragende",
      good: "God",
      fair: "Rimelig",
      poor: "Dårlig",
    },
    hasServiceHistory: "Komplet servicebog",
    yes: "Ja",
    no: "Nej",
    lastInspection: "Seneste syn",
    modifications: "Modificeringer/Opgraderinger",
    ownerCount: "Antal tidligere ejere",
    calculate: "Beregn værdi",
    back: "Tilbage",
  },
  en: {
    title: "Advanced Valuation",
    description: "Get a more accurate valuation by providing additional details about your car",
    loginRequired: "You need to be logged in to use advanced valuation",
    register: "Create account",
    login: "Log in",
    mileage: "Mileage",
    horsepower: "Horsepower",
    condition: "Condition",
    conditionOptions: {
      excellent: "Excellent",
      good: "Good",
      fair: "Fair",
      poor: "Poor",
    },
    hasServiceHistory: "Complete service history",
    yes: "Yes",
    no: "No",
    lastInspection: "Last inspection date",
    modifications: "Modifications/Upgrades",
    ownerCount: "Previous owner count",
    calculate: "Calculate value",
    back: "Back",
  },
};

interface Props {
  plateNumber: string;
  onBack: () => void;
  isLoggedIn?: boolean;
}

export default function AdvancedValuation({ plateNumber, onBack, isLoggedIn = false }: Props) {
  const { language } = useContext(LanguageContext);
  const t = TEXT[language];
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState<AdvancedFormData>({
    mileage: "",
    horsepower: "",
    condition: "good",
    hasServiceHistory: false,
    lastInspectionDate: "",
    modifications: "",
    ownerCount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - in a real app, this would send data to the backend
    console.log("Advanced valuation for plate", plateNumber, "with data:", formData);
  };

  if (!isLoggedIn) {
    return (
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-100 bg-white/90 p-8 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="mb-6 text-gray-600">{t.loginRequired}</p>

        {!showLogin ? (
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => setShowLogin(true)}
              className="w-full rounded-xl bg-blue-600 py-3 text-white transition-colors hover:bg-blue-700"
            >
              {t.login}
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="w-full rounded-xl bg-gray-100 py-3 text-gray-800 transition-colors hover:bg-gray-200"
            >
              {t.register}
            </button>
            <button
              onClick={onBack}
              className="w-full py-3 text-gray-600 transition-colors hover:text-gray-800"
            >
              {t.back}
            </button>
          </div>
        ) : (
          <AccountForm onCancel={() => setShowLogin(false)} language={language} />
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-100 bg-white/90 p-8 shadow-xl">
      <h2 className="mb-2 text-2xl font-bold text-gray-900">{t.title}</h2>
      <p className="mb-6 text-gray-600">{t.description}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{t.mileage}</label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="120000"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{t.horsepower}</label>
            <input
              type="number"
              name="horsepower"
              value={formData.horsepower}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="150"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{t.condition}</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(t.conditionOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasServiceHistory"
            name="hasServiceHistory"
            checked={formData.hasServiceHistory}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="hasServiceHistory" className="ml-2 block text-sm text-gray-700">
            {t.hasServiceHistory}
          </label>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{t.lastInspection}</label>
          <input
            type="date"
            name="lastInspectionDate"
            value={formData.lastInspectionDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{t.modifications}</label>
          <textarea
            name="modifications"
            value={formData.modifications}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Eftermonteret udstyr, opgraderinger, etc."
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{t.ownerCount}</label>
          <input
            type="number"
            name="ownerCount"
            value={formData.ownerCount}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="2"
            min="0"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            {t.back}
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
          >
            {t.calculate}
          </button>
        </div>
      </form>
    </div>
  );
}

// Account Registration/Login Form
function AccountForm({ onCancel, language }: { onCancel: () => void; language: "da" | "en" }) {
  const [isLogin, setIsLogin] = useState(true);
  const accountText = {
    da: {
      login: "Log ind",
      register: "Opret konto",
      email: "Email",
      password: "Adgangskode",
      confirmPassword: "Bekræft adgangskode",
      name: "Navn",
      phone: "Telefon",
      submit: "Send",
      toggleMessage: isLogin
        ? "Har du ikke en konto? Opret nu"
        : "Har du allerede en konto? Log ind",
      cancel: "Annuller",
    },
    en: {
      login: "Log in",
      register: "Create account",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      name: "Name",
      phone: "Phone",
      submit: "Submit",
      toggleMessage: isLogin
        ? "Don't have an account? Register now"
        : "Already have an account? Log in",
      cancel: "Cancel",
    },
  };

  const t = accountText[language];

  return (
    <div className="space-y-4">
      <h3 className="mb-4 text-xl font-semibold">{isLogin ? t.login : t.register}</h3>

      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{t.email}</label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{t.password}</label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {!isLogin && (
          <>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t.confirmPassword}
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">{t.name}</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">{t.phone}</label>
              <input
                type="tel"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3 text-white transition-colors hover:bg-blue-700"
        >
          {t.submit}
        </button>
      </form>

      <button
        className="cursor-pointer text-center text-sm text-blue-600 hover:underline"
        onClick={() => setIsLogin(!isLogin)}
      >
        {t.toggleMessage}
      </button>

      <button
        onClick={onCancel}
        className="w-full py-2 text-gray-600 transition-colors hover:text-gray-800"
      >
        {t.cancel}
      </button>
    </div>
  );
}
