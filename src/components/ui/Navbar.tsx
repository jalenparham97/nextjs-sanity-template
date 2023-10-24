'use client';

import { Popover, Transition } from '@headlessui/react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import { navLinks } from '@/utils/navLinks';
import { cn } from '@/utils/tailwind-helpers';

import { PreviewBanner } from '../preview/PreviewBanner';

interface NavLinkProps {
  href: string;
  children?: React.ReactNode;
  [x: string]: any;
}

function NavLink({ href, children, ...otherProps }: NavLinkProps) {
  const pathname = usePathname();

  const activeLinkClass = pathname === href ? '!text-secondary' : '';

  return (
    <Link
      href={href}
      className={cn(
        'font-semibold text-primary hover:text-secondary',
        activeLinkClass
      )}
      {...otherProps}
    >
      {children}
    </Link>
  );
}

interface Props {
  isPreview: boolean;
}

export function Navbar({ isPreview }: Props) {
  const pathname = usePathname();

  if (pathname.includes('admin')) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 w-full bg-white">
      {isPreview && <PreviewBanner />}
      <Popover className="relative bg-white">
        <div
          className="pointer-events-none absolute inset-0 z-10"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <div className="mx-auto flex w-full items-center justify-between px-4 py-2 sm:px-6">
            <div>
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="Company Logo"
                  width={80}
                  height={70}
                />
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500">
                <span className="sr-only">Open menu</span>
                <IconMenu2 className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:flex md:items-center md:justify-between">
              <a href="http://" target="_blank" rel="noopener noreferrer"></a>
              <div className="flex items-center space-x-4 md:ml-12">
                {navLinks.map((link) => (
                  <NavLink key={link.name} href={link.to}>
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5 sm:pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <Link href="/" className="flex items-center">
                      <Image
                        src="/images/logo.png"
                        alt="Company Logo"
                        width={70}
                        height={70}
                      />
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-500">
                      <span className="sr-only">Close menu</span>
                      <IconX className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  <nav>
                    <div className="grid gap-7 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8">
                      {navLinks.map((link) => (
                        <Popover.Button
                          as={Link}
                          href={link.to}
                          key={link.name}
                          className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                        >
                          {link.name}
                        </Popover.Button>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
