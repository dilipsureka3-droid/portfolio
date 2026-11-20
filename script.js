const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Certificate preview modal
const certificateModal = document.getElementById("certificateModal");
const certificateModalTitle = document.getElementById("certificateModalTitle");
const certificateModalBody = document.getElementById("certificateModalBody");
const certificateOpenOriginal = document.getElementById("certificateOpenOriginal");

function closeCertificatePreview() {
  certificateModal.classList.remove("open");
  certificateModal.setAttribute("aria-hidden", "true");
  certificateModalBody.replaceChildren();
  document.body.style.overflow = "";
}

document.querySelectorAll(".certificate-view").forEach((button) => {
  button.addEventListener("click", () => {
    const file = button.dataset.certificate;
    const title = button.dataset.title;
    certificateModalTitle.textContent = title;
    certificateModalBody.replaceChildren();
    certificateOpenOriginal.href = file;

    if (file.toLowerCase().endsWith(".pdf")) {
      const frame = document.createElement("iframe");
      frame.src = file;
      frame.title = title + " certificate PDF";
      certificateModalBody.appendChild(frame);
    } else {
      const image = document.createElement("img");
      image.src = file;
      image.alt = title + " certificate";
      certificateModalBody.appendChild(image);
    }

    certificateModal.classList.add("open");
    certificateModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

document.querySelectorAll("[data-close-certificate]").forEach((element) => {
  element.addEventListener("click", closeCertificatePreview);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && certificateModal.classList.contains("open")) {
    closeCertificatePreview();
  }
});
