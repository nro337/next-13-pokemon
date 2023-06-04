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
      {list && <div>
        <p>ID: {list.id}</p>
        <p>PP: {list.pp}</p>
        </div>
      }
      {/* {!list && <div>No data :/</div>} */}
    </div>
  )
}

export default ClientMoveTooltip;