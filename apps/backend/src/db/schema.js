import { boolean, date, datetime, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable("users", {
    id: int().primaryKey().autoincrement(),
    name: varchar({length: 255}).notNull(),
    email: varchar({length: 255}).notNull().unique(),
    phone: varchar({length: 255}),
    age: int().notNull(),
    gender: varchar({length: 1}).notNull(),
    password: varchar({length: 255}).notNull(),
    address: varchar({length: 255}),
    active: boolean().notNull(),
    create_datetime: datetime(),
    update_datetime: datetime()
});