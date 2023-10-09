import {
    createContext,
    FC,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {getUserByToken} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'
import {manageUserData} from "../../../../setup/redux/auth/slices";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {
    getUserByTokenOrVerify,
    userLogout
} from "../../../../setup/redux/auth/actions";
import {RootState} from "../../../../setup";
import {useAppDispatch} from "../../../Hooks";

type AuthContextProps = {
    auth: any
    saveAuth: (auth: any | undefined) => void
    logout: () => void
}

const initAuthContextPropsState = {
    auth: '',
    saveAuth: () => {
    },
    logout: () => {
    },
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
    const {authUser}: any = useSelector<RootState>(
        (state) => ({
            authUser: state.auth.user
        }),
        shallowEqual,
    )
    const [auth, setAuth] = useState<any | undefined>(authUser)
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const saveAuth = (auth: any | undefined) => {
        setAuth(auth)
        if (auth) {
            try {
                dispatch(manageUserData(auth))
            } catch (error) {
                console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
            }
        } else {
            try {
                dispatch(userLogout())
            } catch (error) {
                console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
            }
        }
    }

    const logout = () => {
        saveAuth(undefined)
    }

    return (
        <AuthContext.Provider
            value={{auth, saveAuth, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthInit: FC<WithChildren> = ({children}) => {
    const {auth, logout} = useAuth()
    const didRequest = useRef(false);
    const dispatch = useAppDispatch();
    const [showSplashScreen, setShowSplashScreen] = useState(true)
    // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
    useEffect(() => {
        const requestUser = async (apiToken: string) => {
            try {
                if (!didRequest.current) {
                    await dispatch(getUserByTokenOrVerify({api_token: apiToken}))
                }
            } catch (error) {
                console.error(error)
                if (!didRequest.current) {
                    logout()
                }
            } finally {
                setShowSplashScreen(false)
            }

            return () => (didRequest.current = true)
        }

        if (auth && auth.api_token) {
            requestUser(auth.api_token)
        } else {
            logout()
            setShowSplashScreen(false)
        }
        // eslint-disable-next-line
    }, [])

    return showSplashScreen ? <LayoutSplashScreen/> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
