/*
 * Apple Hospitals — shared prototype content
 * ------------------------------------------------------------
 * Used by both design options. Everything in this file falls into
 * one of two groups:
 *
 *   VERIFIED  – taken from the client brief (req.txt / data.txt), the
 *               client-supplied photographs/posters, or the existing
 *               applehospitals.com website. Still subject to final
 *               approval by the hospital.
 *   DEMO      – placeholder content created only to show the layout.
 *               It is flagged with `demo: true` and is visibly
 *               labelled in the UI. Replace before production.
 */
window.APPLE_DATA = (function () {
  "use strict";

  // VERIFIED — official contact details from the client brief.
  var contact = {
    hospital: {
      name: "Apple Saraswati Multispeciality Hospital",
      tagline: "NABH Accredited Multispeciality Hospital in Kolhapur",
      addressLines: [
        "804/2, 805/2, E Ward, Circuit House To Kadamwadi Road,",
        "Bhosalewadi, Kolhapur, Maharashtra 416003"
      ],
      phone: "0231 268 8888",
      tel: "tel:+912312688888",
      instagram: "https://www.instagram.com/apple_saraswati/?hl=en"
    },
    corporate: {
      name: "Apple Hospitals and Research Institute Limited",
      addressLines: [
        "525/E, Vyapari Peth, E Ward, Shahupuri,",
        "Kolhapur, Maharashtra 416001"
      ],
      phone: "0231 265 1207",
      tel: "tel:+912312651207"
    }
  };

  // VERIFIED — specialties listed on the existing applehospitals.com
  // website (Medical services / Contact pages). Descriptions are
  // short, generic summaries for layout only.
  var specialties = [
    { id: "critical-care", name: "Critical Care Medicine", icon: "bi-heart-pulse", text: "Intensive care for critically ill patients." },
    { id: "cardiology", name: "Cardiology", icon: "bi-activity", text: "Diagnosis and care for heart conditions." },
    { id: "nephrology", name: "Nephrology", icon: "bi-droplet-half", text: "Kidney care, dialysis and renal transplant." },
    { id: "neurology", name: "Neurology", icon: "bi-diagram-3", text: "Care for brain, spine and nerve disorders." },
    { id: "gastroenterology", name: "Gastroenterology & HPB", icon: "bi-capsule", text: "Digestive, liver, pancreas and biliary care." },
    { id: "obgyn", name: "Obstetrics & Gynaecology", icon: "bi-gender-female", text: "Women's health, pregnancy and childbirth." },
    { id: "nicu", name: "Neonatal & Paediatric Intensive Care", icon: "bi-balloon-heart", text: "Specialised intensive care for newborns and children." },
    { id: "urology", name: "Urology", icon: "bi-shield-plus", text: "Care for urinary tract and kidney stone conditions." },
    { id: "ent", name: "ENT", icon: "bi-ear", text: "Ear, nose and throat care." },
    { id: "rheumatology", name: "Rheumatology", icon: "bi-person-arms-up", text: "Care for joint and autoimmune conditions." },
    { id: "oncology", name: "Oncology", icon: "bi-clipboard2-heart", text: "Cancer care through Apple Cancer Institute." },
    { id: "physiotherapy", name: "Physiotherapy", icon: "bi-universal-access", text: "Rehabilitation and recovery support." }
  ];

  // VERIFIED — services listed on the existing Cancer Institute page,
  // plus "Radiation | Chemotherapy | Surgery" from the entrance signage.
  var cancerServices = [
    { name: "Surgical Oncology", icon: "bi-scissors" },
    { name: "GI & HPB Onco-surgery", icon: "bi-clipboard2-pulse" },
    { name: "Radiation Therapy & Radiosurgery", icon: "bi-radioactive" },
    { name: "Medical Oncology & Haemato-oncology", icon: "bi-capsule-pill" },
    { name: "Interventional Oncology", icon: "bi-crosshair" },
    { name: "Onco-pathology", icon: "bi-eyedropper" }
  ];

  // VERIFIED — diagnostic modalities named on the existing website.
  // Equipment specifications are quoted from that website and must be
  // reconfirmed by the hospital before publishing.
  var diagnostics = [
    { id: "mri", name: "MRI", img: "mri.svg", text: "Magnetic resonance imaging for detailed soft-tissue, brain and spine studies.", spec: "48-channel 3T MRI (as listed on the existing website)" },
    { id: "ct", name: "CT Scan", img: "ct.svg", text: "Fast cross-sectional imaging for emergency and planned diagnosis.", spec: "128-slice dual-energy CT (as listed on the existing website)" },
    { id: "usg", name: "Ultrasound & Sonography", img: "ultrasound.svg", text: "Abdominal, pelvic and other ultrasound examinations.", spec: "Advanced ultrasound machines (as listed on the existing website)" },
    { id: "lab", name: "Pathology & Laboratory", img: "laboratory.svg", text: "Laboratory investigations supporting diagnosis and treatment.", spec: "Pathology department (as listed on the existing website)" }
  ];

  // DEMO — doctor profiles. NOT real Apple Hospitals staff.
  var doctors = [
    { id: 1, name: "Dr. Demo Consultant 01", specialty: "Cardiology", dept: "Hospital", tint: "#E3EEF5" },
    { id: 2, name: "Dr. Demo Consultant 02", specialty: "Nephrology", dept: "Hospital", tint: "#EAF2EE" },
    { id: 3, name: "Dr. Demo Consultant 03", specialty: "Surgical Oncology", dept: "Cancer Institute", tint: "#F6E9EA" },
    { id: 4, name: "Dr. Demo Consultant 04", specialty: "Obstetrics & Gynaecology", dept: "Hospital", tint: "#F3ECF6" },
    { id: 5, name: "Dr. Demo Consultant 05", specialty: "Radiology", dept: "Diagnostics", tint: "#E8EEF8" },
    { id: 6, name: "Dr. Demo Consultant 06", specialty: "Neurology", dept: "Hospital", tint: "#EEF0E6" },
    { id: 7, name: "Dr. Demo Consultant 07", specialty: "Medical Oncology", dept: "Cancer Institute", tint: "#F6EEE6" },
    { id: 8, name: "Dr. Demo Consultant 08", specialty: "Gastroenterology & HPB", dept: "Hospital", tint: "#E6F2F3" },
    { id: 9, name: "Dr. Demo Consultant 09", specialty: "Radiation Oncology", dept: "Cancer Institute", tint: "#F1E8F0" },
    { id: 10, name: "Dr. Demo Consultant 10", specialty: "Pathology", dept: "Diagnostics", tint: "#EDF1F5" },
    { id: 11, name: "Dr. Demo Consultant 11", specialty: "Critical Care Medicine", dept: "Hospital", tint: "#E9F0F7" },
    { id: 12, name: "Dr. Demo Consultant 12", specialty: "Urology", dept: "Hospital", tint: "#EEF3EA" }
  ];

  // DEMO — health checkup packages. No prices are shown because no
  // verified package pricing was supplied.
  var packages = [
    { id: "basic", name: "Basic Health Checkup", for: "Adults", icon: "bi-clipboard2-check", items: ["Doctor consultation", "Routine blood tests", "Urine examination", "Blood pressure check"] },
    { id: "comprehensive", name: "Comprehensive Health Checkup", for: "Adults 30+", icon: "bi-heart-pulse", items: ["Physician consultation", "Blood profile", "Cardiac screening", "Imaging as advised"], featured: true },
    { id: "women", name: "Women's Wellness", for: "Women", icon: "bi-gender-female", items: ["Gynaecology consultation", "Blood profile", "Ultrasound as advised", "Diet guidance"] },
    { id: "senior", name: "Senior Citizen Checkup", for: "60+", icon: "bi-person-heart", items: ["Physician consultation", "Blood profile", "Cardiac screening", "Bone & joint review"] }
  ];

  // VERIFIED — client-supplied promotional posters.
  // `validTo` is used to automatically mark offers as ended.
  var offers = [
    {
      id: "sonography",
      title: "Abdominal Sonography Offer",
      img: "offer-sonography-oct-2026.jpg",
      alt: "Marathi poster: abdominal sonography offer, ₹1,000 instead of ₹1,500, 1 to 31 October 2026",
      summary: "Abdominal sonography at ₹1,000 (regular ₹1,500), 10 am – 6 pm, Sunday closed.",
      period: "1 – 31 October 2026",
      validFrom: "2026-10-01",
      validTo: "2026-10-31"
    },
    {
      id: "dialysis",
      title: "Dialysis Treatment Campaign",
      img: "campaign-dialysis.jpg",
      alt: "Marathi poster: free dialysis treatment at Apple Saraswati Hospital, Kolhapur, with expert doctors 24 hours",
      summary: "Free dialysis treatment campaign with 24-hour expert doctors, as shown on the hospital's poster.",
      period: "Period not stated — confirm with hospital",
      validFrom: null,
      validTo: null
    }
  ];

  // DEMO — options for the Option 2 booking widget.
  var booking = {
    Hospital: {
      label: "Specialty or doctor",
      groups: [
        { label: "Specialties", options: specialties.filter(function (s) { return s.id !== "oncology"; }).map(function (s) { return s.name; }) },
        { label: "Demo doctors", options: doctors.filter(function (d) { return d.dept === "Hospital"; }).map(function (d) { return d.name + " — " + d.specialty; }) }
      ]
    },
    "Cancer Institute": {
      label: "Cancer care service or specialist",
      groups: [
        { label: "Cancer care services", options: cancerServices.map(function (s) { return s.name; }) },
        { label: "Demo specialists", options: doctors.filter(function (d) { return d.dept === "Cancer Institute"; }).map(function (d) { return d.name + " — " + d.specialty; }) }
      ]
    },
    Diagnostics: {
      label: "Diagnostic service or package",
      groups: [
        { label: "Diagnostic services", options: diagnostics.map(function (d) { return d.name; }) },
        { label: "Demo health packages", options: packages.map(function (p) { return p.name; }) }
      ]
    }
  };

  /** Returns "active", "upcoming", "ended" or "unknown" for an offer. */
  function offerStatus(offer, now) {
    if (!offer.validTo) return "unknown";
    now = now || new Date();
    var from = new Date(offer.validFrom + "T00:00:00");
    var to = new Date(offer.validTo + "T23:59:59");
    if (now < from) return "upcoming";
    if (now > to) return "ended";
    return "active";
  }

  return {
    contact: contact,
    specialties: specialties,
    cancerServices: cancerServices,
    diagnostics: diagnostics,
    doctors: doctors,
    packages: packages,
    offers: offers,
    booking: booking,
    offerStatus: offerStatus
  };
})();
