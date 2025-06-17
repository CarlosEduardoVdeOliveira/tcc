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
      className="bg-white w-[90%] max-w-2xl max-h-[90vh] text-gray-800 relative m-auto rounded-xl shadow-2xl border border-gray-200"
      open={open}
      handler={onClose}
      size="lg"
    >
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-red-500 z-10 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
        title="Fechar"
      >
        <X size={20} />
      </button>

      <DialogHeader className="mt-6 mb-2 flex items-center justify-center border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          {title}
        </h2>
      </DialogHeader>

      <DialogBody className="p-6 overflow-y-auto max-h-[60vh]">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          {children}
        </div>
      </DialogBody>

      <DialogFooter className="flex justify-center gap-4 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="text-sm text-gray-500">
          Clique fora do modal ou pressione ESC para fechar
        </div>
      </DialogFooter>
    </Dialog>
  );
}
