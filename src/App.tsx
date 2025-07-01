import React, { useState } from 'react';
import { Header } from './components/Header';
import { Overview } from './components/Overview';
import { InteractiveMap } from './components/InteractiveMap';
import { StatisticsCharts } from './components/StatisticsCharts';
import { ResourceDatabase } from './components/ResourceDatabase';
import { AgriculturalResources } from './components/AgriculturalResources';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'map':
        return <InteractiveMap />;
      case 'statistics':
        return <StatisticsCharts />;
      case 'resources':
        return <ResourceDatabase />;
      case 'agriculture':
        return <AgriculturalResources />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">الموارد الطبيعية الليبية</h3>
              <p className="text-gray-300">
                منصة شاملة لعرض وتحليل الموارد الطبيعية في دولة ليبيا مع بيانات محدثة وإحصائيات دقيقة.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">الأقسام الرئيسية</h4>
              <ul className="space-y-2 text-gray-300">
                <li>النفط والغاز الطبيعي</li>
                <li>الموارد المائية</li>
                <li>الثروات المعدنية</li>
                <li>الموارد الزراعية</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">معلومات الاتصال</h4>
              <div className="text-gray-300 space-y-2">
                <p>وزارة النفط والغاز - ليبيا</p>
                <p>آخر تحديث: يناير 2024</p>
                <p>جميع البيانات من مصادر رسمية</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 الموارد الطبيعية الليبية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;