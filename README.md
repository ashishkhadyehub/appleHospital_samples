# Apple Hospitals — Website Redesign Design Concepts

Two front-end design prototypes for **Apple Saraswati Multispeciality Hospital**, Kolhapur
(*NABH Accredited Multispeciality Hospital in Kolhapur*), prepared for presentation to hospital
management before full website development.

> This is a design prototype only. There is no backend, database, CMS, authentication or real
> appointment booking. Nothing entered on any page is sent anywhere or stored.

---

## How to run

No build step and no internet connection are needed — every library and font is stored in the project.

- **Simplest:** open `index.html` in a browser (double-click).
- **Recommended (local server):** from the project folder run `python -m http.server 8000`, then open
  <http://localhost:8000/>.
- **Visual Studio / VS Code:** open the folder and use *View in Browser* or the *Live Server* extension on `index.html`.
- **GitHub Pages:** in the repository go to *Settings → Pages → Build and deployment*, choose
  *Deploy from a branch*, select the branch that holds these files and the `/ (root)` folder, then save.
  An empty `.nojekyll` file is included so the files are served exactly as they are.

## Pages

| Page | Concept 1 — Premium Healthcare Corporate | Concept 2 — Modern Patient-Centric |
|---|---|---|
| Design selection | `index.html` | (same) |
| Homepage | `option-1/index.html` | `option-2/index.html` (with booking widget) |
| Find a Doctor | `option-1/doctors.html` | `option-2/doctors.html` |
| Diagnostics & Health Packages | `option-1/diagnostics.html` | `option-2/diagnostics.html` |

Every page has a **Back to Design Selection** link in the top contact strip, and the logo links to that concept's homepage.
The **Cancer Institute** menu item goes to the Apple Cancer Institute section on the homepage (`index.html#cancer`).
A dedicated Cancer Institute page is planned for the next phase.

## The two concepts

**Concept 1 — Premium Healthcare Corporate.** Structured and institutional. White and light-grey
backgrounds, deep navy (#123B5D) and healthcare blue (#176B87), with Apple red (#C82032) kept for
key actions. Uses the Manrope and Inter fonts. It includes a split hero with a real hospital photograph,
a doctor-search panel overlapping the hero, a department grid, professional doctor cards, and a dark
navy Cancer Institute section. **It has no booking form on the homepage.** The *Book Appointment*
button opens a short explanation of where a booking system or third-party booking link will connect.

**Concept 2 — Modern Patient-Centric Experience.** Immersive and warm. It has a full-bleed campus
photograph, a floating pill-shaped navigation bar, a cream and deep-teal palette, and Fraunces serif
headings with Inter body text. The homepage is ordered around patient tasks: the booking widget comes
first, then "How can we help you today?" shortcuts. After that come tall image cards for the three units,
an early Cancer Institute highlight with an arch-shaped photograph, and a scrollable doctor carousel.
The page ends with a bento-style diagnostics showcase, packages and a campus mosaic. On phones there
is a floating action bar with Call, Doctors and Book.

### Concept 2 appointment widget (demonstration)
1. **Select unit:** Hospital, Cancer Institute or Diagnostics, shown as selectable tiles.
2. **Select service:** the options change with the unit. Hospital shows specialties and demo doctors,
   Cancer Institute shows cancer services and demo specialists, and Diagnostics shows tests and demo packages.
3. **Appointment details:** patient name, mobile number (10 digits, and a pasted +91 prefix is removed),
   preferred date (past dates are blocked, up to 90 days ahead) and preferred time.
4. **Find Available Slots:** checks the required fields and then opens a modal. The modal shows a
   summary and demo time slots. *Continue to Appointment* then explains what the live system would do.

Each step clearly says it is a demonstration. Nothing is sent, stored or booked, and the form is cleared
when the modal closes. The **Book** buttons on doctor cards and packages pre-fill the widget.
Other pages link to it with `index.html?unit=…&service=…#book`.

## Project structure

```
index.html                  Design selection page
option-1/                   Concept 1 (index, doctors, diagnostics, css/style.css, js/main.js)
option-2/                   Concept 2 (index, doctors, diagnostics, css/style.css, js/main.js)
assets/
  client/                   ORIGINAL client files, unchanged (+ data.txt)
  images/                   Web-optimised copies of client photos/posters
    previews/               Homepage thumbnails used on the selection page
  icons/                    Logos, favicon
    illustrations/          Placeholder SVG artwork (doctor silhouette, MRI, CT, ultrasound, lab)
  js/site-data.js           Shared content: verified facts + clearly flagged demo data
  vendor/                   Bootstrap 5.3.3, Bootstrap Icons 1.11.3, fonts (Inter, Manrope, Fraunces)
```

The CSS for each concept is scoped to its own body class (`body.o1` / `body.o2`), so the two cannot affect each other.
To replace images, swap the files in `assets/images/` and keep the same filenames.

## Images used

**Client-supplied (real):** these are in `assets/client/`, with optimised copies in `assets/images/`.

| Original | Web copy | Content |
|---|---|---|
| `unnamed.webp` | `hospital-front-bluesky.jpg` | Hospital building with rooftop sign |
| `6.webp` | `hospital-entrance-casualty.jpg` | Main entrance and casualty block |
| `4.webp` | `hospital-campus-palms.jpg` | Campus with palm trees (Concept 2 hero) |
| `1.webp` | `hospital-panorama.jpg` | Panoramic view of the building (UI artefact at top cropped) |
| `3.webp` | `hospital-ward.jpg` | Inpatient ward |
| `5.webp` | `cancer-institute-entrance.jpg` | Apple Cancer Institute entrance signage |
| `offer.jpg` | `offer-sonography-oct-2026.jpg` | Abdominal sonography offer poster (1–31 Oct 2026) |
| `images.jpg` | `campaign-dialysis.jpg` | Dialysis treatment campaign poster |
| `logo.png` | `icons/apple-logo-mark.png`, `icons/favicon.png` | Apple logo mark (trimmed, proportions kept) |
| `logo1.png` | `icons/apple-saraswati-logo-horizontal.png` | Horizontal hospital logo (used in headers) |
| `r.jpg` | `brand-banner-units.jpg` | Brand banner. It was reviewed but is not shown, because it repeats the logos at low resolution |

**Temporary placeholders:** stock-photo sites (Unsplash and Pexels) could not be reached from the build
environment. Instead, the prototype uses simple **SVG illustrations** made for it, in
`assets/icons/illustrations/`: a neutral doctor silhouette and MRI, CT, ultrasound, laboratory and
radiotherapy line art. None of them depict real staff or real equipment. Replace them with approved
photographs after the design is chosen. The two `preview` images are screenshots of the prototypes.

## External dependencies

All of these are **stored locally** in `assets/vendor/`. No CDN is used:
- Bootstrap 5.3.3 (CSS and JS bundle), MIT licence
- Bootstrap Icons 1.11.3, MIT licence
- Fonts from the Fontsource npm packages, SIL Open Font Licence: Inter, Manrope and Fraunces

The only outbound links are the Instagram page, a Google Maps directions search for the hospital, and `tel:` links.

## Content sources and items that need verification

**Verified from the client brief:** hospital name, tagline, both addresses (kept separate), both phone numbers and the Instagram link.
- Hospital: 804/2, 805/2, E Ward, Circuit House To Kadamwadi Road, Bhosalewadi, Kolhapur, Maharashtra 416003. Phone 0231 268 8888 (`tel:+912312688888`).
- Corporate office (Apple Hospitals and Research Institute Limited): 525/E, Vyapari Peth, E Ward, Shahupuri, Kolhapur, Maharashtra 416001. Phone 0231 265 1207 (`tel:+912312651207`).

**Taken from the existing applehospitals.com site.** The site could not be opened directly from the build
environment, so this content came from search results. **Please reconfirm:**
- Specialty list: Critical Care, Cardiology, Nephrology (including renal transplant), Neurology,
  Gastroenterology & HPB, Obstetrics & Gynaecology, Neonatal and Paediatric ICU, Urology, ENT,
  Rheumatology, Oncology, Physiotherapy, Radiology and Pathology.
- Cancer Institute services: Surgical Oncology, GI & HPB Onco-surgery, Radiation Therapy & Radiosurgery,
  Medical & Haemato-oncology, Interventional Oncology and Onco-pathology. *Radiation, Chemotherapy and
  Surgery* also appear on the entrance signage.
- Equipment: **48-channel 3T MRI** and **128-slice dual-energy CT**. These are marked with \* on the pages.
  Some third-party listings give a different MRI specification, so please confirm.

**From the client's posters:**
- Abdominal sonography at ₹1,000 (regular ₹1,500), 1–31 October 2026, 10 am – 6 pm, Sunday closed.
  The status badge is worked out from the dates, so the offer **automatically shows "Offer period ended"
  after 31 October 2026**.
- Free dialysis treatment campaign. The poster gives no dates, so it is labelled *Confirm availability*.

**DEMONSTRATION CONTENT (labelled "Demo" on the pages; replace before launch):**
- Doctor profiles "Dr. Demo Consultant 01–12", including their specialties and units. These are **not real doctors**.
- Health checkup packages: names and inclusions. No prices are shown; they read *Price on request*.
- News & Events cards (placeholders).
- Appointment widget time slots and the booking flow.

Nothing in the prototype invents accreditation grades or dates, statistics, success rates,
testimonials, email addresses or extra phone numbers.

## Accessibility and responsiveness

The prototype includes semantic landmarks, a skip link, a single H1 per page, labelled form controls,
visible focus outlines, keyboard-accessible menus and modals, and meaningful alt text.
Decorative images have empty alt text. Animations respect `prefers-reduced-motion`.
Every page was checked at 1440, 768 and 390 px wide with headless Chromium. All checks passed:
no horizontal overflow, no broken images or links, no JavaScript errors, and all in-page anchors exist.
