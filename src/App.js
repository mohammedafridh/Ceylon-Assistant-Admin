import './App.css';
import TopBar from './Components/Layouts/TopBar';
import SideBar from './Components/Layouts/SideBar';
import Homepage from './Components/Pages/Homepage/Homepage';
import {Routes,Route} from 'react-router-dom';
import Users from './Components/Pages/Users/Users';
import Bookings from './Components/Pages/Bookings/Bookings';
import DiscoverGallery from './Components/Pages/DiscoverGallery/DiscoverGallery';
import AddThingsToDo from './Components/Pages/AddThingsToDo/AddThingsToDo';
import ToursGallery from './Components/Pages/ToursGallery/ToursGallery';
import Faq from './Components/Pages/FAQ/Faq';

function App() {
    return(
        <div className = 'adminPanel'>
            <div className = "blur" style = {{top:'36%', left:'-8rem'}}></div>
            <TopBar />
                <div className = 'containers'>
                    <div className = 'sideBarContainer'>
                        <SideBar />
                    </div>
                    
                    <div className='allPageContainer'>
                        <Routes>
                            <Route exact path = '/' element = {<Homepage />} />
                            <Route path = '/users' element = {<Users />} />
                            <Route path = '/bookings' element = {<Bookings />} />
                            <Route path = '/discover' element = {<DiscoverGallery />} />
                            <Route path = '/addThingsToDo' element = {<AddThingsToDo />} />
                            <Route path = '/toursGallery' element = {<ToursGallery />} />
                            <Route path = '/faq' element = {<Faq />} />
                        </Routes>
                    </div>
                                 
                </div>    
        </div>
        )
    
}

export default App;
