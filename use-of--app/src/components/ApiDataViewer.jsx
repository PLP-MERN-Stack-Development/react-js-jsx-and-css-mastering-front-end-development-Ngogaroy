import React, { useState, useEffect, useMemo } from 'react';
import Card from './Card'; // Reuse our Card component
import Button from './Button'; // Reuse our Button component

// API URL
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const POSTS_PER_PAGE = 10;

function ApiDataViewer() {
  // State for all posts
  const [posts, setPosts] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for error
  const [error, setError] = useState(null);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // --- 1. Fetch data with useEffect ---
  useEffect(() => {
    // Define an async function to fetch the data
    const fetchPosts = async () => {
      setLoading(true); // Start loading
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount

  // --- 2. Filter posts based on search term (using useMemo for efficiency) ---
  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  // --- 3. Paginate the filtered posts ---
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // --- 4. Render Loading and Error States ---
  if (loading) {
    return <p className="text-center text-lg dark:text-white">Loading data...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  }

  // --- 5. Render the UI ---
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Blog Posts
      </h2>
      
      {/* Search Feature */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts by title or body..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Posts List / Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedPosts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <h3 className="text-xl font-semibold mb-2 capitalize dark:text-blue-300">{post.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 flex-grow">{post.body}</p>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No posts found.
        </p>
      )}
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages > 0 ? totalPages : 1}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || paginatedPosts.length === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ApiDataViewer;