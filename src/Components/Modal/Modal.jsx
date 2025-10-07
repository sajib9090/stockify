import { Dialog, DialogPanel } from "@headlessui/react";

const Modal = ({ setIsOpen, isOpen, children, maxW }) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-[999]"
      >
        <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-12">
          <DialogPanel
            className={`${maxW} w-full max-h-[90vh] overflow-y-auto space-y-4 border bg-white p-4 rounded shadow-lg`}
          >
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Modal;
