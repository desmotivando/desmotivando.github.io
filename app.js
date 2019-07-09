async function getPhrases() {
  const response = await fetch("/data/phrases.json");

  return response.json();
}

async function getBooks() {
  const response = await fetch("/data/books.json");

  return response.json();
}

async function getRandomPhrase() {
  const phrases = await getPhrases();

  return phrases[Math.floor(Math.random() * phrases.length)];
}

async function getTextToShare(phrase) {
  return `"${phrase.join(" ")}" - https://desmotivando.com.br`;
}

function setHrefOnTwitterLink(textToShare) {
  const twitterLink = document.querySelector("main .share-twitter");

  twitterLink.setAttribute(
    "href",
    `https://twitter.com/intent/tweet/?text=${encodeURIComponent(textToShare)}`
  );
}

async function renderPhrase() {
  const phrase = await getRandomPhrase();

  setHrefOnTwitterLink(await getTextToShare(phrase));

  const target = document.querySelector("main article");
  target.innerHTML = "";

  phrase.forEach(sentence => {
    const p = document.createElement("p");
    const text = document.createTextNode(sentence);

    p.appendChild(text);
    target.appendChild(p);
  });
}

async function renderBooks() {
  const books = await getBooks();

  const BooksElement = document.getElementById("Books");
  books.forEach(book => {
    const link = document.createElement("a");
    link.setAttribute("href", book.href);
    link.setAttribute("target", "_blank");

    const img = document.createElement("img");
    img.setAttribute("src", book.img);

    link.appendChild(img);

    BooksElement.appendChild(link);
  });
}

function toggleModal() {
  document.getElementById("Modal").classList.toggle("show");
}

function addListeners() {
  document.getElementById("BtnNo").onclick = renderPhrase;
  document.getElementById("BtnYes").onclick = toggleModal;
  document.getElementById("BtnCloseModal").onclick = toggleModal;

  window.onclick = ({ target }) => {
    if (target.id === "Modal") {
      toggleModal();
    }
  };
}

function start() {
  renderPhrase();
  renderBooks();
  addListeners();
}

start();
