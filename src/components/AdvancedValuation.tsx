import { useState } from "react";

import { m } from "@/paraglide/messages";

interface AdvancedFormData {
  mileage: string;
  horsepower: string;
  condition: string;
  hasServiceHistory: boolean;
  lastInspectionDate: string;
  modifications: string;
  ownerCount: string;
}

interface Props {
  plateNumber: string;
  onBack: () => void;
  isLoggedIn?: boolean;
}

export default function AdvancedValuation({ plateNumber, onBack, isLoggedIn = false }: Props) {
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
    console.log("Advanced valuation for plate", plateNumber, "with data:", formData);
  };

  if (!isLoggedIn) {
    return (
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-100 bg-white/90 p-8 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">{m.advanced_title()}</h2>
        <p className="mb-6 text-gray-600">{m.advanced_login_required()}</p>

        {!showLogin ? (
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => setShowLogin(true)}
              className="w-full rounded-xl bg-blue-600 py-3 text-white transition-colors hover:bg-blue-700"
            >
              {m.advanced_login()}
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="w-full rounded-xl bg-gray-100 py-3 text-gray-800 transition-colors hover:bg-gray-200"
            >
              {m.advanced_register()}
            </button>
            <button
              onClick={onBack}
              className="w-full py-3 text-gray-600 transition-colors hover:text-gray-800"
            >
              {m.advanced_back()}
            </button>
          </div>
        ) : (
          <AccountForm onCancel={() => setShowLogin(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-100 bg-white/90 p-8 shadow-xl">
      <h2 className="mb-2 text-2xl font-bold text-gray-900">{m.advanced_title()}</h2>
      <p className="mb-6 text-gray-600">{m.advanced_desc()}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {m.advanced_mileage()}
            </label>
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
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {m.advanced_horsepower()}
            </label>
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
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {m.advanced_condition()}
          </label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            <option value="excellent">{m.advanced_condition_excellent()}</option>
            <option value="good">{m.advanced_condition_good()}</option>
            <option value="fair">{m.advanced_condition_fair()}</option>
            <option value="poor">{m.advanced_condition_poor()}</option>
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
            {m.advanced_service_history()}
          </label>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {m.advanced_last_inspection()}
          </label>
          <input
            type="date"
            name="lastInspectionDate"
            value={formData.lastInspectionDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {m.advanced_modifications()}
          </label>
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
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {m.advanced_owner_count()}
          </label>
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
            {m.advanced_back()}
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
          >
            {m.advanced_calculate()}
          </button>
        </div>
      </form>
    </div>
  );
}

// Account Registration/Login Form
function AccountForm({ onCancel }: { onCancel: () => void }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="space-y-4">
      <h3 className="mb-4 text-xl font-semibold">{isLogin ? m.login_title() : m.signup_title()}</h3>

      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {m.account_email()}
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {m.account_password()}
          </label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {!isLogin && (
          <>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {m.account_confirm_password()}
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {m.account_name()}
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {m.account_phone()}
              </label>
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
          {m.account_submit()}
        </button>
      </form>

      <button
        className="cursor-pointer text-center text-sm text-blue-600 hover:underline"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? m.account_toggle_register() : m.account_toggle_login()}
      </button>

      <button
        onClick={onCancel}
        className="w-full py-2 text-gray-600 transition-colors hover:text-gray-800"
      >
        {m.account_cancel()}
      </button>
    </div>
  );
}
