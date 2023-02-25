import React from "react";

type InputText = {
  type: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & React.ComponentProps<
  'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>

const Text = ({ type, children, ...props }: InputText) => {

  return React.createElement(type, {
    ...props,
    className: `
    text-colorText
    ${props.className}
    `
  }, children);
}

export default Text;