import React, { useEffect } from 'react';
import Navigation from './Navigation';
import HomePage from '../../features/home/HomePage';
import MainDashboard from '../../features/dashboard/MainDashboard';
import { observer } from 'mobx-react';
import { Route, useLocation } from 'react-router-dom';
import NoteDetailsForm from '../../features/details/NoteDetailsForm';
import LoginForm from '../../features/users/LoginForm';
import RegisterForm from '../../features/users/RegisterForm';
import { useStore } from '../../app/stores/store';
import LoadingComponent from './LoadingComponent';
import Footer from './Footer';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent />

  return (
    <>
      <Navigation />
      <Route
        path={'(.+)'}
        render={() => (
          <>
            <div className='page-container' >
              <Route exact path='/' component={HomePage} />
              <Route exact path='/notes' component={MainDashboard} />
              <Route key={location.key} path={['/createNote', '/notes/:id']} component={NoteDetailsForm} />
              <Route path='/login' component={LoginForm} />
              <Route path='/register' component={RegisterForm} />
            </div>
          </>
        )} />
        <Footer />
    </>
  );
}

export default observer(App);
