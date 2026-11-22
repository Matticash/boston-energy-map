# Data tools

How `data/sites.js` is made, so every dot on the map traces back to its source.

1. Download EIA-860 (2025) from https://www.eia.gov/electricity/data/eia860/ and unzip it.
2. `python extract860.py <unzipped folder> <out folder>` pulls every power plant inside the
   study area into `sites_in_box_eia860_2025.csv`.
3. `python build_sites.py <that csv> ../data/sites.js` keeps the clean sources and writes the map data.
   Fossil plants and trash-to-energy are left out.

`data/outside.js` (offshore wind, Québec hydro) is hand-written; each entry lists its sources.
