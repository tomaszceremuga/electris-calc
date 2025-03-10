import DeliveryOptions from "./DeliveryOptions";
import SummaryButtons from "./SummaryButtons";

const SummarySection = () => {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-8 rounded-xl p-6 md:flex-row">
      <div className="w-full rounded-lg p-4 md:w-1/2">
        <DeliveryOptions />
      </div>

      <div className="w-full rounded-lg p-4 md:w-1/2">
        <p className="text-lg font-bold text-neutral-800">
          Ilość elementów: <span className="text-neutral-600">0</span>
        </p>
        <p className="text-lg font-bold text-neutral-800">
          CENA: <span className="text-neutral-900">xxx ZŁ</span>
        </p>
        <p className="text-sm text-neutral-600">
          <sup className="font-bold text-neutral-700">
            <span>*</span>
          </sup>
          W cenę wliczony jest podatek VAT
        </p>
        <div>
          <SummaryButtons />
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
