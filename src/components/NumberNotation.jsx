const NumberNotation = ({
    label,
    isMainBoxColor,
  }) => {
    return (
      <div
        className={`font-bold absolute ${isMainBoxColor ? 'text-[#739552]' : 'text-[#EBEDD0]'} left-0.5`}
      >
        {label}
      </div>
    );
  };
  
  export default NumberNotation;
  