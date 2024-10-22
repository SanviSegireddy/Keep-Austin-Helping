import Link from "next/link";
import { VolunteerOpportunity } from "@/types";
import { Card, CardContent } from "./ui/card";

interface OpportunityCTAProps {
  opportunity: VolunteerOpportunity;
}
const OpportunityCTA = ({ opportunity }: OpportunityCTAProps) => {
  const { latitude, longitude } = opportunity.location;

  return (
    <Link
      href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
      target="_blank"
    >
      <Card>
        <CardContent className="py-2 hover:bg-muted text-[15px] font-merriweather">
          <p className="text-lg font-medium">{opportunity.title}</p>
          <p className="text-sm text-muted-foreground pb-2">
            {opportunity.organization}
          </p>
          <p>{opportunity.description}</p>
          <p>
            Location: {opportunity.location.address},{" "}
            {opportunity.location.pincode}
          </p>
          <p>Email: {opportunity.contact_info}</p>
          <p>Categories: {opportunity.categories.join(", ")}</p>
          <p>
            Date: {opportunity.start_date} - {opportunity.end_date}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OpportunityCTA;
