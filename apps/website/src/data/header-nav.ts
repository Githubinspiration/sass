import { NavLinkProps } from '@/components/nav-link'

const hideMobile = {
  // display: ['none', null, 'block'],
}

const headerNav: NavLinkProps[] = [
  { id: 'home', label: 'Home', display: 'none' },
  { id: 'features', label: 'Features', ...hideMobile },
  { href: '/pricing', label: 'Pricing', ...hideMobile },
  { href: '/docs/introduction', label: 'Documentation', ...hideMobile },
  {
    id: 'pricing',
    label: 'Buy Pro',
    variant: 'solid',
    colorScheme: 'primary',
  },
]

export default headerNav
