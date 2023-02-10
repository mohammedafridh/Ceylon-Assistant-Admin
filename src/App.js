import './App.css';
import TopBar from './Components/Layouts/TopBar';
import SideBar from './Components/Layouts/SideBar';
import Homepage from './Components/Pages/Homepage/Homepage';
import {Routes,Route} from 'react-router-dom';
import Bookings from './Components/Pages/Bookings/Bookings';
import DiscoverGallery from './Components/Pages/DiscoverGallery/DiscoverGallery';
import AddThingsToDo from './Components/Pages/AddThingsToDo/AddThingsToDo';
import ToursGallery from './Components/Pages/ToursGallery/ToursGallery';
import Faq from './Components/Pages/FAQ/Faq';
import AdminPageSetup from './Components/Pages/Users/UsersContents/Admin/AdminPageSetup';
import GuidePageSetup from './Components/Pages/Users/UsersContents/Guides/GuidePageSetup';
import TouristPageSetup from './Components/Pages/Users/UsersContents/Tourists/TouristPageSetup';
import Messages from './Components/Pages/Messages/Messages';
import GuideRequests from './Components/Pages/GuideRequests/GuideRequests';
import Login from './Components/Pages/AuthenticationPage/Login';
import { Toaster } from 'react-hot-toast';
import { GuideProvider } from './Context/GuidesContext';
import AdminLogin from './Components/Pages/login/AdminLogin';

function App() {
    return(
        <GuideProvider>
        <Toaster />
            <div className = 'adminPanel'>

            <div className = "blur" style = {{top:'36%', left:'-8rem'}}></div>

            <div>
                <Routes>
                    {/* <Route path = '/' element = {<AdminLogin />} /> */}
                </Routes>
            </div>

            <TopBar />
                <div className = 'containers'>
                    <div className = 'sideBarContainer'>
                        <SideBar />
                    </div>
                    
                    <div className='allPageContainer'>
                        <Routes>
                            <Route exact path = '/' element = {<Homepage />} />
                            {/* <Route path = '/users' element = {<Users />} /> */}
                            <Route path = '/login' element = {<AdminLogin />} />
                            <Route path = '/adminPage' element = {<AdminPageSetup />} />
                            <Route path = '/guidePage' element = {<GuidePageSetup />} />
                            <Route path = '/touristPage' element = {<TouristPageSetup />} />
                            <Route path = '/bookings' element = {<Bookings />} />
                            <Route path = '/discover' element = {<DiscoverGallery />} />
                            <Route path = '/addThingsToDo' element = {<AddThingsToDo />} />
                            <Route path = '/toursGallery' element = {<ToursGallery />} />
                            <Route path = '/faq' element = {<Faq />} />
                            <Route path = '/messages' element = {<Messages />} />
                            <Route path = '/guideRequests' element = {<GuideRequests />} />
                        </Routes>
                    </div>
                                 
                </div>    
        </div>
        </GuideProvider>
        
        )
    
}

export default App;