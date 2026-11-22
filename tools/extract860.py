"""Pull power plants inside the map's study area from EIA-860 (2025).
Usage: python -I extract860.py <extracted_dir> <out_dir>
"""
import sys, pandas as pd

src, out = sys.argv[1], sys.argv[2]
S, N, W, E = 41.89, 42.88, -71.65, -70.45

plants = pd.read_excel(f"{src}/2___Plant_Y2025.xlsx", header=1,
                       usecols=["Plant Code", "Plant Name", "City", "State", "Latitude", "Longitude"])
cols = ["Plant Code", "Generator ID", "Technology", "Nameplate Capacity (MW)", "Status", "Energy Source 1"]
op = pd.read_excel(f"{src}/3_1_Generator_Y2025.xlsx", sheet_name="Operable", header=1,
                   usecols=cols + ["Operating Year"])
op["stage"] = "operating"
op = op.rename(columns={"Operating Year": "year"})
pr = pd.read_excel(f"{src}/3_1_Generator_Y2025.xlsx", sheet_name="Proposed", header=1,
                   usecols=cols + ["Current Year"])
pr["stage"] = "proposed"
pr = pr.rename(columns={"Current Year": "year"})
gens = pd.concat([op, pr], ignore_index=True)
gens = gens[pd.to_numeric(gens["Plant Code"], errors="coerce").notna()]
gens["Plant Code"] = gens["Plant Code"].astype(int)
gens["Nameplate Capacity (MW)"] = pd.to_numeric(gens["Nameplate Capacity (MW)"], errors="coerce")

df = gens.merge(plants, on="Plant Code", how="left")
df["Latitude"] = pd.to_numeric(df["Latitude"], errors="coerce")
df["Longitude"] = pd.to_numeric(df["Longitude"], errors="coerce")

CLEAN = {
    "Solar Photovoltaic": "solar",
    "Onshore Wind Turbine": "wind",
    "Offshore Wind Turbine": "offshore wind",
    "Conventional Hydroelectric": "hydro",
    "Hydroelectric Pumped Storage": "pumped hydro (storage)",
    "Batteries": "battery (storage)",
    "Landfill Gas": "landfill gas",
    "Wood/Wood Waste Biomass": "wood biomass",
    "Other Waste Biomass": "other biomass",
    "Municipal Solid Waste": "trash-to-energy",
    "Solar Thermal without Energy Storage": "solar",
    "Flywheels": "flywheel (storage)",
}
df["category"] = df["Technology"].map(CLEAN).fillna("fossil/other: " + df["Technology"].astype(str))

inbox = df[df["Latitude"].between(S, N) & df["Longitude"].between(W, E)].copy()

# One row per plant + category + stage.
site = (inbox.groupby(["Plant Code", "Plant Name", "City", "State", "Latitude", "Longitude",
                       "category", "stage"], dropna=False)
        .agg(mw=("Nameplate Capacity (MW)", "sum"), units=("Generator ID", "count"),
             first_year=("year", "min"), last_year=("year", "max"))
        .reset_index())
site.to_csv(f"{out}/sites_in_box_eia860_2025.csv", index=False)

pd.set_option("display.width", 200, "display.max_rows", 200, "display.max_colwidth", 40)
print("=== Inside study area: totals by category and stage ===")
print(site.groupby(["category", "stage"]).agg(sites=("Plant Code", "count"), mw=("mw", "sum"))
      .round(1).to_string())

clean = site[~site["category"].str.startswith("fossil")]
print("\n=== Clean sites >= 5 MW ===")
print(clean[clean.mw >= 5].sort_values("mw", ascending=False)[
    ["Plant Name", "City", "State", "category", "stage", "mw", "first_year"]].round(1).to_string(index=False))

print("\n=== Size spread of clean sites ===")
print(clean.groupby("category")["mw"].describe()[["count", "min", "50%", "max"]].round(2).to_string())

print("\n=== Offshore wind anywhere in EIA-860 near New England (outside box) ===")
ow = df[(df["category"] == "offshore wind")]
print(ow.groupby(["Plant Name", "State", "stage"])["Nameplate Capacity (MW)"].sum().round(1).to_string())
