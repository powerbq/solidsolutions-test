<?php

/**
 *
 * controller for get root
 * takes no params
 * returns json with nested structure
 *
 */

require_once __dir__ . '/../app.php';

$nodes = $db->execute('SELECT id, name, parent_id, expanded FROM nodes');

$map = [];

$prevNode = null;
$currentParent = null;
$result = null;

while ($node = $nodes->fetch()) {
    if (!empty($prevNode)) {
        if ($prevNode->parent_id !== $node->parent_id) {
            $currentParent = $map[$node->parent_id];
        }
    }

    $map[$node->id] = (object)[
        'id' => $node->id,
        'name' => $node->name,
        'expanded' => (bool)$node->expanded,
        'children' => [],
    ];

    if (!empty($currentParent)) {
        $currentParent->children[] = $map[$node->id];
    } else {
        $result = $currentParent = $map[$node->id];
    }

    $prevNode = $node;
}

header('Content-Type: application/json; charset=utf-8');

echo json_encode($result);
