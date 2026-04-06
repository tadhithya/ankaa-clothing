import { Link } from "react-router-dom";

function Navbar({ dark, setDark }) {
  return (
    <div className="fixed top-0 w-full z-50 bg-white/70 dark:bg-black/70 backdrop-blur-md text-black dark:text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold tracking-widest">
        ANKAA
      </h1>

      <div className="flex items-center gap-8 text-sm">
        <Link to="/">Home</Link>
        <Link to="/products">Collection</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        <button
  onClick={() => setDark((prev) => !prev)}
  className="border px-3 py-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
>
  {dark ? "☀️" : "🌙"}
</button>
      </div>

    </div>
  );
}

export default Navbar;