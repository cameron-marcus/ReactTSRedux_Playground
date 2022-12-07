import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { toggleMenuIsOpen } from "./navigationSlice";

const MenuItemContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 0px;
    width: 30%;
    height: 70px;
    background-color: transparent;
`;

const Pipe = styled.div<{color: string, isLong: boolean}>`${props => getPipeStyle(props.color, props.isLong)}`;

const getPipeStyle = (color: string, isLong: boolean = false): string => {
    return `background-color: ${color};
        margin-right: 20px;
        width: 5px;
        height: ${isLong ? "100%" : "80%"};`
}

const MenuButton = styled.button`
    text-decoration: none;
    background-color: transparent;
    border: none;
    color: #85929E;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        color: #2E4053;
    }
`;

const MenuLink = styled(Link)`
    text-decoration: none;
    background-color: transparent;
    border: none;
    color: #85929E;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    &:hover {
        color: #2E4053;
    }
`;

const arrow = <img width="20px" height="20px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAAk0lEQVRoge3aOw6DMBQF0VH2AEr2vxMaJEiVFFkOFO4o+cg3Zs4CrDeSmycbJF1lAN5AX3uQoyZgAb78eUwHfCgxP+BVd5xjjEllTCpjUhmTyphUxqQyJpUxqZqK6Snr8gLMew95nDbOzW2v1rPuOPsYkcKIFEakMCKFESmMSGFECiNSNBEBZb9u4nl6pJEPA9IdrIrEcW5Htzh3AAAAAElFTkSuQmCC"></img>

const Arrow = styled.div`
    margin-left: auto;
    align-self: center;
    opacity: 0.5;
    &:hover {
        color: #2E4053;
        opacity: 1;
    }
`;

export default function MenuItem({name, color, to, isLongPipe, onClick}: {name: string, color: string, to?: string, isLongPipe: boolean, onClick?: () => void}) {
    const dispatch = useAppDispatch();
    return (
        <MenuItemContainer>
            <Pipe color={color} isLong={isLongPipe}/>
            {to ? <MenuLink onClick={()=>dispatch(toggleMenuIsOpen())} to={to}>{name}</MenuLink> : <MenuButton onClick={onClick}>{name}</MenuButton>}
            {to=="" ?
                <Arrow>
                    <MenuButton onClick={onClick}>{arrow}</MenuButton>
                </Arrow>
            : null}
        </MenuItemContainer>
    )
}