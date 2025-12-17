import Button from "@/components/ui/Button";

interface ConfirmEditModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmEditModal({
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}: ConfirmEditModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => !isLoading && onCancel()}
    >
      <div
        className="w-11/12 max-w-md rounded-2xl border-4 border-stone-900 bg-white shadow-[8px_8px_0_#1c1917]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b-3 border-stone-900 bg-blue-300 px-6 py-4">
          <h3 className="text-xl font-bold text-stone-900">Edit Order?</h3>
        </div>

        <div className="p-6">
          <p className="mb-6 text-gray-600">
            Your order will be moved to cart and cancelled. You can then modify
            your items and place a new order.
          </p>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1"
            >
              No, go back
            </Button>
            <Button
              variant="submit"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "Loading..." : "Yes, edit order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
