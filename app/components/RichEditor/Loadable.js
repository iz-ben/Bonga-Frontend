/**
 *
 * Asynchronously loads the component for RichEditor
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
