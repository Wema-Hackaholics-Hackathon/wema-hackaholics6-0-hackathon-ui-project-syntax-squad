// app/api/balance/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Random total balance between 500 and 20,000
  const totalBalance = Math.floor(Math.random() * (20000 - 500 + 1)) + 500;

  // Random last month balance between 500 and totalBalance for realism
  const lastMonthBalance = Math.floor(Math.random() * (totalBalance - 500 + 1)) + 500;

  // Random last month spending between 100 and 5,000
  const lastMonthSpending = Math.floor(Math.random() * (5000 - 100 + 1)) + 100;

  // Random this month spending, within ±50% of lastMonthSpending for realistic trend
  const minSpending = Math.max(0, Math.floor(lastMonthSpending * 0.5));
  const maxSpending = Math.floor(lastMonthSpending * 1.5);
  const thisMonthSpending = Math.floor(Math.random() * (maxSpending - minSpending + 1)) + minSpending;

  // Calculate spending difference percentage
  const spendingDiff = ((thisMonthSpending - lastMonthSpending) / lastMonthSpending) * 100;
  const spendingDiffFormatted = (spendingDiff >= 0 ? "+" : "") + Math.round(spendingDiff) + "%";

  // Calculate savings difference percentage
  const savingDiff = ((totalBalance - lastMonthBalance) / lastMonthBalance) * 100;
  const savingDiffFormatted = (savingDiff >= 0 ? "+" : "") + Math.round(savingDiff) + "%";

  // Normalize spending impact: 0 = bad (+100% spending), 100 = good (-100% spending)
  let spendingImpact = 100 - Math.min(100, Math.max(-100, spendingDiff + 100));
  
  // Normalize savings impact: -100% or less = 0, +100% or more = 100
  let savingImpact = Math.min(100, Math.max(0, savingDiff + 100));

  // Weighted average: savings count a bit more
  let intelligenceScore = Math.round((spendingImpact * 0.4) + (savingImpact * 0.6));

  const intelligenceScoreFormatted = intelligenceScore + "%";


  return NextResponse.json({
    totalBalance,
    lastMonthBalance,
    lastMonthSpending,
    thisMonthSpending,
    spendingDifference: spendingDiffFormatted,
    savingDifference: savingDiffFormatted,
    intelligenceScore: intelligenceScoreFormatted,
  });
}
