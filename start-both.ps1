# PowerShell script to start both backend and frontend servers
# Usage: .\start-both.ps1

Write-Host "Starting Hotel Booking System servers..." -ForegroundColor Cyan
Write-Host ""

# Start backend server in a new window
Write-Host "Starting backend server (port 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start frontend server in a new window
Write-Host "Starting frontend server (port 3001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\..\hotel_booking_ui'; npm run dev"

Write-Host ""
Write-Host "Both servers are starting in separate windows." -ForegroundColor Green
Write-Host "Backend: http://localhost:3000" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3001" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to exit this script (servers will continue running)..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

