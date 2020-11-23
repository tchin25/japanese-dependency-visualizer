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
  xml: `<sentence>
  <chunk id="0" link="1" rel="D" score="1.894732" head="0" func="1">
   <tok id="0" feature="名詞,一般,*,*,*,*,店内,テンナイ,テンナイ">店内</tok>
   <tok id="1" feature="助詞,格助詞,一般,*,*,*,に,ニ,ニ">に</tok>
  </chunk>
  <chunk id="1" link="3" rel="D" score="1.344092" head="2" func="4">
   <tok id="2" feature="動詞,自立,*,*,五段・ラ行,連用タ接続,散らばる,チラバッ,チラバッ">散らばっ</tok>
   <tok id="3" feature="助詞,接続助詞,*,*,*,*,て,テ,テ">て</tok>
   <tok id="4" feature="動詞,非自立,*,*,一段,基本形,いる,イル,イル">いる</tok>
  </chunk>
  <chunk id="2" link="3" rel="D" score="1.512923" head="5" func="6">
   <tok id="5" feature="名詞,一般,*,*,*,*,無数,ムスウ,ムスー">無数</tok>
   <tok id="6" feature="助詞,連体化,*,*,*,*,の,ノ,ノ">の</tok>
  </chunk>
  <chunk id="3" link="5" rel="D" score="1.120838" head="8" func="9">
   <tok id="7" feature="名詞,一般,*,*,*,*,音,オト,オト">音</tok>
   <tok id="8" feature="名詞,接尾,一般,*,*,*,たち,タチ,タチ">たち</tok>
   <tok id="9" feature="助詞,格助詞,一般,*,*,*,から,カラ,カラ">から</tok>
  </chunk>
  <chunk id="4" link="5" rel="D" score="2.817956" head="10" func="11">
   <tok id="10" feature="名詞,一般,*,*,*,*,情報,ジョウホウ,ジョーホー">情報</tok>
   <tok id="11" feature="助詞,格助詞,一般,*,*,*,を,ヲ,ヲ">を</tok>
  </chunk>
  <chunk id="5" link="10" rel="D" score="-1.516635" head="12" func="13">
   <tok id="12" feature="動詞,自立,*,*,五段・ワ行促音便,連用形,拾う,ヒロイ,ヒロイ">拾い</tok>
   <tok id="13" feature="助詞,接続助詞,*,*,*,*,ながら,ナガラ,ナガラ">ながら</tok>
   <tok id="14" feature="記号,読点,*,*,*,*,、,、,、">、</tok>
  </chunk>
  <chunk id="6" link="7" rel="D" score="1.768437" head="15" func="16">
   <tok id="15" feature="名詞,代名詞,一般,*,*,*,私,ワタシ,ワタシ">私</tok>
   <tok id="16" feature="助詞,連体化,*,*,*,*,の,ノ,ノ">の</tok>
  </chunk>
  <chunk id="7" link="10" rel="D" score="-1.516635" head="17" func="18">
   <tok id="17" feature="名詞,一般,*,*,*,*,身体,シンタイ,シンタイ">身体</tok>
   <tok id="18" feature="助詞,係助詞,*,*,*,*,は,ハ,ワ">は</tok>
  </chunk>
  <chunk id="8" link="9" rel="D" score="1.672161" head="20" func="24">
   <tok id="19" feature="名詞,サ変接続,*,*,*,*,納品,ノウヒン,ノーヒン">納品</tok>
   <tok id="20" feature="動詞,自立,*,*,サ変・スル,未然レル接続,する,サ,サ">さ</tok>
   <tok id="21" feature="動詞,接尾,*,*,一段,連用形,れる,レ,レ">れ</tok>
   <tok id="22" feature="助動詞,*,*,*,特殊・タ,基本形,た,タ,タ">た</tok>
   <tok id="23" feature="助詞,副助詞,*,*,*,*,ばかり,バカリ,バカリ">ばかり</tok>
   <tok id="24" feature="助詞,連体化,*,*,*,*,の,ノ,ノ">の</tok>
  </chunk>
  <chunk id="9" link="10" rel="D" score="-1.516635" head="25" func="26">
   <tok id="25" feature="名詞,一般,*,*,*,*,おにぎり,オニギリ,オニギリ">おにぎり</tok>
   <tok id="26" feature="助詞,格助詞,一般,*,*,*,を,ヲ,ヲ">を</tok>
  </chunk>
  <chunk id="10" link="-1" rel="D" score="0.000000" head="27" func="29">
   <tok id="27" feature="動詞,自立,*,*,一段,連用形,並べる,ナラベ,ナラベ">並べ</tok>
   <tok id="28" feature="助詞,接続助詞,*,*,*,*,て,テ,テ">て</tok>
   <tok id="29" feature="動詞,非自立,*,*,一段,基本形,いる,イル,イル">いる</tok>
  </chunk>
 </sentence>`,
  levels2: [
    // Levels From Root
    [
      { id: 0, label: "彼は", children: [] },
      { id: 1, label: "マクで", children: [] },
      { id: 2, label: "昼ご飯を", children: [] },
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
      { id: 2, label: "昼ご飯を", children: [] },
    ],
    [{ id: 3, label: "食べます。", children: [2, 1, 0] }],
  ],
};
