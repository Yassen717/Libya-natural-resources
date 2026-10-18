import { Suspense, lazy, useState } from 'react';
import {
  Fuel,
  Droplets,
  Mountain,
  Wheat,
  Landmark,
  CalendarClock,
  ShieldCheck,
} from 'lucide-react';
import { Header } from './components/Header';
import { Overview } from './components/Overview';

const InteractiveMap = lazy(() =>
  import('./components/InteractiveMap').then((m) => ({
    default: m.InteractiveMap,
  })),
);
const StatisticsCharts = lazy(() =>
  import('./components/StatisticsCharts').then((m) => ({
    default: m.StatisticsCharts,
  })),
);
const ResourceDatabase = lazy(() =>
  import('./components/ResourceDatabase').then((m) => ({
    default: m.ResourceDatabase,
  })),
);
const AgriculturalResources = lazy(() =>
  import('./components/AgriculturalResources').then((m) => ({
    default: m.AgriculturalResources,
  })),
);

const footerSections = [
  { id: 'resources', label: 'Oil & Natural Gas', icon: Fuel },
  { id: 'resources', label: 'Water Resources', icon: Droplets },
  { id: 'resources', label: 'Mineral Resources', icon: Mountain },
  { id: 'agriculture', label: 'Agricultural Resources', icon: Wheat },
];

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

  const goToSection = (section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/40 to-amber-50/30">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="flex min-h-96 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
            </div>
          }
        >
          <div key={activeSection} className="animate-fade-in">
            {renderSection()}
          </div>
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-md shadow-emerald-950/40">
                  <Mountain className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Libya Natural Resources
                </h3>
              </div>
              <p className="leading-relaxed text-slate-400">
                A comprehensive platform for exploring and analyzing Libya's
                natural resources with up-to-date data and accurate statistics.
              </p>
            </div>

            {/* Main Sections */}
            <nav aria-label="Resource sections">
              <h4 className="mb-4 text-lg font-semibold text-white">
                Main Sections
              </h4>
              <ul className="space-y-2">
                {footerSections.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => goToSection(item.id)}
                        className="group flex items-center gap-3 text-slate-400 transition-colors duration-200 hover:text-emerald-400"
                      >
                        <Icon className="h-4 w-4 text-emerald-500 transition-colors duration-200 group-hover:text-emerald-400" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">Contact</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-3">
                  <Landmark className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Ministry of Oil &amp; Gas — Libya</span>
                </li>
                <li className="flex items-center gap-3">
                  <CalendarClock className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Last updated: January 2024</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>All data from official sources</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>
              © {new Date().getFullYear()} Libya Natural Resources. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
