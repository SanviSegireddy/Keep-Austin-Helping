"use client";

import { updatePreferences } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Error, Success } from "@/components/ui/sonner";
import {
  getUniqueCategories,
  getUniquePincodes,
  volunteerOpportunities,
} from "@/data";
import { usePreferences } from "@/hooks/use-preferences";
import { UserPreferences } from "@/types";
import { Edit } from "lucide-react";

import React, { useEffect } from "react";
import { toast } from "sonner";

interface PreferencesProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  userPreferences: UserPreferences;
}

const Preferences = ({ userPreferences, ...props }: PreferencesProps) => {
  const [preferedLocations, setPreferedLocations] = React.useState<string[]>(
    []
  );
  const [preferedCategories, setPreferedCategories] = React.useState<string[]>(
    []
  );
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const locations = getUniquePincodes(volunteerOpportunities);
  const categories = getUniqueCategories(volunteerOpportunities);

  const { setUserPrefernces: setGlobalPreference } = usePreferences();

  useEffect(() => {
    // Initialize with user preferences on mount
    setPreferedLocations(userPreferences.userLocations);
    setPreferedCategories(userPreferences.userCategories);

    setGlobalPreference(userPreferences);
  }, [userPreferences, setGlobalPreference]);

  const handleClick = async () => {
    const response = await updatePreferences(
      preferedLocations,
      preferedCategories
    );
    if (response?.status === "error") {
      toast.error(response?.message, {
        icon: <Error />,
      });
      return;
    }

    if (response?.status === "success") {
      setGlobalPreference(userPreferences);
      toast.success(response?.message, {
        icon: <Success />,
      });
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Dialog open={isDropdownOpen} onOpenChange={setIsDropdownOpen} {...props}>
      <DialogTrigger asChild className="hidden">
        <Button className="p-2" variant={"outline"}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit your preferences</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="space-y-1">
          <p className="text-lg font-medium">Preferred locations</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {locations.map((location) => (
              <div className="flex items-center gap-1" key={location}>
                <Checkbox
                  checked={preferedLocations.includes(location)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setPreferedLocations([...preferedLocations, location]);
                    } else {
                      setPreferedLocations(
                        preferedLocations.filter((loc) => loc !== location)
                      );
                    }
                  }}
                />
                {location}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full border-b border-color2" />

        <div className="space-y-1">
          <p className="text-lg font-medium">Preferred categories</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {categories.map((category) => (
              <div className="flex items-center gap-1" key={category}>
                <Checkbox
                  checked={preferedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setPreferedCategories([...preferedCategories, category]);
                    } else {
                      setPreferedCategories(
                        preferedCategories.filter((cat) => cat !== category)
                      );
                    }
                  }}
                />
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleClick} className="w-fit">
            Update preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Preferences;
