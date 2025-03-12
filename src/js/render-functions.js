import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { searchImage } from "./pixabay-api.js";

const galleryContainer = document.querySelector(".gallery");

export function renderFunctions(image, page) {

    const markup = image.map(img =>

        `<div class="gallery-item">
         <a href = "${img.largeImageURL}" >
         <img src = "${img.webformatURL}" alt="${img.tags}">
         </a>
         <p>Likes: ${img.likes} Views: ${img.views} Comments: ${img.comments} Downloads:${img.downloads}</p>
         </div>`
    ).join("");

    galleryContainer.insertAdjacentHTML("beforeend", markup);


    let lightbox = new SimpleLightbox(".gallery a", { captionsData: "alt", captionDelay: 250 });
    lightbox.refresh();
}