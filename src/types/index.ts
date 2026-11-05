export * from "./document";
export * from "./clause";
export * from "./insight";
export * from "./chat";
export * from "./report";

export interface NavigationItem {
  name: string;
  href: string;
  iconName: string;
  badge?: string | number;
  badgeVariant?: "default" | "warning" | "purple";
}
