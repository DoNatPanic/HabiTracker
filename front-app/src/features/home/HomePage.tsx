import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <div className='content-wrap'>
            {userStore.isLoggedIn ? (
                <>
                    <h2>Welcome to Habi2be service</h2>
                    <a href='/notes'>
                        <button className="button-main">Go to Notes</button>
                    </a>
                </>
            ) : (
                <h2>Please, log in or register</h2>
            )}
        </div>
    )
})
