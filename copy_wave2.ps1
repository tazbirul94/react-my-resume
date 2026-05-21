$root = "C:\Users\mhaque\Downloads\Myself\Coding\react-my-resume"
$wtD  = "$root\.claude\worktrees\agent-a1f0b76273a1208f5"
$wtE  = "$root\.claude\worktrees\agent-a63b4051a33a99fcc"
$wtG  = "$root\.claude\worktrees\agent-a67c256ec0bd51ad5"

# Agent D — section components
New-Item -ItemType Directory -Force "$root\src\components\sections" | Out-Null
Copy-Item -Recurse -Force "$wtD\src\components\sections\*" "$root\src\components\sections\"
Write-Host "Agent D sections copied"

# Agent E — admin components + pages
New-Item -ItemType Directory -Force "$root\src\components\admin" | Out-Null
New-Item -ItemType Directory -Force "$root\src\pages\admin" | Out-Null
Copy-Item -Recurse -Force "$wtE\src\components\admin\*" "$root\src\components\admin\"
Copy-Item -Recurse -Force "$wtE\src\pages\admin\*" "$root\src\pages\admin\"
Write-Host "Agent E admin copied"

# Agent G — App.jsx + Resume page
New-Item -ItemType Directory -Force "$root\src\pages" | Out-Null
Copy-Item -Force "$wtG\src\App.jsx" "$root\src\App.jsx"
Copy-Item -Force "$wtG\src\pages\Resume.jsx" "$root\src\pages\Resume.jsx"
Write-Host "Agent G App.jsx + Resume copied"

Write-Host "All Wave 2 files copied"
