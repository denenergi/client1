import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper';
import { toast } from 'react-toastify';

const Header: FC = () => {
    const isAuth = useAuth();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('You logout!')
        navigate('/')
    }
    return (
        <header className='flex items-center bg-slate-800 p-4 shadow-sm backdrop-blur-sm'>
            <Link to='/'>
                <FaBtc size={20} />
            </Link>

            {
                isAuth && (
                    <nav className='mr-10 ml-auto'>
                        <ul className='flex items-center gap-5'>
                            <li>
                                <NavLink to={"/"} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/transactions"} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}>Transactions</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/categories"} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}>Categories</NavLink>
                            </li>
                        </ul>
                    </nav>
                )
            }
            {
                isAuth ? (
                    <button className="btn btn-red" onClick={logoutHandler}>
                        <span>Log out</span>
                        <FaSignOutAlt />
                    </button>
                ) : (
                    <Link className='py-2 text-white/50 hover:text-white ml-auto' to={'auth'}>Log in / Sign in</Link>
                )
            }
        </header>
    )
}

export default Header