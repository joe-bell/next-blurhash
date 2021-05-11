import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getImage } from "@plaiceholder/next";
import { getBlurhash } from "@plaiceholder/blurhash";
import { BlurhashCanvas } from "react-blurhash";
import { Layout } from "@/components/layout";
import { config } from "@/config";
import { cx } from "@/styles";
import { getAllPublicImagePaths } from "@/lib/images";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";

export const getStaticProps = async ({ params }) => {
  const imagePaths = getAllPublicImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { buffer, ...details } = await getImage(src);
      const blurhash = await getBlurhash(buffer);

      return {
        src,
        alt: "Paint Splashes",
        title: "Photo from Unsplash",
        ...details,
        blurhash,
      };
    })
  ).then((values) => values);

  return {
    props: {
      images,
      title: config.examples.pages.blurhash.title,
      heading: config.examples.variants.multiple.title,
    },
  };
};

const PageBlurhashMultiple: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, images }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid>
      {images.map(({ blurhash, ...image }) => (
        <ImageGridItem key={image.src}>
          <BlurhashCanvas
            hash={blurhash.hash}
            width={blurhash.height}
            height={blurhash.width}
            punch={1}
            className={cx("absolute", "inset-0", "w-full", "h-full")}
          />

          <Image {...image} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  </Layout>
);

export default PageBlurhashMultiple;
