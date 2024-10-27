"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { VolunteerOpportunity } from "@/types";

interface MapProps {
  opportunities: VolunteerOpportunity[];
}

function Map({ opportunities }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { AdvancedMarkerElement } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      // Set default center to Austin
      const defaultCenter = {
        lat: 30.2672, // Latitude for Austin, Texas
        lng: -97.7431, // Longitude for Austin, Texas
      };

      // Map options: default center on Austin, or the first opportunity's location if available
      const mapOptions: google.maps.MapOptions = {
        center:
          opportunities.length > 0
            ? {
                lat: opportunities[0]?.location.latitude,
                lng: opportunities[0]?.location.longitude,
              }
            : defaultCenter,
        zoom: 11,
        mapId: "b0f0f8f8b5b6b6b6",
      };

      // Initialize the map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      if (opportunities.length > 0) {
        // Add markers for each opportunity if available
        opportunities.forEach((opportunity) => {
          const position = {
            lat: opportunity.location.latitude,
            lng: opportunity.location.longitude,
          };

          // Create a marker for each opportunity
          const marker = new AdvancedMarkerElement({
            map: map,
            position: position,
          });

          marker.addListener("click", () => {
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`,
              "_blank"
            );
          });
        });
      }
    };

    initMap();
  }, [opportunities]);

  return (
    <div
      className="aspect-square w-full sm:aspect-auto sm:h-[400px] lg:h-[70vh]"
      ref={mapRef}
    />
  );
}

export default Map;
