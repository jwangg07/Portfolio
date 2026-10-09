# Jerry Wang Portfolio

Next.js App Router portfolio styled with Tailwind CSS.

## Project structure

```text
public/                         Static files, including the favicon
src/
  app/                          Next.js routes, root layout, and global Tailwind entry
  components/shared/            Reusable shared UI primitives
  features/portfolio/
    components/                  Portfolio page composition
    data/                        Project content
    types.ts                     Portfolio types
```

## Development

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form and leaderboard setup

1. Create a Supabase project and run [the SQL migration](supabase/migrations/20261008000000_portfolio.sql) in its SQL Editor. It creates the score table and an atomic rolling one-hour contact limit. Emails are used as unique score identifiers but are never returned in the public leaderboard.
2. Fill in the local `.env` using `.env.example`:
   - `SUPABASE_URL`: the Supabase Project URL.
   - `SUPABASE_SECRET_KEY`: a server-side `sb_secret_...` key from Project Settings → API Keys. Keep it private; do not use a publishable key.
   - `RESEND_API_KEY`: your Resend API key.
   - `RESEND_FROM_EMAIL`: a sender address on a domain verified in Resend, for example `Portfolio <hello@yourdomain.com>`.
   - `CONTACT_TO_EMAIL`: the inbox that receives contact messages.
3. Set the same five environment variables in your deployment host and redeploy. `.env` is gitignored.

Contact messages are limited to three submissions per rolling hour per IP. The limit uses the proxy IP header; configure a trusted reverse proxy if self-hosting. Old rate-limit rows can be cleared periodically with the optional statement at the end of the migration. Scores are submitted only when a player opts in with a name and email after game over. The database keeps the highest score for each normalized email. The game runs in the browser, so scores are not cheat-proof.

## Production

Project screenshots are precompressed WebP files with content hashes in their URLs.
They are cached in the browser for one year and do not use Vercel Image Optimization.
To replace a screenshot, update its original PNG in `assets/projects/` and run
`npm run images:optimize`. Commit the generated images and `src/content/project-images.ts`
together. New image contents produce a new URL, so visitors receive the updated image.

The public leaderboard is cached for five minutes in browser memory and session storage.
Reloading the same tab within that time reuses the result without an API request.
Submitting a score clears the cache and fetches the latest leaderboard immediately.
Other players' scores may take up to five minutes to appear on a subsequent page load.

```sh
npm run build
npm run start
```
