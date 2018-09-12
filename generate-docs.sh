#!/usr/bin/env node

const fs = require('fs');
const reactDocs = require('react-docgen');
const docsToMarkdown = require('react-docs-markdown');

const docList = [
  {
    name: 'RadialProgress',
    file: './src/index.js',
    out: './docs/api.md',
  },
];

docList.map(item => {
  var src = fs.readFile(item.file, 'utf8', (err, data) => {
    if (err) throw err;
    let api = reactDocs.parse(data);
    let md = docsToMarkdown(api, item.name);
    fs.writeFile(item.out, md, err => {
      if (err) throw err;
    });
  });
});
