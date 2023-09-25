const fs = require('fs');
const path = require('path');

function updateImports(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      updateImports(filePath);
    } else if (filePath.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf-8');

      // Regex to find import statements and append .js
      content = content.replace(/from ['"]([^'"]+)['"]/g, (match, p1) => {
        if (p1.startsWith('.') && !p1.endsWith('.js')) {
          return `from '${p1}.js'`;
        }
        return match;
      });

      fs.writeFileSync(filePath, content);
    }
  }
}

// Starting directory
updateImports('./build');
