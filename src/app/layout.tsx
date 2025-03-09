import type {Metadata} from "next";

import {GeistSans} from "geist/font/sans";
import "../global.css";

export const metadata: Metadata = {
  title: "CanChancy",
  description: "CanChancy application",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html className={`${GeistSans.variable} dark`} lang="en">
      <body>
        <header className="shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">CanChancy</h1>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        <footer className="mt-auto shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} CanChancy. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
