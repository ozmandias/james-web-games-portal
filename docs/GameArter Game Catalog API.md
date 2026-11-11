# GameArter Game Catalog API (v1.3.0)

Read-only API for websites that want to publish GameArter games. You get the metadata of a game, store it in your own
database in whatever form you need (rewrite the texts, resize the images) and load the game itself in an iframe from GameArter.
Game files always stay on GameArter. No authentication, responses are JSON, CORS is open.

AI agents can use the same data through the MCP server at `https://www.gamearter.com/api/mcp/catalog` (Streamable HTTP, tools `list_games` and `get_game`).

## List games

`GET https://www.gamearter.com/api/v1/catalog/games`

| Parameter | Description |
|---|---|
| `limit` | Games per page, 1–200, default 50. |
| `offset` | Number of games to skip, default 0. Use `next_offset` from the previous response. |
| `genre` | Only games of this genre, e.g. `puzzle`. (`category` still works as an alias.) |
| `tag` | Only games with this tag, e.g. `match-3`. |
| `search` | Case-insensitive match in the game name or slug. |
| `updated_since` | Unix time in seconds. Only games changed at or after this time. |

Games are sorted from the most recently changed.

```json
{
  "total": 1833,
  "limit": 50,
  "offset": 0,
  "next_offset": 50,
  "games": [
    {
      "slug": "labubu-shooter",
      "name": "Labubu Shooter",
      "genres": ["action"],
      "tags": ["shooter", "funny"],
      "genres": ["action"],
  "tags": ["shooter", "funny"],
  "categories": ["action"],
      "thumbnail": "https://www.gamearter.com/game/labubu-shooter/thumbnails/image460x344.jpg.webp",
      "platforms": { "desktop": true, "mobile": false },
      "published_at": 1758782340,
      "updated_at": 1758782340
    }
  ]
}
```

## Get one game

`GET https://www.gamearter.com/api/v1/catalog/games/{slug}`

Returns everything about one game. `404` means the game is not available (it does not exist or was withdrawn).

```json
{
  "slug": "labubu-shooter",
  "name": "Labubu Shooter",
  "url": "https://www.gamearter.com/game/labubu-shooter/",
  "categories": ["action"],
  "platforms": { "desktop": true, "mobile": false },
  "description": "Labubu Shooter is a fast paced crossover game…",
  "controls": "*WASD* = move\n*mouse* = shoot",
  "images": {
    "thumbnail": "https://www.gamearter.com/game/labubu-shooter/thumbnails/image460x344.jpg.webp",
    "share": "https://www.gamearter.com/game/labubu-shooter/thumbnails/fbimage.jpg",
    "masters": {
      "cover_4x3": "https://www.gamearter.com/game/labubu-shooter/assets/images/cover-4x3.png",
      "wide_16x9": "https://www.gamearter.com/game/labubu-shooter/assets/images/wide-16x9.png",
      "square_1x1": null,
      "portrait_2x3": null
    }
  },
  "video": null,
  "developer": "Studio Name",
  "developer_id": 1234,
  "min_age": 7,
  "stores": null,
  "social": null,
  "published_at": 1758782340,
  "updated_at": 1758782340
}
```

| Field | Description |
|---|---|
| `slug` | Stable identifier of the game. Use it as the key in your database. |
| `url` | Address of the game. Put it in the `src` of your iframe. |
| `genres` | Genres, main genre first: the game categories used by Google Play and the App Store (`action`, `puzzle`, `racing`…). Map them to your own categories. |
| `tags` | Tags as slugs (`match-3`, `zombies`, `pixel-graphics`…), may be empty. The full list of genres and tags is in the GameArter Publishing Standard, section 3a (https://www.gamearter.com/api/publishing/standard). |
| `categories` | Same as `genres`, kept for older integrations. |
| `platforms` | Where the game runs. Do not offer a game with `mobile: false` to phone visitors. |
| `description` | Plain text in English. |
| `controls` | One control per line as `*keys* = action`, keys are wrapped in asterisks. May be null. |
| `images.thumbnail` | Cover image, 4:3. |
| `images.share` | Wide image for sharing, about 16:9. May be null. |
| `images.masters` | Full-size originals by aspect ratio. Make your own sizes from these; when a value is null, fall back to `images.thumbnail` / `images.share`. |
| `video` | Video URL (usually a YouTube embed). May be null. |
| `developer` | Developer name. It can change, do not use it as a key. May be null. |
| `developer_id` | Stable identifier of the developer. Use it as the key when you store developers. May be null. |
| `min_age` | Recommended minimum age of players as declared by the developer: 3, 7, 12, 16 or 18. May be null for older games. |
| `stores`, `social` | Links of the game as `{ "googlePlay": "https://…" }`. May be null. |
| `published_at`, `updated_at` | Unix time in seconds. |

## Embedding the game

Every game is responsive and fills the iframe, so size the iframe with your own layout:

```html
<iframe src="https://www.gamearter.com/game/labubu-shooter/" style="width:100%;height:100%;border:0" allow="fullscreen"></iframe>
```

Games show ads, so your domain needs the ads.txt records listed in the embed guide at https://www.gamearter.com/games.

## Keeping your copy up to date

Remember the time of your last sync and periodically call `GET https://www.gamearter.com/api/v1/catalog/games?updated_since={that time}`, then fetch the detail
of each returned game. If a detail returns `404`, the game was withdrawn and you should remove it. Data is cached for up to
10 minutes, so a daily sync is enough.