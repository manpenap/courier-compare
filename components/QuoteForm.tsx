"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const QuoteSchema = z.object({
  origin: z.string().min(2, "Requerido"),
  destination: z.string().min(2, "Requerido"),
  weight: z.coerce.number().min(0.01, "Requerido"),
  length: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
});

type QuoteFormData = z.infer<typeof QuoteSchema>;

export default function QuoteForm({ onResult }: { onResult: (data: any) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(QuoteSchema),
  });
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: QuoteFormData) => {
    setApiError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.success) {
        setApiError(result.error || "Error al consultar la API");
        onResult(null);
        return;
      }
      onResult(result);
    } catch (err) {
      setApiError("Error de red o servidor. Intenta nuevamente.");
      onResult(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      <input {...register("origin")} placeholder="Origen" className="input" />
      {errors.origin && <span className="text-red-500">{errors.origin.message}</span>}
      <input {...register("destination")} placeholder="Destino" className="input" />
      {errors.destination && <span className="text-red-500">{errors.destination.message}</span>}
      <input {...register("weight")} placeholder="Peso (kg)" type="number" step="0.01" className="input" />
      {errors.weight && <span className="text-red-500">{errors.weight.message}</span>}
      <input {...register("length")} placeholder="Largo (cm)" type="number" className="input" />
      <input {...register("width")} placeholder="Ancho (cm)" type="number" className="input" />
      <input {...register("height")} placeholder="Alto (cm)" type="number" className="input" />
      {apiError && <div className="text-red-600 font-semibold">{apiError}</div>}
      <button type="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "Consultando..." : "Comparar"}
      </button>
    </form>
  );
}
