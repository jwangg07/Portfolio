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

## Production

```sh
npm run build
npm run start
```
