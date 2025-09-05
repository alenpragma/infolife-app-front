

import Cookies from "js-cookie";

export async function handleLogout() {
  try {


    Cookies.remove("infolife");
    Cookies.remove("role");

    // 4. Redirect
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed:", error);
    Cookies.remove("role");
    Cookies.remove("infolife");
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  }
}
