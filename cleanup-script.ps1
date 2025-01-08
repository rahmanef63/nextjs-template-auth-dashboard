# Create backup directory
$backupDir = ".\backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
New-Item -ItemType Directory -Path $backupDir

# 1. Handle RBAC and Permission merge
Write-Host "Backing up RBAC and Permission directories..."
Copy-Item -Path ".\shared\rbac" -Destination "$backupDir\rbac" -Recurse
Copy-Item -Path ".\shared\permission" -Destination "$backupDir\permission" -Recurse

# Move RBAC contents to permission directory
Write-Host "Merging RBAC into Permission..."
if (Test-Path ".\shared\rbac\components") {
    Copy-Item ".\shared\rbac\components\*" -Destination ".\shared\permission\components" -Recurse -Force
}
if (Test-Path ".\shared\rbac\config") {
    Copy-Item ".\shared\rbac\config\*" -Destination ".\shared\permission\config" -Recurse -Force
}
if (Test-Path ".\shared\rbac\types") {
    Copy-Item ".\shared\rbac\types\*" -Destination ".\shared\permission\types" -Recurse -Force
}

# 2. Handle validation consolidation
Write-Host "Consolidating validation logic..."
Copy-Item -Path ".\shared\utils\validation" -Destination "$backupDir\utils-validation" -Recurse
if (Test-Path ".\shared\utils\validation") {
    Copy-Item ".\shared\utils\validation\*" -Destination ".\shared\lib\validation" -Recurse -Force
}

# 3. Merge navigation configs
Write-Host "Merging navigation configurations..."
Copy-Item ".\shared\config\user-nav.tsx" -Destination "$backupDir\user-nav.tsx"
Copy-Item ".\shared\config\navigation.tsx" -Destination "$backupDir\navigation.tsx"
if (Test-Path ".\shared\config\user-nav.tsx") {
    Move-Item ".\shared\config\user-nav.tsx" -Destination "$backupDir\moved\user-nav.tsx"
}

# 4. Move utils
Write-Host "Consolidating utilities..."
if (Test-Path ".\shared\lib\utils.ts") {
    Copy-Item ".\shared\lib\utils.ts" -Destination "$backupDir\utils.ts"
    Move-Item ".\shared\lib\utils.ts" -Destination ".\shared\utils\general-utils.ts"
}

# Clean up redundant directories
Write-Host "Cleaning up redundant directories..."
if (Test-Path ".\shared\rbac") {
    Remove-Item ".\shared\rbac" -Recurse -Force
}
if (Test-Path ".\shared\utils\validation") {
    Remove-Item ".\shared\utils\validation" -Recurse -Force
}

Write-Host "Cleanup completed! Backup created at: $backupDir"
Write-Host "Please review the changes and test the application thoroughly."
