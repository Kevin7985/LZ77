class lz77 {

  DEFAULT_WIN_SIZE = 1024;
  WIN_SIZE = undefined;
  BUFFER = '';

  constructor(win_size = this.DEFAULT_WIN_SIZE) {
    this.WIN_SIZE = win_size;
  }

  trimBuffer() {
    if (this.BUFFER.length > this.WIN_SIZE) {
      this.BUFFER = this.BUFFER.substr(this.BUFFER.length - this.WIN_SIZE);
    }
  }

  encode(input) {
    let out = '';
    let curMatch = '';
    let matchInd = 0;
    let tempInd = 0;

    for (let nextChar of input) {
      tempInd = this.BUFFER.indexOf(curMatch + nextChar);
      if (tempInd !== -1) {
        curMatch += nextChar;
        matchInd = tempInd;
      } else {
        let encoded = `~${matchInd}~${curMatch.length}~${nextChar}`;
        let tempConcat = curMatch + nextChar;
        if (encoded.length <= tempConcat.length) {
          out += encoded;
          this.BUFFER += tempConcat;
          curMatch = '';
          matchInd = 0;
        }
        else {
          curMatch = tempConcat;
          matchInd = -1;
          while (curMatch.length > 1 && matchInd === -1) {
            out += curMatch.charAt(0);
            this.BUFFER += curMatch.charAt(0);
            curMatch = curMatch.substr(1);
            matchInd = this.BUFFER.indexOf(curMatch);
          }
        }
        this.trimBuffer();
      }
    }
    if  (matchInd !== -1) {
      let encoded = `~${matchInd}~${curMatch.length}`;
      if (encoded.length <= curMatch.length) {
        out += encoded;
      }
      else {
        out += curMatch;
      }
    }
    return out;
  }

  decode(input) {
    let split_parts = input.split('~');
    let out = '';
    for (let part = 0; part < split_parts.length; part++) {
      if (isNaN(Number(split_parts[part]))) {
        out += split_parts[part];
      } else {
        out += out.substr(Number(split_parts[part]), Number(split_parts[part + 1]));
        part += 1;
      }
    }

    return out;
  }

}

module.exports = lz77;