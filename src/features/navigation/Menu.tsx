import React from "react";
import styled from "styled-components";
import autoAnimate from '@formkit/auto-animate'
import MenuItem from "./MenuItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLinkTree, selectLinkHistory, setLinkTree, pushLinkHistory, popLinkHistory } from "./navigationSlice";
import type { IMenuLink } from "./linkTree";

const MenuContainer = styled.div`
    position: absolute;
    top: 100%;
    width: 100%;
    padding: 40px 80px 80px 80px;
    background-color: #ededed;
    display: flex;
    flex-direction: row;
    gap: 50px;
    z-index: 101;
`;

const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0px;
`;

const BackButton = styled.button`
    background-color: transparent;
    align-self: flex-start;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    &:hover {
        opacity: 1;
    }
`;


const backArrow = <img width="30px" height= "30px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAmUlEQVRoge3WOwrCQBRG4YMbmCzBrbsGS+1sfGDlAlxKLMLtBCEjucPlfJA2/AeGYUCSJEnaUAOOwCF7SI8G3IAZeCRvWa0BV5aIN7DPnbNOmYg4TkZkmjBiDBNwx4h8ZSKeLBGZ3+XX0F1/6ybmf/ykxNEKJa7dYMyoSryzQonnezBmVOVi4gJ4JW/p1oATcM4eIkmSJH31AQ6pXcqlTtSjAAAAAElFTkSuQmCC"></img>

export default function Menu () {
    const dispatch = useAppDispatch();
    const linkTree = useAppSelector(selectLinkTree);
    const linkHistory = useAppSelector(selectLinkHistory);

    const menuContainerRef = React.useRef<HTMLDivElement>(null);

    if (menuContainerRef.current) {
        autoAnimate(menuContainerRef.current);   
    }

    const handleMenuItemClick = (link: IMenuLink): void => {
        if (link.children) {
            dispatch(setLinkTree(link));
            dispatch(pushLinkHistory(link));
        }
    }

    const handleBackButtonClick = (): void => {
        if (linkHistory.length > 0) {
            const lastLink = linkHistory[linkHistory.length - 2];
            dispatch(setLinkTree(lastLink));
            dispatch(popLinkHistory());
        }
    }


    const createMenuItems = (): JSX.Element[] |undefined => {
        if (linkTree) {
            let isLongPipe = false;
            if (linkHistory.length > 1)
            {
                isLongPipe=true;
            }
            return linkTree.children.map((link: IMenuLink) => {
                return (
                    <MenuItem key={link.id} name={link.description} to={link.to} color={link.color} isLongPipe = {isLongPipe} onClick={()=>handleMenuItemClick(link)}/>
                )
            })
        }
        return undefined
    }

    const menuItems: JSX.Element[] | undefined = createMenuItems();

    return (
        <MenuContainer ref={menuContainerRef}>
            {(linkHistory.length > 1) && <BackButton name="Back" color="black" onClick={handleBackButtonClick}>{backArrow}</BackButton>}
            <LinkContainer>
                {menuItems && menuItems}
            </LinkContainer>
        </MenuContainer>
    )
}