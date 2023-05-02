<?php

class DB
{
    private PDO $db;

    // public function __construct(string $dbname, string $host, string $user, string $pass)
    public function __construct(string $filename)
    {
        // $dsn = 'mysql:dbname=$dbname;host=$host';
        $dsn = 'sqlite:' . $filename;

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        ];

        // $this->db = new PDO($dsn, $user, $pass, $options);
        $this->db = new PDO($dsn, options: $options);
        $this->db->query('PRAGMA foreign_keys = ON');
    }

    public function execute(string $sql, array $params = [])
    {
        $result = $this->db->prepare($sql);

        $result->execute($params);

        return $result;
    }
}
