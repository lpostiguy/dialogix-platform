import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../component/Header";
import checkMark from "../assets/svg/Check_mark.svg";
import { ThankYouModal } from "../component/ThankYouModal";

import stripeLogo from "../assets/svg/Logo_stripe.svg";

const stripePromise = loadStripe(
  "pk_test_51RoVAo48h2BtxxNXkrfrOpvP9t1QhiMFjIliOnfs4y6o444BWsJqNZ1u3AMlYSjgv3O8GzoseXmqfH7zT5I2iYnn00slXWu5Kp"
);

interface props {
  amountNet: number;
  setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutForm: React.FC<props> = ({ amountNet, setPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (error) {
      console.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div className="my-4">
          <hr className="border-gray-300 my-4" />
          <div className="flex justify-between">
            <p>Total Due :</p>
            <p>US ${amountNet.toFixed(2)}</p>
          </div>
        </div>
        <button
          className="bg-blue-600 hover:bg-opacity-80 transition duration-300 ease-in-out text-slate-100 w-full py-2 rounded-lg mt-4"
          type="submit"
          disabled={!stripe}
        >
          Subscribe
        </button>
      </form>
      <p className="text-center text-slate-500 text-sm font-normal mt-4">
        By confirming your subscription, you allow Dialogix to charge you for
        future payments in accordance with their terms. You can always cancel
        your subscription.
      </p>
    </>
  );
};

export const CheckoutPage = () => {
  const { planId } = useParams<{ planId: string }>();
  const [selectedPlan, setSelectedPlan] = useState<string>(
    planId ? planId : ""
  );
  const [amountNet, setAmountNet] = useState<number>(0);
  const [billingCycle, setBillingCycle] = useState<"annual" | "month">("month");

  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  function generateConfirmationNumber(length = 10) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  useEffect(() => {
    switch (selectedPlan) {
      case "premium_annual":
        setAmountNet(117.0);
        setBillingCycle("annual");
        break;
      case "premium_monthly":
        setAmountNet(12.99);
        setBillingCycle("month");
        break;
    }
  }, [selectedPlan, setAmountNet, setBillingCycle]);

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
    },
  };

  return (
    <div className="w-screen h-full">
      <Header />
      <div
        className={`w-4/5 h-full min-h-screen mx-auto flex flex-col ${
          !paymentSuccess && "justify-center bg-slate-50 shadow-xl"
        } m-4 rounded-2xl text-slate-800 overflow-hidden`}
      >
        {paymentSuccess ? (
          <ThankYouModal
            amountNet={amountNet}
            confirmationNumber={generateConfirmationNumber()}
            selectedPlan={selectedPlan}
            billingCycle={billingCycle}
          />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div className="bg-[#f4f6f7] w-1/2 min-h-screen flex flex-col p-10">
                <div className="space-y-4">
                  <h2>Subscribe to Dialogix</h2>
                  <div className="flex items-center space-x-2 font-medium text-slate-600">
                    <h1 className="text-4xl text-slate-800">
                      US ${amountNet.toFixed(2)}
                    </h1>
                    <div className="text-sm">
                      <p>per</p>
                      <p>{billingCycle}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    Premium Plan - Scale with AI Power
                  </p>
                </div>
                <div className="w-full space-y-6 mt-10">
                  <div
                    className={`w-full rounded-xl border-2 ${
                      selectedPlan === "premium_monthly"
                        ? "border-blue-500 shadow-lg shadow-blue-500/50"
                        : "border-slate-500 shadow-md"
                    } p-5`}
                  >
                    <div className="flex justify-between items-start">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="radio"
                          value="premium_monthly"
                          checked={selectedPlan === "premium_monthly"}
                          onChange={(e) => setSelectedPlan(e.target.value)}
                          className="form-radio text-blue-600 accent-blue-600"
                        />
                        <span className="ml-2 text-lg font-medium">
                          Premium Monthly Plan
                        </span>
                      </label>
                      <div>
                        <h3 className="text-xl font-medium text-slate-800">
                          $12.99
                        </h3>
                        <p className="text-sm">per month</p>
                      </div>
                    </div>
                    <div
                      className={`ml-6 ${
                        selectedPlan === "premium_monthly"
                          ? "opacity-100 max-h-96 transition-all duration-1000 ease-in-out"
                          : "opacity-0 max-h-0"
                      }`}
                    >
                      <h3 className="font-medium">Ilimited Usage</h3>
                      <ul className="space-y-2 text-sm">
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
                  <div
                    className={`w-full rounded-xl border-2 ${
                      selectedPlan === "premium_annual"
                        ? "border-blue-500 shadow-lg shadow-blue-500/50"
                        : "border-slate-500 shadow-md"
                    } p-5`}
                  >
                    <div className="flex justify-between items-start">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="radio"
                          value="premium_annual"
                          checked={selectedPlan === "premium_annual"}
                          onChange={(e) => setSelectedPlan(e.target.value)}
                          className="form-radio text-blue-600 accent-blue-600"
                        />
                        <span className="ml-2 text-lg font-medium">
                          Premium Annual Plan
                        </span>
                      </label>
                      <div className="flex items-center">
                        <span className="py-1 px-2 mr-2 text-sm bg-blue-200 text-slate-800 rounded-lg">
                          -21%
                        </span>
                        <div>
                          <h3 className="text-xl font-medium text-slate-800">
                            $117.00
                          </h3>
                          <p className="text-sm">per year</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`ml-6 ${
                        selectedPlan === "premium_annual"
                          ? "opacity-100 max-h-96 transition-all duration-1000 ease-in-out"
                          : "opacity-0 max-h-0"
                      }`}
                    >
                      <h3 className="font-medium">Ilimited Usage</h3>
                      <ul className="space-y-2 text-sm">
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
              </div>
              <div className="w-1/2 min-h-screen p-10 font-medium">
                <div className="flex justify-center space-x-2 items-center pb-4">
                  <h1 className="text-lg text-center">
                    Add a credit/debit card with
                  </h1>
                  <img className="h-8" src={stripeLogo} alt="Stripe" />
                </div>
                {clientSecret && (
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm
                      amountNet={amountNet}
                      setPaymentSuccess={setPaymentSuccess}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
