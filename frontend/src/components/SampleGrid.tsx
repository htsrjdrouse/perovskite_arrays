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

interface SampleGridProps {
  samples: Sample[];
  onStatusChange: (id: string, status: Sample['status']) => void;
  onCapture: (id?: string) => void;
}

export const SampleGrid = ({ samples, onStatusChange, onCapture }: SampleGridProps) => {
  const getStatusColor = (status: Sample['status']) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'dispensing': return '#3b82f6';
      case 'completed': return '#22c55e';
      case 'failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const handleDragStart = (e: React.DragEvent, sample: Sample) => {
    e.dataTransfer.setData('sampleId', sample.id);
  };

  if (samples.length === 0) {
    return (
      <div className="empty-grid">
        <p>No samples created yet.</p>
        <p>Use the Array Configuration panel to create a sample grid.</p>
      </div>
    );
  }

  // Group samples by row for display
  const rows = new Map<number, Sample[]>();
  samples.forEach(sample => {
    if (!rows.has(sample.position.row)) {
      rows.set(sample.position.row, []);
    }
    rows.get(sample.position.row)!.push(sample);
  });

  return (
    <div className="sample-grid">
      <div className="grid-header">
        <span>Row</span>
        <span>Column</span>
        <span>Name</span>
        <span>Composition</span>
        <span>Volume</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      <div className="grid-body">
        {samples.map(sample => (
          <div 
            key={sample.id} 
            className="grid-row"
            draggable
            onDragStart={(e) => handleDragStart(e, sample)}
            style={{ borderLeftColor: getStatusColor(sample.status) }}
          >
            <span>R{sample.position.row}</span>
            <span>C{sample.position.column}</span>
            <span className="sample-name">{sample.name}</span>
            <span className="composition">
              {sample.composition.precursorA}/{sample.composition.precursorB}
              <small>({sample.composition.concentration}M)</small>
            </span>
            <span>{sample.dispenseVolume} nL</span>
            <select 
              value={sample.status}
              onChange={(e) => onStatusChange(sample.id, e.target.value as Sample['status'])}
              style={{ borderColor: getStatusColor(sample.status) }}
            >
              <option value="pending">Pending</option>
              <option value="dispensing">Dispensing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <div className="actions">
              <button 
                className="action-btn capture"
                onClick={() => onCapture(sample.id)}
                title="Capture Image"
              >
                📷
              </button>
              {sample.image && (
                <a 
                  href={`/images/${sample.image}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="action-btn view"
                  title="View Image"
                >
                  👁
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
