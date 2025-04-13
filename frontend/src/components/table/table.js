import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Cell } from "./cell";
import { Pagination } from "./pagination";
// import Checkbox from "../checkbox/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaEdit } from "react-icons/fa";
// import { currency } from "@/src/utils/currencyParse";

export const Table = ({
  headerItems,
  list,
  pagination,
  sendProps,
  sendLimit,
  isDisplayCheckbox = false,
  checkbox,
  onClickRow = undefined,
  actionCheckboxButton,
  emptyMessage,
  type,
  emptyMessageSubtitle,
  isLoading = false,
  emptyIcon,
  checkboxColor,
  isPromo = false,
  customFunction = null
}) => {
  const [totalCheckData, setTotalCheckData] = useState(0)
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (productId) => {
    setExpandedRows(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleDate = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return "-"
    }

    const formatedStartDate = startDate.split("-").reverse().join("/")
    const formatedEndDate = endDate.split("-").reverse().join("/")

    return `${formatedStartDate} - ${formatedEndDate}`
  }

  const calculatePromo = (unit) => {
    let res
    if (unit.promo_percentage) {
      res = unit.price - (unit.price * (unit.promo_percentage / 100))
      return currency(res)
    } else if (unit.promo_amount) {
      res = unit.price - unit.promo_amount
      return currency(res)
    } else {
      return currency(unit.price)
    }
  }

  const promoHandler = (unit) => {
    const now = new Date();

    if (!unit.promo_name) {
      return <div>
        -
      </div>
    } else if (new Date(unit.promo_end_date) < now) {
      return <button className="bg-[#FBECEB] text-[#D84639] rounded-full">
        Expired
      </button>
    } else if (new Date(unit.promo_start_date) > now) {
      return <button className="bg-[#EAF1FF] text-[#3267E3] rounded-full">
        Scheduled
      </button>
    } else {
      return <button className="bg-[#E8F6F0] text-[#1BAA69] rounded-full">
        Active
      </button>
    }
  }

  const handleLimitChange = (newLimit) => {
    sendLimit(newLimit)
  }
  const createEmptyIcon = () => {
    return (<Image
      alt='not-found-illustrate'
      src={type === 'finance' ? '/empty-file.png' : type === 'outbound' ? '/find-outbound.png' : type === 'product' ? '/searchEmptyIcon.svg' : '/search-red.png'}
      width={type === 'finance' ? 370 : type === 'outbound' ? 100 : 160}
      height={type === 'finance' ? 370 : type === 'outbound' ? 100 : 167.29}
    />)
  }
  useEffect(() => {
    if (isDisplayCheckbox && setTotalCheckData) {
      setTotalCheckData(list?.filter(item => !!item.selected).length)
    }
  }, [isDisplayCheckbox, setTotalCheckData, list])

  return (
    <div className="flex flex-col gap-y-6">
      <div className="border rounded-lg border-neutral-20">
        <table className="w-full">
          <thead>
            <tr className="text-left text-nowrap text-davy-grey bg-neutral-20 text-sm leading-[21px]">
              {/* {isDisplayCheckbox && checkbox && list?.length > 0 ? (
                <th className="w-8">
                  <Checkbox
                    ref={checkbox.selectAllCheckbox}
                    checked={checkbox.isAllRowsSelected}
                    onChange={checkbox.onSelectAllRows}
                    className="ml-2 mt-1"
                    disabled={checkbox.disabled}
                    color={checkboxColor}
                  />
                </th>
              ) : null} */}
              {headerItems.map((item, index) => (
                <th
                  key={item.key}
                  className={`
                    font-medium py-[16.5px] px-4
                    ${item.headerClassName}
                    ${index === 0 ? 'rounded-tl-lg' : ''}
                    ${index === headerItems.length - 1} ? 'rounded-tr-lg' : ''
                  `}
                  style={{
                    width: item?.width ?? 'auto',
                  }}
                >
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          {isLoading ? <tbody>
            <tr>
              <td> </td>
              <td> </td>
              <td rowSpan={headerItems.length} className="text-black item-center p-8">
                Loading.....
              </td>
            </tr>
          </tbody> : <tbody>

            {list?.length > 0 ?
              list?.map((data, index) => (
                <>
                  <tr
                    key={data.id}
                    className={`${index - 1 !== list?.length ? 'border-b' : ''} bg-white cursor-pointer border-neutral-20 hover:bg-black-four-percent`}
                  >
                    {/* {isDisplayCheckbox && checkbox ? (
                      <th className="w-8">
                        <Checkbox
                          checked={data.selected}
                          onChange={() => checkbox.onSelectRow(data.id)}
                          disabled={checkbox.disabled}
                          className="ml-2 mt-1"
                          color={checkboxColor}
                        />
                      </th>
                    ) : null} */}
                    {headerItems.map((item, index) => {
                      if (item?.renderActionComponent) {
                        return (
                          <Cell
                            width={item?.width}
                            key={index}
                          >
                            {item?.renderActionComponent(data)}
                          </Cell>
                        )
                      } else {
                        return (
                          <Cell
                            width={item?.width}
                            onClick={() => onClickRow && onClickRow(data.id)}
                            key={index}
                            isPromo={isPromo}
                          >
                            {data[item.key]}
                          </Cell>
                        )
                      }
                    })}
                  </tr>
                  {isPromo && (
                    <>
                      <tr>
                        <td colSpan={6} className="px-0">
                          <div
                            className="px-6 py-2 flex justify-between items-center cursor-pointer bg-[#F5F5F5]"
                            onClick={() => toggleRow(data.id)}
                          >
                            <span className="text-sm text-gray-500">Detail UOM</span>
                            {expandedRows[data.id] ? (
                              <ChevronUp className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                        </td>
                      </tr>
                      {expandedRows[data.id] &&
                        data.product_unit?.map((unit, index) => (
                          <tr key={`${data.id}-${index}`} className="bg-[#F5F5F5]">
                            <td className="px-6 py-3 text-sm font-bold w-1/6">
                              {unit.unit_name || "Pcs"}
                            </td>
                            <td className="px-6 py-3 w-1/6"></td>
                            <td className="px-6 py-3 w-1/6">
                              <div className="text-sm">{calculatePromo(unit)}</div>
                              {+unit?.buy_price ? (
                                <div className="text-xs text-gray-400 line-through">
                                  {currency(+unit?.price)}
                                </div>
                              ) : null}
                            </td>
                            <td className="px-6 py-3 text-sm w-1/6">
                              {handleDate(unit?.promo_start_date, unit?.promo_end_date)}
                            </td>
                            <td className="px-6 py-3 w-1/6">
                              <span
                                className={`px-3 py-1 rounded-full text-xs ${unit.status === "Scheduled"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-green-100 text-green-600"
                                  }`}
                              >
                                {promoHandler(unit)}
                              </span>
                            </td>
                            <td className="px-6 py-3 w-1/6">
                              <FaEdit
                                onClick={() => customFunction(data?.id)}
                                size={18}
                                className="cursor-pointer"
                              />
                            </td>
                          </tr>
                        ))}
                    </>
                  )}

                </>
              )) : null
            }
          </tbody>}
        </table>

        {pagination?.totalCount === 0 && !isLoading ? (
          <div className="h-[448px] flex justify-center items-center flex-col text-center">
            {emptyIcon ? emptyIcon() : createEmptyIcon()}
            <div className="mt-8 text-black text-lg font-medium">{emptyMessage}</div>
            <div className="mt-2 text-black-seven-percent text-sm">{emptyMessageSubtitle}</div>
          </div>
        ) : null}
      </div>
      {isDisplayCheckbox && list?.length > 0 ? (
        <div className="flex justify-between">
          <div className="text-sm text-black-olive font-medium">{totalCheckData} Data Dipilih</div>
          <div>
            {actionCheckboxButton ? actionCheckboxButton() : null}
          </div>
        </div>
      ) : null}
      {pagination?.totalCount > 0 ? (
        <Pagination
          limit={pagination.limit}
          page={pagination.page}
          totalCount={pagination.totalCount}
          handlePageChange={sendProps}
          handleLimitChange={handleLimitChange}
        />
      ) : null}
    </div>
  )
}
