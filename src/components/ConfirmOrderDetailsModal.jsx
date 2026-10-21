import React from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiX,
  FiPackage,
} from "react-icons/fi";

const fmtBDT = (n) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(n || 0));

const fmtBDDateTime = (d) =>
  d
    ? new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Dhaka",
      }).format(new Date(d))
    : "—";

export default function ConfirmOrderDetailsModal({
  order,
  onClose,
  onDeliver,
  onCancel,
  busy,
}) {
  const productTotal = (order?.products || []).reduce(
    (s, it) => s + (Number(it?.price) || 0) * (Number(it?.quantity) || 0),
    0
  );

  const status = String(order?.orderStatus || "").toLowerCase();
  const canDeliver = status === "processing";
  const canCancel = status === "processing";

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-xl border">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
            <p className="text-xs text-gray-500 font-mono">ID: {order?._id}</p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded-lg hover:bg-gray-100"
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[70vh] overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border p-4">
              <p className="text-xs text-gray-500 mb-1">Customer</p>
              <p className="font-medium text-gray-900">{order?.customer?.name || "—"}</p>
              <p className="text-sm text-gray-700">{order?.customer?.mobile || "—"}</p>
              <p className="text-xs text-gray-500 mt-2">Created</p>
              <p className="text-sm text-gray-700">{fmtBDDateTime(order?.createdAt)}</p>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-xs text-gray-500 mb-1">Shipping</p>
              <p className="text-sm text-gray-700">
                {order?.shippingOption || "—"} • {fmtBDT(order?.shippingCost || 0)}
              </p>
              <p className="text-xs text-gray-500 mt-2">Address</p>
              <p className="text-sm text-gray-700">{order?.address || "—"}</p>
            </div>
          </div>

          <div className="rounded-xl border overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-700 uppercase">
              Products
            </div>
            <div className="divide-y">
              {(order?.products || []).map((it, idx) => {
                const name = it?.product?.productName || "N/A";
                const sku = it?.product?.sku || "—";
                const img =
                  it?.product?.productImage?.[0] ||
                  it?.product?.productImage ||
                  null;
                const qty = Number(it?.quantity) || 0;
                const unit = Number(it?.price) || 0;
                const sub = qty * unit;

                return (
                  <div key={idx} className="p-4 flex gap-3 items-start">
                    <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden grid place-items-center shrink-0">
                      {img ? (
                        <img src={img} alt={name} className="h-full w-full object-cover" />
                      ) : (
                        <FiPackage className="text-gray-400" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900">{name}</p>
                      <p className="text-xs text-gray-500">SKU: {sku}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Qty: <span className="font-medium text-gray-800">{qty}</span> • Unit:{" "}
                        <span className="font-medium text-gray-800">{fmtBDT(unit)}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-500">Subtotal</p>
                      <p className="font-semibold text-gray-900">{fmtBDT(sub)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-sm text-gray-600">
              Status: <span className="font-medium text-gray-900">{status}</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Products Total</p>
              <p className="text-sm font-semibold text-gray-900">{fmtBDT(productTotal)}</p>
              <p className="text-xs text-gray-500 mt-1">Grand Total</p>
              <p className="text-lg font-bold text-gray-900">{fmtBDT(order?.totalPrice || 0)}</p>
            </div>
          </div>

          {!canDeliver && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              ℹ️ This order is already <b>{status}</b>. Delivered/Cancel disabled.
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t flex flex-col sm:flex-row gap-2 sm:justify-end">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm bg-white hover:bg-gray-50"
          >
            Close
          </button>

          <button
            disabled={!canCancel || busy}
            onClick={onCancel}
            className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm bg-rose-50 hover:bg-rose-100 text-rose-700 disabled:opacity-50"
          >
            <FiXCircle />
            Cancel
          </button>

          <button
            disabled={!canDeliver || busy}
            onClick={onDeliver}
            className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-700 disabled:opacity-50"
          >
            <FiCheckCircle />
            Delivered
          </button>
        </div>
      </div>
    </div>
  );
}