import { searchImages } from './js/pixabay-api.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchButton = document.querySelector(".searchBtn");
const form = document.querySelector("form");

form.style.margin = "0 auto";
form.style.display = "block";
form.style.width = "300px";

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
