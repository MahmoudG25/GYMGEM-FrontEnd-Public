import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useToast } from "../../context/ToastContext";
import axiosInstance from "../../utils/axiosConfig";

const AddSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const course = location.state?.course;
  const lesson = location.state?.lesson;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveSectionAPI = async (sectionData) => {
    if (!course || !lesson) {
      showToast("Missing course or lesson data", { type: "error" });
      return null;
    }

    const payload = {
      title: sectionData.title,
      content_type: sectionData.contentType,
      content_url: sectionData.contentUrl || "",
      content_text: sectionData.contentText || "",
      lesson: lesson.id,
      order: sectionData.order
    };

    // ✅ Using axiosInstance - no manual token needed!
    try {
      const res = await axiosInstance.post(`/api/courses/sections/create/`, payload);
      console.log(res.data)
      return res.data;

    } catch (error) {
      console.log(error)
      showToast("Error saving section", { type: "error" });
    }


  };

  const onSubmitAndCreateAnother = async (data) => {
    setIsSubmitting(true);
    try {
      await saveSectionAPI(data);
      showToast("Section created successfully!", { type: "success" });
      reset();
    } catch (err) {
      console.log(err)
      showToast("Error saving section", { type: "error" });
    }
    setIsSubmitting(false);
  };

  const onSubmitAndGoToNextLesson = async (data) => {
    setIsSubmitting(true);
    try {
      await saveSectionAPI(data);
      showToast("Section created successfully!", { type: "success" });
      navigate("/trainer/addlesson", { state: { course } });
    } catch (err) {
      showToast("Error saving section", { type: "error" });
    }

    setIsSubmitting(false);
  };

  const onSubmitAndFinish = async (data) => {
    setIsSubmitting(true);
    try {
      await saveSectionAPI(data);
      showToast("Section created successfully!", { type: "success" });
      navigate("/trainer/courses", { state: { course } });
    } catch (err) {
      showToast("Error saving section", { type: "error" });
    }

    setIsSubmitting(false);
  };

  if (!course || !lesson) {
    return (
      <>
        <Navbar />
        <section className="w-full flex items-center justify-center min-h-[60vh] pt-[2rem] pb-[2rem]">
          <div className="text-center">
            <h1 className="text-[#FF8211] text-[3rem] bebas-medium mb-4">
              No Course or Lesson Data
            </h1>
            <p className="text-[#555555] text-[1rem] poppins-regular mb-6">
              Please start from creating a course and lesson first.
            </p>
            <button
              onClick={() => navigate("/addcourse")}
              className="bg-[#FF8211] text-white px-6 py-2 rounded-full bebas-regular text-[18px] hover:opacity-80 transition"
            >
              Go to Add Course
            </button>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="w-full flex pt-[2rem] pb-[2rem]">
        <div className="w-[80%] m-auto flex justify-center items-center flex-wrap">
          <div className="flex flex-col justify-center max-w-md w-[100%] pt-[2rem] pb-[2rem]">
            <div>
              <h1 className="text-[#FF8211] text-[4rem] bebas-medium">
                Add Section
              </h1>
            </div>
            <div>
              <p className="text-[#555555] text-[1rem] poppins-regular">
                Create content sections for: <strong>{lesson.title}</strong>
              </p>
              <p className="text-[#888888] text-[0.875rem] poppins-regular mt-1">
                Course: {course.title}
              </p>
            </div>
          </div>

          <div className="flex justify-center w-[100%]">
            <div className="w-full max-w-md flex flex-col gap-6">
              {/* Form for Create Another */}
              <form
                onSubmit={handleSubmit(onSubmitAndCreateAnother)}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="poppins-medium text-[1rem] block mb-1">
                    Section Title
                  </label>
                  <input
                    {...register("title", { required: "Section title is required" })}
                    placeholder="Introduction to Warm-up Exercises"
                    className="w-full border rounded-md p-[10px] text-[#000] poppins-extralight"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="">
                  <label className="poppins-medium text-[1rem]">Section Order</label>
                  <input
                    type="number"
                    {...register("order", { required: true })}
                    placeholder="Section number"
                    className="w-full border rounded-md p-[10px]  text-[#000] poppins-extralight"
                  />
                </div>

                <div>
                  <label className="poppins-medium text-[1rem] block mb-1">
                    Content Type
                  </label>
                  <select
                    {...register("contentType", { required: "Content type is required" })}
                    className="w-full border rounded-md p-[10px] text-[#000] poppins-extralight"
                  >
                    <option value="">Select Content Type</option>
                    <option value="video">Video</option>
                    <option value="article">Article</option>
                    <option value="pdf">PDF</option>
                    <option value="image">Image</option>
                    <option value="audio">Audio</option>
                    <option value="doc">DOC</option>
                    <option value="ppt">PPT</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.contentType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contentType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="poppins-medium text-[1rem] block mb-1">
                    Content URL
                  </label>
                  <input
                    {...register("contentUrl")}
                    placeholder="https://example.com/video.mp4"
                    className="w-full border rounded-md p-[10px] text-[#000] poppins-extralight"
                  />
                </div>

                <div>
                  <label className="poppins-medium text-[1rem] block mb-1">
                    Content Text
                  </label>
                  <textarea
                    {...register("contentText")}
                    placeholder="Add any additional text, instructions, or description for this section"
                    className="w-full border rounded-md p-[10px] text-[#000] poppins-extralight h-[125px]"
                    rows={4}
                  />
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#FF8211] text-white text-[16px] py-3 px-6 rounded-full shadow-md transition duration-150 ease-in-out hover:opacity-80 focus:opacity-90 active:opacity-100 bebas-regular disabled:opacity-50"
                  >
                    ➕ Submit & Create Another Section
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit(onSubmitAndGoToNextLesson)}
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white text-[16px] py-3 px-6 rounded-full shadow-md transition duration-150 ease-in-out hover:opacity-80 focus:opacity-90 active:opacity-100 bebas-regular disabled:opacity-50"
                  >
                    ➡️ Submit & Go to Next Lesson
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit(onSubmitAndFinish)}
                    disabled={isSubmitting}
                    className="bg-green-600 text-white text-[16px] py-3 px-6 rounded-full shadow-md transition duration-150 ease-in-out hover:opacity-80 focus:opacity-90 active:opacity-100 bebas-regular disabled:opacity-50"
                  >
                    ✓ Submit & Finish
                  </button>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="text-[#FF8211] poppins-regular text-[14px] hover:text-[#FFAB63] transition duration-300"
                  >
                    ← Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AddSection;