import React from "react";
import DeliveryOptions from "./DeliveryOptions";
import SummaryButtons from "./SummaryButtons";

const SummarySection = () => {
  return (
    <div className="flex items-start justify-between gap-8">
      <div className="w-1/2">
        <p>Opcję Dostawy</p>
        <DeliveryOptions />
      </div>
      <div className="w-1/2">
        <p>
          CENA: xxx ZŁ
          <sub>
            <span>(ilość elementów)</span>
          </sub>
        </p>
        <p>
          <sup>
            <span>*</span>
          </sup>
          W cenę wliczony jest podatek VAT
        </p>
        <SummaryButtons />
      </div>
    </div>
  );
};

export default SummarySection;
