import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Modal = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <div
        className="fixed w-full h-full inset-0 z-40 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-xl p-2 md:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto
                    md:rounded-2xl md:w-[600px] lg:w-[800px] transition-all"
        >
          <div className="flex text-[#333333] items-center justify-between">
            <h1 className="text-xl font-medium">{title}</h1>
            <FontAwesomeIcon
              onClick={onClose}
              className={`text-[#333333] text-xl cursor-pointer border-2 rounded-full py-1 px-2`}
              icon="xmark"
            />
          </div>
          <hr className="text-[#F8AE1A] w-11/12"></hr>
          <div className="mt-4">
            {children}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
