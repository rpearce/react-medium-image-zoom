// Configuration for @custom-elements-manifest/analyzer. The analyzer walks
// the TypeScript source and emits `custom-elements.json` at the package
// root, where tooling (IDE plugins, Storybook, web-component catalogs,
// VSCode's HTML data) auto-discovers it via the `customElements` field in
// package.json.

/**
 * CEM plugin that removes private members and known false positives from
 * the emitted manifest. Consumers only care about the public API; shipping
 * the ~70 `#private` fields of ImageZoomElement bloats the manifest and
 * leaks implementation details. The analyzer also surfaces
 * `shadow.innerHTML = ...` in the constructor as a phantom `innerHTML`
 * field on the class, which needs filtering.
 */
const FALSE_POSITIVE_NAMES = new Set(['innerHTML'])

const stripPrivateMembers = {
  name: 'strip-private-members',
  packageLinkPhase({ customElementsManifest }) {
    for (const mod of customElementsManifest.modules ?? []) {
      for (const decl of mod.declarations ?? []) {
        if (Array.isArray(decl.members)) {
          decl.members = decl.members.filter(
            m => m.privacy !== 'private' && !FALSE_POSITIVE_NAMES.has(m.name),
          )
        }
      }
    }
  },
}

export default {
  globs: ['src/image-zoom.ts'],
  exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/utils/**'],
  outdir: '.',
  // Our class uses plain TypeScript + native `#private` fields — no Lit,
  // Stencil, FAST, or Catalyst framework flags needed.
  dev: false,
  watch: false,
  packagejson: false,
  plugins: [stripPrivateMembers],
}
