$ErrorActionPreference = "Stop"
Write-Host "Creating backend directory..."
New-Item -ItemType Directory -Force -Path "backend" | Out-Null
Set-Location "backend"

Write-Host "Initializing npm project..."
npm init -y | Out-Null

Write-Host "Installing production dependencies..."
npm install express mongoose cors dotenv socket.io ioredis bullmq bcrypt jsonwebtoken express-rate-limit zod razorpay @aws-sdk/client-s3 @aws-sdk/client-ses passport passport-github2 multer winston

Write-Host "Installing dev dependencies..."
npm install -D typescript @types/express @types/node @types/cors @types/bcrypt @types/jsonwebtoken @types/multer @types/passport @types/passport-github2 ts-node nodemon

Write-Host "Initializing TypeScript..."
npx tsc --init

Write-Host "Creating folder structure..."
$folders = @(
  "src/config",
  "src/middleware",
  "src/models",
  "src/utils",
  "src/sockets",
  "src/jobs",
  "src/modules/auth",
  "src/modules/user",
  "src/modules/discovery",
  "src/modules/connections",
  "src/modules/chat",
  "src/modules/portfolio",
  "src/modules/projects",
  "src/modules/collaboration",
  "src/modules/subscription",
  "src/modules/github",
  "src/modules/notifications",
  "src/modules/admin"
)

foreach ($folder in $folders) {
  New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

Write-Host "Creating placeholder files in config..."
New-Item -ItemType File -Force -Path "src/config/db.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/config/redis.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/config/s3.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/config/razorpay.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/config/env.ts" | Out-Null

Write-Host "Creating core files..."
New-Item -ItemType File -Force -Path "src/app.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/server.ts" | Out-Null
New-Item -ItemType File -Force -Path ".env" | Out-Null
New-Item -ItemType File -Force -Path ".env.example" | Out-Null
New-Item -ItemType File -Force -Path ".gitignore" | Out-Null

Add-Content -Path ".gitignore" -Value "node_modules/`n.env`ndist/"

Write-Host "Backend scaffold complete."
