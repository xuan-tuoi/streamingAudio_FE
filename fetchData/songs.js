const songsWrap = $(".song-wrap");
const componentCloseBtn = document.querySelector(".close-btn");
const componentLayer = document.querySelector(".component_layer");
const barIcon = document.querySelector(".bar-icon");
var click = 0;

componentCloseBtn.onclick = (e) => {
  componentLayer.classList.remove("active");
};

barIcon.onclick = (e) => {
  componentLayer.classList.add("active");
};

async function getAllSong(slug) {
  const resp = await fetch("https://audiostreaming.glitch.me/songs/" + slug);
  const respData = await resp.json(); //trả data dạng json được chuyển thành JS
  respData.forEach((item) => {
    showAllSong(item);
  });
  const heartIcons = document.querySelectorAll(".song-fav");
  const closeModal = document.querySelector(".comment-closeBtn");
  const modal = document.querySelector(".song-modal");
  const commentBtns = document.querySelectorAll(".song-comment");
  const layer = document.querySelector(".layer");

  heartIcons.forEach((i) => {
    i.onclick = (e) => {
      if (click % 2 === 0) {
        i.style.color = "red";
      } else {
        i.style.color = "#ccc";
      }
      click++;
    };
  });

  closeModal.onclick = (e) => {
    modal.classList.remove("active");
  };
  commentBtns.forEach((comment) => {
    comment.onclick = (e) => {
      modal.classList.add("active");
    };
  });

  layer.onclick = (e) => {
    modal.classList.remove("active");
  };
}

function showAllSong(data) {
  const contentItem = document.createElement("div");
  contentItem.classList.add("song-item");
  contentItem.innerHTML = `
      <div class="song-modal">
        <div class="layer"></div>
        <div class="song-wrap_comment">
            <div class="song_comment-header">
                <h1>Bình luận </h1>
                <i class="fa-solid fa-xmark comment-closeBtn"></i>
            </div>
            <div class="list-comments">
                <div class="comment-item">
                    <img src="https://images.unsplash.com/photo-1653185195282-53725150b71a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="" class="comment-img">
                    <div>
                        <h3>Nguyen Van A</h3>
                        <p>hay thật ấy cho 100đ luôn</p>
                    </div>
                </div>
                <div class="comment-item">
                    <img src="https://images.unsplash.com/photo-1653185024889-c752df3e045c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                        alt="" class="comment-img">
                    <div>
                        <h3>Linh Nguyen</h3>
                        <p>bai hat that tuyet</p>
                    </div>
                </div>
            </div>
            <input type="text" class="comment-input" placeholder="your comment" />
            <i class="fa-solid fa-paper-plane comment-submit"></i>
        </div>
      </div>
      <img src="${data.image}" alt="" />
      <div class="item-wrap">
          <p class="song-title">${data.name}</p>
          <p class="singers">${data.description}</p>
          <audio id="youtube" controls>
              <source src="../public/${data.songURL}" />
          </audio>
          <i class="fa-solid fa-heart song-fav"></i>
          <i class="fa-solid fa-comment song-comment"></i>
        </div>
        
  `;
  songsWrap.append(contentItem);
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
getAllSong(getCookie("slug"));
