import Auth from "./page/Auth"
import GroupPage from "./page/GroupPage"
import Groups from "./page/Groups"
import Playlist from "./page/Playlist"
import Admin from "./page/Admin"
import { ADMIN_ROUTE, GROUPS_ROUTE, GROUP_ROUTE, LOGIN_ROUTE, PLAYLIST_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: PLAYLIST_ROUTE,
        Component: Playlist
    }
]

export const publicRoutes = [
    {
        path: GROUPS_ROUTE,
        Component: Groups
    },
    {
        path: GROUP_ROUTE + '/:id',
        Component: GroupPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]