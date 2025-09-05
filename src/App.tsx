
import { createBrowserRouter, RouterProvider } from "react-router";
import { CustomerPage } from "./pages/customer-page/CustomerPage.tsx";
import { CustomerDetails } from "./pages/customer-details-page/CustomerDetailsPage.tsx";
import { NotFoundPage } from "./pages/not-found-page/NotFoundPage.tsx";

// kонстант для путей - легче поддерживать и переиспользовать
export const ROUTES = {
  HOME: "/",
  CUSTOMER_DETAILS: "/customer/:id",
  NOT_FOUND: "*",
} as const;

export const getCustomerDetailsPath = (id: string | number) => 
  `/customer/${id}`;

const router = createBrowserRouter([
  { 
    path: ROUTES.HOME, 
    element: <CustomerPage />,
    errorElement: <NotFoundPage /> 
  },
  { 
    path: ROUTES.CUSTOMER_DETAILS, 
    element: <CustomerDetails />,
    errorElement: <NotFoundPage />
  },
  { 
    path: ROUTES.NOT_FOUND, 
    element: <NotFoundPage /> 
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;