import { defineRelations } from 'drizzle-orm';
import { boolean, datetime, int, mysqlTable, varchar, json, float, blob, mysqlEnum } from 'drizzle-orm/mysql-core';
import { integer } from 'drizzle-orm/pg-core/index';

// Default to creating new tables rather than using enums.

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

export const admins = mysqlTable("admins", {
    id: int().primaryKey().autoincrement(),
    userId: integer("user_id")
})

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
    description: varchar({length: 500}),
    active: boolean().notNull(),
    create_datetime: datetime(),
    update_datetime: datetime()
});

export const assets = mysqlTable("assets", {
    int: int().primaryKey().autoincrement(),
    images: json("images"),
    videos: json("videos"),
    profile_image: varchar({length: 500}),
    background_image: varchar({length: 500}),
    gameId: int("game_id")
});

export const categories = mysqlTable("categories", {
    id: int().primaryKey().autoincrement(),
    name: varchar({length: 50}),
    gameId: int("game_id")
});

export const tags = mysqlTable("tags", {
    id: int().primaryKey().autoincrement(),
    name: varchar({length: 100}),
    gameId: int("game_id")
});

// game versions
export const releases = mysqlTable("releases", {
    id: int().primaryKey().autoincrement(),
    version: float(),
    name: varchar({length: 50}),
    gameId: int("game_id")
});

// content belonging to game versions
export const distributions = mysqlTable("distributions", {
    id: int().primaryKey().autoincrement(),
    platform: mysqlEnum(["pc, console, web, mobile, java"]),
    type: mysqlEnum(["play", "download"]),
    releaseId: int("release_id"),
    sourceId: int("source_id"),
});

// data of content
export const data = mysqlTable("data", {
    id: int().primaryKey().autoincrement(),
    url: varchar({length: 500}),
    file: blob(),
    distributionId: int("distribution_id")
});

// flash, webgl, html5 for web games from providers
export const sources = mysqlTable("sources", {
    id: int().primaryKey().autoincrement(),
    developer: varchar({length: 255}),
    runtime: mysqlEnum(["directx", "opengl", "flash", "webgl", "html5", "unity", "java"]),
    type: mysqlEnum(["url", "file"]),
    gameId: int("game_id"),
    providerId: int("provider_id")
});

// game providers
export const providers = mysqlTable("providers", {
    id: int().primaryKey().autoincrement(),
    name: varchar({length: 255}).notNull(),
    home_page: varchar({length: 500}),
    logo: varchar({length: 500}),
    approval_status: mysqlEnum(["approved", "pending", "denied"])
});

// Not used yet // pc, console, web - mostly web
export const platforms = mysqlTable("platforms", {
    id: int().primaryKey().autoincrement(),
    name: varchar({length: 50}),
    description: varchar({length: 500})
});

// Not used yet // directx, opengl, flash, webgl, html5, unity, java
export const runtimes = mysqlTable("runtimes", {
    id: int().primaryKey().autoincrement(),
    name: varchar({length: 50}),
    description: varchar({length: 500})
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

export const game_and_categories = defineRelations({games, categories}, (relation) => ({
    games: {
        categories: relation.many.categories()
    },
    categories: {
        game: relation.one.games({
            from: relation.categories.gameId,
            to: relation.games.id
        })
    }
}));

export const game_and_tags = defineRelations({games, tags}, (relation) => ({
    games: {
        tags: relation.many.tags()
    },
    tags: {
        game: relation.one.games({
            from: relation.tags.gameId,
            to: relation.games.id
        })
    }
}));

export const game_and_releases = defineRelations(({games, releases}, (relation) => ({
    games: {
        releases: relation.many.releases()
    },
    releases: {
        game: relation.one.games({
            from: relation.releases.gameId,
            to: relation.games.id
        })
    }
})));

export const release_and_distributions = defineRelations({releases, distributions}, (relation) => ({
    releases: {
        distributions: relation.many.distributions()
    },
    distributions: {
        release: relation.one.releases({
            from: relation.distributions.releaseId,
            to: relation.releases.id
        })
    }
}));

export const distribution_and_data = defineRelations({distributions, data}, (relation) => ({
    distributions: {
        data: relation.many.data()
    },
    data: {
        distribution: relation.one.distributions({
            from: relation.data.distributionId,
            to: relation.distributions.id
        })
    }
}));

export const game_and_sources = defineRelations({games, sources}, (relation) => ({
    games: {
        sources: relation.many.sources()
    },
    sources: {
        game: relation.one.games({
            from: relation.sources.gameId,
            to: relation.games.id
        })
    }
}));

export const source_and_distributions = defineRelations({sources, distributions}, (relation) => ({
    sources: {
        distributions: relation.many.distributions()
    },
    distributions: {
        source: relation.one.sources({
            from: relation.distributions.sourceId,
            to: relation.sources.id
        })
    }
}));

export const provider_and_sources = defineRelations({providers, sources}, (relation) => ({
    providers: {
        providers: relation.many.sources()
    },
    sources: {
        release: relation.one.providers({
            from: relation.sources.providerId,
            to: relation.providers.id
        })
    }
}));