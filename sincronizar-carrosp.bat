@echo off
chcp 65001 > nul
title ND7 Garage - Sincronizador CarroSP
cls
powershell -ExecutionPolicy Bypass -File "%~dp0sync_carrosp.ps1"
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause > nul
