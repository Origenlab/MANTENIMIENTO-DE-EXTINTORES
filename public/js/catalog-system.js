(function () {
  'use strict';

  var WHATSAPP_NUMBER = '5215614612594';
  var PAGE_SIZE = 12;

  function normalise(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function initialiseCatalog() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-catalog-card]'));
    if (!cards.length) return;

    var controls = {
      query: document.getElementById('catalog-search'),
      group: document.getElementById('catalog-group'),
      agent: document.getElementById('catalog-agent'),
      fireClass: document.getElementById('catalog-fire-class'),
      availability: document.getElementById('catalog-availability'),
    };
    var resultCount = document.getElementById('catalog-result-count');
    var resultRange = document.getElementById('catalog-range');
    var resultsContainer = document.getElementById('catalog-results');
    var pagination = document.getElementById('catalog-pagination');
    var activeFilterCount = document.getElementById('catalog-active-filter-count');
    var emptyState = document.getElementById('catalog-empty');
    var clearButton = document.getElementById('catalog-clear');
    var mobileToggle = document.querySelector('.catalog-filter-toggle');
    var filterPanel = document.getElementById('catalog-filter-panel');
    var filterSidebar = filterPanel ? filterPanel.closest('.catalog-sidebar') : null;
    var params = new URLSearchParams(window.location.search);
    var requestedPage = Number.parseInt(params.get('pagina'), 10);
    var currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

    setControlValue(controls.query, params.get('q') || '');
    setControlValue(controls.group, params.get('tipo') || 'all');
    setControlValue(controls.agent, params.get('agente') || 'all');
    setControlValue(controls.fireClass, params.get('clase') || 'all');
    setControlValue(controls.availability, params.get('disponibilidad') || 'all');

    function setControlValue(control, value) {
      if (!control) return;
      if (control.tagName === 'SELECT') {
        var validOption = Array.prototype.some.call(control.options, function (option) {
          return option.value === value;
        });
        control.value = validOption ? value : 'all';
        return;
      }
      control.value = value;
    }

    function readFilters() {
      return {
        query: controls.query ? normalise(controls.query.value) : '',
        group: controls.group ? controls.group.value : 'all',
        agent: controls.agent ? controls.agent.value : 'all',
        fireClass: controls.fireClass ? controls.fireClass.value : 'all',
        availability: controls.availability ? controls.availability.value : 'all',
      };
    }

    function updateUrl(filters, page) {
      var url = new URL(window.location.href);
      var values = {
        q: filters.query,
        tipo: filters.group,
        agente: filters.agent,
        clase: filters.fireClass,
        disponibilidad: filters.availability,
      };

      Object.keys(values).forEach(function (key) {
        var value = values[key];
        if (!value || value === 'all') url.searchParams.delete(key);
        else url.searchParams.set(key, value);
      });

      if (page > 1) url.searchParams.set('pagina', String(page));
      else url.searchParams.delete('pagina');

      window.history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + url.hash);
    }

    function getPaginationItems(page, pageCount) {
      if (pageCount <= 7) {
        return Array.from({ length: pageCount }, function (_, index) { return index + 1; });
      }

      var pages = [1, pageCount, page - 1, page, page + 1]
        .filter(function (value) { return value >= 1 && value <= pageCount; })
        .filter(function (value, index, values) { return values.indexOf(value) === index; })
        .sort(function (a, b) { return a - b; });
      var items = [];

      pages.forEach(function (value, index) {
        if (index > 0 && value - pages[index - 1] > 1) items.push('ellipsis-' + index);
        items.push(value);
      });

      return items;
    }

    function scrollToResults() {
      if (!resultsContainer) return;
      resultsContainer.scrollIntoView({ behavior: 'auto', block: 'start' });
    }

    function renderPagination(pageCount) {
      if (!pagination) return;
      pagination.textContent = '';
      pagination.hidden = pageCount <= 1;
      if (pageCount <= 1) return;

      function addPageButton(label, page, options) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = options.className || 'catalog-pagination__page';
        button.textContent = label;
        button.disabled = Boolean(options.disabled);
        button.setAttribute('aria-label', options.ariaLabel);
        if (options.current) button.setAttribute('aria-current', 'page');
        button.addEventListener('click', function () {
          currentPage = page;
          applyFilters({ scroll: true });
        });
        pagination.appendChild(button);
      }

      addPageButton('Anterior', currentPage - 1, {
        className: 'catalog-pagination__direction',
        disabled: currentPage === 1,
        ariaLabel: 'Ir a la página anterior',
      });

      var pageList = document.createElement('div');
      pageList.className = 'catalog-pagination__pages';
      getPaginationItems(currentPage, pageCount).forEach(function (item) {
        if (typeof item === 'string') {
          var ellipsis = document.createElement('span');
          ellipsis.className = 'catalog-pagination__ellipsis';
          ellipsis.textContent = '…';
          ellipsis.setAttribute('aria-hidden', 'true');
          pageList.appendChild(ellipsis);
          return;
        }

        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'catalog-pagination__page';
        button.textContent = String(item);
        button.setAttribute('aria-label', 'Ir a la página ' + item);
        if (item === currentPage) button.setAttribute('aria-current', 'page');
        button.addEventListener('click', function () {
          currentPage = item;
          applyFilters({ scroll: true });
        });
        pageList.appendChild(button);
      });
      pagination.appendChild(pageList);

      addPageButton('Siguiente', currentPage + 1, {
        className: 'catalog-pagination__direction',
        disabled: currentPage === pageCount,
        ariaLabel: 'Ir a la página siguiente',
      });
    }

    function updateActiveFilterCount(filters) {
      if (!activeFilterCount) return;
      var count = [filters.query, filters.group, filters.agent, filters.fireClass, filters.availability]
        .filter(function (value) { return Boolean(value) && value !== 'all'; }).length;
      activeFilterCount.textContent = String(count);
      activeFilterCount.hidden = count === 0;
    }

    function applyFilters(options) {
      options = options || {};
      var filters = readFilters();
      var matchingCards = [];

      if (options.resetPage) currentPage = 1;

      cards.forEach(function (card) {
        var classes = (card.dataset.fireClasses || '').split(',').filter(Boolean);
        var matches = true;

        if (filters.group !== 'all' && card.dataset.group !== filters.group) matches = false;
        if (filters.agent !== 'all' && normalise(card.dataset.agent) !== normalise(filters.agent)) matches = false;
        if (filters.fireClass !== 'all' && classes.indexOf(filters.fireClass) === -1) matches = false;
        if (filters.availability !== 'all' && card.dataset.availability !== filters.availability) matches = false;
        if (filters.query && normalise(card.dataset.search).indexOf(filters.query) === -1) matches = false;

        card.hidden = true;
        if (matches) matchingCards.push(card);
      });

      var total = matchingCards.length;
      var pageCount = total ? Math.ceil(total / PAGE_SIZE) : 0;
      currentPage = pageCount ? Math.min(Math.max(currentPage, 1), pageCount) : 1;
      var startIndex = (currentPage - 1) * PAGE_SIZE;
      var visibleCards = matchingCards.slice(startIndex, startIndex + PAGE_SIZE);
      visibleCards.forEach(function (card) { card.hidden = false; });

      var rangeStart = total ? startIndex + 1 : 0;
      var rangeEnd = total ? startIndex + visibleCards.length : 0;
      if (resultCount) resultCount.textContent = String(total);
      if (resultRange) {
        resultRange.textContent = total
          ? 'Mostrando ' + rangeStart + '–' + rangeEnd + ' de ' + total + ' productos'
          : 'No hay productos que coincidan con estos filtros';
      }
      if (emptyState) emptyState.hidden = total !== 0;
      updateActiveFilterCount(filters);
      renderPagination(pageCount);
      updateUrl(filters, currentPage);
      if (options.scroll) scrollToResults();
    }

    var inputFrame = 0;
    if (controls.query) {
      controls.query.addEventListener('input', function () {
        window.cancelAnimationFrame(inputFrame);
        inputFrame = window.requestAnimationFrame(function () {
          applyFilters({ resetPage: true });
        });
      });
    }

    [controls.group, controls.agent, controls.fireClass, controls.availability].forEach(function (control) {
      if (control) control.addEventListener('change', function () {
        applyFilters({ resetPage: true });
      });
    });

    document.querySelectorAll('[data-catalog-preset]').forEach(function (preset) {
      preset.addEventListener('click', function () {
        setControlValue(controls.query, preset.dataset.query || '');
        setControlValue(controls.group, preset.dataset.group || 'all');
        setControlValue(controls.agent, preset.dataset.agent || 'all');
        setControlValue(controls.fireClass, preset.dataset.fireClass || 'all');
        setControlValue(controls.availability, preset.dataset.availability || 'all');
        applyFilters({ resetPage: true, scroll: true });

        if (filterPanel) filterPanel.classList.remove('is-open');
        if (filterSidebar) filterSidebar.classList.remove('is-open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    function clearFilters() {
      setControlValue(controls.query, '');
      setControlValue(controls.group, 'all');
      setControlValue(controls.agent, 'all');
      setControlValue(controls.fireClass, 'all');
      setControlValue(controls.availability, 'all');
      applyFilters({ resetPage: true });
      if (controls.query) controls.query.focus();
    }

    if (clearButton) clearButton.addEventListener('click', clearFilters);
    document.querySelectorAll('[data-clear-catalog]').forEach(function (button) {
      button.addEventListener('click', clearFilters);
    });

    if (mobileToggle && filterPanel) {
      mobileToggle.addEventListener('click', function () {
        var isOpen = filterPanel.classList.toggle('is-open');
        if (filterSidebar) filterSidebar.classList.toggle('is-open', isOpen);
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
      });
    }

    cards.forEach(function (card) {
      var image = card.querySelector('img');
      if (!image) return;
      image.addEventListener('error', function () {
        if (image.dataset.fallbackApplied) return;
        image.dataset.fallbackApplied = 'true';
        image.src = '/img/img-index/extintor.avif';
      });
    });

    applyFilters();
  }

  function initialiseQuoteForm() {
    var form = document.getElementById('catalog-quote-form');
    var productField = document.getElementById('quote-product');
    var variantField = document.getElementById('quote-variant');
    var errorMessage = document.getElementById('quote-form-error');
    if (!form || !productField) return;

    function ensureProductOption(value) {
      var exists = Array.prototype.some.call(productField.options, function (option) {
        return option.value === value;
      });

      if (!exists) {
        var option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        productField.appendChild(option);
      }
    }

    document.querySelectorAll('[data-quote-product]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        var product = link.getAttribute('data-quote-product') || '';
        var variants = link.getAttribute('data-quote-variant') || '';

        ensureProductOption(product);
        productField.value = product;
        if (variantField) {
          variantField.value = '';
          variantField.placeholder = variants ? 'Disponibles: ' + variants : 'Indica la variante requerida';
        }

        form.scrollIntoView({ behavior: 'auto', block: 'center' });
        window.setTimeout(function () {
          if (variantField && variants) variantField.focus();
          else productField.focus();
        }, 450);
      });
    });

    function setValidationState() {
      var invalid = Array.prototype.slice.call(form.querySelectorAll(':invalid'));
      form.querySelectorAll('[aria-invalid="true"]').forEach(function (field) {
        field.removeAttribute('aria-invalid');
      });
      invalid.forEach(function (field) {
        field.setAttribute('aria-invalid', 'true');
      });
      return invalid;
    }

    form.addEventListener('input', function (event) {
      if (event.target && event.target.removeAttribute) event.target.removeAttribute('aria-invalid');
      if (errorMessage) errorMessage.hidden = true;
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var invalid = setValidationState();

      if (invalid.length) {
        if (errorMessage) {
          errorMessage.textContent = 'Completa los campos obligatorios y acepta el aviso de privacidad.';
          errorMessage.hidden = false;
        }
        invalid[0].focus();
        return;
      }

      var data = new FormData(form);
      var message = buildQuoteMessage({
        product: data.get('product'),
        variant: data.get('variant'),
        quantity: data.get('quantity'),
        sector: data.get('sector'),
        location: data.get('location'),
        services: data.getAll('services'),
        name: data.get('name'),
        company: data.get('company'),
        phone: data.get('phone'),
        email: data.get('email'),
        details: data.get('details'),
      });
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  function buildQuoteMessage(fields) {
    var labels = [
      ['product', 'Producto o familia'],
      ['variant', 'Capacidad o variante'],
      ['quantity', 'Cantidad'],
      ['sector', 'Sector o inmueble'],
      ['location', 'Ubicación'],
      ['services', 'Servicios adicionales'],
      ['name', 'Nombre'],
      ['company', 'Empresa'],
      ['phone', 'Teléfono o WhatsApp'],
      ['email', 'Correo'],
      ['details', 'Detalle del riesgo'],
    ];
    var lines = ['Hola, solicito una cotización desde el catálogo MANEXT.', ''];

    labels.forEach(function (entry) {
      var value = fields[entry[0]];
      if (Array.isArray(value)) value = value.filter(Boolean).join(', ');
      if (String(value || '').trim()) lines.push(entry[1] + ': ' + String(value).trim());
    });

    lines.push('', 'Agradezco su asesoría técnica para confirmar la selección.');
    return lines.join('\n');
  }

  document.addEventListener('DOMContentLoaded', function () {
    initialiseCatalog();
    initialiseQuoteForm();
  });
})();
