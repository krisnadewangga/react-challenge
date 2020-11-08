import { Link } from 'react-router-dom'
import './CustomNavigation.css'

const Navigation = (props) => {
    return (
        <div className="div-navigation-center">
            {props.place === 'data-table' ?
                <Link to='/data-visual/?page=1'>Data Visual</Link> :
                <Link to='/data-table/?page=1'>Data Table</Link> 
            }
        </div>
    )
}

export default Navigation