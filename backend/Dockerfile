FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci

COPY backend/ .

# Copy markdown files from project root BEFORE build
COPY executive_summary.md project_overview.md fabrication_workflow.md current_progress.md NOTEBOOK.md ./

RUN npm run build

# Create data directory
RUN mkdir -p /app/data

EXPOSE 3002

CMD ["node", "dist/index.js"]
