import React from 'react';

interface Props {
  value: string;
}

const TextField: React.FC<Props> = (props: Props) => (
  <span>
    <input value={props.value} />
  </span>
);

export default TextField;
