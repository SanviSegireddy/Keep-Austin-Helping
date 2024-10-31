import { CloudinaryImage } from "@/types";
import { v2 as cloudinary } from "cloudinary";

export async function GET(): Promise<Response> {
  const results: { resources: CloudinaryImage[] } = await cloudinary.search
    .expression("resource_type:image AND folder:keep-austin-helping")
    .execute();

  return Response.json(results);
}
