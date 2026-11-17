import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Tests from './pages/Tests.jsx';
import TestDetail from './pages/TestDetail.jsx';
import Branches from './pages/Branches.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tests" element={<Tests />} />
        <Route path="tests/:id" element={<TestDetail />} />
        <Route path="branches" element={<Branches />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<p className="mx-auto max-w-6xl px-4 py-20">Page not found.</p>} />
      </Route>
    </Routes>
  );
}
