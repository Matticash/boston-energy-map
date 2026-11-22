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
  }
];
