import { useLocation } from "react-router-dom";
import logo from "../assets/images/Logo.png";

export const Header = () => {
  const { pathname } = useLocation();

  const onHomePage = pathname.slice(0, 5) === "/home";
  const onAboutUsPage = pathname.slice(0, 6) === "/aboutus";
  const onPlansPage = pathname.slice(0, 6) === "/plans";
  const onInvestPage = pathname.slice(0, 6) === "/invest";
  const onTutorialPage = pathname.slice(0, 6) === "/tutorial";
  const onFaqPage = pathname.slice(0, 6) === "/faq";

  return (
    <header className="w-full flex justify-between items-center text-slate-800 shadow-md py-2">
      <a
        className="w-44 lg:w-52 flex items-center space-x-2 justify-end hover:opacity-80 transform duration-300 ease-in-out"
        href="/home"
      >
        <img className="h-14" src={logo} alt="logo" />
        <h1 className="font-bold text-lg text-slate-800">DIALOGIX</h1>
      </a>
      <div className="space-x-1 flex items-center">
        <a
          href="/home"
          className={` ${
            onHomePage && "bg-slate-100 font-semibold text-blue-500"
          } px-4 py-2 rounded-xl hover:bg-slate-100 transition duration-300 ease-in-out cursor-pointer`}
        >
          Home
        </a>
        <a
          href="/plans"
          className={` ${
            onPlansPage && "bg-slate-100 font-semibold text-blue-500"
          } px-4 py-2 rounded-xl hover:bg-slate-100 transition duration-300 ease-in-out cursor-pointer`}
        >
          Plans
        </a>
        <a
          href="/aboutus"
          className={` ${
            onAboutUsPage && "bg-slate-100 font-semibold text-blue-500"
          } px-4 py-2 rounded-xl hover:bg-slate-100 transition duration-300 ease-in-out cursor-pointer`}
        >
          About us
        </a>
        <a
          href="/faq"
          className={` ${
            onFaqPage && "bg-slate-100 font-semibold text-blue-500"
          } px-4 py-2 rounded-xl hover:bg-slate-100 transition duration-300 ease-in-out cursor-pointer`}
        >
          FAQ
        </a>
      </div>
      <div className="w-52 flex justify-start">
        <button className="rounded-xl bg-[#448AFF] px-5 py-2 text-slate-100 font-semibold transition ease-in-out duration-300 hover:bg-opacity-80">
          Start Chatting
        </button>
      </div>
    </header>
  );
};
