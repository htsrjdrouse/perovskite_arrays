# Current Progress and Next Steps

<br>

## Achievements to Date

- **Hardware Development**  
  - Built a functional toolchanging 3D printer platform using the design documented at:  
    https://github.com/htsrjdrouse/toolchanger_js_model  
    Interactive 3D viewer: http://htsresources.com:8080/  
  - Implemented a Klipper-based operating system for tool loading/unloading, including microfluidics for precise liquid dispensing:  
    https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser  
    This includes an integrated user interface for designing and controlling key fabrication parameters.  
  - Developed a fabrication design and reporting tool (Printer Designer) with modules for bed layout, tip/dispenser management, G-code building, and Shape Designer for line patterning:  
    Live instance: http://htsresources.com:3100/  
  - Created a camera inspection system using a Raspberry Pi 5 and Arducam focusing camera for real-time imaging and quality control:  
    https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser/camera-pi  

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
- Fabricate and integrate the **UV curing tool** (likely LED array or focused UV source mounted on the toolchanger).  
- Perform detailed **precision assessment** of line placement and width consistency across multiple dispenser swaps and mimic ink types (using camera inspection + image analysis scripts).  
- Conduct extended mimic ink runs to optimize multi-layer stacking and drying/curing behavior.  
- Seek partnership with a local laboratory for safe handling and testing of real (biohazardous) perovskite inks, enabling measurement of:  
  - Photovoltaic performance (PCE under AM1.5G and indoor light)  
  - Transparency metrics (average visible transmittance – AVT, haze, color rendering)  
  - Long-term stability (damp-heat, light soaking)  

This foundation enables scalable, low-cost fabrication of transparent nanosolar arrays and aligns closely with current BIPV research on line-array patterning for balancing efficiency, transparency, and manufacturability.
