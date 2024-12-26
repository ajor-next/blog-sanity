import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";


export const RichText = {
    
    
    types: {
        image: ({ value }: { value: { asset?: { _ref?: string } } }) => {
          if (!value?.asset?._ref) {
            console.warn("Image asset reference is missing:", value);
            return null; // Or render a fallback UI if needed
          }
          return (
            <Image
              src={urlFor(value.asset._ref).url()}
              alt="Embedded image"
              width={100}
              height={100}
              className="w-full h-auto"
            />
          );
        },
    },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="ml-10 list-disc">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="ml-10 list-decimal">{children}</ol>
    ),
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-2xl font-bold my-5">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-xl font-bold my-5">{children}</h2>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="my-5">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a href={value?.href} className="text-blue-500 hover:underline">
        {children}
      </a>
    ),
  },
};