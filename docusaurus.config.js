module.exports = {
  title: "geekodour's wiki",
  tagline: "everything i know.",
  url: "https://wiki.itdobelikethat.org",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "geekodour", // Usually your GitHub org/user name.
  projectName: "wiki", // Usually your repo name.
  plugins: [
    "@docusaurus/plugin-google-analytics",
    "@docusaurus/plugin-google-gtag",
    [
      "@docusaurus/plugin-sitemap",
      {
        cacheTime: 600 * 1000, // 600 sec - cache purge period
        changefreq: "weekly",
        priority: 0.5,
      },
    ],
  ],
  themeConfig: {
    algolia: {
      apiKey: '7601efe49d7d00c8af296c63be137e7a',
      indexName: 'geekodour',
    },
    googleAnalytics: {
      trackingID: "UA-50861730-3",
      anonymizeIP: true,
    },
    gtag: {
      trackingID: "UA-50861730-3",
      anonymizeIP: true,
    },
    navbar: {
      title: "geekodour's wiki",
      logo: {
        alt: "avatar",
        src: "img/favicon.ico",
      },
      links: [
        { to: "blog", label: "Blog", position: "left" },

        {
          to: "docs/books/zero_to_one",
          label: "Books",
          activeBasePath: "docs/books",
          position: "left",
        },
        {
          to: "docs/links/weekly/links0",
          label: "Links",
          activeBasePath: "docs/links",
          position: "left",
        },
        {
          to: "docs/ideas/drawing_ducks",
          label: "Ideas",
          activeBasePath: "docs/ideas",
          position: "left",
        },
        {
          to: "docs/courses/soeycscs1",
          label: "Courses",
          activeBasePath: "docs/courses",
          position: "left",
        },
        {
          to: "docs/notes/guides/notetaking",
          label: "Notes",
          activeBasePath: "docs/notes",
          position: "left",
        },
        {
          to: "docs/tools/laptop_tools",
          label: "Tools",
          activeBasePath: "docs/tools",
          position: "left",
        },
        {
          to: "docs/workshops/tech-guides",
          label: "Workshops",
          activeBasePath: "docs/workshops",
          position: "left",
        },

        {
          href: "https://github.com/geekodour/wiki",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://wiki.itdobelikethat.org/rotlinks.txt",
          label: "Link Rots",
          position: "right",
        },
      ],
    },
    prism: {
      additionalLanguages: ["ruby"], // Or any language
    },
  },
  stylesheets: [
    {
      href: "/katex/katex.min.css",
      type: "text/css",
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          remarkPlugins: [require("remark-math")],
          rehypePlugins: [require("rehype-katex")],
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/geekodour/wiki/edit/master/",
        },
        blog: {
          showReadingTime: true,
          remarkPlugins: [require("remark-math")],
          rehypePlugins: [require("rehype-katex")],
          // Please change this to your repo.
          editUrl: "https://github.com/geekodour/wiki/edit/master/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
