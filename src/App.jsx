
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MarketPlace from './pages/MarketPlace';
import AI from './pages/AI';
import Community from './pages/Community';
// import Profile from './pages/Profile';
import SignIn from './pages/SignIn'; 
// import Contracts from './pages/Contracts';
// import Chatbot from './Components/Chatbot';
import Supplier_Dash from './pages/Supplier_Dash';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/marketplace' element={<MarketPlace />} />
        {/* <Route path='/contracts' element={<Contracts/>}/> */}
        <Route path='/ai' element={<AI/>} />
        <Route path='/community' element={<Community />} />
        {/* <Route path='/profile' element={<Profile/>} /> */}
        <Route path= '/signin' element={<SignIn/>} />
        {/* <Route path= '/chatbot' element={<Chatbot/>} /> */}
        <Route path= '/supplier_dashboard' element={<Supplier_Dash/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
