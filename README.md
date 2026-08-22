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

- `data/hero-data-EN.json`: English career, project, and contact content.
- `data/hero-data-PT.json`: Portuguese career, project, and contact content.
- `data/projects-EN.json`: detailed project-page content.
- `sections/`: HTML fragments loaded by the home page.
- `assets/`: portfolio media and résumé.

## Validation

```sh
for file in js/*.js; do node --check "$file"; done
for file in data/*.json; do jq empty "$file"; done
```
