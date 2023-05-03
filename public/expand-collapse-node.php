<?php

/**
 *
 * controller for switch expanded/collapsed node's state
 * accepts id param
 *
 * returns 200 if ok
 *
 */

require_once __dir__ . '/../app.php';

$id = $_REQUEST['id'] ?? null;
if (empty($id)) {
    http_response_code(400);

    die('Bad request');
}

$stmt = $db->execute('UPDATE nodes SET expanded = NOT expanded WHERE id=?', [$id]);
if ($stmt->rowCount() === 0) {
    http_response_code(404);

    die('Not found');
}
