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