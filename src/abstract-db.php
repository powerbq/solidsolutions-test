<?php

/**
 * Class AbstractDb
 */
abstract class AbstractDb
{
    /**
     * @var PDO
     */
    protected PDO $db;

    /**
     *
     * default options for pdo
     *
     * @return array
     */
    protected function getOptions(): array
    {
        return [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        ];
    }

    /**
     *
     * wrapper for queries
     *
     * @param string $sql
     * @param array $params
     * @return false|PDOStatement
     */
    public function execute(string $sql, array $params = []): bool|PDOStatement
    {
        $result = $this->db->prepare($sql);

        $result->execute($params);

        return $result;
    }
}