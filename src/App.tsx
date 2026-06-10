import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Servers from '@/pages/Servers';
import Merge from '@/pages/Merge';
import Monitor from '@/pages/Monitor';
import Logs from '@/pages/Logs';
import Terminal from '@/pages/Terminal';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/servers" element={<Servers />} />
          <Route path="/merge" element={<Merge />} />
          <Route path="/monitor" element={<Monitor />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/terminal" element={<Terminal />} />
        </Route>
      </Routes>
    </Router>
  );
}
