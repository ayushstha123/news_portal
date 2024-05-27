import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from './PostCard';  // Make sure this path is correct based on your project structure
import { Button } from 'flowbite-react';

const categories = ['/', 'breakingnews', 'global', 'world', 'entertainment', 'technology', 'health', 'science', 'sports'];

const CategoryNav = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    sort: 'desc',
    category: 'uncategorized',
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (sortFromUrl || categoryFromUrl) {
      setSidebarData((prevData) => ({
        ...prevData,
        sort: sortFromUrl || prevData.sort,
        category: categoryFromUrl || prevData.category,
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getApprovedposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
    };

    fetchPosts();
  }, [location.search]);

  const handleCategorySelect = (category) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('category', category);
    urlParams.set('sort', sidebarData.sort); // Assuming you want to keep the current sort order

    navigate(`/?${urlParams.toString()}`);
  };

  return (
    <div className='category-nav'>
      <Button.Group>
        {categories.map((category) => (
          <Button
            className='m-5'
            color="gray"
            key={category}
            onClick={() => handleCategorySelect(category)}
          >
            {category === '/' ? 'Home' : category}
          </Button>
        ))}
      </Button.Group>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='posts'>
          {posts.map((post) => (
            <div className='inline-block m-5'>
            <PostCard key={post._id} post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNav;
