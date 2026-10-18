import { useState } from 'react';
import {
  Menu,
  X,
  LayoutDashboard,
  Map,
  BarChart3,
  Database,
  Sprout,
  Mountain,
} from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'map', label: 'Interactive Map', icon: Map },
  { id: 'statistics', label: 'Statistics', icon: BarChart3 },
  { id: 'resources', label: 'Database', icon: Database },
  { id: 'agriculture', label: 'Agriculture', icon: Sprout },
];

export function Header({ activeSection, onSectionChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 ring-1 ring-slate-900/5 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-md shadow-emerald-900/20">
              <Mountain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-slate-900">
                Libya Natural Resources
              </h1>
              <p className="text-xs font-medium text-emerald-700">
                Resource Atlas
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-800 shadow-sm ring-1 ring-emerald-200/70'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            className="rounded-lg p-2 text-slate-600 transition-colors duration-200 hover:bg-emerald-50 hover:text-emerald-700 md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="animate-fade-in border-t border-slate-200/70 py-4 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
