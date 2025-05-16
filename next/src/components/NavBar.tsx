import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaBars, FaChevronRight, FaTimes } from "react-icons/fa";

import GlowWrapper from "./GlowWrapper";
import CycleIcons from "./motions/CycleIcons";
import FadeIn from "./motions/FadeIn";
import PrimaryButton from "./PrimaryButton";
import BlogsIcon from "../../public/icons/icon-blogs.svg";
import DocsIcon from "../../public/icons/icon-docs.svg";
import GithubIcon from "../../public/icons/icon-github.svg";
import HomeIcon from "../../public/icons/icon-home.svg";
import PricingIcon from "../../public/icons/icon-pricing.svg";

const navigation = [
  { name: "Home", href: "/home", icon: <HomeIcon /> },
  { name: "Blog", href: "/blog", icon: <BlogsIcon /> },
  { name: "Pricing", href: "https://agentgpt.reworkd.ai/plan", icon: <PricingIcon /> },
  {
    name: "Github",
    href: "https://github.com/reworkd/AgentGPT",
    icon: <GithubIcon />,
  },
  { name: "Docs", href: "https://reworkd.ai/docs", icon: <DocsIcon /> },
];

export default function NavBar() {
  const router = useRouter();
  const currentIndex = navigation.findIndex(
    (nav) => router.pathname.includes(nav.href) || router.pathname === nav.href
  );
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState(0);

  return (
    <FadeIn duration={3}>
      <Disclosure as="nav" className="z-50 w-full bg-gradient-to-r from-black/80 via-blue-900/80 to-purple-900/80 backdrop-blur-xl shadow-2xl border-b border-white/10">
        {({ open }) => (
          <>
            <div className="align-center flex h-24 flex-row justify-between px-8">
              <div className="flex flex-shrink-0 cursor-pointer items-center lg:flex-1">
                <div className="relative w-12 h-12 mr-4">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse-slow blur-xl opacity-50" />
                  <Image
                    src="/logos/dark-default-solid.svg"
                    width="48"
                    height="48"
                    alt="SmartAgent"
                    className="relative rounded-xl bg-black/50 p-2"
                  />
                </div>
                <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">SmartAgent</span>
              </div>
              <div className="hidden flex-1 items-center justify-center xmd:flex">
                <div className="flex h-[60px] items-center self-center overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg px-2">
                  {navigation.map((item, i) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        "relative flex flex-col items-center justify-center p-2 px-8 text-center font-inter text-sm font-medium tracking-wide transition-all duration-300",
                        currentIndex === i 
                          ? "text-white" 
                          : "text-gray-400 hover:text-white"
                      )}
                      onMouseEnter={() => setHoveredButtonIndex(i)}
                      onMouseLeave={() => setHoveredButtonIndex(0)}
                    >
                      {item.name}
                      {currentIndex === i && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm" />
                          <div className="absolute bottom-0 h-0.5 w-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                        </>
                      )}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden justify-end gap-2 xmd:flex sm:items-center lg:flex-1">
                <GlowWrapper className="opacity-40">
                  <PrimaryButton
                    onClick={() => {
                      window.open("https://6h6bquxo5g1.typeform.com/to/qscfsOf1", "_blank");
                    }}
                  >
                    <>
                      <span>Join the Waitlist</span>
                      <FaChevronRight
                        size="12"
                        className="text-gray-700 transition-transform group-hover:translate-x-1"
                      />
                    </>
                  </PrimaryButton>
                </GlowWrapper>
              </div>
              <div className="-mr-2 flex items-center xmd:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaTimes className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            <Disclosure.Panel className="xmd:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </FadeIn>
  );
}
