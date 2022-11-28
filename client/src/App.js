import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Youth,
  Children,
  Communication,
  Education,
  Family,
  HealthMinistry,
  PublicAffairs,
  Publishing,
  Pm,
  Stewardship,
  Women,
  Amo,
  Dorcas,
  SOP,
} from "./Components/MINISTRIES";
import {
  Error,
  Register,
  Landing,
  Home,
  About,
  New,
  Ministries,
  Media,
  Contact,
  Resources,
  SinglePost,
  OurBeliefs,
  OurHistory,
  AllThePosts,
  AddReview,
  AllTheHealthPosts,
  HealthSingle,
} from "./pages";

import {
  AddBulleting,
  AddElder,
  AddEvent,
  AddHealth,
  AddImages,
  AddLeader,
  AddPastor,
  AddPost,
  AddWorker,
  AllEvents,
  AllHealth,
  AllPost,
  EditEvent,
  EditPost,
  Profile,
  ProtectedRoute,
  Request,
  SharedLayout,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Request />} />
          <Route path="all-posts" element={<AllPost />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="edit-post/:postId" element={<EditPost />} />
          <Route path="all-events" element={<AllEvents />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="edit-event/:eventId" element={<EditEvent />} />
          <Route path="all-health" element={<AllHealth />} />
          <Route path="add-health" element={<AddHealth />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-bulleting" element={<AddBulleting />} />
          <Route path="add-images" element={<AddImages />} />
          <Route path="add-position" element={<AddLeader />} />
          <Route path="add-worker" element={<AddWorker />} />
          <Route path="add-pastor" element={<AddPastor />} />
          <Route path="add-elder" element={<AddElder />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/about/our-beliefs" element={<OurBeliefs />} />
        <Route path="about/our-history" element={<OurHistory />} />

        <Route path="/ministries" element={<Ministries />} />
        <Route path="/ministries/youth" element={<Youth />} />
        <Route path="/ministries/children" element={<Children />} />
        <Route path="/ministries/communication" element={<Communication />} />
        <Route path="/ministries/education" element={<Education />} />
        <Route path="/ministries/family" element={<Family />} />
        <Route path="/ministries/health" element={<HealthMinistry />} />
        <Route path="/ministries/public-affairs" element={<PublicAffairs />} />
        <Route path="/ministries/publishing" element={<Publishing />} />
        <Route path="/ministries/sabbath-school" element={<Pm />} />
        <Route path="/ministries/stewardship" element={<Stewardship />} />
        <Route path="/ministries/women" element={<Women />} />
        <Route path="/ministries/amo" element={<Amo />} />
        <Route path="/ministries/dorcas" element={<Dorcas />} />
        <Route path="/ministries/sop" element={<SOP />} />

        <Route path="/" exact element={<Home />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/health/:healthId" element={<HealthSingle />} />
        <Route path="/all-articles" element={<AllThePosts />} />
        <Route path="/all-health-posts" element={<AllTheHealthPosts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/new" element={<New />} />

        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/add-review" element={<AddReview />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
