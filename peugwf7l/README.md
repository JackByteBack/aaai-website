# Prismic + Next.js Instant Start

Want to quickly get started building your own project with [Prismic](https://prismic.io) and [Next.js](https://nextjs.org)? This project includes a homepage, a set of [slices](https://prismic.io/docs/slices), and basic configuration.

- **Demo (coming soon)**: <https://next-instant-start.vercel.app>
- **Learn more about Prismic and Next.js**: [Prismic Next.js Documentation](https://prismic.io/docs/nextjs)

<!-- Add the GitHub-hosted website screenshot here. -->

## 🚀 Quick start

To start a new project using this starter:

1. Visit <https://prismic.io/dashboard>.
2. Create a new Prismic repository by selecting **Next.js**.
3. Select the **Instant Start** starter.
4. Fill out your repository details and continue with the steps given in Prismic.

After Instant Start finishes creating your repository, Page Builder provides
commands containing the repository name and pinned starter revision:

```sh
npx degit prismicio/next-instant-start#<revision> <repository-name>
cd <repository-name>
npx prismic@latest init --repo <repository-name>
```

The init command connects the project, installs dependencies, synchronizes
compatible models, and configures local previews. Then start the development
server:

```sh
npm run dev
```

Open <http://localhost:3000>.

### Quick start with Vercel

You can also create a new project on [Vercel](https://vercel.com) by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fprismicio%2Fnext-instant-start&project-name=next-instant-start)

To work on the deployed project locally, clone the GitHub repository created by
Vercel and install its dependencies:

```sh
npm install
```

When you're ready to start your project locally, run the following command:

```sh
npm run dev
```

## How to use your project

To edit the content of this project, go to [prismic.io/dashboard](https://prismic.io/dashboard), click on the repository for this website, and start editing.

### Edit the homepage

Open the **Homepage** document to edit and rearrange its slices. Use the
**Hero** slice to update the logo and introductory content, the **Card Grid**
slice to update its cards, and the **Resource Links** slice to update its links.
Use the Homepage's static fields to update metadata, copyright, cookie, and
social links.

### Preview documents

Instant Start initially configures previews using the hosted demo. Add preview
URLs for your production and staging deployments by following [Preview draft content](https://prismic.io/docs/nextjs#preview-draft-content).

### Customize this website

This website is preconfigured with Prismic. It has three Prismic packages installed:

- `@prismicio/client` provides helpers for fetching content from Prismic
- `@prismicio/react` provides React components for rendering content from Prismic
- `@prismicio/next` provides Next.js-specific components to configure Prismic previews, display links, and display images

These packages are already integrated in this app. Take a look at the code to see how they're used.

### Edit the code

There are two steps to rendering content from Prismic in your Next.js project:

1. Fetch content from the Prismic API using `@prismicio/client`.
2. Template the content using components from `@prismicio/react` and `@prismicio/next`.

Here are some of the files in your project that you can edit:

- `src/prismicio.ts` - This file configures `@prismicio/client` and exports useful API helpers.
- `src/app/layout.tsx` - This is your layout component, which includes content preview configuration.
- `src/app/page.tsx` - This is the app homepage. It queries and renders the Homepage document and footer fields from the Prismic API.
- `src/components/Footer.tsx` - This component renders the Homepage document's footer fields.
- `src/slices/*/index.tsx` - Each slice has a component that you can customize.

These are important files that you should leave as-is:

- `src/app/api/exit-preview/route.ts` - Closes a Prismic preview session.
- `src/app/api/preview/route.ts` - Launches a Prismic preview session.
- `src/app/api/revalidate/route.ts` - Revalidates content when Prismic sends a webhook.
- `src/app/slice-simulator/page.tsx` - Renders slices in the local Slice Simulator.
- `src/slices/` - Contains the slice components and models. Use the Type Builder to add, remove, or edit slice models.

Learn more about [fetching content](https://prismic.io/docs/nextjs#fetch-content) and [displaying content](https://prismic.io/docs/nextjs#display-content) in the Prismic documentation.

### Deploy to the web

Learn how to [deploy your website](https://prismic.io/docs/nextjs#deploy) in the Prismic documentation.

### Edit content models with the Type Builder

This project uses the [Type Builder](https://prismic.io/docs/type-builder), Prismic's cloud-based interface for modeling your page types and slices. Model your content in the Type Builder, then use the [Prismic CLI](https://prismic.io/docs/cli) to sync your models into your codebase, where you can save and version them:

```sh
npx prismic@latest pull
```

If you change or add to your page types, you'll need to update your route handling to match. Routes are configured in the `routes` array in `prismic.config.json`.

## Documentation

For the official Prismic documentation, see [Prismic's guide for Next.js](https://prismic.io/docs/nextjs) or the [technical references for the installed Prismic packages](https://prismic.io/docs/apis).

## License

```
Copyright 2013-2025 Prismic <contact@prismic.io> (https://prismic.io)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
