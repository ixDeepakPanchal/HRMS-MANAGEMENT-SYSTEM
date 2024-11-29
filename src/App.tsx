import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { Employee } from "./components/types/employeeDataType";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoadingPage from "./components/loading/LoadingPage";
import AddEmployeeForm from "./components/edit/AddEmployeeForm";
import HrEventForm from "./components/edit/HrEventForm";

const NotFoundPage = lazy(() => import("./components/errorPages/NotFoundPage"));
const EmployeeProfile = lazy(
  () => import("./components/profile/EmployeeProfile")
);
const PerformanceReport = lazy(
  () => import("./components/profile/PerformanceReport")
);
const CalendarAttandance = lazy(
  () => import("./components/attandance/CalendarAttandance")
);
const MyProfile = lazy(() => import("./components/profile/MyProfile"));
const MyTask = lazy(() => import("./components/task/MyTask"));
const FutureEvents = lazy(() => import("./components/task/FutureEvents"));
const LeaveProfile = lazy(() => import("./components/schedule/LeaveProfile"));
const LeaveSchedule = lazy(() => import("./components/schedule/LeaveSchedule"));
const EmployeesDetail = lazy(
  () => import("./components/profile/EmployeesDetail")
);
const SideRoute = lazy(() => import("./components/home/SideRoute"));
const LoginPage = lazy(() => import("./components/login/LoginPage"));
const AdminPage = lazy(() => import("./components/home/AdminPage"));
const HomePage = lazy(() => import("./components/home/HomePage"));

function App() {
  const navigate = useNavigate();
  const authUser = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );

  const isAdmin = authUser?.authInfo.email === "admin@mail.com";

  const routes = [
    { path: "/home", element: isAdmin ? <AdminPage /> : <HomePage /> },
    {
      path: "/home/addEmployee",
      element: <AddEmployeeForm />,
      hide: !isAdmin,
    },
    {
      path: "/home/addEvent",
      element: <HrEventForm />,
      hide: !isAdmin,
    },
    {
      path: "/home/addFutureEvent",
      element: <HrEventForm />,
      hide: !isAdmin,
    },
    { path: "/leave", element: <LeaveProfile /> },
    { path: "/leavetrack", element: <LeaveSchedule /> },
    { path: "/tasks", element: <MyTask /> },
    { path: "/plans", element: <FutureEvents /> },
    { path: "/home/calendar", element: <CalendarAttandance /> },
    { path: "/myprofile", element: <MyProfile /> },
    { path: "/myprofile/edit", element: <AddEmployeeForm /> },
    { path: "/employees", element: <EmployeesDetail /> },
    { path: "/employees/:id", element: <EmployeeProfile /> },
    {
      path: "/employees/:id/edit",
      element: <AddEmployeeForm />,
      hide: !isAdmin,
    },
    {
      path: "/employees/:id/performance",
      element: <EmployeeProfile />,
    },
    {
      path: "/performance",
      element: <PerformanceReport />,
      hide: !isAdmin,
    },
    {
      path: "/performance/:id",
      element: isAdmin ? <PerformanceReport /> : <Navigate to="/home" />,
    },
  ];

  // const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  //   return !!authUser ? children : <Navigate to="/" />;
  // };

  return (
    <div className="min-h-screen min-w-screen">
      <Toaster />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Navigate to={"/home"} /> : <LoginPage />}
          />
          <Route element={<SideRoute />}>
            {routes?.map((items, index) => {
              if (items.hide) return null;
              if (!authUser?.authInfo?.email) {
                navigate("/");
                return null;
              }
              return (
                <Route
                  key={index}
                  path={items.path}
                  element={items.element}
                ></Route>
              );
            })}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
