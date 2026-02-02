import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES:
import Boolforge from './pages/Boolforge';

// UTILS:
import ScrollToTop from './utils/ScrollToTop';
import NumberConverter from './pages/NumberConversation';
import NumberSystemCalculator from './pages/NumberSystemCalculator';
import BinaryRepresentation from './pages/BinaryRepresentation';
import ProblemSolver from './pages/Book/Ch1';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Boolforge />} />
          <Route path="/numberconversation" element={<NumberConverter />} />
          <Route path="/numbersystemcalculator" element={<NumberSystemCalculator />} />
          <Route path="/binaryrepresentation" element={<BinaryRepresentation />} />
          <Route path="/book" element={<ProblemSolver />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
