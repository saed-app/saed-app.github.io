@echo off
cd /d "%~dp0"
if not exist node_modules call npm.cmd install
echo.
echo Building the app and opening the installable version...
call npm.cmd run serve
pause
