import { useEffect, useState } from "react";

export default function LicensePlateSearch() {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
    //test
  useEffect(() => {
    async function sendClick() {
      try {
        const response = await fetch(
          "https://ika-car-dk-api.onrender.com/click/1",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch company link");
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      }
    }

    sendClick();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (data === null) return <div>Loading…</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
