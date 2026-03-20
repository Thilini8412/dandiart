import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
projectId: "0gce4lhq",
dataset: "production",
apiVersion: "2023-01-01",
//useCdn: true,
useCdn: false, // Change this to FALSE to bypass the cached (old) error
perspective: 'published',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);