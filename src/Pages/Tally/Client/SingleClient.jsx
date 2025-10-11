import { useLocation } from "react-router";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { useGetClientByIdQuery } from "../../../redux/features/clientApi/clientApi";
import CurrencyFormatter from "../../../Components/CurrencyFormatter/CurrencyFormatter";
import { toast } from "sonner";
import { useAddTransactionMutation } from "../../../redux/features/transactionApi/transactionApi";
import Menu from "../../../Components/Tally/Menu";

const SingleClient = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const clientId = queryParams.get("clientId");
  const [debit, setDebit] = useState("");
  const [credit, setCredit] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Focus states for floating labels
  const [debitFocused, setDebitFocused] = useState(false);
  const [creditFocused, setCreditFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);

  const { data, isLoading } = useGetClientByIdQuery(
    { id: clientId },
    { skip: !clientId }
  );

  const [addTransaction, { isLoading: isAddingTransaction }] =
    useAddTransactionMutation();

  const getInitials = (name) => {
    if (!name || !name.trim()) return "AA";
    const trimmedName = name.trim();
    const words = trimmedName.split(/\s+/);
    let initials = "";

    if (words.length >= 2) {
      initials = words[0][0] + words[words.length - 1][0];
    } else {
      initials = trimmedName.slice(0, 2);
    }

    initials = initials.toUpperCase();

    if (initials.length < 2) {
      initials += "A".repeat(2 - initials.length);
    }

    return initials;
  };

  // Handle debit input change - clear credit if debit is filled
  const handleDebitChange = (e) => {
    const value = e.target.value;
    setDebit(value);
    if (value) {
      setCredit("");
    }
  };

  // Handle credit input change - clear debit if credit is filled
  const handleCreditChange = (e) => {
    const value = e.target.value;
    setCredit(value);
    if (value) {
      setDebit("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if date is provided
    if (!date) {
      toast.error("Date is required");
      return;
    }

    // Validation: Check if either debit or credit is filled (but not both or none)
    if (!debit && !credit) {
      toast.error("Either debit or credit amount is required");
      return;
    }

    if (debit && credit) {
      toast.error("Cannot have both debit and credit values");
      return;
    }

    // Determine type and amount based on which field is filled
    let type = "";
    let amount = 0;

    if (debit) {
      type = "debit";
      amount = parseFloat(debit);
    } else if (credit) {
      type = "credit";
      amount = parseFloat(credit);
    }

    // Validate amount is a positive number
    if (isNaN(amount) || amount <= 0) {
      toast.error("Invalid amount");
      return;
    }

    // Prepare transaction data
    const data = {
      type,
      amount,
      description: description.trim() || null,
      created_date: date,
    };

    try {
      const result = await addTransaction({ id: clientId, data }).unwrap();
      if (result?.success) {
        setDebit("");
        setCredit("");
        setDescription("");
        setDate(new Date().toISOString().split("T")[0]);
        toast.success(result?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  // ✅ Convert values safely
  const debitSum = parseFloat(data?.data?.debitSum || 0);
  const creditSum = parseFloat(data?.data?.creditSum || 0);

  // ✅ Compute balance correctly
  const balance = debitSum - creditSum;

  // ✅ Determine status
  let statusText = "Settled";
  let statusColor = "text-gray-600";

  if (balance > 0) {
    statusText = "Due";
    statusColor = "text-red-600";
  } else if (balance < 0) {
    statusText = "Advance";
    statusColor = "text-green-600";
  }

  return (
    <div className="p-4 max-w-md min-h-screen">
      {/* User Info Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-[50px] w-[50px] rounded-full bg-pink-200">
            <h1 className="text-2xl font-bold">
              {getInitials(data?.data?.name)}
            </h1>
          </div>
          <div>
            <h2 className="text-xl font-semibold capitalize">
              {data?.data?.name}
            </h2>
            {data?.data?.mobile && (
              <p className="text-sm text-gray-600">{data?.data?.mobile}</p>
            )}
          </div>
        </div>

        <>
          <Menu />
        </>
      </div>

      {/* Due Amounts */}
      {/* Balance Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">{statusText}:</span>
          <span className={`${statusColor} font-semibold`}>
            <CurrencyFormatter value={Math.abs(balance)} />
          </span>
        </div>
      </div>

      {/* Form Section */}
      <div className="space-y-4">
        {/* Debit and Credit inputs */}
        <div className="grid grid-cols-2 gap-4">
          {/* Debit */}
          <div className="relative">
            <label
              className={`absolute left-3 bg-white px-1 pointer-events-none transition-all ${
                debitFocused || debit
                  ? "-top-2 text-xs text-[#009099]"
                  : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
              }`}
            >
              Debit
            </label>
            <input
              type="number"
              value={debit}
              onChange={handleDebitChange}
              onFocus={() => setDebitFocused(true)}
              onBlur={() => setDebitFocused(false)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009099] focus:border-transparent outline-none"
            />
          </div>

          {/* Credit */}
          <div className="relative">
            <label
              className={`absolute left-3 bg-white px-1 pointer-events-none transition-all ${
                creditFocused || credit
                  ? "-top-2 text-xs text-[#009099]"
                  : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
              }`}
            >
              Credit
            </label>
            <input
              type="number"
              value={credit}
              onChange={handleCreditChange}
              onFocus={() => setCreditFocused(true)}
              onBlur={() => setCreditFocused(false)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009099] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Description input */}
        <div className="relative">
          <label
            className={`absolute left-3 bg-white px-1 pointer-events-none transition-all ${
              descriptionFocused || description
                ? "-top-2 text-xs text-[#009099]"
                : "top-3 text-sm text-gray-400"
            }`}
          >
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setDescriptionFocused(true)}
            onBlur={() => setDescriptionFocused(false)}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009099] focus:border-transparent outline-none resize-none"
          />
        </div>

        {/* Date picker */}
        <div className="relative">
          <label
            className={`absolute left-3 bg-white px-1 pointer-events-none transition-all z-10 ${
              dateFocused || date
                ? "-top-2 text-xs text-[#009099]"
                : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
            }`}
          >
            Date *
          </label>
          <div className="relative">
            <Calendar
              className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                dateFocused ? "text-[#009099]" : "text-gray-400"
              }`}
              size={18}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onFocus={() => setDateFocused(true)}
              onBlur={() => setDateFocused(false)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009099] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isAddingTransaction || isLoading}
          className="w-full bg-[#009099] text-white py-3 rounded-lg font-semibold hover:bg-[#007a82] transition-colors duration-200"
        >
          {isAddingTransaction ? "Adding..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default SingleClient;
