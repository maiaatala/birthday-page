const box = document.getElementById("box");
const cssInput = document.getElementById("cssInput");
const styleTag = document.createElement("style");
const sprite = document.getElementById("sprite");
const treasureC = document.getElementById("treasure-container");
const treasure = document.getElementById("treasure");
const skipBtn = document.getElementById("skip-game-btn");
document.head.appendChild(styleTag);

function applyFlexStyles() {
  const cssLines = cssInput.value;
  styleTag.innerHTML = `
    #box {
      ${cssLines}
    }
  `;
  checkAlignment();
}

function checkAlignment() {
  const spriteRect = sprite.getBoundingClientRect();
  const treasureRect = treasureC.getBoundingClientRect();

  const horizontallyOverlapping = spriteRect.right > treasureRect.left;

  const verticallyOverlapping = spriteRect.bottom > treasureRect.top;

  const isOverlapping = horizontallyOverlapping && verticallyOverlapping;
  console.log("Sprite:", spriteRect);
  console.log("Treasure:", treasureRect);
  console.log("Overlap?", isOverlapping);

  if (isOverlapping) {
    openSurprise();
  }
}

function openSurprise() {
  treasure.className = "treasure-open";
  document.getElementById("victory").style.display = "block";
  const sound = document.getElementById("victorySound");
  sound.currentTime = 3.1;
  sound.volume = 0.6;
  sound.play().catch((err) => console.warn("Autoplay blocked:", err));
  const bypass = getCookie("bypass");

  setTimeout(() => {
    if (bypass === "true") {
      console.log("show surprise");
    } else {
      // Blow away the page and embed the autoplaying video
      document.body.innerHTML = `
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/2qBlE2-WL60?autoplay=1&mute=0&controls=0"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    `;
    }
  }, 2000);
}

cssInput.addEventListener("input", () => {
  applyFlexStyles();
});

skipBtn.addEventListener("click", openSurprise);

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}
