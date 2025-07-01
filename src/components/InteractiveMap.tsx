import React, { useState } from 'react';
import { MapPin, Droplets, Zap, Mountain, Wheat } from 'lucide-react';

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

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'oil': return <Zap className="w-4 h-4" />;
      case 'gas': return <Zap className="w-4 h-4" />;
      case 'water': return <Droplets className="w-4 h-4" />;
      case 'mining': return <Mountain className="w-4 h-4" />;
      case 'agriculture': return <Wheat className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'oil': return 'bg-orange-500 hover:bg-orange-600';
      case 'gas': return 'bg-blue-500 hover:bg-blue-600';
      case 'water': return 'bg-cyan-500 hover:bg-cyan-600';
      case 'mining': return 'bg-gray-600 hover:bg-gray-700';
      case 'agriculture': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
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
          {/* Libya Map Outline (simplified) */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern id="mapPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.5" fill="#16A085" opacity="0.1"/>
              </pattern>
            </defs>
            <path
              d="M 10 30 Q 15 25 25 25 L 85 25 Q 90 30 90 35 L 90 70 Q 85 75 80 75 L 15 75 Q 10 70 10 65 Z"
              fill="url(#mapPattern)"
              stroke="#16A085"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </svg>

          {/* Resource Points */}
          {filteredResources.map((resource) => (
            <button
              key={resource.id}
              onClick={() => setSelectedResource(resource)}
              className={`absolute w-8 h-8 rounded-full ${getResourceColor(resource.type)} text-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 hover:shadow-xl z-10`}
              style={{ left: `${resource.x}%`, top: `${resource.y}%` }}
            >
              {getResourceIcon(resource.type)}
            </button>
          ))}
        </div>

        {/* Resource Details Panel */}
        {selectedResource && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className={`w-10 h-10 rounded-lg ${getResourceColor(selectedResource.type)} text-white flex items-center justify-center`}>
                  {getResourceIcon(selectedResource.type)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedResource.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    selectedResource.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {selectedResource.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-2">الإنتاج الحالي</h4>
                <p className="text-2xl font-bold text-green-600">{selectedResource.production}</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-2">الاحتياطي المؤكد</h4>
                <p className="text-2xl font-bold text-blue-600">{selectedResource.reserves}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};