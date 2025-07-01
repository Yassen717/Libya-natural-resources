import React from 'react';
import { Wheat, BarChart3, PieChart, Leaf, AlertTriangle } from 'lucide-react';

const stats = [
  {
    label: 'المساحة الصالحة للزراعة',
    value: 1.75,
    unit: 'مليون هكتار',
    color: 'from-green-400 to-green-600',
  },
  {
    label: 'المساحة المستغلة فعلياً',
    value: 0.5,
    unit: 'مليون هكتار',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    label: 'نسبة الاستغلال',
    value: 28.5,
    unit: '%',
    color: 'from-blue-400 to-blue-600',
  },
];

const crops = [
  { name: 'القمح', percent: 35 },
  { name: 'الشعير', percent: 25 },
  { name: 'الزيتون', percent: 15 },
  { name: 'التمور', percent: 10 },
  { name: 'الخضروات', percent: 15 },
];

const challenges = [
  'شح المياه وتغير المناخ',
  'التصحر وتآكل التربة',
  'ضعف الاستثمار في التقنيات الحديثة',
  'الاعتماد على الأمطار الموسمية',
  'نقص العمالة الزراعية المؤهلة',
];

export const AgriculturalResources: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-10">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-green-800 mb-2 flex items-center gap-2">
          <Leaf className="w-7 h-7 text-green-500" />
          الموارد الزراعية في ليبيا
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          الزراعة في ليبيا تمثل ركيزة أساسية للأمن الغذائي رغم التحديات المناخية والاقتصادية. فيما يلي نظرة على واقع الاستغلال الزراعي اليوم.
        </p>
      </div>

      {/* إحصائيات رئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg flex flex-col items-center`}>
            <BarChart3 className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-lg font-semibold mb-1">{stat.unit}</div>
            <div className="text-md">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* رسم بياني دائري للمحاصيل */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-green-500" />
            توزيع المحاصيل الرئيسية
          </h3>
          <ul className="space-y-2">
            {crops.map((crop, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="inline-block w-3 h-3 rounded-full" style={{background: `hsl(${i*60},70%,50%)`}}></span>
                <span className="font-semibold text-gray-700">{crop.name}</span>
                <span className="ml-auto text-green-800 font-bold">{crop.percent}%</span>
              </li>
            ))}
          </ul>
        </div>
        {/* رسم بياني دائري بسيط */}
        <div className="flex-1 flex justify-center">
          <svg width="160" height="160" viewBox="0 0 36 36" className="block">
            {(() => {
              let acc = 0;
              return crops.map((crop, i) => {
                const r = 16;
                const circ = 2 * Math.PI * r;
                const val = circ * (crop.percent / 100);
                const dashArray = `${val} ${circ - val}`;
                const dashOffset = circ - acc;
                acc += val;
                return (
                  <circle
                    key={crop.name}
                    r={r}
                    cx="18"
                    cy="18"
                    fill="transparent"
                    stroke={`hsl(${i*60},70%,50%)`}
                    strokeWidth="3.5"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                  />
                );
              });
            })()}
          </svg>
        </div>
      </div>

      {/* التحديات */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-yellow-100">
        <h3 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          أبرز التحديات
        </h3>
        <ul className="list-disc pr-6 space-y-2 text-gray-700">
          {challenges.map((ch, i) => (
            <li key={i}>{ch}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 