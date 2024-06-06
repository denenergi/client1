import { FC } from "react"
import { useAuth } from "../hooks/useAuth"

interface Props {
    children: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
    const isAuth = useAuth()
    return <>
        {isAuth ? (
            children

        ) : (
            <div className="mt-20 flex flex-col items-center justify-center gap-10">
                <h1 className="text-2xl">To view this page you must be logged in.</h1>
            </div>
        )}
    </>
}