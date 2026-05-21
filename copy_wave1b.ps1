$wt = "C:\Users\mhaque\Downloads\Myself\Coding\react-my-resume\.claude\worktrees\agent-a2d8763e76a3587f6"
$dst = "C:\Users\mhaque\Downloads\Myself\Coding\react-my-resume"

Copy-Item -Recurse -Force "$wt\supabase" "$dst\supabase"
Copy-Item -Force "$wt\src\lib\supabase.js" "$dst\src\lib\supabase.js"
Copy-Item -Force "$wt\src\lib\fallback.js" "$dst\src\lib\fallback.js"
New-Item -ItemType Directory -Force "$dst\src\hooks" | Out-Null
Copy-Item -Force "$wt\src\hooks\useResume.js" "$dst\src\hooks\useResume.js"
Copy-Item -Force "$wt\src\hooks\useAuth.js" "$dst\src\hooks\useAuth.js"
Write-Host "Agent B files copied OK"
