import { UserPreferences, VolunteerOpportunity } from "@/types";

export function sortOpportunitiesByPreferences(
  opportunities: VolunteerOpportunity[],
  preferences: UserPreferences
) {
  if (
    preferences.userLocations.length === 0 &&
    preferences.userCategories.length === 0
  ) {
    return opportunities;
  }

  return opportunities
    .filter((opportunity) => {
      // Keep only opportunities that match either the location or category preference
      const matchesLocation = preferences.userLocations.includes(
        opportunity.location.pincode
      );
      const matchesCategory = opportunity.categories.some((category) =>
        preferences.userCategories.includes(category)
      );
      return matchesLocation || matchesCategory;
    })
    .sort((a, b) => {
      // Sort first by location match
      const aLocationMatch = preferences.userLocations.includes(
        a.location.pincode
      );
      const bLocationMatch = preferences.userLocations.includes(
        b.location.pincode
      );

      if (aLocationMatch !== bLocationMatch) {
        return aLocationMatch ? -1 : 1; // Opportunities with matching locations come first
      }

      // Sort by category match if both have matching locations
      const aCategoryMatch = a.categories.some((category) =>
        preferences.userCategories.includes(category)
      );
      const bCategoryMatch = b.categories.some((category) =>
        preferences.userCategories.includes(category)
      );

      if (aCategoryMatch !== bCategoryMatch) {
        return aCategoryMatch ? -1 : 1; // Opportunities with matching categories come first
      }

      return 0; // If both match or don't match, maintain order
    });
}
