import * as React from "react";
import styled from "styled-components";

// // // //

const ShapeOne = styled.div`
    padding: 0.2em 0;
    position: absolute;
    background-color: #4e92fc;
    background-image: linear-gradient(100deg, #4e92fc, #1fd3f2);
    top: -350px;
    right: -110px;
    border-radius: 8%;
    width: 50%;
    height: 800px;
    transform: skew(3deg, 30deg);
    opacity: 1;
`;

const ShapeTwo = styled.div`
    position: absolute;
    background-color: #4e92fc;
    background-image: linear-gradient(100deg, #4e92fc, #1fd3f2);
    top: -400px;
    left: -350px;
    border-radius: 100%;
    height: 800px;
    width: 800px;
    opacity: 0.2;
`;

const ShapeThree = styled.div`
    position: absolute;
    background-color: #4e92fc;
    background-image: linear-gradient(100deg, #4e92fc, #1fd3f2);
    top: 150px;
    left: 350px;
    border-radius: 100%;
    height: 100px;
    width: 100px;
    opacity: 0.8;
`;

// // // //

/**
 * Shapes
 */
export function Shapes(props: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            <ShapeOne />
            <ShapeTwo />
            <ShapeThree />
            {props.children}
        </React.Fragment>
    );
}
