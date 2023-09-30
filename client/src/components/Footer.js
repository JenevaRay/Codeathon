const Footer = () => {
  return (
    <footer className="fixed bottom-0 z-0 w-screen bg-transparent py-2">
      <div className="mx-auto flex w-full items-center justify-center p-4">
        <span className="text-md text-zinc-400 sm:text-center">
          &copy; Codeathon {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
