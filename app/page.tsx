'use client'

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
  params: {},
  searchParams: {}
}

export default function IndexPage(props:Props) {

  const router = useRouter()

  const [searchText, setSearchText] = useState<string>("")

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Input type="search" placeholder="Search a pokemon" onChange={(e) => setSearchText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && router.push(`/pokemon/${searchText}`)} />
      <div className="flex gap-4">
        <Link
          href={`/pokemon/${searchText}`}
          className={buttonVariants({ variant: "outline" })}
        >
          Search
        </Link>
      </div>
    </section>
  )
}
