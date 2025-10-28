@echo off
echo Setting up email configuration for Adaba Farm Resort...
echo.

cd backend

echo Creating .env file from template...
if exist .env (
    echo .env file already exists. Creating backup...
    copy .env .env.backup
)

copy env.example .env

echo.
echo ================================
echo IMPORTANT: Manual Configuration Required
echo ================================
echo.
echo Please edit backend/.env file with your email settings:
echo.
echo EMAIL_USER=admin@earnestora.com
echo EMAIL_PASS=Chika1997.@123
echo COMPANY_EMAIL=admin@earnestora.com
echo SMTP_HOST=earnestora.com
echo SMTP_PORT=465
echo SMTP_SECURE=true
echo SMTP_TLS_REJECT_UNAUTHORIZED=false
echo.
echo After editing the .env file, run:
echo npm install
echo node server.js
echo.
echo Press any key to open the .env file for editing...
pause > nul

notepad .env

echo.
echo Configuration complete! 
echo Check BACKEND_EMAIL_CONFIG.md for detailed instructions.
pause
