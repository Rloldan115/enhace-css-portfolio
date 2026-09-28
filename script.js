const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const dialog = document.querySelector(".project-dialog");
const projects = {
  fieldnotes: {
    title: "Fieldnotes",
    description: "A travel journal concept for people who would rather take the long way. Editorial typography and quiet photography make room for the details of a place.",
    tags: ["Identity", "Art direction", "Web design"]
  },
  "common-ground": {
    title: "Common Ground",
    description: "A considered storefront concept for useful objects made to last. The interface keeps the product story clear and the shopping experience calm.",
    tags: ["E-commerce", "Interface", "Responsive"]
  },
  "soft-forms": {
    title: "Soft Forms",
    description: "A bright visual identity concept for a small creative studio, pairing simple shapes with a flexible digital presence.",
    tags: ["Identity", "Art direction", "Typography"]
  }
};

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

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    dialog.querySelector("#dialog-title").textContent = project.title;
    dialog.querySelector(".dialog-description").textContent = project.description;
    dialog.querySelector(".dialog-tags").replaceChildren(...project.tags.map((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      return element;
    }));
    dialog.showModal();
    document.body.classList.add("dialog-open");
  });
});

dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});