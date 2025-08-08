"use client";
import dynamic from "next/dynamic";

const UserCarsList = dynamic(
  () => import("./user-cars-list").then((mod) => mod.UserCarsList),
  { ssr: false }
);

export default function UserCarsListClientWrapper(props: any) {
  return <UserCarsList {...props} />;
}
