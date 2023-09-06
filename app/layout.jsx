import { poppins } from "./fonts";
import "./global.css";
import Navbar from "@/components/Navbar";

const metadata = {
  title: "Mona en Jaune",
  description: "Artist and animal lover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <div className="m-3 flex flex-col items-center">{children}</div>
      </body>
    </html>
  );
}
