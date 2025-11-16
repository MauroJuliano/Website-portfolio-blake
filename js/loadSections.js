export async function loadSection(id, file, callback) {
  const html = await fetch(file).then(res => res.text());
  document.getElementById(id).innerHTML = html;

  if (callback) callback();
}
