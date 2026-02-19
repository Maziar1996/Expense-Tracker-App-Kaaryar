import { useEffect } from "react";
import { createPortal } from "react-dom";

function Portal({ children }) {
  useEffect(() => {
    const portalRoot = document.createElement("div");
    portalRoot.id = "portal-root";
    document.body.appendChild(portalRoot);
    return () => {
      document.body.removeChild(portalRoot);
    };
  }, []);
  const portalContainer =
    document.getElementById("portal-root") || document.body;
  return createPortal(children, portalContainer);
}
export default Portal;
