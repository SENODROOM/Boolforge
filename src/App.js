import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES:
import Boolforge from './pages/Boolforge';

// UTILS:
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Boolforge />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
