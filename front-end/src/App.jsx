import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { UserLayout } from "./components/Layout/UserLayout"
import { Home } from "./pages/Home"
import { Toaster } from "sonner"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import Profile from "./pages/Profile"
import { AppProvider } from "./context/AppContext"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import SearchResults from "./pages/SearchResults"
import MyOrdersPage from "./pages/MyOrdersPage"
import AdminLayout from "./components/Layout/AdminLayout"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminProducts from "./pages/admin/Products"
import AdminUsers from "./pages/admin/Users"
import { useApp } from "./context/AppContext"
import ContactUs from "./support/ContactUs"
import AboutUs from "./support/AboutUs"
import MenTopWear from "./pages/MenTopWear"
import WomenTopWear from "./pages/WomenTopWear"
import MenBottomWear from "./pages/MenBottomWear"
import WomenBottomWear from "./pages/WomenBottomWear"
import Faqs from "./support/Faqs"
import Features from "./support/Features"



 

const AdminRoute = ({ children }) => {
  const { user } = useApp();
  if (!user) {
    return <Navigate to="/login?redirect=/admin" replace />
  }
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }
  return children;
}

function App() {

  return (
    <AppProvider>
      <BrowserRouter future={{ v7_startTransition: true , v7_relativeSplatPath: true}}>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout/>} >
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/men" element={<ProductsPage gender="men" />} />
          <Route path="/women" element={<ProductsPage gender="women" />} />
          <Route path="/top-wear" element={<ProductsPage category="Top Wear" />} />
          <Route path="/bottom-wear" element={<ProductsPage category="Bottom Wear" />} />
          <Route path="/product/:sku" element={<ProductDetailPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/men-topwear" element={<MenTopWear />} />
          <Route path="/women-topwear" element={<WomenTopWear />} />
          <Route path="/men-bottomwear" element={<MenBottomWear />} />
          <Route path="/women-bottomwear" element={<WomenBottomWear />} />
           <Route path="/faqs" element={<Faqs />} />
           <Route path="/features" element={<Features />} />


        </Route>
        <Route path="/admin" element={<AdminRoute><AdminLayout/></AdminRoute>} >
          <Route index element={<AdminDashboard/>} />
          <Route path="products" element={<AdminProducts/>} />
          <Route path="users" element={<AdminUsers/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App