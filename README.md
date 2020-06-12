# Puzzle

### Функция, с помощью которой можно создать пазлы в виде canvas элементов

#### Как это использовать:

- Функция является асинхронной и возвращает промис с `N` количества `DIV` элементов, каждый из которых содержит набор `canvas` элементов

- Пример вызова:
```javascript
createCanvasElements(otpions).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
```
- `options` - это объект, в котором есть 2 обязательных свойства и несколько опциональных
  - свойства объекта `options`:
    **Обязательные поля**:
    - `src`: тип `string`- url адрес изображения
    - `wordsList`: тип `array` - массив, содержащий строки предложений из слов которых создаются пазлы, 1 слово в предложении === 1 пазл
    *Опциональные поля**:
    - `extraWidthValue`: тип `number`, диапозон[0-100] - значение, влияющее соотношение ширины пазла слов с большим количеством букв от слов с меньшим, дефолтное значение `10`
    - `fontFamily`: тип `string` - задается шрифт текста, который присутствует в HTML документе, `по умолчанию 'Arial'`
    - `fontRatio: тип `number` - увеличение/уменьшение шрифта относительно установленного, `по умолчанию 1`
    - `fontType`: тип `string` - принимает 3 значения = `'bold'`, `'normal'`, '`italic'` - отвечает за тип шрифта
    - `borderPuzzle`: тип `number`: толщина `рамки` по периметру пазла, дефолтное значение `1`
    - `shadowPuzzle`: тип `number`: толщина `размытия тени` по периметру пазла, дефолтное значение `2`
    - `borderText`: тип `number`: толщина `рамки` по периметру текста, дефолтное значение `1`
    - `shadowText`: тип `number`: толщина `размытия тени` по периметру текста, дефолтное значение `10`
    - `colorBorder`: тип `string` цвет `рамки` по периметру пазла, принимет значения в формате `'#fff'`, `'rgb(0,0,0)'`, `'green'`. По умолчанию `'rgb(0,255,250)'`
    - `colorShadowBorder`: тип `string` цвет `тени` по периметру пазла, принимет значения в формате `'#fff'`, `'rgb(0,0,0)'`, `'green'`. По умолчанию `'rgb(255,255,250)'`
    - `colorShadowText`: тип `string` цвет `тени` по периметру текста, принимет значения в формате `'#fff'`, `'rgb(0,0,0)'`, `'green'`. По умолчанию `'black'`
    - `colorText`: тип `string` цвет `текста`, принимет значения в формате `'#fff'`, `'rgb(0,0,0)'`, `'green'`. По умолчанию `'magenta'`
    - `solidTextColor`: тип `string` цвет `текста`, принимет значения в формате `'#fff'`, `'rgb(0,0,0)'`, `'green'`. По умолчанию `'white'`
    - `fontStyle`: тип `string` стиль `текста`, принимет 2 значения `'fillText'` (текст будет иметь полную заливку) или `'strokeText'` (текст будет пустой внутри с рамкой по периметру). При указании значения `'fillText'` цвет текста задается свойством `'solidTextColor'`, при значении `'strokeText'` цвет текста меняется свойством `'colorText'`

#### Пример использования:

```javascript
createCanvasElements({
  src: 'https://nexgenua.github.io/images/level1/deerlake.jpg',
  wordsList: [
    "The students <b>agree</b> they have too much homework.",
    "There is a small <b>boat</b> on the lake.",
    "They <b>arrived</b> at school at 7 a.m.",
    "Is your birthday in <b>August</b>?",
    "I ate eggs for <b>breakfast</b>.",
    "I brought my <b>camera</b> on my vacation.",
    "The <b>capital</b> of the United States is Washington, D.C.",
    "Did you <b>catch</b> the ball during the baseball game?",
    "People feed <b>ducks</b> at the lake.",
    "The woman <b>enjoys</b> riding her bicycle."
  ],
}).then(res => {
  document.body.append(...res);
})
```

**Демку можно посмотреть здесь:** [https://codepen.io/nexgenua/pen/NWxNBeL](https://codepen.io/nexgenua/pen/NWxNBeL)
