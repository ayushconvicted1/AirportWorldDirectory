"use client";

import React, { useState } from "react";
import { SignupModal } from "./AuthModals";
import Link from "next/link";
const HeaderActions = () => {
  const [modal, setModal] = useState<any>(null);
  const closeModal = () => setModal(null);

  const openSignupModal = () => {
    setModal("signup");
  };

  return (
    <>
      <div className="flex items-center space-x-8">
        <Link
          href="/"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Home
        </Link>
        <button
          onClick={openSignupModal}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Register As Vendor
        </button>
      </div>

      {/* {modal === "login" && (
        <LoginModal onClose={closeModal} onSwitchToSignup={switchToSignup} />
      )} */}
      {modal === "signup" && <SignupModal onClose={closeModal} />}
    </>
  );
};

export default HeaderActions;
