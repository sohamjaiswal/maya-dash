# Details

Date : 2023-11-12 08:58:59

Directory /Users/toomuchham/persProjs/maya-dash

Total : 68 files,  3202 codes, 65 comments, 259 blanks, all 3526 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.eslintrc.cjs](/.eslintrc.cjs) | JavaScript | 30 | 0 | 1 | 31 |
| [.prettierignore](/.prettierignore) | Ignore | 11 | 1 | 2 | 14 |
| [.prettierrc](/.prettierrc) | JSON | 9 | 0 | 1 | 10 |
| [README.md](/README.md) | Markdown | 24 | 0 | 15 | 39 |
| [package.json](/package.json) | JSON | 58 | 0 | 1 | 59 |
| [playwright.config.ts](/playwright.config.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [postcss.config.cjs](/postcss.config.cjs) | JavaScript | 6 | 0 | 0 | 6 |
| [src/app.d.ts](/src/app.d.ts) | TypeScript | 14 | 6 | 2 | 22 |
| [src/app.html](/src/app.html) | HTML | 12 | 0 | 1 | 13 |
| [src/app.postcss](/src/app.postcss) | PostCSS | 33 | 5 | 2 | 40 |
| [src/hooks.server.ts](/src/hooks.server.ts) | TypeScript | 38 | 0 | 5 | 43 |
| [src/index.test.ts](/src/index.test.ts) | TypeScript | 6 | 0 | 2 | 8 |
| [src/lib/components/GlobalBar/GlobalBar.svelte](/src/lib/components/GlobalBar/GlobalBar.svelte) | Svelte | 61 | 0 | 1 | 62 |
| [src/lib/components/LoginWithMaya/LoginWithMaya.svelte](/src/lib/components/LoginWithMaya/LoginWithMaya.svelte) | Svelte | 4 | 0 | 0 | 4 |
| [src/lib/components/MagicalText/MagicalText.svelte](/src/lib/components/MagicalText/MagicalText.svelte) | Svelte | 118 | 0 | 23 | 141 |
| [src/lib/components/OwnerButton/OwnerButton.svelte](/src/lib/components/OwnerButton/OwnerButton.svelte) | Svelte | 15 | 0 | 2 | 17 |
| [src/lib/components/YeeYeeAssHaircut/YeeYeeAssHaircut.svelte](/src/lib/components/YeeYeeAssHaircut/YeeYeeAssHaircut.svelte) | Svelte | 326 | 0 | 76 | 402 |
| [src/lib/index.ts](/src/lib/index.ts) | TypeScript | 0 | 1 | 1 | 2 |
| [src/lib/stores/stores.ts](/src/lib/stores/stores.ts) | TypeScript | 6 | 1 | 1 | 8 |
| [src/lib/types/guilded-user.ts](/src/lib/types/guilded-user.ts) | TypeScript | 73 | 0 | 11 | 84 |
| [src/lib/types/maya.ts](/src/lib/types/maya.ts) | TypeScript | 111 | 0 | 9 | 120 |
| [src/lib/utils/jwt.ts](/src/lib/utils/jwt.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [src/lib/utils/loginredirect.ts](/src/lib/utils/loginredirect.ts) | TypeScript | 7 | 0 | 2 | 9 |
| [src/lib/utils/vitals.ts](/src/lib/utils/vitals.ts) | TypeScript | 58 | 10 | 8 | 76 |
| [src/routes/(auth)/login/+page.server.ts](/src/routes/(auth)/login/+page.server.ts) | TypeScript | 24 | 2 | 8 | 34 |
| [src/routes/(auth)/login/+page.svelte](/src/routes/(auth)/login/+page.svelte) | Svelte | 82 | 1 | 11 | 94 |
| [src/routes/(auth)/login/[userId]/+error.svelte](/src/routes/(auth)/login/%5BuserId%5D/+error.svelte) | Svelte | 9 | 0 | 0 | 9 |
| [src/routes/(auth)/login/[userId]/+page.server.ts](/src/routes/(auth)/login/%5BuserId%5D/+page.server.ts) | TypeScript | 41 | 0 | 2 | 43 |
| [src/routes/(auth)/login/[userId]/+page.svelte](/src/routes/(auth)/login/%5BuserId%5D/+page.svelte) | Svelte | 76 | 0 | 7 | 83 |
| [src/routes/(auth)/logout/+error.svelte](/src/routes/(auth)/logout/+error.svelte) | Svelte | 9 | 0 | 0 | 9 |
| [src/routes/(auth)/logout/+page.server.ts](/src/routes/(auth)/logout/+page.server.ts) | TypeScript | 22 | 0 | 1 | 23 |
| [src/routes/(private)/+error.svelte](/src/routes/(private)/+error.svelte) | Svelte | 9 | 0 | 0 | 9 |
| [src/routes/(private)/+layout.server.ts](/src/routes/(private)/+layout.server.ts) | TypeScript | 25 | 0 | 1 | 26 |
| [src/routes/(private)/dashboard/+error.svelte](/src/routes/(private)/dashboard/+error.svelte) | Svelte | 9 | 0 | 0 | 9 |
| [src/routes/(private)/dashboard/+layout.svelte](/src/routes/(private)/dashboard/+layout.svelte) | Svelte | 86 | 0 | 4 | 90 |
| [src/routes/(private)/dashboard/+page.svelte](/src/routes/(private)/dashboard/+page.svelte) | Svelte | 11 | 0 | 2 | 13 |
| [src/routes/(private)/dashboard/[serverId]/+page.server.ts](/src/routes/(private)/dashboard/%5BserverId%5D/+page.server.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [src/routes/(private)/dashboard/[serverId]/advertise/+page.server.ts](/src/routes/(private)/dashboard/%5BserverId%5D/advertise/+page.server.ts) | TypeScript | 74 | 1 | 2 | 77 |
| [src/routes/(private)/dashboard/[serverId]/advertise/+page.svelte](/src/routes/(private)/dashboard/%5BserverId%5D/advertise/+page.svelte) | Svelte | 78 | 1 | 5 | 84 |
| [src/routes/(private)/dashboard/[serverId]/audit-log/+page.server.ts](/src/routes/(private)/dashboard/%5BserverId%5D/audit-log/+page.server.ts) | TypeScript | 26 | 0 | 1 | 27 |
| [src/routes/(private)/dashboard/[serverId]/audit-log/+page.svelte](/src/routes/(private)/dashboard/%5BserverId%5D/audit-log/+page.svelte) | Svelte | 124 | 0 | 2 | 126 |
| [src/routes/(private)/dashboard/[serverId]/general/+page.server.ts](/src/routes/(private)/dashboard/%5BserverId%5D/general/+page.server.ts) | TypeScript | 76 | 1 | 3 | 80 |
| [src/routes/(private)/dashboard/[serverId]/general/+page.svelte](/src/routes/(private)/dashboard/%5BserverId%5D/general/+page.svelte) | Svelte | 131 | 8 | 0 | 139 |
| [src/routes/(private)/dashboard/[serverId]/members/+page.server.ts](/src/routes/(private)/dashboard/%5BserverId%5D/members/+page.server.ts) | TypeScript | 75 | 0 | 3 | 78 |
| [src/routes/(private)/dashboard/[serverId]/members/+page.svelte](/src/routes/(private)/dashboard/%5BserverId%5D/members/+page.svelte) | Svelte | 155 | 0 | 2 | 157 |
| [src/routes/(private)/profile/+page.svelte](/src/routes/(private)/profile/+page.svelte) | Svelte | 57 | 2 | 1 | 60 |
| [src/routes/(public)/about-us/+page.server.ts](/src/routes/(public)/about-us/+page.server.ts) | TypeScript | 19 | 0 | 1 | 20 |
| [src/routes/(public)/about-us/+page.svelte](/src/routes/(public)/about-us/+page.svelte) | Svelte | 147 | 6 | 2 | 155 |
| [src/routes/(public)/servers/+page.server.ts](/src/routes/(public)/servers/+page.server.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [src/routes/(public)/servers/[serverId]/+error.svelte](/src/routes/(public)/servers/%5BserverId%5D/+error.svelte) | Svelte | 20 | 1 | 0 | 21 |
| [src/routes/(public)/servers/[serverId]/+page.server.ts](/src/routes/(public)/servers/%5BserverId%5D/+page.server.ts) | TypeScript | 70 | 0 | 2 | 72 |
| [src/routes/(public)/servers/[serverId]/+page.svelte](/src/routes/(public)/servers/%5BserverId%5D/+page.svelte) | Svelte | 116 | 0 | 0 | 116 |
| [src/routes/(public)/servers/browse/+page.server.ts](/src/routes/(public)/servers/browse/+page.server.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [src/routes/(public)/servers/browse/[pageNum]/+page.svelte](/src/routes/(public)/servers/browse/%5BpageNum%5D/+page.svelte) | Svelte | 139 | 1 | 2 | 142 |
| [src/routes/(public)/servers/browse/[pageNum]/+server.ts](/src/routes/(public)/servers/browse/%5BpageNum%5D/+server.ts) | TypeScript | 15 | 0 | 1 | 16 |
| [src/routes/+error.svelte](/src/routes/+error.svelte) | Svelte | 15 | 0 | 0 | 15 |
| [src/routes/+layout.server.ts](/src/routes/+layout.server.ts) | TypeScript | 4 | 0 | 0 | 4 |
| [src/routes/+layout.svelte](/src/routes/+layout.svelte) | Svelte | 244 | 5 | 5 | 254 |
| [src/routes/+layout.ts](/src/routes/+layout.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [src/routes/+page.server.ts](/src/routes/+page.server.ts) | TypeScript | 9 | 2 | 1 | 12 |
| [src/routes/+page.svelte](/src/routes/+page.svelte) | Svelte | 43 | 0 | 5 | 48 |
| [static/data/hero-font.json](/static/data/hero-font.json) | JSON | 1 | 0 | 0 | 1 |
| [static/site.webmanifest](/static/site.webmanifest) | JSON | 1 | 0 | 0 | 1 |
| [svelte.config.js](/svelte.config.js) | JavaScript | 13 | 6 | 3 | 22 |
| [tailwind.config.ts](/tailwind.config.ts) | TypeScript | 62 | 0 | 2 | 64 |
| [tests/test.ts](/tests/test.ts) | TypeScript | 5 | 0 | 2 | 7 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 13 | 4 | 1 | 18 |
| [vite.config.ts](/vite.config.ts) | TypeScript | 9 | 0 | 2 | 11 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)