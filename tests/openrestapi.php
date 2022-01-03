<?php

/**
 * Simple rest API server to save build file
 * 
 * 
 * Starting  Build API server
 *    php -S localhost:8000 openrestapi.php  2>&1 | grep -v '\[200\]'
 * 
 * URL 
 *    http://localhost:8000/openrestapi.php
 * 
 * Post example
 *   {"open":"default"}
 * 
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

/**
 * 
 * @param type $file
 * @param type $content
 * @return boolean
 */



/**
 * 
 */
foreach ($_SERVER as $key => $value) {
    if (strpos($key, 'HTTP_') === 0) {
        $chunks = explode('_', $key);
        for ($i = 1; $y = sizeof($chunks) - 1, $i < $y; $i++) {
            $header .= ucfirst(strtolower($chunks[$i])) . '-';
        }
        $header .= ucfirst(strtolower($chunks[$i])) . ': ' . $value . "\n";
    }
}


$body = file_get_contents('php://input');
if ($body !== '') {
    $bodyArray = json_decode(html_entity_decode($body), true); 
    if (json_last_error() !== 0) {
     echo "";
      error_log('This is not Json');
    }
   
    try {
        if($bodyArray['open'] == 'default') {
          $bodyResult = file_get_contents("text.txt");
        }
    
        echo $bodyResult;
        error_log("\n" . $header . "\n" .  $bodyResult . "\n");
    } catch (\Exception $e) {
        echo "";
        error_log('openphp: Unable to compile content: '.$e);
    }
} 