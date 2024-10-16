const accessKey = "XGGlFCn4PUayhojEmTygf0aHccLL7C8_rYSlZrrmVd4";

const formEl = document.querySelector("form");
const inputEl = document.querySelector("#Search-input"); // Use ID selector
const searchResults = document.querySelector(".search-results");
const showMore = document.querySelector("#show-more-button"); // Use ID selector

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        results.forEach((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image";

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description || "View Image";

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;

        if (page > 1) {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; // Reset to page 1 on new search
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
