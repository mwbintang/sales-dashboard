import React from "react";

export const Cell = ({
  children,
  width,
  onClick
}) => {
  return (
    <td
      className="text-sm leading-[21px] py-[21.5px] px-4 text-black-olive"
      style={{
        width: width,
      }}
      onClick={onClick}
    >
      {children || "-"}
    </td>
  )
}
