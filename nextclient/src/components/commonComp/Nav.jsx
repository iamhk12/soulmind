'use client';
import React, { useState, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'

import Image from 'next/image'

import "./Nav.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faHandHoldingHeart, faHeadphones, faHome, faPhone, faUsers } from '@fortawesome/free-solid-svg-icons';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { auth } from '@/apis/firebaseConfig';

const Nav = () => {
    const router = useRouter()

    const [initialTheme, setinitialTheme] = useState('light')
    const [userData , setUserData] = useState(null)
    const [theme, settheme] = useState('')
    const [isChecked, setisChecked] = useState(false)
    const location = usePathname()
    const [profileURL , setProfileURL] = useState(auth?.currentUser?.photoURL)

    useEffect(()=>{
        setProfileURL(auth?.currentUser?.photoURL)
    },[auth?.currentUser?.photoURL])

    // let initialTheme = localStorage.getItem("theme");


    useEffect(() => {
        let ITheme = localStorage.getItem("theme");

        if (!ITheme) {
            alert("MEOW")
            ITheme = "light";
            localStorage.setItem("theme", ITheme);
            setinitialTheme(ITheme)
        }

        // const location = router.pathname;
        settheme(location === "music" ? "dark" : ITheme)

        // setProfileURL(auth.currentUser.photoURL)
        // setUserData(auth.currentUser)
    }, [])


    useEffect(()=>{
      console.log(userData)
    },[userData])

    useEffect(() => {
        if (theme.length !== 0) {
            if (theme === 'light') {
                setisChecked(true)
            }
        }
    }, [theme])

    const logout = () =>{
        console.log("emow")
    }
    // const [countForChangeTheme, setCountForChangeTheme] = useState(0);
    // useEffect(()=>{
    //     localStorage.setItem("theme", prev === "dark" ? "light" : "dark");
    //     window.location.reload();
    // },[countForChangeTheme])
    // // If theme is not set in localStorage, default to "light"
    // if (!initialTheme) {
    //     initialTheme = "light";
    //     localStorage.setItem("theme", initialTheme);
    // }


    // const location = router.pathname;
    // const theme = (location === "music" ? "dark" : initialTheme);

    // const isChecked = (theme === "light");

    const handleToggle = () => {
        let newTheme = ''
        if (isChecked === true) {
            newTheme = "dark"
        } else {
            newTheme = 'light'
        }
        setisChecked(!isChecked)
        localStorage.setItem("theme", newTheme);
        window.location.reload();
        // Reload the current URL
    };

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <nav style={{ position: "fixed", padding: '0px 20px' }} className={theme + " navbar"}>
                <div className={theme + " navbar__logo"} style={{ opacity: scrolling ? 0 : 1 }}>
                    <Link href="/">
                        <img src={theme === "dark" ? '/images/logomusic.png' : '/images/logo.png'} alt="" />
                    </Link>
                </div>

                <ul style={{ marginBottom: "0px", paddingLeft: "0" }} className={theme + " navbar__list"}>
                    <li>
                        <Link className={location === "/" ? theme + " activeNav" : "#"} href="/"><FontAwesomeIcon className='navBarIcons' icon={faHome} /> Home</Link>
                    </li>
                    <li>
                        <Link className={location === "/music" ? theme + " activeNav" : "#"} href="/music"><FontAwesomeIcon className='navBarIcons' icon={faHeadphones} /> Music</Link>
                    </li>
                    <li>
                        <Link className={location === "/community" ? theme + " activeNav" : "#"} href="/community"> <FontAwesomeIcon className='navBarIcons' icon={faUsers} />Community</Link>
                    </li>
                    <li>
                        <Link className={location === "/education" ? theme + " activeNav" : "#"} href="/education"><FontAwesomeIcon className='navBarIcons' icon={faBook} /> Education</Link>
                    </li>

                    <li>
                        <Link className={location === "/helplines" ? theme + " activeNav" : "#"} href="/helplines"><FontAwesomeIcon className='navBarIcons' icon={faPhone} /> Helplines</Link>
                    </li>
                    <li>
                        <Link className={location === "/contact" ? theme + " activeNav" : "#"} href="/contact"><FontAwesomeIcon className='navBarIcons' icon={faHandHoldingHeart} /> Contact us</Link>
                    </li>
                </ul>

                {
                    location !== "music" ?
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className='!w-[10px] !h-[10px] !rounded-full overflow-hidden'>
                                    <img src={profileURL} alt='wefre' className='w-[20px] h-[20px] rounded-full'/>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Profile</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={theme} onValueChange={settheme}>
                                    <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        :
                        <div style={{ width: "30px" }}>

                        </div>
                }

                <div className={theme + " navbar__menu"} onClick={handleClick}>
                    <div className={open ? theme + " navbar__menu-icon open" : theme + " navbar__menu-icon"}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={theme + ' mobile_Navs ' + (open ? "opened" : "#")}>

                        <li>
                            <Link className={location === "/" ? theme + " activeNav" : "#"} href="/"><FontAwesomeIcon className='navBarIcons' icon={faHome} /> Home</Link>
                        </li>
                        <li>
                            <Link className={location === "community" ? theme + " activeNav" : "#"} href="/community"> <FontAwesomeIcon className='navBarIcons' icon={faUsers} />Community</Link>
                        </li>
                        <li>
                            <Link className={location === "music" ? theme + " activeNav" : "#"} href="/music"><FontAwesomeIcon className='navBarIcons' icon={faHeadphones} /> Music</Link>
                        </li>
                        <li>
                            <Link className={location === "education" ? theme + " activeNav" : "#"} href="/education"><FontAwesomeIcon className='navBarIcons' icon={faBook} /> Education</Link>
                        </li>

                        <li>
                            <Link className={location === "helplines" ? theme + " activeNav" : "#"} href="/helplines"><FontAwesomeIcon className='navBarIcons' icon={faPhone} /> Helplines</Link>
                        </li>
                        <li>
                            <Link className={location === "contact" ? theme + " activeNav" : "#"} href="/contact"><FontAwesomeIcon className='navBarIcons' icon={faHandHoldingHeart} /> Contact us</Link>
                        </li>
                    </div>

                </div>

            </nav>
        </>
    )
}

export default Nav;
