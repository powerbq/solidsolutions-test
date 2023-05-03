<?php

/**
 * Class SqliteDb
 */
class SqliteDb extends AbstractDb
{
    /**
     *
     * SqliteDb constructor.
     *
     * @param string $filename
     */
    public function __construct(string $filename)
    {
        $dsn = "sqlite:$filename";

        $this->db = new PDO($dsn, options: $this->getOptions());

        /**
         * enabling foreign keys
         */
        $this->db->query('PRAGMA foreign_keys = ON');
    }

}
