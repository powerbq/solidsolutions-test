<?php

class SqliteDb extends AbstractDb
{
    public function __construct(string $filename)
    {
        $dsn = "sqlite:$filename";

        $this->db = new PDO($dsn, options: $this->getOptions());

        $this->db->query('PRAGMA foreign_keys = ON');
    }

}
