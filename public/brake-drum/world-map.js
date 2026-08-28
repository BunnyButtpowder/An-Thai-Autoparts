/* <at-world-map> — Pacific-centred Natural Earth world map with animated
   great-circle-ish routes out of Vietnam. Real Natural Earth geometry
   (world-atlas TopoJSON) rendered with d3-geo; nothing is hand-drawn.
   Attributes: land, edge, accent, hub-label, height */
(() => {
  const LIBS = [
    ['https://unpkg.com/d3@7.9.0/dist/d3.min.js', 'sha384-CjloA8y00+1SDAUkjs099PVfnY2KmDC2BZnws9kh8D/lX1s46w6EPhpXdqMfjK6i'],
    ['https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js', 'sha384-Ukv1p/xTma6P4/2bY5KzWBw+ydSpXmhCMtyciIQVDJ1RmOxtCYNMF1uXT9T63H67'],
  ];
  const ATLAS = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json';

  function loadScript(src, integrity) {
    return new Promise((res, rej) => {
      const found = document.querySelector(`script[src="${src}"]`);
      if (found) {
        if (found.dataset.loaded) return res();
        found.addEventListener('load', () => res());
        found.addEventListener('error', rej);
        return;
      }
      const s = document.createElement('script');
      s.src = src; s.integrity = integrity; s.crossOrigin = 'anonymous';
      s.addEventListener('load', () => { s.dataset.loaded = '1'; res(); });
      s.addEventListener('error', rej);
      document.head.appendChild(s);
    });
  }

  let libsPromise = null;
  const libs = () => (libsPromise = libsPromise || (async () => {
    for (const [src, hash] of LIBS) await loadScript(src, hash);
  })());

  let atlasPromise = null;
  const atlas = () => (atlasPromise = atlasPromise || fetch(ATLAS).then(r => r.json()));

  const HUB = { lon: 106.0, lat: 20.9, name: 'VIỆT NAM' };
  const NODES = [
    { lon: -118.24, lat: 34.05, name: 'HOA KỲ', region: 'Mỹ', bend: 0.22, side: -1 },
    { lon: 106.85, lat: -6.21, name: 'ĐÔNG NAM Á', region: 'Đông Nam Á', bend: 0.45, side: -1 },
    { lon: 141.21, lat: -30.87, name: 'ÚC', region: 'Úc', bend: 0.2, side: -1 },
  ];

  // Numeric ISO-3166 codes of the served markets, highlighted in brand red on the
  // map. Đông Nam Á is a cluster, so its member states are all filled.
  const MARKET_ISO = new Set([
    840,                               // Mỹ — Hoa Kỳ
    36,                                // Úc — Australia
    704, 360, 764, 458, 608, 104, 116, 418, 96, 626, // Đông Nam Á cluster
  ]);

  class ATWorldMap extends HTMLElement {
    connectedCallback() {
      if (this._done) return;
      this._done = true;
      this.style.display = 'block';
      this.render();
    }
    async render() {
      const land = this.getAttribute('land') || '#26282c';
      const landActive = this.getAttribute('land-active') || '#8e2020';
      const edge = this.getAttribute('edge') || 'rgba(255,255,255,0.09)';
      const accent = this.getAttribute('accent') || '#f4413f';
      try {
        await libs();
        const topo = await atlas();
        const d3 = window.d3, topojson = window.topojson;
        const W = 1600, H = 820;
        const countries = topojson.feature(topo, topo.objects.countries);
        const projection = d3.geoNaturalEarth1().rotate([-150, 0]).fitExtent([[10, 30], [W - 10, H - 30]], countries);
        const path = d3.geoPath(projection);

        const svg = d3.create('svg')
          .attr('viewBox', `0 0 ${W} ${H}`)
          .attr('width', '100%')
          .attr('style', 'display:block;height:auto;overflow:visible');

        const defs = svg.append('defs');
        const glow = defs.append('filter').attr('id', 'atwm-glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
        glow.append('feGaussianBlur').attr('stdDeviation', '6').attr('result', 'b');
        const m = glow.append('feMerge');
        m.append('feMergeNode').attr('in', 'b');
        m.append('feMergeNode').attr('in', 'SourceGraphic');

        // Near-black charcoal backdrop with a faint centre lift, so the grey land
        // and the red-filled markets carry the contrast.
        const ocean = defs.append('radialGradient').attr('id', 'atwm-ocean').attr('cx', '46%').attr('cy', '32%').attr('r', '92%');
        ocean.append('stop').attr('offset', '0%').attr('stop-color', '#0b0a09');
        ocean.append('stop').attr('offset', '60%').attr('stop-color', '#0b0a09');
        ocean.append('stop').attr('offset', '100%').attr('stop-color', '#0b0a09');
        svg.append('rect').attr('x', 0).attr('y', 0).attr('width', W).attr('height', H).attr('fill', 'url(#atwm-ocean)');

        // Served markets fill in brand red; every other country stays neutral grey.
        svg.append('g').selectAll('path').data(countries.features).join('path')
          .attr('d', path)
          .attr('fill', (f) => (MARKET_ISO.has(+f.id) ? landActive : land))
          .attr('stroke', edge).attr('stroke-width', 0.7);

        svg.append('path').attr('d', path(d3.geoGraticule10()))
          .attr('fill', 'none').attr('stroke', edge).attr('stroke-width', 0.4).attr('opacity', 0.25);

        const [hx, hy] = projection([HUB.lon, HUB.lat]);
        const arcs = svg.append('g').attr('fill', 'none');
        const routeAnims = []; // {node, delay} — started on scroll-into-view, not on render
        NODES.forEach((n, i) => {
          const [x, y] = projection([n.lon, n.lat]);
          const mx = (hx + x) / 2, my = (hy + y) / 2;
          const dx = x - hx, dy = y - hy, len = Math.hypot(dx, dy) || 1;
          const cx = mx + (-dy / len) * len * n.bend * n.side;
          const cy = my + (dx / len) * len * n.bend * n.side;
          const d = `M${hx},${hy} Q${cx},${cy} ${x},${y}`;
          arcs.append('path').attr('d', d).attr('stroke', edge).attr('stroke-width', 1);
          const live = arcs.append('path').attr('id', `atwm-arc-${i}`).attr('d', d)
            .attr('stroke', accent).attr('stroke-width', 1.6).attr('stroke-linecap', 'round');
          const L = live.node().getTotalLength();
          // Draw each route to its market exactly once, then freeze it fully
          // connected (no repeating traversal). Held at `indefinite` and released
          // with a per-route stagger once the map scrolls into view.
          const anim = live.attr('stroke-dasharray', L).attr('stroke-dashoffset', L)
            .attr('filter', 'url(#atwm-glow)')
            .append('animate').attr('attributeName', 'stroke-dashoffset')
            .attr('from', L).attr('to', 0)
            .attr('dur', `${1.5 + i * 0.35}s`).attr('begin', 'indefinite')
            .attr('fill', 'freeze').attr('calcMode', 'spline')
            .attr('keySplines', '0.16 1 0.3 1').attr('keyTimes', '0;1');
          routeAnims.push({ node: anim.node(), delay: 0.4 + i * 0.4 });

          const g = svg.append('g');
          g.append('circle').attr('cx', x).attr('cy', y).attr('r', 16).attr('fill', '#ffffff').attr('opacity', 0.1);
          g.append('circle').attr('cx', x).attr('cy', y).attr('r', 4.5).attr('fill', '#ffffff');
          g.append('circle').attr('cx', x).attr('cy', y).attr('r', 4.5).attr('fill', 'none')
            .attr('stroke', '#ffffff').attr('stroke-width', 1.2)
            .call(s => {
              s.append('animate').attr('attributeName', 'r').attr('from', 5).attr('to', 26).attr('dur', '2.6s').attr('begin', `${i * 0.3}s`).attr('repeatCount', 'indefinite');
              s.append('animate').attr('attributeName', 'opacity').attr('from', 0.7).attr('to', 0).attr('dur', '2.6s').attr('begin', `${i * 0.3}s`).attr('repeatCount', 'indefinite');
            });
          g.append('text').attr('x', x + 14).attr('y', y - 12).text(n.name)
            .attr('fill', 'rgba(255,255,255,0.72)').attr('font-size', 17)
            .attr('font-family', 'ui-monospace, SFMono-Regular, Menlo, monospace')
            .attr('letter-spacing', '0.14em');
        });

        const hub = svg.append('g');
        hub.append('rect').attr('x', hx - 13).attr('y', hy - 13).attr('width', 26).attr('height', 26)
          .attr('fill', 'none').attr('stroke', accent).attr('stroke-width', 1.4);
        hub.append('circle').attr('cx', hx).attr('cy', hy).attr('r', 6).attr('fill', accent).attr('filter', 'url(#atwm-glow)');
        hub.append('text').attr('x', hx).attr('y', hy - 26).attr('text-anchor', 'middle')
          .text(this.getAttribute('hub-label') || 'AN THÁI · VIỆT NAM')
          .attr('fill', '#fff').attr('font-size', 20).attr('font-weight', 600)
          .attr('font-family', 'ui-monospace, SFMono-Regular, Menlo, monospace')
          .attr('letter-spacing', '0.2em');

        this.innerHTML = '';
        this.appendChild(svg.node());

        // Release the route-draw animations only when the map enters the viewport.
        const runRoutes = () => routeAnims.forEach((a) => {
          try { a.node.beginElementAt(a.delay); } catch (_) { /* SMIL unsupported */ }
        });
        if ('IntersectionObserver' in window) {
          const io = new IntersectionObserver((entries, obs) => {
            if (entries.some((e) => e.isIntersecting)) { runRoutes(); obs.disconnect(); }
          }, { threshold: 0.35 });
          io.observe(this);
        } else {
          runRoutes();
        }
      } catch (e) {
        this.innerHTML = '<div style="padding:48px;text-align:center;font:14px ui-monospace,monospace;color:rgba(255,255,255,.5)">Không tải được dữ liệu bản đồ</div>';
        console.error('[at-world-map]', e);
      }
    }
  }
  if (!customElements.get('at-world-map')) customElements.define('at-world-map', ATWorldMap);
})();
