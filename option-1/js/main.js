/* ==========================================================
   Apple Hospitals — Option 1 interactions (vanilla JS)
   No data is sent anywhere or stored. All behaviour is local.
   ========================================================== */
(function () {
  "use strict";

  var DATA = window.APPLE_DATA;
  var ASSET = "../assets/";

  document.documentElement.classList.add("js");

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = $(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Close mobile menu after choosing an in-page link ---------- */
  $all(".navbar-collapse .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      var collapse = $(".navbar-collapse.show");
      if (collapse && window.bootstrap) window.bootstrap.Collapse.getOrCreateInstance(collapse).hide();
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = $all(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -60px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Prototype modal ---------- */
  var PROTO = {
    appointment: {
      title: "Book an Appointment",
      body: "<p>This design concept intentionally places a single, prominent <strong>Book Appointment</strong> button in the header and on doctor cards instead of a booking form on the homepage.</p>" +
        "<p class='mb-1'>After the design is approved, this button can open:</p>" +
        "<ol class='proto-steps'><li>The hospital's chosen online booking system or third-party booking link, or</li><li>A dedicated appointment page developed in the next phase.</li></ol>" +
        "<p class='mt-3 mb-0'>Until then, patients can call the hospital on <a href='tel:+912312688888'><strong>0231 268 8888</strong></a>.</p>"
    },
    doctorBooking: {
      title: "Book with this doctor",
      body: "<p>In the full website this button will open the booking flow with <strong>{doctor}</strong> pre-selected.</p><p class='mb-0'>No appointment has been created. To book today, call <a href='tel:+912312688888'><strong>0231 268 8888</strong></a>.</p>"
    },
    profile: {
      title: "Doctor profile",
      body: "<p><strong>{doctor}</strong> is a <strong>demonstration profile</strong> created to show the layout. It is not an Apple Hospitals doctor.</p>" +
        "<p class='mb-1'>The production profile page is planned to include:</p>" +
        "<ol class='proto-steps'><li>Approved photograph, qualifications and experience</li><li>OPD days and timings</li><li>Areas of expertise</li><li>Book Appointment action</li></ol>"
    },
    cancer: {
      title: "Apple Cancer Institute",
      body: "<p>In the full website, <strong>Explore Cancer Care</strong> leads to a dedicated Apple Cancer Institute section with treatment information, specialists and patient guidance.</p><p class='mb-0'>For this prototype, the Cancer Institute content is shown on the homepage, and cancer specialists can be browsed on the <a href='doctors.html?dept=Cancer%20Institute'>Find a Doctor</a> page.</p>"
    },
    package: {
      title: "Health checkup enquiry",
      body: "<p>Packages shown here are <strong>demonstration content</strong>. Final package names, inclusions and prices will be supplied by the hospital.</p><p class='mb-0'>In the full website this button will open a package enquiry or booking step. For now, please call <a href='tel:+912312688888'><strong>0231 268 8888</strong></a>.</p>"
    },
    enquiry: {
      title: "Diagnostics enquiry",
      body: "<p>In the full website this action can open an enquiry form or the hospital's chosen booking system for diagnostic tests.</p><p class='mb-0'>No information is collected in this prototype. Please call <a href='tel:+912312688888'><strong>0231 268 8888</strong></a>.</p>"
    },
    news: {
      title: "News & Events",
      body: "<p>This area is reserved for hospital announcements, health camps and awareness programmes. The items shown are <strong>layout placeholders</strong>.</p><p class='mb-0'>Real news will be managed through the CMS planned for the next phase.</p>"
    },
    specialty: {
      title: "{specialty}",
      body: "<p>In the full website each specialty will have its own page with an overview, treatments offered, doctors and an appointment action.</p><p class='mb-0'><a href='doctors.html?q={specialtyUrl}'>Browse demo doctors for {specialty}</a></p>"
    }
  };

  var modalEl = $("#protoModal");
  function openProto(key, vars) {
    if (!modalEl || !window.bootstrap) return;
    var cfg = PROTO[key] || PROTO.appointment;
    vars = vars || {};
    var fill = function (s) {
      return s.replace(/\{(\w+)\}/g, function (_, k) { return k === "specialtyUrl" ? encodeURIComponent(vars.specialty || "") : esc(vars[k] || ""); });
    };
    $("#protoModalLabel").textContent = fill(cfg.title).replace(/&amp;/g, "&");
    $("#protoModalBody").innerHTML = fill(cfg.body);
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-proto]");
    if (!t) return;
    e.preventDefault();
    openProto(t.getAttribute("data-proto"), { doctor: t.getAttribute("data-doctor"), specialty: t.getAttribute("data-specialty") });
  });

  /* ---------- Doctor card template ---------- */
  function doctorCard(d, headingTag, colClass) {
    var h = headingTag || "h3";
    return '<div class="' + (colClass || "col-sm-6 col-lg-4 col-xl-3") + '"><article class="doc-card">' +
      '<div class="photo" style="background:' + esc(d.tint) + '">' +
        '<span class="demo-badge"><i class="bi bi-info-circle" aria-hidden="true"></i>Demo profile</span>' +
        '<img src="' + ASSET + 'icons/illustrations/doctor-placeholder.svg" alt="Photo placeholder for a demonstration doctor profile" loading="lazy" width="400" height="400">' +
      '</div><div class="body">' +
        "<" + h + ">" + esc(d.name) + "</" + h + ">" +
        '<div class="spec">' + esc(d.specialty) + "</div>" +
        '<div class="meta"><i class="bi bi-building" aria-hidden="true"></i> ' + esc(d.dept === "Hospital" ? "Apple Saraswati Hospital" : d.dept === "Cancer Institute" ? "Apple Cancer Institute" : "Apple Diagnostics") + "<br><span class=\"verify-note\">Qualifications to be supplied by hospital</span></div>" +
        '<div class="actions">' +
          '<button type="button" class="btn btn-outline-navy" data-proto="profile" data-doctor="' + esc(d.name) + '">View Profile</button>' +
          '<button type="button" class="btn btn-brand" data-proto="doctorBooking" data-doctor="' + esc(d.name) + '">Book</button>' +
        "</div></div></article></div>";
  }

  /* ---------- Homepage: featured doctors ---------- */
  var featured = $("#featuredDoctors");
  if (featured && DATA) {
    featured.innerHTML = [DATA.doctors[0], DATA.doctors[2], DATA.doctors[3], DATA.doctors[4]].map(function (d) { return doctorCard(d); }).join("");
  }

  /* ---------- Homepage: specialty filter select ---------- */
  $all("select[data-fill='departments']").forEach(function (sel) {
    ["Hospital", "Cancer Institute", "Diagnostics"].forEach(function (u) {
      var o = document.createElement("option"); o.value = u; o.textContent = u === "Hospital" ? "Apple Saraswati Hospital" : "Apple " + u; sel.appendChild(o);
    });
  });

  /* ---------- Offer status badges (never show expired offers as active) ---------- */
  $all("[data-offer-id]").forEach(function (card) {
    var offer = DATA && DATA.offers.filter(function (o) { return o.id === card.getAttribute("data-offer-id"); })[0];
    if (!offer) return;
    var status = DATA.offerStatus(offer);
    var badge = $(".status-badge", card);
    var labels = { active: "Running now", upcoming: "Upcoming", ended: "Offer period ended", unknown: "Confirm availability" };
    if (badge) { badge.textContent = labels[status]; badge.className = "status-badge status-" + status; }
    if (status === "ended") card.classList.add("is-ended");
  });

  /* ---------- Doctors page ---------- */
  var grid = $("#doctorGrid");
  if (grid && DATA) {
    var specBox = $("#specialtyFilters");
    var specs = DATA.doctors.map(function (d) { return d.specialty; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
    specBox.innerHTML = specs.map(function (s, i) {
      return '<div class="form-check"><input class="form-check-input" type="checkbox" value="' + esc(s) + '" id="spec' + i + '"><label class="form-check-label" for="spec' + i + '">' + esc(s) + "</label></div>";
    }).join("");

    var params = new URLSearchParams(window.location.search);
    var qInput = $("#doctorSearch");
    if (params.get("q")) qInput.value = params.get("q");
    var deptParam = params.get("dept");
    if (deptParam) {
      var r = $all("input[name='dept']").filter(function (x) { return x.value === deptParam; })[0];
      if (r) r.checked = true;
    }

    var render = function () {
      var q = qInput.value.trim().toLowerCase();
      var dept = ($("input[name='dept']:checked") || {}).value || "";
      var chosen = $all("input[type='checkbox']", specBox).filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
      var list = DATA.doctors.filter(function (d) {
        var matchQ = !q || (d.name + " " + d.specialty + " " + d.dept).toLowerCase().indexOf(q) > -1;
        var matchD = !dept || d.dept === dept;
        var matchS = !chosen.length || chosen.indexOf(d.specialty) > -1;
        return matchQ && matchD && matchS;
      });
      grid.innerHTML = list.length ? list.map(function (d) { return doctorCard(d, "h2", "col-sm-6 col-xl-4"); }).join("") :
        '<div class="col-12"><div class="empty-state"><i class="bi bi-search fs-3 d-block mb-2" aria-hidden="true"></i>No doctors match these filters. Try clearing a filter.</div></div>';
      $("#resultCount").textContent = list.length + (list.length === 1 ? " doctor" : " doctors") + " shown";
    };
    $("#doctorFilterForm").addEventListener("input", render);
    $("#doctorFilterForm").addEventListener("change", render);
    $("#doctorFilterForm").addEventListener("submit", function (e) { e.preventDefault(); render(); });
    $("#clearFilters").addEventListener("click", function () {
      qInput.value = "";
      $all("input", specBox).forEach(function (c) { c.checked = false; });
      $("#deptAll").checked = true;
      render();
    });
    render();
  }

  /* ---------- Footer year ---------- */
  $all("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
