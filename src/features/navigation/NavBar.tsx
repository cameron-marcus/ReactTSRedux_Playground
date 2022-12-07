import React from "react";
import { useEffect, useRef, useCallback } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import autoAnimate from '@formkit/auto-animate'
import { selectUsername, setLoginStatus, setUserIsSet, setUsername } from "../login/loginSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Menu from "./Menu";
import {selectLogOutIsOpen, selectMenuIsOpen, setLinkHistory, setLinkTree, toggleLogOutIsOpen, toggleMenuIsOpen } from "./navigationSlice";
import { linkTree as rootLinkTree, IMenuLink} from "./linkTree";

function searchTree(element: IMenuLink, pathname: string): IMenuLink | undefined {
    if(element.to == pathname){
         return element;
    }else if (element.children != null){
         var i;
         var result = undefined;
         for(i=0; result == undefined && i < element.children.length; i++){
              result = searchTree(element.children[i], pathname);
         }
         return result;
    }
    return undefined;
}

const NavBarContainer = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction:column;
    gap: 0px;
`;

const Nav = styled.nav`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 27px 96px 20px 30px;
    border-bottom: 5px solid #d6d6d6;
`;

const NavRight = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: row;
    row-gap: 20px;
`;

const Logo = styled.img`
    height: 70px;
`;

const Label = styled.label`
    background-color: transparent;
    border: none;
    color: #2E4053;
    font-size: 1.5rem;
    font-weight: 700;
`;

const LeftButton = styled.button`
    background-color: transparent;
    border: none;
    color: #85929E;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    &:hover {
        border-bottom 2px solid #2E4053;
        color: #2E4053;
        value: "hello";
    }
`;

const Pipe = styled.div`
    margin: 0 20px;
    background-color: #85929E;
    width: 2px;
`;

const MenuIcons = styled.div`
    opacity: 0.6;
    cursor: pointer;
    &:hover {
        opacity: 1;
    }
`;

const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0,0,256,256" fill="#000000;"> <g fill="#2e4053" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" mix-blend-mode="normal"><g transform="scale(5.33333,5.33333)"><path d="M6,22h36v4h-36zM6,10h36v4h-36zM6,34h36v4h-36z"></path></g></g></svg>
const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0,0,256,256" fill="#000000;"> <g fill="#2e4053" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" mix-blend-mode="normal"><g transform="scale(5.12,5.12)"><path d="M9.15625,6.3125l-2.84375,2.84375l15.84375,15.84375l-15.9375,15.96875l2.8125,2.8125l15.96875,-15.9375l15.9375,15.9375l2.84375,-2.84375l-15.9375,-15.9375l15.84375,-15.84375l-2.84375,-2.84375l-15.84375,15.84375z"></path></g></g></svg>

export default function NavBar() {
    const username = useAppSelector(selectUsername);
    const menuIsOpen = useAppSelector(selectMenuIsOpen);
    const logOutIsOpen = useAppSelector(selectLogOutIsOpen);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation()
    const navContainerRef = useRef(null)
    const menuIconRef = useRef(null)
    const leftButtonRef = useRef(null)
    const currentPathDescription = searchTree(rootLinkTree, location.pathname)?.description;

    useEffect(() => {
        dispatch(setLinkTree(rootLinkTree))
        dispatch(setLinkHistory([rootLinkTree]))
    }, [])
    
    useEffect(() => {
        if (navContainerRef.current) {
            autoAnimate(navContainerRef.current);   
        }
        if (menuIconRef.current) {
            autoAnimate(menuIconRef.current);   
        }
        if (leftButtonRef.current) {
            autoAnimate(leftButtonRef.current);
        }
    }, [menuIsOpen])

    const handleMenuClick = () => {
        dispatch(toggleMenuIsOpen())
    }

    const handleLeftButtonMouseOver= () => {
        dispatch(toggleLogOutIsOpen());
    }

    const navigateHome = useCallback(() => navigate('/', {replace: true}), [navigate]);

    const handleLogoutClick = () => {
        dispatch(setUsername(""));
        dispatch(toggleLogOutIsOpen());
        dispatch(setLoginStatus("idle"));
        dispatch(setUserIsSet(false));
        navigateHome();
    }

    return (
        <NavBarContainer ref={navContainerRef}>
            <Nav>
                <Logo src="BMW-Logo.png" />
                <Label>{currentPathDescription}</Label>
                <NavRight>
                    <div ref={leftButtonRef}>
                        {logOutIsOpen && <LeftButton onMouseOut={handleLeftButtonMouseOver}  onClick={handleLogoutClick}>Logout</LeftButton>}
                        {!logOutIsOpen && <LeftButton onMouseOver={handleLeftButtonMouseOver} onMouseOut={handleLeftButtonMouseOver}>{username}</LeftButton>}
                    </div>
                    <Pipe />
                    <div ref={menuIconRef}>
                        {menuIsOpen && <MenuIcons onClick={handleMenuClick}>{closeIcon}</MenuIcons>}
                        {!menuIsOpen && <MenuIcons onClick={handleMenuClick}>{menuIcon}</MenuIcons>}
                    </div>
                </NavRight>
            </Nav>
            {menuIsOpen && <Menu/>}
        </NavBarContainer>
    );
}
