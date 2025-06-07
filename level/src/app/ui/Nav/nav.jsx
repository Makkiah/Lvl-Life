import './nav.scss';
import Link from 'next/link';


let Navi = [
    {name: 'Home', link: '/'},
    {name: 'Dashboard', link: '/dashboard'},
    {name: 'Workouts', link: '/dashboard/workouts'},
    {name: 'Habits', link: '/dashboard/habits'},
    {name: 'Goals', link: '/dashboard/goals'},
]

const nav = () => {
  return (
    <div className='nav-wrapper'>
        <div className='nav-top'>
            <div className="nav-pic"></div>
        </div>
        <div className='nav-bottom'>
            {Navi.map((nav, index) => (
                <Link className='nav-link' href={nav.link} key={index}>{nav.name}</Link>
            ))}
            
        </div>
    </div>
  )
}

export default nav;