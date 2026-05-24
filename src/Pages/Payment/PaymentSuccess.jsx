const PaymentSuccess = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-base-100 shadow-xl rounded-2xl p-10 text-center">
        <h2 className="text-4xl font-bold text-success mb-4">
          Payment Successful
        </h2>

        <p>Your payment has been completed successfully.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
