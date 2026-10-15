import { Antonio, Fredoka, Geist, Geist_Mono, Inter, Montserrat } from "next/font/google";
import localFont from "next/font/local";


export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const myFont = localFont({
  src: "../../public/fonts/myFont.ttf",
  display: "swap",
  variable: "--font-myfont",
});

export const gambero = localFont({
  src: "../../public/fonts/gambero.otf",
  display: "swap",
  variable: "--font-gambero",
});

export const bahnschrift = localFont({
  src: "../../public/fonts/BAHNSCHRIFT.ttf",
  display: "swap",
  variable: "--font-bahn",
});

export const montserrat = Montserrat({
    variable: "--font-mont",
    subsets: ["latin"]
})

export const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
});