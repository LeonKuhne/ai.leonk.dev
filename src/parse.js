// create a parser for mustache substitution
export const mustache = (template, data) => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => data[key])
}

