import { searchImages } from './js/pixabay-api.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector("form");
const gallery = document.querySelector(".gallery");
form.style.width = "300px";
form.style.margin = "0 auto";
gallery.style.display = "flex";
gallery.style.flexWrap = "wrap";
gallery.style.margin = "0 auto";
gallery.style.justifyContent = "center";



form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchValue = form.querySelector('input').value.trim();

    if (searchValue === "") {
        iziToast.error({
            title: "Err.",
            message: "nothing is found",
            position: "topRight"
        });
        return;
    }

    searchImages(searchValue);
    form.querySelector("input").value = "";
});
