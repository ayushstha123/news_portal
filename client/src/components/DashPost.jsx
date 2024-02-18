import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashPost = () => {
    const { currentUser } = useSelector(state => state.user);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (currentUser?.role === 'admin') {
            fetchPosts();
        }
    }, [currentUser]);

    return (
        <div className='md:w-full table-auto overflow-x-scroll md:mx-auto'>
            {currentUser?.role === 'admin' && userPosts.length > 0 ? (
                <Table hoverable className='shadow-sm'>
                    <Table.Head>
                        <Table.HeadCell>Date updated</Table.HeadCell>
                        <Table.HeadCell>Post image</Table.HeadCell>
                        <Table.HeadCell>Post title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                        <Table.HeadCell><span>Edit</span></Table.HeadCell>
                    </Table.Head>
                        {userPosts.map((post) => (                    
                        <Table.Body className='divide-y'>
                            <Table.Row key={post._id}>
                                <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                    <Link to={`/post/${post.slug}`}>
                                        <img src={post.image} alt={post.title} className='w-20 h-20 object-cover bg-gray-500' />
                                    </Link>
                                </Table.Cell>
                                <Table.Cell className='font-3xl font-bold'>{post.title}</Table.Cell>
                                <Table.Cell>{post.category}</Table.Cell>
                                <Table.Cell><span className='font-medium hover:underline text-red-500'>Delete</span></Table.Cell>
                                <Table.Cell><Link to={`/update-post/${post._id}`} className='text-blue-500'>Edit</Link></Table.Cell>
                            </Table.Row>                    
                            </Table.Body>

                        ))}

                </Table>
            ) : (
                <h1>No posts</h1>
            )}
        </div>
    );
};

export default DashPost;
