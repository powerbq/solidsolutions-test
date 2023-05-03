<?php

abstract class AbstractDb
{
    protected PDO $db;

    protected function getOptions(): array
    {
        return [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        ];
    }

    public function execute(string $sql, array $params = []): bool|PDOStatement
    {
        $result = $this->db->prepare($sql);

        $result->execute($params);

        return $result;
    }
}
