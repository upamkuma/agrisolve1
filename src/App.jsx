
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import MarketPlace from './pages/MarketPlace';
// import AI from './pages/AI';
// import Community from './pages/Community';
// // import Profile from './pages/Profile';
// import SignIn from './pages/SignIn'; 
// // import Contracts from './pages/Contracts';
// // import Chatbot from './Components/Chatbot';
// import Supplier_Dash from './pages/Supplier_Dash';
// import Apply from './Components/MarketPlace/Sell/Apply';
// import axios from 'axios' 
// axios.defaults.baseURL="http://localhost:4000"
// axios.defaults.withCredentials = true 
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Home/>} />
//         <Route path='/marketplace' element={<MarketPlace />} />
//         {/* <Route path='/contracts' element={<Contracts/>}/> */}
//         <Route path='/ai' element={<AI/>} />
//         <Route path='/community' element={<Community />} />
//         {/* <Route path='/profile' element={<Profile/>} /> */}
//         <Route path= '/signin' element={<SignIn/>} />
//         <Route path= '/apply' element={<Apply/>} />
//         {/* <Route path= '/chatbot' element={<Chatbot/>} /> */}
//         <Route path= '/supplier_dashboard' element={<Supplier_Dash/>} />


//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MarketPlace from './pages/MarketPlace';
import AI from './pages/AI';
import Community from './pages/Community';
import SignIn from './pages/SignIn'; 
import Supplier_Dash from './pages/Supplier_Dash';
import Apply from './Components/MarketPlace/Sell/Apply';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  const [uid, setUid] = useState(''); // State to store the uid

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/marketplace' element={<MarketPlace uid={uid} />} />
        <Route path='/ai' element={<AI />} />
        <Route path='/community' element={<Community />} />
        <Route path='/signin' element={<SignIn setUid={setUid} />} /> {/* Pass setUid */}
        <Route path='/apply' element={<Apply />} />
        <Route path='/supplier_dashboard' element={<Supplier_Dash uid={uid} />} /> {/* Pass uid */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
