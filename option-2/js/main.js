/* ==========================================================
   Apple Hospitals — Option 2 interactions (vanilla JS)

   The appointment widget is a FRONTEND DEMONSTRATION ONLY:
   - nothing is submitted to a server or external API
   - nothing is stored (no cookies, localStorage, etc.)
   - no appointment is created
   ========================================================== */
(function () {
  "use strict";

  var DATA = window.APPLE_DATA;
  var ASSET = "../assets/";
  var UNIT_NAMES = { "Hospital": "Apple Saraswati Hospital", "Cancer Institute": "Apple Cancer Institute", "Diagnostics": "Apple Diagnostics" };

  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function bs() { return window.bootstrap; }

  /* ---------- Floating nav shadow ---------- */
  var navWrap = $(".nav-wrap");
  if (navWrap) {
    var onScroll = function () { navWrap.classList.toggle("is-scrolled", window.scrollY > 20); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Close offcanvas when a link is chosen ---------- */
  $all("#mobileMenu a").forEach(function (a) {
    a.addEventListener("click", function () {
      var oc = $("#mobileMenu");
      if (oc && bs()) bs().Offcanvas.getOrCreateInstance(oc).hide();
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = $all(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -60px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Generic prototype modal ---------- */
  var CALL = "<a href='tel:+912312688888'><strong>0231 268 8888</strong></a>";
  var PROTO = {
    profile: { title: "Doctor profile", body: "<p><strong>{doctor}</strong> is a <strong>demonstration profile</strong> used to show the layout. It is not an Apple Hospitals doctor.</p><p class='mb-0'>The production profile will show the approved photograph, qualifications, experience, OPD timings and a Book Appointment action.</p>" },
    cancer: { title: "Apple Cancer Institute", body: "<p>In the full website, <strong>Explore Cancer Care</strong> opens a dedicated Apple Cancer Institute section with treatment information, specialists and patient guidance.</p><p class='mb-0'>For this prototype, cancer specialists can be browsed on the <a href='doctors.html?dept=Cancer%20Institute'>Find a Doctor</a> page, or booked using the appointment widget.</p>" },
    news: { title: "News & Events", body: "<p>This area is reserved for hospital news, health camps and awareness programmes. The cards shown are <strong>layout placeholders</strong>.</p><p class='mb-0'>Real items will be published through the CMS planned for the next phase.</p>" },
    enquiry: { title: "Diagnostics enquiry", body: "<p>In the full website this action can open a test enquiry or the hospital's chosen booking system.</p><p class='mb-0'>No information is collected in this prototype. Please call " + CALL + ".</p>" }
  };
  var protoEl = $("#protoModal");
  function openProto(key, vars) {
    if (!protoEl || !bs()) return;
    var cfg = PROTO[key] || PROTO.news;
    var fill = function (s) { return s.replace(/\{(\w+)\}/g, function (_, k) { return esc((vars || {})[k]); }); };
    $("#protoModalLabel").textContent = cfg.title;
    $("#protoModalBody").innerHTML = fill(cfg.body);
    bs().Modal.getOrCreateInstance(protoEl).show();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-proto]");
    if (!t) return;
    e.preventDefault();
    openProto(t.getAttribute("data-proto"), { doctor: t.getAttribute("data-doctor") });
  });

  /* ==========================================================
     APPOINTMENT WIDGET (homepage only)
     ========================================================== */
  var form = $("#bookingForm");
  var serviceSel = $("#bkService");

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function isoDate(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function selectedUnit() { var r = $("input[name='unit']:checked", form); return r ? r.value : ""; }

  function fillServices(unit, preselect) {
    serviceSel.innerHTML = "";
    var cfg = DATA.booking[unit];
    if (!cfg) {
      serviceSel.innerHTML = "<option value=''>Select a unit first</option>";
      serviceSel.disabled = true;
      $("#bkServiceLabel").textContent = "Specialty, doctor or service";
      return;
    }
    $("#bkServiceLabel").textContent = cfg.label;
    var ph = document.createElement("option");
    ph.value = ""; ph.textContent = "Choose…";
    serviceSel.appendChild(ph);
    cfg.groups.forEach(function (g) {
      var og = document.createElement("optgroup");
      og.label = g.label;
      g.options.forEach(function (o) {
        var opt = document.createElement("option");
        opt.value = o; opt.textContent = o;
        if (preselect && o === preselect) opt.selected = true;
        og.appendChild(opt);
      });
      serviceSel.appendChild(og);
    });
    serviceSel.disabled = false;
  }

  function updateSteps() {
    var unit = selectedUnit();
    $("#stepN1").classList.toggle("done", !!unit);
    $("#stepN2").classList.toggle("done", !!serviceSel.value);
    var detailsDone = ["bkName", "bkMobile", "bkDate", "bkTime"].every(function (id) { return $("#" + id).checkValidity(); });
    $("#stepN3").classList.toggle("done", detailsDone);
    var sum = $("#bkSummary");
    if (unit && serviceSel.value) {
      $("#bkSummaryText").textContent = UNIT_NAMES[unit] + " · " + serviceSel.value;
      sum.classList.add("show");
    } else {
      sum.classList.remove("show");
    }
  }

  /** Pre-select unit/service, e.g. from a doctor card or ?unit= / ?service= link. */
  function preselect(unit, service) {
    if (!form || !DATA.booking[unit]) return;
    var r = $all("input[name='unit']", form).filter(function (x) { return x.value === unit; })[0];
    if (r) r.checked = true;
    $("#unitError").classList.remove("show");
    fillServices(unit, service);
    updateSteps();
  }
  window.AppleBooking = { preselect: preselect };

  if (form && DATA) {
    // Date: no past dates; up to 90 days ahead.
    var today = new Date();
    var max = new Date(); max.setDate(max.getDate() + 90);
    var dateInput = $("#bkDate");
    dateInput.min = isoDate(today);
    dateInput.max = isoDate(max);

    fillServices("");

    $all("input[name='unit']", form).forEach(function (r) {
      r.addEventListener("change", function () {
        $("#unitError").classList.remove("show");
        fillServices(r.value);
        updateSteps();
      });
    });
    form.addEventListener("input", updateSteps);
    form.addEventListener("change", updateSteps);

    // Mobile: digits only.
    $("#bkMobile").addEventListener("input", function (e) {
      var v = e.target.value.replace(/\D/g, "");
      if (v.length > 10 && v.indexOf("91") === 0) v = v.slice(2); // pasted +91 prefix
      v = v.slice(0, 10);
      if (v !== e.target.value) e.target.value = v;
    });

    // URL pre-selection (from other pages).
    var params = new URLSearchParams(window.location.search);
    if (params.get("unit")) preselect(params.get("unit"), params.get("service"));

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var unitOk = !!selectedUnit();
      $("#unitError").classList.toggle("show", !unitOk);
      // Guard against past dates typed manually.
      if (dateInput.value && dateInput.value < dateInput.min) {
        dateInput.setCustomValidity("past");
      } else {
        dateInput.setCustomValidity("");
      }
      var ok = form.checkValidity() && unitOk;
      form.classList.add("was-validated");
      if (!ok) {
        var first = !unitOk ? $("input[name='unit']", form) : $(":invalid", form);
        if (first) first.focus();
        return;
      }
      showSlots();
    });
  }

  /* ---------- Booking demonstration modal ---------- */
  var bkModalEl = $("#bookingModal");
  function showSlots() {
    var unit = selectedUnit();
    var d = new Date($("#bkDate").value + "T00:00:00");
    var dateText = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    var time = $("#bkTime").value;
    var slotsByPeriod = {
      "Morning": ["9:30 am", "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm"],
      "Afternoon": ["12:30 pm", "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm", "3:00 pm"],
      "Evening": ["3:30 pm", "4:00 pm", "4:30 pm", "5:00 pm", "5:30 pm", "6:00 pm"]
    };
    var period = time.split(" ")[0];
    var slots = slotsByPeriod[period] || slotsByPeriod.Morning;

    $("#bkSumList").innerHTML =
      "<li><span>Unit</span><span>" + esc(UNIT_NAMES[unit]) + "</span></li>" +
      "<li><span>Doctor / service</span><span>" + esc(serviceSel.value) + "</span></li>" +
      "<li><span>Patient</span><span>" + esc($("#bkName").value.trim()) + "</span></li>" +
      "<li><span>Mobile</span><span>" + esc($("#bkMobile").value.replace(/(\d{5})(\d{5})/, "$1 $2")) + "</span></li>" +
      "<li><span>Preferred</span><span>" + esc(dateText) + " · " + esc(period) + "</span></li>";
    var grid = $("#slotGrid");
    grid.innerHTML = slots.map(function (s) { return "<button type='button' aria-pressed='false'>" + s + "</button>"; }).join("");
    $("#bkStepSlots").hidden = false;
    $("#bkStepDone").hidden = true;
    $("#bkContinue").disabled = true;
    bs().Modal.getOrCreateInstance(bkModalEl).show();
  }
  if (bkModalEl) {
    $("#slotGrid").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      $all("button", this).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
      $("#bkContinue").disabled = false;
      $("#bkChosenSlot").textContent = b.textContent;
    });
    $("#bkContinue").addEventListener("click", function () {
      $("#bkStepSlots").hidden = true;
      $("#bkStepDone").hidden = false;
      $("#bkStepDone").focus();
    });
    // Clear everything when the modal closes: nothing is kept.
    bkModalEl.addEventListener("hidden.bs.modal", function () {
      if (!form) return;
      form.reset();
      form.classList.remove("was-validated");
      fillServices("");
      updateSteps();
    });
  }

  /* ---------- Doctor cards ---------- */
  function doctorCard(d, opts) {
    opts = opts || {};
    var h = opts.heading || "h3";
    var bookHref = (opts.onHome ? "" : "index.html") + "?unit=" + encodeURIComponent(d.dept) + "&service=" + encodeURIComponent(d.name + " — " + d.specialty) + "#book";
    return (opts.wrap ? "<div class='" + opts.wrap + "'>" : "") +
      "<article class='dcard'>" +
        "<div class='pic' style='background:" + esc(d.tint) + "'><span class='demo-chip'><i class='bi bi-info-circle' aria-hidden='true'></i>Demo</span>" +
          "<img src='" + ASSET + "icons/illustrations/doctor-placeholder.svg' alt='Photo placeholder for a demonstration doctor profile' loading='lazy' width='400' height='400'></div>" +
        "<div class='info'><span class='sp'>" + esc(d.specialty) + "</span>" +
          "<" + h + ">" + esc(d.name) + "</" + h + ">" +
          "<span class='unit'>" + esc(UNIT_NAMES[d.dept]) + "</span>" +
          "<span class='q'>Qualifications to be supplied by hospital</span>" +
          "<div class='acts'>" +
            "<button type='button' class='btn btn-ghost' data-proto='profile' data-doctor='" + esc(d.name) + "'>Profile</button>" +
            "<a class='btn btn-red' href='" + esc(bookHref) + "' data-book-unit='" + esc(d.dept) + "' data-book-service='" + esc(d.name + " — " + d.specialty) + "'>Book</a>" +
          "</div></div></article>" + (opts.wrap ? "</div>" : "");
  }

  // On the homepage, "Book" scrolls to the widget and pre-fills it.
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-book-unit]");
    if (!a || !form) return;
    e.preventDefault();
    preselect(a.getAttribute("data-book-unit"), a.getAttribute("data-book-service"));
    $("#book").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    setTimeout(function () { $("#bkName").focus({ preventScroll: true }); }, 500);
  });

  /* ---------- Homepage doctor rail ---------- */
  var rail = $("#doctorRail");
  if (rail && DATA) {
    var renderRail = function (unit) {
      var list = DATA.doctors.filter(function (d) { return !unit || d.dept === unit; });
      rail.innerHTML = list.map(function (d) { return doctorCard(d, { onHome: true }); }).join("");
    };
    renderRail("");
    $all("[data-rail-filter]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        $all("[data-rail-filter]").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        chip.setAttribute("aria-pressed", "true");
        renderRail(chip.getAttribute("data-rail-filter"));
        rail.scrollLeft = 0;
      });
    });
    $all("[data-rail]").forEach(function (b) {
      b.addEventListener("click", function () {
        var card = rail.firstElementChild;
        var step = card ? card.getBoundingClientRect().width + 18 : 300;
        rail.scrollBy({ left: b.getAttribute("data-rail") === "next" ? step : -step, behavior: "smooth" });
      });
    });
  }

  /* ---------- Department selects ---------- */
  $all("select[data-fill='units']").forEach(function (sel) {
    Object.keys(UNIT_NAMES).forEach(function (u) {
      var o = document.createElement("option"); o.value = u; o.textContent = UNIT_NAMES[u]; sel.appendChild(o);
    });
  });

  /* ---------- Doctors page ---------- */
  var grid = $("#doctorGrid");
  if (grid && DATA) {
    var q = $("#docQ"), unitSel = $("#docUnit"), chipBox = $("#specChips");
    var specs = DATA.doctors.map(function (d) { return d.specialty; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
    chipBox.innerHTML = "<button type='button' class='chip' aria-pressed='true' data-spec=''>All specialties</button>" +
      specs.map(function (s) { return "<button type='button' class='chip' aria-pressed='false' data-spec='" + esc(s) + "'>" + esc(s) + "</button>"; }).join("");
    var activeSpecs = [];

    var p = new URLSearchParams(window.location.search);
    if (p.get("q")) q.value = p.get("q");
    if (p.get("dept")) unitSel.value = p.get("dept");

    var render = function () {
      var term = q.value.trim().toLowerCase();
      var unit = unitSel.value;
      var list = DATA.doctors.filter(function (d) {
        return (!term || (d.name + " " + d.specialty + " " + d.dept).toLowerCase().indexOf(term) > -1) &&
          (!unit || d.dept === unit) &&
          (!activeSpecs.length || activeSpecs.indexOf(d.specialty) > -1);
      });
      grid.innerHTML = list.length ? list.map(function (d) { return doctorCard(d, { heading: "h2", wrap: "col-sm-6 col-lg-4 col-xl-3" }); }).join("") :
        "<div class='col-12'><div class='text-center p-5 bg-white rounded-4'><i class='bi bi-emoji-neutral fs-2 d-block mb-2' aria-hidden='true'></i>No doctors match. Try another search or clear filters.</div></div>";
      $("#docCount").textContent = list.length + (list.length === 1 ? " doctor" : " doctors");
    };
    chipBox.addEventListener("click", function (e) {
      var c = e.target.closest(".chip");
      if (!c) return;
      var s = c.getAttribute("data-spec");
      if (!s) {
        activeSpecs = [];
      } else {
        var i = activeSpecs.indexOf(s);
        if (i > -1) activeSpecs.splice(i, 1); else activeSpecs.push(s);
      }
      $all(".chip", chipBox).forEach(function (x) {
        var v = x.getAttribute("data-spec");
        x.setAttribute("aria-pressed", String(v ? activeSpecs.indexOf(v) > -1 : activeSpecs.length === 0));
      });
      render();
    });
    $("#docSearchForm").addEventListener("submit", function (e) { e.preventDefault(); render(); });
    q.addEventListener("input", render);
    unitSel.addEventListener("change", render);
    $("#docClear").addEventListener("click", function () {
      q.value = ""; unitSel.value = ""; activeSpecs = [];
      $all(".chip", chipBox).forEach(function (x) { x.setAttribute("aria-pressed", String(!x.getAttribute("data-spec"))); });
      render();
    });
    render();
  }

  /* ---------- Offer status ---------- */
  $all("[data-offer-id]").forEach(function (el) {
    var offer = DATA && DATA.offers.filter(function (o) { return o.id === el.getAttribute("data-offer-id"); })[0];
    if (!offer) return;
    var st = DATA.offerStatus(offer);
    var b = $(".status", el);
    var labels = { active: "Running now", upcoming: "Upcoming", ended: "Offer period ended", unknown: "Confirm availability" };
    if (b) { b.textContent = labels[st]; b.className = "status status-" + st; }
    if (st === "ended") el.classList.add("is-ended");
  });

  $all("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
