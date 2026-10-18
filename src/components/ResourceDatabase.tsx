import { useEffect, useState } from 'react';
import { Calendar, MapPin, Search, SearchX, X } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  type: 'oil' | 'gas' | 'water' | 'mining' | 'agriculture';
  location: string;
  discoveryYear: number;
  currentProduction: string;
  reserves: string;
  status: 'active' | 'inactive' | 'planned';
  technicalData: {
    depth?: string;
    quality?: string;
    extractionMethod?: string;
    lastUpdate: string;
  };
}

const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Sarir Field',
    type: 'oil',
    location: 'Sirte Basin',
    discoveryYear: 1961,
    currentProduction: '400,000 bbl/day',
    reserves: '2.8 billion barrels',
    status: 'active',
    technicalData: {
      depth: '2,800 meters',
      quality: 'Light sweet (42° API)',
      extractionMethod: 'Natural flow',
      lastUpdate: '2024-01-15'
    }
  },
  {
    id: '2',
    name: 'Waha Field',
    type: 'oil',
    location: 'Sirte Basin',
    discoveryYear: 1958,
    currentProduction: '300,000 bbl/day',
    reserves: '1.5 billion barrels',
    status: 'active',
    technicalData: {
      depth: '3,200 meters',
      quality: 'Medium (35° API)',
      extractionMethod: 'Artificial lift',
      lastUpdate: '2024-01-12'
    }
  },
  {
    id: '3',
    name: 'Brega Field',
    type: 'gas',
    location: 'Gulf of Sirte',
    discoveryYear: 1969,
    currentProduction: '15 billion ft³/year',
    reserves: '500 billion ft³',
    status: 'active',
    technicalData: {
      depth: '1,800 meters',
      quality: 'Dry natural gas',
      extractionMethod: 'Natural production',
      lastUpdate: '2024-01-10'
    }
  },
  {
    id: '4',
    name: 'Nubian Sandstone Aquifer',
    type: 'water',
    location: 'Libyan Desert',
    discoveryYear: 1953,
    currentProduction: '2.5 million m³/day',
    reserves: '35,000 billion m³',
    status: 'active',
    technicalData: {
      depth: '500-2,000 meters',
      quality: 'Fresh water (TDS < 1000 ppm)',
      extractionMethod: 'Artesian wells',
      lastUpdate: '2024-01-08'
    }
  }
];

const resourceTypes = [
  { id: 'all', label: 'All resources' },
  { id: 'oil', label: 'Oil' },
  { id: 'gas', label: 'Natural gas' },
  { id: 'water', label: 'Groundwater' },
  { id: 'mining', label: 'Mining' },
  { id: 'agriculture', label: 'Agriculture' },
];

function getTypeColor(type: string) {
  switch (type) {
    case 'oil': return 'bg-amber-100 text-amber-800';
    case 'gas': return 'bg-blue-100 text-blue-800';
    case 'water': return 'bg-cyan-100 text-cyan-800';
    case 'mining': return 'bg-slate-200 text-slate-800';
    case 'agriculture': return 'bg-emerald-100 text-emerald-800';
    default: return 'bg-slate-100 text-slate-800';
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'bg-emerald-100 text-emerald-800';
    case 'inactive': return 'bg-red-100 text-red-800';
    case 'planned': return 'bg-amber-100 text-amber-800';
    default: return 'bg-slate-100 text-slate-800';
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'active': return 'Active';
    case 'inactive': return 'Inactive';
    case 'planned': return 'Planned';
    default: return 'Unknown';
  }
}

export function ResourceDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'year'>('name');

  useEffect(() => {
    if (!selectedResource) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedResource(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedResource]);

  const filteredResources = mockResources
    .filter(resource => {
      const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'year': return b.discoveryYear - a.discoveryYear;
        case 'name':
        default: return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200/70">
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">Natural Resource Database</h2>

        {/* Search and filter controls */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search resources..."
              aria-label="Search resources"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label="Filter by resource type"
              className="rounded-lg border border-slate-200 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-emerald-400"
            >
              {resourceTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'year')}
              aria-label="Sort resources"
              className="rounded-lg border border-slate-200 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-emerald-400"
            >
              <option value="name">Sort by name</option>
              <option value="year">Sort by discovery year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources grid */}
      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <SearchX className="mb-4 h-12 w-12 text-slate-300" aria-hidden="true" />
          <p className="font-medium text-slate-500">No resources match your search.</p>
        </div>
      ) : (
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <button
              key={resource.id}
              type="button"
              onClick={() => setSelectedResource(resource)}
              className="w-full rounded-2xl bg-white p-6 text-left shadow-lg ring-1 ring-slate-200/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:ring-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-lg font-bold text-slate-800">{resource.name}</h3>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(resource.status)}`}>
                  {getStatusText(resource.status)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className={`rounded-md px-2 py-1 text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {resourceTypes.find(t => t.id === resource.type)?.label}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>{resource.location}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>Discovered {resource.discoveryYear}</span>
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <div className="mb-1 text-sm text-slate-600">Current production</div>
                  <div className="font-semibold text-emerald-700">{resource.currentProduction}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selectedResource && (
        <div
          className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedResource(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedResource.name} details`}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-slate-800">{selectedResource.name}</h2>
                  <div className="flex space-x-2">
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${getTypeColor(selectedResource.type)}`}>
                      {resourceTypes.find(t => t.id === selectedResource.type)?.label}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(selectedResource.status)}`}>
                      {getStatusText(selectedResource.status)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedResource(null)}
                  aria-label="Close"
                  className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-50 p-4">
                    <h4 className="mb-2 font-semibold text-slate-700">Basic information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Location:</span>
                        <span className="font-medium">{selectedResource.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Discovery year:</span>
                        <span className="font-medium">{selectedResource.discoveryYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Last update:</span>
                        <span className="font-medium">{selectedResource.technicalData.lastUpdate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-emerald-50 p-4">
                    <h4 className="mb-2 font-semibold text-slate-700">Production &amp; reserves</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Current production:</span>
                        <span className="font-medium text-emerald-700">{selectedResource.currentProduction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Proven reserves:</span>
                        <span className="font-medium text-blue-700">{selectedResource.reserves}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h4 className="mb-2 font-semibold text-slate-700">Technical data</h4>
                    <div className="space-y-2 text-sm">
                      {selectedResource.technicalData.depth && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Depth:</span>
                          <span className="font-medium">{selectedResource.technicalData.depth}</span>
                        </div>
                      )}
                      {selectedResource.technicalData.quality && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Quality:</span>
                          <span className="font-medium">{selectedResource.technicalData.quality}</span>
                        </div>
                      )}
                      {selectedResource.technicalData.extractionMethod && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Extraction method:</span>
                          <span className="font-medium">{selectedResource.technicalData.extractionMethod}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg bg-amber-50 p-4">
                    <h4 className="mb-2 font-semibold text-slate-700">Additional information</h4>
                    <p className="text-sm text-slate-600">
                      {selectedResource.name} is one of Libya&apos;s most important natural resources and a
                      major contributor to the national economy. Discovered in {selectedResource.discoveryYear},
                      it continues to maintain strong production rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results summary */}
      <div className="text-center text-slate-600">
        Showing {filteredResources.length} of {mockResources.length} natural resources
      </div>
    </div>
  );
}
