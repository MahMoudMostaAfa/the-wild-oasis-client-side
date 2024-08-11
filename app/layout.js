import Header from "./_components/Header";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationsProvider } from "./_contexts/ReservationsContext";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
// console.log(josefin);
export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "The Wild Oasis is a place for all things nature., cabins , camping, hiking, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} relative bg-primary-950 text-primary-50 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1   sm:px-8 sm:py-12 grid">
          <ReservationsProvider>
            <main className="max-w-7xl mx-auto w-full">{children}</main>
          </ReservationsProvider>
        </div>
      </body>
    </html>
  );
}
