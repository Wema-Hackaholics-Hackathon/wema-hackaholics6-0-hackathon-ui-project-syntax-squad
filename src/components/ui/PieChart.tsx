"use client";

type Slice = { label: string; value: number; color: string };

export default function PieChart({ data, size = 220 }: { data: Slice[]; size?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = size / 2;
  const center = { x: radius, y: radius };
  let startAngle = -Math.PI / 2; // start at top

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((d, i) => {
        const fraction = d.value / total;
        const endAngle = startAngle + fraction * Math.PI * 2;
        const largeArc = fraction > 0.5 ? 1 : 0;

        const startX = center.x + radius * Math.cos(startAngle);
        const startY = center.y + radius * Math.sin(startAngle);
        const endX = center.x + radius * Math.cos(endAngle);
        const endY = center.y + radius * Math.sin(endAngle);

        const pathData = [
          `M ${center.x} ${center.y}`,
          `L ${startX} ${startY}`,
          `A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
          'Z'
        ].join(' ');

        startAngle = endAngle;

        return <path key={i} d={pathData} fill={d.color} />;
      })}
    </svg>
  );
}


