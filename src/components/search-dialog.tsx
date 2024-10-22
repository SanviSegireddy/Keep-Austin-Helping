"use client";

import React from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import OpportunityList from "@/app/(protected)/users/_components/opportunity-list";

function SearchDialog() {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="flex items-start">
        <div className="flex flex-col h-24 w-28 rounded-b-3xl items-center justify-center bg-color5 hover:h-28 hover:text-lg duration-200 transition-all hover:text-white">
          <span>Find an</span>
          <span>Opportunity</span>
          <span>Near me!</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] flex flex-col pt-10">
        <p className="text-center text-lg">Search for opportunities near you</p>
        <OpportunityList />
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
