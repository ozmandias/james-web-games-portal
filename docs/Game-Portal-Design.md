Web Game Portal – Design Plan
(Architecture agreed) (MVP scope)
1. Project overview
Goal: Build a web game portal inspired by Newgrounds, where users can discover, play, and download games.

Main capabilities:
- Browse and search games.
- Play browser-based games.
- Download native games.
- Discover games from external providers.
- Allow creators to submit games.
- Administer and review all game submissions.
2. Technology stack
Component	Technology
Frontend	Next.js + TypeScript
Backend	Node.js + Express + TypeScript
Database	MySQL 8
ORM	Prisma
Validation	Zod
API documentation	OpenAPI 3.1
Authentication	Secure session cookies
File storage	S3-compatible object storage
CDN	Static asset and game delivery
Architecture	Modular monolith
Repository	Monorepo with pnpm


3. Project structure
game-portal/
│
├── apps/
│   ├── web/                 # Next.js
│   ├── api/                 # Express
│   └── worker/              # Optional background jobs
│
├── packages/
│   └── contracts/           # Shared API contracts
│
├── database/
│   └── migrations/
│
├── docs/
│   └── architecture/
│
├── .gitignore
├── .env.example
├── package.json
└── pnpm-workspace.yaml

4. User roles
Role	Permissions
Visitor	Browse, play, download
Creator	Manage profile and submit games
Admin	Review, manage, publish games
Super Admin	Full administration and user management


Important: Creator submissions always require admin approval.
5. Core features
A. Public game portal
- Homepage with featured and newest games.
- Game catalogue.
- Search, filtering, sorting.
- Game details and screenshots.
- Play and download functionality.
- Developer profiles.
B. Game delivery
- HTML5 games.
- Unity WebGL games.
- Approved external embeds.
- External game links.
- Native game downloads (Windows, macOS, Linux, Android, iOS).
C. Creator system
- Creator registration.
- Developer profile.
- Game metadata submission.
- Submission status tracking.
- Admin review and feedback.
D. Admin dashboard
- Game management.
- ZIP archive uploads.
- Release and distribution management.
- Creator submission review.
- External game imports.
- User and category management.
- Audit logs.
6. Database design
Main tables
Table	Purpose
users	User accounts and roles
user_sessions	Authentication sessions
developer_profiles	Creator information
games	Central game catalogue
game_releases	Game versions
game_distributions	Play/download delivery methods
distribution_files	Stored game files
game_assets	Screenshots, thumbnails, artwork
categories	Game categories
game_categories	Game-category relationships
tags	Search tags
game_tags	Game-tag relationships
providers	External game providers
game_sources	Original game sources and permissions
submissions	Creator submissions
import_jobs	External game imports
play_events	Game play tracking
download_events	Download tracking
audit_logs	Administrative activity


Important relationships
users
  ├── developer_profiles
  ├── submissions
  └── user_sessions

games
  ├── game_releases
  │     └── game_distributions
  │            └── distribution_files
  ├── game_assets
  ├── game_categories
  ├── game_tags
  └── game_sources

providers
  └── game_sources

7. Game distribution architecture
Distribution	Delivery method
HTML5	Browser-based game player
Unity WebGL	Browser-based Unity player
Embed	Approved iframe integration
External link	Redirect to original provider
Native download	Secure download URL


File handling rules:
- Admins upload production ZIP archives.
- Original ZIP archives remain private.
- Browser builds are extracted and delivered from an isolated game origin.
- Native packages remain private and use short-lived signed download URLs.
- Validate ZIP archives against path traversal and ZIP bomb risks.
8. Game publishing workflow
Admin-created games
1. Admin creates game metadata.
2. Admin uploads ZIP archive.
3. System validates and processes files.
4. Admin configures release and distribution.
5. Admin publishes game.
Creator submissions
1. Creator submits game information.
2. Admin reviews submission.
3. Admin approves or requests changes.
4. Admin creates and configures production release.
5. Admin publishes game.
External imports
1. System retrieves external metadata.
2. Normalize and detect duplicates.
3. Admin manually reviews imported game.
4. Verify distribution permissions.
5. Admin approves and publishes where permitted.
9. Backend modules
Keep everything inside one Express application, separated into modules.
apps/api/src/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── games/
│   ├── releases/
│   ├── distributions/
│   ├── categories/
│   ├── developers/
│   ├── submissions/
│   ├── imports/
│   ├── providers/
│   └── admin/
│
├── infrastructure/
├── middleware/
├── config/
└── app.ts

10. API endpoint overview
Method	Endpoint	Purpose
GET	/games	Browse games
GET	/games/featured	Featured games
GET	/games/newest	Newest games
GET	/games/:slug	Game details
GET	/categories	Categories
GET	/developers/:slug	Developer profile
POST	/auth/register	Register
POST	/auth/login	Login
POST	/auth/logout	Logout
POST	/creator/submissions	Submit game
GET	/creator/submissions	View submissions
GET	/admin/submissions	Review submissions
POST	/admin/games	Create game
POST	/admin/games/:id/releases	Create release
POST	/admin/games/:id/publish	Publish game


11. Deployment architecture
www.example.com

Next.js frontend

api.example.com

Express backend

MySQL 8

Application database
games.example.com

Isolated browser game delivery

cdn.example.com

Images and static assets
12. Development phases
Phase	Deliverables
1. Foundation	Monorepo, Next.js, Express, MySQL, Prisma
2. Catalogue	Game CRUD, categories, search, game details
3. Distribution	Storage, ZIP processing, browser games, downloads
4. Authentication	Sessions, roles, admin dashboard
5. Creator system	Profiles, submissions, review workflow
6. External imports	Provider adapters, metadata imports, manual review
7. Production	Security testing, performance, deployment


13. MVP priorities
(Build first)
1. Public game catalogue.
2. Game details and categories.
3. Admin game management.
4. HTML5 and Unity WebGL delivery.
5. Native game downloads.
6. User authentication and admin roles.
7. Creator submissions.
8. External game imports.
Architecture principle: Start with a modular monolith. Keep the backend simple, maintain clear module boundaries, and extract background workers or other services only when actual requirements justify it.