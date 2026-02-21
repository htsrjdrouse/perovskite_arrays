# Project Introduction: Toolchanger 3D Printer for Transparent Perovskite Nanosolar Arrays

## Project Overview and Objective
The core objective of this project is to develop an open-source toolchanger 3D printer capable of fabricating transparent, window-attached nanosolar arrays using perovskite materials as the photovoltaic absorber. These arrays are designed as thin, flexible films that can be applied directly to windows, glass facades, or other transparent surfaces, transforming ordinary glass into energy-generating, energy-storing surfaces.

The arrays harvest daylight to produce electricity, enable on-site energy storage (with potential future extension to integrated batteries), and reduce peak grid demand—all while maintaining high transparency for natural lighting and preserving aesthetics. This approach addresses key challenges in next-generation photovoltaics: scalable, low-cost manufacturing of semi-transparent solar devices suitable for widespread adoption.

## Primary Application: Building-Integrated Photovoltaics (BIPV)
- **Target Use Case**: The film is applied directly to windows or building facades, turning them into active energy-harvesting surfaces without compromising views, daylighting, or architectural design.
- **Key Advantages**:
  - Line-array patterning enables both high transparency (allowing sufficient visible light transmission) and usable photovoltaic/storage capacity in a single monolithic device.
  - The entire stack is printed on low-cost (<$5k) open-source hardware with fully documented processes, making it accessible for research, prototyping, and small-scale production.
  - Projected manufacturing cost: < $15/m² at volume scale (based on material and process efficiencies; further reductions possible with optimization).
- **Future Extension**: If photovoltaic performance is validated, the system can be extended to print integrated energy storage (e.g., perovskite-based or hybrid batteries) for self-contained, on-site power solutions.

This work starts with safe mimic inks to validate hardware, dispensing, curing, and inspection workflows. It is positioned for collaboration with a local laboratory to transition to real (biohazardous) perovskite inks and precursors.

## Fabrication Workflow
The device is built through a sequential 7-step deposition process on a flexible ITO-PET substrate. Each step uses the toolchanger system for precise dispensing (via interchangeable Luer lock needles/pipettes), UV curing (where applicable), and camera inspection.

Dispenser recommendations use standard gauge ranges (10G–34G available) based on mimic ink viscosity tests and line volume requirements.

| Step | Process                          | Real Ink / Material                  | Mimic Ink Recipe (10 mL batch) – Corrected Xanthan Gum Version                                                                 | Approx. Viscosity | Dispenser          | Notes / Dry Time                                                                 |
|------|----------------------------------|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|-------------------|--------------------|----------------------------------------------------------------------------------|
| 1    | UV-Ozone ITO-PET                 | — (surface treatment)                | — (no ink)                                                                                                                             | —                 | —                  | No ink needed                                                                    |
| 2    | Bed 80°C → PEDOT (HTL)           | PEDOT:PSS                            | 9.7 mL water + 3–4 drops McCormick blue food color + 0.002–0.003 g xanthan gum + 1 drop dish soap + 0.3 mL glycerin                 | 3–6 cP            | 25G–30G            | Deep blue wet → pale/nearly invisible dry. Add xanthan slowly while stirring.    |
| 3    | Bed 80°C → FASnI₃ (Absorber)     | 0.8 M FASnI₃ in DMF:DMSO:GBL         | 9 mL water + 1–2 drops yellow + 1 drop red food color + 0.004–0.005 g xanthan gum + 1 mL glycerin                                      | 15–20 cP          | 20G–25G            | Deep orange-red wet → amber semi-transparent dry. Start with 0.004 g xanthan.    |
| 4    | Bed 80°C → ICBA (ETL)            | ICBA in chlorobenzene                | 9.4 mL water + 0.6 mL glycerin + 0.2 mL clear hand sanitizer gel + 1 drop dish soap + 0.003–0.004 g xanthan gum                      | 12–18 cP          | 22G–27G            | Clear glossy film. Xanthan gives perfect body.                                   |
| 5    | Bed 80°C → Ag busbar (Cathode)   | Conductive silver ink                | Use your conductive nickel pen (no mimic needed)                                                                                       | N/A               | Nickel pen / 14G–18G equivalent | Metallic silver/grey dry. Nickel pen is fine for prototypes.                     |
| 6    | Bed 25°C → Dequasol (Barrier)    | Dequasol® boehmite sol               | 9.5 mL water + 0.5 mL glycerin + 1 drop dish soap + 0.002–0.003 g xanthan gum                                                          | 5–10 cP           | 23G–28G            | Hard transparent film. Room temp gelation (30 min).                              |
| 7    | Bed 25°C → ELEGOO / NOA61 (Seal) | ELEGOO Standard Transparent UV resin | 7 mL PVA school glue + 3 mL water + 0.5 mL glycerin + 0.01–0.015 g xanthan gum                                                         | 90–150 cP         | 14G–20G            | Clear glossy seal. Air-dry 10–15 min (mimics UV cure).                           |

## Current Progress and Next Steps
- Validated dispensing of mimic inks (including water tests with 25G pipettes) to form precise lines with tunable volumes via toolchanger dispenser swaps.
- Hardware includes three tools: liquid handling (for dispensing), UV curing, and camera inspection.
- Software: Web-based control via the electronic notebook[](https://github.com/htsrjdrouse/perovskite_arrays).
- Seeking lab partnership for real perovskite ink trials to assess photovoltaic performance, transparency metrics (e.g., AVT), and stability.

This introduction provides context for the full documentation. References to perovskite BIPV research highlight line-array patterning for balanced transparency/efficiency, aligning with our approach.
