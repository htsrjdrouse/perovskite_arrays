import express, { Request, Response } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
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

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:password123@localhost:27017/perovskite_arrays?authSource=admin';
const IMAGES_DIR = process.env.IMAGES_DIR || '/home/rista/perovskite_arrays/data';

// Ensure directories exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// MongoDB Schema for Sample Dispensing
interface ISample {
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
  timestamp: Date;
}

const sampleSchema = new mongoose.Schema<ISample>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  composition: {
    precursorA: String,
    precursorB: String,
    solvent: String,
    concentration: Number
  },
  position: {
    row: Number,
    column: Number
  },
  dispenseVolume: Number,
  status: { type: String, enum: ['pending', 'dispensing', 'completed', 'failed'], default: 'pending' },
  image: String,
  timestamp: { type: Date, default: Date.now }
});

const Sample = mongoose.model<ISample>('Sample', sampleSchema);

// Camera State
let currentFocusPosition = 0.5;
let cameraProcess: any = null;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// ============= API ENDPOINTS =============

// Sample Management
app.post('/api/samples', async (req: Request, res: Response) => {
  try {
    const { name, composition, position, dispenseVolume } = req.body;
    const sample = new Sample({
      id: uuidv4(),
      name,
      composition,
      position,
      dispenseVolume,
      status: 'pending'
    });
    await sample.save();
    io.emit('sample:created', sample);
    res.json(sample);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sample' });
  }
});

app.get('/api/samples', async (req: Request, res: Response) => {
  try {
    const samples = await Sample.find().sort({ timestamp: -1 });
    res.json(samples);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch samples' });
  }
});

app.get('/api/samples/:id', async (req: Request, res: Response) => {
  try {
    const sample = await Sample.findOne({ id: req.params.id });
    if (!sample) {
      return res.status(404).json({ error: 'Sample not found' });
    }
    res.json(sample);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sample' });
  }
});

app.patch('/api/samples/:id/status', async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const sample = await Sample.findOneAndUpdate(
      { id: req.params.id },
      { status },
      { new: true }
    );
    if (!sample) {
      return res.status(404).json({ error: 'Sample not found' });
    }
    io.emit('sample:updated', sample);
    res.json(sample);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sample status' });
  }
});

// Array Grid Management
app.post('/api/arrays/create', async (req: Request, res: Response) => {
  try {
    const { rows, cols, baseName, baseComposition, baseVolume } = req.body;
    const samples = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const sample = new Sample({
          id: uuidv4(),
          name: `${baseName}_R${row}_C${col}`,
          composition: baseComposition,
          position: { row, col },
          dispenseVolume: baseVolume,
          status: 'pending'
        });
        await sample.save();
        samples.push(sample);
      }
    }
    
    io.emit('array:created', { rows, cols, samples });
    res.json({ count: samples.length, samples });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create array' });
  }
});

// Camera Control (same as camera-pi)
app.get('/api/camera/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    focusPosition: currentFocusPosition 
  });
});

app.post('/api/camera/capture', async (req: Request, res: Response) => {
  try {
    const { sampleId } = req.body;
    const id = uuidv4();
    const filename = `perovskite_${Date.now()}_${id.slice(0, 8)}.jpg`;
    const filepath = path.join(IMAGES_DIR, filename);

    // Capture image (placeholder - would use rpicam-still in production)
    const rpicamStill = spawn('rpicam-still', [
      '--output', filepath,
      '--width', '1920',
      '--height', '1080',
      '--quality', '90',
      '--timeout', '3000'
    ]);

    rpicamStill.on('close', async (code: number) => {
      if (code === 0 && fs.existsSync(filepath)) {
        if (sampleId) {
          await Sample.findOneAndUpdate(
            { id: sampleId },
            { image: filename }
          );
        }
        io.emit('image:captured', { id, filename, sampleId });
        res.json({ id, filename, timestamp: new Date().toISOString() });
      } else {
        res.status(500).json({ error: 'Capture failed' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to capture image' });
  }
});

app.post('/api/camera/focus', async (req: Request, res: Response) => {
  try {
    const { position } = req.body;
    if (typeof position !== 'number' || position < 0 || position > 1) {
      return res.status(400).json({ error: 'Position must be 0-1' });
    }
    
    // Set focus via v4l2
    const absoluteValue = Math.round(position * 4095);
    spawnSync('v4l2-ctl', [
      '-d', '/dev/v4l-subdev1',
      '-c', 'focus_auto=0'
    ]);
    spawnSync('v4l2-ctl', [
      '-d', '/dev/v4l-subdev1',
      '-c', `focus_absolute=${absoluteValue}`
    ]);
    
    currentFocusPosition = position;
    res.json({ success: true, position: currentFocusPosition });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set focus' });
  }
});

app.post('/api/camera/focus/auto', async (req: Request, res: Response) => {
  try {
    spawnSync('v4l2-ctl', [
      '-d', '/dev/v4l-subdev1',
      '-c', 'focus_auto=1'
    ]);
    currentFocusPosition = 0.5;
    res.json({ success: true, position: currentFocusPosition, mode: 'auto' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set auto focus' });
  }
});

// Static files for images
app.use('/images', express.static(IMAGES_DIR));

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', mongodb: mongoose.connection.readyState === 1 });
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

process.on('SIGTERM', () => {
  mongoose.connection.close();
  httpServer.close(() => process.exit(0));
});
