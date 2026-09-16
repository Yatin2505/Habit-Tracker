@echo off
setlocal
cd /d "%~dp0"

if not exist "node_modules" (
  echo First-time setup: installing HabitFlow...
  call npm install
  if errorlevel 1 (
    echo Could not install HabitFlow. Make sure Node.js is installed.
    pause
    exit /b 1
  )
)

start "HabitFlow server" powershell -NoExit -ExecutionPolicy Bypass -Command "Set-Location -LiteralPath '%~dp0'; npm run dev"
timeout /t 3 /nobreak >nul
start "" "http://localhost:5173"
