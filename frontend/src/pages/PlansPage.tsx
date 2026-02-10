import { Header } from "../component/Header";
import checkMark from "../assets/svg/Check_mark.svg";
import logoPremium from "../assets/svg/Logo_premium.svg";
import logoStandard from "../assets/svg/Logo_standard.svg";
import { useState } from "react";

export const PlansPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );

  return (
    <>
      <Header />
      <div className="w-screen h-full pb-10 text-slate-800">
        <div className="w-4/5 mx-auto flex flex-col justify-center bg-slate-50 shadow-xl space-y-10 p-4 m-4 rounded-2xl">
          <div className="flex flex-col justify-center text-center space-y-2">
            <h1 className="font-semibold text-3xl">Seamless AI Integration</h1>
            <p className="font-semibold text-xl text-slate-600">
              Add natural, human-like conversations to your product or website
              in minutes.
            </p>
          </div>
          <div className="bg-neutral-200 rounded-lg flex w-max mx-auto items-center">
            <button
              className={`py-1 w-36 my-1 ml-1 ${
                billingCycle === "annual"
                  ? "bg-neutral-100 text-blue-600"
                  : "hover:bg-slate-50"
              } rounded-lg duration-300 ease-in-out transition font-semibold`}
              onClick={() => setBillingCycle("annual")}
            >
              <span>annual</span>
              <span className="py-1 px-2 ml-2 text-sm bg-blue-200 text-slate-800 rounded-lg">
                -25%
              </span>
            </button>
            <button
              className={`py-1 w-36 my-1 mr-1 ${
                billingCycle === "monthly"
                  ? "bg-neutral-100 text-blue-600"
                  : "hover:bg-slate-100"
              } rounded-lg duration-300 ease-in-out transition font-semibold`}
              onClick={() => setBillingCycle("monthly")}
            >
              monthly
            </button>
          </div>
          <div className="flex justify-center items-start space-x-24">
            <div className="w-72 space-y-6 text-center h-full">
              <div className="space-y-1 flex flex-col justify-center">
                <img className="h-20" src={logoStandard} alt="" />
                <h2 className="text-3xl font-semibold">Standard</h2>
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-semibold text-3xl">FREE</h1>
                <p className="font-semibold text-slate-500">per month</p>
              </div>
              <a
                href="/chat"
                className="bg-blue-500 hover:bg-opacity-90 transition duration-300 ease-in-out text-neutral-50 py-2 w-full flex justify-center px-4 rounded-lg shadow-md"
              >
                Continue with Standard
              </a>
              <div>
                <h3 className="font-semibold text-lg">Get Started Fast</h3>
                <ul className="space-y-2 flex flex-col justify-center">
                  <li className="mt-2">
                    <img
                      src={checkMark}
                      alt=""
                      className="inline-block align-middle mr-2 w-4 h-4"
                    />
                    <span className="inline-block align-middle">
                      1 AI chatbot (basic setup)
                    </span>
                  </li>
                  <li className="mt-2">
                    <img
                      src={checkMark}
                      alt=""
                      className="inline-block align-middle mr-2 w-4 h-4"
                    />
                    <span className="inline-block align-middle">
                      Up to 500 messages/month
                    </span>
                  </li>
                  <li className="mt-2">
                    <img
                      src={checkMark}
                      alt=""
                      className="inline-block align-middle mr-2 w-4 h-4"
                    />
                    <span className="inline-block align-middle">
                      Web widget integration
                    </span>
                  </li>
                  <li className="mt-2">
                    <img
                      src={checkMark}
                      alt=""
                      className="inline-block align-middle mr-2 w-4 h-4"
                    />
                    <span className="inline-block align-middle">
                      Community support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-72 space-y-6 text-center">
              <div className="space-y-1 flex flex-col justify-center">
                <img className="h-20" src={logoPremium} alt="" />
                <h2 className="text-3xl font-semibold">Premium</h2>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-center">
                  <h1 className="font-semibold text-3xl">
                    {billingCycle === "monthly" ? "$12.99" : "$117"}
                  </h1>
                  {billingCycle === "annual" && (
                    <div className="py-1 px-2 ml-2 text-sm bg-blue-200 text-slate-800 rounded-lg">
                      -25% Discount
                    </div>
                  )}
                </div>
                <p className="font-semibold text-slate-500">
                  {billingCycle === "monthly" ? "per month" : "per year"}
                </p>
              </div>
              <a
                href={`/checkout/${"premium_"}${billingCycle}`}
                className="bg-blue-500 hover:bg-opacity-90 transition duration-300 ease-in-out text-neutral-50 py-2 w-full flex justify-center px-4 rounded-lg shadow-md"
              >
                Upgrade to Premium
              </a>
              <div>
                <h3 className="font-semibold text-lg">Scale with AI Power</h3>
                <ul className="space-y-2">
                  <li className="mt-2">
                    <img
                      src={checkMark}
                      alt=""
                      className="inline-block align-middle mr-2 w-4 h-4"
                    />
                    <span className="inline-block align-middle">
                      Unlimited AI chatbots
                    </span>
                  </li>
                  <li>
                    <img
                      src={checkMark}
                      alt=""
                      className="inline-block align-middle mr-2 w-4 h-4"
                    />
                    <span className="inline-block align-middle">
                      Up to 5,000+ messages/month
                    </span>
                  </li>
                  <li>
                    <img
                      src={checkMark}
                      alt=""
                      className="inline-block align-middle mr-2 w-4 h-4"
                    />
                    <span className="inline-block align-middle">
                      Smart memory & context
                    </span>
                  </li>
                  <li>
                    <img
                      src={checkMark}
                      alt=""
                      className="inline-block align-middle mr-2 w-4 h-4"
                    />
                    <span className="inline-block align-middle">
                      API & SDK access for developers
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="space-y-2 text-center">
              <p>More details and all features</p>
              <a className="text-blue-500">View Pricing Page</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
