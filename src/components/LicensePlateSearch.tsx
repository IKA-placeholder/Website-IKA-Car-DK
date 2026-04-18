"use client";

import { useForm } from "@tanstack/react-form-start";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import * as v from "valibot";

import { searchCollection, type CarData } from "@/collections/search.collection";
import AdvancedValuation from "@/components/AdvancedValuation";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";
import { plateSearch, predictPlate } from "@/server/api";

import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "./ui/number-field";

function mapPredictToCarData(data: {
  maerke?: string;
  model?: string;
  årgang?: number | string;
  estimated_price?: number;
  min_price?: number;
  max_price?: number;
  price_range?: string;
}): CarData {
  return {
    make: data.maerke || "",
    model: data.model || "",
    year: data.årgang ?? "",
    estimatedValue: data.estimated_price || 0,
    minPrice: data.min_price || 0,
    maxPrice: data.max_price || 0,
    priceRange: data.price_range || "",
  };
}

const plateSchema = v.object({
  plate: v.pipe(v.string(), v.minLength(2, m.plate_min_length())),
  kilometers: v.pipe(v.number(), v.minValue(1000, m.kilometers_min())),
});

export default function LicensePlateSearch() {
  const language = getLocale();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedPlate, setSelectedPlate] = useState("");

  const predictPlateFn = useServerFn(predictPlate);
  const searchPlateFn = useServerFn(plateSearch);

  const selectedCar = searchCollection.get(selectedPlate);

  const form = useForm({
    defaultValues: {
      plate: "",
      kilometers: 1000,
    },
    onSubmit: ({ value }) => mutateAsync(value),
    validators: {
      onChange: plateSchema,
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: { plate: string; kilometers: number }) => predictPlateFn({ data }),
    onSuccess: (data, variables) => {
      if (data && variables.plate && !searchCollection.get(variables.plate)) {
        searchCollection.insert({
          plate: variables.plate,
          kilometers: variables.kilometers,
          success: true,
          data: mapPredictToCarData(data),
          timestamp: new Date().getDate(),
        });
      } else if (data && variables.plate) {
        searchCollection.update(variables.plate, (draft) => {
          draft.data = mapPredictToCarData(data);
          draft.kilometers = variables.kilometers;
          draft.success = true;
          draft.timestamp = new Date().getDate();
          draft.error = undefined;
        });
      }
      setSelectedPlate(variables.plate);
    },
    onError: (error, variables) => {
      if (error && variables.plate && !searchCollection.get(variables.plate)) {
        searchCollection.insert({
          plate: variables.plate,
          kilometers: variables.kilometers,
          success: false,
          timestamp: new Date().getDate(),
          error: error,
        });
        setSelectedPlate(variables.plate);
      } else if (error && variables.plate) {
        searchCollection.update(variables.plate, (draft) => {
          draft.success = false;
          draft.kilometers = variables.kilometers;
          draft.error = error;
          draft.data = undefined;
          draft.timestamp = new Date().getDate();
        });
      }
    },
  });

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  if (showAdvanced) {
    return (
      <AdvancedValuation
        plateNumber={form.getFieldValue("plate")}
        onBack={() => setShowAdvanced(false)}
        isLoggedIn={isLoggedIn}
      />
    );
  }

  return (
    <div className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
        className="space-y-6"
      >
        {/* License plate input */}
        <form.Field
          name="plate"
          validators={{
            onChangeAsync: async ({ value }) => {
              const result = await searchPlateFn({ data: { plate: value } });
              return result.success === "true" ? undefined : new Error(m.invalid_plate());
            },
          }}
          asyncDebounceMs={1000}
        >
          {({ handleChange, state }) => (
            <div className="flex flex-col space-y-3">
              <label
                htmlFor="plateNumber"
                className="text-foreground flex items-center text-base font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-info mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zM15 5a1 1 0 00-1-1h-3a1 1 0 100 2h3a1 1 0 001-1zM5 5a1 1 0 011-1h3a1 1 0 110 2H6a1 1 0 01-1-1zM15 11a1 1 0 00-1-1h-3a1 1 0 100 2h3a1 1 0 001-1zM5 11a1 1 0 011-1h3a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {m.search_label()} <span className="text-destructive ml-1">*</span>
              </label>
              <InputGroup className="h-14 py-2">
                <InputGroupInput
                  type="text"
                  size="lg"
                  id="plateNumber"
                  inputClassName="text-center text-lg"
                  value={state.value}
                  onChange={(e) => handleChange(e.target.value.replace(/\s+/g, "").toUpperCase())}
                  placeholder={m.search_placeholder()}
                  required
                  pattern="[A-Z0-9 ]{2,8}"
                  title={m.search_label()}
                />
                <InputGroupAddon align="inline-end">
                  <span className="text-muted-foreground text-sm">
                    {state.meta.isValidating
                      ? "⌛"
                      : !state.meta.isDefaultValue && state.meta.isValid
                        ? "✓"
                        : "✗"}
                  </span>
                </InputGroupAddon>
              </InputGroup>
              {state.meta.errors && (
                <p className="text-destructive text-xs">
                  {state.meta.errors.map((e) => e.message).join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Kilometers input field - REQUIRED */}
        <form.Field name="kilometers">
          {({ handleChange, state }) => (
            <div className="flex flex-col space-y-3">
              <label
                htmlFor="kilometers"
                className="text-foreground flex items-center text-base font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-info mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                {m.search_km_label()} <span className="text-destructive ml-1">*</span>
              </label>
              <NumberField
                size="xl"
                value={state.value}
                onValueChange={(value) => handleChange(value ?? 0)}
                step={1000}
                min={1000}
                smallStep={100}
                largeStep={10000}
                format={{
                  maximumFractionDigits: 0,
                  style: "unit",
                  unit: "kilometer",
                }}
              >
                <NumberFieldGroup>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldGroup>
              </NumberField>
              <p className="text-muted-foreground text-sm">{m.search_km_helper()}</p>
              {state.meta.errors && (
                <p className="text-destructive text-xs">
                  {state.meta.errors.map((e) => e.message).join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Search button */}
        <form.Subscribe
          selector={(state) => ({
            canSubmit:
              state.canSubmit &&
              state.isDirty &&
              !state.isFieldsValidating &&
              !state.isSubmitting &&
              !state.isDefaultValue,
            isSubmitting: state.isSubmitting,
          })}
        >
          {(state) => (
            <button
              type="submit"
              disabled={!state.canSubmit}
              className="bg-primary text-primary-foreground ring-foreground/10 relative w-full overflow-hidden rounded-xl px-8 py-5 text-lg font-semibold shadow-sm ring-1 transition-transform before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/25 hover:brightness-110 active:scale-95 active:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-100 disabled:active:scale-100"
            >
              {state.isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" aria-hidden>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {m.search_loading()}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {m.search_button()}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </button>
          )}
        </form.Subscribe>
      </form>

      {selectedCar?.error && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            layoutId="car-error"
            className="animate-fade-in border-destructive/20 bg-destructive/10 text-destructive ring-destructive/10 mt-5 rounded-xl border p-4 shadow-sm ring-1"
          >
            <div className="flex items-center gap-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {selectedCar.error.message}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {selectedCar?.data && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            layoutId="car-details"
            className="border-border bg-card ring-border/50 mt-8 rounded-2xl border p-5 shadow-sm ring-1 md:p-6"
          >
            <h2 className="text-foreground mb-6 flex items-center gap-2 text-lg font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-info h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {m.search_car_details()}
            </h2>

            <div
              className={`grid grid-cols-1 gap-3 ${selectedCar.kilometers ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}
            >
              <div className="premium-card border-border bg-muted ring-border/50 rounded-xl border p-4 ring-1">
                <span className="bg-muted-foreground/10 text-muted-foreground mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase">
                  {m.search_make()}
                </span>
                <p className="text-foreground text-lg font-semibold">{selectedCar.data.make}</p>
              </div>
              <div className="premium-card border-border bg-muted ring-border/50 rounded-xl border p-4 ring-1">
                <span className="bg-muted-foreground/10 text-muted-foreground mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase">
                  {m.search_model()}
                </span>
                <p className="text-foreground text-lg font-semibold">{selectedCar.data.model}</p>
              </div>
              <div className="premium-card border-border bg-muted ring-border/50 rounded-xl border p-4 ring-1">
                <span className="bg-muted-foreground/10 text-muted-foreground mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase">
                  {m.search_year()}
                </span>
                <p className="text-foreground text-lg font-semibold">{selectedCar.data.year}</p>
              </div>
              {selectedCar.kilometers && (
                <div className="premium-card border-border bg-muted ring-border/50 rounded-xl border p-4 ring-1">
                  <span className="bg-muted-foreground/10 text-muted-foreground mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase">
                    {m.search_kilometers()}
                  </span>
                  <p className="text-foreground text-lg font-semibold">
                    {selectedCar.kilometers.toLocaleString(language === "da" ? "da-DK" : "en-GB")}{" "}
                    km
                  </p>
                </div>
              )}
            </div>

            <div className="border-info/20 bg-info/5 ring-info/10 mt-6 rounded-2xl border-2 p-8 shadow-lg ring-1">
              <div className="mb-3 flex items-center gap-2">
                <div className="bg-info/10 flex h-8 w-8 items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-info h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <span className="text-info text-xs font-bold tracking-widest uppercase">
                  {m.search_value_range()}
                </span>
              </div>

              <div className="flex items-center gap-3 whitespace-nowrap">
                <span className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                  {selectedCar.data.minPrice.toLocaleString(language === "da" ? "da-DK" : "en-GB")}
                </span>
                <span className="text-muted-foreground text-xl font-light">-</span>
                <span className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                  {selectedCar.data.maxPrice.toLocaleString(language === "da" ? "da-DK" : "en-GB")}
                </span>
                <span className="text-info text-xl font-semibold">kr.</span>
              </div>

              <div className="text-muted-foreground mt-4 flex items-center gap-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-success h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  {m.search_market_value()}{" "}
                  {selectedCar.data.minPrice.toLocaleString(language === "da" ? "da-DK" : "en-GB")}{" "}
                  -{" "}
                  {selectedCar.data.maxPrice.toLocaleString(language === "da" ? "da-DK" : "en-GB")}{" "}
                  kr
                </span>
              </div>
            </div>

            <div className="border-warning/20 bg-warning/10 text-warning mt-4 flex items-start gap-2 rounded-lg border p-3 text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-warning h-4 w-4 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="leading-relaxed">{m.search_disclaimer()}</p>
            </div>
          </motion.div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={toggleLogin}
              className="text-muted-foreground hover:text-foreground text-xs underline transition-colors"
            ></button>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
