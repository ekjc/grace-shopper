export const slugify = text => {
  const a = `àáäâèéëêìíïîòóöôùúüûñ`
  const b = `aaaaeeeeiiiioooouuuun`
  const p = new RegExp(a.split('').join('|'), 'g')

  return text
    .toString()
    .toLowerCase()
    .replace(/<[^>]+>/gi, '')   // replace HTML tags
    .replace(p, c =>
        b.charAt(a.indexOf(c))) // replace special characters
    .replace(/&/g, 'and')       // replace & with 'and'
    .replace(/[^\w\s-]+/g, '-') // replace non-word chars, spaces with dash
    .replace(/ +/g, '-')        // replace multiple spaces with dash
    .replace(/-{2,}/g, '-')     // replace multiple dashes with single dash
    .replace(/^-+|-+$/g, '');   // remove leading and trailing dash
}
