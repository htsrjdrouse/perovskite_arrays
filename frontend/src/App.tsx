import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { CameraStream } from './components/CameraStream';
import { SampleGrid } from './components/SampleGrid';
import { FocusControl } from './components/FocusControl';
import { RecipeViewer } from './components/RecipeViewer';

const API_BASE = '/api';

interface Sample {
  id: string;
  name: string;
  composition: {
    precursorA: string;
    precursorB: string;
    solvent: string;
    concentration: number;
  };
  position: { row: number; column: number };
  dispenseVolume: number;
  status: 'pending' | 'dispensing' | 'completed' | 'failed';
  image?: string;
  timestamp: string;
}

interface ArrayConfig {
  rows: number;
  cols: number;
  baseName: string;
  baseComposition: {
    precursorA: string;
    precursorB: string;
    solvent: string;
    concentration: number;
  };
  baseVolume: number;
}

function App() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [focusValue, setFocusValue] = useState(0.5);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [arrayConfig, setArrayConfig] = useState<ArrayConfig>({
    rows: 8,
    cols: 12,
    baseName: 'Perovskite',
    baseComposition: { precursorA: 'PbI2', precursorB: 'MAI', solvent: 'DMF', concentration: 0.5 },
    baseVolume: 50
  });

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io();
    
    newSocket.on('sample:created', (sample: Sample) => {
      setSamples(prev => [sample, ...prev]);
    });

    newSocket.on('sample:updated', (sample: Sample) => {
      setSamples(prev => prev.map(s => s.id === sample.id ? sample : s));
    });

    newSocket.on('array:created', (data: { samples: Sample[] }) => {
      setSamples(prev => [...data.samples, ...prev]);
    });

    newSocket.on('image:captured', (data: { id: string; filename: string; sampleId?: string }) => {
      console.log('Image captured:', data.filename);
    });

    return () => { newSocket.close(); };
  }, []);

  // Fetch samples on mount
  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      const response = await fetch(`${API_BASE}/samples`);
      if (response.ok) {
        const data = await response.json();
        setSamples(data);
      }
    } catch (error) {
      console.error('Failed to fetch samples:', error);
    }
  };

  const createArray = async () => {
    try {
      const response = await fetch(`${API_BASE}/arrays/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arrayConfig)
      });
      if (response.ok) {
        const data = await response.json();
        console.log(`Created ${data.count} samples`);
      }
    } catch (error) {
      console.error('Failed to create array:', error);
    }
  };

  const updateSampleStatus = async (sampleId: string, status: Sample['status']) => {
    try {
      await fetch(`${API_BASE}/samples/${sampleId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const captureImage = async (sampleId?: string) => {
    try {
      await fetch(`${API_BASE}/camera/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sampleId })
      });
    } catch (error) {
      console.error('Failed to capture image:', error);
    }
  };

  const handleFocusChange = useCallback(async (value: number) => {
    setFocusValue(value);
    try {
      await fetch(`${API_BASE}/camera/focus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ position: value })
      });
    } catch (error) {
      console.error('Failed to set focus:', error);
    }
  }, []);

  const handleAutoFocus = useCallback(async () => {
    try {
      await fetch(`${API_BASE}/camera/focus/auto`, { method: 'POST' });
      setFocusValue(0.5);
    } catch (error) {
      console.error('Failed to auto focus:', error);
    }
  }, []);

  return (
    <div className="container">
      <header>
        <h1>🔬 Perovskite Array Dispensing</h1>
        <p>High-throughput liquid dispensing for perovskite research</p>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <div className="camera-section">
            <h2>Microscope View</h2>
            {isStreamActive && <CameraStream />}
            
            <div className="stream-controls">
              <button 
                className="stream-btn start"
                onClick={() => setIsStreamActive(true)}
                disabled={isStreamActive}
              >
                ▶ Start Stream
              </button>
              <button 
                className="stream-btn stop"
                onClick={() => setIsStreamActive(false)}
                disabled={!isStreamActive}
              >
                ⏹ Stop Stream
              </button>
            </div>

            <FocusControl
              focusValue={focusValue}
              onFocusChange={handleFocusChange}
              onAutoFocus={handleAutoFocus}
              isFocused={focusValue > 0.3 && focusValue < 0.7}
            />
          </div>

          <div className="array-config">
            <h2>Array Configuration</h2>
            <div className="config-grid">
              <label>
                Rows
                <input 
                  type="number" 
                  value={arrayConfig.rows}
                  onChange={e => setArrayConfig(prev => ({ ...prev, rows: parseInt(e.target.value) }))}
                  min="1" max="24"
                />
              </label>
              <label>
                Columns
                <input 
                  type="number" 
                  value={arrayConfig.cols}
                  onChange={e => setArrayConfig(prev => ({ ...prev, cols: parseInt(e.target.value) }))}
                  min="1" max="24"
                />
              </label>
              <label>
                Base Name
                <input 
                  type="text" 
                  value={arrayConfig.baseName}
                  onChange={e => setArrayConfig(prev => ({ ...prev, baseName: e.target.value }))}
                />
              </label>
              <label>
                Precursor A
                <input 
                  type="text" 
                  value={arrayConfig.baseComposition.precursorA}
                  onChange={e => setArrayConfig(prev => ({ 
                    ...prev, 
                    baseComposition: { ...prev.baseComposition, precursorA: e.target.value }
                  }))}
                />
              </label>
              <label>
                Precursor B
                <input 
                  type="text" 
                  value={arrayConfig.baseComposition.precursorB}
                  onChange={e => setArrayConfig(prev => ({ 
                    ...prev, 
                    baseComposition: { ...prev.baseComposition, precursorB: e.target.value }
                  }))}
                />
              </label>
              <label>
                Solvent
                <input 
                  type="text" 
                  value={arrayConfig.baseComposition.solvent}
                  onChange={e => setArrayConfig(prev => ({ 
                    ...prev, 
                    baseComposition: { ...prev.baseComposition, solvent: e.target.value }
                  }))}
                />
              </label>
              <label>
                Concentration (M)
                <input 
                  type="number" 
                  step="0.1"
                  value={arrayConfig.baseComposition.concentration}
                  onChange={e => setArrayConfig(prev => ({ 
                    ...prev, 
                    baseComposition: { ...prev.baseComposition, concentration: parseFloat(e.target.value) }
                  }))}
                />
              </label>
              <label>
                Volume (nL)
                <input 
                  type="number" 
                  value={arrayConfig.baseVolume}
                  onChange={e => setArrayConfig(prev => ({ ...prev, baseVolume: parseFloat(e.target.value) }))}
                />
              </label>
            </div>
            <button className="create-array-btn" onClick={createArray}>
              Create Array Grid
            </button>
          </div>
        </div>

        <div className="right-panel">
          <div className="samples-section">
            <h2>Sample Array ({samples.length} spots)</h2>
            <SampleGrid 
              samples={samples}
              onStatusChange={updateSampleStatus}
              onCapture={captureImage}
            />
          </div>
          
          <RecipeViewer />
        </div>
      </div>
    </div>
  );
}

export default App;
