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
                total: 100,
            }
        });

        loader.style.display = "none";

        if (response.data.hits.length === 0) {
            iziToast.error({
                title: "err",
                message: "not found",
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
            title: "err",
            message: "err",
            position: "topRight",
        });
        console.error("failed", error);
    }
}

export function loadMoreImages() {
    currentPage += 1;
    searchImages(currentQuery, currentPage);
}


loadMoreBtn.addEventListener("click", loadMoreImages);
