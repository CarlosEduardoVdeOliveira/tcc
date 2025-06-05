import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import React from "react";

export function Modal({ open, onClose, title, children }) {
  return (
    <Dialog
      className="bg-gray-50 w-[50%] h-[50%] text-brown-500 relative m-auto"
      open={open}
      handler={onClose}
    >
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-2 right-2 text-brown-500 hover:text-red-500 z-10"
      >
        <X />
      </button>

      <DialogHeader className="mt-6 flex items-center justify-center">{title}</DialogHeader>
      <DialogBody>{children}</DialogBody>
      <DialogFooter />
    </Dialog>
  );
}
