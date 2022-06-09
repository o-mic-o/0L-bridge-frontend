import BridgeContainer from './BridgeContainer.svelte';
import FaqContainer from './FaqContainer.svelte';
import ExplorerContainer from './ExplorerContainer.svelte';
import DiscordContainer from './DiscordContainer.svelte';

import NotFoundError from './NotFoundError.svelte';

const routes = [
  { name: '/', redirectTo: "/bridge" },
  { name: 'faq', component: FaqContainer },
  { name: 'explorer', component: ExplorerContainer },
  { name: 'discord', component: DiscordContainer },
  { name: 'bridge', component: BridgeContainer,
    nestedRoutes: [
      { name: 'tokens' },
      { name: 'nfts' },
      { name: 'redeems' }
    ]
  },
  {
    name: '404',
    path: '404',
    component: NotFoundError
  }
]

export { routes }