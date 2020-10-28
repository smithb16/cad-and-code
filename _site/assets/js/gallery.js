function activateGallery() {
  let thumbnails = document.querySelectorAll("#gallery-thumbs>figure>img");
  let mainImage = document.querySelector("#gallery-photo>figure>img");
  let mainImageCaption = document.querySelector(
    "#gallery-photo>figure>figcaption"
  );

  thumbnails.forEach(function (thumbnail) {
    thumbnail.addEventListener("click", function () {
      // set clicked image as main image.
      mainImage.setAttribute("src", thumbnail.src);
      mainImageCaption.innerHTML = thumbnail.dataset.caption;

      // change which image is current
      let currentClass = "current-thumb";
      document.querySelector("." + currentClass).classList.remove(currentClass);
      thumbnail.parentNode.classList.add(currentClass);
    });
  });
}
