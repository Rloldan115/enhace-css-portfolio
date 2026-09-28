const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

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

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio inquiry from ${formData.get("name")}`);
  const body = encodeURIComponent(`Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`);
  formNote.textContent = "Opening your email app with your message...";
  window.location.href = `mailto:${contactForm.dataset.recipient}?subject=${subject}&body=${body}`;
});