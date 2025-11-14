import React from 'react';

// PUBLIC_INTERFACE
export default function Chart({ title = 'Chart', data = [] }) {
  /** Minimal chart placeholder using SVG line; avoids extra deps. */
  const width = 320;
  const height = 120;
  const padding = 20;

  const maxVal = Math.max(...data.map(d => d.value), 1);
  const points = data.map((d, i) => {
    const x = padding + (i * (width - padding * 2)) / Math.max(data.length - 1, 1);
    const y = height - padding - (d.value / maxVal) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{title}</div>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <rect x="0" y="0" width={width} height={height} fill="#ffffff" />
        <polyline
          fill="none"
          stroke="#2563EB"
          strokeWidth="3"
          points={points}
        />
      </svg>
    </div>
  );
}
