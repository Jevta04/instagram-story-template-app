import { useEffect } from "react";
import kosLogo from "../assets/koslogo.png";

export default function useFavicon() {
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = kosLogo;
    document.title = "Koš Lounge · Story Editor";
  }, []);
}
