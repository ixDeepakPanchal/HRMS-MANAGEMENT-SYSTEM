const MainBg = ({ children }: any) => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      {/* HRMS Text Background */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="text-[20vw] font-extrabold text-purple-500 opacity-15 tracking-widest">
          HRMS
        </div>
      </div>
      {children}
    </div>
  );
};

export default MainBg;
