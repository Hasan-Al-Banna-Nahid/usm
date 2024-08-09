import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => (
  <>
    <div className="flex justify-center items-center w-full bg-slate-600 text-white gap-10 border-2 border-red-600">
      <div>
        {" "}
        <Link href={"/"}>Home</Link>
      </div>{" "}
      <div>
        {" "}
        <Link href={"/routes/register"}>Sign In</Link>
      </div>{" "}
      <div>
        {" "}
        <Link href={"/routes/login"}>Login</Link>
      </div>{" "}
    </div>
  </>
);

export default Navbar;
