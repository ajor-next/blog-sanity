import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";


const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };



export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params; // Await the params object

  const post = await client.fetch(POST_QUERY, { slug }, options);

  if (!post) {
    return <p>Post not found.</p>;
  }

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage).width(550).height(310).url()
    : null;
  
  

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.mainImage.alt || post.title}
          className="aspect-video rounded-xl"
          width={550}
          height={310}
        />
      )}
      
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}