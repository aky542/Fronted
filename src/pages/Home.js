import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts mt-10 grid md:grid-cols-1 lg:grid-cols-2 gap-24">
        {posts.map((post, index) => (
          <div
            className={`post flex ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } items-center gap-8`}
            key={post.id}
          >
            <div className="img md:flex-2 relative">
              <div className="bg-lightGreen absolute inset-0 -top-5 -left-5 w-full h-full"></div>
              <img
                src={`../upload/${post.img}`}
                alt=""
                className="w-full max-h-96 object-cover"
              />
            </div>
            <div className="content md:flex-3">
              <Link className="link" to={`/post/${post.id}`}>
                <h1 className="text-3xl font-bold">{post.title}</h1>
              </Link>
              <p className="text-lg">{getText(post.desc)}</p>
              <button className="btn btn-teal">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
