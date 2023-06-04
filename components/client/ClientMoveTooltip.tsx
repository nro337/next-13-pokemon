"use client"

import { useEffect, useMemo, useState } from "react";

import { PuffLoader } from "react-spinners";

interface Move {}

const ClientMoveTooltip = ({url}:{url:string}) => {
 const [list, setList] = useState<any>();
 const [loading, setLoading] = useState<boolean>(false);
 useEffect(()=>{
    setLoading(true)
    fetch(url)
    .then(response => response.json())
    .then(data => setList(data))
    .finally(() => setLoading(false));
 }, [url]);

  return (
    <div>
      {loading && <PuffLoader color="blue" size={20} loading={true} />}
      {list && <div className="w-[400px]">
        <p>ID: {list.id}</p>
        <p>PP: {list.pp}</p>
        {list.accuracy && <p>Accuracy: {list.accuracy}</p>}
        <p>Type: {list.type.name.charAt(0).toUpperCase() + list.type.name.slice(1)}</p>
        <p>{list.effect_entries[0].effect}</p>
        </div>
      }
    </div>
  )
}

export default ClientMoveTooltip;