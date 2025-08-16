interface props {
  amountNet: number;
  confirmationNumber: string;
  selectedPlan: string;
  billingCycle: "annual" | "month";
}

export const ThankYouModal: React.FC<props> = ({
  amountNet,
  confirmationNumber,
  selectedPlan,
  billingCycle,
}) => {
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);
  const nextYear = new Date(today);
  nextYear.setFullYear(today.getFullYear() + 1);

  return (
    <div className="max-w-xl mx-auto mt-10 p-10 bg-slate-50 shadow-xl rounded-lg text-gray-800 font-medium text-lg">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-blue-600">
          Thank You for Your Order!
        </h1>
        <p className="text-lg">
          Your subscription is confirmed! We’re excited to have you on board.
        </p>

        <hr className="my-4" />

        <div className="space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">Date:</p>{" "}
              <p className="text-gray-700">{today.toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">Plan:</p>{" "}
              <p className="text-gray-700">{selectedPlan}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">Billing Cycle:</p>{" "}
              <p className="text-gray-700"> {billingCycle}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">First Payment:</p>{" "}
              <p className="text-gray-700"> US ${amountNet} charged today</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">Next Billing Date:</p>{" "}
              <p className="text-gray-700">
                {billingCycle === "month"
                  ? nextMonth.toLocaleDateString()
                  : nextYear.toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-medium">Confirmation Number:</p>{" "}
              <p className="text-gray-700">{confirmationNumber}</p>
            </div>
          </div>
          <button className="w-full my-2 mx-auto py-1.5 bg-blue-600 text-neutral-50 rounded-xl hover:bg-opacity-80 transition duration-300 ease-in-out">
            Access Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
