import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${props =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${props =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

// 추후 이 컴포넌트를 사용할 때 자동 import가 되게 하기 위해서
const Button = props => {
  return props.to ? (
    /**
     * styled() 함수로 감싸서 만든 컴포넌트의 경우 임의 props가 필터링되지 않기 때문에 props.cyan값을 1과 0으로 변환해주었다.
     * 필터링 되지않으면 cyan={true}라는 값이 Link에서 사용하는 a태그로 그대로 전달되는데, a태그는 boolean 값이 임의 props로
     * 설정되는 것을 허용치 않는다. 숫자/문자열만 허용하기 때문에 삼항 연산자를 이용하여 boolean을 숫자로 변환한것이다.
     */
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
