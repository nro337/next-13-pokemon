import Image from "next/image"
import Link from "next/link"
import { ArrowBigLeft } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BadgeType } from "@/types/badge"

async function getPokemon(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

async function getPokemonType(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${name}/`)
  if (!res.ok) {
    throw new Error("Failed to fetch type information")
  }
}

interface PageProps {
  params: {
    name: string
  }
}

interface PokemonType {slot:number, type: {name: BadgeType}}

export default async function Page(props: PageProps) {
  const [data] = await Promise.all([getPokemon(props.params.name)])
  console.log(data)
  let nameFirstLetter: string = data.species.name.charAt(0).toUpperCase()
  let remainingLetters: string = data.species.name.slice(1)
  let capitalName: string = nameFirstLetter + remainingLetters

  return (
    <div className="pb-8 pl-8 pt-6 md:py-10">
      <div className="flex justify-start gap-4">
        <Link href={`/`} className={buttonVariants({ variant: "outline" })}>
          <ArrowBigLeft />
          Back
        </Link>
      </div>
      <div className="mt-4 flex flex-col place-items-center items-center justify-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {capitalName}
        </h3>
        <Image
          src={data.sprites.front_default}
          alt="Pokemon"
          width={200}
          height={200}
        />
        {data.types.map((type: PokemonType) => (
          <>
            {type.type.name === 'normal' && <Badge className="bg-gray-400">Normal</Badge>}
            {type.type.name === 'ice' && <Badge className="bg-blue-200">Ice</Badge>}
            {type.type.name === 'water' && <Badge className="bg-blue-600 text-white">Water</Badge>}
            {type.type.name === 'fire' && <Badge className="bg-red-600">Fire</Badge>}
            {type.type.name === 'flying' && <Badge className="bg-stone-300">Flying</Badge>}
          </>
          // <Badge>{type.type.name === "normal" ? 'Normal' : 'aaa'}</Badge>
          // <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          //   {type.type.name}
          // </h4>
        ))}
      </div>
    </div>
  )
}
