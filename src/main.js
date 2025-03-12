import { searchImage } from "./js/pixabay-api.js";
import { renderFunctions } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const a = document.querySelector("form");
const b = document.querySelector(".inputValue")
const loadMoreBtn = document.querySelector(".loadBtn");
const galleryContainer = document.querySelector(".gallery");
galleryContainer.style.display = "flex";
galleryContainer.style.flexWrap = "wrap";
galleryContainer.style.justifyContent = "center";
galleryContainer.style.margin = "0 auto";
galleryContainer.style.gap = "15px";
const loaderImage = document.querySelector(".loader");
const params = { value: "", page: 1, total: 100 };
galleryContainer.style.display = "flex";
galleryContainer.style.flexWrap = "wrap";
loadMoreBtn.style.display = "none";

a.addEventListener("submit", async (e) => {
    e.preventDefault();
    loaderImage.style.display = "inline-block";
    params.value = b.value;
    params.page = 1;
    galleryContainer.innerHTML = "";

    const result = await searchImage(params.value, params.page);
    if (!result || !result.hits.length) {
        iziToast.error({
            title: "err",
            message: "not found",
        })
    }
    renderFunctions(result.hits, params.page);
    loaderImage.style.display = "none";
    params.total = result.totalHits;
    checkLoadMoreBtnStatus();

});

loadMoreBtn.addEventListener("click", async (e) => {
    params.value = b.value;
    params.page += 1;
    checkLoadMoreBtnStatus();
    const result = await searchImage(params.value, params.page);
    renderFunctions(result.hits, params.page);
    scrollPage();
});

function hideLoadBtn() {
    loadMoreBtn.style.display = "none";
}

function showLoadMoreBtn() {
    loadMoreBtn.style.display = "block";
}

function checkLoadMoreBtnStatus() {
    const perPage = 40;
    const maxPage = Math.ceil(params.total / perPage);
    if (params.page >= maxPage) {
        hideLoadBtn();
        iziToast.info({
            title: "info",
            message: "last page"
        });
    } else {
        showLoadMoreBtn();
    }
}

function scrollPage() {
    scrollBy({
        'top': 500,
    })
}