<?php

/**
 * configuring php
 */
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __dir__ . '/php.log');

/**
 * configuring autoloader rules
 */
spl_autoload_register(function ($class_name) {
    require_once __dir__ . '/src/' . strtolower(preg_replace('/(?<!^)[A-Z]/', '-$0', $class_name)) . '.php';
});

/**
 * loading mysql credentials and connecting to mysql (if available)
 * using sqlite in other case
 */
if (file_exists(__dir__ . '/config.php')) {
    require_once __dir__ . '/config.php';

    $db = new MysqlDb($mysqlDatabase, $mysqlHost, $mysqlUser, $mysqlPassword);
} else {
    $db = new SqliteDb(__dir__ . '/app.db');
}
