import React from 'react';

const Intro: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Project Introduction: Toolchanger 3D Printer for Transparent Perovskite Nanosolar Arrays</h1>

      <h2>Project Overview and Objective</h2>
      <p>The core objective of this project is to develop an open-source toolchanger 3D printer capable of fabricating transparent, window-attached nanosolar arrays using perovskite materials as the photovoltaic absorber. These arrays are designed as thin, flexible films that can be applied directly to windows, glass facades, or other transparent surfaces, transforming ordinary glass into energy-generating, energy-storing surfaces.</p>
      <p>The arrays harvest daylight to produce electricity, enable on-site energy storage (with potential future extension to integrated batteries), and reduce peak grid demand—all while maintaining high transparency for natural lighting and preserving aesthetics. This approach addresses key challenges in next-generation photovoltaics: scalable, low-cost manufacturing of semi-transparent solar devices suitable for widespread adoption.</p>

      <h2>Primary Application: Building-Integrated Photovoltaics (BIPV)</h2>
      <ul>
        <li><strong>Target Use Case:</strong> The film is applied directly to windows or building facades, turning them into active energy-harvesting surfaces without compromising views, daylighting, or architectural design.</li>
        <li><strong>Key Advantages:</strong>
          <ul>
            <li>Line-array patterning enables both high transparency (allowing sufficient visible light transmission) and usable photovoltaic/storage capacity in a single monolithic device.</li>
            <li>The entire stack is printed on low-cost (&lt;$5k) open-source hardware with fully documented processes, making it accessible for research, prototyping, and small-scale production.</li>
            <li>Projected manufacturing cost: &lt; $15/m² at volume scale (based on material and process efficiencies; further reductions possible with optimization).</li>
          </ul>
        </li>
        <li><strong>Future Extension:</strong> If photovoltaic performance is validated, the system can be extended to print integrated energy storage (e.g., perovskite-based or hybrid batteries) for self-contained, on-site power solutions.</li>
      </ul>
      <p>This work starts with safe mimic inks to validate hardware, dispensing, curing, and inspection workflows. It is positioned for collaboration with a local laboratory to transition to real (biohazardous) perovskite inks and precursors.</p>

      <h2>Fabrication Workflow</h2>
      <p>The device is built through a sequential 7-step deposition process on a flexible ITO-PET substrate. Each step uses the toolchanger system for precise dispensing (via interchangeable Luer lock needles/pipettes), UV curing (where applicable), and camera inspection.</p>
      <p>Dispenser recommendations use standard gauge ranges (10G–34G available) based on mimic ink viscosity tests and line volume requirements.</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Step</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Process</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Real Ink / Material</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Mimic Ink Recipe (10 mL batch) – Corrected Xanthan Gum Version</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Approx. Viscosity</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Dispenser</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Notes / Dry Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>UV-Ozone ITO-PET</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>— (surface treatment)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>— (no ink)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>—</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>—</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>No ink needed</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>2</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Bed 80°C → PEDOT (HTL)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>PEDOT:PSS</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>9.7 mL water + 3–4 drops McCormick blue food color + 0.002–0.003 g xanthan gum + 1 drop dish soap + 0.3 mL glycerin</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>3–6 cP</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>25G–30G</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Deep blue wet → pale/nearly invisible dry. Add xanthan slowly while stirring.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>3</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Bed 80°C → FASnI₃ (Absorber)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>0.8 M FASnI₃ in DMF:DMSO:GBL</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>9 mL water + 1–2 drops yellow + 1 drop red food color + 0.004–0.005 g xanthan gum + 1 mL glycerin</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>15–20 cP</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>20G–25G</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Deep orange-red wet → amber semi-transparent dry. Start with 0.004 g xanthan.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>4</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Bed 80°C → ICBA (ETL)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>ICBA in chlorobenzene</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>9.4 mL water + 0.6 mL glycerin + 0.2 mL clear hand sanitizer gel + 1 drop dish soap + 0.003–0.004 g xanthan gum</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>12–18 cP</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>22G–27G</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Clear glossy film. Xanthan gives perfect body.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>5</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Bed 80°C → Ag busbar (Cathode)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Conductive silver ink</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Use your conductive nickel pen (no mimic needed)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>N/A</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Nickel pen / 14G–18G equivalent</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Metallic silver/grey dry. Nickel pen is fine for prototypes.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>6</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Bed 25°C → Dequasol (Barrier)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Dequasol® boehmite sol</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>9.5 mL water + 0.5 mL glycerin + 1 drop dish soap + 0.002–0.003 g xanthan gum</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>5–10 cP</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>23G–28G</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Hard transparent film. Room temp gelation (30 min).</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>7</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Bed 25°C → ELEGOO / NOA61 (Seal)</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>ELEGOO Standard Transparent UV resin</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>7 mL PVA school glue + 3 mL water + 0.5 mL glycerin + 0.01–0.015 g xanthan gum</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>90–150 cP</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>14G–20G</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Clear glossy seal. Air-dry 10–15 min (mimics UV cure).</td>
          </tr>
        </tbody>
      </table>

      <h2>Current Progress and Next Steps</h2>
      <ul>
        <li>Validated dispensing of mimic inks (including water tests with 25G pipettes) to form precise lines with tunable volumes via toolchanger dispenser swaps.</li>
        <li>Hardware includes three tools: liquid handling (for dispensing), UV curing, and camera inspection.</li>
        <li>Software: Web-based control via the electronic notebook (https://github.com/htsrjdrouse/perovskite_arrays).</li>
        <li>Seeking lab partnership for real perovskite ink trials to assess photovoltaic performance, transparency metrics (e.g., AVT), and stability.</li>
      </ul>
      <p>This introduction provides context for the full documentation. References to perovskite BIPV research highlight line-array patterning for balanced transparency/efficiency, aligning with our approach.</p>
    </div>
  );
};

export default Intro;