import { Navigate } from "react-router"


const OnboardingRoute = ({children, isAuthenticated, isOnboarded, isVerified}) => {
    if(!isAuthenticated) return <Navigate to={"/login"} />
    if(!isVerified) return <Navigate to={"/verify-email"} />
    if(isOnboarded) return <Navigate to={"/"} />
  
    return children
}

export default OnboardingRoute