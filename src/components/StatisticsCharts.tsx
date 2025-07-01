import React, { useState } from 'react';
import { TrendingUp, PieChart as PieIcon, BarChart3 } from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend as ReLegend,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, ResponsiveContainer
} from 'recharts';

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
  { year: '2019', النفط: 1200, الغاز: 850, المعادن: 400 },
  { year: '2020', النفط: 950, الغاز: 780, المعادن: 380 },
  { year: '2021', النفط: 1100, الغاز: 820, المعادن: 420 },
  { year: '2022', النفط: 1350, الغاز: 950, المعادن: 450 },
  { year: '2023', النفط: 1400, الغاز: 980, المعادن: 480 },
];

const regions = [
  { name: 'الشرق', النفط: 60, الغاز: 40, المعادن: 30 },
  { name: 'الغرب', النفط: 35, الغاز: 55, المعادن: 45 },
  { name: 'الجنوب', النفط: 20, الغاز: 25, المعادن: 60 },
  { name: 'الوسط', النفط: 45, الغاز: 30, المعادن: 35 },
];

const COLORS = productionData.map(d => d.color);

export const StatisticsCharts: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'pie' | 'line' | 'bar'>('pie');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-2 text-sm text-gray-800">
          <span className="font-bold">{label}</span>
          <ul className="mt-1">
            {payload.map((entry: any, idx: number) => (
              <li key={idx} className="flex items-center gap-2">
                <span style={{ background: entry.color }} className="inline-block w-3 h-3 rounded-full"></span>
                {entry.name}: <span className="font-semibold">{entry.value}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  const PieChartComp: React.FC = () => (
    <div className="flex flex-col items-center w-full">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={productionData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            isAnimationActive
            label={({ name, percent, x, y, index }) => (
              <text
                x={x}
                y={y}
                fill="#222"
                fontSize={16}
                fontWeight="bold"
                textAnchor={x > 200 ? 'start' : 'end'}
                alignmentBaseline="middle"
                style={{ pointerEvents: 'none' }}
              >
                {name} ({(percent * 100).toFixed(0)}%)
              </text>
            )}
            labelLine
          >
            {productionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ReTooltip content={<CustomTooltip />} />
          <ReLegend verticalAlign="bottom" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const LineChartComp: React.FC = () => (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yearlyProduction} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <ReTooltip content={<CustomTooltip />} />
          <ReLegend verticalAlign="top" iconType="circle" />
          <Line type="monotone" dataKey="النفط" stroke="#F39C12" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="الغاز" stroke="#3498DB" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="المعادن" stroke="#95A5A6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const BarChartComp: React.FC = () => (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={regions} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ReTooltip content={<CustomTooltip />} />
          <ReLegend verticalAlign="top" iconType="circle" />
          <Bar dataKey="النفط" fill="#F39C12" radius={[8, 8, 0, 0]} />
          <Bar dataKey="الغاز" fill="#3498DB" radius={[8, 8, 0, 0]} />
          <Bar dataKey="المعادن" fill="#95A5A6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">الإحصائيات والمخططات البيانية</h2>
        <div className="flex space-x-2 rtl:space-x-reverse mb-6">
          <button
            onClick={() => setActiveChart('pie')}
            className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg transition-all duration-200 ${
              activeChart === 'pie'
                ? 'bg-green-100 text-green-800 ring-2 ring-green-400'
                : 'bg-gray-100 text-gray-600 hover:bg-green-50'
            }`}
          >
            <PieIcon className="w-4 h-4" />
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
        {activeChart === 'pie' && <PieChartComp />}
        {activeChart === 'line' && <LineChartComp />}
        {activeChart === 'bar' && <BarChartComp />}
      </div>
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