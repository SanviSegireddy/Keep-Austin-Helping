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
import { useMediaQuery } from "@/hooks/use-media-query";

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

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!isDesktop) {
    return (
      <div className="flex flex-col items-center gap-y-4">
        <ScrollArea className="h-[75dvh] px-4">
          <div className="flex flex-col gap-y-4">
            <SearchPincode />
            <Map opportunities={opportunities} />
          </div>

          {opportunities.length === 0 && (
            <div className="flex items-center justify-center">
              <p className="tex-lg text-color2 md:text-xl">
                Unforunately, No opportunities are available at this pincode
              </p>
            </div>
          )}
          {opportunities.length > 0 && (
            <div className="flex flex-col gap-y-4 py-4">
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
    );
  }
  return (
    <div className="flex gap-y-4">
      <div className="flex h-[70vh] flex-col items-end gap-4 lg:w-[45vw]">
        <SearchPincode />
        <Map opportunities={opportunities} />
      </div>
      <ScrollArea className="h-[70vh] px-4 lg:w-[45vw]">
        {opportunities.length === 0 && (
          <div className="flex h-[70vh] items-center justify-center lg:w-[45vw]">
            <p className="text-xl text-color2">
              Unforunately, No opportunities are available at this pincode
            </p>
          </div>
        )}
        {opportunities.length > 0 && (
          <div className="flex flex-col gap-4">
            {opportunities.map((opportunity) => (
              <OpportunityCTA key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default OpportunityList;
