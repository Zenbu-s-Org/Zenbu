import { X } from "lucide-react";
import Button from "@/components/ui/Button";
interface ConfirmCancelModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmCancelModal({
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}: ConfirmCancelModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => !isLoading && onCancel()}
    >
      <div
        className="w-11/12 max-w-md rounded-2xl border-4 border-stone-900 bg-white p-6 shadow-[8px_8px_0_#1c1917]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-xl font-bold text-gray-900">Cancel Order?</h3>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-6 text-gray-600">
          Are you sure you want to cancel your order? This action cannot be
          undone.
        </p>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Go back
          </Button>
          <Button
            variant="submit"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? "Cancelling..." : "Yes, cancel"}
          </Button>
        </div>
      </div>
    </div>
  );
}
