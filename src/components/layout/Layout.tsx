import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingButtons from "../ui/FloatingButtons";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-lato text-gray-800 bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
