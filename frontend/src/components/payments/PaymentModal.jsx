function PaymentModal({
  open,
  payment,
  onClose,
}) {

  if (!open || !payment) return null;

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8">

        <h2 className="text-3xl font-bold mb-8">
          Payment Details
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-gray-400 text-sm">
              Transaction ID
            </p>

            <p className="font-semibold">
              {payment.transaction_id}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              Amount
            </p>

            <p className="font-semibold">
              ₹{payment.amount}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              Payment Type
            </p>

            <p>
              {payment.payment_type}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              Payment Method
            </p>

            <p>
              {payment.payment_method}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              Status
            </p>

            <span
              className={`px-3 py-1 rounded-full text-sm
              ${
                payment.payment_status==="Success"
                ? "bg-green-100 text-green-700"
                : payment.payment_status==="Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
              }`}
            >
              {payment.payment_status}
            </span>
          </div>

        </div>

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-3"
          >
            Close
          </button>

        </div>

      </div>

    </div>

  );

}

export default PaymentModal;