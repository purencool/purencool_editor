<?php
/**
 * php -S localhost:8000 index.php  2>&1 | grep -v '\[200\]'
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


foreach ($_SERVER as $key => $value) {
    if (strpos($key, 'HTTP_') === 0) {
        $chunks = explode('_', $key);
        for ($i = 1; $y = sizeof($chunks) - 1, $i < $y; $i++) {
            $header .= ucfirst(strtolower($chunks[$i])).'-';
        }
        $header .= ucfirst(strtolower($chunks[$i])).': '.$value."\n";
    }
}

$body = file_get_contents('php://input');
if ($body != '') {
  print("\n$body\n\n");
} else {
  print (
     '[{"title":"kk","code":"k"},{"title":"jjj","code":"j"},{"title":"","code":""},{"title":"","code":"sss"}]"'           
  );  
}
error_log("\n".$header."\n".$body."\n");