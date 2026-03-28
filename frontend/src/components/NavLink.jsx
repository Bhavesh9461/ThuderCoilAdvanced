import React from 'react'
import { Link } from 'react-router'

const NavLink = ({icon:Icon, currentPath, LinkName, routePath}) => {
  return (
        <Link to={routePath} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case 
            ${ currentPath ? "btn-active" : "" } `} >
                {Icon && <Icon className="size-5 text-base-content opacity-70" />}
                {LinkName && <span>{LinkName}</span>}
        </Link>
  )
}

export default NavLink