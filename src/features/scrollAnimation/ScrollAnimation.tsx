import React from "react"
import {useEffect,useCallback} from "react"
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectScrollAnimation, setcurrentFrame } from "./scrollAnimationSlice";

const BodyContainer = styled.div`
    position: absolute;
    height: 300%;
    width: 98.9%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #000;
`;

const Image = styled.img`
    position: fixed;
    left: 50%;
    top: 50%;
    max-height: 60%;
    max-width: 90%;
    transform: translate(-50%, -50%);
    z-index: 0;
`;

interface ITitleStyleProps {
    index: number,
    maxIndex: number,
}

const titleStyle = (index: number, maxIndex: number) => {
    let alpha = 1;
    if (index > maxIndex/2) {
        alpha = (maxIndex-index)/maxIndex;
    }
    else {
        alpha = index/maxIndex;
    }
    return (
        `position: fixed;
        left: 50%;
        top: 30%;
        max-height: 100vh;
        max-width: 90%;
        transform: translate(-50%, -50%);
        z-index: 1;

        font-family: 'Roboto', sans-serif;
        background-color: transparent;
        color: transparent;
        font-size: 200px;
        border: 10px solid rgba(255, 255, 255, ${alpha});
        -webkit-text-stroke-width: 10px;
        -webkit-text-stroke-color: rgba(255, 255, 255, ${alpha});`
    )
}

const imageComponents: JSX.Element[] = [];

const H1 = styled.h1<ITitleStyleProps>`${({index, maxIndex})=>titleStyle(index, maxIndex)}`;

export default function ScrollAnimation() {

    const dispatch = useAppDispatch();
    const {numFrames, currentFrame} = useAppSelector(selectScrollAnimation);
    const currentImage: JSX.Element = imageComponents[currentFrame];

    const getFrame = (index: number) => (
        `/assets/AppleImage${index.toString().padStart(4, '0')}.jpg`  
    );

    const preloadImages = useCallback( () => {
        for (let i = 1; i < numFrames; i++) {
            imageComponents.push(<Image src={getFrame(i)}></Image>);
        }
    }, [numFrames]);

    const mapScrollToImage = useCallback(() => {
            const html: HTMLElement = document.documentElement as HTMLElement;
            const scrollPercent = html.scrollTop / (html.scrollHeight - html.clientHeight);
            const frameIndex = Math.min(
                numFrames - 1,
                Math.floor(scrollPercent * numFrames)
            );
            dispatch(setcurrentFrame(frameIndex));
    }, [numFrames, dispatch]);

    useEffect(() => {
        preloadImages();
        window.addEventListener('scroll', mapScrollToImage);
        return () => {
            window.removeEventListener('scroll', mapScrollToImage);
        }
    }, [mapScrollToImage, preloadImages]);

    return (
        <BodyContainer>
            <H1 index={currentFrame} maxIndex={numFrames}>HELLO THERE</H1>
            {currentImage}
        </BodyContainer>
    )
}