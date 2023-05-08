import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import parse from "html-react-parser";

type LayoutPropTypes = {
    isHomePage?: boolean;
    children: React.ReactElement | Array<React.ReactElement> | null;
};

const Layout = ({
    isHomePage = false,
    children = null,
}: LayoutPropTypes) => {
    const {
        wp: {
            generalSettings: { title },
        },
    } = useStaticQuery(graphql`
        query LayoutQuery {
            wp {
                generalSettings {
                    title
                    description
                }
            }
        }
    `);

    return (
        <div className="global-wrapper" data-is-root-path={isHomePage}>
            <header className="global-header">
                {isHomePage ? (
                    <h1 className="main-heading">
                        <Link to="/">{parse(title)}</Link>
                    </h1>
                ) : (
                    <Link className="header-link-home" to="/">
                        {title}
                    </Link>
                )}
            </header>

            <main>{children}</main>

            <footer>
                © {new Date().getFullYear()} {title}
            </footer>
        </div>
    );
};

export default Layout;
