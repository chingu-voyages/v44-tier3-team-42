/* eslint-disable react/function-component-definition */

'use client';

import { Hydrate as RQHydrate, HydrateProps } from '@tanstack/react-query';

function Hydrate(props: HydrateProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <RQHydrate {...props} />;
}

export default Hydrate;
