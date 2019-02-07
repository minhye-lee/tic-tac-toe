import * as React from 'react';

interface IProps {
  onClick : () => void;
  value : string; 
}

const Square : React.StatelessComponent<IProps> = (props) => {
  const { onClick, value } = props;
  return (
    <button
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;