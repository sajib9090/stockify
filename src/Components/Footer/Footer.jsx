import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-[35px] flex bg-slate-200 w-full lg:w-[256px] items-center justify-center space-x-1 text-[12px] text-gray-400">
      <span>Powered By</span>
      <Link
        to={"https://www.facebook.com/@sajib.hossain.9803"}
        target="blank"
        className="text-slate-950"
      >
        Sajib Hossain
      </Link>
      <span>©</span>
      <span>{new Date().getFullYear()}</span>
      <span className="ml-1 text-gray-300">v 1.00</span>
    </div>
  );
};

export default Footer;
