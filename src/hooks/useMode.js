import store from "@/store/appStore";

export const useMode = () => {
  const mode = store.state.settings.listSettings?.mode;
  const html = document.querySelector("html");
  if (mode) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
};
