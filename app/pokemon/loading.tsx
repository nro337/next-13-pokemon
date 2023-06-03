'use client'
import { PuffLoader } from "react-spinners";


export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <div className="flex h-screen w-screen place-items-center items-center justify-center">
    <PuffLoader color="blue" size={70} loading={true} />
  </div>;
}