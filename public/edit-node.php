<?php

/**
 *
 * controller for change node's name
 * accepts id and name params
 *
 * returns 200 if ok
 *
 */

require_once __dir__ . '/../app.php';

$id = $_REQUEST['id'] ?? null;
$name = $_REQUEST['name'] ?? null;
if (empty($name)) {
    http_response_code(400);

    die('Bad request');
}

$stmt = $db->execute('UPDATE nodes SET name = ? WHERE id = ?', [$name, $id]);
if ($stmt->rowCount() === 0) {
    http_response_code(404);

    die('Not found');
}
