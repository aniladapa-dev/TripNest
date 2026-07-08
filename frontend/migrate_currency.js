import fs from 'fs';
import path from 'path';

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else {
      if (filepath.endsWith('.jsx') || filepath.endsWith('.js')) {
        filelist.push(filepath);
      }
    }
  }
  return filelist;
};

// Simple regex to match $ followed by numbers and commas
const currencyRegex = /\$([0-9,]+)/g;

const files = walkSync(path.join(process.cwd(), 'src'));
let changedFilesCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace occurrences of $1200 with ₹1,200
  // Note: We'll implement a basic formatting function for the numbers
  const newContent = content.replace(currencyRegex, (match, p1) => {
    // p1 is the number part, e.g., "1,200"
    const rawNumber = parseFloat(p1.replace(/,/g, ''));
    if (isNaN(rawNumber)) return match;

    const formattedNumber = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(rawNumber);
    return `₹${formattedNumber}`;
  });

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedFilesCount++;
    console.log(`Updated: ${file}`);
  }
});

console.log(`\nCurrency migration complete. Updated ${changedFilesCount} files.`);
