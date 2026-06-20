$ErrorActionPreference = "Stop"

Write-Host "Creating Next.js app..."
npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes

Set-Location "frontend"

Write-Host "Installing additional dependencies..."
npm install zustand @tanstack/react-query socket.io-client lucide-react react-hot-toast clsx tailwind-merge

Write-Host "Creating folder structure..."
$folders = @(
  "src/app/(auth)",
  "src/app/(auth)/login",
  "src/app/(auth)/register",
  "src/app/(auth)/verify-email",
  "src/app/(auth)/forgot-password",
  "src/app/(auth)/reset-password",
  "src/app/(dashboard)",
  "src/app/(dashboard)/discover",
  "src/app/(dashboard)/connections",
  "src/app/(dashboard)/chat",
  "src/app/(dashboard)/chat/[conversationId]",
  "src/app/(dashboard)/portfolio",
  "src/app/(dashboard)/portfolio/analytics",
  "src/app/(dashboard)/projects",
  "src/app/(dashboard)/projects/new",
  "src/app/(dashboard)/projects/[id]/edit",
  "src/app/(dashboard)/explore",
  "src/app/(dashboard)/collaboration",
  "src/app/(dashboard)/collaboration/new",
  "src/app/(dashboard)/notifications",
  "src/app/(dashboard)/settings",
  "src/app/(dashboard)/settings/subscription",
  "src/app/(dashboard)/settings/github",
  "src/app/search",
  "src/app/u/[username]",
  "src/app/admin",
  "src/app/admin/users",
  "src/app/admin/reports",
  "src/components/ui",
  "src/components/layout",
  "src/components/user",
  "src/components/chat",
  "src/components/portfolio",
  "src/components/projects",
  "src/hooks",
  "src/store",
  "src/lib",
  "src/types"
)

foreach ($folder in $folders) {
  New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

Write-Host "Creating core files in frontend..."
New-Item -ItemType File -Force -Path "src/lib/api.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/lib/queryClient.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/lib/socket.ts" | Out-Null
New-Item -ItemType File -Force -Path "src/store/auth.store.ts" | Out-Null

Write-Host "Frontend scaffold complete."
