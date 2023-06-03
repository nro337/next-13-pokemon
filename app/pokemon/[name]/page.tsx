import Image from "next/image"
import Link from "next/link"
import { ArrowBigLeft } from "lucide-react"

import { BadgeType } from "@/types/badge"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

interface PokemonType {
  slot: number
  type: { name: BadgeType }
}

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
          &nbsp; Back
        </Link>
      </div>
      <div className="mt-4 flex flex-col place-items-center items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{capitalName}</CardTitle>
            <CardDescription>ID: {data.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={data.sprites.front_default}
              alt="Pokemon"
              width={200}
              height={200}
            />
          </CardContent>
          <CardFooter>
            <div className="flex flex-row">
              {data.types.map((type: PokemonType) => (
                <div className="p-2">
                  {type.type.name === "normal" && (
                    <Badge className="" style={{ backgroundColor: "#A8A77A" }}>
                      Normal
                    </Badge>
                  )}
                  {type.type.name === "ice" && (
                    <Badge className="" style={{ backgroundColor: "#96D9D6" }}>
                      Ice
                    </Badge>
                  )}
                  {type.type.name === "water" && (
                    <Badge className="" style={{ backgroundColor: "#96D9D6" }}>
                      Water
                    </Badge>
                  )}
                  {type.type.name === "fire" && (
                    <Badge className="" style={{ backgroundColor: "#EE8130" }}>
                      Fire
                    </Badge>
                  )}
                  {type.type.name === "flying" && (
                    <Badge className="" style={{ backgroundColor: "#A98FF3" }}>
                      Flying
                    </Badge>
                  )}
                  {type.type.name === "dragon" && (
                    <Badge
                      className=" text-white"
                      style={{ backgroundColor: "#6F35FC" }}
                    >
                      Dragon
                    </Badge>
                  )}
                  {type.type.name === "electric" && (
                    <Badge className="" style={{ backgroundColor: "#F7D02C" }}>
                      Electric
                    </Badge>
                  )}
                  {type.type.name === "bug" && (
                    <Badge className="" style={{ backgroundColor: "#A6B91A" }}>
                      Bug
                    </Badge>
                  )}
                  {type.type.name === "psychic" && (
                    <Badge className="" style={{ backgroundColor: "#F95587" }}>
                      Psychic
                    </Badge>
                  )}
                  {type.type.name === "fighting" && (
                    <Badge
                      className="text-white"
                      style={{ backgroundColor: "#C22E28" }}
                    >
                      Fighting
                    </Badge>
                  )}
                  {type.type.name === "ghost" && (
                    <Badge
                      className="text-white"
                      style={{ backgroundColor: "#735797" }}
                    >
                      Ghost
                    </Badge>
                  )}
                  {type.type.name === "dark" && (
                    <Badge
                      className="text-white"
                      style={{ backgroundColor: "#705746" }}
                    >
                      Dark
                    </Badge>
                  )}
                  {type.type.name === "fairy" && (
                    <Badge className="" style={{ backgroundColor: "#D685AD" }}>
                      Fairy
                    </Badge>
                  )}
                  {type.type.name === "poison" && (
                    <Badge
                      className="text-white"
                      style={{ backgroundColor: "#A33EA1" }}
                    >
                      Poison
                    </Badge>
                  )}
                  {type.type.name === "rock" && (
                    <Badge className="" style={{ backgroundColor: "#B6A136" }}>
                      Rock
                    </Badge>
                  )}
                  {type.type.name === "grass" && (
                    <Badge className="" style={{ backgroundColor: "#7AC74C" }}>
                      Grass
                    </Badge>
                  )}
                  {type.type.name === "ground" && (
                    <Badge className="" style={{ backgroundColor: "#E2BF65" }}>
                      Grass
                    </Badge>
                  )}
                  {type.type.name === "steel" && (
                    <Badge className="" style={{ backgroundColor: "#B7B7CE" }}>
                      Grass
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
