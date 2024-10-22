"use client";

import React from "react";
import { volunteerOpportunities } from "@/data";
import useDebounce from "@/hooks/use-debounce";
import Map from "@/components/map";
import OpportunityCTA from "@/components/opportunity-cta";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchPincode from "./search-pincode";
import { useSearch } from "@/hooks/use-search";
import { usePreferences } from "@/hooks/use-preferences";
import { sortOpportunitiesByPreferences } from "@/lib/sort-opportunity";

const OpportunityList = () => {
  const { search: pincode } = useSearch();
  const { userPreferences } = usePreferences();
  const [opportunities, setOpportunities] = React.useState(
    sortOpportunitiesByPreferences(volunteerOpportunities, userPreferences)
  );

  const debouncedPincode = useDebounce(pincode, 500);

  React.useEffect(() => {
    if (debouncedPincode) {
      setOpportunities(
        sortOpportunitiesByPreferences(
          volunteerOpportunities.filter((opportunity) =>
            opportunity.location.pincode.includes(debouncedPincode)
          ),
          userPreferences
        )
      );
    } else {
      setOpportunities(
        sortOpportunitiesByPreferences(volunteerOpportunities, userPreferences)
      );
    }
  }, [debouncedPincode, userPreferences]);

  return (
    <div className="flex flex-col gap-5 items-center py-4">
      <div className="grid grid-cols-5 gap-8">
        <div className="flex col-span-2 gap-4 flex-col h-[70vh] w-full items-end">
          <SearchPincode />
          <Map opportunities={opportunities} />
        </div>
        <ScrollArea className="w-full col-span-3 h-[70vh] px-4">
          {opportunities.length === 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-xl text-color2">
                Unforunately, No opportunities are available at this pincode
              </p>
            </div>
          )}
          {opportunities.length > 0 && (
            <div className="flex flex-col gap-4">
              {opportunities.map((opportunity) => (
                <OpportunityCTA
                  key={opportunity.id}
                  opportunity={opportunity}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default OpportunityList;
