/** @type {import('next').NextConfig} */

export const images = {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "iaiadlibxklcwhnjeabg.supabase.co",
      port: "",
      pathname: "/storage/v1/object/public/cabins-imgs/**",
    },
  ],
};
