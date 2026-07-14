/*
==================================================
BA Portal
Version : v0.2.6
Release : Live Customer Library
Date    : 13 July 2026
==================================================
*/

const buttons = document.querySelectorAll(".nav-button");
const pages = document.querySelectorAll(".page");

// ---------- Firebase Authentication ----------

const auth = firebase.auth();

const customerProfile = {
    customerName: "Barely Artificial",
    projectName: "AI Customer Portal",
    contactName: "Paul O’Brien",
    accessStatus: "Active",
    accessLevel: "Administrator testing access",
    accessExpiry: "No expiry set",
    projectSummary: "Resources, training and booking are available."
};

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function applyCustomerProfile(user) {
    setText("dashboard-customer-name", customerProfile.customerName);
    setText("dashboard-project-name", customerProfile.projectName);
    setText("dashboard-project-summary", customerProfile.projectSummary);
    setText("account-customer-name", customerProfile.customerName);
    setText("account-project-name", customerProfile.projectName);
    setText("account-contact-name", customerProfile.contactName);
    setText("account-access-status", customerProfile.accessStatus);
    setText("account-access-level", customerProfile.accessLevel);
    setText("account-access-expiry", customerProfile.accessExpiry);
    setText("account-email", user?.email || "—");
}

function unlockPortal(user) {
    document.body.classList.remove("access-locked");
    document.body.classList.add("access-unlocked");
    applyCustomerProfile(user);
    showPage("dashboard");
}

function lockPortal() {
    document.body.classList.add("access-locked");
    document.body.classList.remove("access-unlocked");
}

function friendlyAuthError(error) {
    const messages = {
        "auth/invalid-email": "Enter a valid email address.",
        "auth/invalid-credential": "The email address or password is incorrect.",
        "auth/user-disabled": "This account has been disabled. Please contact Barely Artificial.",
        "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
        "auth/network-request-failed": "The portal could not reach Firebase. Check your internet connection and try again."
    };
    return messages[error?.code] || "Sign-in failed. Please check your details and try again.";
}

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-button");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginError = document.getElementById("login-error");
const loginStatus = document.getElementById("login-status");
const logoutButton = document.getElementById("logout-button");

loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    loginError.hidden = true;
    loginStatus.textContent = "Signing in…";
    loginButton.disabled = true;

    try {
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        await auth.signInWithEmailAndPassword(loginEmail.value.trim(), loginPassword.value);
        loginForm.reset();
    } catch (error) {
        loginError.textContent = friendlyAuthError(error);
        loginError.hidden = false;
        loginStatus.textContent = "";
    } finally {
        loginButton.disabled = false;
    }
});

logoutButton?.addEventListener("click", async () => {
    logoutButton.disabled = true;
    try {
        await auth.signOut();
    } finally {
        logoutButton.disabled = false;
    }
});

auth.onAuthStateChanged((user) => {
    if (user) {
        loginError.hidden = true;
        loginStatus.textContent = "";
        unlockPortal(user);
        loadCustomerLibrary(user);
    } else {
        lockPortal();
        loginStatus.textContent = "Enter your email address and password.";
        loginEmail?.focus();
    }
});

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


// ---------- Live Library ----------

let libraryItems = [];
let currentCustomerId = "";

function escapeHtml(value = "") {
    return String(value).replace(/[&<>\'\"]/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    })[character]);
}

function libraryIcon(item) {
    if (item.itemType === "Link") return "🌐";
    const type = String(item.contentType || item.fileName || "").toLowerCase();
    if (type.includes("pdf")) return "📕";
    if (type.includes("image") || /\.(png|jpg|jpeg|webp)$/.test(type)) return "🖼️";
    if (type.includes("presentation") || /\.(ppt|pptx)$/.test(type)) return "📊";
    return item.category === "Training" ? "📘" : "📄";
}

function createLibraryCard(item) {
    const card = document.createElement("article");
    card.className = "card resource-card";
    card.dataset.searchText = `${item.title} ${item.description || ""} ${item.category || ""}`.toLowerCase();
    const url = item.itemType === "Link" ? item.externalUrl : item.downloadUrl;
    card.innerHTML = `
        <div class="resource-card-header">
            <div class="resource-icon">${libraryIcon(item)}</div>
            <div><h3>${escapeHtml(item.title)}</h3><div class="resource-type">${escapeHtml(item.category || item.itemType || "Library item")}</div></div>
        </div>
        <p>${escapeHtml(item.description || "")}</p>
        <div class="resource-footer">
            <span>Version ${escapeHtml(item.version || "1.0")}</span>
            <button type="button" ${url ? "" : "disabled"}>${item.itemType === "Link" ? "Open Link" : "Open File"}</button>
        </div>`;
    card.querySelector("button").addEventListener("click", () => {
        if (url) window.open(url, "_blank", "noopener,noreferrer");
    });
    return card;
}

function renderLibrary(filterText = "") {
    const groups = document.getElementById("library-groups");
    const empty = document.getElementById("resource-empty");
    if (!groups) return;
    groups.innerHTML = "";
    const filter = filterText.trim().toLowerCase();
    const visible = libraryItems.filter((item) => `${item.title} ${item.description || ""} ${item.category || ""}`.toLowerCase().includes(filter));
    const categoryMap = new Map();
    visible.forEach((item) => {
        const category = item.category || "Other";
        if (!categoryMap.has(category)) categoryMap.set(category, []);
        categoryMap.get(category).push(item);
    });
    [...categoryMap.keys()].sort().forEach((category) => {
        const section = document.createElement("section");
        section.className = "resource-section";
        section.innerHTML = `<h3 class="section-heading">${escapeHtml(category)}</h3><div class="resource-grid"></div>`;
        const grid = section.querySelector(".resource-grid");
        categoryMap.get(category).sort((a,b) => a.title.localeCompare(b.title)).forEach((item) => grid.appendChild(createLibraryCard(item)));
        groups.appendChild(section);
    });
    if (empty) empty.hidden = visible.length > 0;
}

async function loadCustomerLibrary(user) {
    const status = document.getElementById("library-status");
    try {
        const email = String(user.email || "").trim().toLowerCase();
        const accessDoc = await firebase.firestore().collection("customerAccess").doc(email).get();
        if (!accessDoc.exists) {
            libraryItems = [];
            if (status) status.textContent = "Your account is signed in, but it has not yet been linked to a customer.";
            renderLibrary();
            return;
        }
        const access = accessDoc.data() || {};
        currentCustomerId = access.customerId || "";
        if (access.customerName) {
            customerProfile.customerName = access.customerName;
            applyCustomerProfile(user);
        }
        const database = firebase.firestore();
        const [allSnapshot, selectedSnapshot] = await Promise.all([
            database.collection("library").where("visibility", "==", "All Customers").where("status", "==", "Published").get(),
            database.collection("library").where("visibility", "==", "Selected Customers").where("status", "==", "Published").where("customerIds", "array-contains", currentCustomerId).get()
        ]);
        const items = new Map();
        [...allSnapshot.docs, ...selectedSnapshot.docs].forEach((doc) => items.set(doc.id, { id: doc.id, ...doc.data() }));
        libraryItems = [...items.values()];
        if (status) status.textContent = libraryItems.length ? `${libraryItems.length} item${libraryItems.length === 1 ? "" : "s"} available.` : "There are no published items in your library yet.";
        renderLibrary(document.getElementById("resource-search")?.value || "");
    } catch (error) {
        console.error("Could not load customer library", error);
        if (status) status.textContent = "Your library could not be loaded. Check Firebase permissions and indexes.";
    }
}

const resourceSearch = document.getElementById("resource-search");
resourceSearch?.addEventListener("input", () => renderLibrary(resourceSearch.value));

// ---------- Book a Session ----------

const calendlyUrl = "https://calendly.com/paul-barelyartificial/meet-with-barely-artificial";

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
