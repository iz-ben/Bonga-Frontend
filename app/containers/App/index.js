/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

import About from 'containers/About/Loadable';
import Share from 'containers/Share/Loadable';
import Story from 'containers/Story/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Register from 'containers/Register/Loadable';
import Partners from 'containers/Partners/Loadable';
import Header from 'components/Header/Loadable';
import Footer from 'components/Footer';
import { initAnalytics } from 'utils/analyticsUtil';

//
class App extends React.Component {
  componentDidMount() {
    initAnalytics();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/share" component={Share} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/partners" component={Partners} />
          <Route exact path="/tag/:tag" component={Share} />
          <Route exact path="/thread/:id" component={Story} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
