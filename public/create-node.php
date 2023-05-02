<?php

require_once __dir__ . '/../app.php';

$id = $_REQUEST['id'] ?? null;
$name = $_REQUEST['name'] ?? null;
if (empty($name)) {
    http_response_code(400);

    die('Bad request');
}

$stmt = $db->execute('INSERT INTO nodes (name, parent_id) VALUES (?, ?)', [$name, $id]);
