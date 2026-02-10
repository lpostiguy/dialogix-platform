export const Footer = () => {
  return (
    <footer className="bg-slate-100 text-slate-700 py-12 border-t">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">Dialogix</h2>
          <p className="text-sm mt-1">
            Better understand your customers.
          </p>
        </div>

        <div className="flex space-x-6 text-sm">
          <a href="/plans" className="hover:text-blue-600 transition">
            Pricing
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Support
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Privacy Policy
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 mt-4">
        © {new Date().getFullYear()} Dialogix. All rights reserved.
      </div>
    </footer>
  );
};


export default Footer;