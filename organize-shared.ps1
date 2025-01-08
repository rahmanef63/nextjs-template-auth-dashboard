# Function to write colored output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

# Create backup directory
$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupDir = ".\backup-$timestamp"
New-Item -ItemType Directory -Path $backupDir | Out-Null
Write-ColorOutput Green "Created backup directory: $backupDir"

# Function to safely move files
function Move-FileWithBackup {
    param (
        [string]$source,
        [string]$destination,
        [string]$reason
    )
    
    if (Test-Path $source) {
        # Create backup
        $relativePath = $source.Replace("$PWD\", "")
        $backupPath = Join-Path $backupDir $relativePath
        New-Item -ItemType Directory -Path (Split-Path $backupPath) -Force | Out-Null
        Copy-Item $source $backupPath -Force
        
        # Create destination directory if it doesn't exist
        $destDir = Split-Path $destination
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        
        # Move file
        Move-Item $source $destination -Force
        Write-ColorOutput Yellow "Moved: $relativePath -> $($destination.Replace("$PWD\", ''))"
        Write-ColorOutput Gray "Reason: $reason"
    }
}

# Function to safely delete files
function Remove-FileWithBackup {
    param (
        [string]$path,
        [string]$reason
    )
    
    if (Test-Path $path) {
        # Create backup
        $relativePath = $path.Replace("$PWD\", "")
        $backupPath = Join-Path $backupDir $relativePath
        New-Item -ItemType Directory -Path (Split-Path $backupPath) -Force | Out-Null
        Copy-Item $path $backupPath -Force
        
        # Delete file
        Remove-Item $path -Force
        Write-ColorOutput Red "Deleted: $relativePath"
        Write-ColorOutput Gray "Reason: $reason"
    }
}

# Function to update imports in TypeScript/JavaScript files
function Update-Imports {
    param (
        [string]$directory
    )
    
    Write-ColorOutput Cyan "Updating imports in $directory..."
    
    Get-ChildItem -Path $directory -Recurse -Include "*.ts","*.tsx" | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        $updated = $false
        
        # Update import paths
        $replacements = @{
            "from '[^']*\/types\/auth'" = "from '../auth/types/auth-types'"
            "from '[^']*\/permission\/types\/permission-types'" = "from '../permission/types/rbac-types'"
            "from '[^']*\/constants\/permission-constants'" = "from '../config/permissions'"
            "from '[^']*\/constants\/menu-items'" = "from '../config/menu-config'"
            "from '[^']*\/constants\/storage-constants'" = "from '../config/storage-config'"
        }
        
        foreach ($pattern in $replacements.Keys) {
            $replacement = $replacements[$pattern]
            if ($content -match $pattern) {
                $content = $content -replace $pattern, $replacement
                $updated = $true
            }
        }
        
        if ($updated) {
            Set-Content $_.FullName $content
            Write-ColorOutput Yellow "Updated imports in: $($_.FullName.Replace("$PWD\", ''))"
        }
    }
}

Write-ColorOutput Cyan "Starting file organization..."

# Permission module cleanup
Move-FileWithBackup `
    -source ".\shared\types\auth.ts" `
    -destination ".\shared\auth\types\auth-types.ts" `
    -reason "Consolidate auth types in auth module"

Remove-FileWithBackup `
    -path ".\shared\permission\types\permission-types.ts" `
    -reason "Redundant with rbac-types.ts, using unified RBAC system"

Move-FileWithBackup `
    -source ".\shared\permission\constants\permission-constants.ts" `
    -destination ".\shared\permission\config\permissions.ts" `
    -reason "Consolidate permission configuration"

# Navigation module cleanup
Move-FileWithBackup `
    -source ".\shared\navigation\constants\menu-items.ts" `
    -destination ".\shared\navigation\config\menu-config.ts" `
    -reason "Better organization of navigation configuration"

# Storage module cleanup
Move-FileWithBackup `
    -source ".\shared\storage\constants\storage-constants.ts" `
    -destination ".\shared\storage\config\storage-config.ts" `
    -reason "Consolidate storage configuration"

# Update imports in all files
Update-Imports ".\shared"

Write-ColorOutput Green "File organization complete!"
Write-ColorOutput Yellow "Backup created at: $backupDir"
