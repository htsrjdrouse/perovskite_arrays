import express, { Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage for samples
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
  timestamp: Date;
}

const samples: Sample[] = [];

// ============= API ENDPOINTS =============

// Sample Management
app.post('/api/samples', (req: Request, res: Response) => {
  try {
    const { name, composition, position, dispenseVolume } = req.body;
    const sample: Sample = {
      id: uuidv4(),
      name,
      composition,
      position,
      dispenseVolume,
      status: 'pending',
      timestamp: new Date()
    };
    samples.push(sample);
    io.emit('sample:created', sample);
    res.json(sample);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sample' });
  }
});

app.get('/api/samples', (req: Request, res: Response) => {
  try {
    res.json(samples.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch samples' });
  }
});

app.get('/api/samples/:id', (req: Request, res: Response) => {
  try {
    const sample = samples.find(s => s.id === req.params.id);
    if (!sample) {
      return res.status(404).json({ error: 'Sample not found' });
    }
    res.json(sample);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sample' });
  }
});

app.patch('/api/samples/:id/status', (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const sample = samples.find(s => s.id === req.params.id);
    if (!sample) {
      return res.status(404).json({ error: 'Sample not found' });
    }
    sample.status = status;
    io.emit('sample:updated', sample);
    res.json(sample);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sample status' });
  }
});

// Array Grid Management
app.post('/api/arrays/create', (req: Request, res: Response) => {
  try {
    const { rows, cols, baseName, baseComposition, baseVolume } = req.body;
    const newSamples: Sample[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < cols; column++) {
        const sample: Sample = {
          id: uuidv4(),
          name: `${baseName}_R${row}_C${column}`,
          composition: baseComposition,
          position: { row, column },
          dispenseVolume: baseVolume,
          status: 'pending',
          timestamp: new Date()
        };
        samples.push(sample);
        newSamples.push(sample);
      }
    }
    
    io.emit('array:created', { rows, cols, samples: newSamples });
    res.json({ count: newSamples.length, samples: newSamples });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create array' });
  }
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', storage: 'memory' });
});

// Documentation endpoints
const docsPath = path.join(__dirname, '../../');
const docFiles = [
  'executive_summary.md',
  'NOTEBOOK.md',
  'project_overview.md',
  'fabrication_workflow.md',
  'current_progress.md'
];

app.get('/api/docs', (req: Request, res: Response) => {
  res.json(docFiles.map(file => ({ name: file, url: `/api/docs/${file}` })));
});

app.get('/api/docs/:filename', (req: Request, res: Response) => {
  const filename = req.params.filename;
  if (!docFiles.includes(filename)) {
    return res.status(404).json({ error: 'Documentation file not found' });
  }
  const filePath = path.join(docsPath, filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read documentation file' });
    }
    res.type('text/markdown').send(data);
  });
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const PORT = process.env.PORT || 3002;

httpServer.listen(PORT, () => {
  console.log(`Perovskite Arrays API running on port ${PORT}`);
});
