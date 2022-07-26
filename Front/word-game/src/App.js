import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/routes/Home';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
