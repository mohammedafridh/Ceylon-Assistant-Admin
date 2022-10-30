import './App.css';
import TopBar from './Components/Layouts/TopBar';
import SideBar from './Components/Layouts/SideBar';
import Homepage from './Components/Pages/Homepage/Homepage';
import {Routes,Route} from 'react-router-dom';
import Users from './Components/Pages/Users/Users';

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
                            <Route exact path = '/users' element = {<Users />} />
                        </Routes>
                    </div>
                                 
                </div>    
        </div>
        )
    
}

export default App;
