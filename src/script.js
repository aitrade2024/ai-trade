import startApp from './app';
import { initEngine } from './render/init';

const setsArray = [
  [
    { dirección: 'ICP / USD', resultado: 'short', activo: 35.71 },
    { dirección: 'GMX / USD', resultado: 'short', activo: 7.83 },
    { dirección: 'AXS / USD', resultado: 'short', activo: -302.28 },
    { dirección: 'BTC / USD', resultado: 'short', activo: 24.31 },
    { dirección: 'APT / USD', resultado: 'short', activo: 2173.02 },
  ],
  [
    { dirección: 'ETH / USD', resultado: 'short', activo: -156.45 },
    { dirección: 'SOL / USD', resultado: 'short', activo: 89.52 },
    { dirección: 'LTC / USD', resultado: 'short', activo: 15.76 },
    { dirección: 'DOT / USD', resultado: 'short', activo: 301.10 },
    { dirección: 'ADA / USD', resultado: 'short', activo: 42.18 },
  ],
  [
    { dirección: 'XRP / USD', resultado: 'short', activo: -73.89 },
    { dirección: 'DOGE / USD', resultado: 'short', activo: 2.50 },
    { dirección: 'LINK / USD', resultado: 'short', activo: 150.05 },
    { dirección: 'BNB / USD', resultado: 'short', activo: -92.65 },
    { dirección: 'UNI / USD', resultado: 'short', activo: 10.29 },
  ],
  [
    { dirección: 'MATIC / USD', resultado: 'short', activo: 68.90 },
    { dirección: 'XLM / USD', resultado: 'short', activo: 0.34 },
    { dirección: 'AVAX / USD', resultado: 'short', activo: 98.75 },
    { dirección: 'FIL / USD', resultado: 'short', activo: -43.20 },
    { dirección: 'XTZ / USD', resultado: 'short', activo: 5.67 },
  ],
  [
    { dirección: 'ALGO / USD', resultado: 'short', activo: 18.40 },
    { dirección: 'ATOM / USD', resultado: 'short', activo: -11.75 },
    { dirección: 'VET / USD', resultado: 'short', activo: 0.10 },
    { dirección: 'TRX / USD', resultado: 'short', activo: 0.05 },
    { dirección: 'XMR / USD', resultado: 'short', activo: -102.80 },
  ]
];

const tableContainer = document.getElementById('tableContainer');
let currentIndex = 0;

function renderTable() {
  const currentSet = setsArray[currentIndex];

  tableContainer.innerHTML = '';

  const headerRow = document.createElement('div');
  headerRow.className = 'table__row';
  headerRow.innerHTML = '<p class="table__cell">Activo</p><p class="table__cell">Dirección</p><p class="table__cell">Resultado</p>';
  tableContainer.appendChild(headerRow);

  currentSet.forEach(item => {
    const row = document.createElement('div');
    row.className = 'table__row';
    row.innerHTML = `<p class="table__cell">${item.dirección}</p><p class="table__cell">${item.resultado}</p><p class="table__cell ${item.activo < 0 ? 'table__cell_red' : 'table__cell_green'}">${item.activo}</p>`;
    tableContainer.appendChild(row);
  });

  currentIndex = (currentIndex + 1) % setsArray.length;
}

renderTable();

setInterval(renderTable, 2000);

(async () => {
  const containerElement = document.getElementById('canvasContainer');
  await initEngine(containerElement)
  startApp()
})();
