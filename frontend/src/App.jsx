import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./layout/RootLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
