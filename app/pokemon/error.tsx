'use client'

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const error = ({error, reset}:{error: Error, reset: () => void}) => {
  return (
    <div>
      <h1>Error</h1>
      <button onClick={reset} className={buttonVariants({ variant: "outline" })}>Try again</button>
      <Link
          href={`/`}
          className={buttonVariants({ variant: "outline" })}
        >
          Back
        </Link>
    </div>
  )
}

export default error;