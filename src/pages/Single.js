import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState({});
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single flex gap-10">
      <div className="content flex-5 flex flex-col gap-8">
        <img src={`../upload/${post?.img}`} alt="" className="w-full h-96 object-cover" />
        <div className="user flex items-center gap-10 text-sm">
          {post.userImg && (
            <img src={post.userImg} alt="" className="w-12 h-12 rounded-full object-cover" />
          )}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit flex gap-5">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" className="w-5 h-5 cursor-pointer" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" className="w-5 h-5 cursor-pointer" />
            </div>
          )}
        </div>
        <h1 className="text-2xl">{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
          className="text-justify leading-7"
        ></p>
      </div>
      <Menu cat={post.cat} className="flex-2" />
    </div>
  );
};

export default Single;
