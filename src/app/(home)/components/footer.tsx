"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const products = ["Features", "Pricing", "Integrations", "Updates"];

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 dark:border-[1px] dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-400">HR</span>
              <span className="text-2xl font-bold text-white">Connect</span>
            </div>
            <p className="text-gray-400 text-base">
              Simplifying HR management for businesses of all sizes. Streamline
              your HR processes and focus on what matters most—your people.
            </p>
            <div className="flex space-x-6">
              {["facebook", "twitter", "instagram", "linkedin"].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
                  </a>
                )
              )}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Product
                </h3>
                <ul className="mt-4 space-y-4">
                  {products.map(
                    (item) => (
                      <li key={item}>
                        <Link
                          href={`${
                            item == "Integrations" || item == "Updates"
                              ? `/${item.toLowerCase()}`
                              : `/home/#${item.toLowerCase()}`
                          }`}
                          className="text-base text-gray-400 hover:text-gray-300"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Documentation", "API Status", "Contact Us"].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase().replace(" ", "-")}`}
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* <div>
                      <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                      <ul className="mt-4 space-y-4">
                        {["About", "Blog"].map((item) => (
                          <li key={item}>
                        <Link href={`/${item.toLowerCase()}`} className="text-base text-gray-400 hover:text-gray-300">
                          {item}
                        </Link>
                          </li>
                        ))}
                      </ul>
                        </div> */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Privacy", "Terms", "Security", "Cookies"].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="text-base text-gray-400 hover:text-gray-300"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} HRConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
