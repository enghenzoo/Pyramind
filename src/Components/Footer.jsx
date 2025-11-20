import React from "react";
import "./Footer.css";

// Footer component displayed at the bottom of the website
function Footer() {
  return (
    // Footer element styled with CSS classes and centered text
    <footer className="text-center py-3 text-white site-footer">
      {/* Display the current year dynamically */}
      &copy; {new Date().getFullYear()} PyraMind. All rights reserved.
    </footer>
  );
}

export default Footer;
