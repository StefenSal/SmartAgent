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
      <Disclosure as="nav" className="z-50 w-full bg-gradient-to-r from-slate-50/90 to-white/90 backdrop-blur-md shadow-lg text-gray-800">
        {({ open }) => (
          <>
            <div className="align-center flex h-20 flex-row justify-between px-6">
              <div className="flex flex-shrink-0 cursor-pointer items-center lg:flex-1">
                <Image
                  src="/logos/dark-default-solid.svg"
                  width="35"
                  height="35"
                  alt="SmartAgent"
                  className="mb-1 mr-3"
                />
                <span className="text-2xl font-semibold tracking-tight text-purple-600">SmartAgent</span>
              </div>
              <div className="hidden flex-1 items-center justify-center xmd:flex">
                <div className="flex h-[50px] items-center self-center overflow-hidden rounded-xl bg-white/50 px-4 py-2 shadow-inner">
                  {navigation.map((item, i) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        "relative flex flex-col items-center justify-center p-2 px-6 text-center font-inter text-sm font-medium tracking-wide transition-colors duration-300",
                        currentIndex === i ? "text-purple-600" : "text-gray-600 hover:text-purple-500"
                      )}
                      onMouseEnter={() => setHoveredButtonIndex(i)}
                      onMouseLeave={() => setHoveredButtonIndex(0)}
                    >
                      {item.name}
                      {currentIndex === i && (
                        <div className="absolute bottom-0 h-0.5 w-12 rounded-full bg-purple-500" />
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
