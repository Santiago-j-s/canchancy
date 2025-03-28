import {NextResponse} from "next/server";

import {DiscordInteraction, verifyRequest} from "@/lib/discord";
import {getCourtsData} from "@/lib/atc";

function parseReservationBody(body: DiscordInteraction) {
  const [court, date] = body.data?.options ?? [];

  if (!court || !date) {
    return {
      error: "No se proporcionaron suficientes opciones. `court` y `date` son requeridos.",
    } as const;
  }

  if (typeof court.value !== "string") {
    return {error: "El valor de la opción de la cancha no es válido."} as const;
  }

  if (typeof date.value !== "string") {
    return {error: "El valor de la opción de la fecha no es válido."} as const;
  }

  return {error: null, data: {court: court.value, date: date.value}} as const;
}

export async function POST(request: Request) {
  const body = await verifyRequest(request);

  // Handle ping
  if (body.type === 1) {
    return NextResponse.json({type: 1});
  }

  // Handle command
  if (body.type === 2) {
    switch (body.data?.name) {
      case "reserva": {
        const {error, data} = parseReservationBody(body);

        if (error) {
          return NextResponse.json({type: 4, data: {content: error}});
        }

        const {court, date} = data;

        const fieldData = await getCourtsData(court, date);

        return NextResponse.json({
          type: 4,
          data: {
            content: `Las canchas disponibles para **${fieldData.name}** el **${date}** son:\n${fieldData.courts.map((court) => `- **${court.name}**: ${court.slots.join(", ")}`).join("\n")}`,
          },
        });
      }
      default:
        return new Response("Unknown command", {status: 400});
    }
  }

  // Handle unknown type
  return new Response("Unknown interaction type", {status: 400});
}
