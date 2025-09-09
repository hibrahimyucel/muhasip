import { KeyboardEvent } from "react";

export default function focusOrder(e: KeyboardEvent, args: string[]) {
  if (e.key !== "Enter") return;

  let foundIndex = args.findIndex((i) => i === e.currentTarget.id);
  foundIndex = foundIndex ? foundIndex + 1 : 0;
  if (foundIndex === args.length) foundIndex = 1;

  document.getElementById(args[foundIndex])?.focus();
}
