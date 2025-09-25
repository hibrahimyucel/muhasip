import React from "react";

import {
  FiCheckCircle,
  FiFilter,
  FiList,
  FiXCircle,
  FiArrowUp,
  FiArrowDown,
  FiMinusCircle,
  FiPlusCircle,
  FiLogOut,
  FiLogIn,
  FiCircle,
  FiCheckSquare,
  FiSquare,
  FiDelete,
} from "react-icons/fi";

export enum Ico {
  icoSortA,
  icoSortD,
  icoList,
  icoFilter,
  icoOk,
  icoCancel,
  icoRemove,
  icoAdd,
  icoLogOut,
  icoLogIn,
  icoCircle,
  icoChecked,
  icoCheckedX,
  icoDeleteRow,
}

export default function Icons({ icon }: { icon: Ico }) {
  switch (icon) {
    case Ico.icoSortA:
      return <FiArrowDown className="text-2xl text-green-400" />;
    case Ico.icoSortD:
      return <FiArrowUp className="text-2xl text-red-400" />;
    case Ico.icoList:
      return <FiList className="text-2xl text-blue-600" />;
    case Ico.icoFilter:
      return <FiFilter className="text-2xl" />;

    case Ico.icoOk:
      return <FiCheckCircle className="text-2xl text-green-700" />;
    case Ico.icoCancel:
      return <FiXCircle className="text-2xl text-red-600" />;

    case Ico.icoRemove:
      return <FiMinusCircle className="text-2xl text-red-600" />;
    case Ico.icoAdd:
      return <FiPlusCircle className="text-2xl text-blue-700" />;
    case Ico.icoLogOut:
      return <FiLogOut />;
    case Ico.icoLogIn:
      return <FiLogIn />;
    case Ico.icoCircle:
      return <FiCircle className="opacity-25" />;

    case Ico.icoChecked:
      return <FiCheckSquare className="text-2xl" />;
    case Ico.icoCheckedX:
      return <FiSquare className="text-2xl text-gray-500" />;
    case Ico.icoDeleteRow:
      return <FiDelete className="text-2xl" />;
    default:
      return null;
  }
}
