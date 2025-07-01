import React from 'react';
import { Zap, Droplets, Mountain, Wheat, TrendingUp, Globe, Users, Award } from 'lucide-react';

export const Overview: React.FC = () => {
  const keyResources = [
    {
      icon: Zap,
      title: 'النفط والغاز الطبيعي',
      description: 'ليبيا تحتل المرتبة الأولى أفريقياً في احتياطيات النفط المؤكدة',
      stats: '48.4 مليار برميل احتياطي مؤكد',
      color: 'from-orange-400 to-red-500'
    },
    {
      icon: Droplets,
      title: 'الموارد المائية',
      description: 'خزان الحجر الرملي النوبي أكبر مصدر للمياه الجوفية في العالم',
      stats: '35,000 مليار متر مكعب',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Mountain,
      title: 'الثروات المعدنية',
      description: 'احتياطيات كبيرة من الحديد والجبس والملح والبوتاسيوم',
      stats: 'أكثر من 20 نوع معدن',
      color: 'from-gray-400 to-gray-600'
    },
    {
      icon: Wheat,
      title: 'الموارد الزراعية',
      description: 'أراضي زراعية خصبة تمتد عبر الساحل والواحات الجنوبية',
      stats: '1.75 مليون هكتار صالح للزراعة',
      color: 'from-green-400 to-green-600'
    }
  ];

  const achievements = [
    { icon: Globe, title: 'التصدير العالمي', value: '9th', description: 'مصدر للنفط عالمياً' },
    { icon: Users, title: 'فرص العمل', value: '500K+', description: 'فرصة عمل في القطاع النفطي' },
    { icon: Award, title: 'جودة النفط', value: '42° API', description: 'نفط خفيف عالي الجودة' },
    { icon: TrendingUp, title: 'نمو الإنتاج', value: '+15%', description: 'نمو متوقع خلال 2024' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              الموارد الطبيعية
              <span className="block text-yellow-300">في دولة ليبيا</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
              تحتوي ليبيا على ثروات طبيعية هائلة تشمل أكبر احتياطيات النفط في أفريقيا وموارد مائية ومعدنية وزراعية متنوعة تساهم في بناء اقتصاد قوي ومستدام
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">48.4B</div>
                <div className="text-sm text-green-200">برميل نفط احتياطي</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">1.4M</div>
                <div className="text-sm text-green-200">برميل إنتاج يومي</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">35T</div>
                <div className="text-sm text-green-200">مليار م³ مياه جوفية</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-32 -bottom-32 w-80 h-80 bg-green-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Key Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {keyResources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-3 leading-relaxed">{resource.description}</p>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-green-700">{resource.stats}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">الإنجازات والمؤشرات الرئيسية</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-8 h-8 text-green-700" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{achievement.value}</div>
                <div className="text-sm font-semibold text-gray-700 mb-1">{achievement.title}</div>
                <div className="text-xs text-gray-500">{achievement.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Economic Impact */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">التأثير الاقتصادي</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            تساهم الموارد الطبيعية الليبية بأكثر من 95% من عائدات التصدير و 60% من الناتج المحلي الإجمالي، 
            مما يجعلها العمود الفقري للاقتصاد الوطني ومصدراً أساسياً لتمويل التنمية المستدامة في البلاد.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-700">من عائدات التصدير</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
              <div className="text-gray-700">من الناتج المحلي الإجمالي</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">80%</div>
              <div className="text-gray-700">من الإيرادات الحكومية</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};