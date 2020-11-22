import CaboCha

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})


@app.route('/<sentence>', methods=['GET'])
def api(sentence):
    if sentence == '': return ''

    cap = CaboCha.Parser()
    tree = cap.parse(sentence)
    # dependency, chunks, scores = dep_ana(sentence, alltoken=True)
    # print (tree.toString(CaboCha.CABOCHA_FORMAT_XML))
    # print('dependency : ', dependency)
    # print('chunks : ', chunks)
    # print('score : ', scores)
    return tree.toString(CaboCha.CABOCHA_FORMAT_XML)


def dep_ana(sentence, alltoken=True):
    """
    Return the result of dependent analysis
    """
    tokens, chunks = tok_chu_ana(sentence)

    depend_rel = {}
    chunk_list = []
    score_list = []
    num = 0

    for i in range(len(chunks)):
        # store dependency
        depend_rel[i] = chunks[i].link
        score_list.append(chunks[i].score)
        temp_chunk = ''

        for _j in range(chunks[i].token_size):
            if tokens[num].chunk is not None or alltoken:
                temp_chunk += tokens[num].feature.split(',')[6]
            num = num+1
        chunk_list.append(temp_chunk)

    return depend_rel, chunk_list, score_list


def tok_chu_ana(sentence):
    """
    Return tokens and chunks that sentence contains
    """
    cap = CaboCha.Parser()
    tree = cap.parse(sentence)

    tokens = [tree.token(i) for i in range(tree.token_size())]
    chunks = [tree.chunk(i) for i in range(tree.chunk_size())]

    return tokens, chunks


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
