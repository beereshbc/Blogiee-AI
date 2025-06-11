import React from "react";
import { motion } from "motion/react";

const ShareButtons = ({ title, url }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex gap-4 justify-center text-center text-primary ">
      <motion.a
        whileHover={{ scale: 1.1, color: "#000" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="px-4 py-1 border border-indigo-300 rounded-lg my-2 mx-2 hover:bg-indigo-100  "
        target="_blank"
        rel="noopener noreferrer"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
      >
        Linkedin
      </motion.a>
      <motion.a
        whileHover={{ scale: 1.1, color: "#000" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="px-4 py-1 border border-indigo-300 rounded-lg my-2 mx-2 hover:bg-indigo-100  "
        target="_blank"
        rel="noopener noreferrer"
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
      >
        Twitter
      </motion.a>
      <motion.a
        whileHover={{ scale: 1.1, color: "#000" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="px-4 py-1 border border-indigo-300 rounded-lg my-2 mx-2 hover:bg-indigo-100  "
        target="_blank"
        rel="noopener noreferrer"
        href={`https://wa.me/?text=*${encodedTitle}*%20${encodedUrl}`}
      >
        Whatsapp
      </motion.a>
    </div>
  );
};

export default ShareButtons;
