import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import CategoryNav from '../components/CategoryNav';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getApprovedposts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <CategoryNav/>
      <div className='p-5 w-full mx-auto flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex  flex-col gap-6'>
            <h2 className='text-2xl font-semibold mt-24 text-center'>Recent Posts</h2>
            <div className='flex justify-center flex-wrap gap-1'>
            {posts.slice(0, 3).map((post) => (
  <PostCard key={post._id} post={post} />
))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
