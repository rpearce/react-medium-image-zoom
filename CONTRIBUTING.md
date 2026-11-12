# Contributing

1. Check out the [issues](https://github.com/rpearce/react-medium-image-zoom/issues)
1. [Fork](https://guides.github.com/activities/forking/) this repository
1. [Clone](https://help.github.com/articles/cloning-a-repository/) your fork
1. Add the upstream project (this one) as a git remote:
   ```text
   $ git remote add upstream git@github.com:rpearce/react-medium-image-zoom.git
   $ git fetch upstream
   $ git rebase upstream/main
   ```
1. Check out a feature branch
   ```text
   $ git switch -C my-feature
   ```
1. Make your changes
1. Push your branch to your GitHub repo
   ```
   $ git push origin my-feature
   ```
1. Create a [pull request](https://help.github.com/articles/about-pull-requests/)
   from your branch to this repo's `main` branch
1. When all is merged, pull down the upstream changes to your `main`
   ```
   $ git checkout main
   $ git fetch upstream
   $ git rebase upstream/main
   ```
1. Delete your feature branch (locally and then on GitHub)
   ```
   $ git branch -D my-feature
   $ git push origin :my-feature
   ```

## Workspace

This repository is a pnpm workspace. Use the pnpm version that the root
`package.json` pins in `packageManager`, through corepack.

```text
packages/
  image-zoom/                @rpearce/image-zoom: the <image-zoom> element
    src/                     source, tests, and styles.css (both packages ship it)
    demo/                    plain HTML demo pages
  react-medium-image-zoom/   react-medium-image-zoom: the <Zoom> component
    src/                     source and tests
stories/                     Storybook stories (React), built into docs/
scripts/                     the bundle-size check
test/                        setup shared by every test project
```

Tests, type checking and Storybook resolve `@rpearce/image-zoom` to
`packages/image-zoom/src/index.ts`, so nothing has to be built first.

## Setup

```text
$ pnpm install
$ pnpm exec playwright install --with-deps chromium
```

The second command downloads the Chromium build that the browser tests run in,
as CI does. Run it once, and again after Playwright is upgraded.

## Commands

- `pnpm -r build` (or `pnpm run build`) builds both packages, in dependency
  order: `@rpearce/image-zoom` first, then `react-medium-image-zoom`, which
  copies its `styles.css` from the first.
- `pnpm test` runs every test project once. `pnpm test --project browser` runs
  one of them.
- `pnpm run check:all` runs the linter (oxlint), the type checker and the
  format check (oxfmt). `pnpm run check:fmt:fix` formats.
- `pnpm run check:size` checks the bundle size of a `<Zoom>` consumer. Build
  first.
- `pnpm run ci` runs everything CI runs.
- `pnpm start` starts Storybook on port 6006.
- `pnpm --filter @rpearce/image-zoom run demo` serves the plain HTML demo.

## Testing

Ensure sure your changes are adequately tested via the Storybook `stories/`, and
if automated testing is possible, feel free to add test coverage.

Vitest runs three projects, defined in `vitest.config.ts`. A test file's name
decides which one runs it:

| Project     | Runs in                         | Files                                                                                 |
| ----------- | ------------------------------- | ------------------------------------------------------------------------------------- |
| `browser`   | Chromium (Playwright), headless | `packages/*/src/**/*.test.{ts,tsx}`, except the files below                           |
| `happy-dom` | happy-dom                       | `packages/*/src/utils/**/*.test.ts` and `packages/*/src/**/*.happy-dom.test.{ts,tsx}` |
| `jsdom`     | jsdom                           | `packages/*/src/**/*.jsdom.test.tsx`                                                  |

So a new `foo.test.ts` runs in the browser, `foo.happy-dom.test.ts` in
happy-dom, and `foo.jsdom.test.tsx` in jsdom.

## The zoom button's CSS lives in two places

The built-in zoom button sits in the element's shadow DOM, where page CSS
can't reach it, so its rules are copied into
`packages/image-zoom/src/template.ts` (`BUTTON_CSS`). The same rules style
`[data-rmiz-btn-zoom]` in `packages/image-zoom/src/styles.css`, which covers
the React component's button. A change to the zoom button's CSS updates both
files.
