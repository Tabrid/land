import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Land from "../page/Land";

export const router = createBrowserRouter([{
    path: "/",
    element: <Main />,
    children: [
        {
            path: "/dakhil/:id",
            element: <Land></Land>
        },
       ]
}])