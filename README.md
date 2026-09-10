# I Build Cheap Simple Websites Fast

A dependency-free, responsive, six-page static site. English is pre-rendered for fast loading and indexing; German and Croatian use `?lang=de` and `?lang=hr` with the same shared components. JavaScript is needed for translated views and the multi-step form.

## Run

- `npm run dev` — builds and serves at http://localhost:4173
- `npm run build` — generates `dist/`
- `npm test` — checks translations, routes, references and form structure

## Edit

- `src/content.js`: all three translations and reference project links.
- `src/components.js`: shared navigation/footer, page sections, form fields and preview layouts.
- `src/styles.css`: logo-inspired design variables and responsive styles.
- `src/form.js`: form navigation, validation, repeatable/reorderable pages, request serialization and submission adapter.
- `public/assets/logo.webp`: optimized logo derived from the supplied `imcwf-logo.png`.

## Deploy to Netlify

Import this folder/repository. `netlify.toml` sets the build command and publish directory. Enable Netlify form detection in the site settings and deploy. Verify the `website-request` form appears in Netlify and test a real submission before sharing the site. Submission success is shown only after a successful server response. Contact channels are intentionally labeled “Coming soon” until real contact details are provided.

Builds outside Netlify do not send requests; the final step downloads a JSON request. The download includes file names and metadata, not file contents. Uploads must be shared separately when using the local download. Live submissions send contact fields, structured JSON and up to 20 image attachments (5 MB per file, 8 MB combined). Form submissions are personal information; configure access and retention in your chosen backend before collecting live requests.

To use a different backend, replace the fetch adapter in `src/form.js`. Netlify builds are detected through its `NETLIFY=true` environment variable. Other hosts default to downloading requests; connect a backend before enabling submissions there.

## Reference previews

All supplied references are linked. Six references are shown directly on the landing page; the remaining project appears under “More projects.” Duck Playspace and CRM examples appear on the complex-site page. Preview artwork is explicitly labeled as placeholder imagery because the reference sites could not be retrieved from this environment. The CRM is an illustrative HTML layout based on the screenshot supplied in chat, not the original screenshot file. Replace it in `src/components.js` with the original asset when available. The calendar demo is also a labeled layout placeholder and links to Harmonie Studio.

No hosting or domain subscriptions were purchased and the site has not been deployed.

## Legal page templates

`/datenschutz/` and `/impressum/` are linked from every footer. Their complete English, German and Croatian template copy lives in `src/legal.js`. Replace the bracketed fields with actual operator, hosting, form processing, retention and contact information in all three languages before treating them as final notices. They are explicitly labeled templates.

## GitHub Pages

The `.github/workflows/pages.yml` workflow tests, builds and deploys `dist/` when `main` is updated. In repository Settings → Pages, choose **GitHub Actions** as the publishing source. The workflow reads the Pages base path automatically, supporting the `/simple-websites/` project URL. `SITE_BASE_PATH=/simple-websites npm run build` reproduces this build locally; omit that variable for root hosting such as Netlify. GitHub Pages runs the form in download mode because it has no submission backend.
