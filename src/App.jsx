import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Trainees from "./pages/Trainees";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Trainers from "./pages/Trainers";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignUpPage from "./pages/auth/Register.jsx";
import Dashboard from "./pages/Dashboard";
import NotFound from "./components/NotFound.jsx";
import Community from "./pages/Community.jsx";
import Coursedetails from "./components/courses/CourseDetails.jsx";
import Viewprofile from "./components/Viewprofile.jsx";
import Store from "./pages/Store.jsx";

// forms
import Selectrole from "./components/SelectRole";
import Trainerform from "./components/Forms/Trainer/TrainerForm.jsx";
import TrainerSpecialization from "./components/Forms/Trainer/TrainerSpecialization.jsx";
import TrainerExperience from "./components/Forms/Trainer/TrainerExperience.jsx";
import Traineeform from "./components/Forms/Trainee/TraineeForm.jsx";
import TraineeRecord from "./components/Forms/Trainee/TraineeRecord.jsx";

// layout
import RootLayout from "./Layout/Rootlayout";

// details
import RequestDetails from "./pages/DetailsTrainees";
import AddCourse from "./components/courses/AddCourse.jsx";
import NewLeason from "./components/courses/NewLesson.jsx";
import AddSection from "./components/courses/AddSection.jsx";
import Goodbye from "./pages/Goodbye.jsx";

// dashboard trainer
import DashboardTrainer from "./components/Dashboard/Trainer/DashboardTrainer.jsx";
import CoursesTrainerDash from "./components/Dashboard/Trainer/CoursesTrainerDash.jsx";
import ClientTrainerDash from "./components/Dashboard/Trainer/ClientTrainerDash.jsx";
import TrainerprofileDash from "./components/Dashboard/Trainer/TrainerprofileDash.jsx";
import CourseDetailsDash from "./components/Dashboard/Trainer/CourseDetailsDash.jsx";

// dashboard trainee
import TraineeDash from "./components/Dashboard/Traine/TraineeDash.jsx";
import SettingsTrainee from "./components/Dashboard/Traine/SettingsTrainee.jsx";
import CoursesTraineDash from "./components/Dashboard/Traine/CoursesTraineDash.jsx";
import CourseDetails from "./components/courses/CourseDetails.jsx";
import Settings from "./components/Settings.jsx";
import PublicTrainerProfile from "./components/PublicTrainerProfile.jsx";
import Favorite from "./components/Dashboard/Traine/Favorite.jsx";
import CourseEnroll from "./components/courses/CourseEnroll.jsx";
// Checkout components
import Checkout from "./components/BuyNow/Checkout.jsx";
import OrderSuccess from "./components/BuyNow/OrderSuccess.jsx";
// dashboard gym
import GymDashboard from "./components/Dashboard/GYM/GymDashboard.jsx";
import GymMember from "./components/Dashboard/GYM/GymMember.jsx";
import GymSessions from "./components/Dashboard/GYM/GymSessions.jsx";
import GymClasses from "./components/Dashboard/GYM/GymClasses.jsx";
import Gymprofile from "./components/Dashboard/GYM/Gymprofile.jsx";

// dashboard store
import StoreDashboard from "./components/Dashboard/Store/StoreDashboard.jsx";
import Storeprofile from "./components/Dashboard/Store/Storeprofile.jsx";
import StoreProduct from "./components/Dashboard/Store/StoreProduct.jsx";
import StoreOrder from "./components/Dashboard/Store/StoreOrder.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import useAuthCheck from "./hooks/useAuthCheck.js";




function App() {
  const location = useLocation();


  useAuthCheck();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* -------------------- PUBLIC + LAYOUT -------------------- */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="trainees" element={<Trainees />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="requestdetails" element={<RequestDetails />} />


          <Route path="community" element={<Community />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/trainer-profile/:id" element={<PublicTrainerProfile />} />
          <Route path="viewprofile" element={<Viewprofile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/courses/:id/learn" element={<CourseEnroll />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success/:orderId" element={<OrderSuccess />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/stores" element={<Store />} />
        </Route>

        {/* -------------------- TRAINER DASHBOARD -------------------- */}
        <Route path="trainer">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProtectedRoute requiredProfile="trainer"><DashboardTrainer /></ProtectedRoute>} />
          <Route path="courses" element={<ProtectedRoute requiredProfile="trainer"><CoursesTrainerDash /></ProtectedRoute>} />
          <Route path="courses/:id" element={<ProtectedRoute requiredProfile="trainer"><CourseDetailsDash /></ProtectedRoute>} />
          <Route path="clients" element={<ProtectedRoute requiredProfile="trainer"><ClientTrainerDash /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute requiredProfile="trainer"><TrainerprofileDash /></ProtectedRoute>} />
          <Route path="addlesson" element={<ProtectedRoute requiredProfile="trainer"><NewLeason /></ProtectedRoute>} />
          <Route path="addsection" element={<ProtectedRoute requiredProfile="trainer"><AddSection /></ProtectedRoute>} />
          <Route path="addcourse" element={<ProtectedRoute requiredProfile="trainer"><AddCourse /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute requiredProfile="trainer"><SettingsTrainee /></ProtectedRoute>} />
        </Route>

        {/* -------------------- TRAINEE DASHBOARD -------------------- */}
        <Route path="trainee">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProtectedRoute requiredProfile="trainee"><TraineeDash /></ProtectedRoute>} />
          <Route path="courses" element={<ProtectedRoute requiredProfile="trainee"><CoursesTraineDash /></ProtectedRoute>} />
          <Route path="courses/:id" element={<ProtectedRoute requiredProfile="trainee"><CourseDetails /></ProtectedRoute>} />
          <Route path="favorite" element={<ProtectedRoute requiredProfile="trainee"><Favorite /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute requiredProfile="trainee"><SettingsTrainee /></ProtectedRoute>} />
        </Route>
        {/* -------------------- GYM DASHBOARD -------------------- */}
        <Route path="gym">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProtectedRoute requiredProfile="gym"><GymDashboard /></ProtectedRoute>} />
          <Route path="gymMember" element={<ProtectedRoute requiredProfile="gym"><GymMember /></ProtectedRoute>} />
          <Route path="gymSessions" element={<ProtectedRoute requiredProfile="gym"><GymSessions /></ProtectedRoute>} />
          <Route path="gymClasses" element={<ProtectedRoute requiredProfile="gym"><GymClasses /></ProtectedRoute>} />
          <Route path="gymprofile" element={<ProtectedRoute requiredProfile="gym"><Gymprofile /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute requiredProfile="gym"><Gymprofile /></ProtectedRoute>} />
        </Route>

        {/* --------------------Store DASHBOARD -------------------- */}
        <Route path="store">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProtectedRoute requiredProfile="store"><StoreDashboard /></ProtectedRoute>} />
          <Route path="product" element={<ProtectedRoute requiredProfile="store"><StoreProduct /></ProtectedRoute>} />
          <Route path="order" element={<ProtectedRoute requiredProfile="store"><StoreOrder /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute requiredProfile="store"><Storeprofile /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute requiredProfile="store"><Storeprofile /></ProtectedRoute>} />
        </Route>

        {/* -------------------- AUTH + FORMS -------------------- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/role" element={<Selectrole />} />
        <Route path="/goodbye" element={<Goodbye />} />
        {/* -------------------- Trainer Form -------------------- */}
        <Route path="/trainerform" element={<Trainerform />} />
        <Route path="/trainerSpecialization" element={<TrainerSpecialization />} />
        <Route path="/trainerExperience" element={<TrainerExperience />} />
        {/* -------------------- Tarinee Form -------------------- */}
        <Route path="/traineeform" element={<Traineeform />} />
        <Route path="/traineerecord" element={<TraineeRecord />} />

        {/* -------------------- CATCH ALL -------------------- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;