import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  // useNavigate,
} from "react-router";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./layout/RootLayout";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import NotFound from "./components/ui/NotFound";
import Error from "./components/ui/Error";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { authActions } from "./store";

function App() {
  // const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect (() => {
  //   const checkUserLoggedIn =  async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5555/api/user-loggedin", {
  //         withCredentials: true,
  //       })

  //       if (!res.data.isLoggedIn) {
  //         dispatch(authActions.logout());
  //         return 
  //       }

  //       dispatch(authActions.login());

  //     } catch (error) {
  //       console.log(error.message)
  //       dispatch(authActions.logout());
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   checkUserLoggedIn();
  // }, [dispatch])

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard errorElement={<Error />} />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />}/>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
