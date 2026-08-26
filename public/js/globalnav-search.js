(function () {
    var nav = document.getElementById('globalnav');
    var item = nav && nav.querySelector('.globalnav-item.globalnav-search');
    if (!item) return;
    var trigger = item.querySelector('.globalnav-link-search');
    var flyout = document.getElementById('globalnav-submenu-search');
    var form = flyout.querySelector('.globalnav-searchfield');
    var input = flyout.querySelector('.globalnav-searchfield-input');
    var resetBtn = flyout.querySelector('.globalnav-searchfield-reset');
    var submitBtn = flyout.querySelector('.globalnav-searchfield-submit');
    var resultsEl = flyout.querySelector('.globalnav-searchresults');
    var countEl = flyout.querySelector('.globalnav-searchresults-count');
    var contentEl = flyout.querySelector('.globalnav-flyout-content');
    var navContent = nav.querySelector('.globalnav-content');
    var curtain = document.getElementById('globalnav-curtain');
    var mqCompact = window.matchMedia('(max-width: 833px)');

    function readCfg() {
        try {
            return JSON.parse(document.getElementById('__ACGH_DATA__').textContent).props.globalNavData.search || {};
        } catch (e) {
            return {};
        }
    }
    var cfg = readCfg();

    function iconSpans(images) {
        return (images || []).map(function (img) {
            return '<span class="globalnav-image-' + img.name + ' globalnav-link-image">' + img.assetInline + '</span>';
        }).join('');
    }

    var defaultTitle = (cfg.defaultLinks && cfg.defaultLinks.title) || 'Quick Links';
    var suggestTitle = (cfg.suggestedLinks && cfg.suggestedLinks.title) || 'Suggested Links';
    var defaultRegion = (cfg.defaultLinks && cfg.defaultLinks.analyticsAttributes || [{ name: 'data-analytics-region', value: 'defaultlinks search' }])
        .map(function (a) { return a.name + '="' + a.value + '"'; }).join(' ');
    var linkIcon = iconSpans(cfg.defaultLinks && cfg.defaultLinks.images);

    var INDEX = [
        { label: 'Events', url: '/events', keywords: 'event fest festival gathering meetup' },
        { label: 'Hackathons', url: '/hackathons', keywords: 'hackathon coding competition build' },
        { label: 'Workshops', url: '/workshops', keywords: 'workshop session seminar training lab' },
        { label: 'Committees', url: '/committees', keywords: 'committee team members core' },
        { label: 'Sports', url: '/sports', keywords: 'sport tournament athletics game match' },
        { label: 'About', url: '/about/', keywords: 'about info information hub tcet' },
        { label: 'Schedule', url: '/schedule/', keywords: 'schedule timetable agenda timing dates' },
        { label: 'Guidelines', url: '/guidelines/', keywords: 'guideline rules regulation policy code of conduct' },
        { label: 'Contact', url: '/contact/', keywords: 'contact email phone address support help' },
        { label: 'Home', url: '/', keywords: 'home overview landing start page' },
        { label: 'Sitemap', url: '/sitemap/', keywords: 'sitemap directory all pages' }
    ];

    var isOpen = false;
    var closeTimer = null;
    var debounceTimer = null;
    var countTimer = null;
    var lastQuery = null;
    var links = [];
    var activeLink = -1;

    function escapeHtml(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }

    function highlightLabel(label, query) {
        if (!query) return escapeHtml(label);
        var idx = label.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return escapeHtml(label);
        return escapeHtml(label.slice(0, idx)) +
            '<span class="globalnav-searchresults-list-text-highlight">' + escapeHtml(label.slice(idx, idx + query.length)) + '</span>' +
            escapeHtml(label.slice(idx + query.length));
    }

    function sectionHtml(title, entries, query, regionAttrs) {
        var lis = entries.map(function (en) {
            return '<li class="globalnav-searchresults-list-item" role="listitem">' +
                '<a class="globalnav-searchresults-list-link" href="' + escapeHtml(en.url) + '">' +
                '<span class="globalnav-searchresults-list-icon">' + linkIcon + '</span>' +
                '<span class="globalnav-searchresults-list-text">' + highlightLabel(en.label, query) + '</span>' +
                '</a></li>';
        }).join('');
        return '<div class="globalnav-searchresults-container" ' + regionAttrs + '>' +
            '<h2 class="globalnav-searchresults-header">' + escapeHtml(title) + '</h2>' +
            '<ul class="globalnav-searchresults-list" role="list">' + lis + '</ul></div>';
    }

    function defaultEntries() {
        return INDEX.slice(0, 9);
    }

    function filterEntries(query) {
        var tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
        var scored = [];
        INDEX.forEach(function (en) {
            var hay = (en.label + ' ' + en.keywords).toLowerCase();
            var match = tokens.every(function (t) { return hay.indexOf(t) !== -1; });
            if (match) scored.push({ entry: en, exact: en.label.toLowerCase().indexOf(tokens[0]) === 0 });
        });
        scored.sort(function (a, b) { return (b.exact - a.exact) || (a.entry.label.localeCompare(b.entry.label)); });
        return scored.map(function (s) { return s.entry; });
    }

    function updateButtons() {
        var hasValue = !!input.value;
        [resetBtn, submitBtn].forEach(function (btn) {
            if (hasValue) {
                btn.setAttribute('tabindex', '0');
                btn.removeAttribute('disabled');
                btn.removeAttribute('aria-hidden');
            } else {
                btn.setAttribute('tabindex', '-1');
                btn.setAttribute('disabled', '');
                btn.setAttribute('aria-hidden', 'true');
            }
        });
    }

    function updateCount(total, title) {
        clearTimeout(countTimer);
        var text;
        if (!total) {
            text = '0 ' + (countEl.getAttribute('data-topnav-searchresults-label') || 'results');
        } else {
            var tpl = countEl.getAttribute('data-topnav-searchresults-single-available') || '{%NUMBER1%} {%HEADING1%} available';
            text = tpl.replace('{%NUMBER1%}', total).replace('{%HEADING1%}', title);
        }
        countTimer = setTimeout(function () {
            countEl.textContent = text;
            setTimeout(function () { countEl.textContent = ''; }, 10000);
        }, 300);
    }

    function setFlyoutHeight() {
        var h = contentEl.offsetHeight;
        var rate = Math.min(480, Math.max(240, h / 2));
        var offset = 0;
        if (item.classList.contains('globalnav-search-no-results')) {
            offset = -(parseInt(getComputedStyle(resultsEl).marginTop, 10) || 0);
        }
        flyout.style.setProperty('--r-globalnav-flyout-height', (h + 44 + offset) + 'px');
        flyout.style.setProperty('--r-globalnav-flyout-rate', rate + 'ms');
        if (navContent) navContent.style.setProperty('--r-globalnav-flyout-rate', rate + 'ms');
    }

    function renderResults(entries, query) {
        lastQuery = query;
        var previous = resultsEl.querySelector('.globalnav-searchresults-current');
        if (previous) {
            previous.classList.remove('globalnav-searchresults-current');
            previous.classList.add('globalnav-searchresults-previous');
        }
        var isDefault = !query;
        var current = document.createElement('div');
        current.className = 'globalnav-searchresults-current';
        if (entries.length) {
            current.innerHTML = sectionHtml(
                isDefault ? defaultTitle : suggestTitle,
                entries,
                query,
                isDefault ? defaultRegion : 'data-analytics-region="suggested links"'
            );
        }
        resultsEl.appendChild(current);
        setTimeout(function () {
            Array.prototype.forEach.call(resultsEl.querySelectorAll('.globalnav-searchresults-previous'), function (el) {
                el.parentNode && el.parentNode.removeChild(el);
            });
        }, 500);

        var animatedItems = current.querySelectorAll('.globalnav-searchresults-header, .globalnav-searchresults-list-item');
        for (var i = 0; i < animatedItems.length; i++) {
            animatedItems[i].style.setProperty('--r-globalnav-flyout-item-number', String(i));
        }
        flyout.style.setProperty('--r-globalnav-flyout-item-total', String(Math.max(0, animatedItems.length - 1)));

        item.classList[input.value.trim().length > 1 ? 'add' : 'remove']('globalnav-search-with-results');
        item.classList[entries.length ? 'remove' : 'add']('globalnav-search-no-results');

        updateCount(entries.length, isDefault ? defaultTitle : suggestTitle);
        links = Array.prototype.slice.call(current.querySelectorAll('.globalnav-searchresults-list-link'));
        activeLink = -1;
        updateButtons();
        if (isOpen) setFlyoutHeight();
    }

    function refresh() {
        var query = input.value.trim();
        if (query === lastQuery) { updateButtons(); return; }
        if (query.length >= 2) {
            renderResults(filterEntries(query), query);
        } else {
            renderResults(defaultEntries(), '');
        }
    }

    function anim(id) {
        var el = document.getElementById(id);
        if (el && typeof el.beginElement === 'function') {
            try { el.beginElement(); } catch (e) {}
        }
    }

    function placeholderText() {
        return mqCompact.matches
            ? ((cfg.input && cfg.input.placeholderTextCompact) || 'Search')
            : ((cfg.input && cfg.input.placeholderTextRegular) || 'Search AAAI Event Hub');
    }

    function openSearch() {
        if (isOpen) return;
        if (nav.classList.contains('globalnav-with-menu-open')) {
            var menuTrigger = document.getElementById('globalnav-menutrigger-button');
            menuTrigger && menuTrigger.click();
        }
        isOpen = true;
        clearTimeout(closeTimer);
        nav.classList.add('globalnav-animating');
        item.classList.add('globalnav-item-flyout-open');
        nav.classList.add('globalnav-with-flyout-open');
        document.documentElement.setAttribute('data-globalnav-flyout-open', 'true');
        trigger.setAttribute('aria-expanded', 'true');
        if (mqCompact.matches) {
            anim('globalnav-anim-menutrigger-bread-top-open');
            anim('globalnav-anim-menutrigger-bread-bottom-open');
        }
        if (lastQuery === null) renderResults(defaultEntries(), '');
        setFlyoutHeight();
        input.placeholder = placeholderText();
        setTimeout(function () { nav.classList.remove('globalnav-animating'); }, 480);
        input.focus();
    }

    function closeSearch(refocus) {
        if (!isOpen) return;
        isOpen = false;
        clearTimeout(debounceTimer);
        clearTimeout(countTimer);
        nav.classList.add('globalnav-with-flyout-closing', 'globalnav-animating');
        item.classList.add('globalnav-item-flyout-closing');
        item.classList.remove('globalnav-item-flyout-open');
        nav.classList.remove('globalnav-with-flyout-open');
        document.documentElement.removeAttribute('data-globalnav-flyout-open');
        trigger.setAttribute('aria-expanded', 'false');
        if (mqCompact.matches) {
            anim('globalnav-anim-menutrigger-bread-top-close');
            anim('globalnav-anim-menutrigger-bread-bottom-close');
        }
        clearTimeout(closeTimer);
        closeTimer = setTimeout(function () {
            nav.classList.remove('globalnav-animating', 'globalnav-with-flyout-closing');
            item.classList.remove('globalnav-item-flyout-closing');
        }, 460);
        if (refocus && item.contains(document.activeElement)) trigger.focus();
    }

    trigger.addEventListener('click', function (e) {
        e.preventDefault();
        if (isOpen) closeSearch(true); else openSearch();
    });

    var menuTrigger = document.getElementById('globalnav-menutrigger-button');
    document.addEventListener('click', function (e) {
        if (isOpen && menuTrigger && (e.target === menuTrigger || menuTrigger.contains(e.target))) {
            closeSearch(false);
            e.stopPropagation();
        }
    }, true);

    if (curtain) curtain.addEventListener('click', function () { closeSearch(false); });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) closeSearch(true);
    });

    document.addEventListener('click', function (e) {
        if (isOpen && !document.getElementById('globalheader').contains(e.target)) closeSearch(false);
    });

    item.addEventListener('focusout', function (e) {
        if (isOpen && e.relatedTarget && !document.getElementById('globalheader').contains(e.relatedTarget)) closeSearch(false);
    });

    window.addEventListener('scroll', function () {
        if (isOpen && !mqCompact.matches) closeSearch(false);
    }, { passive: true });

    input.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(refresh, 150);
    });

    resetBtn.addEventListener('click', function (e) {
        e.preventDefault();
        input.value = '';
        lastQuery = null;
        renderResults(defaultEntries(), '');
        input.focus();
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var target = links[activeLink] || links[0];
        if (target) window.location.assign(target.getAttribute('href'));
    });

    input.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            if (!links.length) return;
            e.preventDefault();
            var delta = e.key === 'ArrowDown' ? 1 : -1;
            activeLink = (activeLink + delta + links.length) % links.length;
            links.forEach(function (l, i) {
                l.classList[i === activeLink ? 'add' : 'remove']('globalnav-searchresults-hover');
            });
        }
    });

    function onLayoutChange() {
        if (isOpen) {
            setFlyoutHeight();
            input.placeholder = placeholderText();
        }
    }
    if (mqCompact.addEventListener) mqCompact.addEventListener('change', onLayoutChange);
    window.addEventListener('resize', onLayoutChange);

    input.placeholder = placeholderText();
    renderResults(defaultEntries(), '');
})();
