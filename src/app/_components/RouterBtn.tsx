"use client";
import React from "react";

import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

const RouterBtn = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/zamowienie");
  };

  return (
    <div>
      <Button
        variant="default"
        className="mt-4 px-6 py-3 text-lg"
        onClick={handleNavigation}
      >
        KLIK
      </Button>
    </div>
  );
};

export default RouterBtn;
