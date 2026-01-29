# Perovskite Array Dispensing System

A web-based laboratory control system for high-throughput liquid dispensing of perovskite arrays, featuring live microscope viewing, automated focus control, and sample tracking.

## Features

- **Live Microscope Stream** - Real-time camera feed with MJPEG streaming
- **Focus Control** - Manual slider and auto-focus via v4l2
- **Array Configuration** - Configure grid dimensions and sample compositions
- **Sample Management** - Track sample status (pending, dispensing, completed, failed)
- **Image Capture** - Capture and store images for each sample
- **Recipe Library** - Built-in mimic ink recipes with xanthan gum
- **Real-time Updates** - Socket.IO for live status updates

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Backend**: Express + TypeScript + Socket.IO
- **Database**: MongoDB
- **Camera**: libcamera/rpicam via v4l2
- **Docker**: Full containerized deployment

## Prerequisites

- Raspberry Pi 4/5 with IMX519 camera
- Docker & Docker Compose
- Node.js 18+ (for development)

## Quick Start

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 2. Run with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Development Mode

```bash
# Start backend (port 3002)
cd backend
npm run dev

# Start frontend (port 3000)
cd frontend
npm run dev
```

Access at http://localhost:3000

## Project Structure

```
perovskite_arrays/
├── backend/
│   ├── src/
│   │   └── index.ts       # Express API server
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.tsx              # Main application
│   │   ├── main.tsx
│   │   ├── index.css
│   │   ├── data/
│   │   │   └── recipes.ts       # Mimic ink recipes (xanthan gum version)
│   │   └── components/
│   │       ├── CameraStream.tsx     # Live video feed
│   │       ├── SampleGrid.tsx       # Array grid with status tracking
│   │       ├── FocusControl.tsx     # Focus slider/auto
│   │       └── RecipeViewer.tsx     # Recipe lookup table
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── nginx.conf
├── data/                   # Captured images
└── docker-compose.yml
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/samples` | List all samples |
| POST | `/api/samples` | Create a new sample |
| GET | `/api/samples/:id` | Get sample details |
| PATCH | `/api/samples/:id/status` | Update sample status |
| POST | `/api/arrays/create` | Create array grid |
| GET | `/api/camera/health` | Camera health check |
| POST | `/api/camera/capture` | Capture image |
| POST | `/api/camera/focus` | Set focus (0-1) |
| POST | `/api/camera/focus/auto` | Auto focus |

## Sample Schema

```typescript
{
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
```

## Camera Configuration

Focus is controlled via v4l2:
- **Device**: `/dev/v4l-subdev1`
- **Range**: 0-4095

```bash
# Manual focus
v4l2-ctl -d /dev/v4l-subdev1 -c focus_auto=0
v4l2-ctl -d /dev/v4l-subdev1 -c focus_absolute=<value>

# Auto focus
v4l2-ctl -d /dev/v4l-subdev1 -c focus_auto=1
```

## Creating GitHub Repository

```bash
cd /home/rista/perovskite_arrays

# Initialize git
git init
git add .
git commit -m "Initial commit: Perovskite array dispensing system"

# Create repo on GitHub and push
gh repo create perovskite-arrays --public --source=. --push
```

## Troubleshooting

### Camera Not Responding
```bash
# Check camera devices
v4l2-ctl --list-devices

# Kill conflicting processes
sudo fuser -k 8080/tcp
sudo fuser -k 3002/tcp
```

### MongoDB Connection Failed
```bash
# Check MongoDB status
docker-compose logs mongodb

# Ensure MongoDB is running
docker-compose up -d mongodb
```

### Focus Not Working
```bash
# Verify v4l2 device
v4l2-ctl -d /dev/v4l-subdev1 --list-ctrls
```

## License

MIT License
