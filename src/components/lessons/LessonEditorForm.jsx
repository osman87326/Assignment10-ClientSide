"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Smile, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Image from "next/image";
import UpgradeModal from "./UpgradeModal";

export default function LessonEditorForm({ lessonId = null }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Philosophy & Ethics");
  const [tone, setTone] = useState("Contemplative");
  const [isPremium, setIsPremium] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const isEditMode = Boolean(lessonId);

  // Load existing lesson data in edit mode
  useEffect(() => {
    if (!lessonId) return;

    const fetchLesson = async () => {
      try {
        setIsLoading(true);
        const tokenRes = await authClient.token();
        const token = tokenRes?.data?.token;
        if (!token) return;

        const res = await fetch(`/api/backend/lessons/${lessonId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) {
          toast.error("Failed to load lesson.");
          return;
        }
        const data = await res.json();
        if (data.success) {
          const lesson = data.data;
          setTitle(lesson.title || "");
          setContent(lesson.description || "");
          setCategory(lesson.category || "Philosophy & Ethics");
          setTone(lesson.emotionalTone || "Contemplative");
          setIsPremium(lesson.accessLevel === "Premium");
          setCoverImage(lesson.imageUrl || "");
        }
      } catch (err) {
        console.error("Error fetching lesson for edit:", err);
        toast.error("Error loading lesson data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleSubmit = async (e, asDraft = false) => {
    e.preventDefault();
    if (!session?.user) {
      router.push("/login");
      return;
    }
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    try {
      setIsSaving(true);
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      if (!token) return;

      const body = {
        title: title.trim(),
        description: content.trim(),
        category,
        emotionalTone: tone,
        visibility: asDraft ? "Private" : "Public",
        accessLevel: isPremium ? "Premium" : "Free",
        imageUrl: coverImage,
      };

      let res;
      if (isEditMode) {
        // PATCH existing lesson
        res = await fetch(`/api/backend/lessons/${lessonId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ ...body, requesterId: session.user.id })
        });
      } else {
        // POST new lesson
        res = await fetch(`/api/backend/lessons`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ ...body, creatorId: session.user.id })
        });
      }

      const data = await res.json();
      if (data.success) {
        toast.success(
          isEditMode
            ? "Lesson updated successfully! ✨"
            : asDraft
              ? "Draft saved! 📝"
              : "Lesson published! 🎉"
        );
        router.push("/my-lessons");
      } else {
        if (data.requiresUpgrade) {
          setIsUpgradeModalOpen(true);
        } else {
          toast.error(data.message || "Something went wrong.");
        }
      }
    } catch (err) {
      console.error("Error saving lesson:", err);
      toast.error("Failed to save lesson.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        toast.error("ImgBB API key is missing. Please add NEXT_PUBLIC_IMGBB_API_KEY to .env");
        setIsUploadingImage(false);
        return;
      }

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setCoverImage(data.data.url);
        toast.success("Image uploaded successfully! 📸");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("An error occurred during upload.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-[3px] border-[#1C1611] border-t-[#FF4A3A] rounded-full animate-spin" />
          <span className="text-xs font-black uppercase text-[#1C1611]/70">Loading lesson...</span>
        </div>
      </div>
    );
  }

  return (
    <>
    <form onSubmit={(e) => handleSubmit(e, false)} className="w-full flex flex-col flex-grow gap-8">

      {/* Dropdown Selection Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        
        {/* Category Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#1C1611]/70">
            Category
          </label>
          <div className="w-full">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 bg-[#F6F0DD] border-[2.5px] border-[#1C1611] rounded-xl px-4 text-xs font-black uppercase text-[#1C1611] focus:outline-none cursor-pointer shadow-[2px_2px_0px_0px_#1C1611] transition-all"
            >
              <option value="Philosophy & Ethics" className="bg-[#F6F0DD] text-[#1C1611]">Philosophy & Ethics</option>
              <option value="Productivity" className="bg-[#F6F0DD] text-[#1C1611]">Productivity</option>
              <option value="Mindset" className="bg-[#F6F0DD] text-[#1C1611]">Mindset</option>
              <option value="Leadership" className="bg-[#F6F0DD] text-[#1C1611]">Leadership</option>
              <option value="Personal Growth" className="bg-[#F6F0DD] text-[#1C1611]">Personal Growth</option>
              <option value="Health & Wellness" className="bg-[#F6F0DD] text-[#1C1611]">Health & Wellness</option>
              <option value="Relationships" className="bg-[#F6F0DD] text-[#1C1611]">Relationships</option>
              <option value="Career" className="bg-[#F6F0DD] text-[#1C1611]">Career</option>
            </select>
          </div>
        </div>

        {/* Emotional Tone Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#1C1611]/70">
            Emotional Tone
          </label>
          <div className="w-full">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full h-11 bg-[#F6F0DD] border-[2.5px] border-[#1C1611] rounded-xl px-4 text-xs font-black uppercase text-[#1C1611] focus:outline-none cursor-pointer shadow-[2px_2px_0px_0px_#1C1611] transition-all"
            >
              <option value="Contemplative" className="bg-[#F6F0DD] text-[#1C1611]">Contemplative</option>
              <option value="Analytical" className="bg-[#F6F0DD] text-[#1C1611]">Analytical</option>
              <option value="Motivational" className="bg-[#F6F0DD] text-[#1C1611]">Motivational</option>
              <option value="Reflective" className="bg-[#F6F0DD] text-[#1C1611]">Reflective</option>
              <option value="Inspirational" className="bg-[#F6F0DD] text-[#1C1611]">Inspirational</option>
            </select>
          </div>
        </div>
      </div>

      {/* Editorial Workspace Editor Fields */}
      <div className="flex flex-col gap-6 flex-grow min-h-[300px]">
        {/* Cover Image Uploader */}
        <div className="w-full flex flex-col gap-3">
          {coverImage ? (
            <div className="relative w-full h-48 md:h-64 rounded-xl border-[3px] border-[#1C1611] overflow-hidden shadow-[4px_4px_0px_0px_#1C1611]">
              <Image src={coverImage} alt="Cover" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              <button
                type="button"
                onClick={() => setCoverImage("")}
                className="absolute top-3 right-3 bg-[#FF4A3A] text-white px-3 py-1.5 rounded-lg border-[2.5px] border-[#1C1611] font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1C1611] transition-all cursor-pointer"
              >
                Remove Cover
              </button>
            </div>
          ) : (
            <label className="w-full h-32 border-[3px] border-dashed border-[#1C1611] rounded-xl flex flex-col items-center justify-center cursor-pointer bg-[#F6F0DD] hover:bg-white transition-colors group">
              <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploadingImage} className="hidden" />
              {isUploadingImage ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-[3px] border-[#1C1611] border-t-[#FF4A3A] rounded-full animate-spin" />
                  <span className="text-[10px] font-black uppercase text-[#1C1611]/70 tracking-wider">Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 group-hover:-translate-y-1 transition-transform">
                  <ImageIcon className="w-8 h-8 text-[#1C1611] stroke-[2.5px]" />
                  <span className="text-xs font-black uppercase text-[#1C1611] tracking-wider">Add Cover Image</span>
                </div>
              )}
            </label>
          )}
        </div>

        {/* Title Input field */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Lesson"
          className="w-full bg-[#F6F0DD] border-[3px] border-[#1C1611] p-4 text-xl font-black uppercase text-[#1C1611] placeholder-[#1C1611]/30 focus:outline-none rounded-xl shadow-[4px_4px_0px_0px_#1C1611] focus:translate-x-[1.5px] focus:translate-y-[1.5px] focus:shadow-[2.5px_2.5px_0px_0px_#1C1611] transition-all"
        />

        {/* Dynamic Context Body Textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Preserve your wisdom... Start writing the core narrative of your lesson here. Markdown is supported."
          className="w-full flex-grow bg-[#F6F0DD] border-[3px] border-[#1C1611] p-4 text-sm font-bold text-[#1C1611] placeholder-[#1C1611]/35 focus:outline-none resize-none min-h-[250px] rounded-xl shadow-[4px_4px_0px_0px_#1C1611] focus:translate-x-[1.5px] focus:translate-y-[1.5px] focus:shadow-[2.5px_2.5px_0px_0px_#1C1611] transition-all"
        />
      </div>

      {/* Editor Layout Footer Control Bar */}
      <footer className="w-full border-t-[3.5px] border-[#1C1611] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
        {/* Premium Visibility Toggle Switch */}
        <label className="inline-flex items-center gap-3 bg-white border-2 border-[#1C1611] px-4 h-11 rounded-xl cursor-pointer select-none self-start sm:self-auto shadow-[2px_2px_0px_0px_#1C1611]">
          <input
            type="checkbox"
            checked={isPremium}
            onChange={() => setIsPremium(!isPremium)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-white border-2 border-[#1C1611] rounded-full transition-colors peer-checked:bg-[#4DD0B1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#1C1611] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-[20px]" />
          <span className="text-[10px] font-black text-[#1C1611] uppercase tracking-wider">
            Premium Visibility
          </span>
        </label>

        {/* Action Button Set */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            disabled={isSaving}
            onClick={(e) => handleSubmit(e, true)}
            className="h-11 px-6 bg-[#FCD34D] border-[2.5px] border-[#1C1611] text-[#1C1611] font-black uppercase text-xs rounded-xl shadow-[2px_2px_0px_0px_#1C1611] hover:bg-[#FF4A3A] active:translate-y-0.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="h-11 px-6 bg-[#FF4A3A] text-white border-[2.5px] border-[#1C1611] font-black uppercase text-xs rounded-xl shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 cursor-pointer whitespace-nowrap disabled:opacity-50"
          >
            {isSaving ? "Saving..." : isEditMode ? "Update Lesson" : "Publish Lesson"}
          </button>
        </div>
      </footer>

    </form>
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
      />
    </>
  );
}