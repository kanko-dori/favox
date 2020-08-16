/* eslint-disable react/button-has-type */
import React from 'react';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const Button: React.FC<Props> = (props: Props) => (
  <button type={props.type} onClick={props.onClick}>
    { props.children }
  </button>
);

Button.defaultProps = {
  type: 'button',
};

export default Button;
