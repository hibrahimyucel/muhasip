import React from "react";

import  
{  FiCheckCircle,
  FiFilter,
  FiList,
  FiXCircle,
  FiArrowUp,
  FiArrowDown,
  FiMinusCircle,
  FiPlusCircle,
  FiLogOut,
  FiLogIn,
  FiCircle}
 from "react-icons/fi";

export type Ico =
  | "icoSortA"
  | "icoSortD"
  | "icoList"
  | "icoFilter"
  | "icoOk"
  | "icoCancel"
  | "icoRemove"
  | "icoAdd"
  | "icoLogOut"
  | "icoLogIn"
  | "icoCircle";

export default function Icons({ icon }: { icon: Ico }) {
  switch (icon) {
    case "icoSortA":
      return <FiArrowDown className="text-green-400" />;
    case "icoSortD":
      return <FiArrowUp className="text-red-400" />;
    case "icoList":
      return <FiList />;
    case "icoFilter":
      return <FiFilter />;

    case "icoOk":
      return <FiCheckCircle className="text-green-700" />;
    case "icoCancel":
      return <FiXCircle className="text-red-600" />;

    case "icoRemove":
      return <FiMinusCircle className="text-red-600" />;
    case "icoAdd":
      return <FiPlusCircle className="text-blue-700" />;
    case "icoLogOut":
      return <FiLogOut />;
    case "icoLogIn":
      return <FiLogIn />;
    case "icoCircle":
      return <FiCircle className="opacity-25" />;
    default:
      return null;
  }
}
