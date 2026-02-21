# Dispensing Control and G-code Generation for Nanosolar Line Arrays

## Tunable Line Dispensing Parameters
Line volume and quality for each perovskite layer are controlled by:
- Gantry speed during dispense
- Flow rate (µL/mm via E-steps and valve timing)
- Dispenser gauge (10G–34G)
- Dispense height (Z-offset per tip type)
- Line geometry (length, spacing, pattern)

These are configured dynamically using the Printer Designer web app — no static macros are needed.

## Primary Tool: Printer Designer Web Application
Live instance: http://htsresources.com:3100/
- **Object Editor** — Define bed layout: place substrates, reservoirs, stations.
- **Tip Management** — Configure dispensers (gauges, heights, behaviors) for each layer.
- **G-code Builder** — Build full sequences (load tip → aspirate → dispense line(s) → lift → clean).
- **Shape Designer** — Create line patterns with precise volume/speed/height control.

This app generates position-aware, calibrated G-code based on your layout and tip settings.

## Integration Path
The app runs from /home/rista/printer-designer. Goal: Incorporate it as an additional service in perovskite_arrays/docker-compose.yml (or via submodule) so the notebook frontend can link/embed it seamlessly. For now, use the live link above during development and demos.

Related repo branches:
- Printer Designer: https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser/printer-designer
- Liquid-handling extension: https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser/liquid-handling-extension

This approach keeps documentation clean, maintainable, and focused on the active tool.