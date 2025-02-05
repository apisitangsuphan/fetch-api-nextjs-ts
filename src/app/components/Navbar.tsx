import React from "react";
import Link from "next/link";
function Navbar() {
  return (
    <nav className="bg-cyan-400 py-4 text-center">
      <Link href="/" className="text-lg font-bold">
        Attractions
      </Link>
    </nav>
  );
}

export default Navbar;
