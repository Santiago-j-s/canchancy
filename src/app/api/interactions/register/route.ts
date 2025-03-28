import {NextRequest, NextResponse} from "next/server";

import {FIELDS} from "@/lib/constants";

const commands = [
  {
    name: "reserva",
    description: "Muestra las canchas disponibles",
    type: 1,
    options: [
      {
        name: "lugar",
        description: "Selecciona el lugar",
        type: 3,
        required: true,
        choices: [FIELDS.CASTRO, FIELDS.GOLAZO],
      },
      {
        name: "fecha",
        description: "Fecha de la reserva (YYYY-MM-DD)",
        type: 3,
        required: true,
      },
    ],
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");

  if (secret !== process.env.SECRET) {
    return NextResponse.json({error: "Invalid secret"}, {status: 401});
  }

  const data = await fetch(
    `https://discord.com/api/v10/applications/${process.env.APPLICATION_ID!}/guilds/${process.env.GUILD_ID!}/commands`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
    },
  ).then((res) => res.json());

  return NextResponse.json(data);
}
