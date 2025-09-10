// app/api/balance/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Random total balance between 500 and 20,000
  const totalBalance = Math.floor(Math.random() * (20000 - 500 + 1)) + 500;

  // Random last month balance between 100 and 5,000
  const lastMonthBalance = Math.floor(Math.random() * (5000 - 100 + 1)) + 100;

  // Random last month balance between 100 and 5,000
  const lastMonthSpending = Math.floor(Math.random() * (5000 - 100 + 1)) + 100;

  // Random this month spending, <= totalBalance
  const thisMonthSpending = Math.floor(Math.random() * totalBalance);

  // Calculate difference percentage
  const diff = ((thisMonthSpending - lastMonthSpending) / lastMonthSpending) * 100;
  const diffFormatted = (diff >= 0 ? "+" : "") + Math.round(diff) + "%";

  // Calculate difference percentage
  const savDiff = ((totalBalance - lastMonthBalance) / lastMonthBalance) * 100;
  const savdiffFormatted = (savDiff >= 0 ? "+" : "") + Math.round(diff) + "%";

  return NextResponse.json({
    totalBalance,
    lastMonthSpending,
    thisMonthSpending,
    savingDifference: savdiffFormatted,
    spendingDifference: diffFormatted,
  });
}
