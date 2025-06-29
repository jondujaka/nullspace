import { Await, Link, useLocation } from 'react-router';
import {Suspense, useId} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
  StoresQueryQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside/Aside';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import {CartMain} from '~/components/CartMain/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  stores: StoresQueryQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  footer,
  stores,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {

  const location = useLocation()


  const isHome = location.pathname === '/';
  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <SearchAside />
      {/* <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} /> */}
      {header && (
        <Header
          header={header}
          cart={cart}
          stores={stores}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
          isHome={isHome}
        />
      )}
      <main>{children}</main>
      <Footer />
    </Aside.Provider>
  );
}

function CartAside({cart}: {cart: PageLayoutProps['cart']}) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="text"
                list={queriesDatalistId}
              />
            </>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({items, total, term, state, closeSearch}) => {
            const {articles, collections, pages, products, queries} = items;

            if (state === 'loading' && term.current) {
              return <div>Loading...</div>;
            }

            if (!total) {
              return <SearchResultsPredictive.Empty term={term} />;
            }

            return (
              <>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

// function MobileMenuAside({
//   header,
//   publicStoreDomain,
// }: {
//   header: PageLayoutProps['header'];
//   publicStoreDomain: PageLayoutProps['publicStoreDomain'];
// }) {
//   return (
//     header.menu &&
//     header.shop.primaryDomain?.url && (
//       <Aside type="mobile" heading="MENU">
//         <HeaderMenu
//           menu={header.menu}
//           viewport="mobile"
//           primaryDomainUrl={header.shop.primaryDomain.url}
//           publicStoreDomain={publicStoreDomain}
//         />
//       </Aside>
//     )
//   );
// }
