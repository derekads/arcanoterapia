@echo off
chcp 65001 >nul
title Arcanoterapia V2 - Iniciar Sistema
color 0f

echo ========================================================
echo      ARCANOTERAPIA - VERSÃO 2 (COM PARTÍCULAS)
echo ========================================================
echo.
echo [1/3] Verificando ambiente...

:: Adiciona caminhos comuns do Node ao PATH caso não estejam
set PATH=%PATH%;C:\Program Files\nodejs;C:\Program Files (x86)\nodejs;%AppData%\npm

where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0c
    echo [ERRO] Node.js não encontrado!
    echo Por favor, instale o Node.js do site: https://nodejs.org/
    echo.
    pause
    exit
)

echo [2/3] Instalando dependências...
echo Isso pode levar alguns minutos na primeira vez.
call npm install
if %errorlevel% neq 0 (
    color 0e
    echo [AVISO] Houve um problema na instalação. Tentando continuar...
)

echo.
echo [3/3] Iniciando o sistema...
echo O navegador deve abrir automaticamente em breve.
echo.
echo ========================================================
echo      PRESSIONE CTRL+C PARA PARAR O SERVIDOR
echo ========================================================
echo.

call npm run dev -- --open

pause
