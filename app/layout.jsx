import { Lora, Quattrocento } from "next/font/google";
import "./global.css";
import Navbar from "@/components/Navbar";

export const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const metadata = {
  title: "Mona en Jaune",
  description: "Artist and animal lover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
