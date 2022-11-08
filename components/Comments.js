import React, { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";

import { getComments } from "../services";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result);
    });
  }, []);

  return (
    <>
      {comments.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            Comments ({comments.length})
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="border border-gray-100 mb-4 p-3 pb-4"
            >
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{" "}
                <span className="font-semibold text-[crimson] text-sm md:text-md">
                  {moment(comment.createdAt).format("MM DD, YYYY")}
                </span>
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Comments;
