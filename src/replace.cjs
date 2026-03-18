const fs = require('fs');
let file = 'c:/Users/Afonso/Desktop/propostas/-Propose.ly/src/pages/Preview.tsx';
let c = fs.readFileSync(file, 'utf8');

const vars = `  const fontMain = data.fontPairing === 'playfair' ? '"Playfair Display", serif' : data.fontPairing === 'roboto' ? 'Roboto, sans-serif' : '"Inter", sans-serif';
  const fontSecondary = data.fontPairing === 'playfair' ? '"Inter", sans-serif' : data.fontPairing === 'roboto' ? '"Lora", serif' : '"Inter", sans-serif';
  const brandColor = data.brandColor || '#0ba3a3';
  const extras = data.extras || [];`;

c = c.replace('  const extras = data.extras || [];', vars);

c = c.replace(/style=\{\{ transform: \`scale\(\$\{zoom\}\)\` \}\}/g, 
  "style={{ transform: `scale(${zoom})`, '--color-primary': brandColor } as React.CSSProperties}");

// Replace all Inter fonts
c = c.replace(/fontFamily: "'Inter', sans-serif"/g, "fontFamily: fontSecondary");
c = c.replace(/fontFamily: '"Inter", sans-serif'/g, "fontFamily: fontSecondary");

// Replace all Georgia fonts
c = c.replace(/fontFamily: "'Georgia', 'Times New Roman', serif"/g, 'fontFamily: fontMain');

// Replace Layout 2 dark colors
c = c.replace(/bg-\[\#1a2332\]/g, 'bg-primary');
c = c.replace(/text-\[\#1a2332\]/g, 'text-primary');
c = c.replace(/border-\[\#1a2332\]/g, 'border-primary');

// Replace Layout 3 warm colors
c = c.replace(/bg-\[\#f4a261\]/g, 'bg-primary');
c = c.replace(/text-\[\#f4a261\]/g, 'text-primary');
c = c.replace(/border-\[\#f4a261\]/g, 'border-primary');

// Some warm colors are in inline styles
c = c.replace(/backgroundColor: '#f4a261'/g, 'backgroundColor: brandColor');
c = c.replace(/color: '#f4a261'/g, 'color: brandColor');
c = c.replace(/borderBottom: '2px solid #f4a261'/g, 'borderBottom: `2px solid ${brandColor}`');

fs.writeFileSync(file, c);
console.log('Update complete!');
