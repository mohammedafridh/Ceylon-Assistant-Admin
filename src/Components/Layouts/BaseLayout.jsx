import SideBar from "./SideBar";
import TopBar from "./TopBar";

export default function BaseLayout(props) {
  return (
    <div className="adminPanel">
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
        <TopBar />
        <div className="containers">
        <div className="sideBarContainer">
            <SideBar />
          </div>
          <div className="allPageContainer">
            {props.children}
          </div>
        </div>
     
    </div>
  );
}
