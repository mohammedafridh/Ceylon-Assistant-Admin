import "./App.css";
import TopBar from "./Components/Layouts/TopBar";
import SideBar from "./Components/Layouts/SideBar";
import Homepage from "./Components/Pages/Homepage/Homepage";
import { Routes, Route } from "react-router-dom";
import Bookings from "./Components/Pages/Bookings/Bookings";
import DiscoverGallery from "./Components/Pages/DiscoverGallery/DiscoverGallery";
import AddThingsToDo from "./Components/Pages/AddThingsToDo/AddThingsToDo";
import ToursGallery from "./Components/Pages/ToursGallery/ToursGallery";
import Faq from "./Components/Pages/FAQ/Faq";
import AdminPageSetup from "./Components/Pages/Users/UsersContents/Admin/AdminPageSetup";
import GuidePageSetup from "./Components/Pages/Users/UsersContents/Guides/GuidePageSetup";
import TouristPageSetup from "./Components/Pages/Users/UsersContents/Tourists/TouristPageSetup";
import Messages from "./Components/Pages/Messages/Messages";
import GuideRequests from "./Components/Pages/GuideRequests/GuideRequests";
import Login from "./Components/Pages/AuthenticationPage/Login";
import { Toaster } from "react-hot-toast";
import { GuideProvider } from "./Context/GuidesContext";
import AdminLogin from "./Components/Pages/login/AdminLogin";
import AllReviews from "./Components/Pages/Reviews/AllReviews";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <GuideProvider>
      <Toaster />

      <Routes>
        <Route exact path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
        {/* <Route path = '/users' element = {<Users />} /> */}
        <Route path ="/" element = {<AdminLogin />} />
        <Route path="/adminPage" element={<ProtectedRoute><AdminPageSetup /></ProtectedRoute>} />
        <Route path="/guidePage" element={<ProtectedRoute><GuidePageSetup /></ProtectedRoute>} />
        <Route path="/touristPage" element={<ProtectedRoute><TouristPageSetup /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path="/discover" element={<ProtectedRoute><DiscoverGallery /></ProtectedRoute>} />
        <Route path="/addThingsToDo" element={<ProtectedRoute><AddThingsToDo /></ProtectedRoute>} />
        <Route path="/toursGallery" element={<ProtectedRoute><ToursGallery /></ProtectedRoute>} />
        <Route path="/faq" element={<ProtectedRoute><Faq /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/guideRequests" element={<ProtectedRoute><GuideRequests /></ProtectedRoute>} />
        <Route path="/reviews" element={<ProtectedRoute><AllReviews /></ProtectedRoute>} />
        
      </Routes>
    </GuideProvider>
  );
}

export default App;