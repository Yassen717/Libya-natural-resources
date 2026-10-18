import {
  AlertTriangle,
  CloudRain,
  Droplets,
  Leaf,
  Mountain,
  PieChart,
  Sprout,
  TrendingDown,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const stats = [
  {
    label: 'Arable land',
    value: 1.75,
    unit: 'million hectares',
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    label: 'Currently cultivated',
    value: 0.5,
    unit: 'million hectares',
    color: 'from-amber-400 to-amber-600',
  },
  {
    label: 'Utilization rate',
    value: 28.5,
    unit: '%',
    color: 'from-blue-400 to-blue-600',
  },
];

const crops = [
  { name: 'Wheat', percent: 35 },
  { name: 'Barley', percent: 25 },
  { name: 'Olives', percent: 15 },
  { name: 'Dates', percent: 10 },
  { name: 'Vegetables', percent: 15 },
];

interface Challenge {
  text: string;
  icon: LucideIcon;
}

const challenges: Challenge[] = [
  { text: 'Water scarcity and climate change', icon: Droplets },
  { text: 'Desertification and soil erosion', icon: Mountain },
  { text: 'Low investment in modern farming technology', icon: TrendingDown },
  { text: 'Reliance on seasonal rainfall', icon: CloudRain },
  { text: 'Shortage of skilled agricultural labor', icon: Users },
];

const CROP_COLORS = crops.map((_, i) => `hsl(${i * 60}, 70%, 50%)`);
const TOTAL_PERCENT = crops.reduce((sum, crop) => sum + crop.percent, 0);

const DONUT_R = 16;
const DONUT_CIRC = 2 * Math.PI * DONUT_R;
const cropSegments = crops.map((crop, i) => {
  const start = crops.slice(0, i).reduce((sum, c) => sum + c.percent, 0);
  const val = DONUT_CIRC * (crop.percent / 100);
  return {
    ...crop,
    color: CROP_COLORS[i],
    dashArray: `${val} ${DONUT_CIRC - val}`,
    dashOffset: DONUT_CIRC - DONUT_CIRC * (start / 100),
  };
});

export function AgriculturalResources() {
  const cropDescription = crops.map((crop) => `${crop.name} ${crop.percent}%`).join(', ');

  return (
    <div className="space-y-10 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200/70">
      <div className="mb-6">
        <h2 className="mb-2 flex items-center gap-2 text-3xl font-bold text-emerald-800">
          <Leaf className="h-7 w-7 text-emerald-500" aria-hidden="true" />
          Agricultural Resources in Libya
        </h2>
        <p className="mb-4 text-lg text-slate-600">
          Agriculture remains a pillar of Libya&apos;s food security despite climatic and
          economic challenges. Here is a look at the state of agricultural land use today.
        </p>
      </div>

      {/* Key statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center rounded-2xl bg-gradient-to-br ${stat.color} p-6 text-white shadow-lg`}
          >
            <Sprout className="mb-2 h-8 w-8" aria-hidden="true" />
            <div className="mb-1 text-3xl font-bold">{stat.value}</div>
            <div className="mb-1 text-lg font-semibold">{stat.unit}</div>
            <div className="text-base">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Crop distribution donut */}
      <figure className="flex animate-fade-in flex-col items-center gap-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 p-8 md:flex-row">
        <div className="flex-1">
          <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-emerald-700">
            <PieChart className="h-6 w-6 text-emerald-500" aria-hidden="true" />
            Main crop distribution
          </h3>
          <ul className="space-y-2">
            {crops.map((crop, i) => (
              <li key={crop.name} className="flex items-center gap-3">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ background: CROP_COLORS[i] }}
                  aria-hidden="true"
                />
                <span className="font-semibold text-slate-700">{crop.name}</span>
                <span className="ml-auto font-bold text-emerald-800">{crop.percent}%</span>
              </li>
            ))}
          </ul>
        </div>

        <svg
          width="160"
          height="160"
          viewBox="0 0 36 36"
          className="block"
          role="img"
          aria-label={`Donut chart of main crop distribution: ${cropDescription}`}
        >
          {cropSegments.map((crop) => (
            <circle
              key={crop.name}
              r={DONUT_R}
              cx="18"
              cy="18"
              fill="transparent"
              stroke={crop.color}
              strokeWidth="3.5"
              strokeDasharray={crop.dashArray}
              strokeDashoffset={crop.dashOffset}
            />
          ))}
          <text
            x="18"
            y="17.5"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-800 text-[6px] font-bold"
          >
            {TOTAL_PERCENT}%
          </text>
          <text
            x="18"
            y="23"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-500 text-[2.5px]"
          >
            total cultivated
          </text>
        </svg>
      </figure>

      {/* Key challenges */}
      <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-lg">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-amber-700">
          <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden="true" />
          Key challenges
        </h3>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {challenges.map((challenge) => (
            <li
              key={challenge.text}
              className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100"
            >
              <challenge.icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
              <span className="text-sm font-medium text-slate-700">{challenge.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
