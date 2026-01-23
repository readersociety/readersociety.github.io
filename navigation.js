// js/navigation.js

import { state } from "./state.js";

export function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");
  const sidebar = document.getElementById("sidebar");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const target = link.dataset.section;
      if (!target) return;

      // Update state
      state.currentSection = target;

      // Hide all sections
      sections.forEach(section =>
        section.classList.remove("active")
      );

      // Show target section
      const activeSection = document.getElementById(target);
      if (activeSection) {
        activeSection.classList.add("active");
      }

      // Update nav active state
      navLinks.forEach(l =>
        l.classList.remove("active")
      );
      link.classList.add("active");

      // Close sidebar on mobile
      sidebar.classList.remove("open");
    });
  });
}

export function initSidebarToggle() {
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  openBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
}
