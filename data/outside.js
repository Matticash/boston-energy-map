// Big clean-power sources that serve Boston but sit outside the map area.
// Each shows as a badge on the edge of the map, pointing the way to it.
// Hand-written; every figure has a source.
window.OUTSIDE = [
  {
    name: "Vineyard Wind 1",
    type: "offshore wind",
    mw: 804,
    stage: "operating",
    year: 2026,
    where: "In the ocean about 15 miles south of Martha's Vineyard",
    note: "62 turbines. Reached full operation Oct 29, 2026. Sells its power to National Grid, Eversource and Unitil under 20-year contracts.",
    arrow: "↓",
    badgeLat: 41.91, badgeLng: -70.55,
    sources: [
      "https://www.wbur.org/news/2026/11/06/vineyard-wind-fully-running-offshore-wind-massachusetts",
      "https://en.wikipedia.org/wiki/Vineyard_Wind"
    ]
  },
  {
    name: "New England Clean Energy Connect",
    type: "hydro (imported)",
    mw: 1200,
    stage: "operating",
    year: 2026,
    where: "A power line from the Québec border to Lewiston, Maine",
    note: "Carries Hydro-Québec hydropower into New England. Began operating Jan 16, 2026. Flows stopped Jan 24 to 26 when Québec limited exports.",
    arrow: "↑",
    badgeLat: 42.85, badgeLng: -70.62,
    sources: [
      "https://www.eia.gov/todayinenergy/detail.php?id=67105",
      "https://en.wikipedia.org/wiki/New_England_Clean_Energy_Connect"
    ]
  }
];
