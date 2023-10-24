'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navLinks, socialLinks } from '@/utils/navLinks';

export function Footer() {
  const pathname = usePathname();

  if (pathname.includes('admin')) {
    return null;
  }

  return (
    <footer className=" bg-primary-500">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <h4 className="text-center text-xl font-semibold text-gray-300">
          Saginaw S.T.E.M.
        </h4>
        <div className="mx-auto mt-6 max-w-md text-center text-gray-300">
          The goal of Saginaw S.T.E.M. is to build a community of resourceful
          and empowered individuals who see and use education as a path to
          success.
        </div>
        <div className="mx-auto mt-6 items-center justify-center space-y-2 text-center text-gray-300 sm:flex sm:space-x-4 sm:space-y-0">
          <p>info@saginawstem.org</p>
          <p>P.O. Box 3614 Saginaw, MI 48605</p>
          <p>(989) - 372 - 1206</p>
        </div>
        <nav className="mt-6 flex flex-wrap justify-center" aria-label="Footer">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.name === 'Shop' ? (
                <div className="px-5 py-2 md:px-2">
                  <Link
                    href={link.to}
                    className="text-base font-semibold text-gray-300 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </Link>
                </div>
              ) : (
                <div className="px-5 py-2 md:px-2">
                  <Link
                    href={link.to}
                    className="text-base font-semibold text-gray-300 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-4">
          {socialLinks.map((link, i) => (
            <a
              href={link.href}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={link.icon}
                alt={link.alt}
                className="w-9 rounded-xl duration-150 hover:scale-110"
                width={100}
                height={100}
              />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-300">
          &copy; {new Date().getFullYear()} Saginaw S.T.E.M. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
