import { Outlet } from "react-router";
// import Dropdown from "./components/Dropdown";
import Navbar from "./components/Navbar";
// import useTheme from "./hooks/useTheme";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* <Dropdown />
      <div>
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
        <button onClick={() => setTheme("system")}>System</button>
      </div>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle
      </button> */}
    </>
  );
}

export default App;
