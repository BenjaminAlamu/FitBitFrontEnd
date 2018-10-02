import LoginPage from "views/LoginPage/LoginPage.jsx";
import RegisterPage from "views/LoginPage/RegisterPage.jsx";
import DashboardPage from "views/LoginPage/DashboardPage.jsx";
import DetailsPage from "views/LoginPage/DetailsPage.jsx";
import SendMessage from "views/LoginPage/SendMessage.jsx";

var indexRoutes = [
  // { path: "/landing-page", name: "LandingPage", component: LandingPage },
  // { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/dashboard", name: "DashboardPage", component: DashboardPage },
  // { path: "/register", name: "RegisterPage", component: RegisterPage },
  { path: "/details", name: "DetailsPage", component: DetailsPage },
  { path: "/sendmessage", name: "SendMessage", component: SendMessage },
  { path: "/", name: "LoginPage", component: LoginPage },
  { path: "*", name: "LoginPage", component: LoginPage }
  
];

export default indexRoutes;
