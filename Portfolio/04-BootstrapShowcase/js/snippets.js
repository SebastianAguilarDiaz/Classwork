const toastTrigger = document.getElementById("liveToastBtn");
const toastLiveExample = document.getElementById("liveToast");

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger.addEventListener("click", () => {
    toastBootstrap.show();
  });
}
const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {
  if (document.documentElement.getAttribute("data-bs-theme") === "dark") {
    document.documentElement.setAttribute("data-bs-theme", "light");
    themeButton.textContent = "🌙 Dark Mode";
  } else {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    themeButton.textContent = "☀️ Light Mode";
  }
});
