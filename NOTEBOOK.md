# Perovskite Nanosolar Toolchanger Notebook

## Overview
Electronic notebook for the perovskite nanosolar toolchanging 3D printer project. The system features 3 tools: liquid handling, UV curing, and camera inspection for automated perovskite array dispensing.

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