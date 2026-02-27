# Current Progress and Next Steps

<br>

## Achievements to Date

- **Hardware Development**  
  - Built a functional toolchanging 3D printer platform using the design documented at:  
    https://github.com/htsrjdrouse/toolchanger_js_model  
    Interactive 3D viewer: http://htsresources.com:8080/  
    <img src="/toolchanger_3d_partviewer.png" alt="3D Object Viewer" width="100%"/>

  - Implemented a Klipper-based operating system for tool loading/unloading, including microfluidics for precise liquid dispensing:  
    https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser  
    This includes an integrated user interface for designing and controlling key fabrication parameters.  
  - Developed a fabrication design and reporting tool (Printer Designer) with modules for bed layout, tip/dispenser management, G-code building, and Shape Designer for line patterning:  
    Live instance: http://htsresources.com:3100/  
    <br>
    <details>
    <summary>Printer Designer Screenshots (click to expand)</summary>
    Project Manager
    <img src="/printer-designer-project-viewer.png" alt="Project Manager" width="100%"/>
    <br>
    <br>
    Object Viewer
    <img src="/printer-designer-object-viewer.png" alt="3D Object Viewer" width="100%"/>
    <br>
    <br>
    Dispenser Manager
    <img src="/printer-designer-tip-manager.png" alt="Dispener Manager" width="100%"/>
    <br>
    <br>
    G-code Builder
    <img src="/printer-designer-gcode-builder.png" alt="G-code Builder" width="100%"/>
    <br>
    <br>
    Line Designer
    <img src="/printer-designer-shape-designer.png" alt="Line Designer" width="100%"/>
    </details>

  - Created a camera inspection system using a Raspberry Pi 5 and Arducam focusing camera for real-time imaging and quality control:  
    https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser/camera-pi  

- **Fluid Management and Pressure Control System**  
  The Rister-Toolchanger platform incorporates a sophisticated fluid management system to enable precise and reliable aspiration and dispensing of liquids (e.g., mimic inks, perovskite precursors, sol-gels, and UV-cured resins) through interchangeable pipettes/dispensers. This system maintains stable pressure at the pipette tip, which is essential to prevent dripping, air bubbles, inconsistent volume delivery, and meniscus instability.
  <br>

  <details>
  <summary>Fluid Management System Diagrams (click to expand)</summary>

  **Figure 1: Single Syringe Pump Setup**  
  Simplified diagram showing core components: pressure compensation reservoir, syringe pump, 3-way valve positions, and automated cleaning.  
  <img src="fluid_management_figure1.png" alt="Figure 1: Single Syringe Pump Setup" width="100%"/>  
  <br><br>

  **Figure 2: Multichannel Syringe Pump Setup**  
  Multichannel configuration (4 syringes shown) with each connected via tubing to 3-way valves, gantry frame, peristaltic pumps, and waste/wash stations.  
  <img src="fluid_management_figure2.png" alt="Figure 2: Multichannel Syringe Pump Setup" width="100%"/>  
  <br><br>

  **Figure 3: Back Side View with Wash/Waste Station**  
  Instrument back view showing tool connected to four pipettes, wash/waste pad station for priming, and associated tubing.  
  <img src="fluid_management_figure3.png" alt="Figure 3: Back Side View with Wash/Waste Station" width="100%"/>  
  <br><br>

  **Figure 4: Pipette Loading Sequence**  
  Illustration of pipette loading/unloading process during aspiration and fabrication cycles.  
  <img src="fluid_management_figure4.png" alt="Figure 4: Pipette Loading Sequence" width="100%"/>

  </details>

  <br>

  **Key System Components**  
  - **Pressure Compensation Reservoir**: Vessel with liquid level sensor that automatically triggers a peristaltic pump to refill from a source bottle, ensuring stable fluid supply.  
  - **Fluid Dispensing Operation**: Stepper-driven syringe pump paired with a servo-controlled 3-way valve for precise flow control:  
    - Input Position: Aspirates fluid from the compensation reservoir into the syringe.  
    - Output Position: Dispenses fluid from the syringe through the pipette.  
    - Pipette Position: Aspirates small volumes (1–10 µL, down to sub-nL via multiple cycles) from sample sources (e.g., Eppendorf tubes or 96-well plates) at controlled rates (e.g., 1 µL/s); also supports dispensing in this mode.  
    - Bypass Position: Seals the system to maintain consistent tip pressure and stabilize the liquid column.  
  - **Automated Cleaning System**: When positioned over the wash basin, the system runs:  
    - Internal cleaning: Syringe pump pushes cleaning fluid (e.g., IPA) through channels.  
    - External cleaning: Separate peristaltic pump washes the pipette exterior.  
    - Waste removal: Third peristaltic pump evacuates used fluid to a waste bottle, creating a closed-loop process.

  **Importance of Pressure Control**  
  Stable pressure prevents:  
  - Dripping (low pressure causes uncontrolled liquid loss/contamination)  
  - Air bubbles (pressure fluctuations introduce air, disrupting volume accuracy)  
  - Inconsistent dispensing (variable pressure leads to unpredictable droplet formation)  
  - Meniscus instability (unstable liquid surfaces impair precise delivery)  

  The bypass valve position creates a sealed, pressure-regulated environment, enabling repeatable sub-nanoliter accuracy critical for nanosolar array fabrication.

- **Unique Feature: Pipette Loading/Unloading**  
  The liquid handling tool supports dynamic loading and unloading of interchangeable pipettes/dispensers. This enables flexible use of different orifice sizes (gauges) to control line volumes, widths, and flow characteristics — a key advantage for multi-layer nanosolar array fabrication with varying ink viscosities and materials.

  <details>
  <summary>Video Demonstrations of Tool & Pipette Handling (click to expand)</summary>

  - **Load Liquid Handling Tool**  
    [Watch on YouTube](https://www.youtube.com/watch?v=UL4sxDd-IZQ)<br>
    <img src="/liquid-handler-tool.png" alt="Liquid Handling Tool" width="25%"/><br>

  - **Unload Liquid Handling Tool**  
    [Watch on YouTube](https://www.youtube.com/watch?v=12gcinqmZa0)<br>

  - **Load Pipette Dispenser (25G example)**  
    [Watch on YouTube](https://www.youtube.com/watch?v=Sz_IYvYeOPA)<br>
    <img src="/liquid-handling-tool-with-dispenser-assembly.png" alt="Liquid Handling Tool" width="25%"/><br>
    <img src="/dispenser-with-luerlock-assembly.png" alt="Dispenser with Luerlock Assembly" width="25%"/><br>
    <img src="/dispenser-assembly.png" alt="Dispenser Assembly" width="25%"/><br>


  - **Eject Pipette Dispensers**  
    [Watch on YouTube](https://www.youtube.com/watch?v=bkrwSSchfqA)

  </details>



- **Camera-Based Precision & Inspection**  
   The Rister camera system (Raspberry Pi 5 + Arducam) supports two complementary approaches for achieving accurate tool positioning and quality verification during fabrication:

   - **Technique 1: Tool-Referenced Measurement**  
      The camera functions as a high-precision measuring device rather than a fixed reference. One physical tool (e.g., the primary dispenser or a dedicated probe) is designated as the coordinate origin. The camera then observes where each tool actually lands relative to programmed positions. The system computes positional offsets (differences between expected and observed locations) and can apply corrections dynamically or log them for calibration. This method preserves traditional tool-centered coordinate systems while adding vision-based verification and error compensation.

   -  **Technique 2: Fiducial-Based Absolute Referencing**  
      The camera itself becomes the coordinate reference by using printed fiducial markers (calibration targets) placed on the print bed. The system positions the camera over specific fiducials to define an absolute coordinate frame. All tool movements and dispense locations are then programmed relative to these markers. The camera measures the exact offsets between the camera's view and the fiducials, allowing automatic translation of coordinates across tools. This creates a more universal, marker-defined positioning system that is independent of any single tool's mechanical alignment.

  Both techniques enable sub-millimeter precision verification and can be combined (e.g., fiducials for initial setup + tool-referenced checks during runs). They are particularly valuable for multi-tool workflows where dispenser swaps must maintain consistent line placement across different gauges and inks.

- **Process Validation**  
  - Successfully demonstrated aspiration and dispensing of representative mimic inks (including basic water tests with 25G pipettes) to form precise lines.  
  - Developed a tunable line dispensing process allowing control over volume via gantry speed, flow rate, dispenser gauge swaps (10G–34G), and print height.  
  - Validated toolchanger functionality for loading/unloading different dispensers mid-process, enabling multi-material or multi-gauge fabrication in a single run.  

- **Software & Integration**  
  - Web-based electronic notebook for project documentation and sample tracking.  
  - Full integration of Printer Designer for layout configuration, tip settings, G-code generation, and line shape design — replacing static macros with dynamic, visual control.

## Current Status & Limitations
- The UV curing tool has not yet been fabricated (this step is considered relatively straightforward and is prioritized next).  
- Precision of line placement across different dispensing tools, gauges, and ink viscosities has not yet been quantitatively assessed (planned for upcoming characterization runs).  

## Next Steps
- Perform detailed **precision assessment** of line placement and width consistency across multiple dispenser swaps and mimic ink types (using camera inspection + image analysis scripts).  
- Conduct extended mimic ink runs to optimize multi-layer stacking and drying/curing behavior.  
- Seek partnership with a local laboratory for safe handling and testing of real (biohazardous) perovskite inks, enabling measurement of:  
  - Photovoltaic performance (PCE under AM1.5G and indoor light)  
  - Transparency metrics (average visible transmittance – AVT, haze, color rendering)  
  - Long-term stability (damp-heat, light soaking)  

This foundation enables scalable, low-cost fabrication of transparent nanosolar arrays and aligns closely with current BIPV research on line-array patterning for balancing efficiency, transparency, and manufacturability.
