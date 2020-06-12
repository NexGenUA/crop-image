const createCanvasElements = async (
  {
    src,
    wordsList,
    extraWidthValue = 10,
    fontFamily = 'Arial',
    fontRatio = 1,
    fontType = 'bold',
    borderPuzzle = 1,
    shadowPuzzle = 2,
    borderText = 1,
    shadowText = 10,
    colorBorder = 'rgb(0,255,250)',
    colorShadowBorder = 'rgb(255,255,250)',
    colorText = 'magenta',
    colorShadowText = 'black',
    solidTextColor = 'white',
    fontStyle = 'fillText' // strokeText
  }) => {

  if (!wordsList || !Array.isArray(wordsList) || !wordsList.length || !wordsList.every(el => typeof el === 'string')) {
    throw new TypeError('"wordsList" argument must be an array containing strings. Example: ["string"]');
  }

  if (!src || typeof src !== 'string') {
    throw new TypeError('"src" argument must be a "string"');
  }

  if (isNaN(parseInt(extraWidthValue))) {
    throw new TypeError('"extraWidthValue" argument must be a "number"');
  }

  return new Promise((resolve, reject) => {

    const img = new Image();

    img.src = src;

    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const groupsWords = wordsList.map(word => word.split(' '));
      const groupsRow = groupsWords.length;
      const EXTRA_WIDTH_VALUE = parseInt(extraWidthValue);
      const result = [];

      let startYPointCropImage = 0;

      groupsWords.forEach((words, i) => {
        const row = document.createElement('div');
        const wordCount = words.length;
        const letterCounts = words.reduce((acc, val) => acc + val.replace(/<[^>]*>/g, '').length, 0);
        const reduceLength = letterCounts * EXTRA_WIDTH_VALUE;
        const extraWidth = Math.round(reduceLength / wordCount);
        const onePart = Math.round((imgWidth - reduceLength) / letterCounts);
        const canvasHeight = Math.round(imgHeight / groupsRow);

        let widthCount = 0;


        row.classList.add(`group-words`);
        row.classList.add(`row-${i + 1}`);

        words.forEach((w, j) => {
          const word = w.replace(/<[^>]*>/g, '');
          const canvas = document.createElement('canvas');

          canvas.classList.add('canvas-item');
          canvas.classList.add(`canvas-row-${i + 1}`);
          canvas.classList.add(`canvas-item-${j + 1}`);
          canvas.setAttribute('data-item', `${i + 1}-${j + 1}`);
          canvas.setAttribute('data-word', word);

          const ctx = canvas.getContext('2d');
          let canvasWidth = (word.length * onePart) + extraWidth;

          if (j === wordCount - 1) {
            canvasWidth = imgWidth - widthCount;
            widthCount += canvasWidth;
          } else {
            widthCount += canvasWidth;
          }

          const x1 = 0;
          const y1 = Math.round(canvasHeight / 3);
          const y2 = Math.round((canvasHeight / 3) * 2);
          const centerY = canvasHeight / 2;
          const radius = Math.round((canvasHeight / 3) / 2);
          const startXPointCropImage = widthCount- canvasWidth;
          const fontSize = Math.round(canvasHeight / 4);

          ctx.canvas.width = canvasWidth + radius;
          ctx.canvas.height = canvasHeight;

          ctx.beginPath();

          if (j) {
            ctx.arc(x1, centerY, radius, Math.PI / 2, Math.PI * 1.5, true);
          }

          ctx.lineTo(0, y1);
          ctx.lineTo(0, 0);
          ctx.lineTo(canvasWidth, 0);
          ctx.lineTo(canvasWidth, y1);

          if (j !== wordCount - 1) {
            ctx.arc(canvasWidth, centerY, radius, Math.PI * 1.5, Math.PI / 2, false);
          }

          ctx.lineTo(canvasWidth, y2);
          ctx.lineTo(canvasWidth, canvasHeight);
          ctx.lineTo(0, canvasHeight);
          ctx.lineTo(0, y2);

          if (!j) {
            ctx.lineTo(0, y1);
          }

          ctx.clip();

          ctx.drawImage(img, startXPointCropImage, startYPointCropImage, canvasWidth + radius, canvasHeight, 0, 0, canvasWidth + radius, canvasHeight);

          ctx.shadowColor = colorShadowBorder;
          ctx.strokeStyle = colorBorder;
          ctx.shadowBlur = shadowPuzzle;
          ctx.lineWidth = borderPuzzle;
          ctx.stroke();
          ctx.globalCompositeOperation = 'destination-in';
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
          ctx.beginPath();
          ctx.shadowColor = colorShadowText;
          ctx.shadowBlur = shadowText;
          ctx.lineWidth = borderText;
          ctx.strokeStyle = colorText;
          ctx.font = `${fontType} ${fontSize * fontRatio}pt ${fontFamily}`;
          ctx.textAlign = 'center';
          ctx.fillStyle = solidTextColor;
          ctx[fontStyle](word, canvasWidth  / 2 + radius / 2, canvasHeight / 2 + fontSize / 3);
          row.append(canvas);
        })
        startYPointCropImage += canvasHeight
        result.push(row);
      });
      resolve(result);
    };

    img.onerror = err => {
      console.log(err);
      reject(err);
    }
  })
};
