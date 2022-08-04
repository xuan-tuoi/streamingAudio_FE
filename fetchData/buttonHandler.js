const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const closeModal = $(".comment-closeBtn");
const modal = $(".song-modal");
const commentBtn = $(".song-comment");
const layer = $(".layer");

closeModal.onclick = (e) => {
  modal.classList.remove("active");
};

commentBtn.onclick = (e) => {
  modal.classList.add("active");
};

layer.onclick = (e) => {
  modal.classList.remove("active");
};
