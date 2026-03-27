import { Navigate } from "react-router"


const OnboardingRoute = ({children, isAuthenticated, isOnboarded}) => {
    if(!isAuthenticated) return <Navigate to={"/login"} />
    if(isOnboarded) return <Navigate to={"/"} />
  
    return children
}

export default OnboardingRoute