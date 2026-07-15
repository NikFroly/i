let highlightCard = showcase.querySelector(".highlight");

function swapViewNavigator() {
  let button = document.querySelector(".toggle"),
    nav = document.querySelector("nav");

  button.disabled = true;

  if (button.classList.contains("active")) {
    button.classList.remove("active");
    nav.classList.remove("active");
  } else {
    button.classList.add("active");
    nav.classList.add("active");
  }

  button.disabled = false;
}

function resetCard() {
  let card = document.querySelector(".revert");

  card.classList.remove("revert");
  card.style.transform = "";
  document.body.style.setProperty("overflow", "auto");
}

function revertCard(event) {
  const outFrontCard = event.target.closest(".card_front")
    ? event.target.classList.contains("card_front")
    : true;
  let card = event.target.closest(".card");

  if (card && outFrontCard) {
    if (highlightCard) {
      highlightCard.classList.remove("highlight");
      highlightCard = null;
    }

    if (card.classList.contains("revert")) {
      resetCard();
      window.removeEventListener("resize", resetCard);
    } else {
      const cardRect = card.getBoundingClientRect(),
        windowMiddleX = document.documentElement.clientWidth * 0.5,
        windowMiddleY = document.documentElement.clientHeight * 0.5,
        cardMiddleX = cardRect.width * 0.5 + cardRect.left,
        cardMiddleY = cardRect.height * 0.5 + cardRect.top,
        shiftX = windowMiddleX - cardMiddleX,
        shiftY = windowMiddleY - cardMiddleY,
        scaleVal = getComputedStyle(document.documentElement).getPropertyValue("--card-scale");

      card.classList.add("revert");
      card.style.transform = `
        rotateY(180deg)
        scale(${scaleVal})
        translate(${-shiftX / scaleVal}px, ${shiftY / scaleVal}px)
      `;
      document.body.style.setProperty("overflow", "hidden", "important");
      window.addEventListener("resize", resetCard, { once: true });
    }
  }
}

function initTetroPreview() {
  const frame = showcase.querySelector(".project_link");

  frame.onclick = (event) => {
    event.preventDefault();
    window.open("https://codepen.io/NikFroly/full/MYJGVEp", "_blank");
  }
}

initTetroPreview();