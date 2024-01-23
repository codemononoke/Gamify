import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./pages/homePage";
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/signUpPage";
import ExploreGamesPage from "./pages/exploreGamesPage";
import ProfilePage from "./pages/profilePage";
import SettingPage from "./pages/settingPage";
import GameDetailPage from "./pages/gameDetailPage";
import CartDrawer from "./components/cartDrawer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckOutPage from "./pages/checkoutPage";
import { apiConnector } from "./api/apiConnector";
import { paymentEndPoints } from "./api/apis";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrdersPage from "./pages/ordersPage";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { openCart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (openCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openCart]);

  useEffect(() => {
    const getStripeApiKey = async () => {
      try {
        const response = await apiConnector("GET", paymentEndPoints.STRIPE_API);
        if (!response.data.success) {
          throw new Error(response.data.msg);
        }
        setStripeApiKey(response.data.stripeApiKey);
      } catch (error) {
        console.log("STRIPE_API API ERROR......", error);
      }
    };
    getStripeApiKey();
  }, []);

  return (
    <div className=" w-full">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/explore-games" element={<ExploreGamesPage />} />
          <Route path="/game-detail/:id" element={<GameDetailPage />} />
          <Route
            path="/checkout"
            element={
              stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute>
                    <CheckOutPage />
                  </ProtectedRoute>
                </Elements>
              )
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <SettingPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <CartDrawer />
    </div>
  );
}

export default App;
