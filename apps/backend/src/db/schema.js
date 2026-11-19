import { defineRelations } from 'drizzle-orm';
import { boolean, datetime, int, mysqlTable, varchar, json, float, blob } from 'drizzle-orm/mysql-core';
import { integer } from 'drizzle-orm/pg-core/index';

/* --------------------------------------------------------------------------------------- */
// User
/* --------------------------------------------------------------------------------------- */

export const users = mysqlTable("users", {
    id: int().primaryKey().autoincrement(),
    name: varchar({length: 255}).notNull(),
    email: varchar({length: 255}).notNull().unique(),
    phone: varchar({length: 255}),
    age: int().notNull(),
    gender: varchar({length: 6, enum: ["m", "male", "f", "female"]}).notNull(),
    password: varchar({length: 255}).notNull(),
    address: varchar({length: 255}),
    active: boolean().notNull(),
    create_datetime: datetime(),
    update_datetime: datetime()
});

export const developers = mysqlTable("developers", {
    id: int().primaryKey().autoincrement(),
    userId: integer("user_id")
});

export const uploads = mysqlTable("uploads", {
    id: int().primaryKey().autoincrement(),
    developerId: integer("developer_id")
});

/* --------------------------------------------------------------------------------------- */
// Game
/* --------------------------------------------------------------------------------------- */

export const games = mysqlTable("games", {
    id: int().primaryKey().autoincrement(),
    name: varchar({length: 255}).notNull(),
    active: boolean().notNull(),
    create_datetime: datetime(),
    update_datetime: datetime()
});

export const assets = mysqlTable("assets", {
    int: int().primaryKey().autoincrement(),
    gameId: int("game_id")
});

export const releases = mysqlTable("releases", {
    id: int().primaryKey().autoincrement(),
    name: varchar({length: 50}),
    description: varchar({length: 500}),
    version: float(),
    gameId: int("game_id")
});

export const data = mysqlTable("data", {
    id: int().primaryKey().autoincrement(),
    url: varchar({length: 1000}),
    file: blob(),
    releaseId: int("release_id")
});

export const categories = mysqlTable("categories", {
    id: int().primaryKey().autoincrement(),
    name: varchar({length: 50}),
    gameId: int("game_id")
});

export const sources = mysqlTable("sources", {
    id: int().primaryKey().autoincrement()
});

export const platforms = mysqlTable("platforms", {
    id: int().primaryKey().autoincrement(),
    name: varchar({length: 50}),
    releaseId: int("release_id")
});

/* --------------------------------------------------------------------------------------- */
// Relations
/* --------------------------------------------------------------------------------------- */

export const game_and_assets = defineRelations({games, assets}, (relation) => ({
    games: {
        assets: relation.many.assets()
    },
    assets: {
        game: relation.one.games({
            from: relation.assets.gameId,
            to: relation.games.id
        })
    }
}));

export const release_and_data = defineRelations({releases, data}, (relation) => ({
    releases: {
        data: relation.many.data()
    },
    data: {
        release: relation.one.releases({
            from: relation.data.releaseId,
            to: relation.releases.id
        })
    }
}));

export const release_and_platforms = defineRelations({releases, platforms}, (relation) => ({
    releases: {
        platforms: relation.many.platforms()
    },
    platforms: {
        release: relation.one.releases({
            from: relation.platforms.releaseId,
            to: relation.releases.id
        })
    }
}));