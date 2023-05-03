<?php

class MysqlDb extends AbstractDb
{
    public function __construct(string $dbname, string $host, string $user, string $pass)
    {
        $dsn = "mysql:dbname=$dbname;host=$host";

        $this->db = new PDO($dsn, $user, $pass, $this->getOptions());

        $this->db->query('SET NAMES utf8');
    }

}
