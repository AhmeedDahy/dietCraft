import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { RecipesProvider } from "./context/RecipesContext";
import { TargetProvider } from "./context/TargetContext";
import { IngredientsProvider } from "./context/IngredientsContext";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import HomePage from "./pages/HomePage";
import DietRecommendation from "./pages/DietRecommendation";
import GetDietForm from "./pages/GetDietForm";
import FoodLog from "./pages/FoodLog";
import BrowseFoods from "./pages/BrowseFoods";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Recipe from "./pages/Recipe";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const reactQuery = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0
      }
    }
  });

  return (
    <IngredientsProvider>
      <TargetProvider>
        <RecipesProvider>
          <QueryClientProvider client={reactQuery}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
              <Routes>
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index path="/" element={<HomePage />} />
                  <Route
                    path="/diet-recommendation"
                    element={<DietRecommendation />}
                  />
                  <Route path="/food-log" element={<FoodLog />} />
                  <Route path="/browse-foods" element={<BrowseFoods />} />
                  <Route path="/browse-foods/:id" element={<Recipe />} />
                  <Route path="/account" element={<Account />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/getData" element={<GetDietForm />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: { duration: 3000 },
                error: { duration: 5000 },
                style: {
                  fontSize: "15px",
                  textAlign: "center",
                  maxWidth: "500px",
                  padding: "18px 24px",
                  backgroundColor: "#ffffff",
                  color: "#000000)"
                }
              }}
            />
          </QueryClientProvider>
        </RecipesProvider>
      </TargetProvider>
    </IngredientsProvider>
  );
}

export default App;
