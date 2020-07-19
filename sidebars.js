module.exports = {
  books: {
    Thinking: ["books/zero_to_one"],
    Business: [],
    Economics: [],
    Technology: [
      "books/perf_little_book",
      "books/linux_networking",
      "books/tcpdump_little_book",
    ],
    Education: ["books/tools_sys_research"],
    History: [],
    Math: [],
  },
  links: {
    "Weekly Reads": ["links/weekly/links0"],
    "Reading Lists": [
      "links/blogs",
      "links/tweets",
      "links/papers",
      "links/videos",
      "links/books",
      "links/people",
    ],
    Educational: ["links/oneshot"],
    Others: ["links/others/dump"],
  },
  ideas: {
    Random: [
      "ideas/drawing_ducks",
      "ideas/quotes",
      "ideas/running_bsns",
      "ideas/humor",
      "ideas/subjects",
      "ideas/pantry",
    ],
    Stakes: ["ideas/timelines"],
    Education: ["ideas/problems_in_edu"],
  },
  courses: {
    CMU: ["courses/cmu15445", "courses/cmu15721", "courses/cmu15213"],
    Stanford: ["courses/soeycscs1"],
    UCSantaCruz: ["courses/cs138_distsys"],
    Thinking: [],
    KhanAcademy: [
      "courses/khan/alg2",
      "courses/khan/sandp",
      "courses/khan/hs-stat",
      "courses/khan/apstat",
      "courses/khan/compsci",
    ],
    "Math Books": [
      "courses/math-books/stats_without_tears",
      "courses/math-books/interm-alg",
      "courses/math-books/grimaldi",
      "courses/math-books/libarts-math",
    ],
    Others: [
      "courses/others/accessp2p",
      "courses/others/distributedsystemscourse",
      "courses/others/gc_essentials_udemy",
    ],
  },
  notes: {
    Personal: ["notes/people"],
    Notes: [
      "notes/blogs",
      "notes/videos",
      "notes/podcasts",
      "notes/twitter",
      "notes/papers",
      "notes/rfc",
      "notes/research",
      "notes/history",
      "notes/case_studies",
      "notes/questions",
    ],
    Study: [
      "notes/study/math",
      {
        type: "category",
        label: "Hardware",
        items: ["notes/study/comp_arch", "notes/study/memory"],
      },
      {
        type: "category",
        label: "Software",
        items: [
          "notes/study/filesystems",
          "notes/study/storage",
          "notes/study/os",
          "notes/study/virt",
          "notes/study/logging",
          "notes/study/network_prog",
          "notes/study/email",
        ],
      },
      {
        type: "category",
        label: "Social",
        items: ["notes/study/finance", "notes/study/digital_rights"],
      },
      {
        type: "category",
        label: "Network",
        items: [
          "notes/study/network",
          "notes/study/wireless",
          "notes/study/security",
          "notes/study/p2p",
          "notes/study/internet",
        ],
      },
      {
        type: "category",
        label: "Programming",
        items: [
          "notes/study/go_lang",
          "notes/study/programming_langs/ruby",
          "notes/study/design_patterns",
          "notes/study/computation",
        ],
      },
    ],
    Guides: [
      "notes/guides/shitposting",
      "notes/guides/notetaking",
      "notes/guides/askingq",
      "notes/guides/quantify",
      "notes/guides/communities",
      "notes/guides/web3",
    ],
    Random: [
      "notes/random/names",
      "notes/random/jargon",
      "notes/random/shrines",
      "notes/random/scales",
    ],
  },
  tools: {
    Software: [
      "tools/laptop_tools",
      "tools/performance_tools",
      "tools/forgetful",
    ],
    Databases: ["tools/postgres", "tools/promql"],
    "Server Tech": ["tools/k8s", "tools/zookeeper", "tools/apache_drill"],
    Hardware: ["tools/calculator"],
  },
  workshops: {
    Others: ["workshops/tech-guides", "workshops/projects"],
    Personal: [],
    Attended: [],
  },
};
