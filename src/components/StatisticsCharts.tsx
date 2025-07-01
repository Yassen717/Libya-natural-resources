import React, { useState } from 'react';
import { TrendingUp, PieChart, BarChart3, Activity } from 'lucide-react';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const productionData: ChartData[] = [
  { name: 'النفط الخام', value: 45, color: '#F39C12' },
  { name: 'الغاز الطبيعي', value: 25, color: '#3498DB' },
  { name: 'المعادن', value: 15, color: '#95A5A6' },
  { name: 'المياه الجوفية', value: 10, color: '#16A085' },
  { name: 'الموارد الزراعية', value: 5, color: '#27AE60' },
];

const yearlyProduction = [
  { year: '2019', oil: 1200, gas: 850, minerals: 400 },
  { year: '2020', oil: 950, gas: 780, minerals: 380 },
  { year: '2021', oil: 1100, gas: 820, minerals: 420 },
  { year: '2022', oil: 1350, gas: 950, minerals: 450 },
  { year: '2023', oil: 1400, gas: 980, minerals: 480 },
];

export const StatisticsCharts: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'pie' | 'line' | 'bar'>('pie');

  const PieChart: React.FC = () => {
    let cumulativePercentage = 0;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64 mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {productionData.map((item, index) => {
              const percentage = item.value;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              cumulativePercentage += percentage;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500 hover:stroke-width-10"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">100%</div>
              <div className="text-sm text-gray-600">إجمالي الإنتاج</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
          {productionData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-700">{item.name}</span>
              <span className="text-sm font-semibold text-gray-800">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LineChart: React.FC = () => {
    const maxValue = Math.max(...yearlyProduction.flatMap(d => [d.oil, d.gas, d.minerals]));
    
    const getYPosition = (value: number) => 80 - (value / maxValue) * 60;
    
    return (
      <div className="w-full">
        <svg className="w-full h-64" viewBox="0 0 400 100">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="40" y1={y} x2="380" y2={y} stroke="#E5E7EB" strokeWidth="0.5" />
          ))}
          
          {/* Oil line */}
          <polyline
            fill="none"
            stroke="#F39C12"
            strokeWidth="3"
            points={yearlyProduction.map((d, i) => `${50 + i * 80},${getYPosition(d.oil)}`).join(' ')}
            className="drop-shadow-sm"
          />
          
          {/* Gas line */}
          <polyline
            fill="none"
            stroke="#3498DB"
            strokeWidth="3"
            points={yearlyProduction.map((d, i) => `${50 + i * 80},${getYPosition(d.gas)}`).join(' ')}
            className="drop-shadow-sm"
          />
          
          {/* Minerals line */}
          <polyline
            fill="none"
            stroke="#95A5A6"
            strokeWidth="3"
            points={yearlyProduction.map((d, i) => `${50 + i * 80},${getYPosition(d.minerals)}`).join(' ')}
            className="drop-shadow-sm"
          />
          
          {/* Data points */}
          {yearlyProduction.map((d, i) => (
            <g key={i}>
              <circle cx={50 + i * 80} cy={getYPosition(d.oil)} r="4" fill="#F39C12" />
              <circle cx={50 + i * 80} cy={getYPosition(d.gas)} r="4" fill="#3498DB" />
              <circle cx={50 + i * 80} cy={getYPosition(d.minerals)} r="4" fill="#95A5A6" />
              <text x={50 + i * 80} y="95" textAnchor="middle" className="fill-gray-600 text-xs">
                {d.year}
              </text>
            </g>
          ))}
        </svg>
        
        <div className="flex justify-center space-x-6 rtl:space-x-reverse mt-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-sm text-gray-700">النفط (ألف برميل/يوم)</span>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-700">الغاز (مليون قدم³/يوم)</span>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-sm text-gray-700">المعادن (ألف طن/سنة)</span>
          </div>
        </div>
      </div>
    );
  };

  const BarChart: React.FC = () => {
    const regions = [
      { name: 'الشرق', oil: 60, gas: 40, minerals: 30 },
      { name: 'الغرب', oil: 35, gas: 55, minerals: 45 },
      { name: 'الجنوب', oil: 20, gas: 25, minerals: 60 },
      { name: 'الوسط', oil: 45, gas: 30, minerals: 35 },
    ];

    const maxValue = Math.max(...regions.flatMap(r => [r.oil, r.gas, r.minerals]));

    return (
      <div className="w-full">
        <svg className="w-full h-64" viewBox="0 0 400 100">
          {regions.map((region, i) => {
            const x = 50 + i * 80;
            const oilHeight = (region.oil / maxValue) * 60;
            const gasHeight = (region.gas / maxValue) * 60;
            const mineralsHeight = (region.minerals / maxValue) * 60;
            
            return (
              <g key={i}>
                <rect x={x - 15} y={80 - oilHeight} width="8" height={oilHeight} fill="#F39C12" rx="2" />
                <rect x={x - 4} y={80 - gasHeight} width="8" height={gasHeight} fill="#3498DB" rx="2" />
                <rect x={x + 7} y={80 - mineralsHeight} width="8" height={mineralsHeight} fill="#95A5A6" rx="2" />
                <text x={x} y="95" textAnchor="middle" className="fill-gray-600 text-xs">
                  {region.name}
                </text>
              </g>
            );
          })}
        </svg>
        
        <div className="flex justify-center space-x-6 rtl:space-x-reverse mt-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-3 h-3 rounded-sm bg-orange-500"></div>
            <span className="text-sm text-gray-700">النفط</span>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
            <span className="text-sm text-gray-700">الغاز</span>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-3 h-3 rounded-sm bg-gray-500"></div>
            <span className="text-sm text-gray-700">المعادن</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">الإحصائيات والمخططات البيانية</h2>
        
        {/* Chart Type Selector */}
        <div className="flex space-x-2 rtl:space-x-reverse mb-6">
          <button
            onClick={() => setActiveChart('pie')}
            className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg transition-all duration-200 ${
              activeChart === 'pie'
                ? 'bg-green-100 text-green-800 ring-2 ring-green-400'
                : 'bg-gray-100 text-gray-600 hover:bg-green-50'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>مخطط دائري</span>
          </button>
          <button
            onClick={() => setActiveChart('line')}
            className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg transition-all duration-200 ${
              activeChart === 'line'
                ? 'bg-green-100 text-green-800 ring-2 ring-green-400'
                : 'bg-gray-100 text-gray-600 hover:bg-green-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>مخطط خطي</span>
          </button>
          <button
            onClick={() => setActiveChart('bar')}
            className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg transition-all duration-200 ${
              activeChart === 'bar'
                ? 'bg-green-100 text-green-800 ring-2 ring-green-400'
                : 'bg-gray-100 text-gray-600 hover:bg-green-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>مخطط عمودي</span>
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6 min-h-96 flex items-center justify-center">
        {activeChart === 'pie' && <PieChart />}
        {activeChart === 'line' && <LineChart />}
        {activeChart === 'bar' && <BarChart />}
      </div>

      {/* Key Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-800">1.4M</div>
          <div className="text-sm text-orange-700">برميل نفط/يوم</div>
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-800">980M</div>
          <div className="text-sm text-blue-700">قدم³ غاز/يوم</div>
        </div>
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">480K</div>
          <div className="text-sm text-gray-700">طن معادن/سنة</div>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-800">2.5M</div>
          <div className="text-sm text-green-700">م³ مياه/يوم</div>
        </div>
      </div>
    </div>
  );
};