import { groq } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/types";
import Container from "@/components/Container";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { RichText } from "@/components/RichText";
import {PortableText} from '@portabletext/react'


interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 30;

export const generateStaticParams = async () => {
  const query = groq`*[_type == 'post']{
        slug
    }`;
  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug?.slug?.current);
  return slugRoutes?.map((slug) => ({
    slug,
  }));
};

const SlugPage = async ({ params }: Props) => {
  const { slug } = await params;

  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
        ...,
        body,
        author->
    }`;
  const post: Post = await client.fetch(query, { slug });

  
  

  return (
    <Container className="mb-10">
      <div className="flex items-center mb-10">
        {post?.mainImage &&<div className="w-full md:w-2/3 m-5">
        <Image
            src={urlFor(post?.mainImage).url()}
            width={500}
            height={500}
            alt="main image"
            className="object-cover w-full h-72"
          />
        </div>}
        <div className="w-1/3 hidden md:inline-flex flex-col items-center gap-5">
           <Image
            src={urlFor(post?.author?.image).url()}
            width={200}
            height={200}
            alt="author image"
            className="w-32 h-32 rounded-full object-cover"
          />
          <p className="text-3xl text-[#5442ae] font-semibold">
            {post?.author?.name}
          </p>
          <p className="text-center tracking-wide text-sm">
            {post?.author?.description}
          </p>
          <div className="flex items-center gap-3">
            <Link
              href={"https://www.youtube.com/channel/UChkOsij0dhgft0GhHRauOAA"}
              target="blank"
              className="w-10 h-10 bg-red-600 text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
            >
              <FaYoutube />
            </Link>
            <Link
              href={"https://www.youtube.com/channel/UChkOsij0dhgft0GhHRauOAA"}
              target="blank"
              className="w-10 h-10 bg-gray-500 text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
            >
              <FaGithub />
            </Link>
            <Link
              href={"https://www.youtube.com/channel/UChkOsij0dhgft0GhHRauOAA"}
              target="blank"
              className="w-10 h-10 bg-[#3e5b98] text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
            >
              <FaFacebookF />
            </Link>
            <Link
              href={"https://www.youtube.com/channel/UChkOsij0dhgft0GhHRauOAA"}
              target="blank"
              className="w-10 h-10 bg-[#bc1888] text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
            >
              <FaInstagram />
            </Link>
            <Link
              href={"https://www.youtube.com/channel/UChkOsij0dhgft0GhHRauOAA"}
              target="blank"
              className="w-10 h-10 bg-blue-500 text-white text-xl rounded-full flex items-center justify-center hover:bg-[#5442ae] duration-200"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
      <div className="m-5">
        <PortableText value={post?.body} components={RichText} />
      </div>
    </Container>
  );
};

export default SlugPage;