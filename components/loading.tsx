import React from "react";
import Image from "next/image";
import loadingImg from "@/public/loading.gif";
export default function Loading() {
  return (
    <div className="justify-center">
      <Image
        src={loadingImg}
        width={128}
        height={128}
        alt=""
        priority={false}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
