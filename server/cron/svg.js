import fs from 'fs-extra';
import path from 'path';

const json = fs.readJsonSync(path.join(__dirname, '../../config/test.json'), 'utf8');

const currentDate = new Date(json.startDate);

console.log(`<svg width="675" height="150">`);
for (let i = 0; i < json.countArray.length; i += 1) {
  if (i % 7 === 0) {
    const dx = Math.floor(i / 7) * 12 + 16;
    console.log(`  <g transform="translate(${dx}, 20)">`);
  }

  const data = {
    y: (i % 7) * 12,
    className: json.indexArray[i],
    count: json.countArray[i],
    date: currentDate.toISOString().slice(0, 10),
  };
  const tooltip = data.count ? `data-tip="${data.count} contribution${data.count > 1 && 's'} on ${data.date}" data-for="STATS__tooltip" ` : '';
  currentDate.setDate(currentDate.getDate() + 1);

  console.log(`    <rect y="${data.y}" class="day day_${data.className}" ${tooltip}/>`);
  if ((i + 1) % 7 === 0) {
    console.log('  </g>');
  }
}
if (json.countArray.length % 7) {
  console.log('  </g>');
}

console.log('  <g transform="translate(2, 40)">');
['Mon', 'Wed', 'Fri'].forEach((wday, i) => {
  console.log(`    <text x="0" y="${i * 12}" anchor="start" class="wday">${wday}</text>`);
});
console.log('  </g>');
console.log('  <g transform="translate(0, 10)">');
Object.keys(json.monthText).forEach((month) => {
  console.log(`    <text x="${json.monthText[month]}" y="0" class="month">${month}</text>`);
});
console.log('  </g>');

console.log('  <g transform="translate(0, 108)">');
console.log('    <text y="8"># Includes contributions from <tspan style="font-style:italic;">private</tspan> repositories</text>')
console.log('    <g transform="translate(572, 0)">');
[0, 1, 2, 3, 4].forEach(index => {
  console.log(`      <rect x="${index * 13}" class="day day_${index}" />`);
});
console.log('    </g>');
console.log('    <text x="534" y="10" class="legend">Less</text>');
console.log('    <text x="646" y="10" class="legend">More</text>')
console.log('  </g>');

console.log('</svg>');
