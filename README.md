# Behr Applications

A complete professional minimalist website for **Behr Applications** — a user-centric mobile app development company focused on aviation professionals.

**Live site:** [https://behrapplications.github.io](https://behrapplications.github.io)

---

## Design System

| Token | Value |
|-------|-------|
| Forest Green | `#2D5016` |
| Slate | `#3A4A52` |
| Honey Gold | `#D4A574` |
| Cream | `#F5F1E8` |
| Heading Font | Poppins (300, 400, 600, 700) |
| Body Font | Inter (400, 500) |

---

## Project Structure

```
behrapplications.github.io/
├── index.html                  # Home page
├── apps.html                   # Apps portfolio
├── about.html                  # About & philosophy
├── blog.html                   # Blog listing
├── faq.html                    # FAQ with accordion & search
├── contact.html                # Contact form
├── privacy-fly-invoicing.html  # Fly Invoicing privacy policy
├── privacy-g6000.html          # G6000 privacy policy
├── style.css                   # All styles (design system, components, layouts)
├── main.js                     # All interactivity
├── robots.txt                  # Search engine directives
├── sitemap.xml                 # XML sitemap
├── .gitignore                  # Standard web gitignore
└── README.md                   # This file
```

---

## Running Locally

No build step required. This is a pure HTML/CSS/JS static site.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/behrapplications/behrapplications.github.io.git
   cd behrapplications.github.io
   ```

2. **Open any page directly in your browser:**
   ```bash
   open index.html          # macOS
   xdg-open index.html      # Linux
   start index.html         # Windows
   ```

3. **Or use a local development server** (recommended for proper relative-path resolution):
   ```bash
   # Python 3
   python -m http.server 8080
   # Then visit http://localhost:8080

   # Node.js (npx)
   npx serve .
   # Then visit http://localhost:3000
   ```

---

## Features

### Pages
- **Home** — Hero, philosophy cards, featured apps, newsletter signup
- **Apps** — Fly Invoicing & G6000 Recurrent Practice with feature lists
- **About** — Company story, philosophy, core values, team & testimonials
- **Blog** — Post cards with category tags and archive section
- **FAQ** — Searchable accordion with 9 Q&As
- **Contact** — Form with validation, honeypot spam protection, Formspree submission
- **Privacy Policies** — Individual policies for each app

### JavaScript Features (`main.js`)
- Sticky navigation (transparent → solid on scroll)
- Mobile hamburger menu with smooth animation
- Active nav link highlighting based on current page
- Smooth scrolling for anchor links
- FAQ accordion (one open at a time)
- FAQ search/filter by typed text
- Contact form validation with real-time feedback
- Contact form AJAX submission via Formspree
- Newsletter signup with success state

### Accessibility
- Semantic HTML5 throughout (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- `aria-label`, `aria-expanded`, `aria-controls`, `role` attributes
- `aria-live` regions for form feedback
- Keyboard-navigable accordion
- Focus-visible styles
- Color contrast compliant

---

## Contact Form Setup

The contact form posts to Formspree. To activate it for production:

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy your form ID (e.g., `xabcdefg`)
3. In `main.js`, replace the placeholder URL:
   ```js
   // Change:
   fetch('https://formspree.io/f/YOUR_FORM_ID', ...)
   // To:
   fetch('https://formspree.io/f/xabcdefg', ...)
   ```

---

## License

© 2026 Behr Applications. All rights reserved.
