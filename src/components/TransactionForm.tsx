import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
    const { categories } = useLoaderData() as IResponseTransactionLoader
    const [visibleModal, setVisibleModal] = useState(false)

    return (
        <div className='rounded-md bg-slate-800 p-4'>
            <Form className='grid gap-2' method='post' action='/transactions'>
                <label className="grid" htmlFor="title">
                    <span>Title</span>
                    <input type="text" className='input border-slate-700' placeholder='Title' name='title' required />
                </label>
                <label className="grid" htmlFor="amount">
                    <span>Amount</span>
                    <input type="number" className='input border-slate-700' placeholder='Amount' name='amount' required />
                </label>

                {categories.length ? (
                    <label htmlFor="category" className='grid'>
                        <span>Category</span>
                        <select name="category" required className='input border-slate-700'>
                            {categories.map(category => (<option key={category.id} value={category.id} className='bg-slate-600'>{category.title}</option>))}
                        </select>
                    </label>
                ) : (
                    <h1 className='mt-1 text-red-300'>To continue create category first</h1>
                )
                }

                <button className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white" onClick={() => setVisibleModal(true)}>
                    <FaPlus />
                    <span>Manage categories</span>
                </button>

                <div className="flex gap-4 items-center">
                    <label htmlFor="" className='flex cursor-pointer items-center gap-2'>
                        <input type="radio" name="type" value={'income'} className='text-blue-600 form-radio' />
                        <span>Income</span>
                    </label>
                    <label htmlFor="" className='flex cursor-pointer items-center gap-2'>
                        <input type="radio" name="type" value={'expense'} className='text-blue-600 form-radio' />
                        <span>Expense</span>
                    </label>
                </div>

                <button className='btn btn-green max-w-fit mt-2'>Submit</button>
            </Form>

            {visibleModal && (<CategoryModal type={'post'} setVisibleModal={setVisibleModal} />)}
        </div>
    )
}

export default TransactionForm