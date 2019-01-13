export function splitInChunks(data, viewColumns){
    let resultsInChunks = [];

    for (let index = 0; index < data.length; index += viewColumns) {
      let chunk = [];
      for (let i = 0; i < viewColumns; i++) {
        if(!data.hasOwnProperty(index+i)){
          continue;
        }
        chunk.push(data[index + i]);
      }
      resultsInChunks.push(chunk);
    }
    return resultsInChunks;
  }
