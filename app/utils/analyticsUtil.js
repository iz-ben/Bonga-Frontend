import ReactGA from 'react-ga';

/**
 * TODO: Move trackingId details to ENV
 * @type {{trackingId: string, debug: boolean, gaOptions: {cookieDomain: string}}}
 */
const ANALYTICS_CONFIG = {
  trackingId: 'UA-124568679-1',
  debug: process.env.NODE_ENV !== 'production',
  gaOptions: {
    cookieDomain: 'auto'
  }
};

export const initAnalytics = ()=>{
  ReactGA.initialize(ANALYTICS_CONFIG);
};
/**
 * TODO: Move this to higher order component
 */
export const trackView = ( location )=>{
  //console.log(location)
  try{
    const {pathname} = location;
    ReactGA.pageview(pathname);
  }catch (e) {
    console.log(e.message);
  }
};
