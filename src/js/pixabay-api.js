import axios from "axios";
import { renderGallery } from "./render-function.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const API_KEY = "42897935-d12608076f0478c23c9bb15ea";
const BASE_URL = "https://pixabay.com/api/";
let currentPage = 1;
let currentQuery = "";

const loadMoreBtn = document.querySelector("#load-more");
const form = document.querySelector("#search-form");
const loader = document.querySelector("#loader");

loadMoreBtn.style.display = "none";


export async function searchImages(query, page = 1) {
    if (query !== currentQuery) {
        currentPage = 1;
        currentQuery = query;
        document.querySelector(".gallery").innerHTML = "";
        loadMoreBtn.style.display = "none";
    }

    try {
        loader.style.display = "block";
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: 40,
                page: page,
            }
        });

        loader.style.display = "none";

        if (response.data.hits.length === 0) {
            iziToast.error({
                title: "Ошибка",
                message: "По вашему запросу ничего не найдено.",
                position: "topRight",
            });
            return;
        }

        renderGallery(response.data.hits);
        loadMoreBtn.style.display = "block";
        currentPage = page;
    } catch (error) {
        loader.style.display = "none";
        iziToast.error({
            title: "Ошибка",
            message: "Не удалось загрузить изображения. Попробуйте позже.",
            position: "topRight",
        });
        console.error("Ошибка запроса:", error);
    }
}

export function loadMoreImages() {
    currentPage += 1;
    searchImages(currentQuery, currentPage);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
    if (query) {
        searchImages(query);
    }
});

loadMoreBtn.addEventListener("click", loadMoreImages);
