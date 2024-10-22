"use client";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";
import { Search } from "lucide-react";
import React, { useState } from "react";

const isValidPincode = (pincode: string) => {
  // Regular expression to match valid postal codes
  const regex = /^(?!0)\d{5}$|^\d{5}-\d{4}$|^[A-Z]\d[A-Z] \d[A-Z]\d$/; // Add more patterns as needed
  return regex.test(pincode);
};

const SearchPincode = () => {
  const { search: pincode, setSearch: setPincode } = useSearch();
  const [isTouched, setIsTouched] = useState(false);
  const isPincodeInvalid = !isValidPincode(pincode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPincode(e.target.value);
    setIsTouched(true); // Mark input as touched on change
  };

  return (
    <div>
      <Input
        type="number"
        className={`w-[500px] bg-white ${
          isPincodeInvalid && isTouched ? "border-red-500" : ""
        }`}
        placeholder="Enter Your Zipcode to Find an Opportunity Near You!"
        onChange={handleChange}
        value={pincode}
        onBlur={() => setIsTouched(true)} // Ensure input is marked as touched on blur
        suffix={<Search className="h-4 w-4 text-muted-foreground" />}
      />
      {isPincodeInvalid && isTouched && (
        <p className="text-red-500 text-xs pt-0.5">enter a valid zipcode.</p>
      )}
    </div>
  );
};

export default SearchPincode;
