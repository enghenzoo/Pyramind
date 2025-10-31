import React from "react";
import "./Footer.css";

function Footer() {
return (
    <footer className="text-center py-3 text-white site-footer">
    &copy; {new Date().getFullYear()} PyraMind. All rights reserved.
    </footer>
);
}

export default Footer;