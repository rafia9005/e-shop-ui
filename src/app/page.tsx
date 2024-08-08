"use client";
import { Fetch } from "@/lib/fetch";
import { useEffect, useState } from "react";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function Home() {
  const [data, setData] = useState<Comment[] | null>(null);

  const FetchData = async () => {
    try {
      const response = await Fetch({
        method: "GET",
        url: 'https://jsonplaceholder.typicode.com/comments'
      });
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      {data ? (
        <ul>
          {data.map((comment) => (
            <li key={comment.id}>
              <h1>{comment.id}</h1>
              <p>{comment.body}</p>
              <small>By: {comment.email}</small>
            </li>
          ))}
        </ul>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

