// Hand-written sites that EIA-860's clean-energy list doesn't cover:
// nuclear (Seabrook operating, Pilgrim shut down) and networked geothermal,
// which heats buildings instead of making electricity, so it has no MW figure.
// Every entry lists its sources.
window.EXTRA_SITES = [
  {
    name: "Seabrook Station",
    city: "Seabrook", state: "NH",
    type: "nuclear", stage: "operating", year: 1990,
    mw: 1242,
    lat: 42.89917, lng: -70.84889,
    note: "New England's biggest single power plant. Nuclear (Seabrook plus Millstone in CT) makes about a quarter of the region's electricity.",
    sources: [
      "https://www.eia.gov/electricity/data/eia860/",
      "https://www.iso-ne.com/about/key-stats/resource-mix"
    ]
  },
  {
    name: "Pilgrim Nuclear Power Station",
    city: "Plymouth", state: "MA",
    type: "nuclear", stage: "retired", year: 1972, retired: 2019,
    mw: 680,
    lat: 41.9447, lng: -70.5786,
    note: "Massachusetts' only nuclear plant. Shut down May 31, 2019, and now being decommissioned; spent fuel is still stored on site.",
    sources: [
      "https://www.cbsnews.com/boston/news/pilgrim-nuclear-power-plant-plymouth-massachusetts",
      "https://en.wikipedia.org/wiki/Pilgrim_Nuclear_Power_Plant"
    ]
  },
  {
    name: "Framingham Geothermal Network",
    city: "Framingham", state: "MA",
    type: "geothermal", stage: "operating", year: 2024,
    mw: null, buildings: 36,
    approx: true,
    lat: 42.2797, lng: -71.4155,
    note: "Eversource pilot, the first networked geothermal system built by a gas company. Shared underground pipes heat and cool 36 buildings (125 customer accounts) instead of gas.",
    sources: [
      "https://www.eversource.com/residential/about/transmission-distribution/projects/massachusetts-projects/geothermal-pilot-project",
      "https://www.wbur.org/news/2024/03/08/networked-geothermal-eversource-framingham-pilot-project-decarbonization"
    ]
  },
  {
    name: "Franklin Field Geothermal Network",
    city: "Dorchester (Boston)", state: "MA",
    type: "geothermal", stage: "proposed", year: null,
    mw: null, buildings: 7,
    approx: true,
    lat: 42.2905, lng: -71.0865,
    note: "National Grid pilot to replace an aging gas boiler loop at 7 public housing buildings (129 apartments). Construction was planned for 2025; current status unconfirmed.",
    sources: [
      "https://www.utilitydive.com/news/boston-first-networked-geothermal-electrify-public-housing-national-grid/707237/"
    ]
  },

  // ---- Small sites near Boston (under 1 MW, so not in EIA-860) ----------
  {
    name: "Logan Airport solar (Massport)",
    city: "East Boston", state: "MA",
    type: "solar", stage: "operating", year: null,
    mw: 0.97,
    approx: true,
    lat: 42.3656, lng: -71.0096,
    note: "Seven arrays across the airport: Terminal A 277 kW, Terminal B garage 200 kW, Terminal C canopy 178 kW, Rental Car Center 121 kW, Terminal A satellite 93 kW, economy garage 81 kW, Terminal E solar glass 20 kW. Massport's sites make over 1,100 MWh a year in total.",
    sources: [
      "https://www.massport.com/environment/roadmap-to-net-zero/solar-photovoltaics"
    ]
  },
  {
    name: "Boston Dedham Commerce Park rooftop solar",
    city: "Hyde Park (Boston)", state: "MA",
    type: "solar", stage: "operating", year: 2013,
    mw: 0.978,
    approx: true,
    lat: 42.2395, lng: -71.1335,
    note: "Billed as Boston's largest rooftop array when it opened in 2013 (120,000 sq ft). Current status not confirmed since then.",
    sources: [
      "https://www.bostonplans.org/news-calendar/news-updates/2013/05/16/bostons-largest-rooftop-solar-array-debuts"
    ]
  },
  {
    name: "Hull Wind I",
    city: "Hull", state: "MA",
    type: "wind", stage: "retired", year: 2001, retired: 2024,
    mw: 0.66,
    approx: true,
    lat: 42.3058, lng: -70.9201,
    note: "The first commercial-scale wind turbine on the East Coast, at Windmill Point. Went offline after 2021 and was removed in February 2024.",
    sources: [
      "https://www.publicpower.org/periodical/article/operationally-challenged-hull-wind-ii-turbine-taken-down",
      "https://masscivics.com/hull/"
    ]
  },
  {
    name: "Hull Wind II",
    city: "Hull", state: "MA",
    type: "wind", stage: "retired", year: 2006, retired: 2025,
    mw: 1.8,
    lat: 42.26111, lng: -70.85639,
    note: "Town-owned turbine. Went offline after 2023 when replacement parts became obsolete, and had been demolished by December 2025. EIA lists it as retired.",
    sources: [
      "https://www.publicpower.org/periodical/article/operationally-challenged-hull-wind-ii-turbine-taken-down",
      "https://www.eia.gov/electricity/data/eia860/"
    ]
  }
];
