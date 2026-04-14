const img1 = document.querySelector(".img1");
const img2 = document.querySelector(".img2");
const h1 = document.querySelector("h1");

function play() {
  const r1 = Math.floor(Math.random() * 6) + 1;
  const r2 = Math.floor(Math.random() * 6) + 1;

  if (r1 > r2) h1.innerText = "Player 1 Wins";
  else if (r1 < r2) h1.innerText = "Player 2 Wins";
  else h1.innerText = "Draw";

  const audio = new Audio("./roll.mp3");
  audio.play();

  img1.classList.add("rotate");
  img2.classList.add("rotate");

  setTimeout(() => {
    img1.classList.remove("rotate");
    img2.classList.remove("rotate");
  }, 200);

  img1.setAttribute("src", `/images/dice${r1}.png`);
  img2.setAttribute("src", `/images/dice${r2}.png`);
}

document.addEventListener("keydown", (e) => {
  if (e.key === " ") play();
});
