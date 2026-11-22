// Big clean-power sources that serve Boston but sit outside the map area.
// Each shows as a badge on the edge of the map, pointing the way to it.
// Hand-written; every figure has a source.
window.OUTSIDE = [
  {
    name: "Vineyard Wind 1",
    type: "offshore wind",
    mw: 806,
    stage: "operating",
    year: 2026,
    where: "About 95 miles south of Boston, in the ocean past Martha's Vineyard",
    note: "62 turbines. Reached full operation Oct 29, 2026. Power is sold to Massachusetts utilities under 20-year contracts.",
    arrow: "↓",
    badgeLat: 41.91, badgeLng: -70.55,
    sources: [
      "https://www.windpowermonthly.com/article/1974945/vineyard-wind-reaches-full-commercial-operation",
      "https://www.wbur.org/news/2026/11/06/vineyard-wind-fully-running-offshore-wind-massachusetts"
    ]
  },
  {
    name: "New England Clean Energy Connect",
    type: "hydro (imported)",
    mw: 1200,
    stage: "operating",
    year: 2026,
    where: "A 145-mile power line from the Québec border to Lewiston, Maine, about 130 miles north of Boston",
    note: "Carries hydropower from Hydro-Québec under contracts with Massachusetts utilities. Began operating Jan 16, 2026, but Québec cut flows during a January cold snap to cover its own demand.",
    arrow: "↑",
    badgeLat: 42.85, badgeLng: -70.62,
    sources: [
      "https://www.eia.gov/todayinenergy/detail.php?id=67105",
      "https://www.avangrid.com/w/avangrid-s-new-england-clean-energy-connect-project-is-complete-and-energized"
    ]
  }
];
