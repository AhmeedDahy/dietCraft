import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { RecipesProvider } from "./context/RecipesContext";
import { TargetProvider } from "./context/TargetContext";
import { IngredientsProvider } from "./context/IngredientsContext";
import { Suspense, lazy } from "react";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Spinner from "./ui/Spinner";

// Dynamically import pages
const HomePage = lazy(() => import("./pages/HomePage"));
const DietRecommendation = lazy(() => import("./pages/DietRecommendation"));
const GetDietForm = lazy(() => import("./pages/GetDietForm"));
const FoodLog = lazy(() => import("./pages/FoodLog"));
const BrowseFoods = lazy(() => import("./pages/BrowseFoods"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const Recipe = lazy(() => import("./pages/Recipe"));
const SignUp = lazy(() => import("./pages/SignUp"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Progress = lazy(() => import("./pages/Progress"));

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
              <Suspense fallback={<Spinner />}>
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
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/account" element={<Account />} />
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/getData" element={<GetDietForm />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
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
                  color: "#000000"
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
