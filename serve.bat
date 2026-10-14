@echo off
setlocal
cd /d "%~dp0"

set "PHP_EXE="
for /f "delims=" %%P in ('where php 2^>nul') do if not defined PHP_EXE set "PHP_EXE=%%P"
if not defined PHP_EXE if exist "%USERPROFILE%\php\php.exe" set "PHP_EXE=%USERPROFILE%\php\php.exe"

if not defined PHP_EXE (
  echo.
  echo PHP nao encontrado no PATH nem em %USERPROFILE%\php\php.exe
  echo Baixe o zip NTS x64 em https://windows.php.net/downloads/releases/
  echo e extraia em %USERPROFILE%\php
  exit /b 1
)

echo.
echo Servidor TechFix: http://localhost:8000    ^(Ctrl+C para parar^)
echo Pasta raiz: %CD%
"%PHP_EXE%" -S localhost:8000
