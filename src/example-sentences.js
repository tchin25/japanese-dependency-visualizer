export default {
  levels: [
    // Levels From Root
    [{ id: 0, label: "店内に", children: [] }],
    [
      { id: 1, label: "散らばっている", children: [0] },
      { id: 2, label: "無数の", children: [] },
    ],
    [
      { id: 3, label: "音たちから", children: [2, 1] },
      { id: 4, label: "情報を", children: [] },
      { id: 6, label: "私の", children: [] },
      { id: 8, label: "納品されたばかりの", children: [] },
    ],
    [
      { id: 5, label: "拾いながら、", children: [4, 3] },
      { id: 7, label: "身体は", children: [6] },
      { id: 9, label: "おにぎりを", children: [8] },
    ],
    [{ id: 10, label: "並べている", children: [9, 7, 5] }],
  ],
  readable: [
    // Readable Sentence Flow
    [{ id: 0, label: "店内に", children: [] }],
    [{ id: 1, label: "散らばっている", children: [0] }],
    [{ id: 2, label: "無数の", children: [] }],
    [{ id: 3, label: "音たちから", children: [2, 1] }],
    [{ id: 4, label: "情報を", children: [] }],
    [{ id: 5, label: "拾いながら、", children: [4, 3] }],
    [{ id: 6, label: "私の", children: [] }],
    [{ id: 7, label: "身体は", children: [6] }],
    [{ id: 8, label: "納品されたばかりの", children: [] }],
    [{ id: 9, label: "おにぎりを", children: [8] }],
    [{ id: 10, label: "並べている", children: [9, 7, 5] }],
  ],
  readable_c: [
    // Compacted Readable Sentence Flow
    [{ id: 0, label: "店内に", children: [] }],
    [
      { id: 1, label: "散らばっている", children: [0] },
      { id: 2, label: "無数の", children: [] },
    ],
    [
      { id: 3, label: "音たちから", children: [2, 1] },
      { id: 4, label: "情報を", children: [] },
    ],
    [
      { id: 5, label: "拾いながら、", children: [4, 3] },
      { id: 6, label: "私の", children: [] },
    ],
    [
      { id: 7, label: "身体は", children: [6] },
      { id: 8, label: "納品されたばかりの", children: [] },
    ],
    [{ id: 9, label: "おにぎりを", children: [8] }],
    [{ id: 10, label: "並べている", children: [9, 7, 5] }],
  ],
  levels2: [
    // Levels From Root
    [
      { id: 0, label: "彼は", children: [] },
      { id: 1, label: "マクで", children: [] },
      { id: 2, label: "昼ご飯を", children: [] }
    ],
    [{ id: 3, label: "食べます。", children: [2, 1, 0] }],
  ],
  readable2: [
    //  Readable Sentence Flow
    [{ id: 0, label: "彼は", children: [] }],
    [{ id: 1, label: "マクで", children: [] }],
    [{ id: 2, label: "昼ご飯を", children: [] }],
    [{ id: 3, label: "食べます。", children: [2, 1, 0] }],
  ],
  readable2_c: [
    // Compacted Readable Sentence Flow
    [
      { id: 0, label: "彼は", children: [] },
      { id: 1, label: "マクで", children: [] },
      { id: 2, label: "昼ご飯を", children: [] }
    ],
    [{ id: 3, label: "食べます。", children: [2, 1, 0] }],
  ],
};
