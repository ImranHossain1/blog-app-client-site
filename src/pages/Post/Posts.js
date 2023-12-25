import React from "react";
import PostCard from "./PostCard";
import { gql, useQuery } from "@apollo/client";
const GET_POSTS = gql`
  query PostData {
    posts {
      title
      content
      createdAt
      author {
        name
        id
      }
    }
  }
`;
const Posts = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <p>Loading ....</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data.posts);
  return (
    <div>
      <h1 className="text-center font-bold text-5xl my-4 pb-4">Posts</h1>
      <hr />
      <div className="flex flex-wrap">
        {data?.posts.map((post) => (
          <PostCard post={post}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default Posts;
