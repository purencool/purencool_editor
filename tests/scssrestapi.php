<?php

/**
 * Simple rest API server to compile SCSS it needs a live key to work
 * 
 * 
 * Starting SASS API server
 *    php -S localhost:8000 iscssrestapi.php  2>&1 | grep -v '\[200\]'
 * 
 * URL 
 *    http://localhost:8000/scssrestapi.php
 * 
 * Post example
 *   {"live":"p{ a{background:red; } }"}
 * 
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

require_once 'scssphp/scss.inc.php';

use ScssPhp\ScssPhp\Compiler;
use ScssPhp\ScssPhp\OutputStyle;

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
        $compiler = new Compiler();
        $compiler->setOutputStyle(OutputStyle::COMPRESSED);
        echo '{"live_response":"'. $compiler->compileString($bodyArray['live'])->getCss().'"}';
        error_log("\n" . $header . "\n" . $compiler->compileString($bodyArray['live'])->getCss() . "\n");
    } catch (\Exception $e) {
        echo "";
        error_log('scssphp: Unable to compile content: '.$e);
    }
} 