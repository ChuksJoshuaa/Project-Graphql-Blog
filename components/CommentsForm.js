import React, { useRef, useState, useEffect } from "react";

import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setshowSuccessMessage] = useState(false);

  const commentEl = useRef(null);
  const nameEl = useRef(null);
  const emailEl = useRef(null);
  const storeDataEl = useRef(null);

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleCommentSubmit = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj)
      .then((res) => {
        console.log(res);
        commentEl.current.value = "";
        setshowSuccessMessage(true);
        setTimeout(() => {
          setshowSuccessMessage(false);
        }, 3000);
      })
      .catch((res) => {
        commentEl.current.value = "";
        setshowSuccessMessage(false);
        console.log(res);
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          ref={commentEl}
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          placeholder="Name"
          name="name"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
        <input
          type="text"
          ref={emailEl}
          placeholder="Email"
          name="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            htmlFor="storeData"
          />
          <label className="text-gray-500 cursor-pointer ml-2">
            Save my email and name for the next time i comment
          </label>
        </div>
      </div>
      {error ? (
        <p className="text-xs text-red-500">All fields aree required</p>
      ) : null}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmit}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage ? (
          <span className="text-md md:text-lg float-right font-semibold mt-3 text-green-500">
            Comment Submitted for review
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default CommentsForm;
