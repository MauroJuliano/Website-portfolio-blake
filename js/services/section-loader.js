export async function loadSection(id, file) {
  const container = document.getElementById(id);
  if (!container) throw new Error(`Section container #${id} was not found.`);

  const response = await fetch(file);
  if (!response.ok) {
    throw new Error(`Failed to load ${file}: ${response.status} ${response.statusText}`);
  }

  container.innerHTML = await response.text();
  return container;
}
