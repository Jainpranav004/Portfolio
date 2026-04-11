import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

const BASE_URL = "";

type PostMeta = { slug: string; date: string };

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPosts = (getAllPosts() as PostMeta[]).map((post) => ({
    url: `${BASE_URL}/projects/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...projectPosts,
  ];
}
