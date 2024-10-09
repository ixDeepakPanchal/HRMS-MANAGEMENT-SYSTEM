import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { Employee } from "./components/types/employeeDataType";
import { Navigate, Route, Routes } from "react-router-dom";

const EmployeesDetail = lazy(
  () => import("./components/profile/EmployeesDetail")
);
const Dashboard = lazy(() => import("./components/home/Dashboard"));
const LoginPage = lazy(() => import("./components/login/LoginPage"));
const LeaveProfile = lazy(() => import("./components/schedule/LeaveProfile"));
const LeaveShedule = lazy(() => import("./components/schedule/LeaveSchedule"));
const AdminPage = lazy(() => import("./components/home/AdminPage"));
const MyTask = lazy(() => import("./components/task/MyTask"));
const FutureEvents = lazy(() => import("./components/task/FutureEvents"));

import LoadingPage from "./components/loading/LoadingPage";
import CalendarAttandance from "./components/attandance/CalendarAttandance";


const HomePage = lazy(() => import("./components/home/HomePage"));
const MyProfile = lazy(() => import("./components/profile/MyProfile"));

function App() {
  const authUser = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );

  return (
    <div className="min-h-screen min-w-screen">
      <Toaster />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route
            path="/"
            element={
              authUser ? <Navigate to={"/home"} /> : <LoginPage></LoginPage>
            }
          />
          <Route
            path="/home"
            element={
              authUser ? (
                <Dashboard>
                  {authUser?.authInfo.email === "admin@mail.com" ? (
                    <AdminPage />
                  ) : (
                    <HomePage />
                  )}
                </Dashboard>
              ) : (
                <Navigate to={"/"} />
              )
            }
          >
            <Route path="/home/myprofile" element={<MyProfile />} />
            <Route path="/home/employees" element={<EmployeesDetail />} />
            <Route path="/home/leave" element={<LeaveProfile />} />
            <Route path="/home/schedule" element={<LeaveShedule />} />
            <Route path="/home/tasks" element={<MyTask />} />
            <Route path="/home/plans" element={<FutureEvents />} />
            <Route path="/home/calendar" element={<CalendarAttandance />} />

          </Route>
          <Route path="/*" element={<div>Page not found</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
