const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const contentList = $(".content-list");

var slugsItem = []; // lưu các giá trị của slug
var slugItem; // lấy ra cái slug mà user click vào

async function getAllSinger() {
  const resp = await fetch("https://audiostreaming.glitch.me/");
  const respData = await resp.json(); //trả data dạng json được chuyển thành JS
  respData.forEach((item) => {
    showAllSinger(item);
  });
  const getContents = document.querySelectorAll(".content-item");
  getContents.forEach((i, indx) => {
    i.userData = slugsItem[indx];
    i.onclick = function (e) {
      slugItem = i.userData;
      setCookie("slug", slugItem, 2);
      window.location.href = "./views/songs.html";
    };
  });
}

function showAllSinger(data) {
  slugsItem.push(data.slug);
  const contentItem = document.createElement("div");
  contentItem.classList.add("content__item-wrap");
  contentItem.innerHTML = `
      <a href="#" class="content-item">
        <img src="${data.image}"
            alt="" class="content-img" />
        <div class="content-desc">
            <h1>${data.name}</h1>
            <p>${data.description} </p>
        </div>
      </a>
  `;
  if (contentList) {
    contentList.appendChild(contentItem);
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

getAllSinger();
console.log(slugItem);
