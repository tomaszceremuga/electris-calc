import React from "react";
import DeliveryOptions from "./DeliveryOptions";
import SummaryButtons from "./SummaryButtons";
import OrderDetails from "./OrderDetails";

const SummarySection = () => {
  return (
    <div className="flex items-start justify-between gap-8 rounded-xl p-6">
      <div className="w-1/2 rounded-lg p-4">
        <h3 className="mb-2 font-semibold text-neutral-700">Opcje Dostawy</h3>
        <DeliveryOptions />
        <OrderDetails />
      </div>

      <div className="w-1/2 rounded-lg p-4">
        <p className="text-lg font-bold text-neutral-800">
          ilość elementów: <span className="text-neutral-600">0</span>
        </p>
        <p className="text-lg font-bold text-neutral-800">
          CENA: <span className="text-neutral-900">xxx ZŁ</span>
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          <sup className="font-bold text-neutral-700">
            <span>*</span>
          </sup>
          W cenę wliczony jest podatek VAT
        </p>
        <div className="mt-4">
          <SummaryButtons />
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
