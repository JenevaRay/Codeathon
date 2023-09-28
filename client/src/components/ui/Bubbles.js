const Bubbles = ({ text }) => {
  return (
    <div className="flex flex-row items-center justify-center">
      {text}&nbsp;
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
    </div>
  );
};

export default Bubbles;
