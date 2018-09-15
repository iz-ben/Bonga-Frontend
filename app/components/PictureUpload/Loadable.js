/**
 *
 * Asynchronously loads the component for PictureUpload
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
