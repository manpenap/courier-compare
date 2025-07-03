import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const QuoteSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  weight: z.number(),
  length: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = QuoteSchema.parse(body);

    // Aquí iría la lógica para consultar APIs de couriers (mock por ahora)
    const results = [
      {
        courier: "ChileExpress",
        price: 2500,
        time: "2-3 días",
        coverage: true,
      },
      {
        courier: "Correos Chile",
        price: 1800,
        time: "3-5 días",
        coverage: true,
      },
    ];

    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
