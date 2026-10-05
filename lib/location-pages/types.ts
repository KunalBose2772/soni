export type StateDistrict = {
  name: string;
  slug: string;
  aliases?: string[];
};

export type StateLocationRoutes = {
  districtRoute: (slug: string) => string;
  localityRoute: (districtSlug: string, localitySlug: string) => string;
  localitySlug: (localityName: string) => string;
};
