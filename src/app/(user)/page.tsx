import BlogContent from "@/components/BlogContent";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";


export const revalidate = 30;
const query = groq`*[_type == 'post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt asc)`;



export default async function Home() {
  const posts = await client.fetch(query);

  return (
    <main>
      <BlogContent posts={posts} />
    </main>
  );
}

