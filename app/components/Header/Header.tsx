import type { HeaderQuery, CartApiQueryFragment, StoresQueryQuery } from 'storefrontapi.generated';
import { Await, Link, NavLink, useAsyncValue } from 'react-router';
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
import { useEffect, useState } from 'react';
import useScrollPosition from '~/hooks/useScrollPosition';
import Marquee from '../Marquee/Marquee';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  isHome?: boolean;
  hasMarquee?: boolean;
  stores?: StoresQueryQuery
}
type Viewport = 'desktop' | 'mobile';


function MobileHeader({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
  hasMarquee
}: HeaderProps) {
  const { shop, menu } = header;
  const { close } = useAside();


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.mobileHeader}>

      <div className={`${styles.navController} ${hasMarquee ? styles.withMarquee : ""}`}>
        <NavLink
          className={`${styles.headerMenuItem} ${styles.mobileLogo}`}
          end
          onClick={close}
          prefetch="intent"
          to={"/"}
        >
          <Logo fill="#000" />
        </NavLink>

        <div className={styles.headerMenuItem} onClick={() => {

          console.log("CLICK")
          setIsMenuOpen(prev => !prev)
        }}><BrandedLink text="menu" isActive={isMenuOpen} /></div>
      </div>

      <div className={`${styles.navWrapper} ${isMenuOpen ? styles.isOpen : ""} `}>
        <div>
          <NavLink
            className={styles.headerMenuItem}
            end
            onClick={() => {
              close();

              setIsMenuOpen(false)
            }}
            prefetch="intent"
            to={"/products"}
          >
            {({ isActive, isPending }) => (

              <BrandedLink text="Sunglasses" isActive={isActive} />
            )}

          </NavLink>

          <NavLink
            className={styles.headerMenuItem}
            end
            onClick={() => {
              close();

              setIsMenuOpen(false)
            }}
            prefetch="intent"
            to={"/products"}
          >
            {({ isActive, isPending }) => (

              <BrandedLink text="Collections" isActive={isActive} />
            )}

          </NavLink>

          <NavLink
            className={styles.headerMenuItem}
            end
            onClick={() => {
              close(); setIsMenuOpen(false)
            }}
            prefetch="intent"
            to={"/about"}
          >

            {({ isActive }) => (

              <BrandedLink text="About" isActive={isActive} />
            )}

          </NavLink>

          <NavLink
            className={styles.headerMenuItem}
            end
            onClick={() => {
              close(); setIsMenuOpen(false)
            }}
            prefetch="intent"
            to={"/stores"}
          >

            {({ isActive }) => (

              <BrandedLink text="Stores" isActive={isActive} />
            )}

          </NavLink>

          <NavLink
            className={styles.headerMenuItem}
            end
            onClick={() => {
              close(); setIsMenuOpen(false)
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
              setIsMenuOpen(false)
            }}
            prefetch="intent"
            to={"https://account.null-space.eu"}
          >
            {({ isActive }) => (

              <BrandedLink text="Account" isActive={isActive} />
            )}
          </NavLink>

          <CartButton cart={cart} /></div>
      </div>
    </header>
  );
}

export default function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
  isHome,
  stores
}: HeaderProps) {
  const { shop, menu } = header;

  const { close } = useAside();

  const position = useScrollPosition(isHome)

  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const screenWidth = window.innerHeight;
    const targetHeight = screenWidth * 0.8;

    if (position < targetHeight) {
      setIsInverted(true)
    } else {
      setIsInverted(false)
    }
  }, [position])


  const [hasMarquee, setHasMarquee] = useState(true)

  const storesList = stores?.metaobjects.nodes.map(node => node.fields.find(field => field.key === 'title')?.value)

  const productsList = menu?.items.map(item => {

    if(!item?.url){
      return null;
    }
    const splitUrl = item.url?.split('/');
    const id = splitUrl.pop();

    return {
      title: item.title,
      url: `/products/${id}`
    }
  })

  return (

    <>
      <Marquee onClose={() => setHasMarquee(false)} text="Free shipping and returns within the EU and selected countries." />
      <MobileHeader hasMarquee={hasMarquee} header={header} isLoggedIn={isLoggedIn} cart={cart} publicStoreDomain={publicStoreDomain} />
      <header className={`${styles.header} ${isInverted && isHome ? styles.inverted : ''} `}>
        <LeftMenu storesList={storesList} productsList={productsList} />
        <NavLink
          className={`${styles.headerMenuItem} ${styles.desktopLogo}`}
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
        to={"https://account.null-space.eu"}
      >
        {({ isActive }) => (

          <BrandedLink text="Account" isActive={isActive} />
        )}



      </NavLink>



      <CartButton cart={cart} />
    </nav>
  )
}


function LeftMenu({ closeMenu, storesList, productsList }: { closeMenu?: () => void, storesList?: string[], productsList: { url: string; title: string }[] }) {
  const { open, close } = useAside();

  return (
    <nav className={`${styles.headerMenu} ${styles.menuLeft}`}>



      <div className={styles.headerMenuItem}>
        <NavLink

          end
          onClick={() => {
            close();

            closeMenu && closeMenu()
          }}
          prefetch="intent"
          to={"/products"}
        >
          {({ isActive, isPending }) => (

            <BrandedLink text="Sunglasses" isActive={isActive} />
          )}




        </NavLink>
        <ul className={styles.subMenu}>
          {productsList.map(product => <li key={product.url}><Link to={product.url}>{product.title}</Link></li>)}

        </ul>
      </div>


      <div className={styles.headerMenuItem}>
        <NavLink

          end
          onClick={() => {
            close();

            closeMenu && closeMenu()
          }}
          prefetch="intent"
          to={"/products"}
        >
          {({ isActive, isPending }) => (

            <><BrandedLink text="Collections" isActive={isActive} /></>
          )}

        </NavLink>

        <ul className={styles.subMenu}>
          <li><Link to="/products">SS25 The Void</Link></li>
        </ul>
      </div>



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


      <div className={styles.headerMenuItem}>
        <NavLink

          end
          onClick={() => {
            close();
            closeMenu && closeMenu()
          }}
          prefetch="intent"
          to={"/stores"}
        >

          {({ isActive }) => (

            <BrandedLink text="Stores" isActive={isActive} />
          )}

        </NavLink>
        {storesList?.length ? <ul className={styles.subMenu}>
          {storesList.map(store => <li key={store}><Link to="/stores">{store}</Link></li>)}
        </ul> : null}
      </div>

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
    </nav>
  )
}
