function activateGallery() {
  let galleries = document.querySelectorAll(".project-gallery");
  galleries.forEach(function (gallery) {
    let thumbnails = gallery.querySelectorAll("#gallery-thumbs>figure>img");
    let mainImage = gallery.querySelector("#gallery-photo>figure>img");
    let mainImageCaption = gallery.querySelector(
      "#gallery-photo>figure>figcaption"
    );

    thumbnails.forEach(function (thumbnail) {
      thumbnail.addEventListener("click", function () {
        // set clicked image as main image.
        mainImage.setAttribute("src", thumbnail.src);
        mainImageCaption.innerHTML = thumbnail.dataset.caption;

        // change which image is current
        let currentClass = "current-thumb";
        gallery
          .querySelector("." + currentClass)
          .classList.remove(currentClass);
        thumbnail.parentNode.classList.add(currentClass);
      });
    });
  });
}
