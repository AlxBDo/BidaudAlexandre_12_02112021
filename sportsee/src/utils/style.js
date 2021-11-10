import styled from "styled-components";

export const GraphicContainer = styled.div`
    ${(props) => (
        `background-color: ${props.$bgColor};
        width: ${props.$width}%;
        border-radius: 5px;
        text-align: center;
        ${props.$width < 40 ? (
        `display: inline-block;
        margin-top: 5%;`
        ) : null}`
    )}
`