import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES:
import Home from './pages/Home';
import Boolforge from './pages/Boolforge';
import SignificantDigits from './pages/SignificantDigits';
import BCDNotation from './pages/BCDNotation';
import ASCIINotation from './pages/ASCIINotation';
import BitExtension from './pages/BitExtension';

// UTILS / OTHER TOOLS:
import ScrollToTop from './utils/ScrollToTop';
import NumberConverter from './pages/NumberConversation';
import NumberSystemCalculator from './pages/NumberSystemCalculator';
import BinaryRepresentation from './pages/BinaryRepresentation';
import ProblemSolver from './pages/Book/Ch1';
import BitConverter from './pages/Bitconverter';
import ParityBitCalculator from './pages/ParityBitCalculator';
import KMapGenerator from './pages/KmapGenerator';
import GateExplanation from './pages/GateExplanation';
import TimeDiagrams from './pages/TimeDiagrams';
import BooleanAlgebraOverview from './pages/BooleanAlgebraOverview';
import BooleanIdentities from './pages/BooleanIdentities';
import DualityPrinciple from './pages/DualityPrinciple';
import BooleanLaws from './pages/BooleanLaws';
import ConsensusTheorem from './pages/ConsensusTheorem';
import ComplementPage from './pages/ComplementPage';
import StandardForms from './pages/StandardForms';
import MintermsPage from './pages/MintermsPage';
import MaxtermsPage from './pages/MaxtermsPage';
import MintermsMaxtermsRelation from './pages/MintermsMaxtermsRelation';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boolforge" element={<Boolforge />} />
          <Route path="/significant-digits" element={<SignificantDigits />} />
          <Route path="/bcd-notation" element={<BCDNotation />} />
          <Route path="/ascii-notation" element={<ASCIINotation />} />
          <Route path="/bit-extension" element={<BitExtension />} />
          <Route path="/book" element={<ProblemSolver />} />
          <Route path="/numberconversation" element={<NumberConverter />} />
          <Route path="/numbersystemcalculator" element={<NumberSystemCalculator />} />
          <Route path="/binaryrepresentation" element={<BinaryRepresentation />} />
          <Route path="/paritybitcalculator" element={<ParityBitCalculator />} />
          <Route path="/bitconvertor" element={<BitConverter />} />
          <Route path="/kmapgenerator" element={<KMapGenerator />} />
          <Route path="/gates" element={<GateExplanation />} />
          <Route path="/timing-diagrams" element={<TimeDiagrams />} />
          <Route path="/boolean-algebra" element={<BooleanAlgebraOverview />} />
          <Route path="/boolean-identities" element={<BooleanIdentities />} />
          <Route path="/duality-principle" element={<DualityPrinciple />} />
          <Route path="/boolean-laws" element={<BooleanLaws />} />
          <Route path="/consensus-theorem" element={<ConsensusTheorem />} />
          <Route path="/complement" element={<ComplementPage />} />
          <Route path="/standard-forms" element={<StandardForms />} />
          <Route path="/minterms" element={<MintermsPage />} />
          <Route path="/maxterms" element={<MaxtermsPage />} />
          <Route path="/minterms-maxterms" element={<MintermsMaxtermsRelation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
