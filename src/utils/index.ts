import { client } from "@/sanity/lib/client";
import { Post } from "@/types";

export async function getServerSideProps() {
    const query = `*[_type == "post"] | order(_createdAt desc) {
      title, image, slug, body, publishedAt
    }`;
    const posts: Post[] = await client.fetch(query);
  
    return {
      props: { posts },
    };
  }
  