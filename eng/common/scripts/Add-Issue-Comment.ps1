[CmdletBinding(SupportsShouldProcess = $true)]
param(
  [Parameter(Mandatory = $true)]
  [string]$RepoOwner,

  [Parameter(Mandatory = $true)]
  [string]$RepoName,

  [Parameter(Mandatory = $true)]
  [string]$IssueNumber,

  [Parameter(Mandatory = $true)]
  [string]$AuthToken
)

. "${PSScriptRoot}\logging.ps1"

$headers = @{
  Authorization = "bearer $AuthToken"
}

$apiUrl = "https://api.github.com/repos/$RepoOwner/$RepoName/issues/$IssueNumber/comments"

$PRComment = "The following pipelines have been queued for testing\n$QueuedPipelines"

$data = @{
  body = $PRComment
}

try {
  $resp = Invoke-RestMethod -Method POST -Headers $headers -Uri $apiUrl -Body ($data | ConvertTo-Json)
}
catch {
  LogError "Invoke-RestMethod [ $apiUrl ] failed with exception:`n$_"
  exit 1
}