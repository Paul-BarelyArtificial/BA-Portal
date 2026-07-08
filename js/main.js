/*
==================================================
BA Portal
Version : v0.1.7
Release : Book a Session
Date    : 08 July 2026
==================================================
*/

const buttons = document.querySelectorAll(".nav-button");
const pages = document.querySelectorAll(".page");

function showPage(target) {
    buttons.forEach((button) => button.classList.remove("active"));
    pages.forEach((page) => page.classList.remove("active"));

    document
        .querySelector(`[data-page="${target}"]`)
        ?.classList.add("active");

    document
        .getElementById(target)
        ?.classList.add("active");
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        showPage(button.dataset.page);
    });
});

// ---------- Dashboard Card Navigation ----------

const dashboardCards = document.querySelectorAll("[data-page-link]");

dashboardCards.forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
        showPage(card.dataset.pageLink);
    });
});

// ---------- Page Buttons ----------

const pageButtons = document.querySelectorAll("[data-target-page]");

pageButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        showPage(button.dataset.targetPage);
    });
});

// ---------- Book a Session ----------

const calendlyUrl = "https://calendly.com/paul-barelyartificial/new-meeting";

const sessions = [
    {
        icon: "🎓",
        title: "Training Session",
        description: "Book time to go through the portal, documents, or AI tools.",
        duration: "30 minutes",
        location: "Online",
        calendlyUrl,
        enabled: true
    },
    {
        icon: "💡",
        title: "AI Advice",
        description: "Talk through a practical business problem or AI idea.",
        duration: "30 minutes",
        location: "Online",
        calendlyUrl,
        enabled: true
    },
    {
        icon: "🚀",
        title: "Project / Strategy Session",
        description: "Discuss a new project, improvement, or next step.",
        duration: "30 minutes",
        location: "Online",
        calendlyUrl,
        enabled: true
    }
];

function openCalendly(url) {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
        window.Calendly.initPopupWidget({ url });
    } else {
        window.open(url, "_blank", "noopener,noreferrer");
    }
}

function renderSessions() {
    const sessionList = document.getElementById("session-list");

    if (!sessionList) {
        return;
    }

    sessionList.innerHTML = "";

    sessions.forEach((session) => {
        const card = document.createElement("div");
        card.className = session.enabled ? "card session-card" : "card session-card muted";

        const buttonHtml = session.enabled
            ? '<button type="button" class="session-button">Book Session</button>'
            : '<span class="badge">Coming Soon</span>';

        card.innerHTML = `
            <h3>${session.icon} ${session.title}</h3>
            <p>${session.description}</p>
            <div class="session-meta">
                <span>${session.duration}</span>
                <span>${session.location}</span>
            </div>
            ${buttonHtml}
        `;

        if (session.enabled) {
            card.querySelector("button").addEventListener("click", () => {
                openCalendly(session.calendlyUrl);
            });
        }

        sessionList.appendChild(card);
    });
}

renderSessions();

// ---------- Version Display ----------

const versionElement = document.querySelector(".app-version");

if (versionElement) {
    versionElement.textContent = `${APP_VERSION} – ${RELEASE_NAME}`;
}
