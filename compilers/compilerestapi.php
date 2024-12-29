<?php

/**
 * Simple rest API server to save build file
 * 
 * 
 * Starting  Build API server
 *    php -S localhost:8000 compilerestapi.php  2>&1 | grep -v '\[200\]'
 * 
 * URL 
 *    http://localhost:8000/compilerestapi.php
 * 
 * Post example
 *   {"compiled":[{"title":"Test title","code":"div{\n    a{\n     background: red;\n   }\n}\n\n"},{"title":"akah. aksdhtalll","code":"div{\n    a{\n     background: green;\n   }\n}"}]}
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
function writeFileContent($file, $content){
   $fp = fopen($file, 'w');
   fwrite($fp, $content);
   fclose($fp);
   chmod($file, 0777);  //changed to add the zero
   return true;
}


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
    writeFileContent('./text.txt', $body);
    try {
        echo '{"compiled_response":"'. $body .'"}';
        error_log("\n" . $header . "\n" . $body . "\n");
    } catch (\Exception $e) {
        echo "";
        error_log('compilephp: Unable to compile content: '.$e);
    }
} 