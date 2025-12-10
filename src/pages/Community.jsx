import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useToast } from "../context/ToastContext";
import { FaHeart, FaComment, FaTimes, FaShare, FaEllipsisV, FaMoon, FaSun } from "react-icons/fa";
import Footer from "../components/Footer.jsx"
const Community = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("communityDarkMode");
    return saved !== null ? JSON.parse(saved) : false;
  });
  
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postVideo, setPostVideo] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questionData, setQuestionData] = useState({
    question: "",
    choice1: "",
    choice2: "",
    choice3: "",
  });
  
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);


  useEffect(() => {
    localStorage.setItem("communityDarkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Ali Khaled",
      role: "Coach",
      avatar: "https://via.placeholder.com/48",
      timestamp: "2 hours ago",
      content: "Just finished an amazing HIIT session with my clients! Remember, consistency beats perfection every time. Keep pushing your limits! 💪",
      hashtags: "#Workout #Motivation",
      image: "https://via.placeholder.com/500x300",
      likes: 120,
      comments: [
        { id: 1, author: "User1", text: "Great session!", timestamp: "1h" },
        { id: 2, author: "User2", text: "Inspiring!", timestamp: "30m" },
      ],
      shares: 4,
      liked: false,
    },
  ]);

  const [trendingTags, setTrendingTags] = useState([
    { name: "#Workout", posts: 1200, color: "#5BA3E8" },
    { name: "#Nutrition", posts: 950, color: "#7FD876" },
    { name: "#Transformation", posts: 875, color: "#FFB84D" },
    { name: "#Motivation", posts: 750, color: "#D897FF" },
  ]);

  const [trendingCoaches, setTrendingCoaches] = useState([
    { id: 1, name: "Ali Khaled", followers: 12500, followed: false },
    { id: 2, name: "Sarah Ahmed", followers: 10200, followed: false },
    { id: 3, name: "Omar Hassan", followers: 9800, followed: false },
  ]);

  // for post controls (dropdown, edit)
  const postRefs = useRef({});
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [openCommentsId, setOpenCommentsId] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});

  const { showToast } = useToast();

  const handlePostSubmit = () => {
    if (postContent.trim() === "") return;

    const newPost = {
      id: posts.length + 1,
      author: user.username,
      role: "Member",
      avatar: "https://via.placeholder.com/48",
      timestamp: "just now",
      content: postContent,
      hashtags: "",
      image: postImage,
      video: postVideo,
      question: null,
      likes: 0,
      comments: [],
      liked: false,
    };

    setPosts([newPost, ...posts]);
    setPostContent("");
    setPostImage(null);
    setPostVideo(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostVideo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuestionSubmit = () => {
    if (
      questionData.question.trim() === "" ||
      questionData.choice1.trim() === "" ||
      questionData.choice2.trim() === "" ||
      questionData.choice3.trim() === ""
    ) {
      showToast("Please fill in all fields", { type: "error" });
      return;
    }

    const newPost = {
      id: posts.length + 1,
      author: user.username,
      role: "Member",
      avatar: "https://via.placeholder.com/48",
      timestamp: "just now",
      content: postContent,
      hashtags: "",
      image: null,
      video: null,
      question: questionData,
      likes: 0,
      comments: [],
      liked: false,
    };

    setPosts([newPost, ...posts]);
    setPostContent("");
    setQuestionData({ question: "", choice1: "", choice2: "", choice3: "" });
    setShowQuestionModal(false);
  };

  // Close dropdown when clicking outside the active post
  useEffect(() => {
    const handleDocClick = (e) => {
      if (openDropdownId == null) return;
      const node = postRefs.current[openDropdownId];
      if (node && !node.contains(e.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, [openDropdownId]);

  const handleDeletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    if (openDropdownId === postId) setOpenDropdownId(null);
    if (editingPostId === postId) {
      setEditingPostId(null);
      setEditContent("");
    }
  };

  const handleStartEdit = (postId) => {
    const p = posts.find((x) => x.id === postId);
    setEditingPostId(postId);
    setEditContent(p?.content || "");
    setOpenDropdownId(null);
  };

  const handleSaveEdit = (postId) => {
    if (editContent.trim() === "") return;
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, content: editContent } : p)));
    setEditingPostId(null);
    setEditContent("");
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditContent("");
  };

  // Comments
  const toggleComments = (postId) => {
    setOpenCommentsId(openCommentsId === postId ? null : postId);
    
  };

  const handleCommentChange = (postId, text) => {
    setCommentTexts((s) => ({ ...s, [postId]: text }));
  };

  const handleAddComment = (postId) => {
    const text = (commentTexts[postId] || "").trim();
    if (!text) return;
    const newComment = { id: Date.now(), author: user.username || "Guest", text, timestamp: "just now" };
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, comments: [...(Array.isArray(p.comments) ? p.comments : []), newComment] } : p)));
    setCommentTexts((s) => ({ ...s, [postId]: "" }));
  };

  // Share
  const handleShareClick = async (postId) => {
    const postUrl = `${window.location.origin}${window.location.pathname}#post-${postId}`;
    try {
      if (navigator.share) {
        const post = posts.find((p) => p.id === postId);
        await navigator.share({ title: `${post.author} on GYMGEM`, text: post.content.slice(0, 120), url: postUrl });
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(postUrl);
        showToast("Link copied to clipboard", { type: "success" });
      } else {
        prompt("Copy this link:", postUrl);
      }
    
      setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, shares: (p.shares || 0) + 1 } : p)));
      setOpenDropdownId(null);
    } catch (err) {
      console.error(err);
      showToast("Share failed", { type: "error" });
    }
  };

  const handleLikePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleFollowCoach = (coachId) => {
    setTrendingCoaches(
      trendingCoaches.map((coach) =>
        coach.id === coachId
          ? {
              ...coach,
              followed: !coach.followed,
              followers: coach.followed ? coach.followers - 1 : coach.followers + 1,
            }
          : coach
      )
    );
  };

  return (
    <>
      <Navbar />
      <main className={`w-full min-h-screen transition-colors duration-300 ${
        darkMode 
          ? "bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800" 
          : "bg-gradient-to-b from-gray-50 via-white to-gray-100"
      }`}>
        <div className="w-[80%] mx-auto">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${
            darkMode ? "bg-orange-500/10" : "bg-orange-500/5"
          }`}></div>
          <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl ${
            darkMode ? "bg-blue-500/10" : "bg-blue-500/5"
          }`}></div>
        </div>

        <div className="w-[92%] mx-auto py-12 relative z-10">
          {/* Page Header with Dark Mode Toggle */}
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className={`text-5xl font-bold mb-2 font-bebas tracking-wide ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                COMMUNITY HUB
              </h1>
              <p className="text-orange-500 text-lg font-semibold">Share Your Fitness Journey</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                darkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-200 text-orange-600 hover:bg-gray-300"
              }`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
            </button>
          </div>

          <div className="w-full flex gap-8">
            {/* Left Column - Trending Tags */}
            <div className="w-[20%]">
              <div className={`rounded-2xl p-6 shadow-2xl border transition-all duration-300 sticky top-24 ${
                darkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-orange-500/20"
                  : "bg-gradient-to-br from-white to-gray-50 border-orange-500/10"
              }`}>
                <h4 className={`font-bold mb-6 uppercase tracking-widest text-sm flex items-center gap-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                  Trending Tags
                </h4>
                <div className="space-y-4">
                  {trendingTags.map((tag, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border ${
                        darkMode
                          ? "border-orange-500/30 hover:border-orange-500"
                          : "border-orange-500/20 hover:border-orange-500"
                      }`}
                      style={{
                        backgroundImage: darkMode
                          ? `linear-gradient(135deg, ${tag.color}40, ${tag.color}10)`
                          : `linear-gradient(135deg, ${tag.color}20, ${tag.color}05)`,
                      }}
                    >
                      <span className="font-bold text-sm" style={{ color: tag.color }}>
                        {tag.name}
                      </span>
                      <span className={`text-xs font-semibold ${
                        darkMode ? "text-gray-400 group-hover:text-white" : "text-gray-600"
                      }`}>
                        {(tag.posts / 1000).toFixed(1)}k
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Column - Post Creation & Feed */}
            <div className="w-[50%] space-y-8">
              {/* Post Creator */}
              <div className={`rounded-2xl p-6 shadow-2xl border transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-orange-500/20"
                  : "bg-gradient-to-br from-white to-gray-50 border-orange-500/10"
              }`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Share your fitness progress..."
                      className={`w-full rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none resize-none focus:ring-2 focus:ring-orange-500 border transition-all duration-300 ${
                        darkMode
                          ? "bg-gray-700/50 text-white border-gray-600"
                          : "bg-gray-100 text-gray-900 border-gray-300"
                      }`}
                      rows="3"
                    ></textarea>
                    <div className="flex gap-3 mt-4 flex-wrap">
                      <button
                        onClick={() => imageInputRef.current?.click()}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        📷 Image
                      </button>
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() => videoInputRef.current?.click()}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        🎥 Video
                      </button>
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() => setShowQuestionModal(true)}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        ❓ QUESTION
                      </button>
                    </div>
                    {(postImage || postVideo) && (
                      <div className="mt-4 relative">
                        {postImage && (
                          <div className="relative inline-block w-full rounded-xl overflow-hidden border border-orange-500/30">
                            <div
                              aria-label="image preview"
                              className="w-full"
                              style={{
                                aspectRatio: "16/9",
                                backgroundImage: `url(${postImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            />
                            <button
                              onClick={() => setPostImage(null)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
                            >
                              <FaTimes size={14} />
                            </button>
                          </div>
                        )}
                        {postVideo && (
                          <div className="relative inline-block w-full rounded-xl overflow-hidden border border-orange-500/30">
                            <video
                              src={postVideo}
                              className="w-full"
                              style={{ height: 'auto', maxHeight: '480px', objectFit: 'cover', aspectRatio: '16/9' }}
                              controls
                            />
                            <button
                              onClick={() => setPostVideo(null)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
                            >
                              <FaTimes size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handlePostSubmit}
                        disabled={postContent.trim() === ""}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-8 py-2 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg uppercase tracking-wider"
                      >
                        POST
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts Feed */}
              <div className="space-y-8">
                {posts.length === 0 ? (
                  <div className={`rounded-2xl p-12 text-center shadow-2xl border transition-all duration-300 ${
                    darkMode
                      ? "bg-gradient-to-br from-gray-800 to-gray-900 border-orange-500/20"
                      : "bg-gradient-to-br from-white to-gray-50 border-orange-500/10"
                  }`}>
                    <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      No posts yet. Be the first to share! 🚀
                    </p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <div
                      id={`post-${post.id}`}
                      key={post.id}
                      ref={(el) => (postRefs.current[post.id] = el)}
                      className={`relative rounded-2xl p-6 shadow-2xl border transition-all duration-300 group ${
                      darkMode
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 border-orange-500/20 hover:border-orange-500/50"
                        : "bg-gradient-to-br from-white to-gray-50 border-orange-500/10 hover:border-orange-500/30"
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">
                            {post?.author?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div>
                            <h3 className={`font-bold uppercase ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {post.author}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                                {post.role}
                              </span>
                              <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                                {post.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === post.id ? null : post.id);
                            }}
                            aria-expanded={openDropdownId === post.id}
                            className={`hover:transition opacity-0 group-hover:opacity-100 ${
                              darkMode ? "text-gray-500 hover:text-orange-500" : "text-gray-400 hover:text-orange-500"
                            }`}
                          >
                            <FaEllipsisV size={16} />
                          </button>

                          {openDropdownId === post.id && (
                            <div className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 ${
                              darkMode ? "bg-gray-800 border border-gray-700 text-white" : "bg-white border border-gray-200 text-gray-800"
                            }`}>
                              <button
                                onClick={() => handleStartEdit(post.id)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-orange-50 ${
                                  darkMode ? "hover:bg-gray-700/50" : ""
                                }`}
                              >
                                Edit Post
                              </button>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                              >
                                Delete Post
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {editingPostId === post.id ? (
                        <div className="mb-4">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className={`w-full rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 ${
                              darkMode ? "bg-gray-700/50 text-white focus:ring-orange-500" : "bg-gray-100 text-gray-900 focus:ring-orange-400"
                            }`}
                            rows={4}
                          />
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleSaveEdit(post.id)}
                              disabled={editContent.trim() === ""}
                              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold disabled:opacity-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-2 bg-gray-300 rounded-lg font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className={`text-sm mb-4 leading-relaxed ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                          {post.content}
                        </p>
                      )}
                      {post.hashtags && (
                        <p className="text-orange-500 text-xs mb-4 font-semibold">{post.hashtags}</p>
                      )}
                      {post.image && (
                        <div
                          role="img"
                          aria-label="post image"
                          className={`w-full rounded-xl mb-4 border ${darkMode ? "border-orange-500/20" : "border-orange-500/10"} overflow-hidden`}
                          style={{
                            aspectRatio: '16/9',
                            backgroundImage: `url(${post.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                      )}
                      {post.video && (
                        <video
                          src={post.video}
                          controls
                          className="w-full rounded-xl mb-4 border"
                          style={{
                            aspectRatio: '16/9',
                            objectFit: 'cover',
                            borderColor: darkMode ? undefined : undefined,
                          }}
                        />
                      )}
                      {post.question && (
                        <div className={`rounded-xl p-4 mb-4 border transition-all duration-300 ${
                          darkMode
                            ? "bg-gray-700/50 border-orange-500/20"
                            : "bg-gray-100 border-orange-500/10"
                        }`}>
                          <p className={`font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                            {post.question.question}
                          </p>
                          <div className="space-y-3">
                            {[1, 2, 3].map((idx) => (
                              <button
                                key={idx}
                                className={`w-full text-left rounded-lg px-4 py-3 text-sm transition-all duration-200 ${
                                  darkMode
                                    ? "bg-gray-600/50 hover:bg-orange-500/20 border border-gray-500 hover:border-orange-500 text-gray-200"
                                    : "bg-white hover:bg-orange-50 border border-gray-300 hover:border-orange-500 text-gray-700"
                                }`}
                              >
                                ○ {post.question[`choice${idx}`]}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className={`flex gap-6 pt-4 border-t transition-all duration-300 ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      }`}>
                        <div
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                            post.liked
                              ? "text-red-500"
                              : darkMode
                              ? "text-gray-400 hover:text-red-500"
                              : "text-gray-500 hover:text-red-500"
                          }`}
                        >
                          <FaHeart size={18} fill={post.liked ? "currentColor" : "none"} />
                          <span className="text-sm font-bold">{post.likes}</span>
                        </div>
                        <button
                          onClick={() => toggleComments(post.id)}
                          className={`flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                            darkMode ? "text-gray-400 hover:text-blue-500" : "text-gray-500 hover:text-blue-500"
                          }`}
                        >
                          <FaComment size={18} />
                          <span className="text-sm font-bold">{Array.isArray(post.comments) ? post.comments.length : post.comments}</span>
                        </button>
                        <button
                          onClick={() => handleShareClick(post.id)}
                          className={`flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                            darkMode ? "text-gray-400 hover:text-green-500" : "text-gray-500 hover:text-green-500"
                          }`}
                        >
                          <FaShare size={18} />
                          <span className="text-sm font-bold">Share</span>
                        </button>
                      </div>
                      {/* Comments area */}
                      {openCommentsId === post.id && (
                        <div className={`mt-4 rounded-lg p-4 border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                          <div className="space-y-3 max-h-48 overflow-auto mb-3">
                            {(Array.isArray(post.comments) ? post.comments : []).map((c) => (
                              <div key={c.id} className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold">{c.author?.charAt(0)?.toUpperCase() || "U"}</div>
                                <div>
                                  <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{c.author}</p>
                                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{c.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <input
                              value={commentTexts[post.id] || ""}
                              onChange={(e) => handleCommentChange(post.id, e.target.value)}
                              placeholder="Write a comment..."
                              className={`flex-1 rounded-lg px-3 py-2 text-sm focus:outline-none border ${darkMode ? "bg-gray-700/50 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`}
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="px-4 py-2 bg-orange-500 text-white rounded-lg font-bold"
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column - Trending Coaches */}
            <div className="w-[20%]">
              <div className={`rounded-2xl p-6 shadow-2xl border transition-all duration-300 sticky top-24 ${
                darkMode
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 border-orange-500/20"
                  : "bg-gradient-to-br from-white to-gray-50 border-orange-500/10"
              }`}>
                <h4 className={`font-bold mb-6 uppercase tracking-widest text-sm flex items-center gap-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                  Top Coaches
                </h4>
                <div className="space-y-4">
                  {trendingCoaches.map((coach) => (
                    <div
                      key={coach.id}
                      className={`flex items-center gap-3 pb-4 border-b last:border-b-0 group hover:p-2 rounded-lg transition-all duration-200 ${
                        darkMode
                          ? "border-gray-700 hover:bg-gray-700/50"
                          : "border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">
                        {coach?.name?.charAt(0).toUpperCase() || "C"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {coach.name}
                        </p>
                        <p className="text-orange-500 text-xs font-semibold">
                          {(coach.followers / 1000).toFixed(1)}k followers
                        </p>
                      </div>
                      <button
                        onClick={() => handleFollowCoach(coach.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 transform hover:scale-105 whitespace-nowrap ${
                          coach.followed
                            ? darkMode
                              ? "bg-gray-600 text-gray-200 hover:bg-gray-700"
                              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                            : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                        }`}
                      >
                        {coach.followed ? "FOLLOWING" : "FOLLOW"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>

    
      {showQuestionModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ${
          darkMode ? "bg-black/70" : "bg-black/40"
        }`}>
          <div className={`rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 border transition-all duration-300 ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-900 border-orange-500/30"
              : "bg-gradient-to-br from-white to-gray-50 border-orange-500/20"
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold font-bebas tracking-wider ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                CREATE POLL
              </h2>
              <button
                onClick={() => setShowQuestionModal(false)}
                className={`transition ${
                  darkMode
                    ? "text-gray-500 hover:text-orange-500"
                    : "text-gray-400 hover:text-orange-500"
                }`}
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-bold mb-2 uppercase tracking-wider ${
                  darkMode ? "text-orange-500" : "text-orange-600"
                }`}>
                  Question
                </label>
                <textarea
                  value={questionData.question}
                  onChange={(e) =>
                    setQuestionData({ ...questionData, question: e.target.value })
                  }
                  placeholder="What's your question?"
                  className={`w-full rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none resize-none focus:ring-2 focus:ring-orange-500 border transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700/50 text-white border-gray-600"
                      : "bg-gray-100 text-gray-900 border-gray-300"
                  }`}
                  rows="3"
                ></textarea>
              </div>

              {["choice1", "choice2", "choice3"].map((choice, idx) => (
                <div key={choice}>
                  <label className={`block text-sm font-bold mb-2 uppercase tracking-wider ${
                    darkMode ? "text-orange-500" : "text-orange-600"
                  }`}>
                    Option {idx + 1}
                  </label>
                  <input
                    type="text"
                    value={questionData[choice]}
                    onChange={(e) =>
                      setQuestionData({ ...questionData, [choice]: e.target.value })
                    }
                    placeholder={`Enter option ${idx + 1}`}
                    className={`w-full rounded-lg px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 border transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-700/50 text-white border-gray-600"
                        : "bg-gray-100 text-gray-900 border-gray-300"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowQuestionModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleQuestionSubmit}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 uppercase tracking-wider"
              >
                Post Poll
              </button>
            </div>
          </div>
        </div>

)}
<Footer/>
    </>
  );
};

export default Community;
