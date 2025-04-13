import { getDataSales } from "../../lib/services/sales"
import { useState, useEffect } from "react";
import { Table } from "../../components/table/table";

// import Home from "./table"

export default function Home({ users }) {
    console.log(users, 'dataaaaa')
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    // const handleAskQuestion = async () => {
    //   try {
    //     const response = await fetch("/api/ai", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ question }),
    //     });
    //     const data = await response.json();
    //     setAnswer(data.answer);
    //   } catch (error) {
    //     console.error("Error in AI request:", error);
    //   }
    // };
    const TABLE_HEADER = [
        {

            key: 'name',
            title: 'Name',

        },
        {
            key: 'role',
            title: 'Role',

        },
        {
            key: 'region',
            title: 'Region',

        },
        {
            key: 'skills',
            title: 'Skills',
            renderActionComponent: (data) => {
                return (
                    <div>
                        {data.skills.join(", ")}
                    </div>
                );
            }

        }
        // {
        //     key: 'created_at',
        //     title: 'Tanggal Dibuat',
        //     renderActionComponent: (data) => {
        //         const date = dayjs(data.created_at);
        //         return (
        //             <div>
        //                 {date.format("DD MMMM YYYY")}
        //             </div>
        //         );
        //     }
        // },
        // {
        //     key: 'order_date',
        //     title: 'Tanggal Order',
        //     renderActionComponent: (data) => {
        //         const date = dayjs(data.order_date);
        //         return (
        //             <div>
        //                 {date.format("DD MMMM YYYY")}
        //             </div>
        //         );
        //     }
        // },
        // {
        //     key: 'code',
        //     title: 'PO Number',
        // },
        // {
        //     key: 'principle_name',
        //     title: 'Nama Principle',
        // },
        // {
        //     key: 'total_sku',
        //     title: 'Total SKU',
        // },
        // {
        //     key: 'action',
        //     title: 'Action',
        //     renderActionComponent: (data) => (
        //         <div>
        //             <div className="flex items-center justify-center w-6 h-6 rounded bg-[#1D8ADB]" onClick={() => {
        //                 setIdSelected(data.id)
        //                 setOpenDialogAction(true)
        //             }}>
        //                 <IoMdCheckmark size={18} color="white" />
        //             </div>
        //         </div>
        //     )
        // }
    ]
    return (
        <div className="flex flex-col">
            <div className="text-2xl text-blue-600">Next.js + FastAPI Sample</div>

            <section style={{ marginBottom: "2rem" }}>
                <h2>Dummy Data</h2>
                {!users?.length ? (
                    <p>Loading...</p>
                ) : (
                    <Table
                        headerItems={TABLE_HEADER}
                        // isLoading={isLoadingFetchOutlet}
                        list={users}
                        // isDisplayCheckbox={activeTab == 'Menunggu Diproses'}
                        // checkbox={checkbox}
                        // pagination={{
                        //     limit: Number(limit),
                        //     page: Number(page),
                        //     totalCount: totalData,
                        //     handlePageChange: (newPage: number) => {
                        //         setPage(newPage)
                        //     },
                        //     handleLimitChange(newLimit) {
                        //         setLimit(newLimit)
                        //     },
                        // }}
                        // sendProps={handleClickPaginate}
                        // sendLimit={handleClickRows}
                        // onClickRow={(id: number) => router.push(`/purchase-order/${id}`)}
                        emptyMessage={`Purchase order tidak ditemukan`}
                        checkboxColor="blue"
                    />
                    // <ul>
                    //     {data.map((user) => (
                    //         <li key={user.id}>
                    //             {user.name} - {user.role}
                    //         </li>
                    //     ))}
                    // </ul>
                )}
            </section>

            {/* <section>
                <h2>Ask a Question (AI Endpoint)</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Enter your question..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    /> */}
            {/* <button onClick={handleAskQuestion}>Ask</button> */}
            {/* </div>
                {answer && (
                    <div style={{ marginTop: "1rem" }}>
                        <strong>AI Response:</strong> {answer}
                    </div>
                )}
            </section> */}
        </div>
    );
}

export async function getServerSideProps() {
    const users = await getDataSales()
    console.log(users.salesReps, '<<<')

    return { props: { users: users.salesReps } }
}
