"use client";

import { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=39.9042&longitude=116.4074&current_weather=true")
      .then((r) => r.json() as Promise<{ current_weather?: { temperature: number; weathercode: number } }>)
      .then((d) => {
        if (d.current_weather) {
          const code = d.current_weather.weathercode;
          const emoji = code === 0 ? "☀️" : code <= 3 ? "⛅" : code <= 49 ? "🌫️" : code <= 69 ? "🌧️" : code <= 79 ? "❄️" : "⛈️";
          setInfo(`${emoji} ${Math.round(d.current_weather.temperature)}°`);
        }
      })
      .catch(() => {});
  }, []);

  if (!info) return null;
  return <span className="text-text-faint text-xs">{info}</span>;
}
