import type { NextApiRequest, NextApiResponse } from 'next';

const API_SPEC = {
  info: {
    title: 'Movies App API',
    version: '1.0.0',
    description: 'REST API for the Movies application. Proxies requests to the TMDB mock backend.',
  },
  baseUrl: '/api',
  endpoints: [
    {
      method: 'GET',
      path: '/api/genres',
      summary: 'List all movie genres',
      params: [],
      example: '/api/genres',
    },
    {
      method: 'GET',
      path: '/api/movies/search',
      summary: 'Search movies by title',
      params: [
        { name: 'query', type: 'string', required: true, description: 'Search term' },
        { name: 'page', type: 'number', required: false, description: 'Page number (default 1)' },
      ],
      example: '/api/movies/search?query=batman&page=1',
    },
    {
      method: 'GET',
      path: '/api/movies/discover',
      summary: 'Discover movies by genre, cast, or sort order',
      params: [
        { name: 'with_genres', type: 'string', required: false, description: 'Genre ID to filter by' },
        { name: 'with_cast', type: 'string', required: false, description: 'Person ID to filter by cast' },
        { name: 'page', type: 'number', required: false, description: 'Page number (default 1)' },
        { name: 'sort_by', type: 'string', required: false, description: 'Sort field (e.g. popularity.desc)' },
      ],
      example: '/api/movies/discover?with_genres=28&page=1&sort_by=popularity.desc',
    },
    {
      method: 'GET',
      path: '/api/movies/{id}',
      summary: 'Get movie details (or static category: popular, top_rated, upcoming, now_playing)',
      params: [
        { name: 'id', type: 'string', required: true, description: 'Movie ID (number) or category name' },
        { name: 'page', type: 'number', required: false, description: 'Page number (categories only)' },
      ],
      example: '/api/movies/popular?page=1',
    },
    {
      method: 'GET',
      path: '/api/movies/{id}/credits',
      summary: 'Get cast and crew for a movie',
      params: [
        { name: 'id', type: 'string', required: true, description: 'Movie ID' },
      ],
      example: '/api/movies/550/credits',
    },
    {
      method: 'GET',
      path: '/api/movies/{id}/recommendations',
      summary: 'Get recommended movies based on a specific movie',
      params: [
        { name: 'id', type: 'string', required: true, description: 'Movie ID' },
        { name: 'page', type: 'number', required: false, description: 'Page number (default 1)' },
      ],
      example: '/api/movies/550/recommendations?page=1',
    },
    {
      method: 'GET',
      path: '/api/person/{id}',
      summary: 'Get person (actor/director) details',
      params: [
        { name: 'id', type: 'string', required: true, description: 'Person ID' },
      ],
      example: '/api/person/287',
    },
    {
      method: 'GET',
      path: '/api/configuration',
      summary: 'Get TMDB image configuration (base URLs, sizes)',
      params: [],
      example: '/api/configuration',
    },
  ],
};

function renderHTML(): string {
  const endpoints = API_SPEC.endpoints;
  const endpointCards = endpoints.map((ep, i) => `
    <div class="endpoint" id="ep-${i}">
      <div class="endpoint-header" onclick="toggle(${i})">
        <span class="method">${ep.method}</span>
        <span class="path">${ep.path}</span>
        <span class="summary">${ep.summary}</span>
        <span class="chevron" id="chevron-${i}">&#9660;</span>
      </div>
      <div class="endpoint-body" id="body-${i}">
        ${ep.params.length > 0 ? `
        <h4>Parameters</h4>
        <table>
          <thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            ${ep.params.map(p => `
              <tr>
                <td><code>${p.name}</code></td>
                <td>${p.type}</td>
                <td>${p.required ? '<span class="badge required">required</span>' : '<span class="badge optional">optional</span>'}</td>
                <td>${p.description}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>` : '<p class="no-params">No parameters</p>'}
        <h4>Try it</h4>
        <div class="try-it">
          <input type="text" id="url-${i}" value="${ep.example}" />
          <button onclick="tryIt(${i})">Execute</button>
        </div>
        <div class="response-area" id="response-area-${i}" style="display:none">
          <div class="response-header">
            <h4>Response</h4>
            <span class="status-badge" id="status-${i}"></span>
          </div>
          <pre id="response-${i}"></pre>
        </div>
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Movies API</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #fafafa; color: #3b4151; }
    .header { background: #2d3748; color: white; padding: 24px 32px; }
    .header h1 { font-size: 28px; font-weight: 700; }
    .header p { margin-top: 6px; color: #a0aec0; font-size: 14px; }
    .header .version { display: inline-block; background: #48bb78; color: white; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-left: 12px; vertical-align: middle; }
    .container { max-width: 960px; margin: 24px auto; padding: 0 16px; }
    .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #718096; margin: 24px 0 8px; }
    .endpoint { background: white; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 8px; overflow: hidden; transition: box-shadow 0.15s; }
    .endpoint:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .endpoint-header { display: flex; align-items: center; padding: 12px 16px; cursor: pointer; gap: 12px; user-select: none; }
    .method { background: #48bb78; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 700; min-width: 44px; text-align: center; flex-shrink: 0; }
    .path { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 14px; font-weight: 600; color: #2d3748; flex-shrink: 0; }
    .summary { color: #718096; font-size: 13px; flex: 1; }
    .chevron { color: #a0aec0; font-size: 10px; transition: transform 0.2s; flex-shrink: 0; }
    .chevron.open { transform: rotate(180deg); }
    .endpoint-body { display: none; padding: 0 16px 16px; border-top: 1px solid #edf2f7; }
    .endpoint-body.open { display: block; }
    .endpoint-body h4 { font-size: 13px; font-weight: 600; color: #4a5568; margin: 16px 0 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { text-align: left; padding: 8px 12px; background: #f7fafc; border-bottom: 2px solid #e2e8f0; font-weight: 600; color: #4a5568; }
    td { padding: 8px 12px; border-bottom: 1px solid #edf2f7; }
    td code { background: #edf2f7; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
    .badge { padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600; }
    .badge.required { background: #fed7d7; color: #c53030; }
    .badge.optional { background: #e2e8f0; color: #718096; }
    .no-params { color: #a0aec0; font-size: 13px; font-style: italic; margin: 8px 0; }
    .try-it { display: flex; gap: 8px; }
    .try-it input { flex: 1; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; }
    .try-it input:focus { outline: none; border-color: #4299e1; box-shadow: 0 0 0 3px rgba(66,153,225,0.15); }
    .try-it button { background: #4299e1; color: white; border: none; padding: 8px 20px; border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.15s; }
    .try-it button:hover { background: #3182ce; }
    .response-area { margin-top: 12px; }
    .response-header { display: flex; align-items: center; gap: 12px; }
    .status-badge { padding: 2px 10px; border-radius: 10px; font-size: 12px; font-weight: 700; }
    .status-ok { background: #c6f6d5; color: #276749; }
    .status-err { background: #fed7d7; color: #c53030; }
    pre { background: #1a202c; color: #e2e8f0; padding: 16px; border-radius: 6px; overflow-x: auto; font-size: 12px; line-height: 1.6; max-height: 400px; overflow-y: auto; margin-top: 8px; }
    .footer { text-align: center; padding: 32px; color: #a0aec0; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Movies API <span class="version">v1.0.0</span></h1>
    <p>REST API for the Movies application &mdash; proxies to the TMDB mock backend</p>
  </div>
  <div class="container">
    <div class="section-title">Endpoints</div>
    ${endpointCards}
  </div>
  <div class="footer">Movies App API &bull; localhost:3000/api</div>
  <script>
    function toggle(i) {
      const body = document.getElementById('body-' + i);
      const chevron = document.getElementById('chevron-' + i);
      body.classList.toggle('open');
      chevron.classList.toggle('open');
    }
    async function tryIt(i) {
      const url = document.getElementById('url-' + i).value;
      const responseArea = document.getElementById('response-area-' + i);
      const responseEl = document.getElementById('response-' + i);
      const statusEl = document.getElementById('status-' + i);
      responseArea.style.display = 'block';
      responseEl.textContent = 'Loading...';
      statusEl.textContent = '';
      statusEl.className = 'status-badge';
      try {
        const res = await fetch(url);
        const data = await res.json();
        responseEl.textContent = JSON.stringify(data, null, 2);
        statusEl.textContent = res.status + ' ' + res.statusText;
        statusEl.classList.add(res.ok ? 'status-ok' : 'status-err');
      } catch (err) {
        responseEl.textContent = err.message;
        statusEl.textContent = 'Error';
        statusEl.classList.add('status-err');
      }
    }
  </script>
</body>
</html>`;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.accept?.includes('application/json')) {
    return res.status(200).json(API_SPEC);
  }
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(renderHTML());
}
