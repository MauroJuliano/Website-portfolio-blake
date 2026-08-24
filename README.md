# Website Portfolio

Static, bilingual portfolio for an iOS software engineer. The site uses HTML,
CSS, JavaScript modules, JSON content files, and Flickity for the carousels.

## Run locally

The sections and translations are loaded with `fetch`, so the site must be
served over HTTP instead of opened directly from the filesystem.

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Content

- `data/home/`: localized home-page content (`en.json`, `pt.json`).
- `data/projects/`: localized project-page content (`en.json`, `pt.json`).
- `sections/`: HTML fragments loaded by the home page.
- `assets/`: portfolio media and résumé.

## Structure

```text
css/
  components/   Shared UI controls
  pages/        Page-specific styles
  sections/     Home-section styles
  main.css      Home stylesheet entry point
js/
  components/   Reusable UI behavior
  config/       Shared configuration
  pages/        Page entry points and page-specific logic
  sections/     Career and projects renderers
  services/     Section-loading utilities
data/
  home/         Localized home content
  projects/     Localized project-page content
sections/       HTML fragments and the project-page template
```

## Validation

```sh
find js -name '*.js' -exec node --check {} \;
find data -name '*.json' -exec jq empty {} \;
```
