import {
  Fuel,
  Droplets,
  Mountain,
  Wheat,
  Globe,
  Users,
  Award,
  TrendingUp,
} from 'lucide-react';

const heroStats = [
  { value: '48.4B', label: 'barrels of oil reserves' },
  { value: '1.4M', label: 'barrels daily production' },
  { value: '35T m³', label: 'of groundwater' },
];

const keyResources = [
  {
    icon: Fuel,
    title: 'Oil & Natural Gas',
    description: 'Libya ranks first in Africa for proven oil reserves.',
    stats: '48.4 billion barrels proven reserves',
    iconGradient: 'from-amber-400 to-orange-500',
    statsClass: 'bg-amber-50 text-amber-800 ring-amber-200/60',
  },
  {
    icon: Droplets,
    title: 'Water Resources',
    description:
      "The Nubian Sandstone Aquifer is the world's largest fossil-water source.",
    stats: '35,000 billion m³',
    iconGradient: 'from-sky-400 to-cyan-500',
    statsClass: 'bg-sky-50 text-sky-800 ring-sky-200/60',
  },
  {
    icon: Mountain,
    title: 'Mineral Resources',
    description: 'Large reserves of iron, gypsum, salt and potash.',
    stats: '20+ mineral types',
    iconGradient: 'from-slate-400 to-slate-600',
    statsClass: 'bg-slate-100 text-slate-700 ring-slate-200',
  },
  {
    icon: Wheat,
    title: 'Agricultural Resources',
    description: 'Fertile land along the coast and southern oases.',
    stats: '1.75 million hectares arable',
    iconGradient: 'from-emerald-400 to-emerald-600',
    statsClass: 'bg-emerald-50 text-emerald-800 ring-emerald-200/60',
  },
];

const achievements = [
  {
    icon: Globe,
    title: 'Global Export',
    value: '9th',
    description: 'largest oil exporter worldwide',
  },
  {
    icon: Users,
    title: 'Employment',
    value: '500K+',
    description: 'jobs in the oil sector',
  },
  {
    icon: Award,
    title: 'Oil Quality',
    value: '42° API',
    description: 'light, high-quality crude',
  },
  {
    icon: TrendingUp,
    title: 'Production Growth',
    value: '+15%',
    description: 'expected growth in 2024',
  },
];

const economicStats = [
  { value: '95%', label: 'of export revenues', color: 'text-emerald-600' },
  { value: '60%', label: 'of GDP', color: 'text-sky-600' },
  { value: '80%', label: 'of government revenue', color: 'text-amber-600' },
];

export function Overview() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900 p-8 text-white shadow-xl md:p-12">
        {/* Decorative dot pattern */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full text-white opacity-10"
        >
          <defs>
            <pattern
              id="hero-dots"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>

        {/* Blurred accent orbs */}
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl"
        />

        <div className="relative z-10 max-w-4xl">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Libya's Natural Resources
            <span className="block text-amber-300">
              A Land of Vast Wealth
            </span>
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-emerald-100 md:text-2xl">
            Libya holds immense natural wealth — including Africa's largest
            proven oil reserves — alongside diverse water, mineral and
            agricultural resources that power a strong, sustainable economy.
          </p>
          <div className="flex flex-wrap gap-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/15 px-6 py-3 ring-1 ring-white/25 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-emerald-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Resources Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {keyResources.map((resource) => {
          const Icon = resource.icon;
          return (
            <div
              key={resource.title}
              className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${resource.iconGradient} shadow-md`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-slate-900">
                    {resource.title}
                  </h3>
                  <p className="mb-3 leading-relaxed text-slate-600">
                    {resource.description}
                  </p>
                  <div className={`rounded-lg p-3 ring-1 ${resource.statsClass}`}>
                    <span className="text-lg font-bold">{resource.stats}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievements Section */}
      <section
        aria-labelledby="achievements-heading"
        className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200/70"
      >
        <h2
          id="achievements-heading"
          className="mb-6 text-center text-2xl font-bold text-slate-900"
        >
          Key Achievements &amp; Indicators
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div key={achievement.title} className="group text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 transition-transform duration-200 group-hover:scale-110">
                  <Icon className="h-8 w-8 text-emerald-700" />
                </div>
                <div className="mb-1 text-3xl font-bold text-slate-900">
                  {achievement.value}
                </div>
                <div className="mb-1 text-sm font-semibold text-slate-700">
                  {achievement.title}
                </div>
                <div className="text-xs text-slate-500">
                  {achievement.description}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Economic Impact */}
      <section
        aria-labelledby="economic-impact-heading"
        className="rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-amber-50/60 p-8 ring-1 ring-slate-200/70"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="economic-impact-heading"
            className="mb-6 text-3xl font-bold text-slate-900"
          >
            Economic Impact
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-slate-700">
            Natural resources account for over 95% of export revenues and 60% of
            GDP, making them the backbone of the national economy and a primary
            source of funding for sustainable development across the country.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {economicStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-200/70 transition-shadow duration-300 hover:shadow-xl"
              >
                <div className={`mb-2 text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
