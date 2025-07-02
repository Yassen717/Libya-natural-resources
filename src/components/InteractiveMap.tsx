import React, { useState } from 'react';
import { MapPin, Droplets, Zap, Mountain, Wheat, Info } from 'lucide-react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

interface ResourcePoint {
  id: string;
  name: string;
  type: 'oil' | 'gas' | 'water' | 'mining' | 'agriculture';
  x: number;
  y: number;
  production: string;
  reserves: string;
  status: 'active' | 'inactive' | 'planned';
}

const mockResourcePoints: ResourcePoint[] = [
  { id: '1', name: 'حقل السرير', type: 'oil', x: 65, y: 35, production: '400,000 برميل/يوم', reserves: '2.8 مليار برميل', status: 'active' },
  { id: '2', name: 'حقل الواحة', type: 'oil', x: 55, y: 40, production: '300,000 برميل/يوم', reserves: '1.5 مليار برميل', status: 'active' },
  { id: '3', name: 'حقل البريقة', type: 'gas', x: 70, y: 50, production: '15 مليار قدم³/سنة', reserves: '500 مليار قدم³', status: 'active' },
  { id: '4', name: 'خزان الحجر الرملي النوبي', type: 'water', x: 40, y: 60, production: '2.5 مليون م³/يوم', reserves: '35,000 مليار م³', status: 'active' },
  { id: '5', name: 'منطقة الجفارة', type: 'agriculture', x: 30, y: 45, production: '2 مليون طن/سنة', reserves: '500,000 هكتار', status: 'active' },
  { id: '6', name: 'مناجم الحديد', type: 'mining', x: 45, y: 25, production: '1.5 مليون طن/سنة', reserves: '100 مليون طن', status: 'active' },
];

export const InteractiveMap: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<ResourcePoint | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'oil': return <Zap className="w-5 h-5" />;
      case 'gas': return <Zap className="w-5 h-5" />;
      case 'water': return <Droplets className="w-5 h-5" />;
      case 'mining': return <Mountain className="w-5 h-5" />;
      case 'agriculture': return <Wheat className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'oil': return 'bg-gradient-to-br from-orange-400 to-yellow-500 shadow-orange-300';
      case 'gas': return 'bg-gradient-to-br from-blue-400 to-cyan-500 shadow-blue-300';
      case 'water': return 'bg-gradient-to-br from-cyan-400 to-blue-200 shadow-cyan-200';
      case 'mining': return 'bg-gradient-to-br from-gray-500 to-gray-400 shadow-gray-400';
      case 'agriculture': return 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-300';
      default: return 'bg-gradient-to-br from-gray-400 to-gray-600 shadow-gray-400';
    }
  };

  const filteredResources = filterType === 'all' 
    ? mockResourcePoints 
    : mockResourcePoints.filter(resource => resource.type === filterType);

  const resourceTypes = [
    { id: 'all', label: 'جميع الموارد', color: 'bg-gray-100' },
    { id: 'oil', label: 'النفط', color: 'bg-orange-100' },
    { id: 'gas', label: 'الغاز الطبيعي', color: 'bg-blue-100' },
    { id: 'water', label: 'الموارد المائية', color: 'bg-cyan-100' },
    { id: 'mining', label: 'التعدين', color: 'bg-gray-200' },
    { id: 'agriculture', label: 'الزراعة', color: 'bg-green-100' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">الخريطة التفاعلية للموارد الطبيعية</h2>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {resourceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filterType === type.id
                  ? `${type.color} ring-2 ring-green-400 text-gray-800`
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Map Container */}
        <div className="relative w-full h-96 bg-gradient-to-br from-yellow-50 to-green-50 rounded-xl border-2 border-green-200 overflow-hidden">
          {/* Libya SVG Map (more realistic) */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 800 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id="libyaGradient" cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#e0f7fa" />
                <stop offset="100%" stopColor="#a7ffeb" />
              </radialGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#16A085" floodOpacity="0.15" />
              </filter>
            </defs>
            <path
              d="M 120 200 Q 180 120 350 110 Q 600 100 670 200 Q 750 320 700 600 Q 690 700 400 700 Q 180 700 150 600 Q 100 400 120 200 Z"
              fill="url(#libyaGradient)"
              stroke="#16A085"
              strokeWidth="4"
              filter="url(#shadow)"
              opacity="0.95"
            />
          </svg>

          {/* Resource Points */}
          {filteredResources.map((resource) => (
            <>
              <button
                key={resource.id}
                data-tooltip-id={`tooltip-${resource.id}`}
                onMouseEnter={() => setHoveredId(resource.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedResource(resource)}
                className={`absolute w-10 h-10 rounded-full border-4 border-white ${getResourceColor(resource.type)} text-white shadow-2xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-125 hover:ring-4 hover:ring-green-300 z-20 animate-fadeIn`}
                style={{ left: `${resource.x}%`, top: `${resource.y}%` }}
              >
                {getResourceIcon(resource.type)}
              </button>
              <ReactTooltip
                id={`tooltip-${resource.id}`}
                place="top"
                effect="solid"
                style={{ zIndex: 9999 }}
                isOpen={hoveredId === resource.id}
                clickable={false}
                className="!bg-white !text-gray-800 !rounded-lg !shadow-lg !px-4 !py-2 !text-sm border border-green-200"
              >
                <div className="flex items-center gap-2 mb-1">
                  {getResourceIcon(resource.type)}
                  <span className="font-bold">{resource.name}</span>
                </div>
                <div className="text-xs text-gray-600">{resource.production}</div>
                <div className="text-xs text-blue-600">{resource.reserves}</div>
              </ReactTooltip>
            </>
          ))}
        </div>

        {/* Resource Details Panel */}
        {selectedResource && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200 animate-fadeIn">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className={`w-12 h-12 rounded-xl ${getResourceColor(selectedResource.type)} text-white flex items-center justify-center shadow-lg border-2 border-white`}>
                  {getResourceIcon(selectedResource.type)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                    {selectedResource.name}
                    <Info className="w-5 h-5 text-green-500" />
                  </h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    selectedResource.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {selectedResource.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <hr className="my-4 border-green-100" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-1"><Zap className="w-4 h-4 text-orange-400" /> الإنتاج الحالي</h4>
                <p className="text-2xl font-bold text-green-600">{selectedResource.production}</p>
              </div>
              <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-1"><Mountain className="w-4 h-4 text-blue-400" /> الاحتياطي المؤكد</h4>
                <p className="text-2xl font-bold text-blue-600">{selectedResource.reserves}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};