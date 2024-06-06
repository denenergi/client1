import React, { FC, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader, ITransaction } from '../types/types'
import { formateDate } from '../helpers/dateHelper'
import { formatToUSD } from '../helpers/currence.helper'
import { instance } from '../api/axios.api'
import ReactPaginate from 'react-paginate'

interface Props {
    limit: number
}

const TransactionTable: FC<Props> = ({ limit = 3 }) => {
    const { transactions } = useLoaderData() as IResponseTransactionLoader
    const [data, setData] = useState<ITransaction[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchTransactions = async (page: number) => {
        const response = await instance.get(`/transactions/pagination?page=${page}&limit=${limit}`)
        setData(response.data)
        setTotalPages(Math.ceil(transactions.length / limit))
    }

    const handleChangePage = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1)
    }

    useEffect(() => {
        fetchTransactions(currentPage)
    }, [currentPage, transactions])

    return <>
        <ReactPaginate
            className='flex gap-3 justify-end items-center'
            activeClassName='bg-blue-600 rounded-md'
            pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm'
            previousClassName='text-white text-xs py-1 px-2 rounded-sm bg-slate-800'
            nextClassName='text-white text-xs py-1 px-2 rounded-sm bg-slate-800'
            disabledClassName='text-white/50 cursor-not-allowed'
            disabledLinkClassName='text-slate-600 cursor-not-allowed'
            pageCount={totalPages}
            pageRangeDisplayed={1}
            marginPagesDisplayed={2}
            onPageChange={handleChangePage}
        />
        <div className='bg-slate-800 px-4 py-3 mt-4 rounded-md'>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="font-bold">№</td>
                        <td className="font-bold">Title</td>
                        <td className="font-bold">Amount</td>
                        <td className="font-bold">Category</td>
                        <td className="font-bold">Date</td>
                        <td className="font-bold text-right">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((transaction, i) => (
                        <tr key={transaction.id} className="font-bold">
                            <td>{i + 1}</td>
                            <td>{transaction.title}</td>
                            <td className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>{transaction.type === 'income' ? `+ ${formatToUSD.format(transaction.amount)}` : `- ${formatToUSD.format(transaction.amount)}`}</td>
                            <td>{transaction.category?.title ? transaction.category?.title : 'Other'}</td>
                            <td>{formateDate(transaction.createdAt)}</td>
                            <td>
                                <Form method='delete' action='/transactions'>
                                    <input type="hidden" name='id' value={transaction.id} />
                                    <button className='btn hover:btn-red ml-auto'>
                                        <FaTrash />
                                    </button>
                                </Form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

export default TransactionTable