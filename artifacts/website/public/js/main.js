// ===== BUILD INFO =====
var _buildDate = (typeof __BUILD_DATE__ !== 'undefined') ? __BUILD_DATE__ : 'dev';
var _gitCommit = (typeof __GIT_COMMIT__ !== 'undefined') ? __GIT_COMMIT__ : 'local';
console.log('[Enabelo Apps] Built: ' + _buildDate + ' | Commit: ' + _gitCommit);

// ===== CONTENT CONFIG =====
function loadContent() {
  fetch('./content.json?v=' + Date.now())
    .then(function(res) { return res.json(); })
    .then(function(cfg) {
      // Explainer video
      var ev = document.getElementById('explainer-video');
      if (ev && cfg.explainerVideo) {
        ev.setAttribute('data-youtube-id', cfg.explainerVideo.youtubeId);
        if (cfg.explainerVideo.title) {
          ev.setAttribute('data-title', cfg.explainerVideo.title);
          ev.setAttribute('aria-label', 'Play ' + cfg.explainerVideo.title);
        }
      }
      // Text testimonials
      var tt = cfg.textTestimonials;
      if (tt) {
        [1, 2].forEach(function(n) {
          var card = document.getElementById('text-testimonial-' + n);
          var t = tt[n - 1];
          if (!card || !t) return;
          var textEl = card.querySelector('.testimonial-text');
          var authorEl = card.querySelector('.testimonial-author');
          var roleEl = card.querySelector('.testimonial-role');
          if (textEl) textEl.textContent = '\u201c' + t.text + '\u201d';
          if (authorEl) authorEl.innerHTML = t.name + ' &mdash; ' + t.role;
          if (roleEl) roleEl.textContent = t.institution;
        });
      }
      // Video testimonials
      var vt = cfg.videoTestimonials;
      if (vt) {
        [1, 2].forEach(function(n) {
          var el = document.getElementById('video-testimonial-' + n);
          var v = vt[n - 1];
          if (!el || !v) return;
          el.setAttribute('data-youtube-id', v.youtubeId);
          if (v.title) {
            el.setAttribute('data-title', v.title);
            el.setAttribute('aria-label', 'Play ' + v.title);
          }
        });
      }
    })
    .catch(function(err) {
      console.warn('[Enabelo Apps] content.json not loaded, using defaults.', err);
    });
}
loadContent();

// ===== DEMO MODAL =====
function openDemoModal() {
  var modal = document.getElementById('demo-modal');
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close').focus();
}
function closeDemoModal() {
  var modal = document.getElementById('demo-modal');
  modal.hidden = true;
  document.body.style.overflow = '';
  // Reset form & success state for next open
  var body = document.getElementById('demo-modal-body');
  var success = document.getElementById('demo-modal-success');
  var form = document.getElementById('demo-form-el');
  if (body) body.style.display = '';
  if (success) success.style.display = 'none';
  if (form) { form.reset(); form.querySelectorAll('[aria-invalid]').forEach(function(el){ el.removeAttribute('aria-invalid'); }); }
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { var m = document.getElementById('demo-modal'); if (m && !m.hidden) closeDemoModal(); }
});

// ===== PAGE ROUTING =====
function showPage(name) {
  document.querySelectorAll('.page-view').forEach(function(p) { p.classList.remove('active'); });
  var el = document.getElementById('page-' + name);
  if (el) { el.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  document.querySelectorAll('.nav-links a').forEach(function(a) { a.removeAttribute('aria-current'); });
  if (name === 'home') {
    var n = document.getElementById('nav-home');
    if (n) n.setAttribute('aria-current', 'page');
  }
}

// ===== NAV TOGGLE =====
function toggleNav() {
  var btn = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  var cta = document.querySelector('.nav-cta');
  var open = links.classList.toggle('open');
  cta.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
function closeNav() {
  document.getElementById('nav-links').classList.remove('open');
  document.querySelector('.nav-cta').classList.remove('open');
  document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
}

// ===== YOUTUBE EMBED =====
function loadYoutube(el) {
  var id = el.getAttribute('data-youtube-id');
  if (!id || id.startsWith('YOUTUBE_')) {
    alert('Video link will be added soon. Please check back or contact us.');
    return;
  }
  var iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
  iframe.frameBorder = '0';
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.title = el.getAttribute('data-title') || 'Video';
  iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border-radius:inherit;';
  el.style.position = 'relative';
  el.innerHTML = '';
  el.appendChild(iframe);
}

// ===== FORM SUBMISSION =====
document.addEventListener('DOMContentLoaded', function() {
  // Click outside modal to close
  document.getElementById('demo-modal').addEventListener('click', function(e) {
    if (e.target === this) closeDemoModal();
  });

  // Demo modal form
  var demoFormEl = document.getElementById('demo-form-el');
  if (demoFormEl) {
    demoFormEl.addEventListener('submit', function(e) {
      var valid = true;
      demoFormEl.querySelectorAll('[required]').forEach(function(input) {
        if (!input.value.trim()) {
          input.setAttribute('aria-invalid', 'true');
          if (valid) { input.focus(); }
          valid = false;
        } else {
          input.removeAttribute('aria-invalid');
        }
      });
      if (!valid) { e.preventDefault(); return; }
      e.preventDefault();
      var body = document.getElementById('demo-modal-body');
      var success = document.getElementById('demo-modal-success');
      if (demoFormEl.action.indexOf('YOUR_FORMSPREE_ID') > -1) {
        body.style.display = 'none';
        success.style.display = 'block';
        return;
      }
      fetch(demoFormEl.action, {
        method: 'POST',
        body: new FormData(demoFormEl),
        headers: { 'Accept': 'application/json' }
      })
        .then(function(res) {
          if (res.ok) {
            body.style.display = 'none'; success.style.display = 'block';
          } else {
            res.json().then(function(data) {
              console.error('Formspree error:', data);
              alert('Submission failed (' + (data.error || res.status) + '). Please try again or email us directly.');
            }).catch(function() {
              alert('Submission failed (status ' + res.status + '). Please try again.');
            });
          }
        })
        .catch(function(err) {
          console.error('Network error:', err);
          alert('Could not reach the server. Please check your connection and try again.');
        });
    });
  }

  var formEl = document.getElementById('contact-form-el');
  if (formEl) {
    formEl.addEventListener('submit', function(e) {
      var valid = true;
      formEl.querySelectorAll('[required]').forEach(function(input) {
        if (!input.value.trim()) {
          input.setAttribute('aria-invalid', 'true');
          if (valid) { input.focus(); }
          valid = false;
        } else {
          input.removeAttribute('aria-invalid');
        }
      });
      if (!valid) { e.preventDefault(); return; }

      if (formEl.action.indexOf('YOUR_FORMSPREE_ID') > -1) {
        e.preventDefault();
        document.getElementById('form-success').style.display = 'block';
        formEl.style.display = 'none';
        return;
      }

      e.preventDefault();
      fetch(formEl.action, {
        method: 'POST',
        body: new FormData(formEl),
        headers: { 'Accept': 'application/json' }
      })
        .then(function(res) {
          if (res.ok) {
            document.getElementById('form-success').style.display = 'block';
            formEl.style.display = 'none';
          } else {
            res.json().then(function(data) {
              console.error('Formspree error:', data);
              alert('Submission failed (' + (data.error || res.status) + '). Please try again or email us directly.');
            }).catch(function() {
              alert('Submission failed (status ' + res.status + '). Please try again.');
            });
          }
        })
        .catch(function(err) {
          console.error('Network error:', err);
          alert('Could not reach the server. Please check your connection and try again.');
        });
    });
  }

  // ===== SCROLL REVEAL =====
  if ('IntersectionObserver' in window) {
    var items = document.querySelectorAll('.card, .testimonial-card, .sdg-badge, .access-card');
    items.forEach(function(el) { el.classList.add('reveal'); });
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(function(el) { obs.observe(el); });
  }
});
