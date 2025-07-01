import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Calendar, MapPin, TrendingUp, Database } from 'lucide-react';

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
    name: 'حقل السرير',
    type: 'oil',
    location: 'حوض سرت',
    discoveryYear: 1961,
    currentProduction: '400,000 برميل/يوم',
    reserves: '2.8 مليار برميل',
    status: 'active',
    technicalData: {
      depth: '2,800 متر',
      quality: 'خفيف حلو (42° API)',
      extractionMethod: 'ضخ طبيعي',
      lastUpdate: '2024-01-15'
    }
  },
  {
    id: '2',
    name: 'حقل الواحة',
    type: 'oil',
    location: 'حوض سرت',
    discoveryYear: 1958,
    currentProduction: '300,000 برميل/يوم',
    reserves: '1.5 مليار برميل',
    status: 'active',
    technicalData: {
      depth: '3,200 متر',
      quality: 'متوسط (35° API)',
      extractionMethod: 'ضخ صناعي',
      lastUpdate: '2024-01-12'
    }
  },
  {
    id: '3',
    name: 'حقل البريقة',
    type: 'gas',
    location: 'خليج سرت',
    discoveryYear: 1969,
    currentProduction: '15 مليار قدم³/سنة',
    reserves: '500 مليار قدم³',
    status: 'active',
    technicalData: {
      depth: '1,800 متر',
      quality: 'غاز طبيعي جاف',
      extractionMethod: 'إنتاج طبيعي',
      lastUpdate: '2024-01-10'
    }
  },
  {
    id: '4',
    name: 'خزان الحجر الرملي النوبي',
    type: 'water',
    location: 'الصحراء الليبية',
    discoveryYear: 1953,
    currentProduction: '2.5 مليون م³/يوم',
    reserves: '35,000 مليار م³',
    status: 'active',
    technicalData: {
      depth: '500-2,000 متر',
      quality: 'مياه عذبة (TDS < 1000 ppm)',
      extractionMethod: 'آبار ارتوازية',
      lastUpdate: '2024-01-08'
    }
  }
];

export const ResourceDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'year' | 'production'>('name');

  const resourceTypes = [
    { id: 'all', label: 'جميع الموارد' },
    { id: 'oil', label: 'النفط' },
    { id: 'gas', label: 'الغاز الطبيعي' },
    { id: 'water', label: 'المياه الجوفية' },
    { id: 'mining', label: 'التعدين' },
    { id: 'agriculture', label: 'الزراعة' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'oil': return 'bg-orange-100 text-orange-800';
      case 'gas': return 'bg-blue-100 text-blue-800';
      case 'water': return 'bg-cyan-100 text-cyan-800';
      case 'mining': return 'bg-gray-100 text-gray-800';
      case 'agriculture': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'planned': return 'مخطط';
      default: return 'غير محدد';
    }
  };

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
        case 'name': return a.name.localeCompare(b.name);
        default: return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">قاعدة بيانات الموارد الطبيعية</h2>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث في الموارد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
            >
              {resourceTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'year' | 'production')}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
            >
              <option value="name">الترتيب حسب الاسم</option>
              <option value="year">الترتيب حسب سنة الاكتشاف</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            onClick={() => setSelectedResource(resource)}
            className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6 border border-gray-200 hover:border-green-300 cursor-pointer transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-800">{resource.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resource.status)}`}>
                {getStatusText(resource.status)}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(resource.type)}`}>
                  {resourceTypes.find(t => t.id === resource.type)?.label}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{resource.location}</span>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>اكتشف عام {resource.discoveryYear}</span>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-1">الإنتاج الحالي</div>
                <div className="font-semibold text-green-700">{resource.currentProduction}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedResource.name}</h2>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedResource.type)}`}>
                      {resourceTypes.find(t => t.id === selectedResource.type)?.label}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedResource.status)}`}>
                      {getStatusText(selectedResource.status)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 mb-2">معلومات أساسية</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">الموقع:</span>
                        <span className="font-medium">{selectedResource.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">سنة الاكتشاف:</span>
                        <span className="font-medium">{selectedResource.discoveryYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">آخر تحديث:</span>
                        <span className="font-medium">{selectedResource.technicalData.lastUpdate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 mb-2">الإنتاج والاحتياطي</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">الإنتاج الحالي:</span>
                        <span className="font-medium text-green-700">{selectedResource.currentProduction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">الاحتياطي المؤكد:</span>
                        <span className="font-medium text-blue-700">{selectedResource.reserves}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 mb-2">البيانات التقنية</h4>
                    <div className="space-y-2 text-sm">
                      {selectedResource.technicalData.depth && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">العمق:</span>
                          <span className="font-medium">{selectedResource.technicalData.depth}</span>
                        </div>
                      )}
                      {selectedResource.technicalData.quality && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">الجودة:</span>
                          <span className="font-medium">{selectedResource.technicalData.quality}</span>
                        </div>
                      )}
                      {selectedResource.technicalData.extractionMethod && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">طريقة الاستخراج:</span>
                          <span className="font-medium">{selectedResource.technicalData.extractionMethod}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 mb-2">معلومات إضافية</h4>
                    <p className="text-sm text-gray-600">
                      يعتبر {selectedResource.name} من أهم الموارد الطبيعية في ليبيا، ويساهم بشكل كبير في الاقتصاد الوطني.
                      تم اكتشافه عام {selectedResource.discoveryYear} وما زال يحافظ على معدلات إنتاج عالية.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center text-gray-600">
        عرض {filteredResources.length} من أصل {mockResources.length} مورد طبيعي
      </div>
    </div>
  );
};