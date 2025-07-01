import React, { useState } from 'react';
import { Menu, X, MapPin, BarChart3, Database, Leaf } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { id: 'map', label: 'الخريطة التفاعلية', icon: MapPin },
    { id: 'statistics', label: 'الإحصائيات', icon: BarChart3 },
    { id: 'resources', label: 'قاعدة البيانات', icon: Database },
    { id: 'agriculture', label: 'الموارد الزراعية', icon: Leaf },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">الموارد الطبيعية</h1>
                <p className="text-xs text-gray-600">دولة ليبيا</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-green-100 text-green-800 shadow-sm'
                      : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-green-700 hover:bg-green-50"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 rtl:space-x-reverse px-3 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-green-100 text-green-800'
                        : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};