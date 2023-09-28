const Button = ({
  children,
  padding,
  bgColor,
  hoverColor,
  color,
  weight,
  width,
  margin,
  borderRadius,
  type,
  disabled,
  value,
}) => {
  return (
    <button
      type={`${type}`}
      disabled={disabled}
      value={value}
      className={`cursor-pointer border-0 ${
        bgColor
          ? bgColor
          : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
      } ${
        hoverColor
          ? hoverColor
          : 'hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500'
      } ${padding ? padding : 'px-5 py-2'} ${weight ? weight : 'font-bold'} ${
        color ? color : 'text-zinc-100'
      } ${width ? width : ''} ${margin ? margin : ''} ${
        borderRadius ? borderRadius : 'rounded-full'
      } shadow-lg transition duration-300 ease-in-out hover:scale-[0.97]`}>
      {children}
    </button>
  );
};

export default Button;
