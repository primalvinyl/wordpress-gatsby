/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

type SeoPropTypes = {
    description?: string;
    lang?: string;
    meta?: Array<any>;
    title: string;
};

const Seo = ({
    description = ``,
    lang = `en`,
    meta = [],
    title = ``,
}: SeoPropTypes) => {
    const { wp, wpUser } = useStaticQuery(
        graphql`
            query {
                wp {
                    generalSettings {
                        title
                        description
                    }
                }

                # if there's more than one user this would need to be filtered to the main user
                wpUser {
                    twitter: name
                }
            }
        `
    );

    const metaDescription = description || wp.generalSettings?.description;
    const defaultTitle = wp.generalSettings?.title;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: wpUser?.twitter || ``,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ].concat(meta)}
        />
    );
};

export default Seo;
