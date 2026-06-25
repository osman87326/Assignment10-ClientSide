"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, Bookmark, Heart, MessageSquare, Send, ShieldAlert, Sparkles, Trash2, Flag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { ShareButton } from "@/components/lessons";

export default function LessonDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const { data: session } = authClient.useSession();
  
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  
  const [loading, setLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  // Report Modal State
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    if (!id) return;
    
    const fetchLessonAndComments = async () => {
      try {
        setLoading(true);
        setError("");
        
        // 1. Get JWT token from better-auth
        const tokenRes = await authClient.token();
        const token = tokenRes?.data?.token;

        const headers = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // 2. Fetch Single Lesson Details
        const lessonRes = await fetch(`/api/backend/lessons/${id}`, { headers });
        const lessonData = await lessonRes.json();

        if (lessonData.success) {
          const fetchedLesson = lessonData.data;
          setLesson(fetchedLesson);
          setLikesCount(fetchedLesson.likesCount || 0);
          
          if (session?.user) {
            setIsLiked(fetchedLesson.likes?.includes(session.user.id));
          }
          
          // 3. Fetch Comments
          const commentsRes = await fetch(`/api/backend/lessons/${id}/comments`);
          const commentsData = await commentsRes.json();
          if (commentsData.success) {
            const rawComments = commentsData.data || [];
            
            // Fetch users list to resolve commenter info on the client side
            try {
              const usersRes = await fetch("/users");
              if (usersRes.ok) {
                const usersList = await usersRes.json();
                const commentsWithAuthor = rawComments.map(comment => {
                  const commenter = usersList.find(u => u._id === comment.userId);
                  return {
                    ...comment,
                    authorName: commenter?.name || "Anonymous",
                    authorImage: commenter?.image || commenter?.photoURL
                  };
                });
                setComments(commentsWithAuthor);
              } else {
                setComments(rawComments);
              }
            } catch (err) {
              console.error("Error resolving comment users:", err);
              setComments(rawComments);
            }
          }
        } else if (lessonData.isPremiumLocked) {
          setIsLocked(true);
        } else {
          setError(lessonData.message || "Failed to fetch lesson details");
        }
      } catch (err) {
        console.error("Error fetching lesson:", err);
        setError("An error occurred while loading the lesson.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessonAndComments();
  }, [id, session?.user]);

  // Check if lesson is saved (mock implementation since favorites endpoint is backend-driven)
  useEffect(() => {
    if (!session?.user || !id) return;
    const checkFavoriteStatus = async () => {
      try {
        const tokenRes = await authClient.token();
        const token = tokenRes?.data?.token;
        if (!token) return;

        const res = await fetch(`/api/backend/users/${session.user.id}/favorites`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) return; // Server returned non-200, skip parsing
        const data = await res.json();
        if (data.success) {
          const favorites = data.data || [];
          setIsSaved(favorites.some(fav => fav.lessonId === id || fav.lessonDetails?._id === id));
        }
      } catch (err) {
        console.error("Error checking favorite status:", err);
      }
    };
    checkFavoriteStatus();
  }, [id, session?.user]);

  const handleToggleLike = async () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      if (!token) return;

      const res = await fetch(`/api/backend/lessons/${id}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId: session.user.id })
      });
      const data = await res.json();
      if (data.success) {
        setIsLiked(data.isLiked);
        setLikesCount(prev => data.isLiked ? prev + 1 : prev - 1);
        if (data.isLiked) {
          toast.success("Lesson liked! ❤️");
        } else {
          toast.success("Lesson unliked.");
        }
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleToggleSave = async () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      if (!token) return;

      // Call favorites toggle endpoint
      const res = await fetch(`/api/backend/favorites/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId: session.user.id, lessonId: id })
      });
      const data = await res.json();
      if (data.success) {
        setIsSaved(data.isFavorited);
      }
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  };

  const handleReportClick = () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }
    setShowReportModal(true);
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportReason) {
      toast.error("Please select a reason for reporting.");
      return;
    }

    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      if (!token) return;

            const res = await fetch(`/api/backend/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          lessonId: id,
          reporterUserId: session.user.id,
          reportedUserEmail: "Author details unavailable",
          reason: reportReason
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Lesson has been reported. Thank you.");
        setShowReportModal(false);
        setReportReason("");
      } else {
        toast.error(data.message || "Failed to report lesson.");
      }
    } catch (err) {
      console.error("Error reporting lesson:", err);
      toast.error("An error occurred while reporting.");
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (!commentText.trim()) return;

    try {
      setSubmittingComment(true);
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      if (!token) return;

      const res = await fetch(`/api/backend/lessons/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: session.user.id,
          text: commentText
        })
      });
      const data = await res.json();
      if (data.success) {
        // Optimistically add author metadata to match list schema
        const newComment = {
          ...data.comment,
          authorName: session.user.name,
          authorImage: session.user.image
        };
        setComments(prev => [newComment, ...prev]);
        setCommentText("");
        toast.success("Comment posted successfully! 💬");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      if (!token) return;

      const res = await fetch(`/api/backend/lessons/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ requesterId: session.user.id })
      });
      const data = await res.json();
      if (data.success) {
        setComments(prev => prev.filter(c => c._id !== commentId));
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F6F0DD] flex flex-col items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-[4px] border-[#1C1611] border-t-[#FF4A3A] rounded-full animate-spin shadow-[2px_2px_0px_0px_#1C1611]" />
          <span className="text-xs font-black uppercase text-[#1C1611] tracking-wider animate-pulse">Loading lesson context...</span>
        </div>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="min-h-screen w-full bg-[#F6F0DD] text-[#1C1611] pt-32 pb-16 px-4 flex flex-col items-center justify-center font-sans">
        <div className="w-full max-w-xl bg-white border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Top warning ribbon */}
          <div className="absolute top-0 left-0 right-0 bg-[#FFB3A7] border-b-[3.5px] border-[#1C1611] py-2 flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#FF4A3A] stroke-[2.5px]" />
            <span className="text-[10px] font-black uppercase tracking-wider">Premium Content Locked</span>
          </div>

          <div className="mt-6 mb-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-[#FFB3A7] border-2 border-[#1C1611] flex items-center justify-center shadow-[3px_3px_0px_0px_#1C1611] mb-6">
              <Lock className="w-10 h-10 text-[#FF4A3A] stroke-[2.5px]" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight leading-tight">
              Unlock the Blueprint
            </h1>
            <p className="text-sm font-bold text-[#1C1611]/80 mt-4 leading-relaxed max-w-md">
              This reflection contains premium architectural frameworks and high-value strategies meant exclusively for our Premium Tier members.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              href="/pricing"
              className="w-full sm:w-auto bg-[#FF4A3A] text-white font-black uppercase text-center px-8 py-3.5 rounded-xl border-[2.5px] border-[#1C1611] shadow-[4px_4px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              Upgrade to Premium
            </Link>
            <Link
              href="/lessons"
              className="w-full sm:w-auto bg-white text-[#1C1611] font-black uppercase text-center px-8 py-3.5 rounded-xl border-[2.5px] border-[#1C1611] shadow-[4px_4px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              Back to Free Feed
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen w-full bg-[#F6F0DD] text-[#1C1611] pt-32 pb-16 px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] p-8 text-center">
          <h2 className="text-2xl font-black uppercase">Something Went Wrong</h2>
          <p className="text-sm font-bold text-[#1C1611]/70 mt-2">{error || "Lesson could not be loaded."}</p>
          <Link
            href="/lessons"
            className="mt-6 inline-flex items-center gap-2 bg-[#FCD34D] text-[#1C1611] font-black uppercase px-6 py-3 rounded-xl border-[2.5px] border-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1C1611] transition-all"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5px]" />
            Back to Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 font-sans">
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col gap-8">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between border-b-[3px] border-[#1C1611] pb-5">
          <Link
            href="/lessons"
            className="w-10 h-10 rounded-xl bg-white border-2 border-[#1C1611] flex items-center justify-center text-[#1C1611] shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 shrink-0 cursor-pointer"
            aria-label="Back to lessons"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3px]" />
          </Link>
          
          <div className="flex items-center gap-3">
            <ShareButton lessonId={id} title={lesson?.title} direction="down" />
            {/* Bookmark/Save button */}
            {lesson.accessLevel !== "Premium" && !lesson.isPremium && (
              <button
                onClick={handleToggleSave}
                className={`w-10 h-10 rounded-xl border-2 border-[#1C1611] flex items-center justify-center shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 cursor-pointer ${isSaved ? "bg-[#FF4A3A] text-white" : "bg-white text-[#1C1611]"}`}
                aria-label="Bookmark lesson"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? "fill-white" : "stroke-current stroke-[2.5px]"}`} />
              </button>
            )}
          </div>
        </div>

        {/* Lesson Wrapper */}
        <article className="w-full bg-white border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] overflow-hidden flex flex-col">
          {/* Header Image banner if exists */}
          <div className="relative w-full aspect-[21/9] bg-[#FFB3A7] border-b-[3.5px] border-[#1C1611] overflow-hidden">
            <Image
              src={lesson.imageUrl || "/pen-and-notebook.jpg"}
              alt={lesson.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-6 sm:p-10 flex flex-col gap-6">
            
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2.5">
              <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border-2 border-[#1C1611] bg-[#FF4A3A] text-white shadow-[2px_2px_0px_0px_#1C1611]">
                {lesson.category}
              </span>
              <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border-2 border-[#1C1611] bg-[#FCD34D] text-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611]">
                {lesson.emotionalTone}
              </span>
              {lesson.accessLevel === "Premium" && (!session?.user?.isPremium && session?.user?.role !== "admin") && (
                <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border-2 border-[#1C1611] bg-[#4DD0B1] text-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-current" />
                  Premium
                </span>
              )}
            </div>

            {/* Lesson Title */}
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1C1611] leading-tight">
              {lesson.title}
            </h1>

            {/* Author Footer */}
            <div className="flex items-center gap-3 border-y-2 border-[#1C1611]/10 py-4 mt-2">
              {lesson.authorImage || lesson.authorPhotoURL ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#1C1611]">
                  <Image 
                    src={lesson.authorImage || lesson.authorPhotoURL} 
                    alt={lesson.authorName || "Author"} 
                    fill 
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#4DD0B1] text-[#1C1611] border-2 border-[#1C1611] text-sm font-black flex items-center justify-center shadow-[1.5px_1.5px_0px_0px_#1C1611]">
                  {lesson.authorName ? lesson.authorName.charAt(0).toUpperCase() : "?"}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase text-[#1C1611]">
                  {lesson.authorName || "Unknown Author"}
                </span>
                <span className="text-[10px] font-bold uppercase text-[#1C1611]/60">
                  Published {new Date(lesson.createdAt).toLocaleDateString(undefined, { dateStyle: "long" })}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="prose max-w-none text-[#1C1611]/90 font-bold leading-relaxed text-base sm:text-lg py-4 border-b-2 border-[#1C1611]/10 whitespace-pre-wrap">
              {lesson.description}
            </div>

            {/* Interactivity Actions (Like) */}
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={handleToggleLike}
                className={`flex items-center gap-2 px-4 py-2 border-2 border-[#1C1611] rounded-xl font-black text-xs uppercase shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 cursor-pointer ${isLiked ? "bg-[#FFB3A7]" : "bg-white"}`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-[#FF4A3A] stroke-[#FF4A3A]" : "stroke-current stroke-[2.5px]"}`} />
                <span>{likesCount} {likesCount === 1 ? "Like" : "Likes"}</span>
              </button>
              
              {/* Report Button */}
              <button 
                onClick={handleReportClick}
                className={`ml-auto flex items-center gap-2 px-4 py-2 border-2 border-[#1C1611] rounded-xl font-black text-xs uppercase bg-white text-[#1C1611] shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 cursor-pointer hover:bg-red-50 hover:text-red-600`}
              >
                <Flag className="w-4 h-4 stroke-[2.5px]" />
                <span>Report</span>
              </button>
            </div>

          </div>
        </article>

        {/* Comments Section */}
        <section className="w-full flex flex-col gap-6 mt-4">
          <h3 className="text-xl font-black uppercase tracking-tight text-[#1C1611] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 stroke-[2.5px]" />
            Discussions ({comments.length})
          </h3>

          {/* Post Comment Form */}
          <form onSubmit={handlePostComment} className="w-full flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={session?.user ? "Add to the discussion..." : "Log in to join the discussion."}
              disabled={!session?.user || submittingComment}
              className="flex-grow bg-white border-2 border-[#1C1611] rounded-xl px-4 py-3 text-sm font-bold text-[#1C1611] placeholder-[#1C1611]/45 focus:outline-none shadow-[3px_3px_0px_0px_#1C1611] disabled:bg-neutral-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!session?.user || submittingComment || !commentText.trim()}
              className="bg-[#4DD0B1] text-[#1C1611] font-black uppercase text-xs px-6 py-3 rounded-xl border-2 border-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[2px_2px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 stroke-[2.5px]" />
              Post
            </button>
          </form>

          {/* Comments List */}
          <div className="flex flex-col gap-4">
            {comments.length === 0 ? (
              <div className="w-full bg-[#1C1611]/5 border-2 border-dashed border-[#1C1611]/20 rounded-2xl py-10 text-center font-bold text-sm text-[#1C1611]/50 uppercase">
                No thoughts shared yet. Be the first!
              </div>
            ) : (
              comments.map((comment) => {
                const canDelete = session?.user && (session.user.id === comment.userId || session.user.role === "admin");
                return (
                  <div 
                    key={comment._id}
                    className="w-full bg-white border-2 border-[#1C1611] rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0px_0px_#1C1611] flex gap-4"
                  >
                    {/* User profile image/initials */}
                    {comment.authorImage ? (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#1C1611] shrink-0">
                        <Image 
                          src={comment.authorImage} 
                          alt={comment.authorName || "Author"} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#FCD34D] text-[#1C1611] border-2 border-[#1C1611] text-xs font-black flex items-center justify-center shrink-0">
                        {comment.authorName ? comment.authorName.charAt(0).toUpperCase() : "?"}
                      </div>
                    )}
                    
                    <div className="flex-grow flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-black uppercase tracking-tight text-[#1C1611]">
                            {comment.authorName || "Anonymous"}
                          </span>
                          <span className="text-[9px] font-bold uppercase text-[#1C1611]/45">
                            {new Date(comment.createdAt).toLocaleDateString(undefined, { dateStyle: "short" })}
                          </span>
                        </div>
                        {canDelete && (
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-[#FF4A3A] hover:bg-red-50 p-1.5 rounded-lg border border-transparent hover:border-[#1C1611]/15 transition-all cursor-pointer"
                            aria-label="Delete comment"
                          >
                            <Trash2 className="w-3.5 h-3.5 stroke-[2.5px]" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm font-medium text-[#1C1611]/85 leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1611]/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] overflow-hidden flex flex-col">
            <div className="bg-[#FFB3A7] border-b-[3.5px] border-[#1C1611] p-5 flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-[#FF4A3A] stroke-[2.5px]" />
              <h2 className="text-xl font-black uppercase text-[#1C1611] tracking-tight">Report Lesson</h2>
            </div>
            
            <form onSubmit={handleReportSubmit} className="p-6 flex flex-col gap-5">
              <p className="text-sm font-bold text-[#1C1611]/80">
                Help us understand what's wrong with this lesson. Your report will be reviewed by our moderation team.
              </p>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="reportReason" className="text-xs font-black uppercase tracking-wider text-[#1C1611]">
                  Select Reason
                </label>
                <select
                  id="reportReason"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full bg-[#F6F0DD] border-[2.5px] border-[#1C1611] rounded-xl px-4 py-3 text-sm font-bold text-[#1C1611] focus:outline-none shadow-[3px_3px_0px_0px_#1C1611] appearance-none"
                  required
                >
                  <option value="" disabled>Choose a category...</option>
                  <option value="Inappropriate Content">Inappropriate Content</option>
                  <option value="Spam or Misleading">Spam or Misleading</option>
                  <option value="Harassment or Hate Speech">Harassment or Hate Speech</option>
                  <option value="Intellectual Property Violation">Intellectual Property Violation</option>
                  <option value="Low Quality / Plagiarism">Low Quality / Plagiarism</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowReportModal(false);
                    setReportReason("");
                  }}
                  className="px-5 py-2.5 rounded-xl font-black text-xs uppercase bg-white text-[#1C1611] border-[2.5px] border-[#1C1611] shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-black text-xs uppercase bg-[#FF4A3A] text-white border-[2.5px] border-[#1C1611] shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 cursor-pointer"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}