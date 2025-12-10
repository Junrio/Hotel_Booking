@echo off
echo Starting Hotel Booking System servers...
echo.

echo Starting backend server (port 3000)...
start "Backend Server" cmd /k "npm run dev"

timeout /t 2 /nobreak >nul

echo Starting frontend server (port 3001)...
start "Frontend Server" cmd /k "cd ..\hotel_booking_ui && npm run dev"

echo.
echo Both servers are starting in separate windows.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:3001
echo.
pause

