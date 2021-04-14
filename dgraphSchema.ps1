$schemas = $PSScriptRoot + "\src\schemas"
$dgraphUrl = "http://localhost:8080/admin/schema"
$body = get-content ($schemas + "\schema.graphql")
$props = @{
    Uri = $dgraphUrl
    Method = 'POST'
    ContentType = 'application/json'
    Body = $body
}
Remove-Item -path $schemas\schema.graphql;
Start-Sleep -Seconds 0.5
Write-Output "Removed old schema...";
get-content $schemas\*.graphql | set-content $schemas\schema.graphql;
Start-Sleep -Seconds 0.5
Write-Output "Created new schema...";

$resp = Invoke-WebRequest @props
if($resp.StatusCode){
    $resp.content
    Write-Output "New schema uploaded..."
    npm run typegen
    Write-Output "Types generated..."
}






