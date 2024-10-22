import "./style.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function Rip() {
  const { currentUser } = useContext(AuthContext);
  const [fetching, setFetching] = useState(false);
  const [post, setPost] = useState(null); // State to store the fetched post
  const { _id } = useParams(); // Get postId from the URL

  // console.log(currentUser.data.user);
  // console.log(_id);

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/posts/post/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.data.accessToken}`, // Use access token
            },
          }
        );

        const jsonData = response.data.data;
        console.log(jsonData);
        setPost(jsonData); // Store the fetched data in the state
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setFetching(false);
      }
    };

    if (currentUser && _id) {
      fetchData();
    }
  }, [currentUser, _id]);

  // Helper function to format the date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card bg-dark text-light p-4">
          <div className="row">
            <div className="col-md-3">
              <img
                src={post?.postImg}
                alt="George Washington"
                className="img-fluid"
              />
            </div>
            <div className="col-md-9">
              {/* Display the title dynamically */}
              <h1 className="card-title">{post?.title || "Loading..."}</h1>
              <div className="card-body">
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {post?.dateOfBirth
                    ? formatDate(post.dateOfBirth)
                    : "Loading..."}
                </p>
                <p>
                  <strong>Birth Place:</strong> {post?.birthPlace}
                </p>
                <p>
                  <strong>Death:</strong>{" "}
                  {post?.deathDate ? formatDate(post.deathDate) : "Loading..."}
                </p>
                <p>
                  <strong>Description:</strong> {post?.description}
                </p>
                <p>
                  <strong>Burial:</strong>{" "}
                  <a href="#" className="text-decoration-none">
                    {post?.burial}
                  </a>
                </p>
                <p>
                  <strong>Plot:</strong> {post?.plot}
                </p>
                <p>
                  <strong>Memorial ID:</strong> 1075 •{" "}
                  <a href="#" className="text-decoration-none">
                    View Source
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div className="row photos_memorials_document">
          <div className="col-md-4 text-end">Photos</div>
          <div className="col-md-4 text-center">Memorials</div>
          <div className="col-md-4 text-start">Document</div>
        </div>
      </div>

      <div className="flower_sec_btn">
        <button className="leave_flower">Leave A Flower</button>
        <button className="leave_flower">Flower Delivery</button>
      </div>
      <div className="test">
        <div className="flowers_section">
          <div className="flower_card">
            <img
              src="https://img.freepik.com/free-photo/fruit-bouqeut-summer-forest_1303-11041.jpg?t=st=1729620483~exp=1729624083~hmac=a731f852be1ad57086f8fb303790bc51811ec183aeda215b3033d043cad45cde&w=826"
              alt=""
            />
            <div className="flower_card_text">
              <h5>Left By: </h5> <span>General Rain Candise</span>
              <h5>On: </h5> <span>10 Oct 2024</span>
            </div>
          </div>
          <div className="flower_card"></div>
          <div className="flower_card"></div>
        </div>
      </div>
    </>
  );
}

export default Rip;
