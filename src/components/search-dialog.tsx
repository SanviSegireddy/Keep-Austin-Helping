"use client";

import React from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import OpportunityList from "@/app/(protected)/users/_components/opportunity-list";

function SearchDialog() {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="flex items-start">
        <div className="flex h-24 w-32 flex-col items-center justify-center rounded-b-3xl bg-color2 font-merriweather transition-all duration-200 hover:h-28 hover:text-lg hover:text-white">
          <span>Find an</span>
          <span>Opportunity</span>
          <span>Near me!</span>
        </div>
      </DialogTrigger>
      <DialogContent className="flex max-w-[90vw] flex-col pt-10">
        <p className="text-center text-lg">Search for opportunities near you</p>
        <OpportunityList />
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
