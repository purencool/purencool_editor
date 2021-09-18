<?php

/**
 * Simple rest API server to save build file
 * 
 * 
 * Starting  Build API server
 *    php -S localhost:8000 api.php  2>&1 | grep -v '\[200\]'
 * 
 * URL 
 *    http://localhost:8000/api.php
 * 
 * Post example
 *   {"data":"service_collection"}
 *   {"data":"editor"}
 *   {"code":""}
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

function configurationApi($var = 'default') {
  $content = file_get_contents("https://raw.githubusercontent.com/purencool/purencool-components/main/paths.txt");
  $contentConfigRaw = "https://raw.githubusercontent.com/purencool/purencool-components/main/";

  $returnObject = [];
  $returnSmObj = [];
  foreach (explode("\n", $content) as $value) {
    if ($value !== "") {
      $configJson = file_get_contents($contentConfigRaw . $value . "config.json");
      $configJsonObj = json_decode($configJson, true);

      $extraConfiguration = 'false';
      if (!empty($configJsonObj['configuration'])) {
        $extraConfiguration = 'true';
      }

      $id = strtolower(str_replace('_', '', str_replace('.', '', str_replace('/', '', preg_replace('/\s+/', '', $value . $configJsonObj['package_name'])))));
      if ($configJsonObj['package_name'] !== "") {
        $returnSmObj[] = [
            'id' => $id,
            'label' => $configJsonObj['package_name'],
            'database_configuration' => $extraConfiguration
        ];

        $returnObject[] = [
            'id' => $id,
            'label' => $configJsonObj['package_name'],
            'path' => $value,
            'url' => $contentConfigRaw . $value,
            'configuration' => $configJson,
            'database_configuration' => $extraConfiguration
        ];
      }
    }
  }

  if ($var == 'editor') {
    return $returnSmObj;
  }

  return $returnObject;
}

function codeApi($var) {
  $path = getcwd() . "/data/temp";
  $filegz = $path . "/code.tar.gz";
  $filetar = $path . "/code.tar";

  if (is_dir($path)) {

    function recurseRmdir($dir) {
      $files = array_diff(scandir($dir), array('.', '..'));
      foreach ($files as $file) {
        (is_dir("$dir/$file")) ? recurseRmdir("$dir/$file") : unlink("$dir/$file");
      }
      return rmdir($dir);
    }

    recurseRmdir($path);
    mkdir($path);
  }

  $configurationApi = configurationApi();

  $storeCorrectArray = [];
  foreach ($configurationApi as $value) {
    if ($value['id'] == $var) {
      $storeCorrectArray = $value;

      function wget($address, $filename) {
        file_put_contents($filename, file_get_contents($address));
      }

      wget($value['url'] . "/code.tar.gz", $filegz);
      break;
    }
  }
  $p = new PharData($filegz);
  $p->decompress();
  $phar = new PharData($filetar);
  $phar->extractTo($path);

  chmod($path, 0777);
  chmod($filegz, 0777);
  chmod($filetar, 0777);

  $myfiles = array_diff(scandir($path . "/" . $storeCorrectArray['path'] . "/code"), array('.', '..'));
  $createConfigObject = json_decode($storeCorrectArray['configuration']);
  $open = $path . "/" . $storeCorrectArray['path'] . "code/" . $createConfigObject->scss->scss_default;

  return file_get_contents($open);
}

$body = file_get_contents('php://input');
if ($body !== '') {
  $bodyArray = json_decode(html_entity_decode($body), true);
  if (json_last_error() !== 0) {
    echo "";
    error_log('This is not Json');
  }

  try {
    if ($bodyArray['data'] == 'service_collection') {
      $bodyResult = configurationApi();
    }

    if ($bodyArray['data'] == 'editor') {
      $bodyResult = configurationApi('editor');
    }

    if (isset($bodyArray['code'])) {
      $bodyResult = codeApi($bodyArray['code']);
    }

    echo json_encode($bodyResult);
    error_log("\n" . $header . "\n" . $bodyResult . "\n");
  } catch (\Exception $e) {
    echo "";
    error_log('api: Unable to compile content: ' . $e);
  }
} 