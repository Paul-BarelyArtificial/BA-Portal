/*
==================================================
BA Portal
Version : v0.1.1
Release : Library Framework
Date    : 03 July 2026
==================================================
*/

const buttons = document.querySelectorAll(".nav-button");
const pages = document.querySelectorAll(".page");

buttons.forEach((button) => {
    button.addEventListener("click", () => {

        buttons.forEach((b) => b.classList.remove("active"));
        pages.forEach((p) => p.classList.remove("active"));
        button.classList.add("active");
        const page = document.getElementById(button.dataset.page);
        if (page) {
            page.classList.add("active");
        }
    });
});

// ---------- Dashboard Card Navigation ----------

const dashboardCards = document.querySelectorAll("[data-page-link]");

dashboardCards.forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {

        const target = card.dataset.pageLink;

        buttons.forEach((b) => b.classList.remove("active"));
        pages.forEach((p) => p.classList.remove("active"));

        document
            .querySelector(`[data-page="${target}"]`)
            ?.classList.add("active");

        document
            .getElementById(target)
            ?.classList.add("active");
    });
});


// ---------- Version Display ----------

const versionElement = document.querySelector(".app-version");

if (versionElement) {
    versionElement.textContent = APP_VERSION;
}