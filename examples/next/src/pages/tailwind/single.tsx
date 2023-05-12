import fs from "node:fs/promises";
import path from "node:path";
import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/future/image";
import { getPlaiceholder } from "plaiceholder";
import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { config } from "@/config";
import { Layout } from "@/components/layout";
import { cx } from "class-variance-authority";

export const getStaticProps = async () => {
  const plaiceholder = "plaiceholder-[/assets/images/keila-joa@578.jpg]";

  const src = extractImgSrc(plaiceholder);
  const buffer = await fs.readFile(path.join("./public", src));

  const { img } = await getPlaiceholder(buffer);

  return {
    props: {
      img: {
        ...img,
        src,
        alt: "Looking down Keila river, Estonia",
        title: "Photo by Joe Bell",
      },
      plaiceholder,
      title: config.examples.pages.tailwind.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageTailwindSingle: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, img, plaiceholder }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ul role="list" className={imageList({ columns: 2 })}>
      <li key={plaiceholder} className={imageListItem()}>
        <div
          className={cx(
            "absolute",
            "inset-0",
            "w-full",
            "h-full",
            plaiceholder,
            "transform",
            "scale-150",
            "filter",
            "blur-2xl",
            "z-[-1]"
          )}
        />
        <Image {...img} />
      </li>
    </ul>
  </Layout>
);

export default PageTailwindSingle;
