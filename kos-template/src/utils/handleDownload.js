import loadHtml2Canvas from "./loadHtml2Canvas.js";

/**
 * @param {{ current: HTMLElement }} previewRef
 * @param {string} title
 * @param {string} day
 * @param {Function} setDownloading
 */
export default async function handleDownload(previewRef, title, day, setDownloading) {
  if (!previewRef.current) return;
  setDownloading(true);
  try {
    const h2c = await loadHtml2Canvas();
    const canvas = await h2c(previewRef.current, {
      scale: 4, useCORS: true, allowTaint: true, backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = `kos-lounge-${title.replace(/\s+/g, "-").toLowerCase()}-${day.toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch {
    alert("Greška. Pokušaj desni klik → Save image.");
  }
  setDownloading(false);
}
