---
to: "<%= h.packageDir(org, name) %>/src/index.ts"
---
export * from './<%= h.filename(name) %>'
export * from './<%= h.filename(`use-${name}`) %>'