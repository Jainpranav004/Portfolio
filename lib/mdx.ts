import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content", "projects");

export function getAllPosts() {
  const files = fs.readdirSync(contentDir);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
      const { data } = matter(raw);
      return { ...data, slug: filename.replace(".mdx", "") };
    })
    .sort(
      (a: Record<string, unknown>, b: Record<string, unknown>) =>
        new Date(b.date as string).getTime() - new Date(a.date as string).getTime()
    );
}

export async function getPostBySlug(slug: string) {
  const file = path.join(contentDir, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf-8");
  const { data: frontmatter, content } = matter(raw);
  return { frontmatter, content };
}
