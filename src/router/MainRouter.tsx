import {
    BrowserRouter as Router,
    Routes as BrowserRoutes,
    Route,
  } from "react-router-dom";
  import { Routes } from "../models/Routes";
import Header from "../components/navigation/Header";
import DashboardPage from "../pages/DashboardPage";
import SchedulePage from "../pages/shedule/SchedulePage";

  const MainRouter = () => {
    return (
      <Router>
        <BrowserRoutes>
          <Route element={<Header />}>
            <Route path={Routes.DASHBOARD} element={<DashboardPage />} />
            <Route path={Routes.SCHEDULE} element={<SchedulePage />} />
          </Route>
        </BrowserRoutes>
      </Router>
    );
  };
  
  export default MainRouter;
  