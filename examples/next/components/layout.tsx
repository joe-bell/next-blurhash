import * as React from "react";
import NextLink from "next/link";
import { IconGitHub, IconTwitter } from "@/components/icons";
import { cx } from "@/styles";
import { config } from "@/config";
import { Head } from "./head";

export type TLayoutProps =
  | {
      variant: "example";
      title: string;
      heading: string;
    }
  | { variant: "home"; title: string; heading?: null }
  | { variant?: null; title?: null; heading?: null };

const containerClassNames = ["max-w-5xl", "mx-auto", "px-4", "w-full"];

export const Layout: React.FC<TLayoutProps> = ({ children, ...props }) => (
  <React.Fragment>
    <Head />
    <header
      className={cx("bg-white", "border-b", "border-gray-300", "py-4", "z-10")}
    >
      <div
        className={cx(
          ...containerClassNames,
          "flex",
          "justify-between",
          "items-center"
        )}
      >
        <NextLink href="/">
          <a className={cx("inline-flex", "items-center", "hover:opacity-75")}>
            <span className="mr-2 text-xl font-medium md:inline">
              plaiceholder
            </span>
            <span className="mr-2 md:inline hidden">
              <img
                style={{ width: "2.5rem" }}
                src={[config.domain, "assets/images/logo/logo@192px.png"].join(
                  "/"
                )}
                alt=""
              />
            </span>
            <span className="text-gray-600 text-xl md:inline">Examples</span>
          </a>
        </NextLink>
        <ul className={cx("flex", "space-x-4")}>
          {[
            {
              icon: <IconGitHub />,
              href: config.social.github,
              label: "View the GitHub repo",
            },
            {
              icon: <IconTwitter />,
              href: config.social.twitter,
              label: "Contact the author on Twitter",
            },
          ].map((item) => (
            <li>
              <a
                href={item.href}
                className={cx(
                  "text-gray-600",
                  "hover:text-gray-900",
                  "transition",
                  "duration-200"
                )}
              >
                <span className="sr-only">{item.label}</span>
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
    <main
      className={cx(...containerClassNames, "mt-6", "pb-20", "text-gray-800")}
    >
      {props.variant
        ? {
            home: (
              <article className={cx("max-w-sm", "sm:max-w-none", "mx-auto")}>
                <h1 className={cx("font-bold", "text-4xl", "mt-10")}>
                  {props.title}
                </h1>
                <p
                  className={cx(
                    "font-light",
                    "text-gray-600",
                    "text-2xl",
                    "mt-2"
                  )}
                >
                  Choose-your-own adventure
                </p>
                {children}
              </article>
            ),
            example: (
              <article>
                <h1 className={cx("font-bold", "text-3xl", "mt-10")}>
                  {props.title}
                </h1>
                <h2
                  className={cx(
                    "font-light",
                    "text-gray-600",
                    "text-2xl",
                    "mt-2"
                  )}
                >
                  {props.heading}
                </h2>
                <div>{children}</div>
              </article>
            ),
          }[props.variant]
        : children}
    </main>
  </React.Fragment>
);