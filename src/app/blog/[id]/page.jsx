// app/blog/[id]/page.jsx
import Image from "next/image";
import BackButton from "../../../Components/backButton";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";

export default async function BlogDetail({ params }) {
  const { id } = await params;

  let blog = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    blog = data.blog;
  } catch (err) {
    console.error("Failed to fetch blog:", err);
  }

  if (!blog) {
    return <div className="p-10 text-center">Blog post not found.</div>;
  }

  return (
    <>
    <Header/>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <BackButton />
        <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={500}
          className="w-full h-auto object-contain rounded-lg mb-6"
        />
        <p className="text-sm uppercase text-gray-500">{blog.category}</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900 mb-4">
          {blog.title}
        </h1>
        <p className="text-sm font-bold text-gray-600 mb-6">
          By {blog.author?.name}
        </p>
        <div className="text-lg leading-7 text-gray-800 whitespace-pre-wrap">
          {blog.content}
        </div>
      </div>
      <Footer/>
    </>
  );
}
