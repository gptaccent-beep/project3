/* ==========================================================================
   BOUZID - Motion engine
   One tiny vanilla file, zero dependencies. All motion is progressive
   enhancement: without JS everything stays visible and usable.
   ========================================================================== */
(function () {
  'use strict'

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ---------------------------------------------- 1. Scroll-triggered reveal */
  function initReveal() {
    var items = document.querySelectorAll('.reveal, .reveal-scale, .img-reveal, .split')
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in') })
      return
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return
          var el = e.target
          var delay = parseInt(el.getAttribute('data-delay') || '0', 10)
          setTimeout(function () { el.classList.add('is-in') }, delay)
          io.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -14% 0px' }
    )
    items.forEach(function (el) { io.observe(el) })
  }

  /* ------------------------------------------------ 2. Text split animation */
  var WORD_SPLIT = new RegExp('(\\s+)')

  function initSplit() {
    document.querySelectorAll('.split').forEach(function (el) {
      if (el.dataset.split === 'done') return
      var source = document.createElement('div')
      source.innerHTML = el.innerHTML
      var i = 0
      function walk(node, target) {
        Array.prototype.slice.call(node.childNodes).forEach(function (child) {
          if (child.nodeType === 3) {
            child.textContent.split(WORD_SPLIT).forEach(function (chunk) {
              if (!chunk.trim()) {
                var gap = document.createElement('span')
                gap.className = 'word-space'
                gap.textContent = chunk
                target.appendChild(gap)
                return
              }
              var word = document.createElement('span')
              word.className = 'word'
              var inner = document.createElement('span')
              inner.style.setProperty('--i', i++)
              inner.textContent = chunk
              word.appendChild(inner)
              target.appendChild(word)
            })
          } else if (child.nodeName === 'BR') {
            target.appendChild(child.cloneNode())
          } else {
            var clone = child.cloneNode(false)
            target.appendChild(clone)
            walk(child, clone)
          }
        })
      }
      var out = document.createElement('div')
      walk(source, out)
      el.innerHTML = out.innerHTML
      el.dataset.split = 'done'
    })
  }

  /* ------------------------------------------------------ 3. Sticky nav state */
  function initNav() {
    var nav = document.querySelector('.nav')
    if (!nav) return
    var onScroll = function () { nav.classList.toggle('is-stuck', window.scrollY > 40) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    var toggle = nav.querySelector('.nav-toggle')
    if (!toggle) return
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open')
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
    })
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open')
        toggle.setAttribute('aria-expanded', 'false')
      })
    })
  }

  /* ------------------------------------------------------ 4. Magnetic buttons */
  function initMagnetic() {
    if (reduced || window.matchMedia('(hover: none)').matches) return
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect()
        var mx = ((e.clientX - r.left) / r.width - 0.5) * 9
        var my = ((e.clientY - r.top) / r.height - 0.5) * 7
        btn.style.setProperty('--mx', mx.toFixed(2) + 'px')
        btn.style.setProperty('--my', my.toFixed(2) + 'px')
      })
      btn.addEventListener('mouseleave', function () {
        btn.style.setProperty('--mx', '0px')
        btn.style.setProperty('--my', '0px')
      })
    })
  }

  /* ---------------------------------------------------- 5. 3D product cards */
  function initCards3d() {
    if (reduced || window.matchMedia('(hover: none)').matches) return
    document.querySelectorAll('.card-3d').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect()
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 8
        var rx = -((e.clientY - r.top) / r.height - 0.5) * 6.5
        card.style.setProperty('--ry', ry.toFixed(2) + 'deg')
        card.style.setProperty('--rx', rx.toFixed(2) + 'deg')
      })
      card.addEventListener('mouseleave', function () {
        card.style.setProperty('--ry', '0deg')
        card.style.setProperty('--rx', '0deg')
      })
    })
  }

  /* --------------------------------------------------------- 6. Parallax */
  function initParallax() {
    if (reduced) return
    var layers = document.querySelectorAll('[data-parallax]')
    if (!layers.length) return
    var ticking = false
    function frame() {
      var vh = window.innerHeight
      layers.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.24
        var r = el.getBoundingClientRect()
        var progress = (r.top + r.height / 2 - vh / 2) / vh
        el.style.transform = 'translate3d(0,' + (progress * speed * 100).toFixed(2) + 'px,0)'
      })
      ticking = false
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(frame) }
    }, { passive: true })
    frame()
  }

  /* ------------------------------------------- 7. Hero particles and bees */
  function beeSvg() {
    return '<svg viewBox="0 0 40 30" aria-hidden="true">' +
      '<ellipse class="wing" cx="17" cy="9" rx="9" ry="5" fill="#f6efe6" opacity=".5"/>' +
      '<ellipse class="wing" cx="24" cy="9" rx="8" ry="4.5" fill="#f6efe6" opacity=".38"/>' +
      '<ellipse cx="22" cy="17" rx="11" ry="7" fill="#3d2f28"/>' +
      '<path d="M17 11.5c3 1.6 3 9.4 0 11" stroke="#e79b72" stroke-width="3.4" fill="none"/>' +
      '<path d="M24 11c3 1.8 3 9.6 0 11.4" stroke="#d4794e" stroke-width="3" fill="none"/>' +
      '<circle cx="32" cy="15" r="3.4" fill="#2a1f1a"/>' +
      '</svg>'
  }

  function initParticles() {
    var host = document.querySelector('.particles')
    if (!host || reduced) return
    var count = window.innerWidth < 720 ? 10 : 22
    var html = ''
    for (var i = 0; i < count; i++) {
      var size = (3 + Math.random() * 6).toFixed(1)
      html += '<span class="particle" style="left:' + (Math.random() * 100).toFixed(2) + '%;' +
        'width:' + size + 'px;height:' + size + 'px;' +
        '--dx:' + (Math.random() * 90 - 45).toFixed(0) + 'px;' +
        'animation-duration:' + (15 + Math.random() * 14).toFixed(1) + 's;' +
        'animation-delay:-' + (Math.random() * 22).toFixed(1) + 's;' +
        'opacity:' + (0.35 + Math.random() * 0.5).toFixed(2) + '"></span>'
    }
    var bee = beeSvg()
    html += '<span class="bee" style="left:13%;top:24%;animation-duration:26s">' + bee + '</span>' +
      '<span class="bee" style="left:62%;top:64%;width:18px;animation-duration:34s;animation-delay:-9s;opacity:.75">' + bee + '</span>'
    host.innerHTML = html
  }

  /* ---------------------------------------------- 8. Story timeline steps */
  function initTimeline() {
    var steps = Array.prototype.slice.call(document.querySelectorAll('.step'))
    var bar = document.querySelector('.timeline-progress')
    if (!steps.length) return

    function activate(idx) {
      steps.forEach(function (s, i) { s.classList.toggle('is-active', i === idx) })
      if (bar) bar.style.setProperty('--p', ((idx + 1) / steps.length) * 100 + '%')
    }

    steps.forEach(function (s, i) {
      s.setAttribute('tabindex', '0')
      s.setAttribute('role', 'button')
      s.addEventListener('click', function () { activate(i) })
      s.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(i) }
      })
    })
    activate(0)

    if (reduced || !('IntersectionObserver' in window)) {
      steps.forEach(function (s) { s.classList.add('is-active') })
      return
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) activate(steps.indexOf(e.target))
      })
    }, { threshold: 0.55 })
    steps.forEach(function (s) { io.observe(s) })
  }

  /* -------------------------------------------------- 9. Testimonial slider */
  function initSlider() {
    var track = document.querySelector('.slides')
    if (!track) return
    function step() {
      var first = track.querySelector('.slide')
      return first ? first.getBoundingClientRect().width + 22 : 320
    }
    var prev = document.querySelector('[data-slide="prev"]')
    var next = document.querySelector('[data-slide="next"]')
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }) })
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }) })
  }

  /* -------------------------------------------------- 10. Count-up numbers */
  function initCounters() {
    var nums = document.querySelectorAll('[data-count]')
    if (!nums.length) return
    if (reduced || !('IntersectionObserver' in window)) {
      nums.forEach(function (n) {
        n.textContent = n.getAttribute('data-count') + (n.getAttribute('data-suffix') || '')
      })
      return
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return
        var el = e.target
        var target = parseFloat(el.getAttribute('data-count'))
        var suffix = el.getAttribute('data-suffix') || ''
        var t0 = performance.now()
        function tick(now) {
          var p = Math.min((now - t0) / 2600, 1)
          var v = target * (1 - Math.pow(1 - p, 4))
          el.textContent = (target % 1 ? v.toFixed(1) : Math.round(v)) + suffix
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        io.unobserve(el)
      })
    }, { threshold: 0.5 })
    nums.forEach(function (n) { io.observe(n) })
  }

  function boot() {
    initSplit()
    initReveal()
    initNav()
    initMagnetic()
    initCards3d()
    initParallax()
    initParticles()
    initTimeline()
    initSlider()
    initCounters()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
