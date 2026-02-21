# Dispensing Control and Volume Tuning for Nanosolar Line Arrays

## Overview of Line Volume Adjustment
In the perovskite nanosolar array fabrication process, each layer (HTL, absorber, ETL, busbar, barrier, seal) requires precise control over dispensed line volume to achieve desired thickness, coverage, and transparency without excess spreading or defects. Volume is tuned via three primary parameters:

- **Robot (gantry head) movement speed** — Slower speeds increase volume per mm of travel.
- **Flow rate** — Controlled via extrusion rate (E-steps in G-code, calibrated to µL/mm) and valve timing.
- **Dispenser size** — Interchangeable Luer lock needles/pipettes (10G–34G range) for different orifice diameters, affecting flow resistance and line width.

Additional fine-tuning comes from:
- Print height (Z-position during dispensing) — Closer to substrate reduces spreading; calibrated per dispenser.
- Line length/shape — Defined in patterns (e.g., single 70 mm lines or grids).

To manage these, we developed the **Shape Designer** tool, which generates customized G-code patterns by inputting desired line geometry, flow parameters, and substrate positions.

## Shape Designer Tool
**Purpose**: A configuration and G-code generation utility for designing dispense patterns tailored to nanosolar arrays. It allows users to specify line length, spacing, start position, target volume per line, flow rate (µL/mm), syringe calibration (e.g., ID for E-to-µL conversion), needle gauge, and Z-heights. Output: Ready-to-run G-code sequences executable in Mainsail/Fluidd.

**Setup and Details**:
- Repository branch: https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser/printer-designer
- Key features: Interactive parameter entry → pattern preview → G-code export.
- Integration: Feeds into the liquid-handling workflow; supports multi-line arrays with variable volumes/compositions (by swapping dispensers mid-process).
- Usage: Run the designer script/UI to create sequences for each layer, then incorporate into full automation macros.

**Future Enhancement**: Add screenshot of Shape Designer interface here (e.g., parameter panel + generated pattern preview).

## Dispenser Management and Print Configuration
Different dispensers require unique print conditions (especially Z-height for proper contact/avoidance of substrate damage). We maintain a **print configuration file** (JSON/YAML format, stored in repo) that defines:

- Objects/stations: Wash station, waste station, dry station, dispenser storage modules, nanosolar array substrates, sample reservoirs.
- Per-dispenser settings: Gauge (e.g., 25G), calibrated height offset, safe travel Z, aspiration depth, dispense Z.
- Tool assignment: Maps dispenser types to tool IDs (e.g., TIP=1 for small gauge).

Two complementary tools manage this:
1. **Liquid-Handling Extension** (robot control): https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser/liquid-handling-extension  
   Handles low-level G-code generation, valve control, servo actuation for tool pickup/drop, aspiration/dispensing sequences.
2. **Printer Designer / Reporting Tool** (LIM-like management): https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser/printer-designer  
   Manages configuration data, generates reports on print conditions, tracks dispenser usage, and integrates with the web notebook for sample tracking.

These tools enable safe, repeatable swaps and condition assignment across the three-tool setup (liquid handling, UV curing, camera inspection).

## Example Macros: Building a Full Dispense Cycle
We have developed modular G-code macros that can be sequenced for a complete process (e.g., load dispenser → aspirate ink → dispense line → remove dispenser). These are executed in Mainsail and can be chained via scripts or the notebook's automation interface.

### 1. Loading Dispenser Tool (Sample_Collection_Sequence excerpt)
```gcode
; G-code Sequence: Sample_Collection_Sequence (Load Dispenser)
; Generated: 2025-12-04T22:05:52.333Z
LINEARACTSERVOMOVE ANGLE=0 HOLD=1000
G4 P500
G90
G1 Z130 F1500
G1 X331.00 Y109.80 F3000
G4 P500
LINEARACTSERVOMOVE ANGLE=90 HOLD=1000
G4 P500
LINEARACTSERVOON
G4 P500
G1 Z94 F2000
G4 P500
G1 Z101 F500
G4 P500
G1 Z89 F2000
... (probing/settling sequence continues)
G1 Z150 F2000
LINEARACTSERVOMOVE ANGLE=0 HOLD=1000
LINEARACTSERVOOFF
SELECT_TIP TIP=1
G4 P500
