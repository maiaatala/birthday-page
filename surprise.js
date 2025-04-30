
const playAudioBtn = document.getElementById("playAudioBtn");
function playAudio() {
  const sound = document.getElementById("birthdaySound");
  sound.currentTime = 0;
  sound.volume = 0.5;
  sound.play().catch((err) => console.warn("Autoplay blocked:", err));
}

playAudioBtn.addEventListener("click", () => playAudio());

const crawl = document.getElementById("crawl");

crawl.addEventListener("animationend", () => {
  crawl.classList.add("scrollable");
  crawl.parentElement.style.overflow = "auto"; // libera o scroll no container
  crawl.scrollTo({ top: 0, behavior: "smooth" }); // garante que começa do topo
});
