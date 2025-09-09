"use client";

type Slice = { label: string; value: number; color: string };

export default function PieChart({ data, size = 220 }: { data: Slice[]; size?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${radius} ${radius})`}>
        {data.map((d, i) => {
          const fraction = d.value / total;
          const dash = fraction * circumference;
          const circle = (
            <circle
              key={i}
              r={radius - 8}
              cx={radius}
              cy={radius}
              fill="transparent"
              stroke={d.color}
              strokeWidth={16}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return circle;
        })}
      </g>
      <circle r={radius - 30} cx={radius} cy={radius} fill="#0f1115" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#e5e7eb" fontSize="14" fontWeight={700}>
        pie chart
      </text>
    </svg>
  );
}


