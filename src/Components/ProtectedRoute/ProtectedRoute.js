import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  let user = localStorage.getItem('user')
  let navigate = useNavigate();

  useEffect(() => {
    console.log({log: user})
    if(!user || user === 'null'){
      navigate("/login")
    }
  }, [user]);

  return props.children;
}

export default ProtectedRoute;