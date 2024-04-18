$envContent = @"
PORT=3000
DATABASE_URL=""mysql://USER:PASSWORD@HOST:PORT/DATABASE""
PRISMA_SCHEMA=src/db/schema.prisma
"@

Write-Host "Configurando servidor. Por favor, espere..."

# Intentar verificar la versión de bun
try {
  $bunVersion = & bun --version
  Write-Host "Instalando... versión de bun: $bunVersion"
}
catch {
  Write-Host "Bun no está instalado. Procediendo a la instalación..."
  powershell -c "irm bun.sh/install.ps1 | iex"
  Write-Host "Bun ha sido instalado con éxito."
}

# Instalar dependencias
bun install
Write-Host "Dependencias instaladas"

# Crear archivo .env
$currentPath = Get-Location
$envFilePath = Join-Path -Path $currentPath.Path -ChildPath ".env"
Set-Content -Path $envFilePath -Value $envContent
Write-Host "Archivo .env creado"

# Ejecutar migraciones de desarrollo
bun prisma migrate dev
Write-Host "Migraciones ejecutadas con éxito."

# Generar cliente de prisma
bun prisma generate
Write-Host "Cliente generado con éxito"

# Inicializar servidor de desarrollo
Write-Host "Inicializando servidor de desarrollo..."
bun --watch ./server.ts