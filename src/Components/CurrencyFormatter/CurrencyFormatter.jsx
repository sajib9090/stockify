import { useEffect, useState } from "react";

function CurrencyFormatter({ value }) {
  const [formattedPrice, setFormattedPrice] = useState("");

  useEffect(() => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setFormattedPrice(formatter.format(value));
  }, [value]);

  return <div>{formattedPrice}</div>;
}

export default CurrencyFormatter;
