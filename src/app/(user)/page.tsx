'use client';

import { useEffect, useState } from 'react';
import BlogContent from '@/components/BlogContent';
import Sidebar from '@/components/Sidebar';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { Post, Category } from '@/types'; // Import the correct types

const query = groq`*[_type == 'post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt asc)`;

const categoriesQuery = groq`*[_type == 'category'] | order(title asc)`;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts: Post[] = await client.fetch(query);
        const fetchedCategories: Category[] = await client.fetch(categoriesQuery);

        setPosts(fetchedPosts);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = selectedCategory
    ? posts.filter((post) =>
        post.categories.some((category) => category._id === selectedCategory)
      )
    : posts;

  return (
    <main className="flex">
      {/* Sidebar */}
      <Sidebar categories={categories} onSelectCategory={setSelectedCategory} />

      {/* Main Content */}
      <div className="flex-1">
        <BlogContent posts={filteredPosts} />
      </div>
    </main>
  );
}
