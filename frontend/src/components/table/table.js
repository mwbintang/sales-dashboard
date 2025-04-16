import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Cell } from "./cell";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaEdit } from "react-icons/fa";
// import { currency } from "@/src/utils/currencyParse"; // assuming you need this

export const Table = ({
  headerItems,
  list,
  // onClickRow,
  isLoading = false,
  emptyMessage,
  emptyIcon,
  type,
}) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (productId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="border rounded-lg border-gray-300 overflow-hidden px-4 glass">
        <table className="w-full">
          <thead>
            <tr className="text-left text-nowrap text-davy-grey border-b border-gray-300 text-sm leading-[21px]">
              {headerItems.map((item, index) => (
                <th
                  key={item.key}
                  className={`font-medium py-4 px-4 ${item.headerClassName || ""}`}
                  style={{ width: item?.width ?? "auto" }}
                >
                  {item.title.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={headerItems.length} className="text-center p-8">
                  Loading...
                </td>
              </tr>
            ) : list?.length > 0 ? (
              list.map((data, index) => (
                <React.Fragment key={data.id}>
                  <tr
                    className="cursor-pointer border-b border-gray-300 hover:bg-black-four-percent"
                  // onClick={() => onClickRow?.(data.id)}
                  >
                    {headerItems.map((item, i) => (
                      <Cell key={i} width={item?.width}>
                        {item.renderActionComponent
                          ? item.renderActionComponent(data)
                          : data[item.key]}
                      </Cell>
                    ))}
                  </tr>


                  <tr>
                    <td colSpan={6} className="px-0">
                      <div
                        className="px-6 py-2 flex justify-between items-center bg-[#F5F5F5] cursor-pointer"
                        onClick={() => toggleRow(data.id)}
                      >
                        <span className="text-sm text-gray-500">Show Detail</span>
                        {expandedRows[data.id] ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </td>
                  </tr>

                  {expandedRows[data.id] && (
                    <tr>
                      <td colSpan={6} className="px-0 bg-[#F5F5F5]">
                        <div className="px-6 py-4 grid grid-cols-2 gap-4 text-sm text-gray-700">

                          {/* Clients Section */}
                          <div>
                            <h4 className="font-medium mb-2 text-gray-600">Clients</h4>
                            <div className="space-y-2">
                              {data.clients.map((client, index) => (
                                <div key={index} className="p-2 bg-white bg-opacity-60 rounded shadow-sm backdrop-blur-sm">
                                  <div><strong>Name:</strong> {client.name}</div>
                                  <div><strong>Industry:</strong> {client.industry}</div>
                                  <div><strong>Contact:</strong> {client.contact}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Deals Section */}
                          <div>
                            <h4 className="font-medium mb-2 text-gray-600">Deals</h4>
                            <div className="space-y-2">
                              {data.deals.map((deal, index) => (
                                <div key={index} className="p-2 bg-white bg-opacity-60 rounded shadow-sm backdrop-blur-sm">
                                  <div><strong>Client:</strong> {deal.client}</div>
                                  <div><strong>Status:</strong> {deal.status}</div>
                                  <div><strong>Value:</strong> {deal.value}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}


                </React.Fragment>
              ))
            ) : (
              <div className="h-[448px] flex flex-row justify-center items-center text-center space-y-4 space-x-4">
                <Image alt="empty" src="/svg/searchEmptyIcon.svg" width={120} height={120} />
                <div className="text-black text-xl font-semibold">{emptyMessage}</div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};