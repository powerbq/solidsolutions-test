<?php

ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __dir__ . '/php.log');

if (file_exists(__dir__ . '/config.php')) {
    require_once __dir__ . '/config.php';
}

spl_autoload_register(function ($class_name) {
    require_once __dir__ . '/src/' . strtolower($class_name) . '.php';
});

// $db = new DB($mysqlDatabase, $mysqlHost, $mysqlUser, $mysqlPassword);
$db = new DB(__dir__ . '/app.db');
