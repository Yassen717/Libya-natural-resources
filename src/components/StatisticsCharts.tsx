import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ChartKind = 'pie' | 'line' | 'bar';

interface ProductionShareDatum {
  name: string;
  value: number;
  color: string;
}

interface SeriesDatum {
  oil: number;
  gas: number;
  minerals: number;
}

const productionShare: ProductionShareDatum[] = [
  { name: 'Crude Oil', value: 45, color: '#f59e0b' },
  { name: 'Natural Gas', value: 25, color: '#3b82f6' },
  { name: 'Minerals', value: 15, color: '#94a3b8' },
  { name: 'Groundwater', value: 10, color: '#06b6d4' },
  { name: 'Agriculture', value: 5, color: '#059669' },
];

const yearlyProduction: Array<{ year: string } & SeriesDatum> = [
  { year: '2019', oil: 1200, gas: 850, minerals: 400 },
  { year: '2020', oil: 950, gas: 780, minerals: 380 },
  { year: '2021', oil: 1100, gas: 820, minerals: 420 },
  { year: '2022', oil: 1350, gas: 950, minerals: 450 },
  { year: '2023', oil: 1400, gas: 980, minerals: 480 },
];

const regionalProduction: Array<{ region: string } & SeriesDatum> = [
  { region: 'East', oil: 60, gas: 40, minerals: 30 },
  { region: 'West', oil: 35, gas: 55, minerals: 45 },
  { region: 'South', oil: 20, gas: 25, minerals: 60 },
  { region: 'Central', oil: 45, gas: 30, minerals: 35 },
];

const SERIES_META: Array<{ key: keyof SeriesDatum; label: string; color: string }> = [
  { key: 'oil', label: 'Oil', color: '#f59e0b' },
  { key: 'gas', label: 'Gas', color: '#3b82f6' },
  { key: 'minerals', label: 'Minerals', color: '#94a3b8' },
];

const CHART_TABS: Array<{ id: ChartKind; label: string; Icon: LucideIcon }> = [
  { id: 'pie', label: 'Pie Chart', Icon: PieChartIcon },
  { id: 'line', label: 'Line Chart', Icon: TrendingUp },
  { id: 'bar', label: 'Bar Chart', Icon: BarChart3 },
];

interface ChartTooltipEntry {
  name?: number | string;
  value?: number | string;
  color?: string;
  payload?: { color?: string; fill?: string };
}

interface ChartTooltipProps {
  active?: boolean;
  label?: number | string;
  payload?: ReadonlyArray<ChartTooltipEntry>;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl bg-white/95 px-3.5 py-2.5 text-sm shadow-xl ring-1 ring-slate-200 backdrop-blur-sm">
      {label !== undefined && label !== '' && (
        <p className="mb-1.5 font-semibold text-slate-800">{label}</p>
      )}
      <ul className="space-y-1">
        {payload.map((entry, index) => (
          <li key={`${entry.name ?? 'series'}-${index}`} className="flex items-center gap-2 text-slate-600">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color ?? entry.payload?.fill ?? entry.payload?.color ?? '#94a3b8' }}
            />
            <span>{entry.name}</span>
            <span className="ml-auto pl-3 font-semibold text-slate-800">{entry.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface PieLabelRenderProps {
  cx?: number;
  x?: number;
  y?: number;
  name?: string;
  percent?: number;
}

function renderPieLabel({ cx = 0, x = 0, y = 0, name = '', percent }: PieLabelRenderProps) {
  return (
    <text
      x={x}
      y={y}
      fill="#334155"
      fontSize={12}
      fontWeight={600}
      textAnchor={x >= cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{ pointerEvents: 'none' }}
    >
      {`${name} ${Math.round((percent ?? 0) * 100)}%`}
    </text>
  );
}

function ProductionPieChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={productionShare}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={2}
          stroke="#ffffff"
          strokeWidth={2}
          isAnimationActive
          label={renderPieLabel}
          labelLine
        >
          {productionShare.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
        <Legend verticalAlign="bottom" iconType="circle" iconSize={10} />
      </PieChart>
    </ResponsiveContainer>
  );
}

function ProductionLineChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={yearlyProduction} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="year" tickLine={false} axisLine={{ stroke: '#cbd5e1' }} tick={{ fill: '#64748b', fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
        <Tooltip content={<ChartTooltip />} />
        <Legend verticalAlign="top" iconType="circle" iconSize={10} />
        {SERIES_META.map((series) => (
          <Line
            key={series.key}
            type="monotone"
            dataKey={series.key}
            name={series.label}
            stroke={series.color}
            strokeWidth={3}
            dot={{ r: 4, fill: series.color, stroke: '#ffffff', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

function RegionalBarChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={regionalProduction} margin={{ top: 16, right: 24, left: 0, bottom: 8 }} barCategoryGap="28%">
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="region" tickLine={false} axisLine={{ stroke: '#cbd5e1' }} tick={{ fill: '#64748b', fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.12)' }} />
        <Legend verticalAlign="top" iconType="circle" iconSize={10} />
        {SERIES_META.map((series) => (
          <Bar
            key={series.key}
            dataKey={series.key}
            name={series.label}
            fill={series.color}
            radius={[6, 6, 0, 0]}
            maxBarSize={36}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

const SUMMARY_CARDS = [
  { value: '1.4M', label: 'bbl oil/day', gradient: 'from-amber-50 to-orange-100', ring: 'ring-orange-200/60', valueColor: 'text-orange-800', labelColor: 'text-orange-600' },
  { value: '980M', label: 'ft³ gas/day', gradient: 'from-sky-50 to-blue-100', ring: 'ring-blue-200/60', valueColor: 'text-blue-800', labelColor: 'text-blue-600' },
  { value: '480K', label: 'tons minerals/year', gradient: 'from-slate-50 to-slate-200', ring: 'ring-slate-300/60', valueColor: 'text-slate-800', labelColor: 'text-slate-600' },
  { value: '2.5M', label: 'm³ water/day', gradient: 'from-cyan-50 to-cyan-100', ring: 'ring-cyan-200/60', valueColor: 'text-cyan-800', labelColor: 'text-cyan-600' },
] as const;

export function StatisticsCharts() {
  const [activeChart, setActiveChart] = useState<ChartKind>('pie');

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/70 sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Statistics &amp; Charts</h2>
        <p className="mt-1 text-sm text-slate-500">National production breakdown and regional output.</p>

        {/* Chart switcher */}
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Chart type">
          {CHART_TABS.map((tab) => {
            const isActive = activeChart === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveChart(tab.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <tab.Icon className="h-4 w-4" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart container */}
      <div className="rounded-xl bg-slate-50/80 p-4 ring-1 ring-slate-200/70 sm:p-6">
        {activeChart === 'pie' && <ProductionPieChart />}
        {activeChart === 'line' && <ProductionLineChart />}
        {activeChart === 'bar' && <RegionalBarChart />}
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {SUMMARY_CARDS.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl bg-gradient-to-br ${stat.gradient} p-4 text-center shadow-sm ring-1 ${stat.ring} transition-shadow hover:shadow-md`}
          >
            <div className={`text-2xl font-bold ${stat.valueColor}`}>{stat.value}</div>
            <div className={`mt-0.5 text-sm ${stat.labelColor}`}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
