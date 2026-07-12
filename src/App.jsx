import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import AddBill from "./pages/AddBill";
import AllBills from "./pages/AllBills";
import BillDetails from "./pages/BillDetails";
import EditBill from "./pages/EditBill";

import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import WarrantyCenter from "./pages/WarrantyCenter";
import Settings from "./pages/Settings";
import AICenter from "./pages/AICenter";

function App() {

  return (

    <ThemeProvider>

      <BrowserRouter>

        <Routes>

          {/* Landing */}

          <Route path="/" element={<Home />} />

          {/* Authentication */}

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main */}

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-bill" element={<AddBill />} />
          <Route path="/all-bills" element={<AllBills />} />
          <Route path="/bill/:id" element={<BillDetails />} />
          <Route path="/edit-bill/:id" element={<EditBill />} />

          {/* Premium Pages */}

          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/warranty" element={<WarrantyCenter />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ai-center" element={<AICenter />} />

        </Routes>

      </BrowserRouter>

    </ThemeProvider>

  );

}

export default App;