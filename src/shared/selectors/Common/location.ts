import {Location} from 'history';

export function getRouterLocation(state: any, props: any): Location | null {
  return (state.routing && state.routing.location) ? state.routing.location : null;
}
