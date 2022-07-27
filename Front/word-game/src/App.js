import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/routes/Home';
import Test from './Components/routes/Test';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
