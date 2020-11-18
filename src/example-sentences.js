export default {
  levels: [
    // Levels From Root
    [{ id: 10, label: "店内に" }],
    [
      { id: 8, label: "散らばっている", parents: [10] },
      { id: 9, label: "無数の" },
    ],
    [
      { id: 7, label: "音たちから", parents: [8, 9] },
      { id: 6, label: "情報を" },
      { id: 5, label: "私の" },
      { id: 4, label: "納品されたばかりの" },
    ],
    [
      { id: 3, label: "拾いながら、", parents: [6, 7] },
      { id: 2, label: "身体は", parents: [5] },
      { id: 1, label: "おにぎりを", parents: [4] },
    ],
    [{ id: 0, label: "並べている", parents: [1, 2, 3] }],
  ],
  readable: [
    // Readable Sentence Flow
    [{ id: 10, label: "店内に" }],
    [{ id: 8, label: "散らばっている", parents: [10] }],
    [{ id: 9, label: "無数の" }],
    [{ id: 7, label: "音たちから", parents: [9, 8] }],
    [{ id: 6, label: "情報を" }],
    [{ id: 3, label: "拾いながら、", parents: [6, 7] }],
    [{ id: 5, label: "私の" }],
    [{ id: 2, label: "身体は", parents: [5] }],
    [{ id: 4, label: "納品されたばかりの" }],
    [{ id: 1, label: "おにぎりを", parents: [4] }],
    [{ id: 0, label: "並べている", parents: [1, 2, 3] }],
  ],
  readable_c: [
    // Compacted Readable Sentence Flow
    [{ id: 10, label: "店内に" }],
    [
      { id: 8, label: "散らばっている", parents: [10] },
      { id: 9, label: "無数の" },
    ],
    [
      { id: 7, label: "音たちから", parents: [8, 9] },
      { id: 6, label: "情報を" },
    ],
    [
      { id: 3, label: "拾いながら、", parents: [6, 7] },
      { id: 5, label: "私の" },
    ],
    [
      { id: 2, label: "身体は", parents: [5] },
      { id: 4, label: "納品されたばかりの" },
    ],
    [{ id: 1, label: "おにぎりを", parents: [4] }],
    [{ id: 0, label: "並べている", parents: [1, 2, 3] }],
  ],
};
