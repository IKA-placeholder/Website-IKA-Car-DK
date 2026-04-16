import { useContext } from "react";

import { LanguageContext } from "./LanguageProvider";

export function FAQSchema() {
  const { language } = useContext(LanguageContext);

  const schemaDa = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Hvad er min bil værd?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Din bils værdi afhænger af mange faktorer: mærke, model, årgang, kilometerstand, udstyr og stand. Med Autoværdi kan du få en gratis vurdering ved at indtaste din nummerplade. Vi analyserer markedsværdien baseret på faktiske salgspriser fra Danmark.",
        },
      },
      {
        "@type": "Question",
        name: "Hvordan finder jeg ud af hvad min bil er værd?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Den nemmeste måde at finde ud af hvad din bil er værd, er at bruge en online bilvurderingstjeneste som Autoværdi. Indtast blot din nummerplade, og du får straks en vurdering baseret på aktuelle markedsdata.",
        },
      },
      {
        "@type": "Question",
        name: "Hvor meget er min brugte bil værd?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Værdien af en brugt bil varierer meget afhængigt af alder, stand og udstyr. En bil taber typisk 15-20% i værdi det første år og herefter 10-15% årligt. Brug Autoværdis gratis værktøj til at få en præcis vurdering af netop din bil.",
        },
      },
      {
        "@type": "Question",
        name: "Hvordan fungerer bilvurdering på Autoværdi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Det er simpelt: indtast din nummerplade, så finder vi din bil i databasen og beregner en realistisk markedsværdi baseret på årgang, model og aktuelle markedspriser.",
        },
      },
      {
        "@type": "Question",
        name: "Er bilvurderingen gratis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, vores online bilvurdering er helt gratis. Du kan få et øjeblikkeligt prisoverslag ved at indtaste din nummerplade.",
        },
      },
      {
        "@type": "Question",
        name: "Hvor præcis er vurderingen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vores vurdering er baseret på avancerede algoritmer og aktuelle markedsdata fra danske bilmarkeder. Den giver et realistisk estimat af din bils værdi.",
        },
      },
    ],
  };

  const schemaEn = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does car valuation work on Autoværdi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It is simple: enter your license plate, we find your car in the database and calculate a realistic market value based on year, model and current market prices.",
        },
      },
      {
        "@type": "Question",
        name: "Is the car valuation free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our online car valuation is completely free. You can get an instant price estimate by entering your license plate.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is the valuation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our valuation is based on advanced algorithms and current market data from Danish car markets. It provides a realistic estimate of your car's value.",
        },
      },
    ],
  };

  const schema = language === "da" ? schemaDa : schemaEn;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
