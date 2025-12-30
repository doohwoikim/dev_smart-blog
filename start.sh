#!/bin/bash

# Trap SIGINT to kill child processes when the script is stopped
trap "kill 0" EXIT

echo "Starting Backend and Frontend..."

# Start Backend
cd backend

# Check if venv exists, if not create it
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Define explicit paths to venv binaries
PYTHON="./venv/bin/python"

# Install dependencies using the venv python to ensure correct environment
echo "Installing/Updating backend dependencies..."
"$PYTHON" -m pip install --upgrade pip
"$PYTHON" -m pip install -r requirements.txt

# Run uvicorn using the venv python
echo "Starting Backend Server (Uvicorn)..."
"$PYTHON" -m uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

# Start Frontend
cd ../frontend
echo "Starting Frontend (Next.js)..."
npm run dev -- -p 3000 &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
