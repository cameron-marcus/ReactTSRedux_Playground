import React, { useEffect, useRef } from "react"
import autoAnimate from "@formkit/auto-animate";
import { useDispatch } from "react-redux";
import styled from "styled-components"
import { useAppSelector } from "../../app/hooks";
import { selectUsername, setUsername, setLoginStatus,loginAsync} from "./loginSlice";

const Div = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    background-color: #f0f0f0;
`;

const ImgStatic = styled.img`
    width: 30%;
    margin-top: 100px;
    align-self: center;
    justify-self: center;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: 0;
`;

const ImgRotating = styled.img`
    position: absolute;
    width: 30%;
    margin-top: 100px;
    margin-left: 35%;
    align-self: center;
    justify-self: center;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: 0;
    animation: rotation 2s infinite linear;
    @keyframes rotation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(359deg);
        }
      }
`;

const Form = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:20px;
    height: 50%;
    width: 100%;
`;

const Label = styled.label`
    font-size: 1.5rem;
    font-weight: 700;
    color: #2E4053;
`;

const TextInput = styled.input`
    width: 30%;
    height: 50px;
    background-color: #f0f0f0;
    border: none;
    border-bottom: 3px solid #2E4053;
    padding: 12px 20px;
    outline: none;
    
    opacity: 0.3;
    -webkit-transition: 0.8s;
    transition: 0.8s;
    &:hover {
        border-bottom: 3px solid #2E4053;
        opacity: 0.8;
    };
    &:focus {
        border: 3px solid #2E4053;
        opacity: 1;
    };
`;

const getSubmitStyle = (username: string): string => `
    width: 10%;
    height: 50px;
    background-color: #f0f0f0;
    border: 3px solid #2E4053;
    -webkit-transition: 0.8s;
    transition: 0.8s;
    opacity: ${username === `` ? 0.3 : 1};
    ${username === `` ? `` : `&:hover {
        background-color: #2E4053;
        color: #f0f0f0;`
    }
`;

const SubmitInput = styled.input<{username:string}>`${props=>getSubmitStyle(props.username)}`;

export default function Login() {
    const dispatch = useDispatch();
    const username = useAppSelector(selectUsername);
    const loginStatus = useAppSelector(state => state.login.loginStatus);

    const statusLabelRef = useRef(null);

    let statusLabel = <Label>Please enter your username</Label>;
    if (loginStatus === `pending`) {
        statusLabel = <Label>Logging in...</Label>;
    }
    else if (loginStatus === `failed`) {
        statusLabel = <Label>That username is not allowed. Please try again.</Label>;
    }
    else if (loginStatus === `success`) {
        statusLabel = <Label>Login succeeded</Label>;
    }

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (loginStatus !== "pending") {
            if (loginStatus === "failed") {
                dispatch(setLoginStatus("idle"));
            }
            dispatch(setUsername(event.currentTarget.value));
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (loginStatus !== "pending") {
            if (username !== ``) {
                dispatch(loginAsync(true));
            }
        }
        event.preventDefault();
        event.stopPropagation();
    }
    return (
        <Div>
            {loginStatus === `pending` ?
                <>
                    <ImgStatic src="BMW_Logo_Outer.png"/>
                    <ImgRotating src="BMW_Logo_Inner.png"/>
                </>
                : <ImgStatic src="BMW-Logo.png"/>
            }
            <Form onSubmit={handleSubmit}>
                {statusLabel}
                <TextInput  type="text" value={username} onChange={handleChange} />
                <SubmitInput  username={username} type="submit" value="Submit"/>
            </Form>
        </Div>
    );
}