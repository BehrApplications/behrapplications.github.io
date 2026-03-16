/* ============================================================
   Behr Applications – main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Utility ─────────────────────────────────────────────── */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ── Sticky Nav & Scroll Behavior ──────────────────────── */
  (function initNav() {
    var nav = $('nav.site-nav');
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  })();

  /* ── Mobile Nav Toggle ──────────────────────────────────── */
  (function initMobileNav() {
    var nav = $('nav.site-nav');
    var toggle = $('#nav-toggle');
    var mobileNav = $('#nav-mobile');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.contains('open');
      toggle.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('open', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on link click
    $$('a', mobileNav).forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

  })();

  /* ── Active Nav Link ────────────────────────────────────── */
  (function initActiveLink() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    $$('a[data-page]').forEach(function (a) {
      if (a.dataset.page === page) {
        a.classList.add('active');
      }
    });
  })();

  /* ── Smooth Scrolling ───────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var hash = a.getAttribute('href');
    if (hash === '#') return;
    var target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    var navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '68',
      10
    );
    var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });

  /* ── FAQ Accordion ──────────────────────────────────────── */
  (function initFAQ() {
    var items = $$('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = $('.faq-question', item);
      var answer = $('.faq-answer', item);
      if (!btn || !answer) return;

      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close all others
        items.forEach(function (other) {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
            var otherBtn = $('.faq-question', other);
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  })();

  /* ── FAQ Search ─────────────────────────────────────────── */
  (function initFAQSearch() {
    var searchInput = $('#faq-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
      var query = this.value.trim().toLowerCase();
      var items = $$('.faq-item');

      items.forEach(function (item) {
        var text = item.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  })();

  /* ── Contact Form ───────────────────────────────────────── */
  (function initContactForm() {
    var form = $('#contact-form');
    if (!form) return;

    var successEl = $('#form-success');
    var errorEl   = $('#form-error');

    function showAlert(el, msg) {
      el.textContent = '';
      var icon = document.createElement('span');
      icon.textContent = el === successEl ? '✅' : '⚠️';
      var text = document.createElement('span');
      text.textContent = msg;
      el.appendChild(icon);
      el.appendChild(text);
      el.classList.add('visible');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function hideAlerts() {
      if (successEl) successEl.classList.remove('visible');
      if (errorEl)   errorEl.classList.remove('visible');
    }

    function setInvalid(field, msg) {
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      var err = field.parentElement.querySelector('.field-error');
      if (err) { err.textContent = msg; err.classList.add('visible'); }
    }

    function setValid(field) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      var err = field.parentElement.querySelector('.field-error');
      if (err) err.classList.remove('visible');
    }

    function clearValidation(field) {
      field.classList.remove('is-invalid', 'is-valid');
      var err = field.parentElement.querySelector('.field-error');
      if (err) err.classList.remove('visible');
    }

    // Live validation on blur
    ['name', 'email', 'message'].forEach(function (id) {
      var field = document.getElementById(id);
      if (!field) return;
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid')) validateField(field);
      });
    });

    function validateField(field) {
      var val = field.value.trim();
      if (field.id === 'name') {
        if (!val) { setInvalid(field, 'Name is required.'); return false; }
        if (val.length < 2) { setInvalid(field, 'Name must be at least 2 characters.'); return false; }
      }
      if (field.id === 'email') {
        if (!val) { setInvalid(field, 'Email address is required.'); return false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          setInvalid(field, 'Please enter a valid email address.'); return false;
        }
      }
      if (field.id === 'message') {
        if (!val) { setInvalid(field, 'Message is required.'); return false; }
        if (val.length < 10) { setInvalid(field, 'Message must be at least 10 characters.'); return false; }
      }
      setValid(field);
      return true;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideAlerts();

      // Honeypot check
      var honeypot = document.getElementById('website');
      if (honeypot && honeypot.value) return; // silently abort

      var nameField    = document.getElementById('name');
      var emailField   = document.getElementById('email');
      var messageField = document.getElementById('message');

      var valid = true;
      [nameField, emailField, messageField].forEach(function (f) {
        if (f && !validateField(f)) valid = false;
      });

      if (!valid) {
        showAlert(errorEl, 'Please fix the errors above and try again.');
        return;
      }

      var submitBtn = form.querySelector('[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      var inquiryType = document.getElementById('inquiry-type');
      var newsletter  = document.getElementById('newsletter');

      var payload = {
        name:        nameField.value.trim(),
        email:       emailField.value.trim(),
        inquiryType: inquiryType ? inquiryType.value : 'General',
        message:     messageField.value.trim(),
        newsletter:  newsletter ? newsletter.checked : false,
        _subject:    'New Contact from Behr Applications Website'
      };

      /* TODO: Replace 'YOUR_FORM_ID' with your Formspree form ID.
         Visit https://formspree.io to create a free form and get your ID. */
      fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            [nameField, emailField, messageField].forEach(clearValidation);
            showAlert(successEl,
              'Thank you! Your message has been sent. We\'ll be in touch soon.');
          } else {
            return res.json().then(function (data) {
              throw new Error(
                (data && data.error) || 'Server error. Please try again later.'
              );
            });
          }
        })
        .catch(function (err) {
          showAlert(errorEl,
            err.message || 'Something went wrong. Please email us directly at behrapplications@gmail.com');
        })
        .finally(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  })();

  /* ── Newsletter Signup ──────────────────────────────────── */
  (function initNewsletter() {
    var forms = $$('[id^="newsletter-form"]');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var emailInput = form.querySelector('input[type="email"]');
        if (!emailInput || !emailInput.value.trim()) return;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
          emailInput.style.borderColor = '#e05353';
          return;
        }
        emailInput.style.borderColor = '';

        var btn = form.querySelector('button');
        var orig = btn ? btn.textContent : '';
        if (btn) { btn.textContent = '✓ Subscribed!'; btn.disabled = true; }
        emailInput.value = '';
        emailInput.placeholder = 'You\'re on the list! 🎉';
        emailInput.disabled = true;

        // Reset after a few seconds
        setTimeout(function () {
          if (btn) { btn.textContent = orig; btn.disabled = false; }
          emailInput.disabled = false;
          emailInput.placeholder = 'Your email address';
        }, 5000);
      });
    });
  })();

})();
