---
id: postgres
title: Postgres
sidebar_label: Postgres
---

## Snippets

Commands

```shell
# List all tablespaces
\db
# List all dbs
\l
# Connect to a db
\c <db_name>
# List all schemas
\dn
# List all relations inside that schema.
\dt *.*
\dt <schema_name>.*
# Column representation of the data types and indexes of a database
\d+ <schema_name>.<table_name>
```

SQL

```sql
/* Simple SELECT */
SELECT * from <schema_name>.<table_name>;

```

## Relevant Notes

- **Initializing a postgres directory:** After logging into the `postgres` user, you can create a directory with necessary postgres files with the `initdb` command. It creates a directory in the file system and then you can start a postgres server directing it to that directory.
- **Tablespaces:** All tables are by default created in `pg_default` tablespace, creating in a tablespace does not affect the logical SQL schema.
- **public schema:** All databases will have a public schema created by the `postgres` user. By default `\d` will be showing relations from the public schema.
