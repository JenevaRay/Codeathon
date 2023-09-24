const Button = ({ children, padding, bgColor, color, weight }) => {
  return (
    <button
      className={`rounded-full border-0 ${
        bgColor
          ? bgColor
          : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
      } ${padding ? padding : 'px-5 py-2'} ${weight ? weight : 'font-bold'} ${
        color ? color : 'text-zinc-100'
      } shadow-lg transition duration-300 ease-in-out hover:scale-[0.97]`}>
      {children}
    </button>
  );
};

export default Button;
