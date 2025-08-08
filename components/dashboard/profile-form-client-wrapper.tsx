"use client";
import dynamic from "next/dynamic";


const ProfileForm = dynamic(
  () => import("./profile-form").then((mod) => mod.ProfileForm),
  { ssr: false }
);

export default function ProfileFormClientWrapper(props: any) {
  return <ProfileForm {...props} />;
}
