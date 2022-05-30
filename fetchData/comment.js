const swiperWrapper = $(".swiper-wrapper");
var usernameInp = $(".review__name");
var imageInp = $(".review__image");
var reviewCommentInp = $(".review__textarea");
var button = $(".review__btn");

var swiperComment = new Swiper(".review__content", {
  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

async function getAllComment() {
  const resp = await fetch("https://audiostreaming.glitch.me/comment");
  const respData = await resp.json(); //trả data dạng json được chuyển thành JS
  // const randomMeal = respData.meals[0];
  console.log(respData);
  swiperWrapper.html("");
  respData.forEach((item) => {
    showAllComment(item);
    swiperComment.update();
  });
}
function showAllComment(data) {
  const commentItem = document.createElement("div");
  commentItem.classList.add("swiper-slide");
  commentItem.classList.add("review__item");
  commentItem.innerHTML = `
        <img src="${data.image}" alt="" class="review__img" />
                                <h1>${data.user}</h1>
                                <p>${data.content}</p> 
                                <span>${data.createdAt}
                                </span> 
    
    `;
  swiperWrapper.append(commentItem);
}

function storeComment() {
  const user = usernameInp.val();
  const image = imageInp.val();
  const content = reviewCommentInp.val();

  $.post(
    "http://localhost:3000/comment/store",
    { user: user, image: image, content: content },
    function (data) {
      if ("thanh cong") {
        getAllComment();
        //reset
        usernameInp.val("");
        imageInp.val("");
        reviewCommentInp.val("");
      }
    }
  );
}

button.onclick = (e) => {
  storeComment();
};

getAllComment();
