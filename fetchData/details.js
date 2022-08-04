const componentCloseBtn = document.querySelector(".close-btn");
const componentLayer = document.querySelector(".component_layer");
const barIcon = document.querySelector(".bar-icon");

componentCloseBtn.onclick = (e) => {
  componentLayer.classList.remove("active");
};

barIcon.onclick = (e) => {
  componentLayer.classList.add("active");
};
