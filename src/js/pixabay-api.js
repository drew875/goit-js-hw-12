import axios from "axios";

const MY_KEY = "42897935-d12608076f0478c23c9bb15ea";
const BASE_URL = "https://pixabay.com/api/";

export async function searchImage(value, page) {
    try {
        const a = await axios.get(BASE_URL, {
            params: {
                key: MY_KEY,
                q: value,
                safesearch: true,
                page: page,
                per_page: 40,
                image_type: "photo",
                orientation: "horizontal",

            }
        })

        return a.data;

    } catch {
        console.log("error");
    }
}
