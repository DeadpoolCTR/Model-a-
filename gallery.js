const dialog = document.querySelector("dialog");
const pictures = [...document.querySelectorAll(".grid figure")];
const large = document.querySelector("#large");
const caption = document.querySelector("#caption");
let current = 0;
function show(index) {
  current = (index + pictures.length) % pictures.length;
  const figure = pictures[current];
  large.src = figure.querySelector("a").href;
  large.alt = figure.querySelector("img").alt;
  caption.textContent = (current + 1) + " / " + pictures.length + " · " + figure.querySelector("figcaption").innerText;
}
pictures.forEach((figure, index) => {
  figure.querySelector("a").addEventListener("click", event => {
    if (!dialog.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    show(index);
    dialog.showModal();
  });
});
document.querySelector("#close").onclick = () => dialog.close();
document.querySelector("#prev").onclick = () => show(current - 1);
document.querySelector("#next").onclick = () => show(current + 1);
dialog.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    show(current + (event.key === "ArrowLeft" ? -1 : 1));
  }
});
let start;
large.addEventListener("touchstart", event => {
  start = event.touches.length === 1 ? event.touches[0] : null;
}, {passive:true});
large.addEventListener("touchcancel", () => { start = null; });
large.addEventListener("touchend", event => {
  if (!start || event.touches.length) return;
  const end = event.changedTouches[0];
  const dx = end.clientX - start.clientX;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(end.clientY - start.clientY)) show(current + (dx < 0 ? 1 : -1));
  start = null;
}, {passive:true});
