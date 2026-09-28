const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");
const projectDialog = document.querySelector(".project-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogKicker = document.querySelector(".dialog-kicker");
const dialogDescription = document.querySelector("#dialog-description");
let lastProjectTrigger;

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  }
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("is-active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll(".project-card").forEach((card) => {
      card.hidden = category !== "all" && !card.dataset.category.split(" ").includes(category);
    });
  });
});

document.querySelectorAll(".project-link[data-project]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const detail = document.getElementById(link.dataset.project);
    if (!detail || typeof projectDialog.showModal !== "function") return;

    event.preventDefault();
    lastProjectTrigger = link;
    dialogKicker.textContent = detail.querySelector(".eyebrow").textContent;
    dialogTitle.textContent = detail.querySelector("h3").textContent;
    dialogDescription.textContent = detail.querySelector(":scope > div > p").textContent;
    projectDialog.showModal();
  });
});

projectDialog.querySelector(".dialog-close").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  projectDialog.close();
});
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});
projectDialog.addEventListener("close", () => {
  lastProjectTrigger?.focus();
  lastProjectTrigger = null;
});
projectDialog.querySelector(".dialog-back-link").addEventListener("click", () => projectDialog.close());
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectDialog.open) {
    event.preventDefault();
    projectDialog.close();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio inquiry from ${formData.get("name")}`);
  const body = encodeURIComponent(`Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`);
  formNote.textContent = "Opening your email app with your message...";
  window.location.href = `mailto:${contactForm.dataset.recipient}?subject=${subject}&body=${body}`;
});

document.documentElement.classList.add("js-enabled");