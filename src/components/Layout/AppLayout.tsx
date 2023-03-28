import NavigationBar from "../NavigationBar";
import {FC, ReactNode} from "react";

type Props = {
    children: ReactNode
}

const AppLayout: FC<Props> = ({children}) => {



    return (
        <div>
            <NavigationBar/>
            {children}
        </div>
    )
}

export default AppLayout