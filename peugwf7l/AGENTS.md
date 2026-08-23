# Agents

Prismic + Next.js App Router instant-start starter. Slice-based pages, preview routes, slice simulator. Repository already wired in `prismic.config.json`.

## Setup

When this project comes from Prismic Instant Start, use the repository name
provided by Page Builder:

```sh
npx prismic@latest init --repo <repository-name>
```

This connects the project, installs dependencies, syncs compatible models, and
sets up local previews. Do not edit `prismic.config.json` manually.

## Prismic work

If not already installed, install Prismic skills once:

```sh
npx skills add --global prismicio/skills
```

Use that skill for all Prismic ops: push/pull types and slices, repo settings, previews, tokens, webhooks, docs. Do not guess CLI syntax or edit model JSON by hand.
