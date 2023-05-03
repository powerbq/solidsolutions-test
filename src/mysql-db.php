<?php

/**
 * Class MysqlDb
 */
class MysqlDb extends AbstractDb
{
    /**
     *
     * MysqlDb constructor.
     *
     * @param string $dbname
     * @param string $host
     * @param string $user
     * @param string $pass
     */
    public function __construct(string $dbname, string $host, string $user, string $pass)
    {
        $dsn = "mysql:dbname=$dbname;host=$host";

        $this->db = new PDO($dsn, $user, $pass, $this->getOptions());

        /**
         * setting charset
         */
        $this->db->query('SET NAMES utf8');
    }

}
