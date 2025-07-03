"use client";

import Image from "next/image";
import QuoteForm from "../components/QuoteForm";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<any>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-3xl font-bold mb-4">CourierCompare Chile</h1>
      <p className="mb-6 text-lg text-center max-w-xl">
        Compara precios de envío entre couriers en tiempo real. Ingresa los datos
        de tu envío y obtén la mejor opción para tu negocio.
      </p>
      <QuoteForm onResult={setResults} />
      {results && (
        <div className="mt-8 w-full max-w-xl">
          <h2 className="text-xl font-semibold mb-2">Resultados</h2>
          <table className="w-full border text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-1">Courier</th>
                <th className="border px-2 py-1">Precio</th>
                <th className="border px-2 py-1">Tiempo</th>
                <th className="border px-2 py-1">Cobertura</th>
              </tr>
            </thead>
            <tbody>
              {results.results?.map((r: any) => (
                <tr key={r.courier}>
                  <td className="border px-2 py-1">{r.courier}</td>
                  <td className="border px-2 py-1">${r.price}</td>
                  <td className="border px-2 py-1">{r.time}</td>
                  <td className="border px-2 py-1">
                    {r.coverage ? "✓" : "✗"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
