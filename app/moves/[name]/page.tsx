import Image from "next/image"
import Link from "next/link"
import { ArrowBigLeft } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

async function getMove(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/move/${name}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

interface PageProps {
  params: {
    name: string
  }
}

export default async function Page(props: PageProps) {
  const [data] = await Promise.all([getMove(props.params.name)])

  return (
    <div className="pb-8 pl-8 pt-6 md:py-10">
      <div className="flex justify-start gap-4">
        <Link href={`/`} className={buttonVariants({ variant: "outline" })}>
          <ArrowBigLeft />
          &nbsp; Back
        </Link>
      </div>
      <div className="mt-4 flex flex-col place-items-center items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</CardTitle>
            <CardDescription>ID: {data.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
            <div className="flex flex-row place-content-between">
                <label>Type</label>
                <p>{data.type.name.charAt(0).toUpperCase() + data.type.name.slice(1)}</p>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-row place-content-between">
                <label>Generation</label>
                <p>{data.generation.name.charAt(0).toUpperCase() + data.generation.name.slice(1)}</p>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-row place-content-between">
                <label>Accuracy</label>
                <p>{data.accuracy ? data.accuracy : 0}</p>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-row place-content-between">
                <label>PP</label>
                <p>{data.pp ? data.pp : 0}</p>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-row place-content-between">
                <label>Power</label>
                <p>{data.power ? data.power : 0}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  )
}
