import Navbar from "../Navbar";
import Footer from "../Footer";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import axiosInstance from "../../utils/axiosConfig";

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { showToast } = useToast();

  const onSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      // ✅ No manual token handling needed!

      const payload = {
        title: data.title,
        price: data.price,
        cover: data.coverUrl || "http://example.com",
        status: data.status || "draft",
        description: data.description,
        preview_video: data.previewUrl || "http://example.com",
        trainer_profile: user?.id || 0,
        category: parseInt(data.category),
        level: parseInt(data.level),
        language: data.language,
      };

      const response = await axiosInstance.post(
        `${VITE_API_URL}/api/courses/courses/create/`,
        payload
      );

      showToast("Course created successfully!", { type: "success" });
      navigate("/trainer/addlesson", { state: { course: response.data } });
    } catch (error) {
      console.error("Error creating course:", error);
      showToast(
        error.response?.data?.detail || "Failed to create course. Please try again.",
        { type: "error" }
      );
    }
  };

  return (
    <>
      <Navbar />
      <section className="w-full flex items-center pt-[2rem] pb-[2rem]">
        <div className="w-[80%] m-auto flex justify-center items-center gap-[11px] flex-wrap mb-[2rem]">
          <div className="flex flex-col justify-center max-w-md w-[100%] pt-[2rem] pb-[3rem]">
            <div className="">
              <h1 className="text-[#FF8211] text-[4rem] bebas-medium">
                Add course
              </h1>
            </div>
            <div className="mt-[6px]">
              <p className="text-[#555555] text-[1rem] poppins-regular">
                Fill out the details below to create your course
              </p>
            </div>
          </div>
          {/* -------------------------------------------------------------- */}
          <div className="flex flex-col justify-center items-center w-[100%]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-md flex flex-col gap-4"
            >
              <div>
                <div className="pb-[0.25rem]">
                  <label className="poppins-medium  text-[1rem]">
                    Course Title
                  </label>
                </div>
                <div>
                  <input
                    {...register("title", { required: true })}
                    placeholder="Strength Training for Beginners"
                    className="w-full border rounded-md p-[10px]  text-[#000] poppins-extralight"
                  />
                </div>
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    This field is required
                  </p>
                )}
              </div>

              <div>
                <div className="pb-[0.25rem]">
                  <label className="poppins-medium text-[1rem]">Category</label>
                </div>
                <div>
                  <select
                    {...register("category", { required: true })}
                    className="w-full border rounded-md p-[10px] text-[#000] poppins-extralight"
                  >
                    <option value="">Select Category</option>
                    <option value={1}>Strength Training</option>
                    <option value={2}>Cardio & Endurance</option>
                    <option value={3}>Flexibility & Mobility</option>
                    <option value={4}>Bodyweight Only</option>
                    <option value={5}>Yoga</option>
                    <option value={6}>Pilates</option>
                    <option value={7}>Recovery & Prehab</option>
                    <option value={8}>Meditation & Breathwork</option>
                    <option value={9}>Beginner's Journey</option>
                    <option value={10}>Fat Loss & Toning</option>
                    <option value={11}>Build Muscle Mass</option>
                    <option value={12}>Prenatal & Postnatal</option>
                    <option value={13}>Dance Fitness</option>
                    <option value={14}>Sport-Specific Training</option>
                    <option value={15}>Equipment Specific</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="pb-[0.25rem]">
                  <label className="poppins-medium text-[1rem]">Level</label>
                </div>
                <div>
                  <select
                    {...register("level", { required: true })}
                    className="w-full border rounded-md p-[10px]  text-[#000] poppins-extralight"
                  >
                    <option
                      className=" p-[10px]  text-[#000] poppins-extralight"
                      value=""
                    >
                      Select Level
                    </option>
                    <option
                      className=" p-[10px]  text-[#000] poppins-extralight"
                      value={1}
                    >
                      Beginner
                    </option>
                    <option
                      className=" p-[10px]  text-[#000] poppins-extralight"
                      value={2}
                    >
                      Intermediate
                    </option>
                    <option
                      className=" p-[10px]  text-[#000] poppins-extralight"
                      value={3}
                    >
                      Advanced
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <div className="pb-[0.25rem]">
                  <label className="poppins-medium text-[1rem]">Language</label>
                </div>
                <div>
                  <select
                    {...register("language", { required: true })}
                    className="w-full border rounded-md p-[10px]  text-[#000] poppins-extralight"
                  >
                    <option
                      className=" p-[10px]  text-[#000] poppins-extralight"
                      value=""
                    >
                      Select Language
                    </option>
                    <option
                      className=" p-[10px]  text-[#000] poppins-extralight"
                      value="AR"
                    >
                      Arabic
                    </option>
                    <option
                      className=" p-[10px]  text-[#000] poppins-extralight"
                      value="EN"
                    >
                      English
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <div className="pb-[0.25rem]">
                  <label className="poppins-medium text-[1rem]">Price</label>
                </div>
                <div>
                  <input
                    {...register("price", {
                      required: "Price is required",
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Enter a valid price (max 2 decimals)",
                      },
                    })}
                    placeholder="99.99"
                    className="w-full border rounded-md p-[10px] text-[#000] poppins-extralight"
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <div className="pb-[0.25rem]">
                  <label className="poppins-medium text-[1rem]">
                    Cover URL
                  </label>
                </div>
                <div>
                  <input
                    {...register("coverUrl")}
                    placeholder="Paste your course cover image link"
                    className="w-full border rounded-md p-[10px]  text-[#000] poppins-extralight"
                  />
                </div>
              </div>

              <div>
                <div className="pb-[0.25rem]">
                  <label className="poppins-medium text-[1rem]">
                    Preview Video URL
                  </label>
                </div>
                <div>
                  <input
                    {...register("previewUrl")}
                    placeholder="Paste your course preview video link"
                    className="w-full border rounded-md p-[10px]  text-[#000] poppins-extralight"
                  />
                </div>
              </div>

              <div>
                <div className="pb-[0.25rem]">
                  <label className="poppins-medium text-[1rem]">
                    Description
                  </label>
                </div>
                <div>
                  {" "}
                  <textarea
                    {...register("description", { required: true })}
                    placeholder="Write a short description about your course"
                    className="w-full border rounded-md p-[10px]  text-[#000] poppins-extralight h-[125px]"
                    rows={4}
                  ></textarea>
                </div>
              </div>

              <div>
                <div className="pb-[0.25rem]">
                  <label className="poppins-medium text-[1rem]">Status</label>
                </div>
                <div>
                  <select
                    {...register("status", { required: true })}
                    className="w-full border rounded-md p-[10px]  text-[#000] poppins-extralight"
                  >
                    <option
                      className=" p-[10px]  text-[#000] poppins-extralight"
                      value=""
                    >
                      Select Status
                    </option>
                    <option
                      className=" p-[10px]  text-[#000] poppins-extralight"
                      value="draft"
                    >
                      Draft
                    </option>
                    <option
                      className=" p-[10px]  text-[#000] poppins-extralight"
                      value="published"
                    >
                      Published
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex justify-start w-full pt-[1.5rem]">
                <button
                  type="submit"
                  className="bg-[#FF8211] text-white text-[18px] items-center h-[32px] w-[121px] rounded-full  shadow-md transition duration-150 ease-in-out hover:opacity-80 focus:opacity-90 active:opacity-100 bebas-regular"
                >
                  NEXT
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default AddCourse;
