/**
 * LUMYLA — theme behaviour.
 *
 * The React build ships these as hooks and context; here they are plain DOM
 * modules so the theme stays dependency free. Each block is isolated and exits
 * quietly when its markup is absent.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------------------------
     1. Sticky header state
     ------------------------------------------------------------------------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var syncHeader = function () {
      header.classList.toggle('is-stuck', window.scrollY > 18);
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  /* -------------------------------------------------------------------------
     2. Mobile drawer
     ------------------------------------------------------------------------- */
  var drawer = document.querySelector('[data-drawer]');
  var drawerTriggers = document.querySelectorAll('[data-drawer-open]');
  var drawerClosers = document.querySelectorAll('[data-drawer-close]');

  var setDrawer = function (open) {
    if (!drawer) return;
    drawer.setAttribute('data-open', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    drawerTriggers.forEach(function (trigger) {
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    if (open) {
      var first = drawer.querySelector('a, button');
      if (first) window.setTimeout(function () { first.focus(); }, 60);
    }
  };

  drawerTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () { setDrawer(true); });
  });
  drawerClosers.forEach(function (closer) {
    closer.addEventListener('click', function () { setDrawer(false); });
  });

  /* -------------------------------------------------------------------------
     3. Search overlay
     ------------------------------------------------------------------------- */
  var search = document.querySelector('[data-search-dialog]');
  var searchOpeners = document.querySelectorAll('[data-search-open]');
  var searchClosers = document.querySelectorAll('[data-search-close]');

  var setSearch = function (open) {
    if (!search) return;
    search.setAttribute('data-open', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      var input = search.querySelector('input[type="search"]');
      if (input) window.setTimeout(function () { input.focus(); }, 60);
    }
  };

  searchOpeners.forEach(function (opener) {
    opener.addEventListener('click', function () {
      setDrawer(false);
      setSearch(true);
    });
  });
  searchClosers.forEach(function (closer) {
    closer.addEventListener('click', function () { setSearch(false); });
  });
  if (search) {
    search.addEventListener('click', function (event) {
      if (event.target === search) setSearch(false);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setDrawer(false);
      setSearch(false);
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      setSearch(true);
    }
  });

  /* -------------------------------------------------------------------------
     4. Reveal on scroll
     ------------------------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) {
    /* nothing to do */
  } else if (reduceMotion || typeof IntersectionObserver === 'undefined') {
    reveals.forEach(function (node) { node.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    reveals.forEach(function (node) { observer.observe(node); });
  }

  /* -------------------------------------------------------------------------
     5. FAQ accordion
     ------------------------------------------------------------------------- */
  document.querySelectorAll('[data-accordion]').forEach(function (accordion) {
    accordion.querySelectorAll('.accordion__trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.accordion__item');
        var isOpen = item.getAttribute('data-open') === 'true';

        accordion.querySelectorAll('.accordion__item').forEach(function (other) {
          other.setAttribute('data-open', 'false');
          var otherTrigger = other.querySelector('.accordion__trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          var otherPanel = other.querySelector('.accordion__panel');
          if (otherPanel) otherPanel.setAttribute('aria-hidden', 'true');
        });

        if (!isOpen) {
          item.setAttribute('data-open', 'true');
          trigger.setAttribute('aria-expanded', 'true');
          var panel = item.querySelector('.accordion__panel');
          if (panel) panel.setAttribute('aria-hidden', 'false');
        }
      });
    });
  });

  /* -------------------------------------------------------------------------
     6. Category filters (portfolio + journal)
     ------------------------------------------------------------------------- */
  document.querySelectorAll('[data-filter-group]').forEach(function (bar) {
    var name = bar.getAttribute('data-filter-group');
    var grid = document.querySelector('[data-filter-target="' + name + '"]');
    if (!grid) return;

    bar.querySelectorAll('.filter-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var value = chip.getAttribute('data-filter');

        bar.querySelectorAll('.filter-chip').forEach(function (other) {
          other.setAttribute('aria-pressed', other === chip ? 'true' : 'false');
        });

        grid.querySelectorAll('[data-category]').forEach(function (card) {
          var match = value === 'all' || card.getAttribute('data-category') === value;
          card.hidden = !match;
        });
      });
    });
  });

  /* -------------------------------------------------------------------------
     7. Consultation form: the package field belongs to the SEO service
     ------------------------------------------------------------------------- */
  var serviceSelect = document.querySelector('[data-consult-service]');
  var packageField = document.querySelector('[data-consult-package]');
  if (serviceSelect && packageField) {
    var syncPackage = function () {
      var isSeo = serviceSelect.value === 'seo';
      packageField.style.display = isSeo ? '' : 'none';
      if (!isSeo) {
        var select = packageField.querySelector('select');
        if (select) select.value = '';
      }
    };
    serviceSelect.addEventListener('change', syncPackage);
  }

  /* -------------------------------------------------------------------------
     8. Scroll-driven hero

     The video is never played: it stays paused and only its currentTime moves.
     All timeline work happens inside one requestAnimationFrame loop; the scroll
     handler only wakes that loop. The section starts in its static form and is
     upgraded to the pinned runway once a frame is actually painted, so a slow
     or missing source never leaves a visitor on an empty loader.
     ------------------------------------------------------------------------- */
  var hero = document.querySelector('[data-hero]');
  if (hero && !reduceMotion) {
    var video = hero.querySelector('[data-hero-video]');
    var content = hero.querySelector('[data-hero-content]');
    var cue = hero.querySelector('[data-hero-cue]');
    var loader = hero.querySelector('[data-hero-loader]');
    var stage = hero.querySelector('.hero');
    var saveData = navigator.connection && navigator.connection.saveData === true;

    if (!video || !stage || saveData) {
      /* stays static */
    } else {
      var SMOOTHING = 0.24;
      var SETTLE = 0.012;
      var MIN_STEP = 1 / 60;
      var TEXT_FADE_END = 0.34;
      var CUE_FADE_END = 0.07;

      var start = 0;
      var distance = 1;
      var duration = 0;
      var ready = false;
      var seeded = false;
      var targetTime = 0;
      var paintedTime = 0;
      var lastSeek = -1;
      var frame = 0;
      var lastCopyOpacity = -1;
      var copyHidden = false;
      var pinned = false;

      var clamp01 = function (value) {
        return value < 0 ? 0 : value > 1 ? 1 : value;
      };

      var seek = function (time) {
        var safe = Math.min(Math.max(time, 0), Math.max(0, duration - 0.04));
        if (typeof video.fastSeek === 'function') video.fastSeek(safe);
        else video.currentTime = safe;
        lastSeek = safe;
      };

      var measure = function () {
        start = hero.getBoundingClientRect().top + window.scrollY;
        distance = Math.max(1, hero.offsetHeight - stage.offsetHeight);
      };

      var paintCopy = function (progress) {
        if (content) {
          var p = clamp01(progress / TEXT_FADE_END);
          var eased = p * p * (3 - 2 * p);
          var opacity = 1 - eased;
          if (Math.abs(opacity - lastCopyOpacity) > 0.002) {
            content.style.opacity = opacity.toFixed(3);
            content.style.transform = 'translate3d(0,' + (-26 * eased).toFixed(2) + 'px,0)';
            lastCopyOpacity = opacity;
          }
          var hide = eased >= 0.999;
          if (hide !== copyHidden) {
            copyHidden = hide;
            content.style.visibility = hide ? 'hidden' : '';
            content.style.pointerEvents = hide ? 'none' : '';
          }
        }

        if (cue) {
          var cueOpacity = 1 - clamp01(progress / CUE_FADE_END);
          cue.style.opacity = cueOpacity.toFixed(3);
          cue.style.visibility = cueOpacity <= 0 ? 'hidden' : '';
        }
      };

      var tick = function () {
        frame = 0;
        var progress = clamp01((window.scrollY - start) / distance);
        paintCopy(progress);

        if (!ready) return;

        targetTime = progress * duration;

        if (!seeded) {
          seeded = true;
          paintedTime = targetTime;
          seek(targetTime);
          return;
        }

        if (video.seeking) {
          frame = window.requestAnimationFrame(tick);
          return;
        }

        if (Math.abs(targetTime - paintedTime) <= SETTLE) {
          paintedTime = targetTime;
          if (Math.abs(lastSeek - paintedTime) > MIN_STEP) seek(paintedTime);
          return;
        }

        paintedTime += (targetTime - paintedTime) * SMOOTHING;
        if (Math.abs(paintedTime - lastSeek) >= MIN_STEP) seek(paintedTime);
        frame = window.requestAnimationFrame(tick);
      };

      var wake = function () {
        if (!frame) frame = window.requestAnimationFrame(tick);
      };

      var onMetadata = function () {
        var value = Number.isFinite(video.duration) ? video.duration : 0;
        if (value <= 0) return;
        duration = value;
        ready = true;
        seeded = false;
        wake();
      };

      var onResize = function () {
        measure();
        wake();
      };

      var upgrade = function () {
        if (pinned) return;
        if (!video.videoWidth) return;
        pinned = true;
        hero.classList.remove('hero-scroll--static');
        video.classList.add('is-ready');
        if (loader) loader.classList.add('is-done');
        measure();
        wake();
      };

      /* Phones get the lighter encode so the first frame arrives quickly. */
      var mobile = window.matchMedia('(max-width: 820px)').matches;
      var source = mobile ? video.getAttribute('data-src-mobile') : video.getAttribute('data-src-desktop');
      if (source) {
        video.querySelectorAll('source').forEach(function (node) { node.remove(); });
        video.src = source;
        video.load();
      }

      video.addEventListener('loadeddata', function () {
        onMetadata();
        upgrade();
      });
      video.addEventListener('loadedmetadata', onMetadata);
      video.addEventListener('durationchange', onMetadata);
      video.addEventListener('error', function () {
        hero.classList.add('hero-scroll--static');
      });

      /* Never leave the loader on screen forever on a slow connection. */
      window.setTimeout(function () {
        if (video.readyState < 1) hero.classList.add('hero-scroll--static');
      }, 22000);

      window.addEventListener('scroll', wake, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });
      measure();
      paintCopy(clamp01((window.scrollY - start) / distance));
    }
  }
})();
