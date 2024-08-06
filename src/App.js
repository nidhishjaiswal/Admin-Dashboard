//import Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

//import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Main from './components/Main';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <>
      <Header/>
      <SideBar/>
      <Main/>
      <BackToTop/>
    </>
  )
}
export default App;