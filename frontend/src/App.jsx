import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllProperty from "./pages/Dashboard/AllProperty";
import AddProperty from "./pages/Dashboard/AddProperty";
import Statistics from "./pages/Dashboard/Statistics";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Profile from "./pages/Dashboard/Profile";
import SharedLayout from "./pages/Dashboard/SharedLayout";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<SharedLayout />}>
           {/* removed path="profile" so that / path shows the Profile Comp by default */}
            <Route index element={<AllProperty />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="add-property" element={<AddProperty />}></Route>
            <Route path="history" element={<Statistics />}></Route>
          </Route>
        </Route>

        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
