import Link from "next/link";
import React from "react";

interface MenuState {
    mobileMenu?: boolean;
    menu?: JSX.Element;
}

type HeaderProps = MenuState & React.HTMLAttributes<HTMLElement>;

type LinkProps = {
    title?: string;
    href: string;
}

type HeaderLinkProps = LinkProps & React.HTMLAttributes<HTMLElement>;

type HeaderLinksProps = {
    data: LinkProps[];
} & React.HtmlHTMLAttributes<Element>;

export const Header: React.FC<HeaderProps> = (props) => {
    const { children, menu, mobileMenu, className, ...others} = props;

  return (
    <nav {...others} className={`bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 border-b-[1px] border-gray-200 dark:border-gray-700 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                {children}
            </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenu && (
            <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
                {menu}
            </div>
        )}
    </nav>
  );
}


//block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${className}
export const HeaderLink: React.FC<HeaderLinkProps> = (props) => {
    const { children, href, className, ...others } = props

    return (
      <a
        href={`${href}`}
        className={`text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium ${className}`}
        {...others}
      >
            {children}
      </a>
    )
}

export const HeaderLinks: React.FC<HeaderLinksProps> = (props) => {
    const { data, className, ...others } = props

    return (
        <>
            {data.map((link, index) => (
                <a
                    {...others}
                    key={index}
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
                >
                    {link.title}
                </a>
            ))}
        </>
    );
}


export const HeaderLogo: React.FC<LinkProps & React.HtmlHTMLAttributes<Element>> = (props) => {
    const { href, children } = props;
    
    return (
        <Link href={href}>
            <a className="flex items-center">
                {children}
            </a>
        </Link>
    )
}

export const HeaderItem: React.FC<React.HtmlHTMLAttributes<Element>> = (props) => {
    const {children, ...others} = props;
    return (
        <div {...others} className="flex items-center">
            {children}
        </div>
    )
}

export const HeaderMenu: React.FC<React.HtmlHTMLAttributes<Element>> = ({ children, className, ...rest }) => {
    return (
        <div {...rest} className={`md:hidden bg-white dark:bg-gray-800 shadow-lg ${className}`}>
            {children}
        </div>
    );
}

export const HomeHeader: React.FC<HeaderProps> = ({children, className, ...props}) => {
    
    return (
        <nav {...props} className={`bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 border-b-[1px] border-gray-200 dark:border-gray-700 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {children}
                </div>
            </div>

        {/* Mobile menu */}
        {props.mobileMenu && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
                {props.menu}
          </div>
        )}
        </nav>
    );
}
