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
    note: "Massachusetts' only nuclear plant. Shut down May 31, 2019, and now being torn down; spent fuel is still stored on site.",
    sources: [
      "https://www.nrc.gov/info-finder/decommissioning/power-reactor/index/pilgrim-nuclear-power-station",
      "https://www.mass.gov/info-details/pilgrim-nuclear-power-station"
    ]
  },
  {
    name: "Framingham Geothermal Network",
    city: "Framingham", state: "MA",
    type: "geothermal", stage: "operating", year: 2024,
    mw: null, buildings: 36,
    approx: true,
    lat: 42.2797, lng: -71.4155,
    note: "First utility-run networked geothermal system in the US (Eversource). Shared underground pipes heat and cool about 36 buildings instead of gas. An expansion is waiting on state approval.",
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
    note: "National Grid pilot to replace an old gas boiler loop at 7 public housing buildings (129 apartments). Construction timing is unclear.",
    sources: [
      "https://www.utilitydive.com/news/boston-first-networked-geothermal-electrify-public-housing-national-grid/707237/"
    ]
  }
];
