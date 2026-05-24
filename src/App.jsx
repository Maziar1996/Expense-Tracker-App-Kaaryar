import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ExpensesPage from "./Pages/Expenses/ExpensesPage";
import NotFound from "./Pages/NotFound/NotFound";
import { TransactionProvider } from "./Context/TransactionContext";

function App() {
  return (
    <TransactionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TransactionProvider>
  );
}
export default App;
