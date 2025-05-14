import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { Await, NavLink, useAsyncValue } from '@remix-run/react';
import styles from './Header.module.scss'
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import { useAside } from '../Aside/Aside';
import CartButton from './CartButton';
import Logo from '../Logo';
import BrandedLink from '../BrandedLink/BrandedLink';
import { useState } from 'react';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}
type Viewport = 'desktop' | 'mobile';


function MobileHeader({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const { shop, menu } = header;
  const { close } = useAside();


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className={styles.mobileHeader}>

      <div className={styles.navController}>
        <NavLink
          className={styles.headerMenuItem}
          end
          onClick={close}
          prefetch="intent"
          to={"/"}
        >
          <Logo />
        </NavLink>

        <div className={styles.headerMenuItem} onClick={() => setIsMenuOpen(prev => !prev)}><BrandedLink text="menu" isActive={isMenuOpen} /></div>
      </div>

      <div className={`${styles.navWrapper} ${isMenuOpen ? styles.isOpen : ""} `}>

        <LeftMenu closeMenu={() => setIsMenuOpen(false)} />

        <RightMenu cart={cart} closeMenu={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}

export default function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const { shop, menu } = header;
  const { close } = useAside();
  return (

    <>
      <MobileHeader header={header} isLoggedIn={isLoggedIn} cart={cart} publicStoreDomain={publicStoreDomain} />
      <header className={styles.header}>
        <LeftMenu />
        <NavLink
          className={styles.headerMenuItem}
          end
          onClick={close}
          prefetch="intent"
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
    </>
  );
}

function RightMenu({ cart, closeMenu }: Pick<HeaderProps, 'cart'> & { closeMenu?: () => void }) {
  const { close } = useAside();
  return (
    <nav className={`${styles.headerMenu} ${styles.menuRight}`}>
      <NavLink
        className={styles.headerMenuItem}
        end
        onClick={() => {
          close();
          closeMenu && closeMenu()
        }}
        prefetch="intent"
        to={"/journal"}
      >
        {({ isActive }) => (

          <BrandedLink text="Journal" isActive={isActive} />
        )}
      </NavLink>

      <NavLink
        className={styles.headerMenuItem}
        end
        onClick={() => {
          close();
          closeMenu && closeMenu()
        }}
        prefetch="intent"
        to={"/about"}
      >

        {({ isActive }) => (

          <BrandedLink text="About" isActive={isActive} />
        )}

      </NavLink>

      <CartButton cart={cart} />
    </nav>
  )
}


function LeftMenu({ closeMenu }: { closeMenu?: () => void }) {
  const { open, close } = useAside();
  return (
    <nav className={`${styles.headerMenu} ${styles.menuLeft}`}>
      <NavLink
        className={styles.headerMenuItem}
        end
        onClick={() => {
          close();

          closeMenu && closeMenu()
        }}
        prefetch="intent"
        to={"/products"}
      >
        {({ isActive, isPending }) => (

          <BrandedLink text="Shop" isActive={isActive} />
        )}

      </NavLink>
      <button className="reset" onClick={() => {
        open('search');

        closeMenu && closeMenu()
      }}>
        <BrandedLink text="Search" />
      </button>
    </nav>
  )
}
