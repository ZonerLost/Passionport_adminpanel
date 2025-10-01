import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import OverviewDashboard from "../Pages/OverviewDashboard";
import UsersRolesVerification from "../Pages/UsersRolesVerification";
import CampaignLifecycleModeration from "../Pages/CampaignLifecycleModeration";
import ContentCommunityModeration from "../Pages/ContentCommunityModeration";
import ProductsOrdersCatalog from "../Pages/ProductsOrdersCatalog";
import PaymentsPayoutsFinance from "../Pages/PaymentsPayoutsFinance";
import MessagingNotificationsCMS from "../Pages/MessagingNotificationsCMS";
import AnalyticsLoyaltySettings from "../Pages/AnalyticsLoyaltySettings";
// FIXED: correct import casing to match filesystem
import Login from "../Pages/Auth/Login";
import NotFound from "../Pages/NotFound";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <OverviewDashboard /> },
      { path: "users-memberships", element: <UsersRolesVerification /> },
      { path: "content", element: <CampaignLifecycleModeration /> },
      { path: "live-events", element: <ContentCommunityModeration /> },
      { path: "deals", element: <ProductsOrdersCatalog /> },
      { path: "finance", element: <PaymentsPayoutsFinance /> },
      { path: "messaging", element: <MessagingNotificationsCMS /> },
      { path: "support-settings", element: <AnalyticsLoyaltySettings /> },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

export default Router;
