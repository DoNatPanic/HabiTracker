import { observer } from 'mobx-react';
import { useStore } from '../stores/store';

export default observer(function Navigation() {
    const { userStore: { user, logout }, modalStore } = useStore();
    return (
        <nav role="navigation">
            <ul className='nav-ul'>
                <div className='nav-container'>
                    <li>
                        <a style={{padding:'5px 14px'}} href="/" >
                            <img src="/assets/images/logo1.png" className="logo-image img-fluid" />
                        </a>
                    </li>
                    {user !== null &&
                        <div>
                            <li><a href="/notes">Diary</a></li>
                            <li><a href="/createNote">Create Note</a></li>
                            <li style={{ float: 'right', padding: '5px 14px' }} >
                                    <img src={user?.image || '/assets/images/profile.png'} className="logo-image img-fluid" />
                                <ul>
                                    <li><a href={'/profile/' + user?.username}>{user?.displayName}</a></li>
                                    <li><a onClick={logout}>Log out</a></li>
                                </ul>
                            </li>
                        </div>
                    }
                    {user === null &&
                        <div>
                            <li style={{ float: 'right' }}><a href="/login">Login</a></li>
                            <li style={{ float: 'right' }}><a href="/register">Register</a></li>
                        </div>
                    }
                </div>
            </ul>
        </nav>
    );
})