import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { Await, NavLink, useAsyncValue } from '@remix-run/react';
import styles from './Header.module.scss'
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import { useAside } from '../Aside';
import CartButton from './CartButton';
import Logo from '../Logo';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}
type Viewport = 'desktop' | 'mobile';

export default function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const { shop, menu } = header;
  const { close } = useAside();
  return (
    <header className={styles.header}>
      <LeftMenu />
      <NavLink
        className={styles.headerMenuItem}
        end
        onClick={close}
        prefetch="intent"
        style={activeLinkStyle}
        to={"/"}
      >
        <Logo />
      </NavLink>
      <RightMenu cart={cart} />
      {/* <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} /> */}
    </header>
  );
}

function RightMenu({ cart }: Pick<HeaderProps, 'cart'>) {
  const { close } = useAside();
  return (
    <nav className={`${styles.headerMenu} ${styles.menuRight}`}>
      <NavLink
        className={styles.headerMenuItem}
        end
        onClick={close}
        prefetch="intent"
        style={activeLinkStyle}
        to={"/journal"}
      >
        Journal
      </NavLink>

      <NavLink
        className={styles.headerMenuItem}
        end
        onClick={close}
        prefetch="intent"
        style={activeLinkStyle}
        to={"/about"}
      >
        About
      </NavLink>

      <CartButton cart={cart} />
    </nav>
  )
}


function LeftMenu() {
  const { open, close } = useAside();
  return (
    <nav className={`${styles.headerMenu} ${styles.menuLeft}`}>
      <NavLink
        className={styles.headerMenuItem}
        end
        onClick={close}
        prefetch="intent"
        style={activeLinkStyle}
        to={"/products"}
      >
        Shop
      </NavLink>
      <button className="reset" onClick={() => open('search')}>
        Search
      </button>
    </nav>
  )
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isActive ? 'black' : 'var(--color-grey)',
  };
}
