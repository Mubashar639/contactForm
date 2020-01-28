export const alldata = {
  space_type:"",
  Buildloading: false,
  Buildvisible: false,
  buidcheckedList: [],
  interior_finishes: 0,
  art_selection: 0,
  style_guidance: 0,
  furniture_selection: 0,
  buidcheckedListOption: [
    [
      "Interior Finishes",
      "(Sourcing material for a renovation)",
      "interior_finishes"
    ],
    ["Art Selection", "(Finding the right pieces)", "art_selection"],
    ["Style Guidance", "(Bring it all togather)", "style_guidance"],
    ["Furniture Selection", "(Choosing new piesces)", "furniture_selection"]
  ],
  renoloading: false,
  showModalReno: false,
  renoCheckedList: [],
  renoCheckedListOption: [
    ["light", "(Painting walls & installing bookcases)"],
    [
      "medium",
      "(Small bathroom upgrades, kitchen cabinet refreshes, new flooring)"
    ],
    ["gut", "(Knocking down walls, changing bathroom or kitchen layout)"],
    ["new build", "(Building from the ground up)"]
  ],
  renoBtnloading: false,
  BtnReno: false,

  btnArray: [
    {
      text1: "Would you like to be contacted to contractor",
      text2: "",
      key: "want_connection",
      value: ""
    },
    {
      text1: "Are you planning any structural changes",
      text2: "(Knocking down walls)",
      key: "structural_changes",
      value: ""
    }
  ],
  locationloading: false,
  locationVisiable: false,

  want_connection: "",
  structural_changes: "",
  contacted_before: "",
  btnvalidate: false,

  entire_location: 0,
  living_rooms: 0,
  bed_rooms: 0,
  dining_rooms: 0,
  kitchens: 0,
  bathrooms: 0,
  entryways: 0,
  offices: 0,
  kids: 0,
  outdoor: 0,
  other: 0,
  degree_renovation: "",
  renovationScreenOverAllValidate: false,
  buildScreenOverAllValidate: false,
  renoPartValidate: false,

  locationArray: [
    {
      title: "living rooms",
      value: 0,
      attr: "living_rooms",
      set: 0,
      visible: false
    },
    {
      title: "bed rooms",
      value: 0,
      attr: "bed_rooms",
      set: 0,
      visible: false
    },
    {
      title: "dining rooms",
      value: 0,
      attr: "dining_rooms",
      set: 0,
      visible: false
    },
    {
      title: "kitchens",
      value: 0,
      attr: "kitchens",
      set: 0,
      visible: false
    },
    {
      title: "bathrooms",
      value: 0,
      attr: "bathrooms",
      set: 0,
      visible: false
    },
    {
      title: "entryways",
      value: 0,
      attr: "entryways",
      set: 0,
      visible: false
    },
    {
      title: "offices",
      value: 0,
      attr: "offices",
      set: 0,
      visible: false
    },
    {
      title: "kids",
      value: 0,
      attr: "kids  / nursery",
      set: 0,
      visible: false
    },
    {
      title: "outdoor / foyar",
      value: 0,
      attr: "outdoor",
      set: 0,
      visible: false
    },
    {
      title: "other",
      value: 0,
      attr: "other",
      set: 0,
      visible: false
    }
  ],
  entireLocationOption: [
    "Below 500",
    "500 - 1,000",
    "1,000 - 1,500",
    "Above 1,500"
  ],
  confirm: false,
  checkWarning: false
};
