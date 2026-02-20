# Perovskite Nanosolar Toolchanger Project

Electronic notebook for the development of a toolchanging 3D printer system for dispensing perovskite nanosolar arrays. The system integrates liquid handling, UV curing, and camera inspection tools for automated fabrication.

## Project Overview

The toolchanger has 3 specialized tools:
1. **Liquid Handling Tool**: Dispenses perovskite precursors and inks with precision pipetting
2. **UV Curing Tool**: Cures deposited materials for stability
3. **Camera Inspection Tool**: Real-time quality control and positioning

Current progress: Dispensed test lines using water from 25 AWG pipette. Camera system developed (see [GitHub](https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser/camera-pi)).

## Web Control System

A web-based laboratory control system for high-throughput liquid dispensing of perovskite arrays, featuring recipe management and sample tracking.

## Features

- **Array Configuration** - Configure grid dimensions and sample compositions
- **Sample Management** - Track sample status (pending, dispensing, completed, failed)
- **Recipe Library** - Built-in mimic ink recipes with xanthan gum
- **Real-time Updates** - Socket.IO for live status updates

## Development Progress

- **Liquid Dispensing**: Validated dispensing lines using water from 25 AWG pipette
- **Mimic Inks**: Tested and validated dispensing for all mimic inks
- **Camera System**: Developed inspection tool (see [GitHub](https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser/camera-pi))
- **Web Control**: Dockerized control system for array management

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Backend**: Express + TypeScript + Socket.IO
- **Database**: MongoDB
- **Docker**: Full containerized deployment

## Docker Architecture

The system runs in a multi-container Docker setup:

- **frontend**: React app served by Nginx (port 3007)
- **backend**: Node.js/Express API with Socket.IO (port 3008)
- **mongodb**: MongoDB database for sample tracking

Services communicate via Docker network. Backend handles array creation, sample management, and real-time updates. Frontend provides UI for configuration and monitoring.

## Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for development)
- MongoDB (included in Docker Compose)

## Quick Start

### Run with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Development Mode

```bash
# Start backend (port 3008)
cd backend
npm run dev

# Start frontend (port 5173)
cd frontend
npm run dev
```

Access at http://localhost:3007

**Ports:**
- Frontend: 3007
- Backend API: 3008
- MongoDB: 27017 (internal)

## Project Structure

```
perovskite_arrays/
├── backend/                    # Node.js API server
│   ├── src/index.ts            # Express API with Socket.IO
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/                   # React web UI
│   ├── src/
│   │   ├── App.tsx             # Main application
│   │   ├── main.tsx
│   │   ├── data/recipes.ts     # Mimic ink recipes
│   │   └── components/
│   │       ├── SampleGrid.tsx  # Array grid with status
│   │       └── RecipeViewer.tsx # Recipe lookup
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml          # Multi-service orchestration
└── NOTEBOOK.md                 # Electronic project log
```

Related: [Toolchanger Hardware](https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser), [Camera System](https://github.com/htsrjdrouse/rister-toolchanger/tree/4dispenser/camera-pi)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/samples` | List all samples |
| POST | `/api/samples` | Create a new sample |
| GET | `/api/samples/:id` | Get sample details |
| PATCH | `/api/samples/:id/status` | Update sample status |
| POST | `/api/arrays/create` | Create array grid |

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
  timestamp: Date;
}
```



## License

MIT License
