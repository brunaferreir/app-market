// import logo from './logo.svg';
// import './App.css';
// //import FormSeller from './componentes/Seller/FormSeller';
// import FormLogin from './componentes/Seller/FormLogin';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header"> 
//        {/* <FormSeller/> <br/> */}
//        <FormLogin nome ="Carlos" />
//       </header>
//     </div>
//   );
// }

// export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FormLogin from "./components/Seller/FormLogin";
import Dashboard from "./components/Seller/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<FormLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
