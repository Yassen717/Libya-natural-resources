import { Fragment, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Droplets, Flame, Fuel, LayoutGrid, Mountain, Wheat, X } from 'lucide-react';

type ResourceType = 'oil' | 'gas' | 'water' | 'mining' | 'agriculture';
type ResourceStatus = 'active' | 'inactive' | 'planned';

interface ResourcePoint {
  id: string;
  name: string;
  type: ResourceType;
  x: number;
  y: number;
  production: string;
  reserves: string;
  status: ResourceStatus;
}

const resourcePoints: ResourcePoint[] = [
  { id: '1', name: 'Sarir Field', type: 'oil', x: 65, y: 35, production: '400,000 bbl/day', reserves: '2.8 billion barrels', status: 'active' },
  { id: '2', name: 'Waha Field', type: 'oil', x: 55, y: 40, production: '300,000 bbl/day', reserves: '1.5 billion barrels', status: 'active' },
  { id: '3', name: 'Brega Field', type: 'gas', x: 70, y: 50, production: '15 billion ft³/year', reserves: '500 billion ft³', status: 'active' },
  { id: '4', name: 'Nubian Sandstone Aquifer', type: 'water', x: 40, y: 60, production: '2.5 million m³/day', reserves: '35,000 billion m³', status: 'active' },
  { id: '5', name: 'Jefara Plain', type: 'agriculture', x: 30, y: 45, production: '2 million tons/year', reserves: '500,000 hectares', status: 'active' },
  { id: '6', name: 'Iron Ore Mines', type: 'mining', x: 45, y: 25, production: '1.5 million tons/year', reserves: '100 million tons', status: 'active' },
];

interface ResourceTypeMeta {
  label: string;
  Icon: LucideIcon;
  gradient: string;
  ping: string;
  chip: string;
}

const TYPE_META: Record<ResourceType, ResourceTypeMeta> = {
  oil: {
    label: 'Oil',
    Icon: Fuel,
    gradient: 'from-amber-400 to-orange-500',
    ping: 'bg-orange-400',
    chip: 'bg-orange-50 text-orange-700',
  },
  gas: {
    label: 'Natural Gas',
    Icon: Flame,
    gradient: 'from-sky-400 to-blue-500',
    ping: 'bg-sky-400',
    chip: 'bg-sky-50 text-sky-700',
  },
  water: {
    label: 'Water',
    Icon: Droplets,
    gradient: 'from-cyan-400 to-teal-500',
    ping: 'bg-cyan-400',
    chip: 'bg-cyan-50 text-cyan-700',
  },
  mining: {
    label: 'Mining',
    Icon: Mountain,
    gradient: 'from-slate-500 to-slate-400',
    ping: 'bg-slate-400',
    chip: 'bg-slate-100 text-slate-700',
  },
  agriculture: {
    label: 'Agriculture',
    Icon: Wheat,
    gradient: 'from-emerald-400 to-green-600',
    ping: 'bg-emerald-400',
    chip: 'bg-emerald-50 text-emerald-700',
  },
};

const STATUS_META: Record<ResourceStatus, { label: string; classes: string }> = {
  active: { label: 'Active', classes: 'bg-emerald-100 text-emerald-700 ring-emerald-200' },
  inactive: { label: 'Inactive', classes: 'bg-slate-100 text-slate-600 ring-slate-200' },
  planned: { label: 'Planned', classes: 'bg-amber-100 text-amber-700 ring-amber-200' },
};

const FILTER_IDS: Array<ResourceType | 'all'> = ['all', 'oil', 'gas', 'water', 'mining', 'agriculture'];

const LIBYA_PATH =
  'M 120 200 Q 180 120 350 110 Q 600 100 670 200 Q 750 320 700 600 Q 690 700 400 700 Q 180 700 150 600 Q 100 400 120 200 Z';

export function InteractiveMap() {
  const [selectedResource, setSelectedResource] = useState<ResourcePoint | null>(null);
  const [filterType, setFilterType] = useState<ResourceType | 'all'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredResources =
    filterType === 'all' ? resourcePoints : resourcePoints.filter((resource) => resource.type === filterType);

  const selectedMeta = selectedResource ? TYPE_META[selectedResource.type] : null;
  const selectedStatus = selectedResource ? STATUS_META[selectedResource.status] : null;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/70 sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Interactive Resource Map</h2>
        <p className="mt-1 text-sm text-slate-500">
          Hover or focus a marker for a quick look, then click to see full details.
        </p>

        {/* Filter chips */}
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter resources by type">
          {FILTER_IDS.map((id) => {
            const meta = id === 'all' ? null : TYPE_META[id];
            const Icon = meta ? meta.Icon : LayoutGrid;
            const label = meta ? meta.label : 'All';
            const activeBg = meta ? meta.chip : 'bg-emerald-50 text-emerald-700';
            const isActive = filterType === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setFilterType(id)}
                aria-pressed={isActive}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? `${activeBg} ring-2 ring-emerald-500 ring-offset-1 shadow-sm`
                    : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div className="relative h-96 w-full overflow-hidden rounded-xl bg-gradient-to-b from-sky-100 via-sky-50 to-cyan-50 ring-1 ring-sky-200/70">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="libya-sand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
            <filter id="land-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#b45309" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Faint coordinate grid */}
          <g stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 6" opacity="0.35">
            <line x1="0" y1="200" x2="800" y2="200" />
            <line x1="0" y1="400" x2="800" y2="400" />
            <line x1="0" y1="600" x2="800" y2="600" />
            <line x1="200" y1="0" x2="200" y2="800" />
            <line x1="400" y1="0" x2="400" y2="800" />
            <line x1="600" y1="0" x2="600" y2="800" />
          </g>

          {/* Libya landmass */}
          <path
            d={LIBYA_PATH}
            fill="url(#libya-sand)"
            stroke="#d97706"
            strokeWidth="3"
            strokeOpacity="0.55"
            filter="url(#land-shadow)"
          />
          {/* Decorative inner border */}
          <path
            d={LIBYA_PATH}
            transform="translate(30 28) scale(0.93)"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="8 8"
            opacity="0.45"
          />
        </svg>

        {/* Resource markers */}
        {filteredResources.map((resource) => {
          const meta = TYPE_META[resource.type];
          const isSelected = selectedResource?.id === resource.id;
          return (
            <Fragment key={resource.id}>
              {resource.status === 'active' && (
                <span
                  aria-hidden="true"
                  className={`absolute z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full ${meta.ping} opacity-50`}
                  style={{ left: `${resource.x}%`, top: `${resource.y}%` }}
                />
              )}
              <button
                type="button"
                onMouseEnter={() => setHoveredId(resource.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(resource.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => setSelectedResource(resource)}
                aria-label={`${resource.name}, ${meta.label}`}
                className={`absolute z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br ${meta.gradient} text-white shadow-lg ring-4 transition-all duration-200 hover:scale-125 focus:outline-none focus-visible:ring-emerald-400 ${
                  isSelected ? 'scale-110 ring-emerald-300' : 'ring-white/90'
                }`}
                style={{ left: `${resource.x}%`, top: `${resource.y}%` }}
              >
                <meta.Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              {hoveredId === resource.id && (
                <div
                  role="tooltip"
                  className="pointer-events-none absolute z-30 w-48 animate-fade-in rounded-xl bg-white/95 p-3 shadow-xl ring-1 ring-slate-200 backdrop-blur-sm"
                  style={{
                    left: `${resource.x}%`,
                    top: `${resource.y}%`,
                    transform: 'translate(-50%, calc(-100% - 30px))',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${meta.gradient} text-white`}
                    >
                      <meta.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold leading-tight text-slate-800">{resource.name}</span>
                  </div>
                  <div className="mt-2 space-y-1 text-xs">
                    <p className="flex items-center justify-between gap-2">
                      <span className="text-slate-500">Type</span>
                      <span className="font-medium text-slate-700">{meta.label}</span>
                    </p>
                    <p className="flex items-center justify-between gap-2">
                      <span className="text-slate-500">Production</span>
                      <span className="font-medium text-emerald-700">{resource.production}</span>
                    </p>
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-hidden="true">
        {FILTER_IDS.filter((id): id is ResourceType => id !== 'all').map((type) => {
          const meta = TYPE_META[type];
          return (
            <span key={type} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br ${meta.gradient} text-white shadow-sm`}
              >
                <meta.Icon className="h-3 w-3" aria-hidden="true" />
              </span>
              {meta.label}
            </span>
          );
        })}
      </div>

      {/* Details panel */}
      {selectedResource && selectedMeta && selectedStatus && (
        <div
          className="mt-6 animate-fade-in rounded-2xl bg-gradient-to-br from-emerald-50/80 to-sky-50/80 p-6 ring-1 ring-emerald-100"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${selectedMeta.gradient} text-white shadow-lg`}
              >
                <selectedMeta.Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{selectedResource.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${selectedStatus.classes}`}
                  >
                    {selectedStatus.label}
                  </span>
                  <span className="text-xs text-slate-500">{selectedMeta.label}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedResource(null)}
              aria-label="Close resource details"
              title="Close"
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-slate-600"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current Production</p>
              <p className="mt-1 text-lg font-bold text-emerald-700">{selectedResource.production}</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Proven Reserves</p>
              <p className="mt-1 text-lg font-bold text-sky-700">{selectedResource.reserves}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
