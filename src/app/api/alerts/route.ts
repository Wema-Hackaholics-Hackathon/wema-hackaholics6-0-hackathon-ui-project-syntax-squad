import { NextResponse } from "next/server";
import alertsData from "@/app/data/mock-alerts.json";

export async function GET() {
  const alerts = alertsData.alerts;

  // Shuffle the alerts randomly
  const shuffled = alerts.sort(() => 0.5 - Math.random());

  // Pick the first 20 (or fewer if less available)
  const selected = shuffled.slice(0, 20);

  return NextResponse.json({
    count: selected.length,
    alerts: selected,
  });
}
