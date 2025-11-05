# --- Stage 1: Build the React Frontend ---
# This stage is unchanged
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy only package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend code and build it
COPY frontend/ ./
RUN npm run build


# --- Stage 2: Build the FastAPI Backend ---
FROM python:3.10-slim AS backend
WORKDIR /app

# Set the port for Cloud Run (Gunicorn will use this)
ENV PORT 8080

# Install backend dependencies
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY backend/ .

# --- The Magic Step (Unchanged) ---
# Copy the built frontend files from Stage 1 into
# the backend's "static" folder.
# COPY --from=frontend-builder /app/frontend/build ./static

# --- Updated Command for FastAPI ---
# We use gunicorn as the process manager and tell it to use
# uvicorn's worker class for running the ASGI app.
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "app.app:app", "--bind", "0.0.0.0:8080"]
