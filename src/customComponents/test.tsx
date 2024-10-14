"use client"

import { usePathname } from "next/navigation"; // Import useRouter
import Navbar from './navbar';


export  function Testingsz () {
    const pathName = usePathname(); // Get the router object

    
  return (
    <div>
        { pathName !== '/' && <Navbar /> }
    </div>
  )
}
