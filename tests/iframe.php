<?php
/**
 * php -S localhost:8001 iframe.php  2>&1 | grep -v '\[200\]'
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
//header('X-Frame-Options: SAMEORIGIN');


foreach ($_SERVER as $key => $value) {
    if (strpos($key, 'HTTP_') === 0) {
        $chunks = explode('_', $key);
        for ($i = 1; $y = sizeof($chunks) - 1, $i < $y; $i++) {
            $header .= ucfirst(strtolower($chunks[$i])).'-';
        }
        $header .= ucfirst(strtolower($chunks[$i])).': '.$value."\n";
    }
}

echo '
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML 5 Boilerplate</title>
    <link rel="stylesheet" href="./assets/style.css">
  </head>
  <body>
    <h1>Testing to see</h1>
    <script src="./assets/iframe.js"></script>
  </body>
</html>';

error_log("\n".$header."\n");