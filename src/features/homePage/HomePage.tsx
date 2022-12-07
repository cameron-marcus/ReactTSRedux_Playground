import React from "react";
import styled from "styled-components";

const BodyContainer = styled.div`
    position: absolute;
    height: 300%;
    width: 98.9%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFF;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default function HomePage() {
    return (
        <BodyContainer>
            <Img src = "dashboard_1.jpg" />
            <Img src = "dashboard_2.jpg" />
        </BodyContainer>
    );
}
