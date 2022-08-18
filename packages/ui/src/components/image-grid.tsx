import React from "react";
import type * as CVA from "class-variance-authority";
import { cva } from "class-variance-authority";

const imageGrid = cva(
  ["grid", "grid-cols-1", "sm:grid-cols-2", "gap-4", "mt-8"],
  {
    variants: { columns: { 2: null, 3: "md:grid-cols-3" } },
    defaultVariants: { columns: 3 },
  }
);

export interface ImageGridProps
  extends React.HTMLAttributes<HTMLUListElement>,
    CVA.VariantProps<typeof imageGrid> {}

export const ImageGrid: React.FC<ImageGridProps> = ({
  className,
  columns = 3 as ImageGridProps["columns"],
  ...props
}) => (
  <ul
    role="list"
    className={imageGrid({ class: className, columns })}
    {...props}
  />
);

const imageGridItem = cva(["relative", "block", "overflow-hidden"]);

export interface ImageGridItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    CVA.VariantProps<typeof imageGridItem> {}

export const ImageGridItem: React.FC<ImageGridItemProps> = ({
  className,
  ...props
}) => <li className={imageGridItem({ class: className })} {...props} />;