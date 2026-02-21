# Perovskite Nanosolar Toolchanger Notebook

## Project Introduction: Toolchanger 3D Printer for Transparent Perovskite Nanosolar Arrays

### Project Overview and Objective
The core objective of this project is to develop an open-source toolchanger 3D printer capable of fabricating transparent, window-attached nanosolar arrays using perovskite materials as the photovoltaic absorber. These arrays are designed as thin, flexible films that can be applied directly to windows, glass facades, or other transparent surfaces, transforming ordinary glass into energy-generating, energy-storing surfaces.

The arrays harvest daylight to produce electricity, enable on-site energy storage (with potential future extension to integrated batteries), and reduce peak grid demand—all while maintaining high transparency for natural lighting and preserving aesthetics. This approach addresses key challenges in next-generation photovoltaics: scalable, low-cost manufacturing of semi-transparent solar devices suitable for widespread adoption.

![Semi-transparent perovskite solar cell integrated into a window-like structure](https://pubs.rsc.org/en/content/articlehtml/2023/ee/d2ee04137e "High visible light transmission with subtle tinting for energy generation")

![Line-array / patterned perovskite structure for balanced transparency and efficiency](https://pubs.acs.org/doi/10.1021/acsenergylett.0c00417 "Grid or micro-island patterning to allow light passage while maximizing active area")

### Primary Application: Building-Integrated Photovoltaics (BIPV)
- **Target Use Case**: The film is applied directly to windows or building facades, turning them into active energy-harvesting surfaces without compromising views, daylighting, or architectural design.
- **Key Advantages**:
  - Line-array patterning enables both high transparency (allowing sufficient visible light transmission, e.g., AVT 30–50%+) and usable photovoltaic/storage capacity in a single monolithic device.
  - The entire stack is printed on low-cost (<$5k) open-source hardware with fully documented processes, making it accessible for research, prototyping, and small-scale production.
  - Projected manufacturing cost: < $15/m² at volume scale (based on material and process efficiencies; further reductions possible with optimization).
- **Future Extension**: If photovoltaic performance is validated, the system can be extended to print integrated energy storage (e.g., perovskite-based or hybrid batteries) for self-contained, on-site power solutions.

Recent research supports these advantages: Semi-transparent perovskites achieve PCEs of 9–17% at AVT 30–44%, with neutral color rendering (CRI ~97) and low haze (~3%), ideal for glazing/BIPV. Patterned/micro-structured designs (e.g., laser-scribed or grid) optimize the efficiency-transparency tradeoff better than uniform thin films.

### Fabrication Workflow
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

### Current Progress and Next Steps
- Validated dispensing of mimic inks (including water tests with 25G pipettes) to form precise lines with tunable volumes via toolchanger dispenser swaps.
- Hardware includes three tools: liquid handling (for dispensing), UV curing, and camera inspection.
- Software: Web-based control via the electronic notebook[](https://github.com/htsrjdrouse/perovskite_arrays).
- Seeking lab partnership for real perovskite ink trials to assess photovoltaic performance, transparency metrics (e.g., AVT), and stability.

### References
1. Bing, J. et al. (2022). Perovskite solar cells for building integrated photovoltaics—glazing applications. *Joule*. https://www.sciencedirect.com/science/article/pii/S2542435122002501
2. Ritzer, D.B. et al. (2023). Translucent perovskite photovoltaics for building integration. *Energy & Environmental Science*. https://pubs.rsc.org/en/content/articlehtml/2023/ee/d2ee04137e
3. Rahmany, S. et al. (2020). Semitransparent Perovskite Solar Cells. *ACS Energy Letters*. https://pubs.acs.org/doi/10.1021/acsenergylett.0c00417
4. Panasonic Holdings (2023). World's First Long-term BIPV Perovskite Demonstration. https://www.rts-pv.com/en/blogs/10792
5. Sharma, B. et al. (2025). Semi-Transparent Perovskite Solar Cells for BIPV. *Advanced Materials Technologies*. https://advanced.onlinelibrary.wiley.com/doi/abs/10.1002/admt.202500434
6. Shen, X. et al. (2026). Key Advancements in Perovskite Solar Cells 2024–2025. *Nano-Micro Letters*.
7. IEA-PVPS (2025). Building-Integrated Photovoltaics Technical Guidebook. https://iea-pvps.org/wp-content/uploads/2025/02/Building-Integrated-Photovoltaics-Technical-Guidebook.pdf

Started: 2026-02-20
Location: /home/rista/perovskite_arrays

## Project Goals
- Develop toolchanging 3D printer for perovskite nanosolar arrays
- Integrate liquid dispensing, UV curing, and camera inspection
- Achieve high-precision automated fabrication

## Components
- Backend: Node.js/TypeScript server (src/index.ts)
- Frontend: React app
- Database: MongoDB
- Docker: Multi-service setup

## Key Events
- 2026-02-20: Initial setup, Docker build issues resolved (TypeScript fix in backend)

## Experiments
### Exp 1: Mimic Inks Dispensing Validation
- Date: 2026-02-20
- Parameters: All mimic inks tested
- Results: Dispensing validated for all inks
- Notes: Ready for perovskite material integration

## Issues & Fixes
- TypeScript error in backend: Fixed `col` to `column` in position object
- Docker build: Resolved compilation errors

## Notes
- Use this file to log daily progress, code changes, test results
- Update regularly for traceability

## Links
- Hardware: https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser
- Camera: https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser/camera-pi
- Control Software: This repo