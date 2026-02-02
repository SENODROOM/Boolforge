import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES:
import Boolforge from './pages/Boolforge';

// UTILS:
import ScrollToTop from './utils/ScrollToTop';
import NumberConverter from './pages/NumberConversation';
import NumberSystemCalculator from './pages/NumberSystemCalculator';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Boolforge />} />
          <Route path="/numberconversation" element={<NumberConverter />} />
          <Route path="/numbersystemcalculator" element={<NumberSystemCalculator />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
